{-
  Analysis/OptimalPairings.idr

  Search for OPTIMAL job pairings for specific strategic goals.

  MOTIVATION: Expert builds may be "good enough" but not necessarily optimal.

  Questions to answer:
  1. Penelo (Endurance): White Mage + Shikari for Dark DPS
     - Is White Mage the BEST mage to pair with Shikari for physical DPS?
     - What about Black Mage + Shikari? Red Battlemage + Shikari?

  2. Vaan (Trinity): Red Battlemage + Shikari for evasion tank
     - Why not Shikari + Knight (evasion + HP tank)?
     - Why not Shikari + Uhlan (evasion + HP tank)?

  This module searches ALL job pairings and ranks them by equipment strategy scores.
-}

module Analysis.OptimalPairings

import Data.List
import Data.String

import Types.Job
import Types.Character
import public Types.Capability  -- For EquipmentStrategy functions
import Types.Goal
import Types.Lores  -- For lore overlap calculations
import Types.Equipment  -- For equipment constraints

-- ============================================================================
-- JOB PAIRING SCORING
-- ============================================================================

{-
  Score a job pairing for a specific equipment strategy.

  Returns tuple: (primary job score, secondary job score, strategy score, total)
-}

public export
record PairingScore where
  constructor MkPairingScore
  primaryJob : Job
  secondaryJob : Job
  strategy : EquipmentStrategy
  strategyScore : Nat        -- How well does pairing support this strategy?
  primaryRoleScore : Nat     -- Primary job's role score (for context)
  secondaryRoleScore : Nat   -- Secondary job's role score (for context)
  loreEfficiency : Nat       -- Lore overlap efficiency (0-100, higher = less waste)
  totalScore : Nat           -- Combined score (includes lore efficiency)

export
scorePairingForStrategy : Job -> Job -> EquipmentStrategy -> RoleDimension -> PairingScore
scorePairingForStrategy primary secondary strategy roleContext =
  MkPairingScore primary secondary strategy strat primRole secRole loreEff tot
  where
    strat : Nat
    strat = Types.Capability.capabilityScore primary secondary strategy

    primRole : Nat
    primRole = Types.Job.capabilityScore (jobCapability primary roleContext)

    secRole : Nat
    secRole = Types.Job.capabilityScore (jobCapability secondary roleContext)

    loreEff : Nat
    loreEff = loreEfficiencyScore primary secondary

    tot : Nat
    tot = strat + primRole + secRole + (loreEff `div` 5)

-- ============================================================================
-- SEARCH ALL PAIRINGS
-- ============================================================================

{-
  Generate all possible job pairings (excluding duplicates like Job1+Job2 and Job2+Job1).
-}

allJobs : List Job
allJobs = [Knight, Monk, Uhlan, Archer, Foebreaker, Bushi, Shikari,
           WhiteMage, BlackMage, RedBattlemage, TimeBattlemage, Machinist]

export
allJobPairings : List (Job, Job)
allJobPairings =
  [ (j1, j2) | j1 <- allJobs, j2 <- allJobs, j1 /= j2 ]

{-
  Find the BEST job pairing for a specific equipment strategy.

  Example: bestPairingForStrategy ComboOptimized PhysicalDPS
  Returns the pairing that maximizes ComboOptimized strategy while maintaining PhysicalDPS role.
-}

export
bestPairingForStrategy : EquipmentStrategy -> RoleDimension -> List PairingScore
bestPairingForStrategy strategy roleContext =
  let pairings = allJobPairings
      scored = map (\(j1, j2) => scorePairingForStrategy j1 j2 strategy roleContext) pairings
      sorted = sortBy (\a, b => compare b.totalScore a.totalScore) scored  -- Descending
  in take 10 sorted  -- Top 10

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Shared helper for printing pairing scores
printPairingScore : PairingScore -> IO ()
printPairingScore ps =
  putStrLn $ "  " ++ show ps.primaryJob ++ " + " ++ show ps.secondaryJob ++
             " | Strategy: " ++ show ps.strategyScore ++
             " | Role: " ++ show ps.primaryRoleScore ++ "/" ++ show ps.secondaryRoleScore ++
             " | Lore Eff: " ++ show ps.loreEfficiency ++ "%" ++
             " | TOTAL: " ++ show ps.totalScore

-- ============================================================================
-- SPECIFIC INVESTIGATIONS
-- ============================================================================

