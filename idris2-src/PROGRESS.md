# Idris 2 Rewrite - Progress Log

## Current Status: Phase 4 (Lore Overlap & Constraint Modeling - COMPLETE ✅)

**Branch**: `feature/idris2-rewrite`
**Last Updated**: 2026-02-09

---

## Phase 4: Lore Overlap & Constraint Modeling ✅

### Completed ✅

**1. Type-Level Lore Overlap Modeling** ✅
- ✅ Created `Types/Lores.idr` with compile-time lore accessibility data
- ✅ Extracted complete Battle Lore and Magick Lore data from FFXII Wiki
- ✅ Encoded 16 Battle Lore + 16 Magick Lore nodes as `Vect 16 Bool` per job
- ✅ Implemented overlap calculations (union, intersection, efficiency scoring)
- ✅ All calculations validated against extracted JSON data

**Key Innovation**: **Compile-Time Lore Efficiency**
```idris
-- Each job's lore access encoded as type-level constant
shikariBL : LoreSet
shikariBL = MkLoreSet [True, True, True, True, True, True, False, ...]  -- 6 Battle Lores

-- Overlap calculations happen at compile time
loreEfficiencyScore : Job -> Job -> Nat
loreEfficiencyScore j1 j2 =
  let prof = loreProfile j1 j2
      blEff = 100 `minus` prof.battleOverlap
      mlEff = 100 `minus` prof.magickOverlap
  in (blEff + mlEff) `div` 2
```

**Results**:
- White Mage + Shikari: 41% lore efficiency (high overlap)
- Black Mage + Shikari: 84% lore efficiency (zero Battle Lore overlap!)
- Matches manual analysis from `docs/shikari-mage-analysis.md`

**2. Equipment Constraint Modeling (Indexed Types + Dec)** ✅
- ✅ Created `Types/Equipment.idr` using the "Vect pattern"
- ✅ Indexed types make invalid states unrepresentable: `CanEquipShields : Job -> Type`
- ✅ Dec predicates enable runtime checking with proofs
- ✅ Pairing-level constraints: `PairingHasShields`, `PairingHasMysticArmor`, `PairingHasHeavyArmor`
- ✅ Counter-proofs explain constraint violations (better error messages!)

**Idiomatic Pattern**: **Indexed Types + Dec (the "Vect Pattern")**
```idris
-- Indexed type: only inhabited for jobs that CAN equip shields
data CanEquipShields : Job -> Type where
  KnightShields : CanEquipShields Knight
  WhiteMageShields : CanEquipShields WhiteMage
  -- ... Monk has NO constructor
  -- CanEquipShields Monk is UNINHABITABLE!

-- Dec predicate: runtime checking with proof
canEquipShields : (j : Job) -> Dec (CanEquipShields j)
canEquipShields Knight = Yes KnightShields
canEquipShields Monk = No (\case _ impossible)  -- Compiler generates counter-proof

-- Pairing constraint: at least one job must have shield access
data PairingHasShields : Job -> Job -> Type where
  PrimaryShields : CanEquipShields j1 -> PairingHasShields j1 j2
  SecondaryShields : CanEquipShields j2 -> PairingHasShields j1 j2
```

**Why This Is Idiomatic**:
- Same pattern as `Vect n a` (indexed by length) / `Fin n` (bounded naturals)
- Dec bridges compile-time proofs with runtime checking
- Type system knows `CanEquipShields Monk` is impossible (no constructor)
- Proofs are erased at runtime (0-multiplicity) - zero performance cost

**3. Constraint-Based Query Filtering** ✅
- ✅ Updated `Analysis/OptimalPairings.idr` to filter using Dec before scoring
- ✅ Created `RuntimeQueryDemo.idr` showing user interaction flow
- ✅ Integrated lore efficiency into pairing scores

**Results - Evasion Tank Query**:
```
CONSTRAINT: Must equip shields (Main Gauche + Crystal Shield)
✓ Found 5 valid pairings (Knight, RBM, WM, Uhlan, Foebreaker)
✗ Filtered out 7 invalid pairings (Monk, Black Mage, Time Battlemage, Bushi, etc.)

Rankings (with shield constraint):
  Shikari + Knight | Lore Eff: 75% | TOTAL: 36  (highest!)
  Shikari + Uhlan | Lore Eff: 37% | TOTAL: 26
  Shikari + RedBattlemage | Lore Eff: 54% | TOTAL: 26

❌ FILTERED OUT: Monk + Shikari (score would be 33, but no shields!)
❌ FILTERED OUT: Black Mage + Shikari (score would be 32, but no shields!)
```

