# Idris 2 Missing Manual

Our private reference for gotchas, tricks, and underdocumented features discovered while building the Zodiac Planner.

**When**: February 2026
**Idris Version**: 0.8.0-b714fcaea
**Package Manager**: pack (nightly-260205)

---

## Table of Contents

1. [Automatic Derivation](#automatic-derivation)
2. [Module System](#module-system)
3. [Package Management](#package-management)
4. [Build System](#build-system)
5. [Common Errors](#common-errors)

---

## Automatic Derivation

### The One-Line Solution

**Problem**: Need to implement `Eq`, `Show`, `Ord` for simple ADTs without boilerplate.

**Solution**:
```idris
module MyModule

import Derive.Prelude  -- ← THE KEY IMPORT

%language ElabReflection

public export
data MyType = Constructor1 | Constructor2 | Constructor3

%runElab derive "MyType" [Show, Eq, Ord]  -- All interfaces in ONE call
```

### What Doesn't Work (Common Mistakes)

❌ **Wrong imports**:
```idris
import Derive.Eq      -- NO - these are internal modules
import Derive.Show
import Derive.Ord
```

❌ **Separate calls**:
```idris
%runElab deriveEq "MyType"     -- NO - these functions don't exist
%runElab deriveShow "MyType"
%runElab deriveOrd "MyType"
```

❌ **Wrong function name**:
```idris
%runElab derive "MyType" [Show, Eq, Ord]  -- NO - needs list syntax
```

### What Does Work

✅ **Correct pattern**:
```idris
import Derive.Prelude
%language ElabReflection
%runElab derive "TypeName" [Show, Eq, Ord]
```

### Available Interfaces for Derivation

From `Derive.Prelude`, you can derive:
- `Eq` - Equality checking
- `Ord` - Ordering (requires `Eq`)
- `Show` - String representation
- (More available, see elab-util docs)

### When Derivation Fails

**Complex parameterized constructors** (e.g., `Double`, nested `List`) can cause derivation to fail. In that case, fall back to manual implementation:

```idris
-- This might fail:
data Complex = MkComplex Double (List String)
%runElab derive "Complex" [Show]  -- May error

-- Solution: Manual implementation
public export
Show Complex where
  show (MkComplex d strs) = "MkComplex " ++ show d ++ " " ++ show strs
```

### Documentation References

- **Main docs**: [idris2-elab-util/Derive.md](https://github.com/stefan-hoeck/idris2-elab-util/blob/main/src/Doc/Derive.md)
- **Examples**: [idris2-sop/Deriving.md](https://github.com/stefan-hoeck/idris2-sop/blob/main/docs/src/Docs/Deriving.md)

---

## Module System

### `export` vs `public export`

**Three levels of visibility**:

#### 1. Private (default)
```idris
data Secret = MkSecret String  -- Only visible in this module
```

#### 2. `export` - Type visible, constructors hidden
```idris
export
data Opaque = Constructor1 | Constructor2
```
Other modules can:
- ✅ Use `Opaque` in type signatures
- ❌ Pattern match on constructors
- ❌ Construct values directly

**Use case**: Encapsulation, abstract types

#### 3. `public export` - Fully transparent
```idris
public export
data Transparent = Constructor1 | Constructor2
```
Other modules can:
- ✅ Use `Transparent` in type signatures
- ✅ Pattern match on constructors
- ✅ Construct values directly

**Use case**: Domain types, public API

### When to Use Which

| Visibility Level | Use When | Example |
|-----------------|----------|---------|
| **Private** | Internal implementation details | Helper functions, internal state |
| **`export`** | Want to hide implementation | `data ConnectionPool`, `data DatabaseHandle` |
| **`public export`** | Domain types users need to inspect | `data OptimizationGoal`, `data Job` |

### Mental Model

- **Private**: Not exported at all
- **`export`**: "Here's an opaque box. Pass it around, but can't look inside."
- **`public export`**: "Here's a transparent box. Inspect and modify freely."

---

## Package Management

### pack vs idris2

**Use pack for everything** (not standalone `idris2`):

```bash
# ✅ Correct workflow
pack build                    # Build package
pack typecheck                # Type-check without building executable
pack --cg javascript build    # Build with JavaScript backend

# ❌ Don't use idris2 directly (misses package dependencies)
idris2 --build myproject.ipkg
```

### JavaScript Codegen

**The `--cg` flag is a global option** (before the command):

```bash
# ✅ Correct
pack --cg javascript build

# ❌ Wrong
pack build --cg javascript  # Fails: unknown argument
```

### Adding Dependencies

Edit `.ipkg` file:
```idris
depends = base
        , elab-util    -- Comma on new line (Haskell-style)
        , dom
```

Then rebuild:
```bash
pack build
```

### Installing Packages

```bash
pack install <package-name>        # Install from package collection
pack install <pkg1> <pkg2> ...     # Install multiple at once
```

**Note**: Packages are installed globally per pack installation, not per-project.

---

## Build System

### Project Structure

```
project-root/
├── myproject.ipkg       # Package definition
├── src/
│   ├── Main.idr         # Entry point (if executable)
│   ├── Types/
│   │   └── MyType.idr
│   └── ...
└── build/               # Generated by pack (gitignore this)
    └── exec/
        └── myproject.js
```

### .ipkg File Template

```idris
package myproject
version = 0.1.0
authors = "Your Name"

sourcedir = "src"
modules = Main
        , Types.MyType
        , Types.OtherType

depends = base
        , elab-util

main = Main
executable = "myproject.js"

-- Note: Use pack --cg javascript build for JS output
```

### Module Naming

**File path MUST match module name**:

```
src/Types/Goal.idr     → module Types.Goal
src/Data/Presets.idr   → module Data.Presets
src/Main.idr           → module Main
```

**Type-checking from correct directory**:

```bash
# From project root (with .ipkg):
pack typecheck

# From src/ (single file):
cd src
idris2 --check Types/Goal.idr  # Note: path relative to src/
```

---

## Common Errors

### "Module name does not match file name"

**Error**:
```
Error: Module name Types.Goal does not match file name "src/Types/Goal.idr"
```

**Cause 1**: Running `idris2` from wrong directory

**Fix**: Either:
1. Run `pack typecheck` from project root (recommended)
2. Run `idris2 --check Types/Goal.idr` from `src/` directory

**Cause 2**: Module declaration doesn't match file path

**Example**:
```idris
-- File: src/Types/Goal.idr
module Types.GoalDerived  -- ❌ WRONG - doesn't match file path
```

**Fix**: Make module name match file path:
```idris
-- File: src/Types/Goal.idr
module Types.Goal  -- ✅ CORRECT
```

---

### "Imports must go before directives"

**Error**:
```
Error: Imports must go before any declarations or directives.
```

**Cause**: `%language` directive before `import` statements

**Fix**: Imports ALWAYS come first:
```idris
module MyModule

import Foo        -- ✅ Imports first
import Bar

%language ElabReflection  -- ✅ Then directives
```

---

### "Undefined name Language.Reflection.Elab"

**Error**:
```
Error: Undefined name Language.Reflection.Elab.
```

**Cause**: Missing `Derive.Prelude` import for derivation

**Fix**:
```idris
import Derive.Prelude  -- Add this!
%language ElabReflection
```

---

### "No local .ipkg files found"

**Error**:
```
[ fatal ] No local `.ipkg` files found.
```

**Cause**: Running `pack` commands from wrong directory

**Fix**: Navigate to directory containing `.ipkg` file:
```bash
cd /path/to/project-root  # Directory with myproject.ipkg
pack build
```

---

## Tips & Tricks

### Reference-Only Files

You can keep files in `src/` for documentation without building them by excluding from the `.ipkg` modules list:

```idris
-- In myproject.ipkg
modules = Main
        , Types.Production
        -- Types.Reference NOT listed (won't be built)
```

**Use case**: Keep manual implementations as learning reference while using derived versions in production.

**Example**: `Types/Goal.idr` (manual) vs `Types/GoalDerived.idr` (derived)

### `typecheck` vs `build`

**`pack typecheck`** - Type-checking only (FAST)
- ✅ Verifies types are correct
- ✅ Checks interface implementations
- ❌ Does NOT generate executable
- ⏱️ Fast feedback loop

**`pack build`** - Full compilation (SLOW)
- ✅ Type-checks everything
- ✅ Generates executable output
- ⏱️ Slower (includes code generation)

**Typical workflow**:
```bash
# Iterate quickly
pack typecheck    # Edit → typecheck → edit → typecheck
pack typecheck
pack typecheck

# Ready to run
pack --cg javascript build
node build/exec/zodiac-planner.js
```

Think of it like:
- Rust: `cargo check` vs `cargo build`
- TypeScript: `tsc --noEmit` vs `tsc`
- Scala: `compile` vs `package`

### Measuring Bundle Size

After building to JavaScript:
```bash
ls -lh build/exec/myproject.js    # Human-readable size
wc -l build/exec/myproject.js     # Line count
```

Our Hello World: 7KB, 288 lines (baseline for comparison)

### Running JavaScript Output

```bash
node build/exec/myproject.js
```

### Verbose Build Output

```bash
pack -v build  # Show detailed compilation steps
```

---

## Codegen Backend Selection

### Default Backend (Chez Scheme)

**`pack build` uses Chez Scheme by default**, not JavaScript:

```bash
pack build  # Generates Chez Scheme output (not runnable with node)
node build/exec/myproject.js  # ERROR: SyntaxError
```

**The output file will still be named `.js`** even though it's Scheme code! This is confusing.

### JavaScript Codegen

**Option 1**: Use `idris2` directly with `--codegen node`:

```bash
idris2 --build myproject.ipkg --codegen node
node build/exec/myproject.js  # ✅ Works
```

**Option 2**: Use `pack` with global `--cg` flag (NOT YET WORKING in our setup):

```bash
pack --cg javascript build  # May work in some pack versions
```

**In practice**: We use `idris2 --build ... --codegen node` for JavaScript output.

### Available Backends

- `chez` - Chez Scheme (default, fastest compilation)
- `node` - JavaScript via Node.js
- `javascript` - Browser JavaScript (no Node APIs)
- `racket` - Racket Scheme
- `refc` - Reference-counted C backend

### Workflow

```bash
# Development: Fast iteration with Chez
pack build
chez build/exec/myproject.so  # If using Chez

# Production: JavaScript for web
idris2 --build myproject.ipkg --codegen node
node build/exec/myproject.js
```

---

## Domain Modeling Patterns

### Modeling Conditional Effects (Espers)

**Problem**: Espers have different effects depending on which Job they're paired with. Same esper, different unlocks.

**Example**: Shemhazai unlocks Heavy Armor for Archer (huge tank boost), but different unlocks for other jobs.

**Pattern 1 - Bonus Function** (what we used):

```idris
esperJobBonus : Esper -> Job -> RoleDimension -> Score
esperJobBonus Shemhazai Archer PhysicalTank = 3  -- Critical unlock
esperJobBonus Shemhazai BlackMage MagicDPS = 3   -- Channeling 3
esperJobBonus Shemhazai _ _ = 0                  -- Useless otherwise
```

**Advantages**:
- ✅ Simple scoring model
- ✅ Captures strategic value
- ✅ Easy to test against expert builds
- ✅ Doesn't require detailed unlock data

**When to use**: Early validation, MVP scoring systems

**Pattern 2 - Detailed Unlocks** (future refinement):

```idris
data EsperUnlock
  = HeavyArmor
  | Channeling3
  | Swiftness3
  | Hastega
  | BattleLore
  -- etc.

esperUnlocks : Esper -> Job -> List EsperUnlock
esperUnlocks Shemhazai Archer = [HeavyArmor]
esperUnlocks Shemhazai BlackMage = [Channeling3]
-- ...

unlockValue : EsperUnlock -> RoleDimension -> Score
unlockValue HeavyArmor PhysicalTank = 3
unlockValue Channeling3 MagicDPS = 3
-- ...
```

**Advantages**:
- ✅ Accurate to game mechanics
- ✅ Can generate UI descriptions
- ✅ Self-documenting

**When to use**: Production app, UI generation, comprehensive modeling

**Lesson**: Start simple (Pattern 1), refine later (Pattern 2). Validate against expert builds before adding complexity.

---

## Type Ambiguities

### String.Nil vs Prelude.Nil

**Error**:
```
Ambiguous elaboration. Possible results:
    Data.String.Nil
    Prelude.Nil
```

**Cause**: Both `Data.String` (for String operations) and `Prelude` (for List operations) export a `Nil` constructor. Compiler can't infer which one you mean.

**Context**: Happens when using `[]` in contexts where type could be `List a` or something String-related.

**Fix 1 - Explicit type annotation**:
```idris
bonusLines : List String
bonusLines = case analysis.esperBonusSummary of
  [] => Prelude.Nil  -- Explicitly qualified
  bs => ["  Esper Bonuses:"] ++ map (\s => "    " ++ s) bs
```

**Fix 2 - Add type signature to binding**:
```idris
bonusLines : List String  -- Type annotation clarifies
bonusLines = case analysis.esperBonusSummary of
  [] => []  -- Now compiler knows which Nil
  bs => ...
```

**Lesson**: When you see "Ambiguous elaboration", add a type signature to the binding or explicitly qualify the constructor.

---

## Next: Learnings to Add

As we continue building, add sections for:
- [ ] Dependent types (when we implement proofs)
- [ ] Working with `Vect` (sized vectors)
- [ ] `Fin` for bounded numbers
- [ ] Pattern matching gotchas
- [ ] Totality checking
- [ ] Interface resolution
- [ ] FFI for browser APIs (when we get to DOM)
- [ ] Performance tips
- [ ] Uniqueness constraints (esper assignment proofs)

---

## Meta

**How to use this document**:
- Add new discoveries as we encounter them
- Include both "wrong" and "right" examples
- Link to official docs when available
- Keep it pragmatic (what actually helps us build)

**When to update**:
- Hit a confusing error? Document the fix.
- Find underdocumented feature? Write it down.
- Discover a pattern? Capture it here.

This is OUR missing manual - optimize for future us, not external readers.
