# License Board Lores - Complete Data (Extracted Feb 9, 2026)

## Data Source

Extracted from [Final Fantasy Wiki - Augment (Final Fantasy XII)](https://finalfantasy.fandom.com/wiki/Augment_(Final_Fantasy_XII))

**Structured data files:**
- `data/license-board-lores.json` - Complete lore node data (16 Battle, 16 Magick)
- `data/license-board-overlap-matrix.json` - Pairwise overlap calculations for all 66 job combinations

## Battle Lore Counts (Complete)

| Job | Base | Esper | Quickening | **Total** |
|-----|------|-------|------------|-----------|
| **Monk** | 16 | 0 | 0 | **16** (all of them) |
| **Uhlan** | 13 | 1 | 0 | **14** |
| **Foebreaker** | 11 | 1 | 1 | **13** |
| **Knight** | 10 | 2 | 0 | **12** |
| **Time Battlemage** | 9 | 2 | 0 | **11** |
| **Bushi** | 6 | 0 | 2 | **8** |
| **White Mage** | 4 | 2 | 1 | **7** |
| **Shikari** | 6 | 0 | 0 | **6** |
| **Machinist** | 3 | 0 | 0 | **3** |
| **Red Battlemage** | 1 | 2 | 0 | **3** |
| **Archer** | 2 | 0 | 0 | **2** |
| **Black Mage** | 0 | 0 | 0 | **0** |

## Magick Lore Counts (Complete)

| Job | Base | Esper | Quickening | **Total** |
|-----|------|-------|------------|-----------|
| **Black Mage** | 16 | 0 | 0 | **16** (all of them) |
| **White Mage** | 15 | 0 | 0 | **15** |
| **Bushi** | 12 | 2 | 0 | **14** |
| **Red Battlemage** | 12 | 0 | 0 | **12** |
| **Time Battlemage** | 9 | 0 | 0 | **9** |
| **Machinist** | 3 | 4 | 0 | **7** |
| **Uhlan** | 4 | 2 | 0 | **6** |
| **Archer** | 1 | 5 | 0 | **6** |
| **Foebreaker** | 0 | 5 | 0 | **5** |
| **Shikari** | 5 | 0 | 0 | **5** |
| **Knight** | 0 | 0 | 0 | **0** |
| **Monk** | 0 | 0 | 0 | **0** |

## How Overlap Works

**Key facts:**
- There are exactly **16 unique Battle Lore nodes** globally
- There are exactly **16 unique Magick Lore nodes** globally
- When you unlock a lore on one board, it **auto-activates** on your second board if it exists there
- You get **max(job1_lores, job2_lores)** as an upper bound, but the actual result is the **union** of accessible nodes

## Example Overlaps

### Knight (12 BL) + Bushi (8 BL)
- **Shared:** 8 Battle Lores (Bushi's 8 are a subset of Knight's 12)
- **Combined:** 12 unique Battle Lores (Knight adds 4 unique ones)
- **Overlap:** 66.7% (8 out of 12 nodes are shared)
- **Magick:** 0 + 14 = 14 unique (no overlap, perfectly complementary)

### Monk (16 BL) + Foebreaker (13 BL)
- **Shared:** 13 Battle Lores (Foebreaker's 13 are a subset of Monk's 16)
- **Combined:** 16 unique Battle Lores (already at the cap)
- **Overlap:** 81.3% (very high - Foebreaker adds nothing)
- **Magick:** 0 + 5 = 5 unique (Monk has zero, so Foebreaker adds all 5)

### Black Mage (16 ML) + Red Battlemage (12 ML)
- **Shared:** 12 Magick Lores (RBM's 12 are a subset of BLM's 16)
- **Combined:** 16 unique Magick Lores (already at the cap)
- **Overlap:** 75.0% (high - RBM adds nothing for Magick Lores)
- **Battle:** 0 + 3 = 3 unique (BLM has zero, so RBM adds all 3)

### White Mage (15 ML, 7 BL) + Time Battlemage (9 ML, 11 BL)
- **Shared (Battle):** 7 Battle Lores (WM's 7 are a subset of TBM's 11)
- **Combined (Battle):** 11 unique Battle Lores
- **Shared (Magick):** 9 Magick Lores (TBM's 9 are a subset of WM's 15)
- **Combined (Magick):** 15 unique Magick Lores
- **Analysis:** High overlap (both mages), but still gains 4 Battle + 6 Magick unique nodes

## Key Insights for Modeling

### 1. Jobs with ALL lores (special cases)
- **Monk:** All 16 Battle Lores → any combo with Monk = 16 Battle Lores max
- **Black Mage:** All 16 Magick Lores → any combo with BLM = 16 Magick Lores max

### 2. High overlap pairs (inefficient for lore stacking)
- Monk + Foebreaker: 81% overlap (Foebreaker adds 0 Battle Lores)
- Monk + Uhlan: 87% overlap (Uhlan adds 0 Battle Lores)
- Black Mage + any mystic job: 75-100% Magick Lore overlap

### 3. Low overlap pairs (efficient for lore stacking)
- Physical + Mystic combos generally have <20% overlap
- Knight + Bushi (Battle): 67% overlap BUT Bushi adds 14 Magick Lores
- Bushi + Black Mage: 0% Battle overlap, 88% Magick overlap

### 4. Perfect complementary pairs (zero overlap)
- Any job with 0 Battle Lores + any physical job → zero Battle Lore overlap
- Any job with 0 Magick Lores + any magic job → zero Magick Lore overlap
- Example: Knight (0 ML) + Bushi (14 ML) = perfect Magick Lore complementarity

## For Idris 2 Modeling

### Level 1 - Simple Counts (Start Here)
```idris
record JobLores where
  battleLores : Nat  -- Total accessible (base + esper + quickening)
  magickLores : Nat
```

Use the "Total" column from tables above. This gives stat calculations without modeling overlap.

### Level 2 - Overlap Modeling (If Needed)
```idris
-- Each job's accessible lore set (16-bit vector)
record LoreAccess where
  battleLoreSet : Vect 16 Bool  -- True = job can access this node
  magickLoreSet : Vect 16 Bool

-- Combine via union
combineLores : LoreAccess -> LoreAccess -> (Nat, Nat)
combineLores j1 j2 =
  let battleUnion = zipWith (||) j1.battleLoreSet j2.battleLoreSet
      magickUnion = zipWith (||) j1.magickLoreSet j2.magickLoreSet
  in (countTrue battleUnion, countTrue magickUnion)
```

Load bit vectors from `data/license-board-lores.json` where each lore node's `jobs` field shows accessibility.

### Level 3 - Esper/Quickening Gating (Advanced)
Some lores require espers or quickenings. Model as:
```idris
data LoreUnlock = Base | RequiresEsper Esper | RequiresQuickening
```

This matters if you want to validate "can this build access lore X given these esper assignments?"

## Validation Strategy

1. **Load the JSON data** (`license-board-lores.json`) at compile time or startup
2. **For each job pair**, calculate union of accessible lore nodes
3. **Count the union** to get actual Battle/Magick Lore totals
4. **Compare against expected values** (e.g., "Balanced" preset claims certain lore counts)

## Why This Data Exists

The original question was: **"Do we know HOW they overlap?"**

Answer: **Yes, now we do.** Every single one of the 66 possible job combinations has precise overlap data in `license-board-overlap-matrix.json`.

Example query:
```bash
cat data/license-board-overlap-matrix.json | jq '."Knight+Bushi"'
```

Output:
```json
{
  "battle_lores": {
    "job1_total": 12,
    "job2_total": 8,
    "shared": 8,
    "combined_total": 12,
    "overlap_percent": 66.7
  },
  "magick_lores": {
    "job1_total": 0,
    "job2_total": 14,
    "shared": 0,
    "combined_total": 14,
    "overlap_percent": 0.0
  }
}
```

No more guessing or estimating!
