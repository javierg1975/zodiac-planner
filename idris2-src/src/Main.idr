{-
  Main.idr

  Simple test runner to validate our refactored type system.

  Tests:
  1. Capability type system
  2. Job profiles
  3. Character affinities
  4. Combined character+job scoring
  5. One build from "Balanced" preset
-}

module Main

import Types.Job
import Types.Character
import Types.Esper
import Types.Goal

-- ============================================================================
-- TEST HELPERS
-- ============================================================================

testSection : String -> IO ()
testSection name = putStrLn $ "\n========== " ++ name ++ " =========="

testCase : String -> Bool -> IO ()
testCase desc True = putStrLn $ "  ✓ " ++ desc
testCase desc False = putStrLn $ "  ✗ FAIL: " ++ desc

assertEqual : (Eq a, Show a) => String -> a -> a -> IO ()
assertEqual desc expected actual =
  if expected == actual
  then putStrLn $ "  ✓ " ++ desc
  else putStrLn $ "  ✗ FAIL: " ++ desc ++
                   "\n    Expected: " ++ show expected ++
                   "\n    Got: " ++ show actual

-- ============================================================================
-- CAPABILITY SYSTEM TESTS
-- ============================================================================

testCapabilityOrdering : IO ()
testCapabilityOrdering = do
  testSection "Capability Type Ordering"
  testCase "None < Weak" (None < Weak)
  testCase "Weak < Limited" (Weak < Limited)
  testCase "Limited < Adequate" (Limited < Adequate)
  testCase "Adequate < Strong" (Adequate < Strong)
  testCase "Strong < Excellent" (Strong < Excellent)

testCapabilityScores : IO ()
testCapabilityScores = do
  testSection "Capability to Numeric Conversion"
  assertEqual "None = 0" 0 (capabilityScore None)
  assertEqual "Weak = 2" 2 (capabilityScore Weak)
  assertEqual "Limited = 4" 4 (capabilityScore Limited)
  assertEqual "Adequate = 5" 5 (capabilityScore Adequate)
  assertEqual "Strong = 7" 7 (capabilityScore Strong)
  assertEqual "Excellent = 9" 9 (capabilityScore Excellent)

-- ============================================================================
-- JOB PROFILE TESTS
-- ============================================================================

testJobProfiles : IO ()
testJobProfiles = do
  testSection "Job Capability Profiles"

  -- Shikari: Excellent physical DPS, evasion tank
  assertEqual "Shikari PhysicalDPS" Excellent (jobCapability Shikari PhysicalDPS)
  assertEqual "Shikari PhysicalTank" Strong (jobCapability Shikari PhysicalTank)
  assertEqual "Shikari MagicDPS" Weak (jobCapability Shikari MagicDPS)

  -- White Mage: Excellent healer and support
  assertEqual "WhiteMage Healer" Excellent (jobCapability WhiteMage Healer)
  assertEqual "WhiteMage Support" Excellent (jobCapability WhiteMage Support)
  assertEqual "WhiteMage PhysicalDPS" Weak (jobCapability WhiteMage PhysicalDPS)

  -- Foebreaker: Excellent debuffer
  assertEqual "Foebreaker Debuffer" Excellent (jobCapability Foebreaker Debuffer)

  -- Black Mage: Excellent magic DPS
  assertEqual "BlackMage MagicDPS" Excellent (jobCapability BlackMage MagicDPS)

-- ============================================================================
-- CHARACTER AFFINITY TESTS
-- ============================================================================

testCharacterAffinities : IO ()
testCharacterAffinities = do
  testSection "Character Natural Affinities"

  -- Ashe: High magic affinity
  let asheMagic = characterAffinity Ashe MagicDPS
  testCase "Ashe has strong magic affinity (>= 8)" (asheMagic >= 8)
  putStrLn $ "    Ashe MagicDPS affinity: " ++ show asheMagic

  -- Balthier: Balanced stats
  let balthierPhys = characterAffinity Balthier PhysicalDPS
  let balthierMag = characterAffinity Balthier MagicDPS
  putStrLn $ "    Balthier PhysicalDPS: " ++ show balthierPhys
  putStrLn $ "    Balthier MagicDPS: " ++ show balthierMag

  -- Basch: Physical tank
  let baschTank = characterAffinity Basch PhysicalTank
  testCase "Basch has decent tank affinity (>= 6)" (baschTank >= 6)
  putStrLn $ "    Basch PhysicalTank affinity: " ++ show baschTank

