{-
  Tests.BigGameHunterValidation.idr

  Validates our domain model against the expert-crafted "Big Game Hunter" preset
  from the original app. This preset was created through extensive playtesting
  and mathematical analysis by experienced players.

  We treat the Balanced build as GROUND TRUTH and test if our affinity/scoring
  system would naturally produce similar results.
-}

module Tests.BigGameHunterValidation

import Data.String

import Types.Goal
import Types.Job
import Types.Character
import Types.Esper
import Types.Unlock

-- ============================================================================
-- BIG GAME HUNTER PRESET (Ground Truth from data/presets.js)
-- ============================================================================

{-
  The expert-chosen job assignments for the "Big Game Hunter" preset:

  Vaan:      Bushi + Knight              (Attacker)
  Balthier:  Monk + Foebreaker           (Brawler - 3 ESPERS!)
  Fran:      Uhlan + Time Battlemage     (Support - 3 ESPERS!)
  Basch:     Knight + Black Mage         (Spellblade)
  Ashe:      Black Mage + White Mage     (Mage)
  Penelo:    White Mage + Shikari        (Healer)

  Critical Notes:
  - Maximum damage focus (sacrifices LP efficiency)
  - 12/13 espers used (heavy concentration on Balthier and Fran)
  - Balthier has all 16 Battle Lores (maximum physical damage)
  - Triple-Berserker core (Vaan, Balthier, plus evasion healer support)
  - Requires Genji Gloves on all DPS characters
-}

public export
record CharacterBuild where
  constructor MkCharacterBuild
  character : Character
  primaryJob : Job
  secondaryJob : Job
  espers : List Esper  -- Esper assignments for this character
  assignedRole : String

export
bigGameHunterPreset : List CharacterBuild
bigGameHunterPreset =
  [ MkCharacterBuild Vaan Bushi Knight [Hashmal, Shemhazai] "Attacker"
  , MkCharacterBuild Balthier Monk Foebreaker [Zeromus, Ultima, Zodiark] "Brawler"
  , MkCharacterBuild Fran Uhlan TimeBattlemage [Mateus, Adrammelech, Famfrit] "Support"
  , MkCharacterBuild Basch Knight BlackMage [Belias, Exodus] "Spellblade"
  , MkCharacterBuild Ashe BlackMage WhiteMage [Chaos] "Mage"
  , MkCharacterBuild Penelo WhiteMage Shikari [Cuchulainn] "Healer"
  ]

-- ============================================================================
-- ANALYSIS HELPERS
-- ============================================================================

{-
  For a character build, calculate scores across all role dimensions
  for BOTH jobs, then report findings.
-}

record BuildAnalysis where
  constructor MkBuildAnalysis
  build : CharacterBuild
  -- Primary job scores (base + esper bonuses)
  primaryPhysTank : Nat
  primaryMagTank : Nat
  primaryPhysDPS : Nat
  primaryMagDPS : Nat
  primarySupport : Nat
  primaryDebuffer : Nat
  primaryHealer : Nat
  -- Secondary job scores (no esper bonuses)
  secondaryPhysTank : Nat
  secondaryMagTank : Nat
  secondaryPhysDPS : Nat
  secondaryMagDPS : Nat
  secondarySupport : Nat
  secondaryDebuffer : Nat
  secondaryHealer : Nat
  -- Esper bonus summary (what espers add to primary job)
  esperBonusSummary : List String
  -- Unlock waste detection
  wastedUnlocksByEsper : List (Esper, List UnlockCategory, Nat)  -- (esper, wasted unlocks, efficiency %)
  completelyWastedEspers : List Esper

-- Helper: Calculate max esper bonus for a job across all assigned espers
maxEsperBonus : List Esper -> Job -> RoleDimension -> Nat
maxEsperBonus [] _ _ = 0
maxEsperBonus (e :: es) job dim =
  let bonus = esperJobBonus e job dim
      rest = maxEsperBonus es job dim
  in max bonus rest

-- Helper: Generate summary of significant esper bonuses (score >= 2)
esperBonuses : List Esper -> Job -> List String
esperBonuses [] _ = []
esperBonuses (e :: es) job =
  let dims = [PhysicalTank, MagicTank, PhysicalDPS, MagicDPS, Support, Debuffer, Healer]
      significantBonuses = filter (\dim => esperJobBonus e job dim >= 2) dims
      bonusStrings = map (\dim => show e ++ " +" ++ show (esperJobBonus e job dim) ++ " " ++ show dim) significantBonuses
      rest = esperBonuses es job
  in bonusStrings ++ rest

