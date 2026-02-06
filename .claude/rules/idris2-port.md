# Idris 2 Port (Experimental)

The Idris 2 rewrite lives in `idris2-src/`. Generic Idris 2 coding conventions are in `IDRIS2-instructions.md` at repo root — follow those for code style. This file covers project-specific context.

## Dual Objectives

**Objective 1 — Build the New App (WILL HAPPEN regardless of technology)**
Three-mode FFXII planner: Library (preset browser), Guide (interview + milestone tracking), Coach (interactive Q&A). Full vision in `idris2-src/NEW_APP.md`.

**Objective 2 — Test Idris 2 Feasibility (EXPERIMENT)**
Testbed for a separate higher-stakes project. If Idris 2 proves impractical, that is a **successful outcome**. Fallbacks: PureScript, Elm, or Alpine.js.

**When you hit friction** (slow compilation, painful FFI, cryptic errors), flag it explicitly — don't silently brute-force past it. These may be escape hatch signals.

## Relationship to Current App

- `styles.css` is **shared** — Idris 2 DOM must use the same CSS classes (`ff-panel`, `ff-briefing-panel`, etc.)
- `data/*.js` files are the **canonical source of truth** for game data
- `idris2-src/PROGRESS.md` tracks decisions and next steps
- `idris2-src/NEW_APP.md` is the product vision

## Build Commands

```bash
pack build zodiac-planner          # Build to JS
node idris2-src/build/exec/zodiac-planner.js  # Smoke test
python3 -m http.server 8000        # Browser test (once DOM exists)
```

Package file: `idris2-src/zodiac-planner.ipkg`. Dependencies (once installed): `idris2-dom`, `idris2-dom-mvc`.
If `pack` or `idris2` isn't on PATH, ask — don't assume install location.

## Module Structure

```
idris2-src/src/
├── Main.idr            ← Entry point
├── Types/              ← Domain types (Job, Character, Esper, GamePhase, Party)
├── Data/               ← Hardcoded game data (ported from data/*.js)
├── State/              ← Elm-style Model + Update
├── View/               ← DOM rendering (idris2-dom-mvc)
└── API/                ← Future Claude API integration (Phase 7)
```

## Domain Modeling Goals

Encode FFXII rules as types so the compiler enforces them:

- **Esper Uniqueness** — Each esper assigned to exactly one character (flagship proof). Like a type-level Set — similar to Cats' `NonEmptyList` guaranteeing non-emptiness, but structural.
- **Party Composition** — Exactly 3 of 6 characters, no duplicates. Like a refined type (Scala Refined library) or Haskell newtype with smart constructor.
- **Phase-Valid Presets** — Late-game presets can't be recommended in the prologue. `GamePhase` ordering baked into return types.
- **Job Pairing** — Esper unlocks indexed by `(Esper, Job)` pair. Like a type-level Map with proven key membership (Shapeless record in Scala, dependent Map in Agda).

Start with "Balanced" preset to validate the type model before porting the other 7.

## idris2-dom-mvc Architecture

Elm-style Model/View/Update:
- **Model** — Full app state (like Elm Model / Redux store). Can carry proofs (e.g., "these espers are unique").
- **Msg** — Sum type of events (like Elm Msg / Redux actions)
- **View** — Pure `Model -> Node Msg` (framework diffs real DOM, no virtual DOM)
- **Update** — Pure `Msg -> Model -> Model` (like Elm update / Cats State step)

## FFI & Browser Integration

- Use `idris2-dom` typed bindings for DOM, not raw FFI
- localStorage needs custom FFI bindings (same keys: `ffxii_preset`, `ffxii_expanded`, `ffxii_party`, `ffxii_team`)
- View layer must emit same CSS class names as current app
- Wrap FFI in dedicated modules (e.g., `API/Storage.idr`), don't inline `%foreign`

## Code Style (Project-Specific)

Follow `IDRIS2-instructions.md` plus:
- Mark functions `total` where practical — proving correctness is the point
- Keep proofs small and composable (standalone lemmas, not monolithic)
- Do NOT use `believe_me` to bypass domain proofs — those proofs ARE the experiment
- Use FFXII domain names (`Job`, `Esper`, `Character`, `GamePhase`), not generic ones

## Learning Bridge (Scala/Cats/Haskell → Idris 2)

The user has Scala/Cats and Haskell background. **Explain choices by drawing parallels to familiar FP concepts.** This is a learning exercise.

**Key mappings**:
- `interface` = Haskell `class` = Cats typeclass trait. Key difference: can depend on values (dependent types), not just other types.
- `data` = Haskell ADT = Scala `sealed trait` + `case object/class`. Dependent `data` (indexed families) = GADTs on steroids — no `DataKinds`/singletons needed.
- `record` = Haskell record = Scala `case class`
- `Dec p` = `Either[Proof[P], Proof[Not[P]]]` — a total decision procedure. No direct Haskell equivalent.
- `Void` = empty type for `Not p = p -> Void`. Like Haskell `Data.Void` / Scala `Nothing` but in proof terms.
- `Refl` = equality proof. Like Haskell `Data.Type.Equality.(:~:)` but used constantly.
- `IO` = Haskell `IO`. Same `do`-notation, `>>=`, `>>`.
- `Maybe`/`Either` = Haskell `Maybe`/`Either` = Scala `Option`/`Either`
- **QTT multiplicities**: `0` (erased, compile-time only — proofs vanish from JS), `1` (linear, like Rust ownership), unrestricted. `(0 prf : IsUnique xs) ->` means proof is checked at compile time, zero runtime cost.
- **`auto`**: Compiler finds proof automatically. Like Scala `implicit` or Haskell instance search, but for proof terms. Don't over-rely — large search spaces slow compilation.
- **`DPair`**: `(n ** Vect n a)` = existential "a vector with its length." Like Haskell existentials but first-class. Scala analogy: `trait` with type member.

## Data Migration (JS → Idris 2)

| JS Module | Idris 2 Target | Notes |
|---|---|---|
| `data/jobs.js` | `Types/Job.idr` | 12-constructor ADT, metadata as functions |
| `data/characters.js` | `Types/Character.idr` | 6-constructor ADT, portraits as function |
| `data/espers.js` | `Types/Esper.idr` | 13-constructor ADT + unlock functions |
| `data/presets.js` | `Data/Presets.idr` | Records using domain types (largest port) |
| `data/icons.js` | Keep as JS | SVG paths don't benefit from typing |
| `data/memoirs.js` | Keep as JS | No invariants to encode |

Port order: Job → Character → Esper → GamePhase → Party (with proofs) → "Balanced" preset → validate → rest.

## Escape Hatch Criteria

Flag these — don't work around them:

| Signal | Threshold | Fallback |
|---|---|---|
| Compilation speed | > 5 min for small changes | PureScript |
| FFI pain | Excessive DOM boilerplate | Elm |
| Bundle size | > 500KB unminified | TypeScript + io-ts |
| Error messages | Consistently cryptic | Haskell + GHCJS |
| UI fidelity | Can't reproduce FFXII styling | Revert to Alpine.js |

Hitting the escape hatch is a successful experiment. Product features stay the same; only technology changes.

## What NOT to Do

- Don't use `believe_me` to bypass domain proofs
- Don't generate HTML strings — use `idris2-dom` typed API
- Don't port all 8 presets at once — validate with "Balanced" first
- Don't optimize bundle size prematurely — measure after real features
- Don't silently work around tooling friction — report it
- Don't invent game rules — `data/*.js` and `docs/` are canonical
