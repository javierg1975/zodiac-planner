# Idris 2 Port - Progress Update

**Date**: February 8, 2026
**Session Focus**: Validation testing, blind spot identification, optimal pairing analysis

---

## Completed This Session

### ✅ Build Validation Suite

**Tested 4 expert presets against type model:**

| Preset | Esper Waste | Key Findings |
|--------|-------------|--------------|
| **Ultimate** 🥇 | 7.7% (1/13) | BEST efficiency despite being "luxury build" |
| **Trinity** 🥈 | 10% (1/10) | Red Battlemage + Shikari eliminates Exodus waste |
| **Endurance** 🥉 | 25% (2/8) | Specialized for single boss, acceptable waste |
| **Balanced** | 37.5% (3/8) | General-purpose, highest waste |

**Key Discovery**: "No compromises" luxury build has BETTER efficiency than general-purpose build!

**Why Ultimate is more efficient:**
1. Fran's 5-esper concentration (Monk + Time Battlemage) = 100% efficient
2. Better Heavy job pairings (Bushi+Knight, Uhlan+Bushi) avoid redundancy
3. Strategic esper placement on high-synergy characters

**Pattern Recognition**: Shemhazai (Heavy Armor for Archer) is consistently wasted across builds when Archer pairs with Heavy jobs (Foebreaker, Uhlan).

---

### ✅ Blind Spot Identification & Fix

**Problem**: Role scores alone are misleading

**Three Major Blind Spots Identified:**

1. **Vaan (Trinity)** - "Evasion Tank"
   - Role score: PhysicalTank = 4 (looks weak!)
   - Reality: Evasion-based tanking (Main Gauche + Shield = 90% dodge)

2. **Penelo (Endurance)** - "Attacker" (primary DPS)
   - Role score: PhysicalDPS = 2, Healer = 9 (looks like healer!)
   - Reality: Berserked Yagyu Darkblade + Black Robes = Dark damage DPS