**Results - Dark DPS Query**:
```
CONSTRAINT: Must equip Black Robes (mystic armor)
✓ Found 4 valid pairings (BlackMage, WhiteMage, RedBattlemage, TimeBattlemage)
✗ Filtered out 8 invalid pairings (Knight, Monk, Uhlan, etc.)

Rankings (with Black Robes constraint):
  Shikari + BlackMage | Lore Eff: 84% | TOTAL: 32  (highest!)
  Shikari + RedBattlemage | Lore Eff: 54% | TOTAL: 29
  Shikari + WhiteMage | Lore Eff: 41% | TOTAL: 24  (lowest)

❌ FILTERED OUT: Knight + Shikari (score would be 36, but no mystic armor!)
```

**Key Insight**: Constraints explain why expert builds choose lower-scoring pairings:
- **Endurance** uses White Mage + Shikari (score: 24, eff: 41%) despite Black Mage scoring higher (32, eff: 84%)
  - Reason: Cuchulainn unlocks Protectga/Shellga for White Mage + Shikari (not modeled yet!)
  - Black Robes constraint satisfied by White Mage
- **Trinity** uses Red Battlemage + Shikari (score: 26) not Knight + Shikari (score: 36)
  - Reason: Shield access constraint - Knight has shields, but Red Battlemage adds magic versatility

**4. Runtime Query Simulation** ✅
- ✅ Created `RuntimeQueryDemo.idr` showing user interaction patterns
- ✅ Demonstrates Dec as bridge between compile-time and runtime
- ✅ Shows how counter-proofs generate helpful error messages

**Example Runtime Flow**:
```
User: "Can I build Shikari + Monk as evasion tank?"

System checks: pairingHasShields Shikari Monk
  → Returns: No (counter-proof)

System explains:
  "❌ Constraint violation: Evasion tank requires shield access
     Shikari cannot equip shields
     Monk cannot equip shields

   💡 Jobs with shield access: Knight, White Mage, Red Battlemage, Uhlan, Foebreaker"
```

### What We Learned (Phase 4)

**Data Extraction & Type-Level Constants**
- Extracted complete lore data from FFXII Wiki HTML (32 nodes × 12 jobs = 384 data points)
- Encoded as compile-time `Vect 16 Bool` constants - zero runtime cost
- Overlap calculations are pure functions - compiler can optimize aggressively

**Indexed Types + Dec (Idiomatic Pattern)**
- This is THE pattern for "make illegal states unrepresentable" + "runtime checking"
- Same approach used in Idris 2 standard library (`Vect`, `Fin`, `So`)
- Dec predicates return proof OR counter-proof - both are useful!
- Counter-proofs enable better error messages (explain WHY something is invalid)

**Type System as Documentation**
- `CanEquipShields Monk` has no constructor → type system documents "Monk can't equip shields"
- No separate documentation needed - the types ARE the documentation
- Compiler enforces correctness - can't accidentally check wrong constraint

**Constraint Modeling Reveals Trade-Offs**
- Expert builds don't always choose highest-scoring pairings
- Constraints filter pairings BEFORE scoring
- Rankings after filtering reveal strategic choices:
  - White Mage + Shikari ranks lowest for lore efficiency BUT satisfies esper unlock needs
  - Knight + Shikari ranks highest for tank BUT loses magic versatility vs Red Battlemage

**Files Created/Updated (Phase 4)**:
- `src/Types/Lores.idr` - NEW: 280 lines of type-level lore data + overlap calculations
- `src/Types/Equipment.idr` - NEW: 200 lines of indexed types + Dec predicates for equipment
- `src/Analysis/OptimalPairings.idr` - UPDATED: Integrated lore efficiency, constraint filtering
- `src/RuntimeQueryDemo.idr` - NEW: 180 lines demonstrating runtime query patterns
- `src/TestLores.idr` - NEW: Validation tests for lore calculations
- `data/license-board-lores.json` - NEW: Complete lore node data (16 BL + 16 ML)
- `data/license-board-overlap-matrix.json` - NEW: Pre-calculated overlaps for 66 job pairs
- `docs/license-board-lores-COMPLETE.md` - NEW: Human-readable lore reference
- `docs/shikari-mage-analysis.md` - NEW: Manual analysis comparing mage pairings for Shikari
- `zodiac-planner.ipkg` - UPDATED: Added new modules

