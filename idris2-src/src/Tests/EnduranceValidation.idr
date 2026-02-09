{-
  Tests/EnduranceValidation.idr

  Validates the "Yiazmat Specialist" (Endurance) preset - designed for
  multi-hour superboss fights.

  Key Strategy: Berserked Penelo with Dark-boosted Yagyu Darkblade exploits
  Yiazmat's Dark weakness. Support cast provides Hastega, Reverse, Expose,
  and infinite MP through rotation cycles.

  This build tests:
  - Specialized boss strategies (elemental weakness exploitation)
  - Multi-hour endurance mechanics (rotation cycling, MP management)
  - Sequential party compositions (6 characters rotating through 3 stages)
  - Single point of failure (Fran must be in every rotation - sole Hastega)

  Note: This build has isSequential: true in the original preset.
-}

module Tests.EnduranceValidation

import Data.String

import Types.Goal
import Types.Job
import Types.Character
import Types.Esper
import Types.Unlock

-- ============================================================================
-- ENDURANCE PRESET (Ground Truth from data/presets.js)
-- ============================================================================

{-
  The expert-chosen job assignments for "Yiazmat Specialist":

  Penelo:    White Mage + Shikari         (Attacker - PRIMARY DPS)
  Fran:      Monk + Time Battlemage       (Support - CRITICAL: sole Hastega)
  Ashe:      Black Mage + White Mage      (Primary Healer)
  Balthier:  Monk + Foebreaker            (Break Specialist)
  Vaan:      Red Battlemage + Knight      (Support)
  Basch:     Archer + Uhlan               (Ranged Support)

  Critical Notes:
  - Yiazmat is Dark-weak
  - Primary DPS: Berserked Yagyu Darkblade (Dark ninja sword) + Black Robes (50% Dark boost)
  - Multi-hour fight requires all 6 characters rotating through stages
  - Fran must be in every party rotation - no backup Hastega
  - Stage 1: Penelo + Fran + Ashe (primary damage phase)
  - Stage 2: Balthier + Vaan + Basch (recovery phase)
  - Stage 3: Penelo + Ashe + Balthier (marathon phase)
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
endurancePreset : List CharacterBuild
endurancePreset =
  [ MkCharacterBuild Penelo WhiteMage Shikari [Cuchulainn] "Attacker"
  , MkCharacterBuild Fran Monk TimeBattlemage [Zeromus, Ultima] "Support"
  , MkCharacterBuild Ashe BlackMage WhiteMage [Exodus, Chaos] "Primary Healer"
  , MkCharacterBuild Balthier Monk Foebreaker [Hashmal, Zodiark] "Break Specialist"
  , MkCharacterBuild Vaan RedBattlemage Knight [Mateus] "Support"
  , MkCharacterBuild Basch Archer Uhlan [Adrammelech, Shemhazai] "Ranged Support"
  ]

-- ============================================================================
-- ANALYSIS HELPERS
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
  putStrLn "ENDURANCE PRESET VALIDATION"
  putStrLn "==========================="
  putStrLn ""
  putStrLn "Testing multi-hour superboss build (Yiazmat Specialist)."
  putStrLn ""
  putStrLn "Build Strategy:"
  putStrLn "- Penelo: Berserked Yagyu Darkblade + Black Robes (50% Dark boost)"
  putStrLn "- Yiazmat is Dark-weak (primary DPS strategy)"
  putStrLn "- All 6 characters rotate through 3 stages for MP recovery"
  putStrLn "- Fran must be in every rotation (sole Hastega)"
  putStrLn ""
  putStrLn "Stage 1 (Dark Assault):    Penelo + Fran + Ashe"
  putStrLn "Stage 2 (Relief Rotation): Balthier + Vaan + Basch"
  putStrLn "Stage 3 (Marathon Phase):  Penelo + Ashe + Balthier"
  putStrLn ""

  let analyses = map analyzeBuild endurancePreset

  putStrLn "ACTUAL ASSIGNMENTS & SCORES:"
  putStrLn "----------------------------"
  traverse_ (putStrLn . reportBuildAnalysis) analyses

  putStrLn ""
  putStrLn "CRITICAL OBSERVATIONS:"
  putStrLn "----------------------"
  putStrLn "1. Does Penelo's White Mage/Shikari reflect her primary DPS role?"
  putStrLn "   (This is COUNTERINTUITIVE - healer class as primary attacker)"
  putStrLn "2. Does Fran's Support score justify her presence in all rotations?"
  putStrLn "3. Does Balthier's Monk/Foebreaker show Break specialist capability?"
  putStrLn "4. How does esper waste compare to general-use builds?"
  putStrLn "5. Does the build show specialization for a single fight?"
  putStrLn ""
