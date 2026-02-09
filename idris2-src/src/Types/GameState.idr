{-
  Types/GameState.idr

  Models the player's current progress through the game.

  This represents a PARTIAL build - the player has made some decisions
  (assigned some jobs, grabbed some espers) and needs help with what to do next.

  Use case: "I'm at Bhujerba, I have Vaan/Shikari and Penelo/White Mage.
             What should Balthier's job be?"
-}

module Types.GameState

import public Derive.Prelude
import public Types.Character
import public Types.Job
import public Types.Esper
import public Types.Goal

%language ElabReflection

-- ============================================================================
-- CHARACTER ASSIGNMENT STATE
-- ============================================================================

{-
  A character can have 0, 1, or 2 jobs assigned depending on game progress.

  The game unlocks dual jobs partway through, so we model this explicitly.
-}

public export
data JobAssignment
  = NoJobs                              -- Character not assigned yet
  | PrimaryOnly Job                     -- First job assigned, no second job yet
  | DualJobs Job Job                    -- Both jobs assigned (primary, secondary)

%runElab derive "JobAssignment" [Show, Eq]

public export
record CharacterAssignment where
  constructor MkCharacterAssignment
  character : Character
  jobs : JobAssignment
  espers : List Esper                   -- Espers assigned to this character

%runElab derive "CharacterAssignment" [Show, Eq]

-- ============================================================================
-- GAME STATE
-- ============================================================================

{-
  The current state of the player's build.

  This is a snapshot at a particular point in the game.

  IMPORTANT: We do NOT track fuzzy progression like "early/mid/late game".
  The only objective gate is: have you completed Tomb of Raithwall?

  Everything else (espers obtained, LP level, gear acquired) is tracked
  explicitly rather than bucketed into subjective "phases".
-}

public export
record GameState where
  constructor MkGameState
  party : List CharacterAssignment      -- All 6 characters and their assignments
  availableJobs : List Job              -- Jobs not yet assigned
  availableEspers : List Esper          -- Espers not yet assigned
  dualJobStatus : DualJobStatus         -- Locked (pre-Raithwall) or Unlocked (post-Raithwall)

-- ============================================================================
-- HELPERS
-- ============================================================================

{-
  Check what jobs a character currently has.
-}

export
characterJobs : Character -> GameState -> JobAssignment
characterJobs char state =
  case find (\ca => ca.character == char) state.party of
    Nothing => NoJobs  -- Should never happen if party is complete
    Just ca => ca.jobs

{-
  Check what espers a character currently has.
-}

export
characterEspers : Character -> GameState -> List Esper
characterEspers char state =
  case find (\ca => ca.character == char) state.party of
    Nothing => []
    Just ca => ca.espers

{-
  Get all characters who don't have a primary job yet.
-}

export
unassignedCharacters : GameState -> List Character
unassignedCharacters state =
  mapMaybe checkUnassigned state.party
  where
    checkUnassigned : CharacterAssignment -> Maybe Character
    checkUnassigned ca = case ca.jobs of
      NoJobs => Just ca.character
      _ => Nothing

{-
  Get all characters who have a primary job but no secondary yet.

  Returns empty list in Prologue (dual jobs not available).
  Pattern matching on DualJobStatus eliminates the need for boolean checks.
-}

export
needsSecondJob : GameState -> List Character
needsSecondJob state = case state.dualJobStatus of
  Locked => []  -- Can't assign second jobs in Prologue
  Unlocked => mapMaybe checkNeedsSecond state.party
  where
    checkNeedsSecond : CharacterAssignment -> Maybe Character
    checkNeedsSecond ca = case ca.jobs of
      PrimaryOnly _ => Just ca.character
      _ => Nothing

-- Helper: Extract jobs from assignment
extractJobs : JobAssignment -> List Job
extractJobs NoJobs = []
extractJobs (PrimaryOnly j) = [j]
extractJobs (DualJobs j1 j2) = [j1, j2]

{-
  What roles does the party currently cover?

  Returns a list of roles with their coverage score (how many characters
  can perform this role decently).
-}

export
partyCoverage : GameState -> List (RoleDimension, Nat)
partyCoverage state =
  let roles = [PhysicalTank, MagicTank, PhysicalDPS, MagicDPS, Support, Debuffer, Healer]
      scoreRole : RoleDimension -> Nat
      scoreRole role =
        length $ filter (canPerformRole role) state.party
  in map (\role => (role, scoreRole role)) roles
  where
    canPerformRole : RoleDimension -> CharacterAssignment -> Bool
    canPerformRole role (MkCharacterAssignment char jbs _) =
      let jobs = extractJobs jbs
          scores = map (\j => characterJobScore char j role) jobs
      in any (>= 6) scores  -- Consider 6+ as "can perform this role"

