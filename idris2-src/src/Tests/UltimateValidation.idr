{-
  Tests/UltimateValidation.idr

  Validates the "Spare No Expense" (Ultimate) preset - a Trial Mode luxury
  build with no equipment compromises.

  Key Strategy: Best-in-slot job pairings prioritized over license efficiency.
  Requires Trial Mode farming: 2 Genji Gloves, unlimited Ribbons, multiple
  Zodiac Spears. Fran receives 5 espers (maximum concentration) for complete
  Monk Trinity + Time Battlemage synergy.

  This build tests:
  - Maximum esper concentration (5 on Fran)
  - Best-in-slot pairings (Bushi/Knight for Excalibur + White Robes)
  - Trial Mode assumptions (2 Genji Gloves, unlimited Ribbons)
  - Trade-off: raw power vs. license efficiency
-}

module Tests.UltimateValidation

import Data.String

import Types.Goal
import Types.Job
import Types.Character
import Types.Esper
import Types.Unlock

-- ============================================================================
-- ULTIMATE PRESET (Ground Truth from data/presets.js)
-- ============================================================================

{-
  The expert-chosen job assignments for "Spare No Expense":

  Penelo:    White Mage + Shikari         (Evasion Healer)
  Fran:      Monk + Time Battlemage       (Support Mage - 5 ESPERS!)
  Vaan:      Bushi + Knight               (Warrior)
  Balthier:  Archer + Foebreaker          (Ranged DPS)
  Basch:     Uhlan + Bushi                (Spear DPS)
  Ashe:      Black Mage + White Mage      (Ultimate Mage)

  Critical Notes:
  - Requires Trial Mode farming: 2 Genji Gloves, unlimited Ribbons, multiple Zodiac Spears
  - Fran receives 5 espers (Adrammelech, Zeromus, Chaos, Ultima, Zodiark)
  - Bushi/Knight for Excalibur + White Robes synergy (50% Holy boost)
  - Uhlan/Bushi for Holy Lance + White Robes synergy
  - Archer/Foebreaker for maximum Battle Lores boosting bow damage
  - Sole Hastega source: Fran (Time Battlemage natural)
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
ultimatePreset : List CharacterBuild
ultimatePreset =
  [ MkCharacterBuild Penelo WhiteMage Shikari [Zalera] "Evasion Healer"
  , MkCharacterBuild Fran Monk TimeBattlemage [Adrammelech, Zeromus, Chaos, Ultima, Zodiark] "Support Mage"
  , MkCharacterBuild Vaan Bushi Knight [Belias, Mateus, Hashmal] "Warrior"
  , MkCharacterBuild Balthier Archer Foebreaker [Shemhazai] "Ranged DPS"
  , MkCharacterBuild Basch Uhlan Bushi [Cuchulainn, Famfrit] "Spear DPS"
  , MkCharacterBuild Ashe BlackMage WhiteMage [Exodus] "Ultimate Mage"
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

      -- Flag if this character has unusual esper count
      esperCount = length b.espers
      esperCountWarning = if esperCount >= 4
                          then " ⚡ MAXIMUM CONCENTRATION (" ++ show esperCount ++ " espers)"
                          else ""

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
    [ char ++ ": " ++ p ++ " + " ++ s ++ " (Role: " ++ role ++ ")" ++ esperCountWarning
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
  putStrLn "ULTIMATE PRESET VALIDATION"
  putStrLn "=========================="
  putStrLn ""
  putStrLn "Testing Trial Mode luxury build with no equipment compromises."
  putStrLn ""
  putStrLn "Build Strategy:"
  putStrLn "- Best-in-slot job pairings prioritized over license efficiency"
  putStrLn "- Requires Trial Mode: 2 Genji Gloves, unlimited Ribbons, multiple Zodiac Spears"
  putStrLn "- Fran receives 5 espers (maximum concentration)"
  putStrLn "- Bushi/Knight for Excalibur + White Robes (50% Holy boost)"
  putStrLn "- Uhlan/Bushi for Holy Lance + White Robes (50% Holy boost)"
  putStrLn "- Fran = sole Hastega source (Time Battlemage natural)"
  putStrLn ""

  let analyses = map analyzeBuild ultimatePreset

  putStrLn "ACTUAL ASSIGNMENTS & SCORES:"
  putStrLn "----------------------------"
  traverse_ (putStrLn . reportBuildAnalysis) analyses

  putStrLn ""
  putStrLn "CRITICAL OBSERVATIONS:"
  putStrLn "----------------------"
  putStrLn "1. Does Fran's 5-esper concentration provide maximum utility?"
  putStrLn "2. How much esper waste exists in this 'no compromises' build?"
  putStrLn "3. Does Bushi/Knight (Vaan) show better synergy than Foebreaker/Bushi (Balanced)?"
  putStrLn "4. Does Archer/Foebreaker (Balthier) justify maximum Battle Lore stacking?"
  putStrLn "5. Does Uhlan/Bushi (Basch) show Holy Lance + White Robes synergy?"
  putStrLn "6. How does this build compare to 'Balanced' in terms of waste?"
  putStrLn ""