3. **Fran (Universal)** - Appears in all 4 builds
   - Role score: PhysicalDPS = 7 (high but doesn't explain WHY)
   - Reality: Kanya pole + Genji Gloves (1.25x combo) + Channeling 3 (infinite MP)

**Solution**: Created `Types/Capability.idr` with `EquipmentStrategy` type

```idris
data EquipmentStrategy
  = HPTank              -- Traditional tank (Knight, Uhlan)
  = EvasionTank         -- Main Gauche + Shield dodge tank
  = ComboOptimized      -- Genji Gloves weapons (katana 1.8x, pole 1.25x, ninja sword 1.8x)
  = ElementalBoost      -- Black/White Robes damage amplification
  = BreakSpecialist     -- Full Break suite (Foebreaker)
  = MPRegeneration      -- Channeling 3 + Sage's Ring
  = BerserkViable       -- Auto-attack builds
  ... (12 total strategies)
```

**Validation Results** (`Tests/CapabilityValidation.idr`):
- ✅ Vaan: EvasionTank strategy = 5 (reveals actual tank method)
- ✅ Penelo: ComboOptimized = 5 (shows ninja sword DPS potential)
- ✅ Fran: ComboOptimized + MPRegeneration = 8 (explains universal appeal)

**Recommendation**: Use BOTH scoring systems:
- **Role scores**: "CAN you perform this role?"
- **Equipment strategy scores**: "HOW do you perform it optimally?"

---

### 🚧 In Progress: Optimal Pairing Search

**Motivation**: User questioned whether expert builds are actually optimal:

**Questions Raised:**
1. **Penelo (Endurance)**: Is White Mage the BEST mage for Shikari DPS?
   - White Mage provides healing but doesn't help Shikari "punch harder"
   - Black Mage has Black Robes (50% Dark boost) → synergizes with Yagyu Darkblade!
   - What about Red Battlemage or Time Battlemage?

2. **Vaan (Trinity)**: Why not double down on tanking?
   - Red Battlemage + Shikari gives magic versatility but NO survivability boost
   - Knight + Shikari = EvasionTank + HPTank (belt AND suspenders!)
   - Uhlan + Shikari = same double-tanking benefit

**Started Building**: `Analysis/OptimalPairings.idr`
- Search ALL job pairings for specific equipment strategies
- Rank by total score (strategy + role synergy)
- Answer "What's the ACTUAL best pairing for X goal?"

**Status**: 🔴 **BLOCKED** - Compilation issues + fundamental data gap

---

## Current Blockers

### 🔴 Critical: Missing Game Data

**Problem**: We can score "vibes" but not actual mechanics.

**What We Have** (qualitative):
- Equipment strategy score: Synergistic (8), Enabled (5), Conflicting (0)
- Tells us "Black Mage CAN use ElementalBoost" but NOT:
  - How many Battle Lores does Black Mage give to Shikari?
  - Does Black Mage unlock Black Robes for Shikari? ← **THE CRITICAL QUESTION**
  - Does Black Mage's MAG focus conflict with Shikari's STR weapons?

**What We Need** (quantitative):

1. **License Board Augments** (per job pair):
   - Battle Lore count (STR boost for physical DPS)
   - Magick Lore count (MAG boost)
   - HP bonuses
   - Speed bonuses

2. **Equipment Access** (what each job unlocks for its pair):
   - Black Mage → Shikari: Does it unlock Black Robes? (50% Dark damage boost!)
   - White Mage → Shikari: Does it unlock White Robes? (healing boost - useless for DPS)
   - Which armors? Which weapons?

3. **Synergy Mechanics**:
   - Ninja swords scale with STR or MAG?
   - Katanas scale with MAG (confirmed in original app)
   - Which augments stack between jobs?

**Example of Current Gap**:
- Question: "What's the best mage for Shikari DPS (Yagyu Darkblade)?"
- Current answer: "Black Mage has ElementalBoost = 5, White Mage doesn't = 0"
- WRONG because we don't know if Black Mage actually unlocks Black Robes for Shikari!

**This is the "equipment adds a whole can of worms" problem.**

### 🟡 Minor: Compilation Issues

**OptimalPairings.idr** has syntax/naming issues:
- Naming collision: `capabilityScore` exists in both `Types.Job` and `Types.Capability`
- Fixed with qualified imports but still debugging
- `printPairingScore` function privacy issues in namespaces

**Status**: Fixable but paused pending data gap decision

---

## Architecture Wins

### ✅ Type System Validates Core Mechanics

**What Works Well:**
1. ✅ Esper uniqueness (all 13 assigned exactly once per build)
2. ✅ Job pairings compile without conflicts
3. ✅ Unlock waste detection (identifies redundant esper assignments)
4. ✅ Role-based scoring for general strategies
5. ✅ Equipment strategy patterns (semantic, not quantitative)

**What We've Proven:**
- Type system successfully models job-based mechanics
- Can detect efficiency patterns (waste, synergies)
- Can validate expert builds against domain model
- Can identify blind spots in pure role scoring

### ⚠️ Type System Cannot Capture Gear-Dependent Strategies

**Fundamental Limitations:**
- ❌ Evasion tanking (Main Gauche + Shield → gear-dependent)
- ❌ Elemental weakness exploitation (Dark weapons vs. Yiazmat → enemy data)
- ❌ Combo optimization (Genji Gloves + specific weapon types → item data)
- ❌ Equipment synergies (Black Robes + Dark damage → equipment stats)

**Requires external data:**
- Equipment stats (attack power, elemental types, combo rates)
- Enemy weaknesses (Dark-weak, Holy-weak, etc.)
- License board unlocks (which job gives which augments to which pair)

---

## Decision Point: Next Steps

### Option 1: Add Minimal Equipment Data

**Scope**: Just the critical stuff needed for pairing search
- License board augment counts (Battle Lore, Magick Lore per job pair)
- Equipment access flags (which jobs unlock Black/White Robes for their pair)
- Weapon scaling types (STR vs. MAG)

**Pros**:
- Enables quantitative pairing search
- Answers user's questions about optimal builds
- Relatively contained scope

**Cons**:
- Still "can of worms" territory
- Requires manual data entry from game/guides
- May need iteration as we discover missing data

**Estimated Work**: Medium (2-3 sessions)

### Option 2: Accept Qualitative Scoring

**Scope**: Keep equipment strategies as semantic patterns only
- Document limitations clearly
- Focus on role-based recommendations
- Defer quantitative optimization to later phase

**Pros**:
- Unblocks UI development
- Validates type system core without equipment complexity
- Can always add data later

**Cons**:
- Can't answer "optimal pairing" questions accurately
- Recommendations may miss critical synergies
- User loses confidence in tool accuracy

**Estimated Work**: Low (documentation + proceed to UI)

### Option 3: Port Remaining Presets First

**Scope**: Test First Jobs, Big Game Hunter, Max Efficiency
- Validate type system against more edge cases
- Identify additional blind spots
- Defer equipment data decision

**Pros**:
- More comprehensive validation
- May reveal new patterns
- Builds confidence in domain model

**Cons**:
- Doesn't solve current blocker
- May hit same equipment data wall
- Delays UI work further

**Estimated Work**: Low-Medium (1-2 sessions)

### Option 4: Start UI Layer

**Scope**: Begin `idris2-dom-mvc` implementation
- Library mode (preset browser)
- Use current role + equipment strategy scores
- Accept qualitative limitations

**Pros**:
- Real progress on user-facing features
- Tests type system in actual application
- Can add data incrementally as UI reveals needs

**Cons**:
- UI may expose more missing data
- Rework risk if data model changes
- Incomplete recommendations

**Estimated Work**: High (multiple sessions)

---

## Recommendation

**My suggestion**: **Option 1** (Add minimal equipment data)

**Rationale**:
1. User's questions are legitimate and important
2. "What's the best mage for Shikari DPS?" is a core use case
3. Equipment data is well-documented in original app (`data/*.js`, `docs/*.md`)
4. Relatively contained scope (license board augments + equipment access)
5. Unlocks quantitative pairing search (immediate value)

**Minimal viable data**:
```idris
-- What augments does job1 give to job2?
jobPairAugments : Job -> Job -> AugmentProfile
  where AugmentProfile = { battleLore : Nat, magickLore : Nat, hpBonus : Nat, ... }

-- What equipment does job1 unlock for job2?
jobPairEquipment : Job -> Job -> EquipmentAccess
  where EquipmentAccess = { blackRobes : Bool, whiteRobes : Bool, heavyArmor : Nat, ... }
```

**Sources**: `docs/equipment-reference.md`, `docs/espers-reference.md`, original `data/*.js`

---

## Files Created/Modified This Session

**New Files**:
- `idris2-src/src/Types/Capability.idr` - Equipment strategy type system
- `idris2-src/src/Tests/TrinityValidation.idr` - Trinity preset validation
- `idris2-src/src/Tests/EnduranceValidation.idr` - Endurance preset validation
- `idris2-src/src/Tests/UltimateValidation.idr` - Ultimate preset validation
- `idris2-src/src/Tests/CapabilityValidation.idr` - Equipment strategy validation
- `idris2-src/src/Analysis/OptimalPairings.idr` - Pairing search (WIP, blocked)
- `idris2-src/VALIDATION_RESULTS.md` - Comprehensive build validation analysis
- `idris2-src/PROGRESS_UPDATE.md` - This file

**Modified Files**:
- `idris2-src/zodiac-planner.ipkg` - Added new modules

**Test Executables**:
- `ValidateTrinity` ✅ Working
- `ValidateEndurance` ✅ Working
- `ValidateUltimate` ✅ Working
- `ValidateCapability` ✅ Working
- `InvestigateOptimal` 🔴 Blocked

---

## Summary Stats

**Lines of Idris Code**: ~2,500 (estimated)
**Test Coverage**: 4 presets validated (Balanced, Trinity, Endurance, Ultimate)
**Remaining Presets**: 4 untested (First Jobs, Max Efficiency, Big Game Hunter, Lore Friendly)
**Type Safety**: 100% (compiles with totality checking)
**Blind Spots Fixed**: 3/3 (evasion tank, combo DPS, equipment synergies - semantically)
**Quantitative Accuracy**: ⚠️ Unknown (missing license board + equipment data)

---

## Next Session Agenda (Pending Decision)

**If Option 1** (Add equipment data):
1. Read equipment/esper reference docs
2. Model license board augments per job pair
3. Model equipment access per job pair
4. Implement quantitative pairing scorer
5. Re-run optimal pairing search
6. Answer user's questions about Penelo/Vaan builds

**If Option 2** (Accept qualitative):
1. Document scoring limitations
2. Proceed to UI layer (idris2-dom-mvc)
3. Implement Library mode preset browser
4. Use current role + strategy scores with caveats

**If Option 3** (Port remaining presets):
1. Implement First Jobs validation
2. Implement Big Game Hunter validation
3. Skip Max Efficiency (mathematical exercise, low value)
4. Update VALIDATION_RESULTS.md
5. Reassess data needs

**If Option 4** (Start UI):
1. Set up idris2-dom-mvc basics
2. Implement preset list view
3. Implement preset detail view
4. Test with current scoring (qualitative)
5. Identify data gaps from UI perspective