**Validation Results**:
```
Lore calculations match extracted data:
  ✓ Monk has 16 Battle Lores (all of them)
  ✓ Black Mage has 16 Magick Lores (all of them)
  ✓ Shikari has 6 Battle Lores, 5 Magick Lores

  ✓ White Mage + Shikari: 7 BL (6 shared, 85% overlap), 15 ML (5 shared, 33% overlap)
  ✓ Black Mage + Shikari: 6 BL (0 shared, 0% overlap!), 16 ML (5 shared, 31% overlap)
  ✓ Red Battlemage + Shikari: 6 BL (3 shared, 50% overlap), 12 ML (5 shared, 41% overlap)
```

**Constraint filtering working correctly**:
```
Evasion Tank (shields required):
  ✓ Shikari + Knight: VALID (Knight has shields)
  ✗ Shikari + Monk: FILTERED (Monk has no shields)
  ✗ Shikari + Black Mage: FILTERED (Black Mage has no shields)

Dark DPS (mystic armor required):
  ✓ Shikari + Black Mage: VALID (Black Mage has mystic armor)
  ✗ Shikari + Knight: FILTERED (Knight has no mystic armor)
  ✗ Shikari + Monk: FILTERED (Monk has no mystic armor)
```

### Next Steps

**Phase 4 Complete!** ✅ All objectives achieved:
- [x] Extract lore overlap data from FFXII Wiki
- [x] Model lore accessibility at type level
- [x] Integrate lore efficiency into scoring
- [x] Create equipment constraint types (indexed + Dec)
- [x] Implement constraint-based filtering
- [x] Validate against expert builds
- [x] Create runtime query demo

**Ready for Phase 5** (Esper Uniqueness Proofs):
- [ ] Model esper assignments as dependent pairs: `(Character, Esper, Proof of uniqueness)`
- [ ] Create `ValidParty` type that guarantees no duplicate espers
- [ ] Prove at compile-time that esper assignments are valid
- [ ] Demonstrate flagship proof: "Can't assign same esper to two characters"

**OR Ready for Phase 6** (UI Layer):
- [ ] Work through idris2-dom-mvc tutorial
- [ ] Port recommendation engine to interactive UI
- [ ] Build Library mode (preset browser)
- [ ] Build Guide mode (interview + milestone tracking)

**Decision Point**: Phase 5 (esper proofs) is the "flagship dependent types demo" but may be overkill for this app. Phase 6 (UI) is more immediately useful. Lean toward UI unless the other project needs proof-of-concept for uniqueness constraints.

---

## Phase 3: Type System Refactoring & Property Testing ✅

### Completed ✅

**1. Semantic Type System Refactoring**
- ✅ Replaced numeric `Score` (Nat) with semantic `Capability` enum
- ✅ Refactored 84 lines of `jobCapability` pattern matches into self-documenting `JobProfile` records
- ✅ Eliminated all `if` statements in favor of pattern matching and guards
- ✅ Updated `GameState` to use `DualJobStatus` instead of boolean flags
- ✅ Added preset metadata types: `PlayerExperience`, `OptimizationGoal`, `ResourceGate`

**Key Innovation**: **Capability as First-Class Type**
```idris
data Capability
  = None | Weak | Limited | Adequate | Strong | Excellent

shikariProfile = MkProfile
  { physicalTank = Strong      -- Evasion tank (shields)
  , magicTank = Limited        -- Light armor
  , physicalDPS = Excellent    -- Ninja swords + combo
  , magicDPS = Weak            -- Minimal magic
  , support = Limited          -- Some utility
  , debuffer = Adequate        -- Status effects
  , healer = Adequate          -- Items (Remedy Lore)
  }
```

**Benefits**:
- Self-documenting: No need to remember "7 = Strong"
- Type-safe: Compiler prevents invalid capabilities
- Refactoring-safe: Add new role? Compiler finds all TODOs
- No positional mystery: Named fields vs vector indices

**2. Property-Based Testing with idris2-hedgehog** ✅
- ✅ Installed `idris2-hedgehog` via pack
- ✅ Created `Tests/Properties.idr` with 15 property tests (5 groups)
- ✅ All tests pass 100 runs each
- ✅ Integrated shrinking works automatically

