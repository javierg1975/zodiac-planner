{-
  Tests/TrinityValidation.idr

  Validates the "Leader Trinity" preset - an evasion-focused build
  optimized for leader tanking mechanics.

  Key Strategy: Vaan (Red Battlemage + Shikari) leads with Main Gauche + Shield
  for 90%+ evasion, making him nearly untouchable. Support focuses on offense
  since the leader dodges most attacks.

  This build tests:
  - Evasion tanking mechanics (PhysicalTank via dodge)
  - Main Gauche synergy (Shikari specialty)
  - Single point of failure (Fran = only Hastega)
-}

module Tests.TrinityValidation

import Data.String

import Types.Goal
import Types.Job
import Types.Character
import Types.Esper
import Types.Unlock

-- ============================================================================
-- TRINITY PRESET (Ground Truth from data/presets.js)
-- ============================================================================

{-
  The expert-chosen job assignments for "Leader Trinity":

  Vaan:      Red Battlemage + Shikari     (Evasion Tank)
  Balthier:  Knight + Black Mage          (Battle Mage)
  Fran:      Monk + Time Battlemage       (Support - CRITICAL: sole Hastega)
  Basch:     Bushi + Knight               (Attacker)
  Ashe:      Black Mage + White Mage      (Magick Support)
  Penelo:    White Mage + Archer          (Support)

  Critical Notes:
  - Won't work without Main Gauche evasion stacking
  - Strategy relies on Party Lead dodging all physical attacks
  - No backup Hastega source - keep Fran alive
-}

public export
record CharacterBuild where
  constructor MkCharacterBuild
  character : Character
  primaryJob : Job
  secondaryJob : Job
  espers : List Esper
  assignedRole : String

export
trinityPreset : List CharacterBuild
trinityPreset =
  [ MkCharacterBuild Vaan RedBattlemage Shikari [Mateus, Cuchulainn, Exodus] "Evasion Tank"
  , MkCharacterBuild Balthier Knight BlackMage [Hashmal] "Battle Mage"
  , MkCharacterBuild Fran Monk TimeBattlemage [Zeromus, Ultima, Zodiark] "Support"
  , MkCharacterBuild Basch Bushi Knight [Belias, Chaos] "Attacker"
  , MkCharacterBuild Ashe BlackMage WhiteMage [Zalera] "Magick Support"
  , MkCharacterBuild Penelo WhiteMage Archer [Adrammelech, Shemhazai] "Support"
  ]

-- ============================================================================
-- ANALYSIS HELPERS (shared structure with BalancedValidation)
-- ============================================================================

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
  -- Esper bonus summary
  esperBonusSummary : List String
  -- Unlock waste detection
  wastedUnlocksByEsper : List (Esper, List UnlockCategory, Nat)
  completelyWastedEspers : List Esper

maxEsperBonus : List Esper -> Job -> RoleDimension -> Nat
maxEsperBonus [] _ _ = 0
maxEsperBonus (e :: es) job dim =
  let bonus = esperJobBonus e job dim
      rest = maxEsperBonus es job dim
  in max bonus rest

esperBonuses : List Esper -> Job -> List String
esperBonuses [] _ = []
esperBonuses (e :: es) job =
  let dims = [PhysicalTank, MagicTank, PhysicalDPS, MagicDPS, Support, Debuffer, Healer]
      significantBonuses = filter (\dim => esperJobBonus e job dim >= 2) dims
      bonusStrings = map (\dim => show e ++ " +" ++ show (esperJobBonus e job dim) ++ " " ++ show dim) significantBonuses
      rest = esperBonuses es job
  in bonusStrings ++ rest

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

      -- Analyze unlock waste
      wasteAnalysis = map (analyzeEsperWaste pJob sJob) esps
      completeWaste = filter (isCompletelyWasted pJob sJob) esps

  in MkBuildAnalysis
       { build = b
       , primaryPhysTank = pPhysTank
       , primaryMagTank = pMagTank
       , primaryPhysDPS = pPhysDPS
       , primaryMagDPS = pMagDPS
       , primarySupport = pSupport
       , primaryDebuffer = pDebuffer
       , primaryHealer = pHealer
       , secondaryPhysTank = characterJobScore char sJob PhysicalTank
       , secondaryMagTank = characterJobScore char sJob MagicTank
       , secondaryPhysDPS = characterJobScore char sJob PhysicalDPS
       , secondaryMagDPS = characterJobScore char sJob MagicDPS
       , secondarySupport = characterJobScore char sJob Support
       , secondaryDebuffer = characterJobScore char sJob Debuffer
       , secondaryHealer = characterJobScore char sJob Healer
       , esperBonusSummary = bonusSummary
       , wastedUnlocksByEsper = wasteAnalysis
       , completelyWastedEspers = completeWaste
       }

