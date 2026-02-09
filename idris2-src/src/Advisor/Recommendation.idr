{-
  Advisor/Recommendation.idr

  Progressive decision support: "I'm here, what should I do next?"

  This is the core of the "Coach" mode - analyzing current game state
  and recommending next jobs/espers with reasoning.
-}

module Advisor.Recommendation

import Data.String
import Types.Character
import Types.Job
import Types.Esper
import Types.Goal
import Types.Unlock
import Types.GameState

-- ============================================================================
-- RECOMMENDATION TYPES
-- ============================================================================

{-
  A recommendation with score and human-readable reasoning.
-}

public export
record Recommendation where
  constructor MkRecommendation
  score : Nat                           -- 0-100: how good is this choice?
  reasoning : List String               -- Bullet points explaining why
  warnings : List String                -- Potential downsides or conflicts

-- ============================================================================
-- GAP ANALYSIS
-- ============================================================================

{-
  What roles is the party lacking?

  Returns roles sorted by urgency (missing roles first).
-}

export
identifyGaps : GameState -> List RoleDimension
identifyGaps state =
  let coverage = partyCoverage state
      isCritical : (RoleDimension, Nat) -> Bool
      isCritical (_, count) = count == 0
      isWeak : (RoleDimension, Nat) -> Bool
      isWeak (_, count) = count == 1
      -- Roles with 0 coverage are critical gaps
      criticalGaps = map fst $ filter isCritical coverage
      -- Roles with only 1 character are weak points
      weakPoints = map fst $ filter isWeak coverage
  in criticalGaps ++ weakPoints

{-
  Recommend a job for a character based on filling party gaps.
-}

export
recommendJobForCharacter : Character -> GameState -> List (Job, Recommendation)
recommendJobForCharacter char state =
  let gaps = identifyGaps state
      available = state.availableJobs
      scored = map (scoreJob char gaps state) available
      sorted = sortBy (\(_, r1), (_, r2) => compare r2.score r1.score) scored
  in sorted
  where
    scoreJob : Character -> List RoleDimension -> GameState -> Job -> (Job, Recommendation)
    scoreJob character gapRoles st job =
      let gapScores = map (\role => characterJobScore character job role) gapRoles
          avgGapScore : Nat
          avgGapScore = if length gapScores == 0
                        then 5
                        else cast $ (sum gapScores) `div` (cast $ length gapScores)
          affinityBonus : Nat
          affinityBonus = if avgGapScore >= 7 then 10 else 0
          diversityBonus : Nat
          diversityBonus = 0
          totalScore : Nat
          totalScore = avgGapScore * 10 + affinityBonus + diversityBonus

          charName = show character
          jobName = show job
          goodRoles = filter (\(role, score) => score >= 7) (zip gapRoles gapScores)
          roleDescriptions = map (\(role, score) =>
            "Fills " ++ show role ++ " gap (" ++ show score ++ "/10)") goodRoles
          avgScore : Nat
          avgScore = if length gapScores == 0 then 5 else cast $ (sum gapScores) `div` (cast $ length gapScores)
          affinityNote : List String
          affinityNote = if avgScore >= 8
                         then [charName ++ " has excellent affinity for " ++ jobName]
                         else if avgScore <= 4
                         then [charName ++ " has poor affinity for " ++ jobName]
                         else []
          reasons = roleDescriptions ++ affinityNote
          warns : List String
          warns = []

      in (job, MkRecommendation totalScore reasons warns)

-- ============================================================================
-- ESPER RECOMMENDATIONS
-- ============================================================================

{-
  Recommend which esper to assign to which character.

  Unlike jobs (which are character-specific), espers can go to any character,
  so we return (Character, Esper, Recommendation) tuples.
-}

scoreEsperForChar : Esper -> CharacterAssignment -> Maybe (Character, Esper, Recommendation)
scoreEsperForChar esper (MkCharacterAssignment char NoJobs _) = Nothing
scoreEsperForChar esper (MkCharacterAssignment char (PrimaryOnly primary) _) =
  let unlocks = esperUnlocksForJob esper primary
      unlockCount = length unlocks
      baseScore = unlockCount * 20
      reasons = if unlockCount > 0
                then ["Unlocks " ++ show unlockCount ++ " things for " ++ show primary]
                     ++ map (\u => "  - " ++ show u) unlocks
                else ["No significant unlocks for " ++ show primary]
      warns : List String
      warns = []
  in Just (char, esper, MkRecommendation baseScore reasons warns)