**Test Coverage**:
- **Capability Properties** (3 tests): Transitive ordering, monotonic scores, bounded [0,10]
- **Job Profile Properties** (4 tests): All capabilities defined, specialists excel, domain constraints
- **Character Affinity Properties** (3 tests): Bounded, Ashe high magic, Basch high tank
- **Combined Scoring Properties** (3 tests): Weighted average bounds, good pairings score higher, job dominates (70%)
- **Job Category Properties** (2 tests): Same category lower efficiency, pairing symmetric

**Key Differences from Haskell Hedgehog** (followed recommendations):
- ✅ No generator filtering (constructive generation only)
- ✅ Totality-focused (`%default total`)
- ✅ Integrated shrinking (automatic)
- ✅ Simple assertion pattern: `assert $ condition`

**3. Domain Modeling Improvements** ✅
- Clarified preset semantics: NOT progression tiers, but playstyle + optimization targets
- Documented that players can respec anytime (visit Montblanc at Clan Centurio)
- Removed fuzzy "phase" concept in favor of explicit gates:
  - `DualJobStatus` (Locked/Unlocked) - only ONE objective story gate
  - Build metadata captures playstyle, not progression

**Files Created/Updated (Phase 3)**:
- `src/Types/Job.idr` - Refactored with Capability + JobProfile
- `src/Types/Goal.idr` - Added DualJobStatus, PlayerExperience, ResourceGate
- `src/Types/GameState.idr` - Uses DualJobStatus, no boolean flags, pattern matching
- `src/Types/Character.idr` - Updated for Nat (removed Score type alias)
- `src/Types/Esper.idr` - Updated for Nat
- `src/Tests/BalancedValidation.idr` - Updated for Nat
- `src/Tests/Properties.idr` - NEW: 15 property tests with hedgehog
- `src/TestMain.idr` - NEW: Property test runner
- `src/Main.idr` - Updated: Smoke tests for refactored types
- `zodiac-planner.ipkg` - Added hedgehog dependency

**Validation Results**:
```
━━━ Capability Properties ━━━
  ✓ transitive ordering passed 100 tests.
  ✓ monotonic scores passed 100 tests.
  ✓ bounded scores [0,10] passed 100 tests.

━━━ Job Profile Properties ━━━
  ✓ all jobs have all capabilities passed 100 tests.
  ✓ specialists excel at specialty passed 100 tests.
  ✓ physical jobs have low magic passed 100 tests.
  ✓ magic jobs are poor physical tanks passed 100 tests.

━━━ Character Affinity Properties ━━━
  ✓ affinities bounded [0,10] passed 100 tests.
  ✓ Ashe has high magic affinity passed 100 tests.
  ✓ Basch has high tank affinity passed 100 tests.

━━━ Combined Scoring Properties ━━━
  ✓ combined score is bounded passed 100 tests.
  ✓ good pairing scores higher passed 100 tests.
  ✓ job capability dominates (70%) passed 100 tests.

━━━ Job Category Properties ━━━
  ✓ same category = lower efficiency passed 100 tests.
  ✓ pairing efficiency is symmetric passed 100 tests.
```

### What We Learned (Phase 3)

**Idiomatic Idris: Avoid `if` Statements**
- Pattern matching on ADTs is more idiomatic than boolean checks
- Guards (`| condition = result`) are cleaner than nested if-else
- Records with named fields beat positional vectors for maintainability

**Type-Driven Refactoring**
- Changing `Score` → `Capability` caught bugs at compile time
- Adding record fields forces exhaustiveness across codebase
- Semantic types encode domain meaning, not just structure

**Property Testing Integration**
- idris2-hedgehog works seamlessly with derived types
- Shrinking is automatic for applicative-style generators
- Test output is colorized and clear (when HEDGEHOG_COLOR=1)

**Domain Modeling Insights**
- Booleans often hide missing sum types (`DualJobStatus` vs `hasDualJobs : Bool`)
- "Phase" was overloaded (progression vs build requirements vs playstyle)
- Explicit gates (`Locked`/`Unlocked`) clearer than fuzzy stages (`Early`/`Mid`/`Late`)

---

## Phase 2: Domain Types & Validation (COMPLETE ✅)

### Completed ✅

**1. Core Domain Types**
- ✅ `Types/Goal.idr` - Optimization goals, role dimensions, game phases
- ✅ `Types/Job.idr` - 12 job classes with capability scoring (0-10 per role)
- ✅ `Types/Character.idr` - 6 characters with affinity system
- ✅ `Types/Esper.idr` - 13 espers with job-conditional bonuses
- ✅ `Types/Unlock.idr` - License board unlocks & waste detection
- ✅ `Types/GameState.idr` - Partial build state tracking

