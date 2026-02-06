# Data Structures & State Management

## Key Data Structures

All game data is hardcoded in JavaScript objects in `data/`:

- **`Icons`**: SVG path data for job icons, UI elements, and preset icons
- **`ZodiacGlyphs`**: SVG representations of zodiac symbols for each Esper
- **`JOBS`**: 12 job classes with type (Mystic/Heavy/Light), color scheme, and associated icon
- **`CHAR_IMAGES`**: Character portrait URLs from Final Fantasy Wiki
- **`ESPER_FULL_NAMES`**: Mapping of short Esper names to full titles (e.g., 'Zeromus' → 'Zeromus, the Condemner')
- **`ESPER_UNLOCKS`**: Mapping of Espers → Jobs → License Board unlocks
- **`ESPER_ZODIAC`**: Mapping of Espers to zodiac symbols
- **`PRESET_ICONS`**: Mapping of preset names to their icon keys in the Icons object
- **`MEMOIRS`**: Array of memoir quotes with chapter, title, and text
- **`ESPER_LOCATIONS`** (in `esper_locations.js`): Per-esper objects with `location`, `title`, `desc`, `zodiac`, `glyph` (unicode), `element`, `cost` (1-3), `image` (B&W artwork path), optional `url` (wiki link)

## Preset Schema

Each of the 8 presets in `PRESETS` contains:
- `shortName`: Shortened name for compact display (e.g., "Efficiency")
- `desc`: Short description of the build philosophy
- `metrics`: Object with `lp`, `atk`, `flex` (0-100 percentages)
- `phase`: Game phase indicator ('early', 'mid', or 'late')
- `requirements`: Object with `availability`, `unlocks`, `criticalGear`, `keyEspers`, `recommendedLevel`, `notes`
  - `unlocks` and `notes` support `[STATUS: CRITICAL]` and `[STATUS: MANDATORY]` annotations
- `why`: Detailed explanation of the build strategy
- `parties`: Array of 3 compositions, each with `name`, `members` (3 character names), `why`
- `builds`: Array of 6 character configs, each with `char`, `jobs` (2), `espers`, `role`, `why`, `gambits`, `gear`

## Alpine.js State (defined in `app.js`)

**Reactive State** (x-data on root div):
- `preset`: Selected build preset (string) — persisted as `ffxii_preset`
- `expanded`: Card expansion states ({ [index]: boolean }) — persisted as `ffxii_expanded`
- `selectedParty`: Party composition index (0-2) — persisted as `ffxii_party`
- `teamView`: Team view ('A' or 'B') — persisted as `ffxii_team`
- `showBuildDetails`: Technical briefing expansion toggle (boolean)
- `memoir`: Random memoir object (not persisted)
- `guidedMode`: Whether guided onboarding overlay is active (boolean)
- `guidedStep`: Current step index in guided mode (0-5)
- `guidedSteps`: Array of 6 onboarding steps with narrative content
- `modalOpen`: Whether esper modal is visible (boolean)
- `modalContent`: HTML string rendered inside the modal

**Guided Mode** (6-step interactive onboarding, `app.js`):
- Steps 0-4: Character introductions (Vaan, Penelo, Fran/Balthier, Basch, Ashe) with job suggestions
- Step 5: LaunchPad (`type: 'launchPad'`) — finale showing 3 recommended next builds with Clan Centurio background
- Methods: `startGuidedMode()`, `nextGuidedStep()`, `prevGuidedStep()`, `skipGuidedMode()`, `completeGuidedMode()`
- `completeGuidedMode()` sets `ffxii_guided_complete` in localStorage and defaults to 'First Jobs' preset
- Auto-starts on first visit (when `ffxii_guided_complete` is not 'true')

**Esper Modal** (grimoire-style detail/lore popups, `esper_modal.js`):
- `openEsperModal(esperName)`: Opens detail modal for a specific esper (uses `ESPER_LOCATIONS` data)
- `openLoreModal()`: Opens general overview modal showing all 13 espers with promo artwork
- `EsperModal.render(esper)`: Returns HTML — image on left, stats/location/desc on right, grimoire styling
- `EsperModal.renderLore()`: Returns HTML — full promo art + narrative overview
- Triggered by clicking esper watermarks in character builds (`.clickable-esper` class)

**Computed Properties**:
- `current`: Returns `PRESETS[this.preset]`
- `groupedPresets`: Organizes presets by game phase
- `activePartyMembers` / `bTeamMembers`: Members based on `selectedParty`
- `shouldShowCharacter(charName)`: Filters by `teamView` and selection
- `isLeader(charName)`: True if first in current team

**Helper Methods**:
- `getPresetIcon(presetName)`: SVG icon lookup via `PRESET_ICONS`
- `renderStatusNote(text)`: Parses `[STATUS: CRITICAL]` / `[STATUS: MANDATORY]` into styled badges
- `isInActiveParty(charName)` / `isInBTeam(charName)`: Party membership checks
- `getGambitType(gambit)`: Classifies gambit target — returns 'ally' (blue), 'foe' (red), or 'neutral' (gray)
- `renderGearItem(item)`: Parses `"Name | Reason"` pipe-delimited format into styled HTML

**State Rules**:
- `selectedParty` resets to 0 when changing presets
- `isInActiveParty` returns `true` if no parties defined (shows all 6)
