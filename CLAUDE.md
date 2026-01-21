# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Recent Changes (January 2026)

### Full Esper Titles Implementation
- Added `ESPER_FULL_NAMES` mapping in `data/espers.js` with complete titles
- Updated all UI display locations to use `ESPER_FULL_NAMES[esper]` instead of short names
- Applied to: Esper Unlocks section, tooltips, image alt text, key espers zodiac glyphs

### Time Battlemage Hastega Fixes
Fixed multiple presets that incorrectly suggested Famfrit was needed for Hastega when the character was Time Battlemage:
- **Leader Trinity**: Removed Famfrit from Fran's espers (TBM has natural Hastega)
- **Yiazmat Specialist**: Removed Famfrit from Fran's espers, updated keyEspers
- **Max Efficiency**: Removed Famfrit from Fran's espers, fixed keyEspers to remove incorrect "Chaos (Hastega)"
- **Spare No Expense**: Fixed misleading "Famfrit (Time Battlemage natural Hastega)" in keyEspers
- **DPS Nuclear**: Fixed misleading "Famfrit (Hastega)" in keyEspers

### Improved Tactical Documentation
- Replaced obvious game mechanic descriptions with actionable tactical advice
- Changed "Fran is the ONLY Hastega source (natural Time Battlemage spell)" to tactical notes like "No backup Hastega source - keep Fran alive"
- Updated keyEspers descriptions to be more specific about what the Esper actually unlocks for the build

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
- **`icons.js`** (4.5K): SVG path definitions for all UI icons, job symbols, and preset icons
- **`jobs.js`** (1.1K): Job class definitions with colors and types
- **`characters.js`** (671B): Character portrait URLs from Final Fantasy Wiki
- **`espers.js`** (~5K): Zodiac glyphs, full Esper titles, esper unlocks, and zodiac mappings
- **`presets.js`** (28K): All 8 pre-configured party builds with requirements, gambits, and gear
- **`memoirs.js`** (1.5K): Random memoir quotes from Marquise Halim Ondore IV

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
6. `memoirs.js` - Random memoir quotes for footer

### Key Data Structures

All game data is hardcoded in JavaScript objects:

- **`Icons`**: SVG path data for job icons, UI elements, and preset icons
- **`ZodiacGlyphs`**: SVG representations of zodiac symbols for each Esper
- **`JOBS`**: 12 job classes with type (Mystic/Heavy/Light), color scheme, and associated icon
- **`CHAR_IMAGES`**: Character portrait URLs from Final Fantasy Wiki
- **`ESPER_FULL_NAMES`**: Mapping of short Esper names to full titles (e.g., 'Zeromus' → 'Zeromus, the Condemner')
- **`ESPER_UNLOCKS`**: Mapping of Espers → Jobs → License Board unlocks
- **`ESPER_ZODIAC`**: Mapping of Espers to zodiac symbols
- **`PRESET_ICONS`**: Mapping of preset names to their icon keys in the Icons object
- **`MEMOIRS`**: Array of memoir quotes with chapter, title, and text
- **`PRESETS`**: 8 pre-configured party builds:
  - "First Jobs" - Single-job prologue build (temporary, replaced at dual-job unlock)
  - "Max Efficiency" - Zero wasted licenses, mathematically perfect
  - "DPS Nuclear" - Maximum damage for superbosses
  - "Balanced" - High synergy with low risk
  - "Leader Trinity" - Evasion-focused, leader mechanic optimized
  - "Yiazmat Specialist" - Endurance build for 50M HP marathon fight
  - "Lore Friendly" - Story-based canonical character roles
  - "Spare No Expense" - Trial Mode luxury build with no equipment compromises

Each preset contains:
- `shortName`: Shortened name for compact display (e.g., "Efficiency")
- `desc`: Short description of the build philosophy
- `metrics`: Object with three percentage values (0-100):
  - `lp`: License point efficiency/synergy
  - `atk`: Offensive power rating
  - `flex`: Flexibility/versatility rating