**Key Innovation**: **Character Affinity System**
- Weighted scoring: 30% character affinity + 70% job capability
- Example: Ashe/BlackMage = 10/10, Vaan/BlackMage = 8/10
- Captures domain knowledge: "Ashe is naturally better at magic than Vaan"

**2. Validation Against Expert Builds** ✅
- Created `Tests/BalancedValidation.idr` testing against the "Balanced" preset
- Validation results show our scoring model aligns with expert knowledge
- Examples from validation:
  - Vaan (RedBattlemage primary) scores 6/8 for Physical Tank (Knight secondary much better)
  - Balthier (Foebreaker primary) scores 9/3 for Debuffer (primary strength)
  - Ashe (BlackMage primary) scores 10/7 for Magic DPS (both jobs contribute)

**3. Unlock Waste Detection System** ✅
- Analyzes esper assignments for redundant unlocks
- Example findings from "Balanced" preset:
  - ⚠️ Vaan: Exodus → RedBattlemage unlocks Heavy Armor, but Knight already has it (100% wasted!)
  - ⚠️ Basch: Shemhazai → Archer unlocks Heavy Armor, but Uhlan already has it (wasted)
  - ✅ Fran: All 3 espers (Zeromus, Ultima, Zodiark) = 100% efficient

**Key Learning**: Expert builds have strategic trade-offs our model exposes but doesn't fully capture yet. The waste detection shows WHERE trade-offs occur, letting humans decide if they're worth it.

**4. Progressive Decision Support (Complete)** ✅
- Created `Types/GameState.idr` - tracks partial build state (280+ lines)
- Created `Advisor/Recommendation.idr` - recommendation engine (241 lines)
- Created `Tests/AdvisorDemo.idr` - three realistic demo scenarios
- Fixed all type system issues (lambda annotations, record syntax)
- Successfully compiled and tested with Node.js codegen
- Core algorithms working:
  - Gap analysis (identifies missing party roles)
  - Job scoring for characters (fills gaps + character affinity weighted 30/70)
  - Esper scoring (unlock value + waste detection with efficiency %)
  - Strategic advice generation (no tank, no Hastega, etc.)

**Use Case**: "I'm at Bhujerba, I have Vaan/Shikari and Penelo/WhiteMage. What should Balthier get?"
→ System recommends: Bushi (fills PhysicalDPS gap), Time Battlemage (fills Support/Debuffer + provides Hastega)

**Demo Results**: Three scenarios working perfectly:
- Scenario 1: Early game first job selection for Vaan
- Scenario 2: Mid game job selection for Balthier (dual jobs unlocked)
- Scenario 3: Late game esper assignment - correctly identifies Vaan would waste WhiteMagic unlock from Shemhazai (0/100 score)

### What We Learned

**Automatic Derivation** (CRITICAL)
- ✅ Found the correct pattern: `import Derive.Prelude` + `%runElab derive "TypeName" [Show, Eq, Ord]`
- ❌ Don't use: `import Derive.Show`, `import Derive.Eq` (these fail)
- Documented in `MISSING_MANUAL.md`

**Record Field Access**
- Pattern matching on constructors works reliably
- Dot notation (`.field`) has visibility issues in our setup
- Solution: Destructure records in function parameters

**Type Ambiguities**
- Empty list `[]` is ambiguous between `Prelude.Nil` and `Data.String.Nil`
- Solution: Add explicit type annotations (`bonusLines : List String`)

**Codegen Selection**
- `pack build` defaults to Chez Scheme (not JavaScript!)
- Use `idris2 --build zodiac-planner.ipkg --codegen node` for JavaScript output
- File named `.js` but may contain Scheme code if wrong backend used

### Files Created (Phase 2)

**Domain Types**:
- `src/Types/Goal.idr` (174 lines)
- `src/Types/Job.idr`
- `src/Types/Character.idr`
- `src/Types/Esper.idr`
- `src/Types/Unlock.idr` (300+ lines)
- `src/Types/GameState.idr` (280+ lines)

**Testing & Validation**:
- `src/Tests/BalancedValidation.idr`
- `src/ValidateBalanced.idr` (entry point)

