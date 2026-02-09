{-
  Tests/ValidationFramework.idr

  Shared validation framework with lore efficiency analysis and trade-off modeling.
  Used by all preset validators to ensure consistent analysis.
-}

module Tests.ValidationFramework

import Data.String
import Types.Goal
import Types.Job
import Types.Character
import Types.Esper
import Types.Unlock
import Types.Lores

-- ============================================================================
-- TRADE-OFF MODELING
-- ============================================================================

||| Explicit trade-offs in a build - what you gain vs what you lose
public export
record BuildTradeoffs where
  constructor MkTradeoffs
  strengths : List String      -- What this build excels at
  weaknesses : List String     -- What this build sacrifices
  requirements : List String   -- External dependencies (gear, espers, etc.)
  risks : List String          -- Single points of failure, fragility

||| Calculate trade-offs for a preset based on analysis
export
analyzeTradeoffs : String -> List BuildAnalysis -> BuildTradeoffs
analyzeTradeoffs presetName analyses =
  -- TODO: Implement based on preset characteristics
  -- For now, return empty
  MkTradeoffs [] [] [] []

-- ============================================================================
-- ENHANCED BUILD ANALYSIS
-- ============================================================================

public export
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
  -- LORE EFFICIENCY (NEW)
  loreEfficiency : Nat  -- Percentage of non-overlapping lores (0-100)
  loreBattleOverlap : Nat  -- Battle Lore overlap percentage
  loreMagickOverlap : Nat  -- Magick Lore overlap percentage

public export
record CharacterBuild where
  constructor MkCharacterBuild
  character : Character
  primaryJob : Job
  secondaryJob : Job
  espers : List Esper
  assignedRole : String

-- ============================================================================
-- ANALYSIS HELPERS
-- ============================================================================

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

-- Main build analysis function
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

      -- LORE EFFICIENCY ANALYSIS (NEW!)
      loreEff = loreEfficiencyScore pJob sJob
      loreProf = loreProfile pJob sJob
      battleOverlap = loreProf.battleOverlap
      magickOverlap = loreProf.magickOverlap

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
       -- Lore efficiency (NEW!)
       , loreEfficiency = loreEff
       , loreBattleOverlap = battleOverlap
       , loreMagickOverlap = magickOverlap
       }

-- ============================================================================
-- REPORTING
-- ============================================================================

||| Format lore efficiency for display
formatLoreEfficiency : BuildAnalysis -> List String
formatLoreEfficiency analysis =
  let eff = loreEfficiency analysis
      bOverlap = loreBattleOverlap analysis
      mOverlap = loreMagickOverlap analysis

      effRating : String
      effRating = if eff >= 80 then "⭐ EXCELLENT"
                  else if eff >= 70 then "✓ GOOD"
                  else if eff >= 60 then "~ ACCEPTABLE"
                  else "⚠ POOR"
  in
    [ "  Job Pairing Efficiency: " ++ show eff ++ "% " ++ effRating
    , "    Battle Lore overlap: " ++ show bOverlap ++ "%"
    , "    Magick Lore overlap: " ++ show mOverlap ++ "%"
    ]

||| Format a build analysis for console output
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

      -- Format lore efficiency (NEW!)
      loreLines = formatLoreEfficiency analysis

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
              then "    ✅ " ++ show esp ++ " - " ++ show eff ++ "% efficient (no waste)"
              else "    ⚠️  " ++ show esp ++ " - " ++ show eff ++ "% efficient | Wasted: " ++ unwords (map show wasted)

            wasteHeader : List String
            wasteHeader = if length analysis.wastedUnlocksByEsper > 0
                          then ["  Unlock Efficiency:"]
                          else Prelude.Nil

            wasteDetails = map formatWaste analysis.wastedUnlocksByEsper

            completeWasteWarning = case analysis.completelyWastedEspers of
              [] => Prelude.Nil
              ws => ["  🛑 COMPLETELY WASTED: " ++ unwords (map show ws) ++ " (all unlocks redundant!)"]

        in wasteHeader ++ wasteDetails ++ completeWasteWarning

  in unlines $
    [ char ++ ": " ++ p ++ " + " ++ s ++ " (Role: " ++ role ++ ")"
    , "  Espers: " ++ esperList
    ] ++ loreLines ++
    [ "  Primary/" ++ p ++ " scores:"
    , fmt "Phys Tank " analysis.primaryPhysTank analysis.secondaryPhysTank
    , fmt "Mag Tank  " analysis.primaryMagTank analysis.secondaryMagTank
    , fmt "Phys DPS  " analysis.primaryPhysDPS analysis.secondaryPhysDPS
    , fmt "Mag DPS   " analysis.primaryMagDPS analysis.secondaryMagDPS
    , fmt "Support   " analysis.primarySupport analysis.secondarySupport
    , fmt "Debuffer  " analysis.primaryDebuffer analysis.secondaryDebuffer
    , fmt "Healer    " analysis.primaryHealer analysis.secondaryHealer
    ] ++ bonusLines ++ wasteLines ++ [""]

-- ============================================================================
-- PRESET-LEVEL ANALYSIS
-- ============================================================================

||| Calculate average lore efficiency for an entire preset
export
averageLoreEfficiency : List BuildAnalysis -> Nat
averageLoreEfficiency [] = 0
averageLoreEfficiency analyses =
  let totalEff = sum (map loreEfficiency analyses)
      count = length analyses
  in totalEff `div` count

||| Calculate esper waste percentage for an entire preset (simplified version)
export
esperWastePercentage : List BuildAnalysis -> Nat
esperWastePercentage analyses = 0  -- TODO: Implement after fixing record access

||| Report preset-level summary
export
reportPresetSummary : String -> List BuildAnalysis -> String
reportPresetSummary presetName analyses =
  let avgLoreEff = averageLoreEfficiency analyses
  in unlines
    [ "==============================================================================="
    , presetName ++ " PRESET SUMMARY"
    , "==============================================================================="
    , ""
    , "Job Pairing Efficiency (what Max Efficiency optimizes):"
    , "  Average lore efficiency: " ++ show avgLoreEff ++ "% " ++
        (if avgLoreEff >= 75 then "⭐ EXCELLENT"
         else if avgLoreEff >= 65 then "✓ GOOD"
         else if avgLoreEff >= 55 then "~ ACCEPTABLE"
         else "⚠ NEEDS IMPROVEMENT")
    , ""
    , "Key Insight:"
    , "  High lore efficiency = smart job pairings (every license is useful)"
    , "  This is independent of esper assignment efficiency!"
    , ""
    ]
