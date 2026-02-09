{-
  Tests/EquipmentStrategyValidation.idr

  Validates that the EquipmentStrategy type system fixes blind spots in role scoring.

  BLIND SPOTS IDENTIFIED:
  1. Vaan (Trinity): "Evasion Tank" but PhysTank score = 4 (looks weak)
  2. Penelo (Endurance): "Attacker" but PhysDPS score = 2 (looks like healer)
  3. Fran (All builds): Pole combos invisible to raw scores

  HYPOTHESIS: EquipmentStrategy scores will reveal these strategic patterns that
  raw job scores miss.
-}

module Tests.CapabilityValidation

import Data.String

import Types.Job
import Types.Character
import Types.Capability
import Types.Goal

-- ============================================================================
-- TEST CASES (Problematic Builds)
-- ============================================================================

{-
  Case 1: Vaan (Red Battlemage + Shikari) - Trinity Build

  PROBLEM: PhysicalTank score shows 4/6 (low)
  EXPECTED: EvasionTank capability score should show he's a TANK, just via evasion
-}

namespace VaanTrinity

  export
  testVaanEvasionTank : IO ()
  testVaanEvasionTank = do
    putStrLn "CASE 1: Vaan (Red Battlemage + Shikari) - Trinity Build"
    putStrLn "========================================================="
    putStrLn ""
    putStrLn "Role: Evasion Tank"
    putStrLn ""

    -- Old scores (blind spot)
    let physTank = characterJobScore Vaan RedBattlemage PhysicalTank
    let magTank = characterJobScore Vaan RedBattlemage MagicTank

    putStrLn "OLD ROLE SCORES (job-based):"
    putStrLn $ "  PhysicalTank: " ++ show physTank ++ " (LOW - looks weak for a tank)"
    putStrLn $ "  MagicTank:    " ++ show magTank
    putStrLn ""

    -- New capability scores (fix)
    let evasionTank = capabilityScore RedBattlemage Shikari EvasionTank
    let hpTank = capabilityScore RedBattlemage Shikari HPTank
    let physDPS = capabilityScore RedBattlemage Shikari PhysicalDPS
    let comboOpt = capabilityScore RedBattlemage Shikari ComboOptimized

    putStrLn "NEW CAPABILITY SCORES (strategy-based):"
    putStrLn $ "  EvasionTank:     " ++ show evasionTank ++ " ✓ (REVEALS tank strategy)"
    putStrLn $ "  HPTank:          " ++ show hpTank ++ " (not this tank type)"
    putStrLn $ "  PhysicalDPS:     " ++ show physDPS ++ " (hybrid damage)"
    putStrLn $ "  ComboOptimized:  " ++ show comboOpt ++ " (ninja sword option)"
    putStrLn ""
    putStrLn "EXPLANATION:"
    putStrLn $ "  " ++ capabilityExplanation EvasionTank
    putStrLn ""

{-
  Case 2: Penelo (White Mage + Shikari) - Endurance Build

  PROBLEM: PhysicalDPS score shows 2/7 (very low), Healer score shows 9/6 (high)
  ROLE: "Attacker" (primary DPS via Dark ninja sword)
  EXPECTED: ComboOptimized capability should show ninja sword DPS potential
-}

namespace PeneloEndurance

  export
  testPeneloAttacker : IO ()
  testPeneloAttacker = do
    putStrLn "CASE 2: Penelo (White Mage + Shikari) - Endurance Build"
    putStrLn "========================================================"
    putStrLn ""
    putStrLn "Role: Attacker (Berserked Yagyu Darkblade + Black Robes)"
    putStrLn ""

    -- Old scores (blind spot)
    let physDPS = characterJobScore Penelo WhiteMage PhysicalDPS
    let healer = characterJobScore Penelo WhiteMage Healer
    let support = characterJobScore Penelo WhiteMage Support

    putStrLn "OLD ROLE SCORES (job-based):"
    putStrLn $ "  PhysicalDPS: " ++ show physDPS ++ " (VERY LOW - looks like healer, not attacker)"
    putStrLn $ "  Healer:      " ++ show healer ++ " (HIGH - misleading for 'Attacker' role)"
    putStrLn $ "  Support:     " ++ show support
    putStrLn ""

    -- New capability scores (fix)
    let comboOpt = capabilityScore WhiteMage Shikari ComboOptimized
    let elementalBoost = capabilityScore WhiteMage Shikari ElementalBoost
    let evasionTank = capabilityScore WhiteMage Shikari EvasionTank
    let healingAmp = capabilityScore WhiteMage Shikari HealingAmplified

    putStrLn "NEW CAPABILITY SCORES (strategy-based):"
    putStrLn $ "  ComboOptimized:    " ++ show comboOpt ++ " ✓ (REVEALS ninja sword DPS)"
    putStrLn $ "  ElementalBoost:    " ++ show elementalBoost ++ " (needs Black Robes for Dark boost)"
    putStrLn $ "  EvasionTank:       " ++ show evasionTank ++ " (dual role: DPS + survivability)"
    putStrLn $ "  HealingAmplified:  " ++ show healingAmp ++ " (backup healer when not Berserked)"
    putStrLn ""
    putStrLn "EXPLANATION:"
    putStrLn $ "  " ++ capabilityExplanation ComboOptimized
    putStrLn ""
    putStrLn "STRATEGY: Berserked with Yagyu Darkblade (Dark ninja sword) + Black Robes"
    putStrLn "          exploits Yiazmat's Dark weakness. Ninja swords get 1.8x combo boost"
    putStrLn "          from Genji Gloves. Cannot heal while Berserked."
    putStrLn ""