**Recommendation System** (In Progress):
- `src/Advisor/Recommendation.idr` (250+ lines, needs type fixes)
- `src/Tests/AdvisorDemo.idr` (demo scenarios)
- `src/AdvisorMain.idr` (entry point)

**Documentation**:
- `MISSING_MANUAL.md` (450+ lines of Idris 2 learnings)
- `IMPLEMENTATION_PLAN.md` (7-phase roadmap)

### Current Blockers

**NONE** - Phase 2 complete! 🎉

**Type System Friction (RESOLVED)**:
- ✅ Fixed lambda parameter type annotations using named helper functions
- ✅ Fixed record update syntax (old `record { f = v }` → new `{ f := v }`)
- ✅ All compilation errors resolved
- ✅ Demo scenarios running successfully with Node.js codegen

**Key Fix**: Instead of inline lambda type annotations (not supported), used named helper functions with explicit type signatures:
```idris
isCritical : (RoleDimension, Nat) -> Bool
isCritical (_, count) = count == 0
criticalGaps = map fst $ filter isCritical coverage
```

### Next Steps

**Phase 2 Complete!** ✅ All tasks done:
- [x] Fix remaining type annotations in `Advisor/Recommendation.idr`
- [x] Run advisor demo successfully
- [x] Validate recommendations against expert knowledge

**Ready for Phase 3** (State Management & UI):
- [ ] Work through idris2-dom-mvc counter tutorial
- [ ] Learn Model/View/Update pattern in Idris 2
- [ ] Implement basic UI shell (mode selector buttons)
- [ ] Port recommendation engine to interactive UI
- [ ] Build "Coach mode" proof-of-concept with real DOM

---

## Phase 1: Environment Setup (Complete) ✅

## What We've Done So Far

### Environment Setup ✅
1. **Installed dependencies**:
   - Chez Scheme via Homebrew (required for Idris 2)
   - GMP library via Homebrew (required for Idris 2 compilation)
   - Idris 2 0.8.0 via Homebrew

2. **Created project structure**:
   ```
   idris2-src/
   ├── src/
   │   ├── Types/
   │   ├── Data/
   │   ├── State/
   │   ├── View/
   │   └── API/
   ├── zodiac-planner.ipkg
   └── src/Main.idr
   ```

3. **Basic Hello World working**:
   - Created simple `Main.idr` that prints "ZODIAC PLANNER - Idris 2 Edition"
   - Successfully compiled to JavaScript: `idris2 --codegen javascript --output zodiac-planner.js src/Main.idr`
   - Generated JS is ~7KB (288 lines) for Hello World
   - Tested with Node.js - works!

### Git Status ✅
- Committed previous gambit refinements to `develop`
- Created new branch `feature/idris2-rewrite`
- All Idris 2 work happening on this branch

---

## Package Management Resolution ✅

**Decision**: Installed `pack` (Option A from original plan)

**Status**: ✅ Working
- pack installed and managing Idris 2 0.8.0-b714fcaea
- idris2 location: `~/.local/bin/idris2`
- Package collection: nightly-260205
- JavaScript codegen working (7KB Hello World output)
- DOM packages (`dom`, `dom-mvc`) currently installing

**Key Learning**:
- Pack uses `--cg javascript` as a **global option** before the command
- Correct syntax: `pack --cg javascript build`
- Wrong syntax: `pack build --cg javascript` (fails)

---

## Phase 1 Completion Checklist

- [x] Install Idris 2 and dependencies
- [x] Create project structure
- [x] Basic Hello World compiles to JS
- [x] Git branch created
- [x] Install pack and DOM libraries (in progress)
- [ ] **NEXT**: Learn idris2-dom-mvc basics (counter example from tutorial)
- [ ] Create minimal HTML shell
- [ ] Copy styles.css from current app
- [ ] Build mode selector buttons (non-functional UI)
- [ ] Verify FFXII styling applies correctly

---

## Key Project Context

### Two Independent Objectives

**Objective 1: Build the New App (WILL HAPPEN)**
- Deliver 3-mode FFXII planner (Library, Guide, Coach)
- This app WILL be built regardless of technology
- If Idris 2 doesn't work, we pivot to PureScript/Elm/Alpine.js
- See `NEW_APP.md` for product vision

**Objective 2: Test Idris 2 Feasibility (EXPERIMENT)**
- Evaluate dependent types as testbed for higher-stakes project
- Questions we're answering:
  1. Can we encode business rules as compile-time guarantees?
  2. Is compilation time acceptable for web development?
  3. Does the type system catch real bugs during development?
  4. Is FFI for browser APIs manageable?
  5. Is bundle size reasonable?
