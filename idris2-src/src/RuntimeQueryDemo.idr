module RuntimeQueryDemo

import Data.String
import Data.List

import Types.Job
import Types.Goal
import Types.Equipment
import Types.Capability
import Types.Lores
import Analysis.OptimalPairings

-- ============================================================================
-- RUNTIME QUERY SIMULATION
-- ============================================================================
-- Demonstrates how user queries work with Dec predicates:
-- User provides job names as input -> system checks constraints at runtime
--============================================================================

||| Simulate user query: "Can I build Vaan as evasion tank with these jobs?"
export
queryEvasionTank : Job -> Job -> IO ()
queryEvasionTank primary secondary = do
  putStrLn "╔══════════════════════════════════════════════════════════════════╗"
  putStrLn "║  RUNTIME QUERY: Evasion Tank Build Validation                   ║"
  putStrLn "╚══════════════════════════════════════════════════════════════════╝"
  putStrLn ""
  putStrLn $ "User query: Can I build " ++ show primary ++ " + " ++ show secondary ++
             " as evasion tank?"
  putStrLn "Requirement: Must equip shields (Main Gauche + Crystal Shield)"
  putStrLn ""

  -- Check constraint at runtime using Dec
  case pairingHasShields primary secondary of
    Yes prf => do
      -- Valid! Show the analysis
      putStrLn "✅ VALID BUILD - Shield access confirmed!"
      putStrLn ""

      let score = scorePairingForStrategy primary secondary EvasionTank PhysicalTank
      let prof = loreProfile primary secondary

      putStrLn "Build Analysis:"
      putStrLn $ "  Total Score: " ++ show score.totalScore
      putStrLn $ "  Strategy Score: " ++ show score.strategyScore ++ " (equipment synergy)"
      putStrLn $ "  Role Scores: " ++ show score.primaryRoleScore ++ "/" ++
                 show score.secondaryRoleScore ++ " (capabilities)"
      putStrLn $ "  Lore Efficiency: " ++ show score.loreEfficiency ++ "% (overlap)"
      putStrLn ""
      putStrLn "Lore Details:"
      putStrLn $ "  Battle Lores: " ++ show prof.battleCombined ++ " total (" ++
                 show prof.battleShared ++ " shared, " ++ show prof.battleOverlap ++ "% overlap)"
      putStrLn $ "  Magick Lores: " ++ show prof.magickCombined ++ " total (" ++
                 show prof.magickShared ++ " shared, " ++ show prof.magickOverlap ++ "% overlap)"
      putStrLn ""

    No contra => do
      -- Invalid! Explain why using counter-proof
      putStrLn "❌ INVALID BUILD - Constraint violation!"
      putStrLn ""
      putStrLn $ explainNoShields primary secondary
      putStrLn ""
      -- putStrLn "Suggested alternatives:"
      -- suggestAlternativesForShields primary

||| Suggest alternative pairings that satisfy the shield constraint
suggestAlternativesForShields : Job -> IO ()
suggestAlternativesForShields primary = do
  let candidates = jobsWithShields

  putStrLn $ "Try pairing " ++ show primary ++ " with one of these jobs:"
  traverse_ (\j => case pairingHasShields primary j of
                     Yes prf => do
                       let score = scorePairingForStrategy primary j EvasionTank PhysicalTank
                       putStrLn $ "  ✓ " ++ show j ++ " (score: " ++ show score.totalScore ++
                                  ", lore eff: " ++ show score.loreEfficiency ++ "%)"
                     No _ => pure ()) candidates

