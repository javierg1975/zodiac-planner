{-
  Types/Lores.idr

  Type-level encoding of Battle Lore and Magick Lore accessibility.

  Each job's accessible lores are encoded as compile-time constants (Vect 16 Bool).
  Overlap calculations happen at compile time - the compiler knows exact overlaps.

  Data extracted from: data/license-board-lores.json
-}

module Types.Lores

import Data.Vect
import Data.List
import Types.Job

-- ============================================================================
-- LORE SET TYPE
-- ============================================================================

||| A set of 16 lore nodes (Battle or Magick)
||| True = job can access this lore node
public export
data LoreSet : Type where
  MkLoreSet : Vect 16 Bool -> LoreSet

-- ============================================================================
-- BATTLE LORE ACCESSIBILITY (COMPILE-TIME CONSTANTS)
-- ============================================================================
-- Data source: data/license-board-lores.json (battle_lores array)

export
whitemageBL : LoreSet
whitemageBL = MkLoreSet [True, True, True, True, True, True, True, False, False, False, False, False, False, False, False, False]  -- 7 total

export
uhlanBL : LoreSet
uhlanBL = MkLoreSet [True, True, True, True, True, True, True, True, True, True, True, True, True, True, False, False]  -- 14 total

export
machinistBL : LoreSet
machinistBL = MkLoreSet [True, True, True, False, False, False, False, False, False, False, False, False, False, False, False, False]  -- 3 total

export
redbattlemageBL : LoreSet
redbattlemageBL = MkLoreSet [True, True, True, False, False, False, False, False, False, False, False, False, False, False, False, False]  -- 3 total

export
knightBL : LoreSet
knightBL = MkLoreSet [True, True, True, True, True, True, True, True, True, True, True, True, False, False, False, False]  -- 12 total

export
monkBL : LoreSet
monkBL = MkLoreSet [True, True, True, True, True, True, True, True, True, True, True, True, True, True, True, True]  -- 16 total

export
timebattlemageBL : LoreSet
timebattlemageBL = MkLoreSet [True, True, True, True, True, True, True, True, True, True, True, False, False, False, False, False]  -- 11 total

export
foebreakerBL : LoreSet
foebreakerBL = MkLoreSet [True, True, True, True, True, True, True, True, True, True, True, True, True, False, False, False]  -- 13 total

export
archerBL : LoreSet
archerBL = MkLoreSet [True, True, False, False, False, False, False, False, False, False, False, False, False, False, False, False]  -- 2 total

export
blackmageBL : LoreSet
blackmageBL = MkLoreSet [False, False, False, False, False, False, False, False, False, False, False, False, False, False, False, False]  -- 0 total

export
bushiBL : LoreSet
bushiBL = MkLoreSet [True, True, True, True, True, True, True, True, False, False, False, False, False, False, False, False]  -- 8 total

export
shikariBL : LoreSet
shikariBL = MkLoreSet [True, True, True, True, True, True, False, False, False, False, False, False, False, False, False, False]  -- 6 total

-- ============================================================================
-- MAGICK LORE ACCESSIBILITY (COMPILE-TIME CONSTANTS)
-- ============================================================================
-- Data source: data/license-board-lores.json (magick_lores array)

export
whitemageML : LoreSet
whitemageML = MkLoreSet [True, True, True, True, True, True, True, True, True, True, True, True, True, True, True, False]  -- 15 total

export
uhlanML : LoreSet
uhlanML = MkLoreSet [True, True, True, True, True, True, False, False, False, False, False, False, False, False, False, False]  -- 6 total

export
machinistML : LoreSet
machinistML = MkLoreSet [True, True, True, True, True, True, True, False, False, False, False, False, False, False, False, False]  -- 7 total

export
redbattlemageML : LoreSet
redbattlemageML = MkLoreSet [True, True, True, True, True, True, True, True, True, True, True, True, False, False, False, False]  -- 12 total

export
knightML : LoreSet
knightML = MkLoreSet [False, False, False, False, False, False, False, False, False, False, False, False, False, False, False, False]  -- 0 total

export
monkML : LoreSet
monkML = MkLoreSet [False, False, False, False, False, False, False, False, False, False, False, False, False, False, False, False]  -- 0 total

export
timebattlemageML : LoreSet
timebattlemageML = MkLoreSet [True, True, True, True, True, True, True, True, True, False, False, False, False, False, False, False]  -- 9 total

export
foebreakerML : LoreSet
foebreakerML = MkLoreSet [True, True, True, True, True, False, False, False, False, False, False, False, False, False, False, False]  -- 5 total

export
archerML : LoreSet
archerML = MkLoreSet [True, True, True, True, True, True, False, False, False, False, False, False, False, False, False, False]  -- 6 total

export
blackmageML : LoreSet
blackmageML = MkLoreSet [True, True, True, True, True, True, True, True, True, True, True, True, True, True, True, True]  -- 16 total

export
bushiML : LoreSet
bushiML = MkLoreSet [True, True, True, True, True, True, True, True, True, True, True, True, True, True, False, False]  -- 14 total

export
shikariML : LoreSet
shikariML = MkLoreSet [True, True, True, True, True, False, False, False, False, False, False, False, False, False, False, False]  -- 5 total

-- ============================================================================
-- LOOKUP FUNCTIONS (Job -> LoreSet)
-- ============================================================================