- `phase`: Game phase indicator ('early', 'mid', or 'late') for preset grouping
- `requirements`: Comprehensive build requirements object:
  - `availability`: When the build becomes accessible
  - `unlocks`: What needs to be unlocked (supports `[STATUS: CRITICAL]` and `[STATUS: MANDATORY]` annotations)
  - `criticalGear`: Array of essential gear items with priority tags
  - `keyEspers`: Array of important Espers with their tactical purpose
  - `recommendedLevel`: Level range (e.g., "Level 40-50")
  - `notes`: Additional important notes and warnings
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
- `preset`: Currently selected build preset (string) - persisted to localStorage
- `expanded`: Object tracking which character cards are expanded ({ [index]: boolean }) - persisted to localStorage
- `selectedParty`: Index of currently selected party composition (0-2) - persisted to localStorage
- `teamView`: Current team view ('A' for active, 'B' for bench) - persisted to localStorage
- `showBuildDetails`: Toggle for the technical briefing expansion (boolean)
- `memoir`: Random memoir object selected on initialization (from MEMOIRS array)

**Computed Properties**:
- `current`: Returns the current preset object (PRESETS[this.preset])
- `groupedPresets`: Organizes presets by game phase (Early/Mid/Late)
- `activePartyMembers`: Returns members of the currently selected party
- `bTeamMembers`: Returns characters not in the active party
- `shouldShowCharacter(charName)`: Logic for filtering characters based on teamView and selection
- `isLeader(charName)`: Returns true if character is first in the current team (leader position)

**Helper Methods**:
- `getPresetIcon(presetName)`: Returns the SVG icon for a preset using the PRESET_ICONS mapping
- `renderStatusNote(text)`: Parses text for `[STATUS: CRITICAL]` and `[STATUS: MANDATORY]` annotations and renders them as styled status badges with icons
- `isInActiveParty(charName)`: Checks if character is in the currently selected party
- `isInBTeam(charName)`: Checks if character is on the bench (Team B)

### UI Layout

- **Header**: Title + "Zodiac Planner" branding with subtitle
- **Left Column (4/12)**:
  - Phase-grouped preset categories (Early Game, Mid to Late Game, Late Game / Endgame)
  - Preset selector buttons with:
    - Large shortName display
    - Full preset name
    - Short description
    - Expandable tactical snapshot showing:
      - Three tactical metrics with visual gauges (LP Sync, Power, Flex)
      - Synergy markers (key espers and phase tags)
      - Tactical requirement panel
- **Right Column (8/12)**:
  - **Mission Briefing Panel**: Amber-themed tactical briefing with:
    - Archives header with metadata
    - Build overview section
    - Expandable detailed specifications:
      - Availability timeline
      - License unlocks (with status annotations)
      - Critical gear requirements
      - Key Esper attunement with zodiac glyphs
      - Tactical notes and warnings
    - Party formations selector (3 tactical compositions)
  - **Team Toggle**: Switch between Team A (Active) and Team B (Reserve)
  - **Cinematic Character Cards**: Detailed cards with:
    - Dynamic portrait backgrounds with legibility overlays
    - Leader highlighting (bronze text for first character in team)
    - Mini zodiac glyph readout for assigned espers
    - Right-aligned jobs/roles (mobile optimized)
    - Expandable builds (Strategy, Esper Unlocks, Gambits, Gear)
- **Footer**:
  - Random memoir excerpt from Marquise Halim Ondore IV
  - Credits and decorative elements

**Design Pattern**: The UI uses a premium "Tactical Dashboard" theme:
- `ff-panel`: Obsidian-blue panels with cyan borders and amber accents
- `ff-briefing-panel`: Amber-bordered mission briefing with technical grid overlay
- `ff-cinematic-bg`: High-quality character art with linear gradients
- `ff-row-tick`: Corner flourishes for a technical look
- `ff-category-header`: Glowing tactical indicators and phase separators
- `ff-status-node`: Inline status badges for CRITICAL/MANDATORY annotations
- `ff-bronze-text`: Bronze/gold coloring for leader characters
- Smooth Alpine.js x-collapse transitions
- Visual metric gauges with semantic colors (system/offense/defense)

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
- **Add/modify memoir quotes**: Edit `data/memoirs.js`

