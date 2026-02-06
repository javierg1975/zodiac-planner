# UI Patterns & Styling

## Layout Structure

- **Guided Mode Overlay** (first visit): Full-screen 6-step onboarding with character introductions, background images, step dots, and skip/back/next navigation. Final step is "LaunchPad" with Clan Centurio background and 3 recommended next builds.
- **Header**: Title + "Zodiac Planner" branding
- **Left Column (4/12)**: Phase-grouped preset selector with expandable tactical snapshots (metrics gauges, synergy markers, requirements)
- **Right Column (8/12)**:
  - Mission Briefing Panel (amber-themed, expandable specs)
  - Party formations selector (3 compositions)
  - Team A/B toggle
  - Cinematic character cards (expandable: strategy, esper unlocks, gambits, gear)
  - Clickable esper watermarks → open grimoire-style modal with esper lore/location
- **Esper Modal**: Grimoire-themed overlay (`x-teleport="body"`) with esper artwork, stats, location, description. Also a general lore modal for all 13 espers.
- **Footer**: Random memoir quote + credits

## CSS Class Reference

The UI uses a "Tactical Dashboard" theme. Key classes in `styles.css`:
- `ff-panel`: Obsidian-blue panels with cyan borders and amber accents
- `ff-briefing-panel`: Amber-bordered mission briefing with grid overlay
- `ff-cinematic-bg`: Character art with linear gradient overlays
- `ff-row-tick`: Corner flourishes
- `ff-category-header`: Glowing tactical indicators and phase separators
- `ff-status-node`: Inline status badges (CRITICAL/MANDATORY)
- `ff-bronze-text`: Bronze/gold coloring for leader characters
- `ff-modal-overlay`: Fixed full-screen backdrop with blur (for esper modals)
- `ff-modal-grimoire`: Grimoire modal container (amber/brown theme)
- `ff-grimoire-header`: Modal header with ornamental dividers
- `ff-grimoire-ornament-l` / `ff-grimoire-ornament-r`: Gradient decorative lines
- `ff-gambit-ally` / `ff-gambit-foe`: Color-coded gambit rows (blue/red)
- `animate-fade-in-up`: Entry animation for modals
- `clickable-esper`: Hover glow + scale on esper watermarks

## Alpine.js Patterns

- `x-data`: Root state on main div
- `x-show`: Conditional display (party filtering)
- `x-transition`: Fade animations for character show/hide
- `@click`: Event handlers
- `:class`: Dynamic class binding
- `x-collapse`: Smooth expansion transitions

## Image Handling

Character portraits from Final Fantasy Wiki using Avatar images:
```
https://static.wikia.nocookie.net/finalfantasy/images/[hash]/FFXII_[CharacterName]_Avatar.png
```

`@error` fallback: hides broken image, displays first letter of character name with Inter font. Avatar images are more reliable than full renders.

## Gambit & Gear Rendering

- `getGambitType(gambit)`: Returns `'ally'` (blue), `'foe'` (red), or `'neutral'` (gray) based on target keywords before the arrow
- `renderGearItem(item)`: Parses pipe-delimited `"Name | Reason"` into bold name + gray reasoning text

## Status Annotations

`renderStatusNote()` parses inline annotations in text fields:
- `[STATUS: CRITICAL]` → Orange badge with alert icon
- `[STATUS: MANDATORY]` → Amber badge with warning icon
- Used in `requirements.unlocks` and `requirements.notes`

## Image Assets

- `backgrounds/` — Scene images (Clan Centurio for launchPad, etc.)
- `portraits/` — Character art (including duo portraits like `balthier-fran.webp`)
- `espers/` — B&W esper artwork (`[Esper]-bnw.png`) + promo art (`Espers_PromoArt.webp`)
- Guided mode steps reference background images via `guidedSteps[n].image`