||| Simulate user query: "Can I build Dark DPS with these jobs?"
export
queryDarkDPS : Job -> Job -> IO ()
queryDarkDPS primary secondary = do
  putStrLn "╔══════════════════════════════════════════════════════════════════╗"
  putStrLn "║  RUNTIME QUERY: Dark DPS Build Validation                       ║"
  putStrLn "╚══════════════════════════════════════════════════════════════════╝"
  putStrLn ""
  putStrLn $ "User query: Can I build " ++ show primary ++ " + " ++ show secondary ++
             " for Dark DPS?"
  putStrLn "Requirement: Must equip Black Robes (mystic armor)"
  putStrLn ""

  case pairingHasMysticArmor primary secondary of
    Yes prf => do
      putStrLn "✅ VALID BUILD - Mystic armor access confirmed!"
      putStrLn ""

      let score = scorePairingForStrategy primary secondary ComboOptimized PhysicalDPS

      putStrLn "Build Analysis:"
      putStrLn $ "  Total Score: " ++ show score.totalScore
      putStrLn $ "  Lore Efficiency: " ++ show score.loreEfficiency ++ "% (higher = less waste)"
      putStrLn ""

    No contra => do
      putStrLn "❌ INVALID BUILD - Constraint violation!"
      putStrLn ""
      putStrLn $ explainNoMysticArmor primary secondary
      putStrLn ""
      putStrLn "Suggested alternatives:"
      putStrLn $ "Try pairing " ++ show primary ++ " with a mage job:"
      traverse_ (\j => putStrLn $ "  ✓ " ++ show j) jobsWithMysticArmor

-- ============================================================================
-- DEMO SCENARIOS
-- ============================================================================

||| Demo: Valid evasion tank build
demoValidEvasionTank : IO ()
demoValidEvasionTank = do
  putStrLn "═══ Demo 1: Valid Evasion Tank ═══"
  putStrLn ""
  queryEvasionTank Shikari Knight
  putStrLn ""
  putStrLn $ fastPack (replicate 70 '═')
  putStrLn ""

||| Demo: Invalid evasion tank build (no shields)
demoInvalidEvasionTank : IO ()
demoInvalidEvasionTank = do
  putStrLn "═══ Demo 2: Invalid Evasion Tank (no shields) ═══"
  putStrLn ""
  queryEvasionTank Shikari Monk  -- Monk can't equip shields!
  putStrLn ""
  putStrLn $ fastPack (replicate 70 '═')
  putStrLn ""

||| Demo: Valid Dark DPS build
demoValidDarkDPS : IO ()
demoValidDarkDPS = do
  putStrLn "═══ Demo 3: Valid Dark DPS ═══"
  putStrLn ""
  queryDarkDPS Shikari BlackMage
  putStrLn ""
  putStrLn $ fastPack (replicate 70 '═')
  putStrLn ""

||| Demo: Invalid Dark DPS build (no mystic armor)
demoInvalidDarkDPS : IO ()
demoInvalidDarkDPS = do
  putStrLn "═══ Demo 4: Invalid Dark DPS (no mystic armor) ═══"
  putStrLn ""
  queryDarkDPS Shikari Knight  -- Knight can't wear Black Robes!
  putStrLn ""
  putStrLn $ fastPack (replicate 70 '═')
  putStrLn ""

-- ============================================================================
-- MAIN
-- ============================================================================

export
main : IO ()
main = do
  putStrLn ""
  putStrLn "╔════════════════════════════════════════════════════════════════════╗"
  putStrLn "║  RUNTIME QUERY DEMO                                               ║"
  putStrLn "║  Constraint validation with Dec predicates                        ║"
  putStrLn "╚════════════════════════════════════════════════════════════════════╝"
  putStrLn ""
  putStrLn "Simulating user queries: 'Can I build X + Y for strategy Z?'"
  putStrLn ""

  demoValidEvasionTank
  demoInvalidEvasionTank
  demoValidDarkDPS
  demoInvalidDarkDPS

  putStrLn ""
  putStrLn "═════════════════════════════════════════════════════════════════════"
  putStrLn ""
  putStrLn "KEY INSIGHT: Dec predicates bridge compile-time and runtime"
  putStrLn ""
  putStrLn "At compile-time:"
  putStrLn "  - Indexed types make invalid states unrepresentable"
  putStrLn "  - CanEquipShields Monk has NO constructor (type error)"
  putStrLn ""
  putStrLn "At runtime:"
  putStrLn "  - Dec checks constraints and returns proof or counter-proof"
  putStrLn "  - Counter-proofs explain WHY constraints are violated"
  putStrLn "  - Proofs carry through to ensure only valid builds are scored"
  putStrLn ""
