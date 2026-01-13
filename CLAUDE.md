# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Final Fantasy XII: The Zodiac Age** job planner web application. It's a single-page, standalone HTML file that helps players plan optimal job combinations for their party characters. The app is based on the "Unnecessary Class Guide v2.2" optimization framework.

## Architecture

### Single-File Application Structure

This is a **self-contained HTML file** (`ffxii-job-planner-alt.html`) with no build process or external dependencies beyond CDN-loaded libraries. The entire application lives in one file organized as:

1. **External Dependencies (CDN)**:
   - React 18 (development build via UMD)
   - ReactDOM 18
   - Babel Standalone (for JSX transpilation in browser)
   - Tailwind CSS

2. **Embedded Sections**:
   - `<style>` block: Custom CSS (Estersand glass effect, gradient text, scrollbars)
   - `<script type="text/babel">`: Full React application code

### Key Data Structures

All game data is hardcoded in JavaScript objects at the top of the script:

- **`JOBS`**: 12 job classes with type (Mystic/Heavy/Light), color scheme, background color, and associated icon
- **`CHAR_IMAGES`**: Character portrait URLs from Final Fantasy Wiki
- **`ESPER_UNLOCKS`**: Mapping of Espers → Jobs → License Board unlocks (critical for optimization)
- **`PRESETS`**: 4 pre-configured party builds:
  - "Max Efficiency" (98% - zero wasted licenses)
  - "DPS Nuclear" (85% - superboss focused)
  - "Beginner Friendly" (92% - guide recommended)
  - "Leader Trinity" (94% - leader mechanic optimized)

Each preset contains:
- `desc`: Description of the build philosophy
- `eff`: Efficiency percentage
- `builds`: Array of 6 character configurations (char, jobs, espers, role, why)

### Component Architecture

**Main Component**: `FFXIIJobPlannerEstersand`
- State management via React hooks:
  - `preset`: Currently selected build preset
  - `expanded`: Object tracking which character cards are expanded
  - `hoveredEsper`: Currently hovered esper (for tooltip display)

**UI Layout**:
- Header: Title + efficiency/esper count metrics
- Left column (4/12): Preset selector + Esper grid
- Right column (8/12): Character cards with expandable details

**Design Pattern**: The "Estersand" theme uses a glass-morphism effect (`sand-panel` class) with warm amber/sky gradient colors to evoke the desert aesthetic from the game.

## Development Workflow

### No Build Process

This application requires **no build, compile, or bundle steps**. Development workflow:

1. Edit `ffxii-job-planner-alt.html` directly
2. Open the file in a browser (file:// protocol works)
3. Refresh to see changes

### Testing Changes

```bash
# Open in default browser (macOS)
open ffxii-job-planner-alt.html

# Or serve via simple HTTP server if needed
python3 -m http.server 8000
# Then visit: http://localhost:8000/ffxii-job-planner-alt.html
```

### Making Data Changes

To modify game data (jobs, espers, presets), edit the JavaScript objects in the `<script type="text/babel">` section starting at line 70.

**Example - Adding a new preset**:
```javascript
'Custom Build': {
    desc: 'Your description here',
    eff: 90,
    builds: [
        { char: 'Vaan', jobs: ['Job1', 'Job2'], espers: ['Esper1'], role: 'Role', why: 'Explanation' },
        // ... 5 more characters
    ]
}
```

### Styling Changes

- **Tailwind utilities**: Use inline Tailwind classes (already loaded from CDN)
- **Custom styles**: Edit the `<style>` block (lines 17-46) for custom CSS
- **Theme colors**: Modify the gradient definitions or sand-panel effects

## Important Implementation Notes

### React Development Mode

The app uses React's **development build** for better error messages. For production deployment, switch to production CDN URLs:

```html
<!-- Production React -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
```

### Image Handling

Character portraits are fetched from Final Fantasy Wiki using Avatar images (not full renders). URLs follow the pattern:
```
https://static.wikia.nocookie.net/finalfantasy/images/[hash]/FFXII_[CharacterName]_Avatar.png
```

The `onError` handler (line 293) provides graceful fallback:
- Hides broken image
- Displays first letter of character name
- Applies fantasy font styling

**Note**: Avatar images are more reliable than render images. If portraits break, verify the Avatar image exists on the character's Final Fantasy Wiki page under the "Portraits" section.

### Esper Assignment Logic

The `getEsperOwner` function (line 167) determines which character has been assigned each Esper. This powers:
- Esper grid visual states (owned vs unowned)
- Character card unlock details
- Efficiency calculations (indirectly)

### State Management Pattern

Uses React's `useState` for simple state:
- No Redux/Context needed (single component)
- `expanded` uses object pattern: `{ [index]: boolean }` to track individual card states
- Hover state for esper tooltips is component-level only

## Game Mechanics Context

Understanding these FFXII mechanics helps when modifying the planner:

1. **License Board**: Each job has a board where you spend LP to unlock abilities/equipment
2. **Espers**: Can be assigned to one character; unlock additional board nodes for specific job combinations
3. **Efficiency**: Measures wasted license points (overlapping unlocks between jobs)
4. **Leader Mechanic**: First character in party formation; some builds optimize for this

## Reference Document

The Word document `FFXII TZA_ The Unneccessary Class Guide v2.2.docx` contains the source optimization data. Refer to it when validating or adding new build strategies.
