const PRESETS = {
    'Max Efficiency': {
        shortName: 'Efficiency',
        desc: 'Zero-redundancy configuration. Refined for total license synergy.',
        metrics: { lp: 98, atk: 85, flex: 90 },
        phase: 'mid',
        requirements: {
            availability: 'Mid-Game Phase',
            unlocks: 'Belias Defeated (Mt Bur-Omisace) - Dual-job authorization required.',
            criticalGear: [
                'Main Gauche [PRIORITY: ALPHA - Evasion Mastery]',
                'Genji Gloves [PRIORITY: ALPHA - Combo Optimization]'
            ],
            keyEspers: ['Exodus/Zeromus (Channeling)', 'Ultima/Zodiark (Swiftness/Renew)', 'Chaos (Hastega)'],
            recommendedLevel: 'Level 40-50',
            notes: 'Optimization depends on dual-job unlocks. Single-job deployment significantly degrades efficiency metrics.'
        },
        why: 'Refined for dedicated completionists. This configuration ensures near-zero license overlap, maximizing the utility of every spent License Point. It facilitates rapid endgame scaling by providing early access to critical augments and Swiftness tiers across the primary rotation.',
        parties: [
            { name: 'Core Party', members: ['Vaan', 'Fran', 'Penelo'], why: 'Balanced adventuring group. High-tier evasion tanking paired with Renew/Hastega support.' },
            { name: 'Frontline Vanguard', members: ['Balthier', 'Basch', 'Fran'], why: 'Prioritizes raw physical damage. Includes full Break suite and specialized Berserker combat strategy.' },
            { name: 'Sustained Relief', members: ['Fran', 'Penelo', 'Balthier'], why: 'Formed for sustained engagements. Dual-channeling Renew and full status mitigation.' }
        ],
        builds: [
            { char: 'Vaan', jobs: ['Red Battlemage', 'Knight'], espers: ['Mateus', 'Exodus'], role: 'Frontline Lead', why: 'Heavy Armor synergy. Provides critical buffs and high-tier physical mitigation.', gambits: ['Ally: HP < 50% → Curaga', 'Self: HP < 40% → X-Potion', 'Ally: Status ≠ Protect → Protect', 'Foe: Nearest Visible → Attack'], gear: ['Excalibur', 'Grand Armor', 'Demon Shield', 'Rose Corsage'] },
            { char: 'Balthier', jobs: ['Foebreaker', 'Uhlan'], espers: ['Adrammelech', 'Shemhazai', 'Hashmal'], role: 'Heavy Artillery', why: 'Maximum STR-stat utilization. Zero Mystic Armor overlap. Optimized for Heavy Armor and Spear progression.', gambits: ['Foe: HP ≥ 10000 → Expose', 'Foe: Status ≠ Shattered → Shear', 'Foe: Status ≠ Wither → Wither', 'Foe: Nearest Visible → Attack'], gear: ['Holy Lance', 'Grand Armor', 'Zodiac Spear', 'Genji Gloves'] },
            { char: 'Fran', jobs: ['Monk', 'Time Battlemage'], espers: ['Ultima', 'Zeromus', 'Zodiark'], role: 'Tactical Support', why: 'Critical Trinity Node: Swiftness 3, Channeling 3, and Renew access.', gambits: ['Ally: Status ≠ Haste → Haste', 'Ally: Any → Bravery', 'Ally: HP Critical → Renew', 'Foe: HP ≥ 10000 → Expose', 'Foe: Nearest Visible → Attack'], gear: ['Kanya (Pole)', 'Black Robes', 'Golden Amulet', 'Ribbon'] },
            { char: 'Basch', jobs: ['Bushi', 'Black Mage'], espers: ['Famfrit'], role: 'Magic DPS', why: 'Bushi/Mage synergy. Katanas scale with MAG stat, optimized by Black Mage augments.', gambits: ['Self: HP = 100% → Berserk', 'Self: HP < 90% → Bubble', '(Primary: Automatic Physical Engagement)'], gear: ['Masamune', 'Black Robes', 'Black Mask', 'Genji Gloves'] },
            { char: 'Ashe', jobs: ['Knight', 'Time Battlemage'], espers: ['Belias'], role: 'Paladin Flex', why: 'Heavy Armor plus high-tier White Magic support. Minimal license redundancy.', gambits: ['Ally: HP < 60% → Cura', 'Ally: Status ≠ Haste → Haste', 'Ally: Any → Protect', 'Foe: Nearest Visible → Attack'], gear: ['Excalibur', 'Grand Armor', 'Crystal Shield', 'Bubble Belt'] },
            { char: 'Penelo', jobs: ['White Mage', 'Shikari'], espers: ['Chaos', 'Cuchulainn'], role: 'Evasion Healer', why: 'Maximum-tier evasion via Main Gauche and Shields. Integrated with Hastega and Remedy Lore 3.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: Any Status → Remedy', 'Ally: HP < 70% → Curaga', 'Ally: HP Critical → Phoenix Down', 'Foe: Nearest Visible → Attack'], gear: ['Main Gauche', 'Crystal Shield', 'Demon Shield', 'Ribbon'] }
        ]
    },
    'DPS Nuclear': {
        shortName: 'Nuclear',
        desc: 'Maximum lethality matrix. Optimized for apex-target elimination.',
        metrics: { lp: 75, atk: 99, flex: 70 },
        phase: 'mid',
        requirements: {
            availability: 'Intermediary to Late Game',
            unlocks: 'Advanced Esper Clearance - Anticipate significant LP investment.',
            criticalGear: [
                'Genji Gloves [PRIORITY: ALPHA - Combo Threshold]',
                'Berserk Bracers [PRIORITY: ALPHA - Offensive Automation]',
                'Dragon Whisker / Masamune [PRIORITY: ALPHA - Apex DPS]'
            ],
            keyEspers: ['Ultima/Zodiark (Swiftness)', 'Famfrit (Hastega)', 'Exodus (Channeling)'],
            recommendedLevel: 'Level 60+',
            notes: 'Genji Gloves are [STATUS: ESSENTIAL] for all core DPS characters. Do not use with firearms or long-range ballistic protocols.'
        },
        why: 'Developed for supreme offensive dominance. Sacrifices license efficiency (LP) to maximize Battle Lore accumulation and STR-scaling. This configuration provides ~20% higher damage output compared to efficiency-focused builds at the cost of combat versatility.',
        parties: [
            { name: 'Offensive Strike', members: ['Vaan', 'Balthier', 'Fran'], why: 'Maximum damage output. A triple-Berserker setup [STATUS: ESSENTIAL] for offensive optimization.' },
            { name: 'High Endurance', members: ['Balthier', 'Fran', 'Penelo'], why: 'Sustained high-output damage. Includes a full break suite and evasion-based recovery.' },
            { name: 'Arcanist\'s Wrath', members: ['Ashe', 'Basch', 'Penelo'], why: 'Specialized for magick-vulnerable targets, delivering high-tier Arcane Magick damage.' }
        ],
        builds: [
            { char: 'Vaan', jobs: ['Bushi', 'Knight'], espers: ['Hashmal', 'Shemhazai'], role: 'Primary DPS', why: 'Optimized for physical combos and Holy-elemental dominance.', gambits: ['Self: HP = 100% → Berserk', 'Self: HP < 90% → Bubble', '(Active: Physical engagement)'], gear: ['Masamune', 'Holy Lance', 'Genji Gloves', 'Berserk Bracers'] },
            { char: 'Balthier', jobs: ['Monk', 'Foebreaker'], espers: ['Ultima', 'Zeromus', 'Zodiark'], role: 'Heavy DPS', why: 'Dual-Heavy synergy. Leverages all 16 Battle Lores for theoretical maximum physical damage.', gambits: ['Foe: HP ≥ 10000 → Expose', 'Foe: Status ≠ Shattered → Shear', 'Self: HP = 100% → Berserk', 'Foe: Nearest Visible → Attack'], gear: ['Dragon Whisker', 'Grand Armor', 'Genji Gloves', 'Berserk Bracers'] },
            { char: 'Fran', jobs: ['Uhlan', 'Time Battlemage'], espers: ['Adrammelech', 'Famfrit', 'Belias'], role: 'Combat Utility', why: 'Primary Hastega source and Zodiac Spear use.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: Any → Bravery', 'Ally: Any → Faith', 'Foe: HP ≥ 10000 → Expose', 'Foe: Nearest Visible → Attack'], gear: ['Zodiac Spear', 'Dragon Mail', 'Golden Amulet', 'Bubble Belt'] },
            { char: 'Basch', jobs: ['Knight', 'Black Mage'], espers: ['Mateus', 'Exodus'], role: 'Frontline Flex', why: 'Dual-role capability. Transitions between Holy Excalibur DPS and Arcane Magick support.', gambits: ['Foe: Weak Holy → Attack (Excalibur)', 'Foe: Flying → Aeroga', 'Foe: HP ≥ 10000 → Ardor', 'Ally: HP < 50% → Curaga', 'Foe: Nearest Visible → Attack'], gear: ['Excalibur', 'Black Robes', 'Grand Armor', 'Demon Shield'] },
            { char: 'Ashe', jobs: ['Black Mage', 'White Mage'], espers: ['Chaos'], role: 'Magick Carry', why: 'Ultimate Magick character. Synchronized Renew and Hastega output.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: HP Critical → Renew', 'Foe: Weak Element → -ga spell', 'Foe: HP ≥ 10000 → Scathe', 'Ally: HP < 60% → Curaja'], gear: ['Staff of the Magi', 'Black Robes', 'Circlet', 'Sage\'s Ring'] },
            { char: 'Penelo', jobs: ['White Mage', 'Shikari'], espers: ['Cuchulainn'], role: 'Combat Healer', why: 'High-evasion survival character designed for sustained engagement stabilization.', gambits: ['Ally: Any Status → Remedy', 'Ally: HP < 70% → Curaga', 'Ally: HP Critical → Phoenix Down', 'Self: HP < 40% → Decoy', 'Foe: Nearest Visible → Attack'], gear: ['Main Gauche', 'Crystal Shield', 'Rubber Suit', 'Ribbon'] }
        ]
    },
    'Beginner Friendly': {
        shortName: 'Beginner',
        desc: 'Balanced stabilization matrix. High-synergy/Low-risk configuration.',
        metrics: { lp: 88, atk: 80, flex: 95 },
        phase: 'early',
        requirements: {
            availability: 'Standard Early-Game',
            unlocks: 'Universal Authorization - Operational from Phase 1.',
            criticalGear: [
                'Main Gauche [PRIORITY: ALPHA - Evasion Base]',
                'Genji Gloves [PRIORITY: ALPHA - Combo Entry]'
            ],
            keyEspers: ['Chaos (Hastega)', 'Ultima (Swiftness)', 'Cuchulainn (Remedy Lore)'],
            recommendedLevel: 'Level 1+',
            notes: 'High tolerance for gear substitution. Primary strategy remains effective with standard equipment.'
        },
        why: 'The standard for first-time adventures. This configuration provides high stability and smooth progression across all game phases. It minimizes potential bottlenecks and offers a comprehensive suite of utility and healing.',
        parties: [
            { name: 'Trusted Companions', members: ['Vaan', 'Fran', 'Ashe'], why: 'A versatile trio covering all primary combat roles and essential magicks.' },
            { name: 'Stalwart Defenders', members: ['Balthier', 'Fran', 'Penelo'], why: 'A stable physical assault group, featuring an automated Berserker strategy and dedicated healing.' },
            { name: 'Blade Masters', members: ['Basch', 'Balthier', 'Fran'], why: 'High-damage physical assault with minimal interference.' }
        ],
        builds: [
            { char: 'Vaan', jobs: ['Red Battlemage', 'Knight'], espers: ['Mateus', 'Exodus'], role: 'Frontline Lead', why: 'Tactical versatilty. Reliable physical damage and early-game recovery magicks.', gambits: ['Ally: HP < 50% → Curaga', 'Ally: Status ≠ Protect → Protect', 'Self: HP < 40% → X-Potion', 'Foe: Nearest Visible → Attack'], gear: ['Excalibur', 'Grand Armor', 'Demon Shield', 'Flex: All available'] },
            { char: 'Balthier', jobs: ['Foebreaker', 'Bushi'], espers: ['Hashmal', 'Shemhazai'], role: 'Berserker DPS', why: 'Bushi/Break synergy. High-mitigation offensive character with automated combat actions.', gambits: ['Foe: HP ≥ 10000 → Expose', 'Self: HP = 100% → Berserk', '(Active: Automated Engagement)'], gear: ['Masamune', 'Genji Gloves', 'Berserk Bracers', 'Golden Amulet'] },
            { char: 'Fran', jobs: ['Monk', 'Time Battlemage'], espers: ['Ultima', 'Zeromus', 'Zodiark'], role: 'Combat Support', why: 'Highest utility density available. Core buff/debuff engine.', gambits: ['Ally: Status ≠ Haste → Haste', 'Ally: Any → Bravery', 'Ally: HP Critical → Renew', 'Foe: HP ≥ 10000 → Expose', 'Foe: Nearest Visible → Attack'], gear: ['Kanya (Pole)', 'Black Robes', 'Ribbon', 'Bubble Belt'] },
            { char: 'Basch', jobs: ['Archer', 'Uhlan'], espers: ['Adrammelech', 'Belias', 'Famfrit'], role: 'Heavy Assault', why: 'Linear weapon progression. High-STR automated physical assault.', gambits: ['Self: HP = 100% → Berserker', 'Self: HP < 90% → Bubble', '(Primary: Automatic Physical Engagement)'], gear: ['Zodiac Spear', 'Perseus Bow', 'Genji Gloves', 'Berserk Bracers'] },
            { char: 'Ashe', jobs: ['Black Mage', 'White Mage'], espers: ['Chaos'], role: 'Strategic Magick', why: 'Primary magus character. Hastega and Arcane Magick prioritized.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: HP Critical → Renew', 'Ally: HP < 60% → Curaja', 'Foe: Flying → Aeroga', 'Foe: HP ≥ 10000 → Ardor'], gear: ['Staff of the Magi', 'Black Robes', 'Circlet', 'Sage\'s Ring'] },
            { char: 'Penelo', jobs: ['White Mage', 'Shikari'], espers: ['Cuchulainn'], role: 'Combat Healer', why: 'Mitigation-heavy healer. Remedy Lore mastery is tactical requirement.', gambits: ['Ally: Any Status → Remedy', 'Ally: HP < 70% → Curaga', 'Ally: HP Critical → Phoenix Down', 'Self: HP < 40% → Decoy', 'Foe: Nearest Visible → Attack'], gear: ['Main Gauche', 'Crystal Shield', 'Demon Shield', 'Ribbon'] }
        ]
    },
    'Leader Trinity': {
        shortName: 'Trinity',
        desc: 'Avoidance-centric tactical build. Optimized for Lead-Aggro management.',
        metrics: { lp: 92, atk: 82, flex: 88 },
        phase: 'mid',
        requirements: {
            availability: 'Mid-Game Operations',
            unlocks: 'Belias Clearance - Vaan requires full dual-job authorization for evasion synergy.',
            criticalGear: [
                'Main Gauche [ASSERT: CRITICAL - Evasion Base]',
                'Crystal Shield [ASSERT: CRITICAL - Avoidance Stacking]',
                'Ribbon [ASSERT: CRITICAL - Status Mitigation]',
                'Genji Gloves [ASSERT: CRITICAL - DPS Combo]'
            ],
            keyEspers: ['Cuchulainn (Remedy Lore)', 'Ultima (Swiftness)', 'Chaos (Hastega)'],
            recommendedLevel: 'Level 45+',
            notes: 'Tactical failure imminent without Main Gauche evasion stacking. Strategy is contingent on Party Lead avoiding all physical engagement.'
        },
        why: 'Engineered around Lead-Targeting mechanics. This configuration makes the party leader nearly untouchable via Evasion maximization, allowing support characters to focus on offensive output. Ideal for technical players who understand environmental positioning and threat management.',
        parties: [
            { name: 'Evasion Masters', members: ['Vaan', 'Fran', 'Ashe'], why: 'LEAD: Vaan (Evasion Tank). Tactical evasion rating: 90%+. Provides high stability.' },
            { name: 'Swift Assault', members: ['Vaan', 'Basch', 'Fran'], why: 'LEAD: Vaan (Evasion Tank). Offensive damage maximized through Berserker synchronization.' },
            { name: 'Enduring Journey', members: ['Vaan', 'Ashe', 'Penelo'], why: 'LEAD: Vaan (Evasion Tank). Dual-magick recovery suite for high-duration encounters.' }
        ],
        builds: [
            { char: 'Vaan', jobs: ['Red Battlemage', 'Shikari'], espers: ['Cuchulainn', 'Mateus', 'Exodus'], role: 'Evasion Lead', why: 'Main Gauche + Shield synergy. Effectively mitigates all standard physical engagement.', gambits: ['Self: HP < 70% → Decoy', 'Ally: Any Status → Remedy', 'Ally: HP < 50% → Curaga', 'Foe: Nearest Visible → Attack'], gear: ['Main Gauche', 'Crystal Shield', 'Demon Shield', 'Genji Armor', 'Ribbon'] },
            { char: 'Balthier', jobs: ['Knight', 'Black Mage'], espers: ['Shemhazai', 'Hashmal'], role: 'Combat Magus', why: 'Evasion/Magick synergy. Leverages Holy Excalibur scaling with advanced Arcane Magick.', gambits: ['Foe: Weak Holy → Attack (Excalibur)', 'Foe: Undead → Holy', 'Foe: Flying → Aeroga', 'Ally: HP < 50% → Curaga', 'Foe: Nearest Visible → Attack'], gear: ['Excalibur', 'Black Robes', 'Grand Armor', 'Crystal Shield', 'Sage\'s Ring'] },
            { char: 'Fran', jobs: ['Monk', 'Time Battlemage'], espers: ['Ultima', 'Zeromus', 'Zodiark'], role: 'Utility Engine', why: 'Buffer/Debuffer core. Primary Expose and Reverse synchronization source.', gambits: ['Ally: Status ≠ Haste → Haste', 'Ally: Any → Bravery', 'Ally: HP Critical → Renew', 'Foe: HP ≥ 10000 → Expose', 'Foe: Nearest Visible → Attack'], gear: ['Kanya (Pole)', 'Black Robes', 'Ribbon', 'Golden Amulet'] },
            { char: 'Basch', jobs: ['Bushi', 'Knight'], espers: ['Famfrit'], role: 'Primary DPS', why: 'Swiftness 3 optimized Berserker. High-throughput physical engagement.', gambits: ['Self: HP = 100% → Berserk', 'Self: HP < 90% → Bubble', '(Primary: Automated Physical Engagement)'], gear: ['Masamune', 'Genji Gloves', 'Berserker Bracers', 'Bubble Belt'] },
            { char: 'Ashe', jobs: ['Black Mage', 'White Mage'], espers: ['Chaos'], role: 'Magick Support', why: 'Apex magick character. Universal School authorization including Hastega and Renew.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: HP Critical → Renew', 'Ally: HP < 60% → Curaja', 'Foe: Weak Element → -ga spell', 'Foe: HP ≥ 10000 → Scathe'], gear: ['Staff of the Magi', 'Black Robes', 'Circlet', 'Sage\'s Ring'] },
            { char: 'Penelo', jobs: ['White Mage', 'Archer'], espers: ['Belias', 'Adrammelech'], role: 'Logistic Support', why: 'Item-based recovery specialist. Phoenix Down and Potion Lore synchronization for instant stabilization.', gambits: ['Ally: HP Critical → Phoenix Down', 'Ally: HP < 70% → Hi-Potion', 'Ally: Any Status → Echo Herbs/Eye Drops', 'Ally: HP < 90% → Potion', 'Foe: Nearest Visible → Attack'], gear: ['Burning Bow', 'Perseus Bow', 'White Robes', 'Opal Ring'] }
        ]
    },
    'Yiazmat Specialist': {
        shortName: 'Endurance',
        desc: 'Apex Endurance Configuration. Designed for high-duration/High-HP engagements.',
        metrics: { lp: 70, atk: 95, flex: 60 },
        phase: 'late',
        requirements: {
            availability: 'Apex Endgame Only',
            unlocks: 'Total Esper Clearance - Max-tier equipment procurement [STATUS: ESSENTIAL].',
            criticalGear: [
                'Fomalhaut [PRIORITY: ALPHA - Dark Shot synergy]',
                'Ribbon [PRIORITY: ALPHA - Confusion Mitigation]',
                'Bubble Belt [PRIORITY: ALPHA - HP Threshold]',
                'Genji Gloves [PRIORITY: ALPHA - Combo Mastery]',
                'Grand Armor [PRIORITY: ALPHA - Mitigation Peak]'
            ],
            keyEspers: ['Ultima/Zodiark (Swiftness)', 'Famfrit/Zeromus (Channeling/Hastega)', 'Chaos (Renew/Hastega)'],
            recommendedLevel: 'Level 80-99',
            notes: 'Multi-hour engagement duration. Mission failure likely without Ribbon and Bubble Belt protocols.'
        },
        why: 'Refined exclusively for apex-level targets. Features Dark Shot/Black Robe synergy, automated Reverse/Decoy loops, and high-tier MP regeneration for infinite combat cycles. Not recommended for standard field operations.',
        parties: [
            { name: 'Apex Rotation', members: ['Vaan', 'Balthier', 'Fran'], why: 'The primary endurance group. Features high-output DPS paired with Dark Shot/Reverse strategy.' },
            { name: 'Relief Squad', members: ['Basch', 'Ashe', 'Penelo'], why: 'Backup stability group. Uses Decoy tanking and dual-Reverse support to stabilize main group fatigue.' },
            { name: 'Magickal Bastion', members: ['Vaan', 'Ashe', 'Penelo'], why: 'Maximum-tier healing and Magickal defense for the final stages of the journey.' }
        ],
        builds: [
            { char: 'Vaan', jobs: ['Bushi', 'Knight'], espers: ['Hashmal', 'Shemhazai'], role: 'Berserker DPS', why: 'Holy Excalibur combo specialist. Permanent Berserker approach and status immunity focus.', gambits: ['Self: HP = 100% → Berserk', 'Self: HP < 90% → Bubble', '(Primary: Automated Physical Engagement)'], gear: ['Excalibur', 'Genji Gloves', 'Berserker Bracers', 'Bubble Belt'] },
            { char: 'Balthier', jobs: ['Monk', 'Foebreaker'], espers: ['Ultima', 'Zodiark'], role: 'Heavy Assault', why: 'Specialized for Pole-combo output and high-tier breaking suites. Apex physical mitigation.', gambits: ['Foe: Yiazmat → Expose', 'Self: HP = 100% → Berserk', 'Self: HP < 90% → Bubble', '(Active: Automated Combat Sequence)'], gear: ['Dragon Whisker', 'Grand Armor', 'Genji Gloves', 'Berserker Bracers', 'Ribbon'] },
            { char: 'Fran', jobs: ['White Mage', 'Machinist'], espers: ['Famfrit', 'Zeromus'], role: 'Logistic Specialst', why: 'CRITICAL: Dark Shot platform synced with Reverse and Channeling 3 for infinite combat cycles.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: HP < 10% → Reverse', 'Foe: Yiazmat → Dark Shot', 'Ally: HP Critical → Renew', 'Ally: HP < 60% → Curaja'], gear: ['Fomalhaut', 'Dark Shot', 'White Robes', 'Sage\'s Ring', 'Bubble Belt'] },
            { char: 'Ashe', jobs: ['Black Mage', 'White Mage'], espers: ['Chaos'], role: 'Strategic Magick', why: 'Dual-school authorization. Optimized for Reverse throughput and Hastega synchronization.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: HP < 10% → Reverse', 'Ally: HP Critical → Renew', 'Ally: HP < 60% → Curaja', 'Foe: Yiazmat → Bio'], gear: ['Staff of the Magi', 'Black Robes', 'Circlet', 'Sage\'s Ring', 'Bubble Belt'] },
            { char: 'Penelo', jobs: ['White Mage', 'Shikari'], espers: ['Cuchulainn', 'Mateus', 'Exodus'], role: 'Recovery Node', why: 'Evasion-heavy recovery specialist for unit rotation during long-duration encounters.', gambits: ['Ally: Any Status → Remedy', 'Ally: HP < 70% → Curaga', 'Ally: HP Critical → Phoenix Down', 'Self: HP < 40% → Decoy', 'Foe: Nearest Visible → Attack'], gear: ['Main Gauche', 'Crystal Shield', 'Genji Armor', 'Ribbon'] }
        ]
    },
    'Lore Friendly': {
        shortName: 'Lore',
        desc: 'Iconic Archetype synchronization. Updated for competitive job-synergy.',
        metrics: { lp: 90, atk: 85, flex: 90 },
        phase: 'early',
        requirements: {
            availability: 'Initial Deployment',
            unlocks: 'Archetype Authorization - Operational from Phase 1.',
            criticalGear: [
                'Main Gauche [PRIORITY: ALPHA - Street Thief signature]',
                'Fomalhaut [PRIORITY: ALPHA - Sky Pirate signature]',
                'Perseus Bow [PRIORITY: ALPHA - Viera Archer signature]',
                'Grand Armor [PRIORITY: ALPHA - Royal Guard signature]'
            ],
            keyEspers: ['Chaos/Exodus (Channeling)', 'Famfrit (Hastega)', 'Ultima (Swiftness)'],
            recommendedLevel: 'Level 1+',
            notes: 'Maintains narrative cohesion while fulfilling competitive tactical standards.'
        },
        why: 'Synchronizes character iconic archetypes with high-tier job combinations. This configuration respects story-based weapon proficiencies (Balthier/Guns, Fran/Bows) without sacrificing the tactical requirements of the Zodiac Job System.',
        parties: [
            { name: 'Protagonist Trio', members: ['Vaan', 'Balthier', 'Fran'], why: 'Narrative-heavy unit. Balanced frontline mitigation, range support, and mystic archer utility.' },
            { name: 'Kingdom Defense', members: ['Basch', 'Ashe', 'Penelo'], why: 'High-mitigation royal guard unit. Reliable physical assault and dual-magick coverage.' },
            { name: 'Tactical Versatilty', members: ['Fran', 'Ashe', 'Penelo'], why: 'Maximized utility nodes. Covers all critical buff/recovery requirements.' }
        ],
        builds: [
            { char: 'Vaan', jobs: ['Shikari', 'Knight'], espers: ['Cuchulainn', 'Hashmal'], role: 'Evasion Lead', why: 'Signature thief-tank. Effectively combines Main Gauche evasion with high-tier item support.', gambits: ['Self: HP < 70% → Decoy', 'Ally: Any Status → Remedy', 'Ally: Any → Bravery', 'Self: HP < 40% → X-Potion', 'Foe: Nearest Visible → Attack'], gear: ['Main Gauche', 'Crystal Shield', 'Demon Shield', 'Genji Armor', 'Ribbon'] },
            { char: 'Balthier', jobs: ['Machinist', 'Foebreaker'], espers: ['Zeromus', 'Adrammelech'], role: 'Tactical Lead', why: 'Signature firearms platform. Synchronizes gun-mitigation with Break-stat suite.', gambits: ['Foe: HP ≥ 10000 → Expose', 'Foe: Status ≠ Shattered → Shear', 'Foe: Flying → Dark Shot', 'Foe: HP ≥ 5000 → Telekinesis', 'Foe: Nearest Visible → Attack'], gear: ['Fomalhaut', 'Aldebaran', 'Heavy Armor', 'Golden Amulet'] },
            { char: 'Fran', jobs: ['Archer', 'Time Battlemage'], espers: ['Famfrit', 'Shemhazai'], role: 'Mystic Support', why: 'Signature ballistics platform. Core time-magick and elemental throughput node.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: Any → Bravery', 'Ally: Any → Faith', 'Foe: HP ≥ 10000 → Expose', 'Foe: Nearest Visible → Attack'], gear: ['Perseus Bow', 'Burning Bow', 'Black Robes', 'Ribbon'] },
            { char: 'Basch', jobs: ['Knight', 'Foebreaker'], espers: ['Mateus', 'Zodiark'], role: 'Frontline Shield', why: 'Iconic royal guard architecture. Primary physical mitigation and Break source.', gambits: ['Foe: HP ≥ 10000 → Expose', 'Ally: Status ≠ Haste → Hastega', 'Ally: HP < 50% → Curaga', 'Ally: Status ≠ Protect → Protect', 'Foe: Nearest Visible → Attack'], gear: ['Excalibur', 'Grand Armor', 'Crystal Shield', 'Bubble Belt'] },
            { char: 'Ashe', jobs: ['Black Mage', 'White Mage'], espers: ['Chaos', 'Exodus'], role: 'Apex Magus', why: 'Princess-archetype magick synchronization. Universal School authorization.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: HP Critical → Renew', 'Ally: HP < 60% → Curaja', 'Foe: Weak Element → -ga spell', 'Foe: HP ≥ 10000 → Scathe'], gear: ['Staff of the Magi', 'Black Robes', 'Circlet', 'Sage\'s Ring'] },
            { char: 'Penelo', jobs: ['White Mage', 'Monk'], espers: ['Ultima', 'Belias'], role: 'Logistic Magus', why: 'High-agility healer. Combines Potion Lore mastery with high-tier physical synergy.', gambits: ['Ally: HP < 70% → Curaga', 'Ally: HP Critical → Phoenix Down', 'Ally: Any Status → Esuna', 'Ally: HP < 90% → Hi-Potion', 'Foe: Nearest Visible → Attack'], gear: ['Excalibur', 'White Robes', 'Kanya (Pole)', 'Opal Ring'] }
        ]
    }
};

// Preset Icon Mapping
const PRESET_ICONS = {
    'Max Efficiency': 'Efficiency',
    'DPS Nuclear': 'Nuclear',
    'Beginner Friendly': 'Beginner',
    'Leader Trinity': 'Trinity',
    'Yiazmat Specialist': 'Endurance',
    'Lore Friendly': 'Lore'
};