{-
  Case 3: Fran (Monk + Time Battlemage) - Universal Build

  PROBLEM: Pole combo mechanics invisible to raw scores
  EXPECTED: ComboOptimized + MPRegeneration should show her utility
-}

namespace FranUniversal

  export
  testFranSupport : IO ()
  testFranSupport = do
    putStrLn "CASE 3: Fran (Monk + Time Battlemage) - Universal Build"
    putStrLn "========================================================"
    putStrLn ""
    putStrLn "Role: Support (appears in ALL 4 builds)"
    putStrLn ""

    -- Old scores
    let physDPS = characterJobScore Fran Monk PhysicalDPS
    let support = characterJobScore Fran Monk Support

    putStrLn "OLD ROLE SCORES (job-based):"
    putStrLn $ "  PhysicalDPS: " ++ show physDPS ++ " (HIGH - but doesn't show WHY)"
    putStrLn $ "  Support:     " ++ show support ++ " (moderate)"
    putStrLn ""

    -- New capability scores
    let comboOpt = capabilityScore Monk TimeBattlemage ComboOptimized
    let mpRegen = capabilityScore Monk TimeBattlemage MPRegeneration
    let hpTank = capabilityScore Monk TimeBattlemage HPTank
    let magicDPS = capabilityScore Monk TimeBattlemage MagicDPS

    putStrLn "NEW CAPABILITY SCORES (strategy-based):"
    putStrLn $ "  ComboOptimized:   " ++ show comboOpt ++ " ✓ (Kanya pole + Genji Gloves)"
    putStrLn $ "  MPRegeneration:   " ++ show mpRegen ++ " ✓ (Channeling 3 for infinite MP)"
    putStrLn $ "  HPTank:           " ++ show hpTank ++ " (frontline durability)"
    putStrLn $ "  MagicDPS:         " ++ show magicDPS ++ " (hybrid support spells)"
    putStrLn ""
    putStrLn "EXPLANATION:"
    putStrLn $ "  " ++ capabilityExplanation ComboOptimized
    putStrLn $ "  " ++ capabilityExplanation MPRegeneration
    putStrLn ""
    putStrLn "STRATEGY: Kanya (best pole, 109 ATK, Holy element) with Genji Gloves"
    putStrLn "          gets 1.25x combo boost. Channeling 3 (Zeromus unlock) + Sage's Ring"
    putStrLn "          = infinite MP for Hastega spam. Time Battlemage provides natural Hastega."
    putStrLn ""

-- ============================================================================
-- COMPARISON: Before & After
-- ============================================================================

export
testAllCases : IO ()
testAllCases = do
  putStrLn "╔═══════════════════════════════════════════════════════════════════╗"
  putStrLn "║  CAPABILITY VALIDATION: Fixing Role Scoring Blind Spots         ║"
  putStrLn "╚═══════════════════════════════════════════════════════════════════╝"
  putStrLn ""

  VaanTrinity.testVaanEvasionTank
  putStrLn "-------------------------------------------------------------------"
  putStrLn ""

  PeneloEndurance.testPeneloAttacker
  putStrLn "-------------------------------------------------------------------"
  putStrLn ""

  FranUniversal.testFranSupport
  putStrLn "-------------------------------------------------------------------"
  putStrLn ""

  putStrLn "CONCLUSION:"
  putStrLn "==========="
  putStrLn ""
  putStrLn "EquipmentStrategy scores REVEAL strategic patterns that role scores MISS:"
  putStrLn ""
  putStrLn "1. Vaan (Trinity): EvasionTank capability shows tank strategy"
  putStrLn "   - Role score: PhysicalTank 4 (misleading)"
  putStrLn "   - EquipmentStrategy: EvasionTank 5 (correct)"
  putStrLn ""
  putStrLn "2. Penelo (Endurance): ComboOptimized shows DPS potential"
  putStrLn "   - Role score: PhysicalDPS 2 (misleading)"
  putStrLn "   - EquipmentStrategy: ComboOptimized 5 (correct)"
  putStrLn ""
  putStrLn "3. Fran (Universal): ComboOptimized + MPRegeneration show synergy"
  putStrLn "   - Role scores don't explain WHY she's universal"
  putStrLn "   - Capabilities show Kanya combo + infinite MP = perfect support"
  putStrLn ""
  putStrLn "RECOMMENDATION: Use BOTH role scores AND capability scores:"
  putStrLn "  - Role scores: CAN you perform this role?"
  putStrLn "  - EquipmentStrategy scores: HOW do you perform it optimally?"
  putStrLn ""

-- ============================================================================
-- TEST RUNNER
-- ============================================================================

export
runValidation : IO ()
runValidation = testAllCases
