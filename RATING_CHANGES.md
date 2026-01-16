# Rating System Changes

## Summary
Changed from numerical ratings (0-100) to letter grades (S/A/B/C/D) for more intuitive build comparison.

## Grade Scale
- **S** (90-100): Exceptional/Elite - Amber color
- **A** (80-89): Excellent - Cyan color
- **B** (70-79): Good/Solid - Blue color
- **C** (60-69): Decent/Workable - Gray color
- **D** (50-59): Poor - Red color

## Updated Build Ratings

| Build               | LP Sync | Power | Flex | Notes |
|---------------------|---------|-------|------|-------|
| Max Efficiency      | S       | A     | S    | No change |
| DPS Nuclear         | B       | S     | B    | No change |
| Beginner Friendly   | A       | **A** | S    | **Power corrected** (was effectively B-tier at 80) |
| Leader Trinity      | S       | A     | A    | No change |
| Yiazmat Specialist  | B       | S     | C    | No change |
| Lore Friendly       | S       | **B** | S    | **Power corrected** (was A-tier at 85) |

## Power Rating Corrections

### Beginner Friendly: 80 → A-tier (~86)
**Why the increase?**
- Balthier: Foebreaker/**Bushi** - Katanas achieve 94% DPS vs baseline, **combo-capable**
- Fran: **Monk**/Time Battlemage - Poles achieve 91% DPS vs baseline, **combo-capable**
- Basch: Archer/Uhlan - Zodiac Spear = 100% baseline DPS
- Has **two top-tier combo DPS characters** with Genji Gloves synergy

### Lore Friendly: 85 → B-tier (~76)
**Why the decrease?**
- Balthier: **Machinist**/Foebreaker - Guns achieve only 76% DPS, **cannot combo**
- Fran: **Archer**/Time Battlemage - Bows achieve only 59% DPS, **cannot combo, weakest weapon type**
- Both primary DPS use non-combo weapons with no Genji Gloves benefit
- Power rating was inflated compared to actual weapon performance

## Source Data
Based on DPS analysis from "FFXII TZA: The Unnecessary Class Guide v2.2":
- **Combo weapons** (katanas, poles, ninja swords, hammers): Can trigger multiple hits with Genji Gloves (+25% DPS)
- **Non-combo weapons** (guns, bows, crossbows): Cannot combo, no Genji Gloves benefit
- Guide explicitly states: "Machinist is a class that will always be underpowered compared to other classes"
- Archer bows rank at bottom of DPS charts (59.33% vs Zodiac Spear baseline)

## Visual Changes
- Letter grades displayed in large, bold, color-coded text
- Gauge bars adapted to show relative strength (S=95%, A=80%, B=65%, C=50%, D=35%)
- More intuitive than arbitrary percentages
- Fits FFXII/Japanese game aesthetic (S-rank system)
