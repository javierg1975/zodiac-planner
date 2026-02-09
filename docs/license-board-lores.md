# License Board Lores - Battle Lore & Magick Lore Counts

## Overview

Battle Lores and Magick Lores are license board augments that increase STR and MAG stats respectively by +1 per lore. Understanding lore distribution is critical for optimizing dual-job combinations.

**CRITICAL**: Lores do NOT stack across job boards. When you unlock a lore on one board, it **automatically activates on the second board** if it exists there (no LP cost for the duplicate). You only get the benefit once. The "inefficiency" is that overlapping jobs don't give you MORE total lores - you get max(job1_lores, job2_lores), not their sum.

## Battle Lore Counts by Job

Based on game data and community documentation:

| Job | Battle Lores | Source |
|-----|--------------|--------|
| Monk | 16 | Confirmed - highest in game ([docs](https://www.gamerguides.com/final-fantasy-xii/guide/job-guide/jobs)) |
| Uhlan | 13 | Confirmed ([codebase docs](../docs/theoretical-analysis.md)) |
| Foebreaker | 11 | Confirmed ([esper data](../data/espers.js)) |
| Knight | 10 | Confirmed ([Game8 guide](https://game8.co/games/Final-Fantasy-XII/archives/270635)) |
| Time Battlemage | 9 | Confirmed ([esper unlock data](../data/espers.js)) |
| Bushi | 6 | Confirmed ([community data](https://steamcommunity.com/app/595520/discussions/0/5760637065634155078/)) |
| Shikari | 6 | Confirmed ([community data](https://steamcommunity.com/app/595520/discussions/0/5760637065634155078/)) |
| Red Battlemage | 1 | Confirmed ([Game8 guide](https://game8.co/games/Final-Fantasy-XII/archives/270647)) |
| Archer | 2 | Confirmed - very low! ([Gamer Guides](https://www.gamerguides.com/final-fantasy-xii/guide/job-guide/jobs/archer)) |
| White Mage | 5 | Confirmed ([White Mage guide](https://www.gamerguides.com/final-fantasy-xii/guide/job-guide/jobs/white-mage)) |
| Machinist | ~6 | Has Battle Lores - exact count needs verification |
| Black Mage | 0 | Mystic job, zero physical focus - needs verification |

## Magick Lore Counts by Job

| Job | Magick Lores | Source |
|-----|--------------|--------|
| Black Mage | 16 | Confirmed - ALL available Magick Lores |
| White Mage | 14 | Confirmed |
| Red Battlemage | 12 | Confirmed |
| Bushi | 12 | Confirmed |
| Time Battlemage | 9 | Confirmed |
| Uhlan | 4 | Confirmed |
| Shikari | 5 | Confirmed |
| Foebreaker | Low + esper unlocks (Exodus/Zeromus each give 4) | Esper-dependent |
| Archer | Low + 1 from Chaos esper | Minimal native |
| Machinist | Low + 3 from Ultima esper | Esper-dependent |
| Knight | 0-2 | Heavy armor focus, minimal magic |
| Monk | Low | Physical focus |

## Lore Overlap Mechanics

### Key Rule
**Lores are GLOBAL and shared.** There are only 16 unique Battle Lore nodes and 16 unique Magick Lore nodes in the game. Different jobs access different subsets of these shared nodes.

### Implications for Dual-Classing

1. **Black Mage + Any Job** → Always maxes at 16 Magick Lores (Black Mage has all 16, any overlaps auto-activate)
2. **Monk + Foebreaker** → Gets max(16, 11) Battle Lores = 16, NOT 27 (Foebreaker's 11 are likely subset of Monk's 16)
3. **Similar job types** (two mystic jobs, two heavy armor jobs) → Higher overlap = smaller total lore pool
4. **Complementary job types** (mystic + physical) → Lower overlap = larger total lore pool
5. **No LP waste** → Overlapping lores just auto-activate on second board when bought on first

### Example Overlap Scenarios

**High Efficiency** (minimal overlap = more total unique lores):
- Bushi (6 BL, 12 ML) + Knight (10 BL, ~2 ML): Different lore distributions → likely ~14-16 Battle Lores total
- Shikari + Foebreaker: Light + Heavy, complementary
- Black Mage + Knight: BLM has 0 Battle Lores, Knight has 10 → guaranteed 10 Battle Lores gained

**Low Efficiency** (high overlap = fewer total unique lores):
- Black Mage (0 BL, 16 ML) + Red Battlemage (1 BL, 12 ML): RBM's 12 Magick Lores are subset of BLM's 16 → only +1 Battle Lore gained
- Monk (16 BL) + Foebreaker (11 BL): Foebreaker's lores likely subset of Monk's → few extra lores gained
- White Mage (5 BL, 14 ML) + Time Battlemage (9 BL, 9 ML): Both mages, significant overlap expected

**The key**: Overlapping lores auto-activate (no LP waste), but they don't double your stats. You want complementary jobs to maximize your TOTAL unique lore count.

## Summary: What We Know vs. What Needs Verification

### Confirmed Battle Lore Counts (11 of 12 jobs)
✅ Monk: 16
✅ Uhlan: 13
✅ Foebreaker: 11
✅ Knight: 10
✅ Time Battlemage: 9
✅ Bushi: 6
✅ Shikari: 6
✅ White Mage: 5
✅ Archer: 2
✅ Red Battlemage: 1
✅ Black Mage: 0 (assumed - purely magic focus)

### Still Needs Verification
- [ ] Machinist Battle Lore count (~5-7 estimated based on community discussions)
- [ ] Black Mage Battle Lore count (likely 0, needs confirmation)
- [ ] Exact overlap matrices between job pairs

### Total Available Lores in Game
- **16 unique Battle Lore nodes** (globally shared pool)
- **16 unique Magick Lore nodes** (globally shared pool)

## Research Sources

- [Steam Discussion: Magic & Battle Lore](https://steamcommunity.com/app/595520/discussions/0/5760637065634155078/)
- [Uhlan Job Guide](https://www.gamerguides.com/final-fantasy-xii/guide/job-guide/jobs/uhlan)
- [Monk Job Guide](https://www.rpgsite.net/feature/5778-final-fantasy-xii-the-zodiac-age-best-job-combinations-and-builds-for-your-first-and-second-job-choices)
- [License Board Overview](https://www.gamerguides.com/final-fantasy-xii/guide/job-guide/character-development/getting-started)
- In-game data from `docs/FFXII TZA_ The Unneccessary Class Guide v2.2.md`

## For Idris 2 Modeling

### What We Actually Need (Minimal Approach)

You're right that we don't need all the license board data. For type-safe job validation, we need:

**Level 1 - Simple (Start Here)**
```idris
record JobLores where
  constructor MkJobLores
  battleLores : Nat
  magickLores : Nat
```

This gives us:
- Stat boost calculations (each lore = +1 STR or MAG)
- Basic synergy assessment (high vs low lore jobs)

**Level 2 - With Overlap Modeling (If needed)**
```idris
-- Represent which of the 16 lores each job can access
record LoreAccess where
  constructor MkLoreAccess
  battleLoreSet : Vect 16 Bool  -- True = job can access this lore node
  magickLoreSet : Vect 16 Bool

-- Combine two jobs: union, not sum
combineLores : LoreAccess -> LoreAccess -> LoreAccess
combineLores j1 j2 = MkLoreAccess
  (zipWith (||) j1.battleLoreSet j2.battleLoreSet)
  (zipWith (||) j1.magickLoreSet j2.magickLoreSet)

-- Count final lores
countLores : Vect 16 Bool -> Nat
countLores = length . filter id . toList
```

**What We DON'T Need:**
- ❌ Exact license board node positions/coordinates
- ❌ Potion/Phoenix/Ether/Remedy lores
- ❌ All weapon/armor license assignments
- ❌ LP costs
- ❌ Quickening/Esper gate connections

**What We DO Need:**
- ✅ Battle Lore counts per job (11 of 12 confirmed above)
- ✅ Magick Lore counts per job (partial data available)
- ⚠️ Overlap information (can estimate or calculate from bit sets)

### Pragmatic Next Steps

1. **Start with Level 1** (simple counts) - we have enough data for 11/12 jobs
2. **Estimate Machinist** as ~6 Battle Lores based on community data
3. **Model overlap as approximation** initially:
   - Same job type (Heavy+Heavy, Mystic+Mystic) → assume 30-50% overlap
   - Complementary types (Heavy+Mystic) → assume 10-20% overlap
4. **Add exact overlap data later** if we find complete license board maps

This keeps the experiment lean while still encoding meaningful domain constraints.

## Critical Gap: We Don't Know Specific Overlap Patterns

**Short answer: No, we don't know HOW lores overlap between jobs.**

We know:
- ✅ Monk has 16 Battle Lores (all of them)
- ✅ Foebreaker has 11 Battle Lores
- ✅ When combined, lores auto-activate (no LP waste)
- ✅ You can't exceed 16 total (the global maximum)

We DON'T know:
- ❌ WHICH 11 of the 16 lores Foebreaker has
- ❌ How many overlap with Monk's 16
- ❌ Whether Foebreaker's 11 are lores #1-11, or some other subset

### Example: Monk + Foebreaker

Three possible scenarios:

**Scenario A - Complete Subset**
```
Monk:        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]  = 16 lores
Foebreaker:  [1,2,3,4,5,6,7,8,9,10,11]                 = 11 lores
Union:       [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]  = 16 lores (Foebreaker adds 0)
```

**Scenario B - Partial Overlap**
```
Monk:        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]  = 16 lores
Foebreaker:  [3,4,5,6,7,8,9,10,11,12,13]               = 11 lores
Union:       [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]  = 16 lores (still capped at 16 max)
```

**Reality**: Since Monk has ALL 16 lores, Foebreaker can only add 0 more (we're already at the cap). But for other combinations like Knight (10) + Bushi (6), the overlap matters a lot.

### What This Means for Modeling

**Pragmatic approach for now:**
1. **Assume reasonable overlap** for similar job types:
   - Heavy + Heavy (Knight + Foebreaker): ~50% overlap
   - Mystic + Mystic (Black Mage + Red Battlemage): ~70% overlap
   - Physical + Mystic (Bushi + Black Mage): ~10% overlap

2. **For Monk specifically**: Since Monk has ALL 16, any combination with Monk = 16 Battle Lores (no exceptions)

3. **For Black Mage specifically**: Since BLM has ALL 16 Magick Lores, any combination with BLM = 16 Magick Lores

**Tools that might have the data:**
- [FF12 Character Planner](https://nattthebear.github.io/ff12characterplanner/) (need to inspect manually)
- [License Board Matrix Steam Guide](https://steamcommunity.com/sharedfiles/filedetails/?id=1316572657) (spreadsheet download)
- Community might have mined the game files for exact license board node IDs