-- ============================================================================
-- COMBINED CHARACTER + JOB TESTS
-- ============================================================================

testCharacterJobSynergy : IO ()
testCharacterJobSynergy = do
  testSection "Character + Job Synergy (30% char + 70% job)"

  -- Ashe + Black Mage: Both excel at magic (should score ~9-10)
  let asheBlm = characterJobScore Ashe BlackMage MagicDPS
  testCase "Ashe + BlackMage MagicDPS (>= 8)" (asheBlm >= 8)
  putStrLn $ "    Score: " ++ show asheBlm ++ "/10"

  -- Vaan + Shikari: Good physical DPS synergy
  let vaanShk = characterJobScore Vaan Shikari PhysicalDPS
  putStrLn $ "    Vaan + Shikari PhysicalDPS: " ++ show vaanShk ++ "/10"

  -- Bad pairing: Ashe + Knight physical DPS (should be mediocre)
  let asheKnight = characterJobScore Ashe Knight PhysicalDPS
  testCase "Ashe + Knight PhysicalDPS is mediocre (<= 6)" (asheKnight <= 6)
  putStrLn $ "    Score: " ++ show asheKnight ++ "/10 (expected low)"

-- ============================================================================
-- BALANCED PRESET VALIDATION
-- ============================================================================

testBalancedPreset : IO ()
testBalancedPreset = do
  testSection "Balanced Preset Validation (Sample)"

  putStrLn "  Ashe: BlackMage + WhiteMage (assigned role: Mage)"
  putStrLn "  Expected: Strong magic capabilities across the board"
  putStrLn ""

  -- Primary job (Black Mage)
  let blmMagicDPS = characterJobScore Ashe BlackMage MagicDPS
  let blmHealer = characterJobScore Ashe BlackMage Healer

  putStrLn $ "    BlackMage MagicDPS: " ++ show blmMagicDPS ++ "/10"
  putStrLn $ "    BlackMage Healer: " ++ show blmHealer ++ "/10"

  -- Secondary job (White Mage)
  let whmHealer = characterJobScore Ashe WhiteMage Healer
  let whmSupport = characterJobScore Ashe WhiteMage Support

  putStrLn $ "    WhiteMage Healer: " ++ show whmHealer ++ "/10"
  putStrLn $ "    WhiteMage Support: " ++ show whmSupport ++ "/10"

  -- Validation
  testCase "Ashe + BLM excels at magic damage (>= 8)" (blmMagicDPS >= 8)
  testCase "Ashe + WHM excels at healing (>= 8)" (whmHealer >= 8)
  testCase "Combined: versatile mage" (blmMagicDPS >= 8 && whmHealer >= 8)

-- ============================================================================
-- JOB CATEGORY TESTS
-- ============================================================================

testJobCategories : IO ()
testJobCategories = do
  testSection "Job Categories (for LP efficiency)"

  assertEqual "Knight is HeavyPhysical" HeavyPhysical (jobCategory Knight)
  assertEqual "Uhlan is HeavyPhysical" HeavyPhysical (jobCategory Uhlan)
  assertEqual "Shikari is LightPhysical" LightPhysical (jobCategory Shikari)
  assertEqual "WhiteMage is PureMagic" PureMagic (jobCategory WhiteMage)
  assertEqual "RedBattlemage is HybridMagic" HybridMagic (jobCategory RedBattlemage)

  -- Test pairing efficiency
  let knightUhlan = jobPairEfficiency Knight Uhlan
  let knightShikari = jobPairEfficiency Knight Shikari

  putStrLn $ "    Knight + Uhlan (same category): " ++ show knightUhlan ++ "% efficiency"
  putStrLn $ "    Knight + Shikari (different): " ++ show knightShikari ++ "% efficiency"

  testCase "Same category = lower efficiency" (knightUhlan < knightShikari)

-- ============================================================================
-- MAIN RUNNER
-- ============================================================================

main : IO ()
main = do
  putStrLn "╔════════════════════════════════════════════════════════════╗"
  putStrLn "║  FFXII Zodiac Planner - Type System Validation Tests      ║"
  putStrLn "╚════════════════════════════════════════════════════════════╝"

  testCapabilityOrdering
  testCapabilityScores
  testJobProfiles
  testCharacterAffinities
  testCharacterJobSynergy
  testJobCategories
  testBalancedPreset

  putStrLn "\n========== Tests Complete =========="