-- ============================================================================
-- INITIAL GAME STATE
-- ============================================================================

{-
  Starting state: beginning of the game, no assignments yet.
-}

export
initialGameState : GameState
initialGameState = MkGameState
  { party =
      [ MkCharacterAssignment Vaan NoJobs []
      , MkCharacterAssignment Penelo NoJobs []
      , MkCharacterAssignment Balthier NoJobs []
      , MkCharacterAssignment Fran NoJobs []
      , MkCharacterAssignment Basch NoJobs []
      , MkCharacterAssignment Ashe NoJobs []
      ]
  , availableJobs = [Knight, Monk, Uhlan, Archer, Foebreaker, Bushi,
                     Shikari, WhiteMage, BlackMage, RedBattlemage,
                     TimeBattlemage, Machinist]
  , availableEspers = [Belias, Mateus, Adrammelech, Zalera, Shemhazai,
                       Hashmal, Exodus, Cuchulainn, Zeromus, Ultima,
                       Zodiark, Chaos, Famfrit]
  , dualJobStatus = Locked  -- Prologue: pre-Tomb of Raithwall
  }

-- ============================================================================
-- STATE MUTATIONS
-- ============================================================================

{-
  Assign a primary job to a character.
-}

export
assignPrimaryJob : Character -> Job -> GameState -> Maybe GameState
assignPrimaryJob char job (MkGameState pty avJobs avEspers djStatus) =
  case elem job avJobs of
    False => Nothing  -- Job already taken
    True =>
      let updateParty = map (updateChar char) pty
          newAvailable = filter (/= job) avJobs
      in Just $ MkGameState updateParty newAvailable avEspers djStatus
  where
    updateChar : Character -> CharacterAssignment -> CharacterAssignment
    updateChar target ca@(MkCharacterAssignment ch jbs esps) = case ch == target of
      True => MkCharacterAssignment ch (PrimaryOnly job) esps
      False => ca

{-
  Assign a secondary job to a character (requires dual jobs unlocked).
-}

export
assignSecondaryJob : Character -> Job -> GameState -> Maybe GameState
assignSecondaryJob char job state@(MkGameState pty avJobs avEspers djStatus) =
  case djStatus of
    Locked => Nothing  -- Dual jobs not unlocked yet (pre-Raithwall)
    Unlocked => case elem job avJobs of
      False => Nothing  -- Job already taken
      True => case characterJobs char state of
        PrimaryOnly primary =>
          let updateParty = map (updateChar char primary) pty
              newAvailable = filter (/= job) avJobs
          in Just $ MkGameState updateParty newAvailable avEspers djStatus
        _ => Nothing  -- Character doesn't have exactly one job
  where
    updateChar : Character -> Job -> CharacterAssignment -> CharacterAssignment
    updateChar target primary ca@(MkCharacterAssignment ch jbs esps) = case ch == target of
      True => MkCharacterAssignment ch (DualJobs primary job) esps
      False => ca

{-
  Assign an esper to a character.
-}

export
assignEsper : Character -> Esper -> GameState -> Maybe GameState
assignEsper char esper (MkGameState pty avJobs avEspers djStatus) =
  case elem esper avEspers of
    False => Nothing  -- Esper already assigned
    True =>
      let updateParty = map (updateChar char) pty
          newAvailable = filter (/= esper) avEspers
      in Just $ MkGameState updateParty avJobs newAvailable djStatus
  where
    updateChar : Character -> CharacterAssignment -> CharacterAssignment
    updateChar target ca@(MkCharacterAssignment ch jbs esps) = case ch == target of
      True => MkCharacterAssignment ch jbs (esper :: esps)
      False => ca

{-
  Unlock dual job system (story milestone: Tomb of Raithwall completed).

  This also unlocks Belias (obtained as final boss of Raithwall), but Belias
  is already in the initial esper list - we just track whether dual jobs are
  available for assignment.
-}

export
unlockDualJobs : GameState -> GameState
unlockDualJobs (MkGameState pty avJobs avEspers _) =
  MkGameState pty avJobs avEspers Unlocked