namespace ShikariDPS

  {-
    QUESTION: What's the BEST mage to pair with Shikari for physical DPS?

    Goal: Maximize Shikari physical damage output
    Context: Shikari wants ComboOptimized (ninja swords + Genji Gloves)

    Candidates:
    - White Mage + Shikari (Endurance build)
    - Black Mage + Shikari
    - Red Battlemage + Shikari
    - Time Battlemage + Shikari
  -}

  export
  investigateShikariDPS : IO ()
  investigateShikariDPS = do
    putStrLn "INVESTIGATION: Best Mage Pairing for Shikari DPS"
    putStrLn "================================================"
    putStrLn ""
    putStrLn "GOAL: Maximize Shikari physical DPS (ComboOptimized strategy)"
    putStrLn "CONTEXT: Yagyu Darkblade (Dark ninja sword) + Black Robes"
    putStrLn "CONSTRAINT: At least one job must equip Black Robes (mystic armor)"
    putStrLn ""

    -- All jobs as candidates
    let allJobs = [Knight, Uhlan, Monk, Foebreaker, RedBattlemage, TimeBattlemage,
                   Bushi, BlackMage, WhiteMage, Archer, Machinist, Shikari]

    -- FILTER: Use Dec to check mystic armor constraint
    let validPairings : List (j : Job ** PairingHasMysticArmor Shikari j)
        validPairings = mapMaybe (\j => case pairingHasMysticArmor Shikari j of
                                          Yes prf => Just (j ** prf)
                                          No _ => Nothing) allJobs

    putStrLn $ "✓ Found " ++ show (length validPairings) ++ " valid pairings (can equip Black Robes)"
    putStrLn $ "✗ Filtered out " ++ show (length allJobs `minus` length validPairings) ++
               " invalid pairings (no mystic armor)"
    putStrLn ""

    -- Score ONLY the valid pairings
    let scored = map (\(j ** prf) => scorePairingForStrategy Shikari j ComboOptimized PhysicalDPS)
                     validPairings
    let sorted = sortBy (\a, b => compare b.totalScore a.totalScore) scored

    putStrLn "Rankings (Shikari primary, with Black Robes constraint):"
    putStrLn "--------------------------------------------------------"
    traverse_ printPairingScore sorted
    putStrLn ""

    -- Also try reverse
    let validReverse : List (j : Job ** PairingHasMysticArmor j Shikari)
        validReverse = mapMaybe (\j => case pairingHasMysticArmor j Shikari of
                                         Yes prf => Just (j ** prf)
                                         No _ => Nothing) allJobs

    let scoredReverse = map (\(j ** prf) => scorePairingForStrategy j Shikari ComboOptimized PhysicalDPS)
                            validReverse
    let sortedReverse = sortBy (\a, b => compare b.totalScore a.totalScore) scoredReverse

    putStrLn "Rankings (with Black Robes constraint, other job primary):"
    putStrLn "----------------------------------------------------------"
    traverse_ printPairingScore sortedReverse
    putStrLn ""

    putStrLn "ANALYSIS:"
    putStrLn "---------"
    putStrLn "White Mage + Shikari (Endurance build): Does WM help Shikari punch harder?"
    putStrLn "  - White Mage provides: Healing, support, White Robes (healing boost)"
    putStrLn "  - White Mage does NOT provide: STR boost, combo boost, physical synergy"
    putStrLn ""
    putStrLn "Alternative considerations:"
    putStrLn "  - Black Mage: Black Robes boost Dark damage (synergy with Yagyu Darkblade!)"
    putStrLn "  - Red Battlemage: Hybrid versatility, but no physical DPS synergy"
    putStrLn "  - Time Battlemage: Hastega (party speed), but no physical DPS synergy"
    putStrLn ""