-- Analyze waste for a single esper
analyzeEsperWaste : Job -> Job -> Esper -> (Esper, List UnlockCategory, Nat)
analyzeEsperWaste primaryJob secondaryJob esper =
  let wasted = wastedUnlocks primaryJob secondaryJob esper
      efficiency = esperEfficiency primaryJob secondaryJob esper
  in (esper, wasted, efficiency)

export
analyzeBuild : CharacterBuild -> BuildAnalysis
analyzeBuild b =
  let char = b.character
      pJob = b.primaryJob
      sJob = b.secondaryJob
      esps = b.espers

      -- Primary job with esper bonuses
      pPhysTank = characterJobScore char pJob PhysicalTank + maxEsperBonus esps pJob PhysicalTank
      pMagTank = characterJobScore char pJob MagicTank + maxEsperBonus esps pJob MagicTank
      pPhysDPS = characterJobScore char pJob PhysicalDPS + maxEsperBonus esps pJob PhysicalDPS
      pMagDPS = characterJobScore char pJob MagicDPS + maxEsperBonus esps pJob MagicDPS
      pSupport = characterJobScore char pJob Support + maxEsperBonus esps pJob Support
      pDebuffer = characterJobScore char pJob Debuffer + maxEsperBonus esps pJob Debuffer
      pHealer = characterJobScore char pJob Healer + maxEsperBonus esps pJob Healer

      bonusSummary = esperBonuses esps pJob

      -- Analyze unlock waste for each esper
      wasteAnalysis = map (analyzeEsperWaste pJob sJob) esps
      completeWaste = filter (isCompletelyWasted pJob sJob) esps

  in MkBuildAnalysis
       { build = b
       -- Primary job scores (with esper bonuses)
       , primaryPhysTank = pPhysTank
       , primaryMagTank = pMagTank
       , primaryPhysDPS = pPhysDPS
       , primaryMagDPS = pMagDPS
       , primarySupport = pSupport
       , primaryDebuffer = pDebuffer
       , primaryHealer = pHealer
       -- Secondary job scores (no esper bonuses)
       , secondaryPhysTank = characterJobScore char sJob PhysicalTank
       , secondaryMagTank = characterJobScore char sJob MagicTank
       , secondaryPhysDPS = characterJobScore char sJob PhysicalDPS
       , secondaryMagDPS = characterJobScore char sJob MagicDPS
       , secondarySupport = characterJobScore char sJob Support
       , secondaryDebuffer = characterJobScore char sJob Debuffer
       , secondaryHealer = characterJobScore char sJob Healer
       , esperBonusSummary = bonusSummary
       -- Unlock waste analysis
       , wastedUnlocksByEsper = wasteAnalysis
       , completelyWastedEspers = completeWaste
       }

-- ============================================================================
-- REPORTING
-- ============================================================================

{-
  Format a build analysis for console output
-}

