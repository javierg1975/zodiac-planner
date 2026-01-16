# FFXII Zodiac Planner

An interactive job and party planning tool for **Final Fantasy XII: The Zodiac Age**. Plan optimal job combinations, Esper assignments, and party compositions based on the "Unnecessary Class Guide v2.2" optimization framework.

> **No installation required.** Single HTML file that runs directly in your browser.

![FFXII Screenshot](./backgrounds/screenshot-337-cropped.jpg)

---

## Features

### 6 Optimized Build Presets

**Max Efficiency (98%)**
Zero wasted licenses, mathematically perfect

**DPS Nuclear (85%)**
Maximum damage for superbosses

**Beginner Friendly (92%)**
Guide recommended, forgiving progression

**Leader Trinity (94%)**
Optimized for leader mechanic and evasion

**Yiazmat Specialist (82%)**
Hyper-optimized for 50M HP marathon fight

**Lore Friendly (91%)**
Canonical character roles with optimized second jobs

---

### Interactive Team Management

Since FFXII only allows **3 active party members** at a time, the planner helps you manage your full 6-person roster:

■ **Team A / Team B Toggle** — Switch between your active combat wing and leveling rotation
■ **3-Person Partys** — Select specific tactical compositions (e.g., Evasion Core, Siege)
■ **Dynamic Filtering** — Character cards automatically show/hide based on your team selection
■ **Smooth Transitions** — Cinematic animations when switching between units

---

### Mission Briefing & Technical Specs

The "Mission Briefing" panel provides a deep dive into the preset's logic:

■ **Operational Context** — Narrative and tactical reasoning for the build
■ **Technical Access** — Expandable technical specs including availability and authorization nodes
■ **Zodiac Attunement** — Visual breakdown of key Esper assignments and their tactical purpose
■ **Critical Armament** — Summary of essential endgame gear requirements

---

### Complete Build Details

Each character includes:

■ **Job Combinations** — Dual job synergies optimized for efficiency
■ **Cinematic Portraits** — Detailed character visuals with legibility overlays
■ **Recommended Gambits** — AI commands tailored to role (tank, DPS, healer, support)
■ **Gear Recommendations** — Essential equipment items for tactical deployment
■ **Strategy Explanations** — Deep dive into build logic and usage

---

### Visual Esper Grid

■ Zodiac symbol icons for each Esper
■ Grouped by assigned character
■ Hover tooltips showing license board unlocks
■ Unassigned Espers clearly marked

---

## Quick Start

```
1. Clone or download this repository
2. Open index.html in any modern web browser
3. Select a preset from the left sidebar
4. Use the Team A/B toggle and Party cards to explore compositions
5. Click "Initialize Technical Access" in the Briefing for deep dives
6. Expand character cards to view detailed builds, gambits, and gear
```

> **Zero dependencies.** No installation, no build process. Just open and use.

## Technology Stack

| Component | Purpose |
|-----------|---------|
| **Alpine.js** | Lightweight reactive framework (~15KB) |
| **Tailwind CSS** | Utility-first styling |
| **Single HTML file** | No build process required |
| **Game-inspired UI** | FFXII menu aesthetic with blurred backgrounds |

---

## Understanding the Builds

### Key Mechanics

**License Board**
Spend LP to unlock abilities and equipment

**Espers**
Assigned to one character, unlock additional board nodes for specific job combos

**Efficiency**
Percentage of non-overlapping licenses (higher = less waste)

**Party Limit**
Only 3 characters active — plan your teams strategically

**Gambits**
AI programming for automated battle actions

**Leader Mechanic**
First character absorbs most attacks

---

### Critical Equipment

> **Genji Gloves**
> Boosts combo rate by 1.8x for multi-hit weapons (essential for Katana/Pole DPS builds; useless with bows/guns)

**Main Gauche**
50% evasion (critical for evasion tanks)

**Bubble Belt**
Max HP boost (survival for superbosses)

**Ribbon**
Status immunity (essential for long fights)

---

### Core Strategies

**Berserk DPS**
Permanent Berserk + minimal gambits for auto-attack spam

**Swiftness 3**
70% chance to act twice (Monk esper trinity: Ultima/Zeromus/Zodiark)

**Channeling 3**
Infinite MP sustainability (White Mage/Machinist/Monk builds)

**Evasion Tank**
Main Gauche + shields for 90%+ dodge rate

**Remedy Lore 3**
Remedies cure all status effects (Shikari with Cuchulainn)

## Development

### File Structure
```
zodiac-planner/
├── index.html              # Main application
├── styles.css              # Premium tactical styling
├── data/                   # Modular game data
│   ├── icons.js            # SVG Path definitions
│   ├── jobs.js             # Job definitions
│   ├── characters.js       # Character metadata
│   ├── espers.js           # Esper & Zodiac data
│   └── presets.js          # Optimization builds
├── backgrounds/            # Cinematic backgrounds
├── portraits/              # Character portraits
├── CLAUDE.md              # Developer documentation
└── README.md              # Project overview
```

---

### Making Changes

Edit `index.html` directly — no build process needed:

| Section | Path | Content |
|---------|------|---------|
| **Styles** | [styles.css](file:///Users/javierg/Projects/GitHub/Personal/zodiac-planner/styles.css) | Custom FFXII tactical CSS |
| **Presets** | [data/presets.js](file:///Users/javierg/Projects/GitHub/Personal/zodiac-planner/data/presets.js) | Build configurations |
| **Markup** | [index.html](file:///Users/javierg/Projects/GitHub/Personal/zodiac-planner/index.html) | HTML with Alpine.js |

---

### Adding a New Preset

```javascript
'Custom Build': {
    desc: 'Short description',
    eff: 90,
    why: 'Detailed explanation of the build strategy...',
    parties: [
        { name: 'Main Team', members: ['Vaan', 'Ashe', 'Penelo'], why: 'Strategy' },
        { name: 'DPS Team', members: ['Balthier', 'Basch', 'Fran'], why: 'Strategy' },
        { name: 'Boss Team', members: ['Vaan', 'Fran', 'Penelo'], why: 'Strategy' }
    ],
    builds: [
        {
            char: 'Vaan',
            jobs: ['Shikari', 'Knight'],
            espers: ['Cuchulainn'],
            role: 'Tank',
            why: 'Build explanation',
            gambits: ['Gambit 1', 'Gambit 2', 'Gambit 3'],
            gear: ['Main Gauche', 'Crystal Shield', 'Ribbon']
        },
        // ... 5 more characters
    ]
}
```

---

## Credits

**Build optimization**
Based on "Unnecessary Class Guide v2.2"

**Character portraits**
Final Fantasy Wiki

**Game**
Final Fantasy XII: The Zodiac Age (Square Enix)

---

## License

This is a fan-made planning tool. Final Fantasy XII and all related content are © Square Enix.
