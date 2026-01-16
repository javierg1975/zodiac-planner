# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Final Fantasy XII: The Zodiac Age** job planner web application. It's a single-page, standalone HTML file that helps players plan optimal job combinations for their party characters. The app is based on the "Unnecessary Class Guide v2.2" optimization framework.

**Key Feature**: Interactive 3-person party compositions - since FFXII only allows 3 active party members at a time, each preset now includes recommended team compositions that dynamically show/hide characters based on the selected party.

## Architecture

### Application Structure

This is a **static web application** with no build process or external dependencies beyond CDN-loaded libraries. The application uses a modular file structure:

**Core Files:**
- **`index.html`** (~52K): Main HTML structure and Alpine.js markup
- **`styles.css`** (~11K): Custom FFXII premium tactical styling

**Data Modules (`data/` directory):**
- **`icons.js`** (4.5K): SVG path definitions for all UI icons and job symbols
- **`jobs.js`** (1.1K): Job class definitions with colors and types
- **`characters.js`** (671B): Character portrait URLs from Final Fantasy Wiki
- **`espers.js`** (4.4K): Zodiac glyphs, esper unlocks, and zodiac mappings
- **`presets.js`** (28K): All 6 pre-configured party builds with requirements, gambits, and gear

**External Dependencies (CDN)**:
- Alpine.js 3.x (reactive UI framework)
- Tailwind CSS (utility-first styling)
- Google Fonts (Inter font family)

**Module Loading Order** (important - dependencies must load first):
1. `icons.js` - Used by jobs and presets
2. `jobs.js` - Used by presets
3. `characters.js` - Character data
4. `espers.js` - Esper data and zodiac symbols
5. `presets.js` - Build configurations (depends on all above)

### Key Data Structures

All game data is hardcoded in JavaScript objects:

- **`Icons`**: SVG path data for job icons and UI elements
- **`ZodiacGlyphs`**: SVG representations of zodiac symbols for each Esper
- **`JOBS`**: 12 job classes with type (Mystic/Heavy/Light), color scheme, and associated icon
- **`CHAR_IMAGES`**: Character portrait URLs from Final Fantasy Wiki
- **`ESPER_UNLOCKS`**: Mapping of Espers → Jobs → License Board unlocks
- **`ESPER_ZODIAC`**: Mapping of Espers to zodiac symbols
- **`PRESETS`**: 6 pre-configured party builds:
  - "Max Efficiency" (98% - zero wasted licenses)
  - "DPS Nuclear" (85% - superboss focused)
  - "Beginner Friendly" (92% - guide recommended)
  - "Leader Trinity" (94% - leader mechanic optimized)
  - "Yiazmat Specialist" (82% - 50M HP superboss)
  - "Lore Friendly" (91% - canonical character roles)

Each preset contains:
- `desc`: Description of the build philosophy
- `eff`: Efficiency percentage
- `why`: Detailed explanation of the build strategy
- `parties`: Array of 3 recommended 3-person party compositions:
  - `name`: Party composition name (e.g., "Evasion Core")
  - `members`: Array of 3 character names
  - `why`: Strategy explanation for this specific team
- `builds`: Array of 6 character configurations:
  - `char`: Character name
  - `jobs`: Array of 2 job classes
  - `espers`: Array of assigned Espers
  - `role`: Character role in party
  - `why`: Build strategy explanation
  - `gambits`: Array of recommended gambit commands
  - `gear`: Array of recommended equipment

### Alpine.js State Management

**Reactive State** (x-data on root div):
- `preset`: Currently selected build preset (string)
- `expanded`: Object tracking which character cards are expanded ({ [index]: boolean })
- `selectedParty`: Index of currently selected party composition (0-2)
- `teamView`: Current team view ('A' for active, 'B' for bench)
- `showBuildDetails`: Toggle for the technical briefing expansion (boolean)

**Computed Properties**:
- `current`: Returns the current preset object (PRESETS[this.preset])
- `groupedPresets`: Organizes presets by game phase (Early/Mid/Late)
- `activePartyMembers`: Returns members of the currently selected party
- `bTeamMembers`: Returns characters not in the active party
- `shouldShowCharacter(charName)`: Logic for filtering characters based on teamView and selection

### UI Layout