export
reportBuildAnalysis : BuildAnalysis -> String
reportBuildAnalysis analysis =
  let b = analysis.build
      char = show b.character
      p = show b.primaryJob
      s = show b.secondaryJob
      role = b.assignedRole

      -- Helper to format score
      fmt : String -> Nat -> Nat -> String
      fmt dim pNat sNat =
        "    " ++ dim ++ ": " ++ show pNat ++ "/" ++ show sNat

      -- Format esper assignments
      esperList = case b.espers of
        [] => "None"
        es => unwords (map show es)

      -- Format esper bonus summary
      bonusLines : List String
      bonusLines = case analysis.esperBonusSummary of
        [] => Prelude.Nil
        bs => ["  Esper Bonuses:"] ++ map (\s => "    " ++ s) bs

      -- Format unlock waste analysis
      wasteLines : List String
      wasteLines =
        let formatWaste : (Esper, List UnlockCategory, Nat) -> String
            formatWaste (esp, wasted, eff) =
              if length wasted == 0
              then "    \x2705 " ++ show esp ++ " - " ++ show eff ++ "% efficient (no waste)"
              else "    \x26a0\xfe0f  " ++ show esp ++ " - " ++ show eff ++ "% efficient | Wasted: " ++ unwords (map show wasted)

            wasteHeader : List String
            wasteHeader = if length analysis.wastedUnlocksByEsper > 0
                          then ["  Unlock Efficiency:"]
                          else Prelude.Nil

            wasteDetails = map formatWaste analysis.wastedUnlocksByEsper

            completeWasteWarning = case analysis.completelyWastedEspers of
              [] => Prelude.Nil
              ws => ["  \x1f6d1 COMPLETELY WASTED: " ++ unwords (map show ws) ++ " (all unlocks redundant!)"]

        in wasteHeader ++ wasteDetails ++ completeWasteWarning

  in unlines $
    [ char ++ ": " ++ p ++ " + " ++ s ++ " (Role: " ++ role ++ ")"
    , "  Espers: " ++ esperList
    , "  Primary/" ++ p ++ " scores:"
    , fmt "Phys Tank " analysis.primaryPhysTank analysis.secondaryPhysTank
    , fmt "Mag Tank  " analysis.primaryMagTank analysis.secondaryMagTank
    , fmt "Phys DPS  " analysis.primaryPhysDPS analysis.secondaryPhysDPS
    , fmt "Mag DPS   " analysis.primaryMagDPS analysis.secondaryMagDPS
    , fmt "Support   " analysis.primarySupport analysis.secondarySupport
    , fmt "Debuffer  " analysis.primaryDebuffer analysis.secondaryDebuffer
    , fmt "Healer    " analysis.primaryHealer analysis.secondaryHealer
    ] ++ bonusLines ++ wasteLines ++ [""]

-- ============================================================================
-- VALIDATION QUESTIONS
-- ============================================================================

{-
  Key questions we want to answer:

  1. Do our scores reflect the PRIMARY ROLE each character plays?
     - Vaan is "Knight" - do his scores show he's a tank?
     - Balthier is "Berserker" - do his scores show high DPS?
     - Fran is "Support" - do her scores show utility/buffs?

  2. Are there BETTER alternatives our model would suggest?
     - Would Basch be a better Knight than Vaan?
     - Would Ashe be better as pure Black Mage vs. BLM/WHM?

  3. Do the job pairings make sense given synergy?
     - Red Battlemage + Knight (magic + physical synergy?)
     - Foebreaker + Bushi (breaks + katana DPS?)

  We're NOT trying to prove our model is right - we're trying to see
  WHERE it diverges from expert knowledge, so we can learn.
-}

-- ============================================================================
-- ALTERNATIVE SUGGESTIONS
-- ============================================================================

{-
  For each character, what job pairing would our model score HIGHEST
  for their assigned role?

  This lets us see if experts chose suboptimal pairings for strategic reasons
  our model doesn't capture (e.g., esper unlocks, gear availability, etc.)
-}

{-
  TODO: Implement functions like:

  bestTankForCharacter : Character -> (Job, Job, Nat)
  bestDPSForCharacter : Character -> (Job, Job, Nat)
  bestSupportForCharacter : Character -> (Job, Job, Nat)

  These would search all job pairings and find the highest-scoring combination.
-}

-- ============================================================================
-- TEST RUNNER
-- ============================================================================

export
runBigGameHunterValidation : IO ()
runBigGameHunterValidation = do
  putStrLn "BIG GAME HUNTER PRESET VALIDATION"
  putStrLn "=========================="
  putStrLn ""
  putStrLn "Testing our domain model against expert-crafted builds."
  putStrLn "The 'Balanced' preset was created through extensive playtesting."
  putStrLn ""

  -- Analyze all builds
  let analyses = map analyzeBuild bigGameHunterPreset

  putStrLn "ACTUAL ASSIGNMENTS & SCORES:"
  putStrLn "----------------------------"
  traverse_ (putStrLn . reportBuildAnalysis) analyses

  putStrLn ""
  putStrLn "OBSERVATIONS:"
  putStrLn "-------------"
  putStrLn "(To be filled in after seeing results)"
  putStrLn ""
  putStrLn "Questions to answer:"
  putStrLn "1. Do scores match assigned roles?"
  putStrLn "2. Are there clearly better alternatives?"
  putStrLn "3. What strategic factors might our model miss?"
