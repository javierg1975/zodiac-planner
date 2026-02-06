# FFXII Game Mechanics & Domain Knowledge

## Core Mechanics

1. **License Board**: Each job has a board; spend LP to unlock abilities/equipment
2. **Espers**: Assigned to ONE character; unlock additional board nodes for specific job combos
3. **Efficiency**: Measures wasted LP from overlapping unlocks between dual jobs
4. **Leader Mechanic**: First character in formation absorbs most attacks
5. **Party Limit**: Only 3 active at once (hence party composition feature)
6. **Gambits**: AI programming system automating character actions in battle
7. **Genji Gloves**: 1.8x combo rate for multi-hit weapons (ninja swords, poles, katanas). Do NOT use with bows, crossbows, guns, hand-bombs, rods, or measures
8. **Swiftness 3**: 70% chance to perform actions twice
9. **Channeling 3**: 10% chance for 0 MP cost (effectively infinite MP)
10. **Berserk Strategy**: Permanent Berserk status for auto-attack optimization

## Equipment Quick Reference

**Weapons**: Dragon Whisker/Kanya (Poles), Masamune (Katana, scales with MAG), Fomalhaut (best Gun), Zodiac Spear (best Spear), Main Gauche (50% evasion dagger), Excalibur (Holy, scales with MAG)

**Armor**: Grand Armor (Heavy 12), Black Robes (MAG+), White Robes (healing+), Genji Armor (evasion builds)

**Accessories**: Genji Gloves (combo, CRITICAL for Katana/Pole DPS), Bubble Belt (HP for superbosses), Ribbon (status immunity), Berserk Bracers, Sage's Ring (MP)

## Esper & Job Clarifications

### Time Battlemage Hastega (CRITICAL)

Time Battlemage has **natural Hastega**. Do NOT assign Famfrit "for Hastega" to a TBM character.

- Famfrit unlocks for TBM: **Battle Lore only** (NOT Hastega)
- Famfrit unlocks Hastega for: **Machinist only**

### Tactical Note Style

Focus on tactical implications, not obvious mechanics:
- GOOD: "No backup Hastega source - keep Fran alive"
- BAD: "Fran is the ONLY Hastega source (natural Time Battlemage spell)"

### Esper Display Names

- Use `ESPER_FULL_NAMES[esperName]` for all UI display
- Short names in data structures, full titles ('Zeromus, the Condemner') shown to users

## Reference Documentation

Detailed game guides in `docs/`:
- `docs/job-classes.md` — Job breakdowns and synergies
- `docs/espers-reference.md` — Esper assignments and license unlocks
- `docs/equipment-reference.md` — Comprehensive gear guide
- `docs/build-strategies.md` — Optimization strategies
- `docs/team-compositions.md` — Party formation strategies
- `docs/advanced-tactics.md` — Endgame mechanics and superboss strategies
- `docs/beginner-guide.md` — New player walkthrough
- `docs/theoretical-analysis.md` — Mathematical analysis
- `docs/FFXII TZA_ The Unneccessary Class Guide v2.2.md` — Complete original guide
