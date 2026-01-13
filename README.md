# FFXII Zodiac Planner

An interactive job and party planning tool for **Final Fantasy XII: The Zodiac Age**. Plan optimal job combinations, Esper assignments, and party compositions based on the "Unnecessary Class Guide v2.2" optimization framework.

![FFXII Screenshot](./backgrounds/screenshot-337-cropped.jpg)

## Features

### 6 Optimized Build Presets
- **Max Efficiency** (98%) - Zero wasted licenses, mathematically perfect
- **DPS Nuclear** (85%) - Maximum damage for superbosses
- **Beginner Friendly** (92%) - Guide recommended, forgiving progression
- **Leader Trinity** (94%) - Optimized for leader mechanic and evasion
- **Yiazmat Specialist** (82%) - Hyper-optimized for 50M HP marathon fight
- **Lore Friendly** (91%) - Canonical character roles with optimized second jobs

### Interactive Party Compositions
Since FFXII only allows **3 active party members** at a time, each preset includes recommended team setups:
- **Click party composition cards** to see which characters to use
- Only the 3 active party members are displayed
- Each party has a specific strategy (general purpose, DPS-focused, boss fights, etc.)
- Smooth transitions when switching between parties

### Complete Build Details
Each character includes:
- **Job Combinations**: Dual job synergies optimized for efficiency
- **Esper Assignments**: Which Espers unlock critical board nodes
- **Recommended Gambits**: 3-5 AI commands tailored to role (tank, DPS, healer, support)
- **Gear Recommendations**: 4-5 essential equipment items with priority marked
- **Strategy Explanations**: Why this build works and how to use it

### Visual Esper Grid
- Zodiac symbol icons for each Esper
- Grouped by assigned character
- Hover tooltips showing license board unlocks
- Unassigned Espers clearly marked

## Quick Start

1. **Clone or download** this repository
2. **Open `index.html`** in any modern web browser
3. **Select a preset** from the left sidebar
4. **Choose a party composition** to see the recommended 3-person team
5. **Expand character cards** to view detailed builds, gambits, and gear

No installation, no build process, no dependencies. Just open and use.

## Technology

- **Alpine.js** - Lightweight reactive framework (~15KB)
- **Tailwind CSS** - Utility-first styling
- **Single HTML file** - No build process required
- **Game-inspired UI** - FFXII menu aesthetic with blurred backgrounds

## Understanding the Builds

### Key Mechanics

- **License Board**: Spend LP to unlock abilities and equipment
- **Espers**: Assigned to one character, unlock additional board nodes for specific job combos
- **Efficiency**: Percentage of non-overlapping licenses (higher = less waste)
- **Party Limit**: Only 3 characters active - plan your teams strategically
- **Gambits**: AI programming for automated battle actions
- **Leader Mechanic**: First character absorbs most attacks

### Critical Equipment

- **Genji Gloves**: Boosts combo rate by 1.8x for multi-hit weapons (essential for Katana/Pole DPS builds; useless with bows/guns)
- **Main Gauche**: 50% evasion (critical for evasion tanks)
- **Bubble Belt**: Max HP boost (survival for superbosses)
- **Ribbon**: Status immunity (essential for long fights)

### Core Strategies

- **Berserk DPS**: Permanent Berserk + minimal gambits for auto-attack spam
- **Swiftness 3**: 70% chance to act twice (Monk esper trinity: Ultima/Zeromus/Zodiark)
- **Channeling 3**: Infinite MP sustainability (White Mage/Machinist/Monk builds)
- **Evasion Tank**: Main Gauche + shields for 90%+ dodge rate
- **Remedy Lore 3**: Remedies cure all status effects (Shikari with Cuchulainn)

## Development

### File Structure
```
zodiac-planner/
├── index.html              # Main application (single file)
├── backgrounds/            # Background images
│   └── screenshot-337-cropped.jpg
├── CLAUDE.md              # Developer documentation
└── README.md              # This file
```

### Making Changes

Edit `index.html` directly - no build process needed:
- **Presets data**: Lines ~198-307
- **Game data**: Lines ~84-196 (JOBS, ESPERS, etc.)
- **Styles**: Lines ~14-80 (CSS)
- **UI structure**: Lines ~330+ (HTML with Alpine.js directives)

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

## Credits

- **Build optimization**: Based on "Unnecessary Class Guide v2.2"
- **Character portraits**: Final Fantasy Wiki
- **Game**: Final Fantasy XII: The Zodiac Age (Square Enix)

## License

This is a fan-made planning tool. Final Fantasy XII and all related content are © Square Enix.