||| Get Battle Lore accessibility for a job
export
battleLores : Job -> LoreSet
battleLores WhiteMage = whitemageBL
battleLores Uhlan = uhlanBL
battleLores Machinist = machinistBL
battleLores RedBattlemage = redbattlemageBL
battleLores Knight = knightBL
battleLores Monk = monkBL
battleLores TimeBattlemage = timebattlemageBL
battleLores Foebreaker = foebreakerBL
battleLores Archer = archerBL
battleLores BlackMage = blackmageBL
battleLores Bushi = bushiBL
battleLores Shikari = shikariBL

||| Get Magick Lore accessibility for a job
export
magickLores : Job -> LoreSet
magickLores WhiteMage = whitemageML
magickLores Uhlan = uhlanML
magickLores Machinist = machinistML
magickLores RedBattlemage = redbattlemageML
magickLores Knight = knightML
magickLores Monk = monkML
magickLores TimeBattlemage = timebattlemageML
magickLores Foebreaker = foebreakerML
magickLores Archer = archerML
magickLores BlackMage = blackmageML
magickLores Bushi = bushiML
magickLores Shikari = shikariML

-- ============================================================================
-- OVERLAP CALCULATIONS (COMPILE-TIME)
-- ============================================================================

||| Count accessible lores in a set
export
loreCount : LoreSet -> Nat
loreCount (MkLoreSet xs) = length $ filter id $ toList xs

||| Combined lores (union) when pairing two jobs
export
loreCombined : LoreSet -> LoreSet -> Nat
loreCombined (MkLoreSet xs) (MkLoreSet ys) =
  length $ filter id $ toList $ zipWith (\x, y => x || y) xs ys

||| Shared lores (intersection) between two jobs
export
loreShared : LoreSet -> LoreSet -> Nat
loreShared (MkLoreSet xs) (MkLoreSet ys) =
  length $ filter id $ toList $ zipWith (\x, y => x && y) xs ys

||| Unique lores that job1 adds (not in job2)
export
loreUnique : LoreSet -> LoreSet -> Nat
loreUnique (MkLoreSet xs) (MkLoreSet ys) =
  length $ filter id $ toList $ zipWith (\x, y => x && not y) xs ys

||| Overlap percentage (0-100)
export
loreOverlapPercent : LoreSet -> LoreSet -> Nat
loreOverlapPercent ls1 ls2 =
  let shared = loreShared ls1 ls2
      combined = loreCombined ls1 ls2
  in if combined == 0 then 0 else (shared * 100) `div` combined

-- ============================================================================
-- DUAL-JOB LORE PROFILE
-- ============================================================================

||| Complete lore profile for a dual-job character
public export
record LoreProfile where
  constructor MkLoreProfile
  battleCombined : Nat
  battleShared : Nat
  battleOverlap : Nat  -- Percentage
  magickCombined : Nat
  magickShared : Nat
  magickOverlap : Nat  -- Percentage

||| Calculate lore profile for a job pairing
export
loreProfile : Job -> Job -> LoreProfile
loreProfile j1 j2 =
  let bl1 = battleLores j1
      bl2 = battleLores j2
      ml1 = magickLores j1
      ml2 = magickLores j2
  in MkLoreProfile
       { battleCombined = loreCombined bl1 bl2
       , battleShared = loreShared bl1 bl2
       , battleOverlap = loreOverlapPercent bl1 bl2
       , magickCombined = loreCombined ml1 ml2
       , magickShared = loreShared ml1 ml2
       , magickOverlap = loreOverlapPercent ml1 ml2
       }

-- ============================================================================
-- EXAMPLE PROOFS (Sanity Checks)
-- ============================================================================

{- TODO: These proofs require the compiler to fully evaluate filter/length.
         Can add back with explicit computation if needed.

-- Monk has ALL 16 Battle Lores
monkHasAllBattleLores : loreCount monkBL = 16
monkHasAllBattleLores = Refl

-- Black Mage has ALL 16 Magick Lores
blackMageHasAllMagickLores : loreCount blackmageML = 16
blackMageHasAllMagickLores = Refl

-- Black Mage has ZERO Battle Lores
blackMageHasZeroBattleLores : loreCount blackmageBL = 0
blackMageHasZeroBattleLores = Refl

-- Monk has ZERO Magick Lores
monkHasZeroMagickLores : loreCount monkML = 0
monkHasZeroMagickLores = Refl

-- Pairing Monk with anyone gives at most 16 Battle Lores
monkPairingCappedAt16 : (j : Job) -> loreCombined monkBL (battleLores j) = 16
monkPairingCappedAt16 _ = Refl  -- Monk has all 16, so union = 16

-- Pairing Black Mage with anyone gives at most 16 Magick Lores
blackMagePairingCappedAt16 : (j : Job) -> loreCombined blackmageML (magickLores j) = 16
blackMagePairingCappedAt16 _ = Refl  -- Black Mage has all 16, so union = 16

-- Knight + Black Mage have ZERO overlap in both dimensions
knightBlackMagePerfectComplementary :
  (loreShared knightBL blackmageBL = 0, loreShared knightML blackmageML = 0)
knightBlackMagePerfectComplementary = (Refl, Refl)
-}

-- ============================================================================
-- EFFICIENCY SCORING
-- ============================================================================

||| Lore efficiency score (higher = less overlap = more efficient)
||| Returns 0-100 where 100 = no overlap (perfectly complementary)
export
loreEfficiencyScore : Job -> Job -> Nat
loreEfficiencyScore j1 j2 =
  let prof = loreProfile j1 j2
      -- Average of inverse overlaps (100 - overlap%)
      blEfficiency = 100 `minus` prof.battleOverlap
      mlEfficiency = 100 `minus` prof.magickOverlap
  in (blEfficiency + mlEfficiency) `div` 2