- **Header**: Title + "Zodiac Planner" branding
- **Left Column (4/12)**:
  - Phase-grouped preset categories (Early Game, Mid-Late, etc.)
  - Preset selector buttons with short names and efficiency descriptions
- **Right Column (8/12)**:
  - **Mission Briefing Panel**: Amber-themed tactical briefed with technical Specs
  - **Team Toggle**: Switch between Team A (Active) and Team B (Reserve)
  - **Party Selectors**: 3 clickable tactical composition cards
  - **Cinematic Character Cards**: Detailed cards with:
    - Dynamic portrait backgrounds with legibility overlays
    - Right-aligned jobs/roles (mobile optimized)
    - Expandable builds (Strategy, Gambits, Gear)

**Design Pattern**: The UI uses a premium "Tactical Dashboard" theme:
- `ff-panel`: Obsidian-blue panels with cyan borders and amber accents
- `ff-cinematic-bg`: High-quality character art with linear gradients
- `ff-row-tick`: Corner flourishes for a technical look
- `ff-category-header`: Glowing tactical indicators and phase separators
- Smooth Alpine.js x-collapse transitions

## Development Workflow

### No Build Process

This application requires **no build, compile, or bundle steps**. Development workflow:

1. Edit `index.html` directly
2. Open the file in a browser (file:// protocol works)
3. Refresh to see changes

### Testing Changes

```bash
# Open in default browser (macOS)
open index.html

# Or serve via simple HTTP server if needed
python3 -m http.server 8000
# Then visit: http://localhost:8000/index.html
```

### Making Data Changes

Game data is organized into modular files in the `data/` directory. Edit the appropriate file based on what you want to modify:

- **Add/modify UI icons**: Edit `data/icons.js`
- **Change job definitions**: Edit `data/jobs.js`
- **Update character portraits**: Edit `data/characters.js`
- **Modify esper unlocks**: Edit `data/espers.js`
- **Add/modify builds**: Edit `data/presets.js`

**Example - Adding a new preset** (in `data/presets.js`, add to the `PRESETS` object):
```javascript
'Custom Build': {
    desc: 'Your description here',
    eff: 90,
    why: 'Detailed explanation of why this build works...',
    parties: [
        { name: 'Main Team', members: ['Vaan', 'Ashe', 'Penelo'], why: 'Team strategy explanation' },
        { name: 'DPS Team', members: ['Balthier', 'Basch', 'Fran'], why: 'Alternative team strategy' },
        { name: 'Boss Fight', members: ['Vaan', 'Fran', 'Penelo'], why: 'Specialized team strategy' }
    ],
    builds: [
        {
            char: 'Vaan',
            jobs: ['Job1', 'Job2'],
            espers: ['Esper1'],
            role: 'Role',
            why: 'Build explanation',
            gambits: ['Gambit 1', 'Gambit 2', 'Gambit 3'],
            gear: ['Weapon', 'Armor', 'Accessory 1', 'Accessory 2']
        },
        // ... 5 more characters
    ]
}
```

### Styling Changes

- **Tailwind utilities**: Use inline Tailwind classes in `index.html` (already loaded from CDN)
- **Custom styles**: Edit `styles.css` for custom CSS
- **Theme colors**: Modify `ff-panel` class or color definitions in `styles.css`

## Important Implementation Notes

### UI Design Principles

**CRITICAL: NO EMOJIS** - This application uses SVG icons from the `Icons` object for all visual elements. NEVER use emojis (🎯, ⚔️, ✨, etc.) in the UI or code. If you need an icon, add it to the `Icons` object as an SVG path. This maintains visual consistency and ensures the FFXII-inspired aesthetic.

### Alpine.js Reactivity

The app uses Alpine.js for reactive UI updates. Key patterns:
- `x-data`: Root state object defined on main div
- `x-show`: Conditionally display elements (used for party filtering)
- `x-transition`: Smooth animations when showing/hiding characters
- `@click`: Event handlers for interactive elements
- `:class`: Dynamic class binding based on state

### Image Handling

Character portraits are fetched from Final Fantasy Wiki using Avatar images. URLs follow the pattern:
```
https://static.wikia.nocookie.net/finalfantasy/images/[hash]/FFXII_[CharacterName]_Avatar.png
```

The `@error` handler provides graceful fallback:
- Hides broken image
- Displays first letter of character name
- Applies Inter font styling

**Note**: Avatar images are more reliable than full renders. If portraits break, verify the Avatar image exists on the character's Final Fantasy Wiki page.

### Party Composition Logic

The `isInActiveParty(charName)` function determines character visibility:
- Returns `true` if no parties defined (shows all 6 characters)
- Returns `false` if selected party index is invalid
- Otherwise checks if character is in `current.parties[selectedParty].members`

This powers the interactive party filtering feature.

### State Management Pattern

Uses Alpine.js reactive state:
- No framework overhead (Alpine is ~15KB)
- `expanded` uses object pattern: `{ [index]: boolean }` to track card states
- `selectedParty` resets to 0 when changing presets
- Hover state for esper tooltips is ephemeral

## Game Mechanics Context

Understanding these FFXII mechanics helps when modifying the planner:

1. **License Board**: Each job has a board where you spend LP to unlock abilities/equipment
2. **Espers**: Can be assigned to one character; unlock additional board nodes for specific job combinations
3. **Efficiency**: Measures wasted license points (overlapping unlocks between jobs)
4. **Leader Mechanic**: First character in party formation absorbs most attacks; some builds optimize for this
5. **Party Limit**: Only 3 characters can be active at once (hence the party composition feature)
6. **Gambits**: AI programming system that automates character actions in battle
7. **Genji Gloves**: Critical accessory that boosts combo rate by 1.8x for multi-hit weapons (ninja swords, poles, katanas)
8. **Swiftness 3**: Augment that gives 70% chance to perform actions twice
9. **Channeling 3**: Augment that gives 10% chance to cast spells for 0 MP (effectively infinite MP)
10. **Berserk Strategy**: Setting characters to permanent Berserk status for auto-attack optimization

## New Features Added

### Interactive Party Compositions
Each preset now includes 3 recommended 3-person team setups:
- Click party composition cards to filter which characters are displayed
- Only the 3 active party members show at a time
- Smooth fade animations when switching between parties
- Each party has a strategic purpose (general, DPS-focused, boss fights, etc.)

### Gambit Recommendations
Each character build includes 3-5 optimized gambit commands:
- Tailored to the character's role (tank, DPS, healer, support)
- Accounts for special mechanics (Berserk, Swiftness 3, Channeling 3)
- Includes priority ordering (most important actions first)
- Notes for special cases (e.g., "Remove other gambits - Berserk mode")

### Gear Recommendations
Each character build includes 4-5 essential equipment items:
- Primary weapon appropriate to job combination
- Armor optimized for role (Heavy Armor, Black Robes, etc.)
- Critical accessories marked with "(CRITICAL)" tag
- Alternative/backup options noted where applicable
- Corrected weapon types (e.g., Dragon Whisker for Pole users, not Yagyu Darkblade)

## Reference Document

The Word document `FFXII TZA_ The Unneccessary Class Guide v2.2.docx` contains the source optimization data. Refer to it when validating or adding new build strategies.

## Common Equipment Notes

**Weapons**:
- **Poles**: Dragon Whisker, Kanya (for Monk builds)
- **Katanas**: Masamune (scales with MAG for Bushi/Black Mage)
- **Guns**: Fomalhaut (best for Machinist), Aldebaran (backup)
- **Spears**: Zodiac Spear (best), Holy Lance
- **Bows**: Perseus Bow, Burning Bow
- **Daggers**: Main Gauche (50% evasion - critical for evasion tanks)
- **Swords**: Excalibur (Holy element, scales with MAG)

**Armor**:
- **Heavy**: Grand Armor (Heavy Armor 12 unlock)
- **Magic**: Black Robes (MAG+), White Robes (healing+)
- **Genji Armor**: High defense for evasion builds

**Accessories**:
- **Genji Gloves**: Boosts combo rate by 1.8x for multi-hit weapons (CRITICAL for Katana/Pole DPS builds)
- **Bubble Belt**: Max HP boost (survival for superbosses)
- **Ribbon**: Status immunity (CRITICAL for long fights)
- **Berserk Bracers**: Permanent Berserk status
- **Sage's Ring**: MP boost/regeneration

**Note on Genji Gloves**: Only useful with weapons that can combo (ninja swords, poles, katanas, Wyrmhero Blade). Do NOT use with bows, crossbows, guns, hand-bombs, rods, or measures as they cannot combo.