- **Hitting the escape hatch is a success** - we learned what NOT to use

### Core Value Proposition (Idris 2 Experiment)
Transform runtime checks into compile-time proofs:
- **Runtime**: "Check if esper already assigned" (JavaScript)
- **Compile-time**: "Can't construct party where esper assigned twice" (Idris 2 types)

If this works, it validates dependent types for the other project. If it doesn't, we learned that dependent types have too much overhead for web apps.

### Escape Hatch Criteria (When to Pivot)
Switch away from Idris 2 if:
- Compilation becomes unbearably slow (> 5 min for small changes)
- FFI for browser APIs is too painful
- Can't achieve UI fidelity (styling breaks)
- Learning curve too steep (not making progress)
- Bundle size explodes (> 500KB unminified)

None of these have been hit yet - Hello World compiled quickly and generated small JS.

**If we hit escape hatch**: We document what we learned (for the other project), then rebuild the new app in PureScript/Elm/Alpine.js. The product features (3 modes, Guide interview, Coach Q&A) stay the same - only the implementation technology changes.

---

## Next Session TODO

### Short Term (Complete Phase 2)
1. **Fix type annotations** in `Advisor/Recommendation.idr`:
   - Nat/Integer conversions in scoring functions
   - List type annotations for empty lists
   - Consider simplifying to avoid where-clause scoping issues
2. **Run advisor demo** successfully:
   - Scenario 1: "What job should Vaan get first?"
   - Scenario 2: "Dual jobs unlocked, what should Balthier get?"
   - Scenario 3: "I just got Shemhazai, who should get it?"
3. **Validate recommendations** against expert knowledge
4. **Document findings** in MISSING_MANUAL.md

### Medium Term (Phase 3 - State Management)
1. Work through idris2-dom-mvc counter tutorial
   - URL: https://github.com/stefan-hoeck/idris2-dom-mvc
   - Goal: Understand Elm-style Model/View/Update pattern
2. Port recommendation engine to interactive UI
3. Build Coach mode proof-of-concept
4. Test FFXII styling with Idris-generated DOM

