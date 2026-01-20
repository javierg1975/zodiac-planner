const PRESETS = {
    'First Jobs': {
        shortName: 'Starter',
        desc: 'Single-job prologue build. Replace when dual jobs unlock.',
        metrics: { lp: 'C', atk: 'C', flex: 'B' },
        phase: 'early',
        requirements: {
            availability: 'Prologue - Single Job Phase Only',
            unlocks: 'None - Available from first Clan Hall visit.',
            criticalGear: [
                'Potions/Phoenix Downs | Vaan\'s Potion Lore essential',
                'Store-bought equipment | Leather armor, Bronze gear'
            ],
            keyEspers: ['None - No Espers in single-job phase'],
            recommendedLevel: 'Level 1+',
            notes: 'TEMPORARY BUILD. Visit Montblanc at Clan Centurio to reset jobs when dual-job system unlocks (after Tomb of Raithwall). Party composition is fragmented - Vaan is your only constant member.'
        },
        why: 'Designed for the chaotic prologue where party constantly shifts (Vaan solo → Vaan+Penelo → rotating cast). Vaan as Shikari ensures consistent item-based healing since he\'s the only guaranteed party member. This build is meant to be REPLACED once dual-job unlocks.',
        parties: [
            { name: 'Vaan\'s Core', members: ['Vaan', 'Penelo', 'Balthier'], why: 'Common early trio. Vaan handles healing via Potions, Penelo provides magic when available.' },
            { name: 'Physical Front', members: ['Vaan', 'Balthier', 'Basch'], why: 'Heavy physical damage. Vaan as constant, supported by Knight and Uhlan.' },
            { name: 'Full Roster', members: ['Vaan', 'Fran', 'Ashe'], why: 'Balanced once full party available. Ranged physical and magic DPS complement Vaan\'s survival.' }
        ],
        builds: [
            { char: 'Vaan', jobs: ['Shikari'], espers: [], role: 'Item Healer', why: 'Your only constant. Potion Lore makes items actually useful. Main Gauche (when available) adds survivability.', gambits: ['Ally: HP < 70% → Potion', 'Ally: HP Critical → Phoenix Down', 'Ally: HP < 40% → Hi-Potion', 'Foe: Nearest Visible → Attack'], gear: ['Dagger → Main Gauche (eventually)', 'Leather Armor progression', 'Buckler → Round Shield', 'Stock Potions/Phoenix Downs'] },
            { char: 'Penelo', jobs: ['White Mage'], espers: [], role: 'Magic Healer', why: 'Traditional healer when available. Cure spells supplement Vaan\'s items.', gambits: ['Ally: HP < 70% → Cure', 'Ally: HP < 40% → Cura', 'Ally: HP Critical → Phoenix Down', 'Foe: Nearest Visible → Attack'], gear: ['Staff → Serpent Rod', 'Mystic Armor progression', 'MAG focus', 'MP items'] },
            { char: 'Balthier', jobs: ['Knight'], espers: [], role: 'Physical Tank', why: 'Heavy Armor provides early durability. Solid sword damage.', gambits: ['Foe: Leader\'s Target → Attack', 'Foe: Nearest Visible → Attack'], gear: ['Sword progression', 'Heavy Armor (Bronze → Steel)', 'Shield', 'STR accessories'] },
            { char: 'Fran', jobs: ['Archer'], espers: [], role: 'Ranged Attacker', why: 'Only ranged physical option in single-job phase. Bow progression available immediately in shops.', gambits: ['Foe: Flying → Attack', 'Foe: HP ≥ 1000 → Attack', 'Foe: Nearest Visible → Attack'], gear: ['Bow progression (Shortbow → Longbow)', 'Light Armor', 'Arrows', 'HP accessories'] },
            { char: 'Basch', jobs: ['Uhlan'], espers: [], role: 'Physical DPS', why: 'Spear progression provides consistent damage. Heavy Armor for frontline.', gambits: ['Foe: HP ≥ 1000 → Attack', 'Foe: Nearest Visible → Attack'], gear: ['Spear progression (Javelin → Heavy Lance)', 'Heavy Armor', 'STR focus', 'HP accessories'] },
            { char: 'Ashe', jobs: ['Black Mage'], espers: [], role: 'Magic DPS', why: 'Elemental magic for exploiting weaknesses. Mystic Armor progression.', gambits: ['Foe: Flying → Thunder', 'Foe: Weak Fire → Fire', 'Foe: Weak Ice → Blizzard', 'Foe: Nearest Visible → Attack'], gear: ['Rod progression', 'Mystic Armor', 'MAG focus', 'Elemental licenses'] }
        ]
    },
    'Max Efficiency': {
        shortName: 'Efficiency',
        desc: 'Zero-waste build. Refined for perfect license synergy.',
        metrics: { lp: 'S', atk: 'A', flex: 'A' },
        phase: 'mid',
        requirements: {
            availability: 'Mid-Game',
            unlocks: 'Belias Defeated (Mt Bur-Omisace) - Requires dual-job system unlocked.',
            criticalGear: [
                'Main Gauche | Evasion Mastery',
                'Genji Gloves | Combo Optimization'
            ],
            keyEspers: ['Exodus/Zeromus (Channeling)', 'Ultima/Zodiark (Swiftness/Renew)', 'Chaos (Hastega)'],
            recommendedLevel: 'Level 35+',
            notes: 'Requires dual-job system unlocked. Using only one job per character wastes most of the synergy.'
        },
        why: 'Built for dedicated completionists. This setup ensures near-zero license overlap, maximizing every spent License Point. It enables rapid endgame scaling by providing early access to critical augments and Swiftness across the party.',
        parties: [
            { name: 'Core Party', members: ['Vaan', 'Fran', 'Penelo'], why: 'Balanced adventuring group. High-tier evasion tanking paired with Renew/Hastega support.' },
            { name: 'Frontline Vanguard', members: ['Balthier', 'Basch', 'Fran'], why: 'Prioritizes raw physical damage. Includes full Break suite and specialized Berserker combat strategy.' },
            { name: 'Sustained Relief', members: ['Fran', 'Penelo', 'Balthier'], why: 'Built for long battles. Dual Renew casting and full status immunity.' }
        ],
        builds: [
            { char: 'Vaan', jobs: ['Red Battlemage', 'Knight'], espers: ['Mateus', 'Exodus'], role: 'Frontline Lead', why: 'Heavy Armor synergy. Provides critical buffs and strong physical defense.', gambits: ['Ally: HP < 50% → Curaga', 'Self: HP < 40% → X-Potion', 'Ally: Status ≠ Protect → Protect', 'Foe: Nearest Visible → Attack'], gear: ['Excalibur | Holy-element sword with MAG scaling', 'Grand Armor | Best heavy armor for defense', 'Demon Shield | High evasion with status immunity', 'Rose Corsage | HP boost accessory'] },
            { char: 'Balthier', jobs: ['Foebreaker', 'Uhlan'], espers: ['Adrammelech', 'Shemhazai', 'Hashmal'], role: 'Heavy Artillery', why: 'Maximum STR-stat utilization. Zero Mystic Armor overlap. Optimized for Heavy Armor and Spear progression.', gambits: ['Foe: HP ≥ 10000 → Expose', 'Foe: Status ≠ Shattered → Shear', 'Foe: Status ≠ Wither → Wither', 'Foe: Nearest Visible → Attack'], gear: ['Holy Lance | High damage spear with Holy element', 'Grand Armor | Maximum physical defense', 'Zodiac Spear | Best spear in game', 'Hermes Sandals | STR boost and auto-Haste'] },
            { char: 'Fran', jobs: ['Monk', 'Time Battlemage'], espers: ['Ultima', 'Zeromus', 'Zodiark'], role: 'Tactical Support', why: 'Critical Trinity Node: Swiftness 3, Channeling 3, and Renew access.', gambits: ['Ally: Status ≠ Haste → Haste', 'Ally: Any → Bravery', 'Ally: HP Critical → Renew', 'Foe: HP ≥ 10000 → Expose', 'Foe: Nearest Visible → Attack'], gear: ['Dragon Whisker | Highest damage pole weapon', 'Grand Armor | Maximum physical defense for STR scaling', 'Golden Amulet | LP boost accessory', 'Ribbon | Status immunity for support role'] },
            { char: 'Basch', jobs: ['Bushi', 'Black Mage'], espers: ['Famfrit'], role: 'Magic DPS', why: 'Bushi/Mage synergy. Katanas scale with MAG stat, optimized by Black Mage augments.', gambits: ['Self: HP < 90% → Bubble', 'Ally: Any → Berserk'], gear: ['Masamune | Katana with MAG scaling synergy', 'Black Robes | Maximizes magic and katana damage', 'Black Mask | Additional MAG boost', 'Genji Gloves | Essential 1.8x combo rate for katanas'] },
            { char: 'Ashe', jobs: ['Knight', 'Black Mage'], espers: ['Belias'], role: 'Paladin Flex', why: 'Mystic Armor synergy for boosted Excalibur and magic. Provides healing via Espers and strong magical DPS.', gambits: ['Ally: HP < 60% → Cura', 'Foe: Weak Holy → Attack (Excalibur)', 'Foe: Flying → Aeroga', 'Ally: Any → Protect', 'Foe: Nearest Visible → Attack'], gear: ['Excalibur | Holy-element sword with MAG scaling', 'Black Robes | 50% Holy damage boost for Excalibur', 'Crystal Shield | High magic defense shield', 'Bubble Belt | HP boost for survivability'] },
            { char: 'Penelo', jobs: ['White Mage', 'Shikari'], espers: ['Chaos', 'Cuchulainn'], role: 'Evasion Healer', why: 'Maximum-tier evasion via Main Gauche and Shields. Integrated with Hastega and Remedy Lore 3.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: Any Status → Remedy', 'Ally: HP < 70% → Curaga', 'Ally: HP Critical → Phoenix Down', 'Foe: Nearest Visible → Attack'], gear: ['Main Gauche | 50% evasion dagger for tanking', 'Crystal Shield | Best shield for evasion tank', 'Demon Shield | Alternative shield with immunities', 'Ribbon | Status immunity for healer role'] }
        ]
    },
    'DPS Nuclear': {
        shortName: 'Nuclear',
        desc: 'Maximum damage build. Optimized for boss killing.',
        metrics: { lp: 'B', atk: 'S', flex: 'B' },
        phase: 'mid',
        requirements: {
            availability: 'Mid to Late Game',
            unlocks: 'Most Espers unlocked - Requires significant LP investment.',
            criticalGear: [
                'Genji Gloves | Combo boost essential',
                'Berserk Bracers | Permanent Berserk status',
                'Dragon Whisker / Masamune | Top DPS weapons'
            ],
            keyEspers: ['Ultima/Zodiark (Swiftness)', 'Famfrit (Hastega)', 'Exodus (Channeling)'],
            recommendedLevel: 'Level 50+',
            notes: 'Genji Gloves are essential for all core DPS characters. Do not use with guns or bows.'
        },
        why: 'Built for pure offensive power. Sacrifices license efficiency (LP) to maximize Battle Lore stacking and STR-scaling. This build provides ~20% higher damage output compared to balanced builds at the cost of versatility.',
        parties: [
            { name: 'Offensive Strike', members: ['Vaan', 'Balthier', 'Fran'], why: 'Maximum damage output. A triple-Berserker setup is essential for offensive optimization.' },
            { name: 'High Endurance', members: ['Balthier', 'Fran', 'Penelo'], why: 'Sustained high-output damage. Includes a full break suite and evasion-based recovery.' },
            { name: 'Arcanist\'s Wrath', members: ['Ashe', 'Basch', 'Penelo'], why: 'Specialized for magick-vulnerable targets, delivering high-tier Arcane Magick damage.' }
        ],
        builds: [
            { char: 'Vaan', jobs: ['Bushi', 'Knight'], espers: ['Hashmal', 'Shemhazai'], role: 'Primary DPS', why: 'Optimized for physical combos and Holy-elemental dominance.', gambits: ['Self: HP < 90% → Bubble', 'Ally: Any → Berserk'], gear: ['Masamune | Katana with MAG scaling for Bushi', 'Grand Armor | Maximum physical defense', 'Genji Gloves | Essential 1.8x combo rate boost', 'Berserk Bracers | Permanent Berserk status'] },
            { char: 'Balthier', jobs: ['Monk', 'Foebreaker'], espers: ['Ultima', 'Zeromus', 'Zodiark'], role: 'Heavy DPS', why: 'Dual-Heavy synergy. Leverages all 16 Battle Lores for theoretical maximum physical damage.', gambits: ['Foe: HP ≥ 10000 → Expose', 'Foe: Status ≠ Shattered → Shear', 'Ally: Any → Berserk'], gear: ['Dragon Whisker | Highest damage pole weapon', 'Grand Armor | Maximum physical defense', 'Genji Gloves | Essential 1.8x combo rate for poles', 'Berserk Bracers | Permanent Berserk status'] },
            { char: 'Fran', jobs: ['Uhlan', 'Time Battlemage'], espers: ['Adrammelech', 'Famfrit', 'Belias'], role: 'Combat Utility', why: 'Primary Hastega source and Zodiac Spear use.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: Any → Bravery', 'Ally: Any → Faith', 'Foe: HP ≥ 10000 → Expose', 'Foe: Nearest Visible → Attack'], gear: ['Zodiac Spear | Best spear in the game', 'Grand Armor | Maximum physical defense', 'Golden Amulet | LP boost for progression', 'Bubble Belt | HP boost for endgame'] },
            { char: 'Basch', jobs: ['Knight', 'Black Mage'], espers: ['Mateus', 'Exodus'], role: 'Frontline Flex', why: 'Dual-role capability. Transitions between Holy Excalibur DPS and Arcane Magick support.', gambits: ['Foe: Weak Holy → Attack (Excalibur)', 'Foe: Flying → Aeroga', 'Foe: HP ≥ 10000 → Ardor', 'Ally: HP < 50% → Curaga', 'Foe: Nearest Visible → Attack'], gear: ['Excalibur | Holy-element sword with MAG scaling', 'Black Robes | Maximizes magic damage output', 'Grand Armor | Heavy armor for frontline durability', 'Demon Shield | High evasion with immunities'] },
            { char: 'Ashe', jobs: ['Black Mage', 'White Mage'], espers: ['Chaos'], role: 'Magick Carry', why: 'Ultimate Magick character. Synchronized Renew and Hastega output.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: HP Critical → Renew', 'Foe: Weak Element → -ga spell', 'Foe: HP ≥ 10000 → Scathe', 'Ally: HP < 60% → Curaja'], gear: ['Staff of the Magi | Best staff for magic power', 'Black Robes | Maximizes all magic damage', 'Circlet | MAG boost headgear', 'Sage\'s Ring | MP regeneration for casters'] },
            { char: 'Penelo', jobs: ['White Mage', 'Shikari'], espers: ['Cuchulainn'], role: 'Combat Healer', why: 'High-evasion healer designed for long fights and party stability.', gambits: ['Ally: Any Status → Remedy', 'Ally: HP < 70% → Curaga', 'Ally: HP Critical → Phoenix Down', 'Self: HP < 40% → Decoy', 'Foe: Nearest Visible → Attack'], gear: ['Main Gauche | 50% evasion dagger for survival', 'Crystal Shield | Best shield for evasion tank', 'Rubber Suit | Thunder immunity light armor', 'Ribbon | Status immunity for healer'] }
        ]
    },
    'Balanced': {
        shortName: 'Balanced',
        desc: 'Balanced build. High synergy with low risk.',
        metrics: { lp: 'S', atk: 'A', flex: 'S' },
        phase: 'early',
        requirements: {
            availability: 'Early Game',
            unlocks: 'Available from the start.',
            criticalGear: [
                'Main Gauche | Evasion base',
                'Genji Gloves | Combo boost'
            ],
            keyEspers: ['Chaos (Hastega)', 'Ultima (Swiftness)', 'Cuchulainn (Remedy Lore)'],
            recommendedLevel: 'Level 20+',
            notes: 'Flexible gear options. Strategy works well with store-bought equipment.'
        },
        why: 'The standard for first-time playthroughs. This build provides stability and smooth progression across all game phases. It avoids potential bottlenecks and offers comprehensive utility and healing.',
        parties: [
            { name: 'Trusted Companions', members: ['Vaan', 'Fran', 'Ashe'], why: 'A versatile trio covering all primary combat roles and essential magicks.' },
            { name: 'Stalwart Defenders', members: ['Balthier', 'Fran', 'Penelo'], why: 'A stable physical assault group, featuring an automated Berserker strategy and dedicated healing.' },
            { name: 'Blade Masters', members: ['Basch', 'Balthier', 'Fran'], why: 'High-damage physical assault with minimal interference.' }
        ],
        builds: [
            { char: 'Vaan', jobs: ['Red Battlemage', 'Knight'], espers: ['Mateus', 'Exodus'], role: 'Frontline Lead', why: 'Tactical versatilty. Reliable physical damage and early-game recovery magicks.', gambits: ['Ally: HP < 50% → Curaga', 'Ally: Status ≠ Protect → Protect', 'Self: HP < 40% → X-Potion', 'Foe: Nearest Visible → Attack'], gear: ['Excalibur | Holy-element sword with MAG scaling', 'Grand Armor | Best heavy armor for defense', 'Demon Shield | High evasion with immunities', 'Bubble Belt | HP boost for survivability'] },
            { char: 'Balthier', jobs: ['Foebreaker', 'Bushi'], espers: ['Hashmal', 'Shemhazai'], role: 'Berserker DPS', why: 'Bushi/Break synergy. High-mitigation offensive character with automated combat actions.', gambits: ['Foe: HP ≥ 10000 → Expose', 'Ally: Any → Berserk'], gear: ['Masamune | Katana with MAG scaling', 'Genji Gloves | Essential 1.8x combo rate for katanas', 'Berserk Bracers | Permanent Berserk status', 'Golden Amulet | LP boost for faster progression'] },
            { char: 'Fran', jobs: ['Monk', 'Time Battlemage'], espers: ['Ultima', 'Zeromus', 'Zodiark'], role: 'Combat Support', why: 'Highest utility density available. Core buff/debuff engine.', gambits: ['Ally: Status ≠ Haste → Haste', 'Ally: Any → Bravery', 'Ally: HP Critical → Renew', 'Foe: HP ≥ 10000 → Expose', 'Foe: Nearest Visible → Attack'], gear: ['Dragon Whisker | Highest damage pole weapon', 'Grand Armor | Maximum physical defense for STR scaling', 'Ribbon | Status immunity for support role', 'Bubble Belt | HP boost for survivability'] },
            { char: 'Basch', jobs: ['Archer', 'Uhlan'], espers: ['Adrammelech', 'Belias', 'Famfrit'], role: 'Heavy Assault', why: 'Linear weapon progression. High-STR automated physical assault.', gambits: ['Self: HP < 90% → Bubble', 'Ally: Any → Berserk'], gear: ['Zodiac Spear | Best spear in game', 'Perseus Bow | Best bow for ranged damage', 'Germinas Boots | Essential for bow damage boost', 'Berserk Bracers | Permanent Berserk status'] },
            { char: 'Ashe', jobs: ['Black Mage', 'White Mage'], espers: ['Chaos'], role: 'Strategic Magick', why: 'Primary magus character. Hastega and Arcane Magick prioritized.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: HP Critical → Renew', 'Ally: HP < 60% → Curaja', 'Foe: Flying → Aeroga', 'Foe: HP ≥ 10000 → Ardor'], gear: ['Staff of the Magi | Best staff for magic power', 'Black Robes | Maximizes all magic damage', 'Circlet | MAG boost headgear', 'Sage\'s Ring | MP regeneration for casters'] },
            { char: 'Penelo', jobs: ['White Mage', 'Shikari'], espers: ['Cuchulainn'], role: 'Combat Healer', why: 'Mitigation-heavy healer. Remedy Lore mastery is tactical requirement.', gambits: ['Ally: Any Status → Remedy', 'Ally: HP < 70% → Curaga', 'Ally: HP Critical → Phoenix Down', 'Self: HP < 40% → Decoy', 'Foe: Nearest Visible → Attack'], gear: ['Main Gauche | 50% evasion dagger for survival', 'Crystal Shield | Best shield for evasion tank', 'Demon Shield | Alternative shield with immunities', 'Ribbon | Status immunity for healer role'] }
        ]
    },
    'Leader Trinity': {
        shortName: 'Trinity',
        desc: 'Evasion-focused build. Optimized for leader tanking.',
        metrics: { lp: 'A', atk: 'A', flex: 'S' },
        phase: 'mid',
        requirements: {
            availability: 'Mid-Game',
            unlocks: 'Belias defeated - Vaan needs dual-job unlocked for evasion synergy.',
            criticalGear: [
                'Main Gauche | Evasion base',
                'Crystal Shield | Stacks with Main Gauche',
                'Ribbon | Status immunity',
                'Genji Gloves | DPS combo boost'
            ],
            keyEspers: ['Cuchulainn (Remedy Lore)', 'Ultima (Swiftness)', 'Chaos (Hastega)'],
            recommendedLevel: 'Level 35+',
            notes: 'Won\'t work without Main Gauche evasion stacking. Strategy relies on Party Lead dodging all physical attacks.'
        },
        why: 'Built around leader-targeting mechanics. This setup makes the party leader nearly untouchable via evasion stacking, letting support characters focus on offense. Ideal for technical players who understand positioning and threat management.',
        parties: [
            { name: 'Evasion Masters', members: ['Vaan', 'Fran', 'Ashe'], why: 'LEAD: Vaan (Evasion Tank). 90%+ evasion rating provides high stability.' },
            { name: 'Swift Assault', members: ['Vaan', 'Basch', 'Fran'], why: 'LEAD: Vaan (Evasion Tank). Offensive damage maximized through Berserker pairing.' },
            { name: 'Enduring Journey', members: ['Vaan', 'Ashe', 'Penelo'], why: 'LEAD: Vaan (Evasion Tank). Dual magic healers for long boss fights.' }
        ],
        builds: [
            { char: 'Vaan', jobs: ['Red Battlemage', 'Shikari'], espers: ['Cuchulainn', 'Mateus', 'Exodus'], role: 'Evasion Lead', why: 'Main Gauche + Shield synergy. Dodges nearly all physical attacks.', gambits: ['Self: HP < 70% → Decoy', 'Ally: Any Status → Remedy', 'Ally: HP < 50% → Curaga', 'Foe: Nearest Visible → Attack'], gear: ['Main Gauche | 50% evasion dagger for tank role', 'Crystal Shield | Best shield for evasion stacking', 'Demon Shield | Alternative shield with status immunities', 'Genji Armor | High defense for evasion build', 'Ribbon | Status immunity for lead position'] },
            { char: 'Balthier', jobs: ['Knight', 'Black Mage'], espers: ['Shemhazai', 'Hashmal'], role: 'Combat Magus', why: 'Evasion/Magick synergy. Leverages Holy Excalibur scaling with advanced Arcane Magick.', gambits: ['Foe: Weak Holy → Attack (Excalibur)', 'Foe: Undead → Holy', 'Foe: Flying → Aeroga', 'Ally: HP < 50% → Curaga', 'Foe: Nearest Visible → Attack'], gear: ['Excalibur | Holy-element sword with MAG scaling', 'Black Robes | Maximizes magic and Holy damage', 'Grand Armor | Heavy armor for frontline durability', 'Crystal Shield | High magic defense shield', 'Sage\'s Ring | MP regeneration for spell casting'] },
            { char: 'Fran', jobs: ['Monk', 'Time Battlemage'], espers: ['Ultima', 'Zeromus', 'Zodiark'], role: 'Utility Engine', why: 'Buff and debuff specialist. Primary source of Expose and Reverse.', gambits: ['Ally: Status ≠ Haste → Haste', 'Ally: Any → Bravery', 'Ally: HP Critical → Renew', 'Foe: HP ≥ 10000 → Expose', 'Foe: Nearest Visible → Attack'], gear: ['Dragon Whisker | Highest damage pole weapon', 'Grand Armor | Maximum physical defense for STR scaling', 'Ribbon | Status immunity for support role', 'Golden Amulet | LP boost for faster progression'] },
            { char: 'Basch', jobs: ['Bushi', 'Knight'], espers: ['Famfrit'], role: 'Primary DPS', why: 'Swiftness 3 optimized Berserker for maximum damage.', gambits: ['Self: HP = 100% → Berserk', 'Self: HP < 90% → Bubble', '(Primary: Auto-attack mode)'], gear: ['Masamune | Katana with MAG scaling for Bushi', 'Genji Gloves | Essential 1.8x combo rate for katanas', 'Berserk Bracers | Permanent Berserk status', 'Bubble Belt | HP boost for survivability'] },
            { char: 'Ashe', jobs: ['Black Mage', 'White Mage'], espers: ['Chaos'], role: 'Magick Support', why: 'Complete magic caster. Access to all schools including Hastega and Renew.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: HP Critical → Renew', 'Ally: HP < 60% → Curaja', 'Foe: Weak Element → -ga spell', 'Foe: HP ≥ 10000 → Scathe'], gear: ['Staff of the Magi | Best staff for magic power', 'Black Robes | Maximizes all magic damage', 'Circlet | MAG boost headgear', 'Sage\'s Ring | MP regeneration for casters'] },
            { char: 'Penelo', jobs: ['White Mage', 'Archer'], espers: ['Belias', 'Adrammelech'], role: 'Logistic Support', why: 'Item-based healer. Phoenix Down and Potion Lore pairing for instant recovery.', gambits: ['Ally: HP Critical → Phoenix Down', 'Ally: HP < 70% → Hi-Potion', 'Ally: Any Status → Echo Herbs/Eye Drops', 'Ally: HP < 90% → Potion', 'Foe: Nearest Visible → Attack'], gear: ['Burning Bow | Fire-element bow for weaknesses', 'Perseus Bow | Best bow for ranged damage', 'White Robes | Healing power boost', 'Opal Ring | Dark/Thunder immunity accessory'] }
        ]
    },
    'Yiazmat Specialist': {
        shortName: 'Endurance',
        desc: 'Endurance build. Designed for multi-hour superboss fights.',
        metrics: { lp: 'B', atk: 'S', flex: 'C' },
        phase: 'late',
        isSequential: true,
        requirements: {
            availability: 'Endgame Only',
            unlocks: 'All Espers unlocked - Getting max-tier equipment is essential.',
            criticalGear: [
                'Yagyu Darkblade | Dark-element ninja sword',
                'Black Robes | 50% Dark damage boost',
                'Genji Gloves | Combo rate boost',
                'Ribbon | Status immunity',
                'Bubble Belt | HP threshold survival'
            ],
            keyEspers: ['Ultima/Zodiark (Swiftness)', 'Famfrit/Zeromus (Channeling/Hastega)', 'Chaos (Renew/Hastega)'],
            recommendedLevel: 'Level 70+',
            notes: 'Yiazmat is Dark-weak. Primary strategy: Berserked Yagyu Darkblade with Black Robes (50% Dark boost). Multi-hour fight requires all 6 characters rotating through stages.'
        },
        why: 'Built exclusively for Dark-weak superbosses like Yiazmat. Primary DPS: Berserked Penelo with Dark-boosted Yagyu Darkblade exploiting weakness. Support cast provides Hastega, Reverse, Expose, and infinite MP regeneration through rotation cycles. Not optimized for general use.',
        parties: [
            { name: 'Stage 1: Dark Assault', members: ['Penelo', 'Fran', 'Ashe'], why: 'PRIMARY DAMAGE PHASE. Penelo (Berserked Yagyu Darkblade + Black Robes) exploits Dark weakness. Fran provides Hastega/Expose. Ashe is full-time healer (Renew/Hastega/Curaja). Rotate out when MP depletes.' },
            { name: 'Stage 2: Relief Rotation', members: ['Balthier', 'Vaan', 'Basch'], why: 'RECOVERY PHASE. Balthier (Dragon Whisker) + Basch (bow/spear) maintain pressure while Stage 1 recovers. Vaan provides backup healing. Balthier applies full Break suite for next rotation.' },
            { name: 'Stage 3: Sustained Endurance', members: ['Penelo', 'Ashe', 'Balthier'], why: 'MARATHON PHASE. Returns Penelo (primary DPS) with dual support - Ashe (primary healer) and Balthier (Expose/Breaks/backup DPS). For extended final phases and boss patience wars.' }
        ],
        builds: [
            { char: 'Penelo', jobs: ['White Mage', 'Shikari'], espers: ['Cuchulainn', 'Exodus'], role: 'Primary DPS', why: 'CORE STRATEGY: Berserked Yagyu Darkblade + Black Robes = 50% Dark damage boost exploiting Yiazmat\'s weakness. Highest DPS for this fight. Cannot cast magic while Berserked - Ashe handles all healing.', gambits: ['Self: HP = 100% → Berserk', 'Self: HP < 90% → Bubble', '(Remove other gambits - Berserk mode)'], gear: ['Yagyu Darkblade | Dark-element ninja sword for weakness', 'Black Robes | 50% Dark damage boost essential', 'Genji Gloves | 1.8x combo rate for ninja swords', 'Germinas Boots | Speed boost for DPS', 'Bubble Belt | HP threshold for survivability'] },
            { char: 'Fran', jobs: ['Monk', 'Time Battlemage'], espers: ['Ultima', 'Zeromus', 'Famfrit'], role: 'Trinity Support', why: 'CRITICAL TRINITY NODE: Swiftness 3 (Ultima) + Channeling 3 (Zeromus) + Hastega (Famfrit). Provides Expose (Monk), Hastega, and infinite MP regeneration. Dragon Whisker backup DPS.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Foe: Yiazmat → Expose', 'Ally: Any → Bravery', 'Self: HP < 90% → Bubble', 'Foe: Nearest Visible → Attack'], gear: ['Dragon Whisker | Non-elemental pole for backup DPS', 'Grand Armor | Maximum physical defense for STR scaling', 'Genji Gloves | Combo boost for poles', 'Ribbon | Status immunity for long fight', 'Bubble Belt | HP threshold survival'] },
            { char: 'Ashe', jobs: ['Black Mage', 'White Mage'], espers: ['Chaos'], role: 'Primary Healer', why: 'FULL-TIME HEALER: Hastega + Renew + all healing magic. Penelo cannot cast while Berserked, making Ashe the sole healer. Chaos provides both Hastega (White Mage) and Renew (Black Mage).', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: HP < 10% → Reverse', 'Ally: HP Critical → Renew', 'Ally: HP < 60% → Curaja', 'Foe: Yiazmat → Bio'], gear: ['Staff of the Magi | Best staff for magic power', 'White Robes | Maximizes healing output', 'Circlet | MAG boost for healing', 'Sage\'s Ring | MP regeneration for marathon healing', 'Bubble Belt | HP boost for survival'] },
            { char: 'Balthier', jobs: ['Monk', 'Foebreaker'], espers: ['Zodiark'], role: 'Break Specialist', why: 'Full Break suite (Expose, Shear, Wither, Addle) maximizes party DPS. Zodiark provides Renew (Monk) for backup healing. Dragon Whisker provides strong non-elemental DPS during relief rotation.', gambits: ['Foe: Yiazmat → Expose', 'Foe: Status ≠ Shattered → Shear', 'Foe: Status ≠ Wither → Wither', 'Foe: Status ≠ Addle → Addle', 'Self: HP < 90% → Bubble'], gear: ['Dragon Whisker | Non-elemental pole for relief DPS', 'Grand Armor | Maximum physical defense', 'Genji Gloves | Combo boost for poles', 'Ribbon | Status immunity essential', 'Bubble Belt | HP threshold survival'] },
            { char: 'Vaan', jobs: ['Red Battlemage', 'Knight'], espers: ['Mateus', 'Hashmal'], role: 'Relief Support', why: 'Backup healing and support during relief rotation. Red Battlemage provides Cura/Curaga when Ashe needs MP recovery. Knight gives Heavy Armor for durability.', gambits: ['Ally: HP < 50% → Curaga', 'Ally: Status ≠ Protect → Protect', 'Self: HP < 90% → Bubble', 'Foe: Nearest Visible → Attack'], gear: ['Excalibur | Holy-element sword (off-element but available)', 'Grand Armor | Maximum physical defense', 'Demon Shield | High evasion with immunities', 'Ribbon | Status immunity', 'Bubble Belt | HP survival threshold'] },
            { char: 'Basch', jobs: ['Archer', 'Uhlan'], espers: ['Adrammelech', 'Belias', 'Shemhazai'], role: 'Ranged Support', why: 'Safe ranged attacks from distance. Provides backup physical DPS during relief phases. Uhlan adds spear versatility. Heavy Armor from espers for durability.', gambits: ['Foe: Yiazmat → Attack', 'Self: HP < 90% → Bubble', 'Ally: Any → Bravery', 'Foe: HP ≥ 10000 → Expose'], gear: ['Perseus Bow | Best bow for ranged damage', 'Zodiac Spear | Alternative spear option', 'Grand Armor | Physical defense from espers', 'Ribbon | Status immunity', 'Bubble Belt | HP threshold'] }
        ]
    },
    'Lore Friendly': {
        shortName: 'Lore',
        desc: 'Story-based build. Matches character archetypes with strong job pairings.',
        metrics: { lp: 'B', atk: 'B', flex: 'S' },
        phase: 'early',
        requirements: {
            availability: 'Early Game',
            unlocks: 'Available from the start.',
            criticalGear: [
                'Main Gauche | Street thief signature',
                'Fomalhaut | Sky pirate signature',
                'Perseus Bow | Viera archer signature',
                'Grand Armor | Royal guard signature'
            ],
            keyEspers: ['Chaos/Exodus (Channeling)', 'Famfrit (Hastega)', 'Ultima (Swiftness)'],
            recommendedLevel: 'Level 20+',
            notes: 'Maintains story roles while providing strong performance.'
        },
        why: 'Pairs character archetypes with strong job combos. This setup respects story-based weapon choices (Balthier/Guns, Fran/Bows) while still performing well.',
        parties: [
            { name: 'Protagonist Trio', members: ['Vaan', 'Balthier', 'Fran'], why: 'Story-focused team. Balanced defense, ranged damage, and support.' },
            { name: 'Kingdom Defense', members: ['Basch', 'Ashe', 'Penelo'], why: 'Royal guard team. Strong defense with magic support.' },
            { name: 'Tactical Versatilty', members: ['Fran', 'Ashe', 'Penelo'], why: 'Utility-focused team. Covers all buffs and healing.' }
        ],
        builds: [
            { char: 'Vaan', jobs: ['Shikari', 'Knight'], espers: ['Cuchulainn', 'Hashmal'], role: 'Evasion Lead', why: 'Signature thief-tank. Effectively combines Main Gauche evasion with high-tier item support.', gambits: ['Self: HP < 70% → Decoy', 'Ally: Any Status → Remedy', 'Ally: Any → Bravery', 'Self: HP < 40% → X-Potion', 'Foe: Nearest Visible → Attack'], gear: ['Main Gauche | 50% evasion dagger for street thief', 'Crystal Shield | Best shield for evasion stacking', 'Demon Shield | Alternative shield with immunities', 'Genji Armor | High defense for evasion build', 'Ribbon | Status immunity for lead position'] },
            { char: 'Balthier', jobs: ['Machinist', 'Foebreaker'], espers: ['Zeromus', 'Adrammelech'], role: 'Tactical Lead', why: 'Sky pirate gun specialist. Pairs guns with full Break suite.', gambits: ['Foe: HP ≥ 10000 → Expose', 'Foe: Status ≠ Shattered → Shear', 'Foe: Flying → Dark Shot', 'Foe: HP ≥ 5000 → Telekinesis', 'Foe: Nearest Visible → Attack'], gear: ['Fomalhaut | Best gun for sky pirate signature', 'Aldebaran | Backup high-damage gun', 'Heavy Armor | Physical defense for frontline', 'Golden Amulet | LP boost for progression'] },
            { char: 'Fran', jobs: ['Archer', 'Time Battlemage'], espers: ['Famfrit', 'Shemhazai'], role: 'Mystic Support', why: 'Viera archer build. Pairs bows with time magic and buffs.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: Any → Bravery', 'Ally: Any → Faith', 'Foe: HP ≥ 10000 → Expose', 'Foe: Nearest Visible → Attack'], gear: ['Perseus Bow | Best bow for Viera archer signature', 'Burning Bow | Fire-element bow for weaknesses', 'Black Robes | Boosts magic damage', 'Ribbon | Status immunity for support role'] },
            { char: 'Basch', jobs: ['Knight', 'Foebreaker'], espers: ['Mateus', 'Zodiark'], role: 'Frontline Shield', why: 'Royal knight and guard. Strong defense with Break abilities.', gambits: ['Foe: HP ≥ 10000 → Expose', 'Ally: Status ≠ Haste → Hastega', 'Ally: HP < 50% → Curaga', 'Ally: Status ≠ Protect → Protect', 'Foe: Nearest Visible → Attack'], gear: ['Excalibur | Holy-element sword for royal knight', 'Grand Armor | Maximum defense for royal guard', 'Crystal Shield | High defense shield', 'Bubble Belt | HP boost for survivability'] },
            { char: 'Ashe', jobs: ['Black Mage', 'White Mage'], espers: ['Chaos', 'Exodus'], role: 'Apex Magus', why: 'Princess mage. Access to all magic schools.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: HP Critical → Renew', 'Ally: HP < 60% → Curaja', 'Foe: Weak Element → -ga spell', 'Foe: HP ≥ 10000 → Scathe'], gear: ['Staff of the Magi | Best staff for princess mage', 'Black Robes | Maximizes all magic damage', 'Circlet | MAG boost headgear for royalty', 'Sage\'s Ring | MP regeneration for casters'] },
            { char: 'Penelo', jobs: ['White Mage', 'Monk'], espers: ['Ultima', 'Belias'], role: 'Logistic Magus', why: 'Fast healer. Combines Potion Lore with strong physical backup.', gambits: ['Ally: HP < 70% → Curaga', 'Ally: HP Critical → Phoenix Down', 'Ally: Any Status → Esuna', 'Ally: HP < 90% → Hi-Potion', 'Foe: Nearest Visible → Attack'], gear: ['Dragon Whisker | Highest damage pole weapon', 'White Robes | Healing power boost', 'Kanya (Pole) | Alternative pole for Monk', 'Opal Ring | Dark/Thunder immunity accessory'] }
        ]
    }
};

// Preset Icon Mapping
const PRESET_ICONS = {
    'First Jobs': 'Beginner',
    'Max Efficiency': 'Efficiency',
    'DPS Nuclear': 'Nuclear',
    'Balanced': 'Beginner',
    'Leader Trinity': 'Trinity',
    'Yiazmat Specialist': 'Endurance',
    'Lore Friendly': 'Lore'
};