scoreEsperForChar esper (MkCharacterAssignment char (DualJobs primary secondary) _) =
  let primaryUnlocks = esperUnlocksForJob esper primary
      secondaryUnlocks = esperUnlocksForJob esper secondary
      wasted = wastedUnlocks primary secondary esper
      efficiency = esperEfficiency primary secondary esper
      baseScore = efficiency
      reasons =
        (if length primaryUnlocks > 0
         then ["Primary (" ++ show primary ++ "): " ++ unwords (map show primaryUnlocks)]
         else []) ++
        (if length secondaryUnlocks > 0
         then ["Secondary (" ++ show secondary ++ "): " ++ unwords (map show secondaryUnlocks)]
         else [])
      warns : List String
      warns = if length wasted > 0
              then ["⚠️  " ++ show (length wasted) ++ " wasted unlocks: " ++ unwords (map show wasted)]
              else []
  in Just (char, esper, MkRecommendation baseScore reasons warns)

export
recommendEsperAssignments : GameState -> List (Character, Esper, Recommendation)
recommendEsperAssignments state =
  let available = state.availableEspers
      assignments = concatMap (\esper => mapMaybe (scoreEsperForChar esper) state.party) available
      sorted = sortBy (\(_, _, r1), (_, _, r2) => compare r2.score r1.score) assignments
  in sorted

-- ============================================================================
-- STRATEGIC ADVICE
-- ============================================================================

{-
  High-level strategic advice based on current state.

  Examples:
    - "You need a tank - consider Knight or Foebreaker next"
    - "You have no Hastega source - grab Famfrit or Time Battlemage soon"
    - "Party is physical-heavy, consider adding magic DPS"
-}

export
strategicAdvice : GameState -> List String
strategicAdvice state =
  let gaps = identifyGaps state
      coverage = partyCoverage state

      -- Critical gaps (no coverage)
      criticalGaps = filter (\role => fromMaybe 0 (lookup role coverage) == 0) gaps

      -- Check for specific strategic issues
      hasHastega = any (hasHastegaSource) state.party
      hasTank = fromMaybe 0 (lookup PhysicalTank coverage) > 0
      hasHealing = fromMaybe 0 (lookup Healer coverage) > 0

      advice : List String
      advice = []

      -- Critical gaps
      gapAdvice : List String
      gapAdvice = if length criticalGaps > 0
                  then ["🔴 CRITICAL: No " ++ unwords (map show criticalGaps) ++ " coverage"]
                  else []

      -- Hastega check
      hastegaAdvice : List String
      hastegaAdvice = if not hasHastega
                      then ["⚡ No Hastega source - get Time Battlemage or Famfrit esper"]
                      else []

      -- Tank check
      tankAdvice : List String
      tankAdvice = if not hasTank
                   then ["🛡️  No tank - consider Knight, Foebreaker, or Uhlan"]
                   else []

      -- Healing check
      healingAdvice : List String
      healingAdvice = if not hasHealing
                      then ["❤️  No healer - get White Mage, Red Battlemage, or Knight+Mateus"]
                      else []

  in gapAdvice ++ hastegaAdvice ++ tankAdvice ++ healingAdvice

  where
    hasHastegaSource : CharacterAssignment -> Bool
    hasHastegaSource ca = case ca.jobs of
      NoJobs => False
      PrimaryOnly j => j == TimeBattlemage
      DualJobs j1 j2 => j1 == TimeBattlemage || j2 == TimeBattlemage ||
                        any (\e => e == Famfrit && (j1 == Machinist || j2 == Machinist)) ca.espers

-- ============================================================================
-- TOP-LEVEL RECOMMENDATION API
-- ============================================================================

{-
  Given game state and a character, recommend their next job.

  Returns top 3 recommendations with reasoning.
-}

export
recommendNextJob : Character -> GameState -> List (Job, Recommendation)
recommendNextJob char state =
  take 3 $ recommendJobForCharacter char state

{-
  Given game state, recommend next esper assignment.

  Returns top 3 recommendations with reasoning.
-}

export
recommendNextEsper : GameState -> List (Character, Esper, Recommendation)
recommendNextEsper state =
  take 3 $ recommendEsperAssignments state