namespace EvasionTank

  {-
    QUESTION: What's the BEST heavy job to pair with Shikari for evasion+HP tanking?

    Goal: Maximize survivability (evasion + HP)
    Context: Shikari wants EvasionTank (Main Gauche + Shield)

    Candidates:
    - Red Battlemage + Shikari (Trinity build)
    - Knight + Shikari
    - Uhlan + Shikari
    - Monk + Shikari
  -}

  export
  investigateEvasionTank : IO ()
  investigateEvasionTank = do
    putStrLn "INVESTIGATION: Best Pairing for Evasion Tank"
    putStrLn "============================================="
    putStrLn ""
    putStrLn "GOAL: Maximize survivability (EvasionTank strategy + HPTank role)"
    putStrLn "CONTEXT: Main Gauche (50% evasion) + Crystal Shield (40% evasion) = 90%"
    putStrLn "CONSTRAINT: At least one job must equip shields (Main Gauche + Crystal Shield)"
    putStrLn ""

    -- All jobs as candidates
    let allJobs = [Knight, Uhlan, Monk, Foebreaker, RedBattlemage, TimeBattlemage,
                   Bushi, BlackMage, WhiteMage, Archer, Machinist, Shikari]

    -- FILTER: Use Dec to check shield constraint at runtime
    -- This returns a list of (Job ** PairingHasShields Shikari Job)
    -- The proof is CARRIED WITH the job!
    let validPairings : List (j : Job ** PairingHasShields Shikari j)
        validPairings = mapMaybe (\j => case pairingHasShields Shikari j of
                                          Yes prf => Just (j ** prf)
                                          No _ => Nothing) allJobs

    putStrLn $ "✓ Found " ++ show (length validPairings) ++ " valid pairings (with shield access)"
    putStrLn $ "✗ Filtered out " ++ show (length allJobs `minus` length validPairings) ++
               " invalid pairings (no shield access)"
    putStrLn ""

    -- Score ONLY the valid pairings
    let scored = map (\(j ** prf) => scorePairingForStrategy Shikari j EvasionTank PhysicalTank)
                     validPairings
    let sorted = sortBy (\a, b => compare b.totalScore a.totalScore) scored

    putStrLn "Rankings (Shikari primary for evasion, with shield constraint):"
    putStrLn "---------------------------------------------------------------"
    traverse_ printPairingScore sorted
    putStrLn ""

    -- Also try reverse (other job primary)
    let validReverse : List (j : Job ** PairingHasShields j Shikari)
        validReverse = mapMaybe (\j => case pairingHasShields j Shikari of
                                         Yes prf => Just (j ** prf)
                                         No _ => Nothing) allJobs

    let scoredReverse = map (\(j ** prf) => scorePairingForStrategy j Shikari EvasionTank PhysicalTank)
                            validReverse
    let sortedReverse = sortBy (\a, b => compare b.totalScore a.totalScore) scoredReverse

    putStrLn "Rankings (with shield constraint, other job primary):"
    putStrLn "-----------------------------------------------------"
    traverse_ printPairingScore sortedReverse
    putStrLn ""

    -- Show what got filtered out
    putStrLn "❌ FILTERED OUT (no shield access):"
    let invalidJobs = filter (\j => case pairingHasShields Shikari j of
                                      Yes _ => False
                                      No _ => True) allJobs
    traverse_ (\j => putStrLn $ "   - " ++ show j ++ " + Shikari: " ++
                     explainNoShields j Shikari) invalidJobs
    putStrLn ""

    putStrLn "ANALYSIS:"
    putStrLn "---------"
    putStrLn "Red Battlemage + Shikari (Trinity build): Does RBM add survivability?"
    putStrLn "  - Red Battlemage provides: Magic versatility, healing"
    putStrLn "  - Red Battlemage does NOT provide: Heavy Armor, HP boost"
    putStrLn ""
    putStrLn "Alternative considerations:"
    putStrLn "  - Knight + Shikari: Heavy Armor, Excalibur, healing spells (DOUBLE TANKING)"
    putStrLn "  - Uhlan + Shikari: Heavy Armor, spears, HP boost (DOUBLE TANKING)"
    putStrLn "  - Monk + Shikari: High HP, poles, unarmed (DOUBLE TANKING)"
    putStrLn ""
    putStrLn "HYPOTHESIS: Heavy job pairings would double down on survivability"
    putStrLn "                (evasion from Shikari + HP/DEF from Heavy)"
    putStrLn ""

  printPairingScore : PairingScore -> IO ()
  printPairingScore ps =
    putStrLn $ "  " ++ show ps.primaryJob ++ " + " ++ show ps.secondaryJob ++
               " | Strategy: " ++ show ps.strategyScore ++
               " | Role (Primary/Secondary): " ++ show ps.primaryRoleScore ++ "/" ++ show ps.secondaryRoleScore ++
               " | TOTAL: " ++ show ps.totalScore

-- ============================================================================
-- MAIN INVESTIGATION RUNNER
-- ============================================================================

export
runInvestigation : IO ()
runInvestigation = do
  putStrLn "╔═══════════════════════════════════════════════════════════════════╗"
  putStrLn "║  OPTIMAL PAIRING INVESTIGATION                                   ║"
  putStrLn "║  Are expert builds actually optimal, or just 'good enough'?      ║"
  putStrLn "╚═══════════════════════════════════════════════════════════════════╝"
  putStrLn ""

  ShikariDPS.investigateShikariDPS
  putStrLn "==================================================================="
  putStrLn ""

  EvasionTank.investigateEvasionTank
  putStrLn "==================================================================="
  putStrLn ""

  putStrLn "CONCLUSION:"
  putStrLn "==========="
  putStrLn ""
  putStrLn "The type system can SEARCH for optimal pairings, not just validate existing ones."
  putStrLn ""
  putStrLn "Next step: Compare computed optimal pairings vs. expert-chosen builds"
  putStrLn "              to understand TRADE-OFFS (efficiency vs. versatility vs. gear constraints)"
  putStrLn ""