-- ============================================================================
-- REPORTING
-- ============================================================================

export
reportBuildAnalysis : BuildAnalysis -> String
reportBuildAnalysis analysis =
  let b = analysis.build
      char = show b.character
      p = show b.primaryJob
      s = show b.secondaryJob
      role = b.assignedRole

      fmt : String -> Nat -> Nat -> String
      fmt dim pNat sNat =
        "    " ++ dim ++ ": " ++ show pNat ++ "/" ++ show sNat

      esperList = case b.espers of
        [] => "None"
        es => unwords (map show es)

      bonusLines : List String
      bonusLines = case analysis.esperBonusSummary of
        [] => Prelude.Nil
        bs => ("  Esper Bonuses:" :: Prelude.Nil) ++ map (\s => "    " ++ s) bs

      wasteLines : List String
      wasteLines =
        let formatWaste : (Esper, List UnlockCategory, Nat) -> String
            formatWaste (esp, wasted, eff) =
              if length wasted == 0
              then "    \x2705 " ++ show esp ++ " - " ++ show eff ++ "% efficient (no waste)"
              else "    \x26a0\xfe0f  " ++ show esp ++ " - " ++ show eff ++ "% efficient | Wasted: " ++ unwords (map show wasted)

            wasteHeader = if length analysis.wastedUnlocksByEsper > 0
                          then ("  Unlock Efficiency:" :: Prelude.Nil)
                          else Prelude.Nil

            wasteDetails = map formatWaste analysis.wastedUnlocksByEsper

            completeWasteWarning : List String
            completeWasteWarning = case analysis.completelyWastedEspers of
              [] => Prelude.Nil
              ws => (("  \x1f6d1 COMPLETELY WASTED: " ++ unwords (map show ws) ++ " (all unlocks redundant!)") :: Prelude.Nil)

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
-- TEST RUNNER
-- ============================================================================

export
runValidation : IO ()
runValidation = do
  putStrLn "TRINITY PRESET VALIDATION"
  putStrLn "========================="
  putStrLn ""
  putStrLn "Testing evasion-focused build optimized for leader tanking."
  putStrLn ""
  putStrLn "Build Strategy:"
  putStrLn "- Vaan leads with Main Gauche + Shield (90%+ evasion)"
  putStrLn "- Support focuses on offense (leader dodges most attacks)"
  putStrLn "- Fran = sole Hastega source (single point of failure)"
  putStrLn ""

  let analyses = map analyzeBuild trinityPreset

  putStrLn "ACTUAL ASSIGNMENTS & SCORES:"
  putStrLn "----------------------------"
  traverse_ (putStrLn . reportBuildAnalysis) analyses

  putStrLn ""
  putStrLn "CRITICAL OBSERVATIONS:"
  putStrLn "----------------------"
  putStrLn "1. Does Vaan's Red Battlemage/Shikari show evasion tanking capability?"
  putStrLn "2. Does Fran's Support score reflect her critical Hastega role?"
  putStrLn "3. How does esper waste compare to Balanced build?"
  putStrLn "4. Are there redundancies in magic support (Ashe + Penelo)?"
  putStrLn ""
