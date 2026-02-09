{-
  Tests/MaxEfficiencyValidation.idr

  Validates the "Max Efficiency" preset with enhanced lore efficiency analysis.

  Max Efficiency optimizes JOB PAIRING efficiency - choosing combinations where
  every natural license on both boards is useful (no wasted Battle/Magick Lores).

  This is INDEPENDENT of esper efficiency - esper waste is a separate concern.
-}

module Tests.MaxEfficiencyValidation_v2

import Data.String
import Tests.ValidationFramework

-- ============================================================================
-- MAX EFFICIENCY PRESET (Ground Truth from data/presets.js)
-- ============================================================================

{-
  The expert-chosen job assignments for the "Max Efficiency" preset:

  Vaan:      Red Battlemage + Knight     (Knight)
  Balthier:  Foebreaker + Uhlan          (Breaker)
  Fran:      Monk + Time Battlemage      (Support Mage - 3 ESPERS!)
  Basch:     Bushi + Black Mage          (Magic DPS)
  Ashe:      Knight + Black Mage         (Paladin Flex)
  Penelo:    White Mage + Shikari        (Evasion Healer)

  Critical Notes:
  - Zero-waste license synergy focus
  - 9/13 espers used (efficient allocation)
  - Basch has no espers (permanent Berserker)
  - Fran Trinity Node: Swiftness 3, Channeling 3, Renew, natural Hastega

  WHAT IT OPTIMIZES:
  - Job pairings where all licenses are useful (high lore efficiency)
  - Example: Bushi + Black Mage - Bushi's Magick Lores boost BM spells,
             BM's MAG stat makes Masamune (MAG-scaling katana) hit harder
-}

export
maxEfficiencyPreset : List CharacterBuild
maxEfficiencyPreset =
  [ MkCharacterBuild Vaan RedBattlemage Knight [Mateus, Exodus] "Knight"
  , MkCharacterBuild Balthier Foebreaker Uhlan [Adrammelech, Hashmal] "Breaker"
  , MkCharacterBuild Fran Monk TimeBattlemage [Zeromus, Ultima, Zodiark] "Support Mage"
  , MkCharacterBuild Basch Bushi BlackMage [] "Magic DPS"
  , MkCharacterBuild Ashe Knight BlackMage [Belias] "Paladin Flex"
  , MkCharacterBuild Penelo WhiteMage Shikari [Cuchulainn] "Evasion Healer"
  ]

-- ============================================================================
-- TEST RUNNER
-- ============================================================================

export
runMaxEfficiencyValidation : IO ()
runMaxEfficiencyValidation = do
  putStrLn "MAX EFFICIENCY PRESET VALIDATION"
  putStrLn "================================"
  putStrLn ""
  putStrLn "This preset optimizes JOB PAIRING efficiency - choosing combinations"
  putStrLn "where every natural license is useful (no wasted augments)."
  putStrLn ""

  -- Analyze all builds
  let analyses = map analyzeBuild maxEfficiencyPreset

  -- Show preset-level summary FIRST
  putStrLn $ reportPresetSummary "MAX EFFICIENCY" analyses

  putStrLn "PER-CHARACTER ANALYSIS:"
  putStrLn "-----------------------"
  traverse_ (putStrLn . reportBuildAnalysis) analyses

  putStrLn ""
  putStrLn "KEY OBSERVATIONS:"
  putStrLn "-----------------"
  putStrLn "1. Check if lore efficiency is high (75%+) - this is what the preset optimizes"
  putStrLn "2. Esper waste is a SEPARATE concern - high lore efficiency with high esper"
  putStrLn "   waste means: great job pairings, but suboptimal esper assignments"
  putStrLn "3. Best pairing example: Bushi + Black Mage (Basch)"
  putStrLn "   - Bushi's Magick Lores boost Black Mage spells"
  putStrLn "   - Black Mage's MAG stat makes Masamune (katana) scale better"
  putStrLn "   - Every license on both boards contributes!"
  putStrLn ""