**Example - Adding a new preset** (in `data/presets.js`, add to the `PRESETS` object):
```javascript
'Custom Build': {
    shortName: 'Custom',
    desc: 'Your short description here',
    metrics: { lp: 90, atk: 85, flex: 88 },
    phase: 'mid', // 'early', 'mid', or 'late'
    requirements: {
        availability: 'Mid-Game Phase',
        unlocks: 'Dual-job authorization required',
        criticalGear: [
            'Main Gauche [PRIORITY: ALPHA - Essential for tank]',
            'Genji Gloves [PRIORITY: ALPHA - Combo optimization]'
        ],
        keyEspers: ['Chaos (Hastega)', 'Ultima (Swiftness)', 'Cuchulainn (Remedy Lore)'],
        recommendedLevel: 'Level 40-50',
        notes: 'Important tactical notes. Supports [STATUS: CRITICAL] and [STATUS: MANDATORY] annotations.'
    },
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

// Don't forget to add to PRESET_ICONS mapping:
const PRESET_ICONS = {
    // ... existing presets
    'Custom Build': 'IconName' // Must match a key in the Icons object
};
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

Uses Alpine.js reactive state with localStorage persistence:
- No framework overhead (Alpine is ~15KB)
- `expanded` uses object pattern: `{ [index]: boolean }` to track card states
- State persistence: `preset`, `expanded`, `selectedParty`, and `teamView` are all persisted to localStorage using Alpine's `$watch` feature
- Keys used: `ffxii_preset`, `ffxii_expanded`, `ffxii_party`, `ffxii_team`
- `selectedParty` resets to 0 when changing presets
- `memoir` is randomly selected once on initialization (not persisted)
- Hover state for esper tooltips is ephemeral

### Status Annotations

The `renderStatusNote()` function enables inline status annotations in text fields:
- `[STATUS: CRITICAL]` - Renders as an orange badge with alert icon
- `[STATUS: MANDATORY]` - Renders as an amber badge with warning icon
- Used in `requirements.unlocks` and `requirements.notes` fields
- The function parses the annotation and replaces it with styled HTML including SVG icons

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

## Features

### Tactical Metrics & Build Analysis
Each preset includes three key performance indicators:
- **LP Sync**: License point efficiency (how well the jobs synergize)
- **Power**: Offensive capability rating
- **Flex**: Versatility and adaptability rating
- Visual gauges with semantic color coding (system/offense/defense)
- Expandable tactical snapshot in preset selector showing metrics, synergy markers, and requirements

### Comprehensive Build Requirements
Each preset has detailed requirements documentation:
- **Availability**: When the build becomes accessible in the game
- **License Unlocks**: What needs to be unlocked (with status annotations)
- **Critical Gear**: Essential equipment with priority tags
- **Key Espers**: Important Esper assignments with tactical purpose
- **Recommended Level**: Target level range
- **Notes**: Additional warnings and tactical considerations
- Expandable detailed specifications panel in the Mission Briefing

### Interactive Party Compositions
Each preset now includes 3 recommended 3-person team setups:
- Click party composition cards to filter which characters are displayed
- Only the 3 active party members show at a time
- Smooth fade animations when switching between parties
- Each party has a strategic purpose (general, DPS-focused, boss fights, etc.)
- Leader character highlighted with bronze text (first character in formation)

### Preset Grouping by Game Phase
Presets are organized into categories:
- **Early Game**: Accessible from the start
- **Mid to Late Game**: Requires mid-game progression
- **Late Game / Endgame**: Advanced builds for endgame content
- Dynamic category headers with glowing indicators

### Gambit Recommendations
Each character build includes 3-5 optimized gambit commands:
- Tailored to the character's role (tank, DPS, healer, support)
- Accounts for special mechanics (Berserk, Swiftness 3, Channeling 3)
- Includes priority ordering (most important actions first)
- Notes for special cases (e.g., "Remove other gambits - Berserk mode")
- FFXII-inspired gambit row styling with target → action format

### Gear Recommendations
Each character build includes 4-5 essential equipment items:
- Primary weapon appropriate to job combination
- Armor optimized for role (Heavy Armor, Black Robes, etc.)
- Critical accessories marked with priority tags
- Alternative/backup options noted where applicable
- Corrected weapon types (e.g., Dragon Whisker for Pole users)

### Random Memoir Quotes
Footer displays random excerpts from Marquise Halim Ondore IV's memoirs:
- Pulled from `MEMOIRS` array on page load
- Includes chapter number and title
- Adds narrative flavor and thematic immersion

### Status Annotations
Inline status badges for critical information:
- `[STATUS: CRITICAL]` - Orange badge with alert icon (for critical requirements)
- `[STATUS: MANDATORY]` - Amber badge with warning icon (for mandatory items)
- Used throughout build requirements and notes
- Automatically parsed and rendered by `renderStatusNote()` function

### LocalStorage Persistence
User preferences are saved across sessions:
- Selected preset
- Expanded character cards
- Selected party composition
- Team view (A or B)
- Automatically restored on page load

## Reference Documentation

The original Word document has been converted to markdown and split into specialized auxiliary files for easier consumption:

### Primary Reference
- **`docs/FFXII TZA_ The Unneccessary Class Guide v2.2.md`** - Complete guide in markdown format

### Auxiliary Reference Files (Topical)
- **`docs/job-classes.md`** - Detailed job class breakdowns and synergies
- **`docs/espers-reference.md`** - Esper assignments and license board unlocks
- **`docs/equipment-reference.md`** - Comprehensive gear guide with priority tags
- **`docs/build-strategies.md`** - Optimization strategies and theoretical frameworks
- **`docs/team-compositions.md`** - Party formation strategies and synergies
- **`docs/advanced-tactics.md`** - Endgame mechanics and superboss strategies
- **`docs/beginner-guide.md`** - New player walkthrough and progression tips
- **`docs/theoretical-analysis.md`** - Mathematical analysis and optimization theory

When validating or adding new build strategies, consult the relevant auxiliary files for focused information rather than searching through the full guide.

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

## Important Esper & Job Clarifications

### Time Battlemage Hastega Confusion
**CRITICAL**: Time Battlemage has **natural Hastega** on its license board. Do NOT assign Famfrit "for Hastega" to a Time Battlemage character.

- **Famfrit unlocks for Time Battlemage**: Battle Lore only (NOT Hastega)
- **Famfrit unlocks Hastega for**: Machinist only

When documenting builds:
- ✅ CORRECT: "Fran (Time Battlemage) provides natural Hastega"
- ✅ CORRECT: "Balthier (Machinist) gets Hastega from Famfrit"
- ❌ WRONG: "Fran needs Famfrit for Hastega" (when she's Time Battlemage)
- ❌ WRONG: "Famfrit (Time Battlemage Hastega)" in keyEspers

### Writing Tactical Notes
When documenting Hastega sources, focus on tactical implications, not obvious game mechanics:

- ✅ GOOD: "No backup Hastega source - keep Fran alive"
- ✅ GOOD: "Remember: Fran must be in every party rotation"
- ❌ BAD: "Fran is the ONLY Hastega source (natural Time Battlemage spell)"
- ❌ BAD: "Fran (Time Battlemage) is the ONLY Hastega source via Famfrit"

### Esper Display Names
All Esper names should use the full title format when displayed in the UI:
- Use `ESPER_FULL_NAMES[esperName]` for display
- Short names ('Zeromus') are used in data structures
- Full titles ('Zeromus, the Condemner') are shown to users
- Applied in: Esper Unlocks section, tooltips, image alt text, zodiac glyph titles