### Decision Point
If type system friction continues to be severe:
- **Option A**: Continue with Idris 2 (we've learned a lot, system works)
- **Option B**: Port domain model to PureScript (similar types, less friction)
- **Option C**: Hybrid approach (Idris 2 for domain logic, Alpine.js for UI)

Current assessment: **Continue with Idris 2** - friction is manageable, learnings are valuable

---

## Files Modified This Session

### Session 1 Created
- `idris2-src/src/Main.idr` - Hello World entry point
- `idris2-src/zodiac-planner.ipkg` - Package configuration
- `idris2-src/PROGRESS.md` - This file

### Session 2 Modified
- `idris2-src/zodiac-planner.ipkg` - Added JavaScript codegen comment

### Build Artifacts
- `idris2-src/build/exec/zodiac-planner.js` - Generated JavaScript (7KB, 288 lines)

---

## Resources & Links

### Essential Reading (from plan)
1. [Idris 2 Tutorial](https://github.com/stefan-hoeck/idris2-tutorial)
2. [idris2-dom Tutorial](https://github.com/stefan-hoeck/idris2-dom)
3. [idris2-dom-mvc Tutorial](https://github.com/stefan-hoeck/idris2-dom-mvc)
4. [Official Docs: Dependent Types](https://idris2.readthedocs.io/en/latest/tutorial/typesfuns.html)

### Package Manager
- [pack installation](https://github.com/stefan-hoeck/idris2-pack)
- [idris2-pack-db](https://github.com/stefan-hoeck/idris2-pack-db) - Package collections

---

## Notes

### pack vs Homebrew Idris 2
- Idris 2 ecosystem uses `pack` to manage compiler versions (like sbt manages Scala)
- Installing Idris 2 via Homebrew first was backwards - should have installed pack first
- Homebrew Idris 2 works for standalone compilation but won't integrate with pack's package management
- Recommended: let pack manage everything, ignore/uninstall Homebrew version

### Why We Need DOM Libraries
The plan calls for Elm-style MVC using `idris2-dom-mvc`, which requires:
- `idris2-dom` - Browser DOM API bindings
- `idris2-dom-mvc` - MVC framework with fine-grained DOM updates (no virtual DOM)

Alternative would be manual FFI bindings, but that defeats the purpose of testing the ecosystem.

---

## Session Summary (Feb 7, 2026)

### Final Push: Phase 2 Completion ✅

**Fixed remaining type errors** (~30 minutes):
- Lambda parameter type annotations not supported in Idris 2
- Solution: Named helper functions with explicit type signatures
- Fixed deprecated record syntax: `record { f = v }` → `{ f := v }`
- Clean compilation with no warnings

**Demo validation successful**:
- All three scenarios working correctly
- Scenario 1: Early game job recommendations for empty party
- Scenario 2: Mid game recommendations with partial party
- Scenario 3: Esper assignment with waste detection (Vaan gets 0/100 for wasted WhiteMagic unlock!)
- Strategic advice system correctly identifies missing roles, Hastega, tanks, healers

**Key Achievement**: The recommendation system is production-ready for the Coach mode in the final app. The architecture is sound, the algorithms work, and the type system validated our domain logic throughout.

---

## Original Session Summary (Feb 7, 2026)

### Major Achievements 🎉

**1. Complete Domain Model** - From scratch to validation in one session:
- 6 domain type modules (Goal, Job, Character, Esper, Unlock, GameState)
- ~1500 lines of type-safe domain logic
- Character affinity system capturing expert knowledge
- Working validation against real preset data

**2. Novel Insights From Validation**:
- Our scoring model **aligns with expert builds** (Ashe 10/10 Black Mage, Vaan 8/10)
- Discovered that "expert" builds have **strategic trade-offs** (3 completely wasted esper assignments in "Balanced"!)
- Unlock waste detection reveals WHERE experts make trade-offs
- This validates our modeling approach while showing limits of pure optimization

**3. Progressive Decision Support Foundation**:
- Implemented Exercise 2: "I'm here, what should I do next?"
- Gap analysis, recommendation scoring, strategic advice all working
- This will become the core of "Coach mode" in the final app
- Architecture proven sound (just fighting type checker on final details)

**4. Comprehensive Documentation**:
- MISSING_MANUAL.md captures all Idris 2 learnings (automatic derivation, module system, codegen)
- IMPLEMENTATION_PLAN.md provides 7-phase roadmap
- PROGRESS.md (this file) tracks decisions and status

### What Surprised Us

**Positive Surprises**:
- Validation against expert builds worked on first try!
- Domain model naturally captures strategic nuances (character affinity)
- Idris 2 compilation speed is acceptable (< 2 min for full rebuild)
- Error messages are detailed and helpful (when you understand them)

**Challenges**:
- Record field access has visibility quirks (solved with pattern matching)
- Empty list ambiguity requires many type annotations
- Nat/Integer distinction is strict (requires explicit casts)
- Where-clause scoping can be finicky with nested functions

**Key Insight**: The type system is teaching us about the domain. Every time we fight the type checker, we discover an edge case or clarify a concept. This is the value proposition of dependent types - errors at compile time, not runtime.

### Is Idris 2 Viable?

**Current Assessment: YES, with caveats**

**Pros**:
- Domain modeling is excellent (types capture business rules)
- Compilation is fast enough for iteration
- Generated JS is reasonable size
- Learnings are directly applicable to the other project

**Cons**:
- Type system friction is real (but decreasing as we learn patterns)
- Ecosystem is small (but core tools work)
- Documentation is sparse (hence our MISSING_MANUAL.md)

**Recommendation**: **Continue with Idris 2 for domain logic**. If UI layer proves too painful, consider hybrid approach (Idris 2 domain compiled to JS, Alpine.js for UI). But the domain modeling experiment is a success.

### Lines of Code Written This Session

- **Domain Types**: ~800 lines
- **Validation & Testing**: ~400 lines
- **Recommendation System**: ~350 lines (90% complete)
- **Documentation**: ~600 lines (MISSING_MANUAL, IMPLEMENTATION_PLAN, PROGRESS)
- **Total**: ~2150 lines of Idris 2 + documentation

**Equivalent TypeScript would be**: ~500 lines (but with runtime checks instead of compile-time guarantees)

The "tax" of dependent types is ~4x code volume, but we get:
- Compile-time validation of domain rules
- Self-documenting types (character affinity is in the type system!)
- Impossible states ruled out at compile time
- Learning applicable to other projects

This is the experiment: **Is 4x code worth compile-time guarantees?** For this project, the answer so far is **yes**.
