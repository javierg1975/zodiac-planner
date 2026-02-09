# License Board Lore Data Files

## Files in this Directory

### `license-board-lores.json`
Complete raw data for all 16 Battle Lore and 16 Magick Lore nodes.

**Structure:**
```json
{
  "battle_lores": [
    {
      "id": 1,
      "lp_cost": 30,
      "jobs": {
        "White Mage": "base",
        "Uhlan": "base",
        "Machinist": "base",
        ...
        "Black Mage": null  // null = no access
      }
    },
    ...
  ],
  "magick_lores": [...],  // Same structure
  "summary": {
    "battle_lore_counts": {
      "Monk": { "base": 16, "esper": 0, "quickening": 0, "total": 16 },
      ...
    },
    "magick_lore_counts": { ... }
  }
}
```

**Access types:**
- `"base"` - Available on the job's native license board
- `"esper"` - Unlocked by assigning an esper to this character
- `"quickening"` - Unlocked behind a Quickening gate
- `null` - Job cannot access this lore node

### `license-board-overlap-matrix.json`
Pre-calculated overlap data for all 66 possible dual-job combinations.

**Structure:**
```json
{
  "Knight+Bushi": {
    "battle_lores": {
      "job1_total": 12,      // Knight has 12 BL
      "job2_total": 8,       // Bushi has 8 BL
      "shared": 8,           // 8 lores appear on both boards
      "only_job1": 4,        // 4 lores only Knight has
      "only_job2": 0,        // 0 lores only Bushi has
      "combined_total": 12,  // Union: 12 unique lores
      "overlap_percent": 66.7
    },
    "magick_lores": { ... }
  },
  ...
}
```

## Usage Examples

### Python
```python
import json

# Load complete lore data
with open('data/license-board-lores.json') as f:
    lore_data = json.load(f)

# Get Monk's Battle Lore count
monk_bl = lore_data['summary']['battle_lore_counts']['Monk']['total']
print(f"Monk has {monk_bl} Battle Lores")  # 16

# Check if Knight can access Battle Lore node #5
bl_node_5 = lore_data['battle_lores'][4]  # 0-indexed
knight_access = bl_node_5['jobs']['Knight']
print(f"Knight access to BL#5: {knight_access}")  # 'base', 'esper', 'quickening', or None

# Load overlap matrix
with open('data/license-board-overlap-matrix.json') as f:
    overlaps = json.load(f)

# Get Knight+Bushi overlap
kb_overlap = overlaps['Knight+Bushi']
print(f"Knight+Bushi combined Battle Lores: {kb_overlap['battle_lores']['combined_total']}")  # 12
```

### JavaScript
```javascript
const loreData = require('./license-board-lores.json');

// Get all jobs with access to Battle Lore node #10
const blNode10 = loreData.battle_lores[9]; // 0-indexed
const jobsWithAccess = Object.entries(blNode10.jobs)
  .filter(([job, access]) => access !== null)
  .map(([job, access]) => job);

console.log('Jobs with Battle Lore #10:', jobsWithAccess);

// Calculate overlap programmatically
function calculateOverlap(job1, job2, loreType) {
  const lores = loreData[loreType];

  const job1Set = new Set(
    lores.map((lore, i) => lore.jobs[job1] ? i : null).filter(x => x !== null)
  );
  const job2Set = new Set(
    lores.map((lore, i) => lore.jobs[job2] ? i : null).filter(x => x !== null)
  );

  const union = new Set([...job1Set, ...job2Set]);
  const intersection = new Set([...job1Set].filter(x => job2Set.has(x)));

  return {
    combined: union.size,
    shared: intersection.size
  };
}

const overlap = calculateOverlap('Bushi', 'Black Mage', 'magick_lores');
console.log('Bushi+Black Mage Magick Lore overlap:', overlap);
// { combined: 16, shared: 14 }
```

### Idris 2
```idris
-- Define accessible lore set
record LoreAccess where
  constructor MkLoreAccess
  battleLores : Vect 16 Bool
  magickLores : Vect 16 Bool

-- Load from JSON (pseudo-code, actual FFI needed)
loadJobLores : String -> IO LoreAccess

-- Combine two jobs
combineLores : LoreAccess -> LoreAccess -> LoreAccess
combineLores j1 j2 = MkLoreAccess
  (zipWith (||) j1.battleLores j2.battleLores)
  (zipWith (||) j1.magickLores j2.magickLores)

-- Count accessible lores
countLores : Vect 16 Bool -> Nat
countLores = length . filter id . toList
```

## Quick Reference

### Jobs with ALL lores
- **Battle Lores:** Monk (16/16)
- **Magick Lores:** Black Mage (16/16)

### Lowest lore counts
- **Battle Lores:** Black Mage (0), Archer (2), Machinist/Red Battlemage (3)
- **Magick Lores:** Knight/Monk (0), Foebreaker/Shikari (5)

### Highest overlap pairs
- **Monk + Foebreaker:** 81% Battle Lore overlap (13 shared out of 16)
- **Monk + Uhlan:** 87% Battle Lore overlap (14 shared out of 16)
- **Black Mage + Bushi:** 88% Magick Lore overlap (14 shared out of 16)

### Best complementary pairs (lowest overlap)
- **Knight + Black Mage:** 0% Magick overlap, 0% Battle overlap
- **Monk + any mystic:** 0% Magick overlap (Monk has none)
- **Black Mage + any physical:** 0% Battle overlap (BLM has none)

## Data Provenance

- **Source:** [Final Fantasy Wiki - Augment (Final Fantasy XII)](https://finalfantasy.fandom.com/wiki/Augment_(Final_Fantasy_XII))
- **Extraction Date:** February 9, 2026
- **Extraction Script:** Python HTML parser (see `augments/` directory for source HTML)
- **Validation:** Cross-referenced with community guides and in-game testing

## Known Limitations

1. **Esper specifics not included:** We know which lores require espers, but not WHICH esper. Cross-reference with `data/espers.js` for esper unlock details.

2. **Quickening costs not tracked:** We know which lores are behind Quickening gates, but not the LP cost of those gates.

3. **LP efficiency not calculated:** Total LP cost to unlock all lores for a job pair is not pre-computed.

4. **Board positions not included:** This data shows WHICH lores are accessible, not WHERE they are on the license board grid.

For most optimization and validation purposes, knowing the counts and overlaps is sufficient. For deeper analysis (e.g., LP optimization paths), consult the original wiki page or extracted HTML.
