const PRESETS = {
            'Max Efficiency': {
                desc: 'Zero wasted licenses. The "Perfect" math build.',
                eff: 98,
                phase: 'mid',
                requirements: {
                    availability: 'Mid Game',
                    unlocks: 'Defeat Belias at Mt Bur-Omisace - 2nd job required for optimization',
                    criticalGear: [
                        'Main Gauche - 50% evasion (Penelo evasion healer)',
                        'Genji Gloves - 1.8x combo rate (Basch Katana combos)'
                    ],
                    keyEspers: ['Exodus/Zeromus (Channeling 3)', 'Ultima/Zodiark (Swiftness 3 + Renew)', 'Chaos (Hastega)'],
                    recommendedLevel: '40+',
                    notes: '98% efficiency requires both jobs - single job negates the optimization premise'
                },
                why: 'Why this? If you obsess over optimization and hate wasting a single license point, this is your build. Mathematically perfect allocation where nearly every unlock counts. Reaches endgame power faster with minimal LP grinding—4 characters get Swiftness 3, full augment coverage, and competitive Battle Lores. Satisfying for completionists who want efficiency without sacrificing strength.',
                parties: [
                    { name: 'General Purpose', members: ['Vaan', 'Fran', 'Penelo'], why: 'Balanced team. Vaan tanks/heals, Fran provides Haste/buffs/Renew, Penelo Hastega + emergency healing.' },
                    { name: 'Heavy DPS', members: ['Balthier', 'Basch', 'Fran'], why: 'Pure offense. Balthier breaks, Basch berserked magic DPS, Fran utility engine with Swiftness 3 trinity.' },
                    { name: 'Superboss', members: ['Fran', 'Penelo', 'Balthier'], why: 'Endurance fights. Fran (Renew/utility), Penelo (Hastega/heals), Balthier (breaks/tank).' }
                ],
                builds: [
                    { char: 'Vaan', jobs: ['Red Battlemage', 'Knight'], espers: ['Mateus', 'Exodus'], role: 'Leader / Tank', why: 'Heavy Armor synergy. Provides buffs/healing/DPS.', gambits: ['Ally: HP < 50% → Curaga', 'Self: HP < 40% → X-Potion', 'Ally: Status ≠ Protect → Protect', 'Foe: Nearest Visible → Attack'], gear: ['Excalibur (Holy dmg)', 'Grand Armor (Heavy Armor 12)', 'Demon Shield', 'Rose Corsage (accessories)'] },
                    { char: 'Balthier', jobs: ['Foebreaker', 'Uhlan'], espers: ['Adrammelech', 'Shemhazai', 'Hashmal'], role: 'STR Tank', why: 'Pure Heavy Armor. Zero Mystic waste. 13 Battle Lores (vs Monk\'s 16) but minimal LP overlap. Excellent weapon progression with spears + breaks.', gambits: ['Foe: HP ≥ 10000 → Expose', 'Foe: Status ≠ Shattered → Shear', 'Foe: Status ≠ Wither → Wither', 'Foe: Nearest Visible → Attack'], gear: ['Holy Lance', 'Grand Armor (Heavy Armor 12)', 'Zodiac Spear (late game)', 'Genji Gloves (combo weapons)'] },
                    { char: 'Fran', jobs: ['Monk', 'Time Battlemage'], espers: ['Ultima', 'Zeromus', 'Zodiark'], role: 'Utility Engine', why: 'CRITICAL: Swiftness 3 + Channeling 3 + Renew trinity.', gambits: ['Ally: Status ≠ Haste → Haste', 'Ally: Any → Bravery', 'Ally: HP Critical → Renew', 'Foe: HP ≥ 10000 → Expose', 'Foe: Nearest Visible → Attack'], gear: ['Kanya (Pole - MAG boost)', 'Black Robes (MAG+)', 'Golden Amulet (LP boost)', 'Ribbon (status immunity)'] },
                    { char: 'Basch', jobs: ['Bushi', 'Black Mage'], espers: ['Famfrit'], role: 'Magic DPS', why: 'Elemental mastery. Katana DPS uses MAG stat.', gambits: ['Self: HP = 100% → Berserk', 'Self: HP < 90% → Bubble', '(Remove other gambits - Berserk auto-attacks)'], gear: ['Masamune (katana)', 'Black Robes (MAG+)', 'Black Mask (MAG+)', 'Genji Gloves'] },
                    { char: 'Ashe', jobs: ['Knight', 'Time Battlemage'], espers: ['Belias'], role: 'Support', why: 'Heavy Armor + late White Magic = zero waste.', gambits: ['Ally: HP < 60% → Cura', 'Ally: Status ≠ Haste → Haste', 'Ally: Any → Protect', 'Foe: Nearest Visible → Attack'], gear: ['Excalibur', 'Grand Armor', 'Crystal Shield', 'Bubble Belt (HP+)'] },
                    { char: 'Penelo', jobs: ['White Mage', 'Shikari'], espers: ['Chaos', 'Cuchulainn'], role: 'Evasion Healer', why: 'Main Gauche + Shields + Hastega + Remedy Lore 3.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: Any Status → Remedy', 'Ally: HP < 70% → Curaga', 'Ally: HP Critical → Phoenix Down', 'Foe: Nearest Visible → Attack'], gear: ['Main Gauche (CRITICAL - evade)', 'Crystal Shield (best shield)', 'Demon Shield (backup)', 'Ribbon (status immunity)'] }
                ]
            },
            'DPS Nuclear': {
                desc: 'Max damage for superbosses',
                eff: 85,
                phase: 'mid',
                requirements: {
                    availability: 'Mid to Late Game',
                    unlocks: 'Multiple Espers + 2nd job - prepared for LP grinding',
                    criticalGear: [
                        'Genji Gloves - 1.8x combo rate (ESSENTIAL for all DPS)',
                        'Berserk Bracers - permanent Berserk mode',
                        'Dragon Whisker / Masamune - top-tier weapons',
                        'Main Gauche - survivability (Penelo)'
                    ],
                    keyEspers: ['Ultima/Zodiark (Swiftness 3)', 'Famfrit (Hastega)', 'Exodus (Channeling 3)'],
                    recommendedLevel: '60+',
                    notes: 'Genji Gloves mandatory for Katana/Pole DPS - do NOT use with guns/bows/crossbows'
                },
                why: 'Why this? Built for endgame challenges where raw damage output matters most. Sacrifices LP efficiency to maximize Battle Lores (16 on Balthier vs 13 in efficient builds = ~15-20% more STR). Same Swiftness 3 coverage as other builds, but optimized weapon access. Perfect for players who don\'t mind LP grinding to squeeze out every percentage point of damage.',
                parties: [
                    { name: 'Max Damage', members: ['Vaan', 'Balthier', 'Fran'], why: 'CRITICAL: All 3 Berserk + Fran Hastega. Vaan/Balthier berserked DPS, Fran buffs then Hastega everyone.' },
                    { name: 'Superboss Core', members: ['Balthier', 'Fran', 'Penelo'], why: 'Endurance DPS. Balthier (Swiftness 3 + breaks), Fran (Hastega/buffs), Penelo (healing/survival).' },
                    { name: 'Magic Nuke', members: ['Ashe', 'Basch', 'Penelo'], why: 'Elemental destruction. Ashe Hastega, Basch Holy Excalibur, Penelo heals. Melts magic-weak enemies.' }
                ],
                builds: [
                    { char: 'Vaan', jobs: ['Bushi', 'Knight'], espers: ['Hashmal', 'Shemhazai'], role: 'DPS', why: 'Confuse setup + Swiftness 3 + Holy Lance/Excalibur', gambits: ['Self: HP = 100% → Berserk', 'Self: HP < 90% → Bubble', '(Remove other gambits for max DPS)'], gear: ['Masamune (Katana + Genji)', 'Holy Lance (backup)', 'Genji Gloves (CRITICAL)', 'Berserk Bracers'] },
                    { char: 'Balthier', jobs: ['Monk', 'Foebreaker'], espers: ['Ultima', 'Zeromus', 'Zodiark'], role: 'DPS', why: 'Monk has all 16 Battle Lores (max in game) + Swiftness 3 via Ultima. Foebreaker adds breaks + Heavy Armor. Lots of LP overlap but highest possible STR.', gambits: ['Foe: HP ≥ 10000 → Expose', 'Foe: Status ≠ Shattered → Shear', 'Self: HP = 100% → Berserk', 'Foe: Nearest Visible → Attack'], gear: ['Dragon Whisker (Pole)', 'Grand Armor', 'Genji Gloves', 'Berserk Bracers'] },
                    { char: 'Fran', jobs: ['Uhlan', 'Time Battlemage'], espers: ['Adrammelech', 'Famfrit', 'Belias'], role: 'Support', why: 'Hastega + Zodiac Spear platform + buffs', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: Any → Bravery', 'Ally: Any → Faith', 'Foe: HP ≥ 10000 → Expose', 'Foe: Nearest Visible → Attack'], gear: ['Zodiac Spear (BEST spear)', 'Dragon Mail', 'Golden Amulet', 'Bubble Belt'] },
                    { char: 'Basch', jobs: ['Knight', 'Black Mage'], espers: ['Mateus', 'Exodus'], role: 'Flex', why: 'Holy Excalibur or magic DPS depending on fight', gambits: ['Foe: Weak Holy → Attack (Excalibur)', 'Foe: Flying → Aeroga', 'Foe: HP ≥ 10000 → Ardor', 'Ally: HP < 50% → Curaga', 'Foe: Nearest Visible → Attack'], gear: ['Excalibur (physical mode)', 'Black Robes (magic mode)', 'Grand Armor', 'Demon Shield'] },
                    { char: 'Ashe', jobs: ['Black Mage', 'White Mage'], espers: ['Chaos'], role: 'Magic', why: 'CRITICAL: Hastega, already has Renew', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: HP Critical → Renew', 'Foe: Weak Element → -ga spell', 'Foe: HP ≥ 10000 → Scathe', 'Ally: HP < 60% → Curaja'], gear: ['Staff of the Magi', 'Black Robes', 'Circlet', 'Sage\'s Ring (MP boost)'] },
                    { char: 'Penelo', jobs: ['White Mage', 'Shikari'], espers: ['Cuchulainn'], role: 'Healer', why: 'Remedy Lore 3 + evasion tank. High survivability for sustained superboss fights.', gambits: ['Ally: Any Status → Remedy', 'Ally: HP < 70% → Curaga', 'Ally: HP Critical → Phoenix Down', 'Self: HP < 40% → Decoy', 'Foe: Nearest Visible → Attack'], gear: ['Main Gauche (evade)', 'Crystal Shield', 'Rubber Suit (element resist)', 'Ribbon'] }
                ]
            },
            'Beginner Friendly': {
                desc: 'Guide recommended. Forgiving and flexible.',
                eff: 92,
                phase: 'early',
                requirements: {
                    availability: 'Early Game',
                    unlocks: 'None - works from the start',
                    criticalGear: [
                        'Main Gauche - 50% evasion (Penelo evasion tank)',
                        'Genji Gloves - 1.8x combo rate (Balthier Katana combos)'
                    ],
                    keyEspers: ['Chaos (Hastega)', 'Ultima (Swiftness 3)', 'Cuchulainn (Remedy Lore 3)'],
                    recommendedLevel: '1+',
                    notes: 'Forgiving build - can substitute most gear without breaking strategy'
                },
                why: 'Why this? The Unnecessary Class Guide\'s official recommendation for first-time players. Balanced difficulty with strong synergies that work throughout the entire game. Makes progression smooth and recovers from mistakes easily. Start here if unsure.',
                parties: [
                    { name: 'Story Mode', members: ['Vaan', 'Fran', 'Ashe'], why: 'Main trio. Vaan versatile, Fran buffs/utility, Ashe Hastega + magic/heals. Covers everything.' },
                    { name: 'Boss Fight', members: ['Balthier', 'Fran', 'Penelo'], why: 'Berserk DPS + support. Balthier breaks then Berserk, Fran buffs, Penelo heals. Autopilot mode.' },
                    { name: 'Physical DPS', members: ['Basch', 'Balthier', 'Fran'], why: 'Pure physical damage. Basch/Balthier both Berserked, Fran Haste/Bravery. Watch things melt.' }
                ],
                builds: [
                    { char: 'Vaan', jobs: ['Red Battlemage', 'Knight'], espers: ['Mateus', 'Exodus'], role: 'Versatile', why: 'Easy to use. Good healing + damage early game.', gambits: ['Ally: HP < 50% → Curaga', 'Ally: Status ≠ Protect → Protect', 'Self: HP < 40% → X-Potion', 'Foe: Nearest Visible → Attack'], gear: ['Excalibur', 'Grand Armor', 'Demon Shield', 'Any accessible gear (forgiving)'] },
                    { char: 'Balthier', jobs: ['Foebreaker', 'Bushi'], espers: ['Hashmal', 'Shemhazai'], role: 'Berserk DPS', why: 'Breaks + Katana. Set to Berserk and forget.', gambits: ['Foe: HP ≥ 10000 → Expose', 'Self: HP = 100% → Berserk', '(Remove other gambits - Berserk mode)'], gear: ['Masamune (Katana)', 'Genji Gloves', 'Berserk Bracers', 'Golden Amulet'] },
                    { char: 'Fran', jobs: ['Monk', 'Time Battlemage'], espers: ['Ultima', 'Zeromus', 'Zodiark'], role: 'Support', why: 'Best physical DPS utility in the game.', gambits: ['Ally: Status ≠ Haste → Haste', 'Ally: Any → Bravery', 'Ally: HP Critical → Renew', 'Foe: HP ≥ 10000 → Expose', 'Foe: Nearest Visible → Attack'], gear: ['Kanya (Pole)', 'Black Robes', 'Ribbon', 'Bubble Belt'] },
                    { char: 'Basch', jobs: ['Archer', 'Uhlan'], espers: ['Adrammelech', 'Belias', 'Famfrit'], role: 'Physical DPS', why: 'Great weapon progression. Permanently Berserked.', gambits: ['Self: HP = 100% → Berserk', 'Self: HP < 90% → Bubble', '(Remove other gambits for auto-attack spam)'], gear: ['Zodiac Spear (BEST - combos)', 'Perseus Bow (backup)', 'Genji Gloves (for spear)', 'Berserk Bracers'] },
                    { char: 'Ashe', jobs: ['Black Mage', 'White Mage'], espers: ['Chaos'], role: 'Magic Carry', why: 'CRITICAL: Hastega. Can heal and nuke.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: HP Critical → Renew', 'Ally: HP < 60% → Curaja', 'Foe: Flying → Aeroga', 'Foe: HP ≥ 10000 → Ardor'], gear: ['Staff of the Magi', 'Black Robes', 'White Robes', 'Sage\'s Ring'] },
                    { char: 'Penelo', jobs: ['White Mage', 'Shikari'], espers: ['Cuchulainn'], role: 'Healer', why: 'Tanky healer. Remedy Lore 3 is crucial.', gambits: ['Ally: Any Status → Remedy', 'Ally: HP < 70% → Curaga', 'Ally: HP Critical → Phoenix Down', 'Self: HP < 40% → Decoy', 'Foe: Nearest Visible → Attack'], gear: ['Main Gauche (CRITICAL)', 'Crystal Shield', 'Demon Shield', 'Ribbon'] }
                ]
            },
            'Leader Trinity': {
                desc: 'Optimized for the "Leader" mechanic.',
                eff: 94,
                phase: 'mid',
                requirements: {
                    availability: 'Mid Game',
                    unlocks: 'Defeat Belias - Vaan needs BOTH jobs for evasion synergy',
                    criticalGear: [
                        'Main Gauche - 50% evasion (ESSENTIAL - entire strategy depends on this)',
                        'Crystal Shield - evasion stacking with Main Gauche',
                        'Ribbon - status immunity (tank must avoid disable)',
                        'Genji Gloves - Basch DPS combos'
                    ],
                    keyEspers: ['Cuchulainn (Remedy Lore 3)', 'Ultima (Swiftness 3)', 'Chaos (Hastega)'],
                    recommendedLevel: '45+',
                    notes: 'Build fails without Main Gauche - entire strategy relies on Vaan dodging attacks'
                },
                why: 'Why this? Designed around the fact that your party leader absorbs most attacks. Focuses on making Vaan nearly untouchable with maximum evasion, while keeping strong backup options. Great for players who understand positioning and aggro mechanics.',
                parties: [
                    { name: 'Evasion Core', members: ['Vaan', 'Fran', 'Ashe'], why: 'LEADER: Vaan (untouchable tank). Fran buffs/utility, Ashe Hastega + magic. Vaan tanks everything with 90%+ evasion.' },
                    { name: 'DPS Blitz', members: ['Vaan', 'Basch', 'Fran'], why: 'LEADER: Vaan (tank). Basch Berserked Swiftness 3, Fran buffs. Pure offense while Vaan absorbs hits.' },
                    { name: 'Boss Endurance', members: ['Vaan', 'Ashe', 'Penelo'], why: 'LEADER: Vaan (tank). Ashe + Penelo dual healers. Infinite sustain with Phoenix Down spam + Remedy.' }
                ],
                builds: [
                    { char: 'Vaan', jobs: ['Red Battlemage', 'Shikari'], espers: ['Cuchulainn', 'Mateus', 'Exodus'], role: 'Evasion Tank', why: 'Main Gauche + Shields. Impossible to hit.', gambits: ['Self: HP < 70% → Decoy', 'Ally: Any Status → Remedy', 'Ally: HP < 50% → Curaga', 'Foe: Nearest Visible → Attack'], gear: ['Main Gauche (CRITICAL - 50% evade)', 'Crystal Shield (Evade+)', 'Demon Shield (backup)', 'Genji Armor', 'Ribbon (status immunity)'] },
                    { char: 'Balthier', jobs: ['Knight', 'Black Mage'], espers: ['Shemhazai', 'Hashmal'], role: 'Paladin', why: 'Shield evasion + Magic + Holy Excalibur.', gambits: ['Foe: Weak Holy → Attack (Excalibur)', 'Foe: Undead → Holy', 'Foe: Flying → Aeroga', 'Ally: HP < 50% → Curaga', 'Foe: Nearest Visible → Attack'], gear: ['Excalibur (Holy scales MAG)', 'Black Robes (MAG mode)', 'Grand Armor (tank mode)', 'Crystal Shield', 'Sage\'s Ring'] },
                    { char: 'Fran', jobs: ['Monk', 'Time Battlemage'], espers: ['Ultima', 'Zeromus', 'Zodiark'], role: 'Utility', why: 'Haste/Bravery/Expose/Reverse utility bot.', gambits: ['Ally: Status ≠ Haste → Haste', 'Ally: Any → Bravery', 'Ally: HP Critical → Renew', 'Foe: HP ≥ 10000 → Expose', 'Foe: Nearest Visible → Attack'], gear: ['Kanya (Pole + MAG)', 'Black Robes', 'Ribbon', 'Golden Amulet (LP boost)'] },
                    { char: 'Basch', jobs: ['Bushi', 'Knight'], espers: ['Famfrit'], role: 'DPS', why: 'Swiftness 3, permanently berserked.', gambits: ['Self: HP = 100% → Berserk', 'Self: HP < 90% → Bubble', '(Keep short for Swiftness 3 efficiency)'], gear: ['Masamune (Katana)', 'Genji Gloves', 'Berserk Bracers', 'Bubble Belt'] },
                    { char: 'Ashe', jobs: ['Black Mage', 'White Mage'], espers: ['Chaos'], role: 'Magic', why: 'The ultimate magic user. Hastega + Renew.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: HP Critical → Renew', 'Ally: HP < 60% → Curaja', 'Foe: Weak Element → -ga spell', 'Foe: HP ≥ 10000 → Scathe'], gear: ['Staff of the Magi', 'Black Robes', 'Circlet', 'Sage\'s Ring (MP+)'] },
                    { char: 'Penelo', jobs: ['White Mage', 'Archer'], espers: ['Belias', 'Adrammelech'], role: 'Item Healer', why: 'Burning Bow + Phoenix Down spam = instant full revive.', gambits: ['Ally: HP Critical → Phoenix Down', 'Ally: HP < 70% → Hi-Potion', 'Ally: Any Status → Echo Herbs/Eye Drops', 'Ally: HP < 90% → Potion', 'Foe: Nearest Visible → Attack'], gear: ['Burning Bow (CRITICAL - fire)', 'Perseus Bow (backup)', 'White Robes', 'Opal Ring (item boost)'] }
                ]
            },
            'Yiazmat Specialist': {
                desc: 'Hyper-optimized for 50M HP superboss endurance.',
                eff: 82,
                phase: 'late',
                requirements: {
                    availability: 'Endgame Only',
                    unlocks: 'All key Espers acquired + max-level gear farmed',
                    criticalGear: [
                        'Fomalhaut - best gun (ESSENTIAL for Dark Shot strategy)',
                        'Ribbon - confuse immunity (MANDATORY - will wipe without this)',
                        'Bubble Belt - HP survival (MANDATORY for 2+ hour fight)',
                        'Genji Gloves - DPS combo rate',
                        'Grand Armor - tank survivability'
                    ],
                    keyEspers: ['Ultima/Zodiark (Swiftness 3)', 'Famfrit/Zeromus (Channeling 3 + Hastega)', 'Chaos (Renew/Hastega)'],
                    recommendedLevel: '75-90+',
                    notes: '2+ hour marathon fight - do not attempt without Ribbon/Bubble Belt or you will wipe'
                },
                why: 'Why this? The ultimate challenge requires an ultimate team. Built specifically for Yiazmat\'s 50 million HP and multi-hour marathon fight. Features Dark Shot, Reverse spam, Decoy tanking, and infinite MP sustain. Use this when you\'re ready for the final boss.',
                parties: [
                    { name: 'Yiazmat Core', members: ['Vaan', 'Balthier', 'Fran'], why: 'THE TEAM. Vaan/Balthier Berserked DPS, Fran Dark Shot specialist + Reverse spam + Hastega. This is the marathon team.' },
                    { name: 'Tank Rotation', members: ['Basch', 'Ashe', 'Penelo'], why: 'Relief squad. Basch Decoy tank, Ashe/Penelo dual Reverse support. Swap in when main party needs recovery during 2+ hour fight.' },
                    { name: 'All-Out DPS', members: ['Vaan', 'Balthier', 'Ashe'], why: 'Speed kill attempt. All Berserk, Ashe Hastega + Reverse. High risk but fastest kill time if Reverse timing is perfect.' }
                ],
                builds: [
                    { char: 'Vaan', jobs: ['Bushi', 'Knight'], espers: ['Hashmal', 'Shemhazai'], role: 'Berserked DPS', why: 'CRITICAL: Confuse immunity + Holy Excalibur combos. Permanent Berserk for maximum sustained DPS.', gambits: ['Self: HP = 100% → Berserk', 'Self: HP < 90% → Bubble', '(Remove all other gambits)'], gear: ['Excalibur (CRITICAL - Holy)', 'Genji Gloves', 'Berserk Bracers', 'Bubble Belt (HP survival)'] },
                    { char: 'Balthier', jobs: ['Monk', 'Foebreaker'], espers: ['Ultima', 'Zodiark'], role: 'DPS Tank', why: 'Swiftness 3 + 16 Battle Lores + breaks. Maximum physical damage output for endurance fight.', gambits: ['Foe: Yiazmat → Expose', 'Self: HP = 100% → Berserk', 'Self: HP < 90% → Bubble', '(Short list for Swiftness 3)'], gear: ['Dragon Whisker (Pole)', 'Grand Armor', 'Genji Gloves', 'Berserk Bracers', 'Ribbon (confuse immunity)'] },
                    { char: 'Fran', jobs: ['White Mage', 'Machinist'], espers: ['Famfrit', 'Zeromus'], role: 'Dark Shot Specialist', why: 'CRITICAL: Dark Shot (Machinist best against Yiazmat) + Reverse spam + Hastega + Channeling 3 for infinite MP.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: HP < 10% → Reverse', 'Foe: Yiazmat → Dark Shot', 'Ally: HP Critical → Renew', 'Ally: HP < 60% → Curaja'], gear: ['Fomalhaut (CRITICAL - best gun)', 'Dark Shot ammo (infinite)', 'White Robes', 'Sage\'s Ring (MP sustain)', 'Bubble Belt'] },
                    { char: 'Basch', jobs: ['Uhlan', 'Time Battlemage'], espers: ['Adrammelech', 'Belias'], role: 'Decoy Tank', why: 'Decoy access (Time Battlemage) + Reverse + Heavy Armor. Dedicated tank for 50M HP slog.', gambits: ['Self: HP < 90% → Decoy', 'Self: HP < 10% → Reverse', 'Ally: Status ≠ Haste → Haste', 'Ally: Any → Bravery', 'Foe: Nearest Visible → Attack'], gear: ['Zodiac Spear', 'Grand Armor (Heavy 12)', 'Bubble Belt (CRITICAL)', 'Ribbon (status immunity)'] },
                    { char: 'Ashe', jobs: ['Black Mage', 'White Mage'], espers: ['Chaos'], role: 'Reverse Support', why: 'Dual Reverse access + Hastega + Renew. Keeps party alive through entire marathon encounter.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: HP < 10% → Reverse', 'Ally: HP Critical → Renew', 'Ally: HP < 60% → Curaja', 'Foe: Yiazmat → Bio'], gear: ['Staff of the Magi', 'Black Robes', 'Circlet', 'Sage\'s Ring', 'Bubble Belt'] },
                    { char: 'Penelo', jobs: ['White Mage', 'Shikari'], espers: ['Cuchulainn', 'Mateus', 'Exodus'], role: 'Backup Healer', why: 'Remedy Lore 3 + evasion tank. Swaps in when main party fatigues during 2+ hour fight.', gambits: ['Ally: Any Status → Remedy', 'Ally: HP < 70% → Curaga', 'Ally: HP Critical → Phoenix Down', 'Self: HP < 40% → Decoy', 'Foe: Nearest Visible → Attack'], gear: ['Main Gauche (evade)', 'Crystal Shield', 'Genji Armor', 'Ribbon (CRITICAL)'] }
                ]
            },
            'Lore Friendly': {
                desc: 'Canonical roles with optimized second jobs.',
                eff: 91,
                phase: 'early',
                requirements: {
                    availability: 'Early Game',
                    unlocks: 'None - canonical roles work from start',
                    criticalGear: [
                        'Main Gauche - street thief identity (Vaan)',
                        'Fomalhaut - sky pirate signature gun (Balthier)',
                        'Perseus Bow - Viera archer (Fran)',
                        'Grand Armor - royal guard (Basch)'
                    ],
                    keyEspers: ['Chaos/Exodus (dual Channeling 3)', 'Famfrit (Hastega)', 'Ultima (Swiftness 3)'],
                    recommendedLevel: '1+',
                    notes: 'Narrative cohesion with competitive optimization'
                },
                why: 'Why this? Play characters in their iconic story roles while maintaining competitive efficiency. Balthier gets his guns, Fran her bow, Basch his knighthood. Perfect for players who want narrative cohesion without sacrificing optimization. Covers all key abilities: Hastega, Swiftness 3, Channeling 3, and Remedy Lore 3.',
                parties: [
                    { name: 'Canonical Trio', members: ['Vaan', 'Balthier', 'Fran'], why: 'Story protagonists. Vaan thief/tank, Balthier sky pirate with guns, Fran mystic archer. The gang together.' },
                    { name: 'Royal Guard', members: ['Basch', 'Ashe', 'Penelo'], why: 'Kingdom defenders. Basch knight protector, Ashe royal mage, Penelo healing support. Narrative powerhouse.' },
                    { name: 'Balanced Power', members: ['Fran', 'Ashe', 'Penelo'], why: 'CRITICAL abilities. Fran Hastega, Ashe dual Channeling 3, Penelo Swiftness 3. All key mechanics covered.' }
                ],
                builds: [
                    { char: 'Vaan', jobs: ['Shikari', 'Knight'], espers: ['Cuchulainn', 'Hashmal'], role: 'Evasion Leader', why: 'Street thief turned hero. Main Gauche + shields for evasion tanking. Remedy Lore 3 + Confuse/Faith/Bravery support.', gambits: ['Self: HP < 70% → Decoy', 'Ally: Any Status → Remedy', 'Ally: Any → Bravery', 'Self: HP < 40% → X-Potion', 'Foe: Nearest Visible → Attack'], gear: ['Main Gauche (CRITICAL - thief)', 'Crystal Shield', 'Demon Shield', 'Genji Armor', 'Ribbon'] },
                    { char: 'Balthier', jobs: ['Machinist', 'Foebreaker'], espers: ['Zeromus', 'Adrammelech'], role: 'Sky Pirate', why: 'Leading man with guns and tactics. Channeling 3 for infinite ammo, Telekinesis for utility, breaks for enemy control.', gambits: ['Foe: HP ≥ 10000 → Expose', 'Foe: Status ≠ Shattered → Shear', 'Foe: Flying → Dark Shot', 'Foe: HP ≥ 5000 → Telekinesis', 'Foe: Nearest Visible → Attack'], gear: ['Fomalhaut (CRITICAL - guns)', 'Aldebaran (backup gun)', 'Heavy Armor', 'Golden Amulet'] },
                    { char: 'Fran', jobs: ['Archer', 'Time Battlemage'], espers: ['Famfrit', 'Shemhazai'], role: 'Mystic Archer', why: 'Iconic Viera archer + Wood magic connection. Hastega + time magic support, Firaga unlock. Bows + buffs/debuffs.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: Any → Bravery', 'Ally: Any → Faith', 'Foe: HP ≥ 10000 → Expose', 'Foe: Nearest Visible → Attack'], gear: ['Perseus Bow (CRITICAL - Viera)', 'Burning Bow (fire)', 'Black Robes', 'Ribbon'] },
                    { char: 'Basch', jobs: ['Knight', 'Foebreaker'], espers: ['Mateus', 'Zodiark'], role: 'Royal Guard', why: 'The fallen knight redeemed. Heavy armor tank + breaks. Curaga/Regen for sustain, secondary Hastega source.', gambits: ['Foe: HP ≥ 10000 → Expose', 'Ally: Status ≠ Haste → Hastega', 'Ally: HP < 50% → Curaga', 'Ally: Status ≠ Protect → Protect', 'Foe: Nearest Visible → Attack'], gear: ['Excalibur (knight\'s blade)', 'Grand Armor (CRITICAL)', 'Crystal Shield', 'Bubble Belt'] },
                    { char: 'Ashe', jobs: ['Black Mage', 'White Mage'], espers: ['Chaos', 'Exodus'], role: 'Royal Mage', why: 'Princess of royal bloodline. Ultimate magic user with both schools. CRITICAL: Hastega + Renew + dual Channeling 3.', gambits: ['Ally: Status ≠ Haste → Hastega', 'Ally: HP Critical → Renew', 'Ally: HP < 60% → Curaja', 'Foe: Weak Element → -ga spell', 'Foe: HP ≥ 10000 → Scathe'], gear: ['Staff of the Magi (royal)', 'Black Robes', 'Circlet (crown)', 'Sage\'s Ring'] },
                    { char: 'Penelo', jobs: ['White Mage', 'Monk'], espers: ['Ultima', 'Belias'], role: 'Healing Dancer', why: 'Primary healer with dancer agility. CRITICAL: Swiftness 3 + Excalibur. Potion Lore 3 + Phoenix Lore 2 for item mastery.', gambits: ['Ally: HP < 70% → Curaga', 'Ally: HP Critical → Phoenix Down', 'Ally: Any Status → Esuna', 'Ally: HP < 90% → Hi-Potion', 'Foe: Nearest Visible → Attack'], gear: ['Excalibur (Monk unlock)', 'White Robes', 'Kanya (Pole backup)', 'Opal Ring (items)'] }
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

