# CLAUDE.md

## Project Overview

**Final Fantasy XII: The Zodiac Age** job planner — a single-page static web app helping players plan optimal job combinations for 6-character parties. Based on the "Unnecessary Class Guide v2.2" optimization framework.

Key feature: interactive 3-person party compositions with team A/B toggle, since FFXII only allows 3 active members at a time.

## Architecture

**Current app**: Static web app — no build process, no bundler. CDN-loaded Alpine.js 3.x, Tailwind CSS, and Google Fonts (Inter).
**Idris 2 port**: Compiles to JavaScript via `pack` — see `.claude/rules/idris2-port.md`.

**Core files:**
- `index.html` — Main HTML + Alpine.js markup
- `app.js` — Alpine.js state, guided mode, gambit/gear rendering, helpers
- `esper_modal.js` — Grimoire-style Esper detail and lore modal rendering
- `styles.css` — Custom FFXII tactical dashboard styling

**Data modules** (`data/` directory, load order matters):
1. `icons.js` — SVG paths for all icons
2. `jobs.js` — 12 job class definitions
3. `characters.js` — Character portrait URLs
4. `espers.js` — Esper names, zodiac glyphs, unlock mappings
5. `esper_locations.js` — Esper locations, lore, zodiac signs, elements, cost, artwork paths
6. `presets.js` — 8 build presets (depends on all above)
7. `memoirs.js` — Random memoir quotes

**Assets:** `backgrounds/` (scene images), `portraits/` (character art), `espers/` (B&W esper artwork)

**Idris 2 port** (experimental): `idris2-src/` — see `.claude/rules/idris2-port.md`

## Development Workflow

**Alpine.js app** (current, production) — no build step:
```bash
open index.html                    # Edit and refresh
python3 -m http.server 8000       # Or serve if needed
```
Edit data in `data/*.js`, layout in `index.html`, custom styles in `styles.css`.

**Idris 2 app** (experimental) — requires `pack`:
```bash
pack build zodiac-planner                          # Compile to JS
node idris2-src/build/exec/zodiac-planner.js       # Smoke test
```
Both apps share `styles.css`. See `.claude/rules/idris2-port.md` for full build details.

## Critical Rules

**NO EMOJIS in UI or code.** This app uses SVG icons from the `Icons` object exclusively. If you need a visual element, add an SVG path to `Icons`. This maintains the FFXII tactical aesthetic.

**Time Battlemage has natural Hastega.** Do NOT assign Famfrit "for Hastega" to a TBM character. Famfrit unlocks Battle Lore for TBM, NOT Hastega. Famfrit unlocks Hastega for Machinist only. Getting this wrong leads to bad advice in preset descriptions.

**Esper display names**: Use `ESPER_FULL_NAMES[esperName]` for all UI display. Short names in data, full titles ('Zeromus, the Condemner') shown to users.

**Tactical notes style**: Focus on implications, not obvious mechanics. Write "No backup Hastega source - keep Fran alive" not "Fran is the ONLY Hastega source (natural Time Battlemage spell)."

## Detailed Reference

Topical guidelines auto-load from `.claude/rules/`:
- `rules/data-structures.md` — Preset schema, Alpine.js state, computed properties
- `rules/ui-patterns.md` — Layout, CSS classes, design patterns, image handling
- `rules/ffxii-domain.md` — Game mechanics, equipment, esper/job clarifications
- `rules/idris2-port.md` — Idris 2 rewrite context, domain modeling, escape hatch criteria

Game reference docs in `docs/` (consult when validating builds):
- `docs/espers-reference.md`, `docs/equipment-reference.md`, `docs/build-strategies.md`, etc.
- `docs/FFXII TZA_ The Unneccessary Class Guide v2.2.md` — Complete original guide
