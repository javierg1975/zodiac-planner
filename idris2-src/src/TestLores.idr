module TestLores

import Types.Job
import Types.Lores

main : IO ()
main = do
  putStrLn "╔═══════════════════════════════════════════════════════════════════╗"
  putStrLn "║  LORE OVERLAP VALIDATION                                         ║"
  putStrLn "║  Verify type-level lore data matches extracted JSON             ║"
  putStrLn "╚═══════════════════════════════════════════════════════════════════╝"
  putStrLn ""

  putStrLn "=== SANITY CHECKS ==="
  putStrLn ""

  -- Monk has all 16 Battle Lores
  putStrLn $ "Monk Battle Lores: " ++ show (loreCount monkBL) ++ " (expected: 16)"

  -- Black Mage has all 16 Magick Lores
  putStrLn $ "Black Mage Magick Lores: " ++ show (loreCount blackmageML) ++ " (expected: 16)"

  -- Black Mage has 0 Battle Lores
  putStrLn $ "Black Mage Battle Lores: " ++ show (loreCount blackmageBL) ++ " (expected: 0)"

  -- Shikari counts
  putStrLn $ "Shikari Battle Lores: " ++ show (loreCount shikariBL) ++ " (expected: 6)"
  putStrLn $ "Shikari Magick Lores: " ++ show (loreCount shikariML) ++ " (expected: 5)"

  putStrLn ""
  putStrLn "=== SHIKARI + MAGE PAIRINGS (DPS Role) ==="
  putStrLn ""

  -- Test the pairings from our analysis
  let shikariWM = loreProfile Shikari WhiteMage
  let shikariBM = loreProfile Shikari BlackMage
  let shikariRBM = loreProfile Shikari RedBattlemage
  let shikariTBM = loreProfile Shikari TimeBattlemage

  putStrLn "Shikari + White Mage (Endurance build):"
  putStrLn $ "  Battle: " ++ show shikariWM.battleCombined ++ " combined (" ++
             show shikariWM.battleShared ++ " shared, " ++
             show shikariWM.battleOverlap ++ "% overlap)"
  putStrLn $ "  Magick: " ++ show shikariWM.magickCombined ++ " combined (" ++
             show shikariWM.magickShared ++ " shared, " ++
             show shikariWM.magickOverlap ++ "% overlap)"
  putStrLn $ "  Efficiency Score: " ++ show (loreEfficiencyScore Shikari WhiteMage)
  putStrLn ""

  putStrLn "Shikari + Black Mage:"
  putStrLn $ "  Battle: " ++ show shikariBM.battleCombined ++ " combined (" ++
             show shikariBM.battleShared ++ " shared, " ++
             show shikariBM.battleOverlap ++ "% overlap)"
  putStrLn $ "  Magick: " ++ show shikariBM.magickCombined ++ " combined (" ++
             show shikariBM.magickShared ++ " shared, " ++
             show shikariBM.magickOverlap ++ "% overlap)"
  putStrLn $ "  Efficiency Score: " ++ show (loreEfficiencyScore Shikari BlackMage)
  putStrLn ""

  putStrLn "Shikari + Red Battlemage (Trinity build):"
  putStrLn $ "  Battle: " ++ show shikariRBM.battleCombined ++ " combined (" ++
             show shikariRBM.battleShared ++ " shared, " ++
             show shikariRBM.battleOverlap ++ "% overlap)"
  putStrLn $ "  Magick: " ++ show shikariRBM.magickCombined ++ " combined (" ++
             show shikariRBM.magickShared ++ " shared, " ++
             show shikariRBM.magickOverlap ++ "% overlap)"
  putStrLn $ "  Efficiency Score: " ++ show (loreEfficiencyScore Shikari RedBattlemage)
  putStrLn ""

  putStrLn "=== EXPECTED VALUES (from docs/shikari-mage-analysis.md) ==="
  putStrLn ""
  putStrLn "White Mage + Shikari:"
  putStrLn "  Battle: 7 combined (6 shared) - WM adds 0-1 unique"
  putStrLn "  Magick: 15 combined (5 shared)"
  putStrLn ""
  putStrLn "Black Mage + Shikari:"
  putStrLn "  Battle: 6 combined (0 shared) - Shikari adds ALL 6"
  putStrLn "  Magick: 16 combined (5 shared)"
  putStrLn ""
  putStrLn "Red Battlemage + Shikari:"
  putStrLn "  Battle: 6 combined (3 shared) - Shikari adds 3 unique"
  putStrLn "  Magick: 12 combined (5 shared)"
