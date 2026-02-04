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
        why: 'Designed for the chaotic prologue where party constantly shifts (Vaan solo → Vaan+Penelo → rotating cast). Vaan (choose Shikari OR Red Battlemage) provides consistent survival since he\'s the only guaranteed party member. This build is meant to be REPLACED once dual-job unlocks.',
        parties: [
            { name: 'Vaan\'s Core', members: ['Vaan', 'Penelo', 'Balthier'], why: 'Common early trio. Vaan handles healing via Potions, Penelo provides magic when available.' },
            { name: 'Physical Front', members: ['Vaan', 'Balthier', 'Basch'], why: 'Heavy physical damage. Vaan as constant, supported by Knight and Uhlan.' },
            { name: 'Full Roster', members: ['Vaan', 'Fran', 'Ashe'], why: 'Balanced once full party available. Magic DPS and buffs complement Vaan\'s survival.' }
        ],
        builds: [
            { char: 'Vaan', jobs: ['Shikari', 'Red Battlemage'], espers: [], role: 'Survival Specialist', why: 'Knight and pure Mage sound cool - but they need stable party support. The prologue is CHAOTIC: Vaan fights solo, then with Penelo, then party constantly rotates. Pick SHIKARI for the item specialist (Potion Lore makes healing items powerful, works when teammates have no MP) OR RED BATTLEMAGE for the versatile battle mage (Cure spells + elemental magic + swords means you can adapt to anything). Both keep you alive through the chaos. Plus, this is temporary - reset jobs and go full Knight/Mage when dual-job unlocks.', gambits: ['Shikari: Ally HP < 70% → Potion', 'Red Battlemage: Ally HP < 50% → Cure', 'Ally: Any → Phoenix Down'], gambitStrategy: 'Shikari relies on items (never runs out, works for anyone). Red Battlemage uses magic (versatile, self-sufficient). Both handle the rotating party.', gear: ['Shikari: Daggers + Light Armor', 'Red Battlemage: Swords + Mystic Armor', 'Stock Potions/Phoenix Downs', 'Shields (Buckler → Round Shield)'] },
            { char: 'Penelo', jobs: ['White Mage'], espers: [], role: 'Magic Healer', why: 'Traditional healer when available. Cure spells supplement Vaan\'s items.', gambits: ['Ally: HP < 70% → Cure', 'Ally: Any → Phoenix Down'], gambitStrategy: 'Temporary character - minimal gambit setup since she rotates out frequently.', gear: ['Staff → Serpent Rod', 'Mystic Armor progression', 'MAG focus', 'MP items'] },
            { char: 'Balthier', jobs: ['Knight'], espers: [], role: 'Physical Tank', why: 'Heavy Armor provides early durability. Solid sword damage.', gambits: ['Foe: Party Leader\'s Target → Attack'], gambitStrategy: 'Entire party focuses same target - kills enemies faster, takes less total damage.', gear: ['Sword progression', 'Heavy Armor (Bronze → Steel)', 'Shield', 'STR accessories'] },
            { char: 'Fran', jobs: ['Time Battlemage'], espers: [], role: 'Buffer', why: 'Haste and buffs valuable when available. Mystic Armor progression.', gambits: ['Ally: Any → Haste', 'Ally: Any → Protect'], gambitStrategy: 'Haste doubles action speed. Protect cuts physical damage in half. Multiplicative power.', gear: ['Staff progression', 'Mystic Armor', 'MAG focus', 'Time Magick licenses'] },
            { char: 'Basch', jobs: ['Uhlan'], espers: [], role: 'Physical DPS', why: 'Spear progression provides consistent damage. Heavy Armor for frontline.', gambits: ['Foe: HP ≥ 1000 → Attack'], gambitStrategy: 'Conserves weapon durability and animation time on weak enemies. Full power for threats.', gear: ['Spear progression (Javelin → Heavy Lance)', 'Heavy Armor', 'STR focus', 'HP accessories'] },
            { char: 'Ashe', jobs: ['Black Mage'], espers: [], role: 'Magic DPS', why: 'Elemental magic for exploiting weaknesses. Mystic Armor progression.', gambits: ['Foe: Flying → Thunder', 'Foe: Weak Fire → Fire'], gambitStrategy: 'Weaknesses deal 1.5x damage. Auto-targeting flyers and fire-weak enemies maximizes DPS.', gear: ['Rod progression', 'Mystic Armor', 'MAG focus', 'Elemental licenses'] }
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
            keyEspers: ['Exodus/Zeromus (Channeling)', 'Ultima/Zodiark (Swiftness/Renew)', 'Cuchulainn (Protectga/Shellga)'],
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
            { char: 'Vaan', jobs: ['Red Battlemage', 'Knight'], espers: ['Mateus', 'Exodus'], role: 'Knight', why: 'Heavy Armor synergy. Provides critical buffs and strong physical defense.', gambits: ['Ally: HP < 50% → Curaga', 'Ally: Any → Protect'], gambitStrategy: 'Hybrid damage dealer frees healer to focus on critical healing. Protect prevents damage spikes.', gear: ['Excalibur | Holy-element sword with MAG scaling', 'Grand Armor | Heavy Armor 12 for maximum defense', 'Demon Shield | High evasion with status immunity', 'Rose Corsage | HP +500 boost'] },
            { char: 'Balthier', jobs: ['Foebreaker', 'Uhlan'], espers: ['Adrammelech', 'Hashmal'], role: 'Breaker', why: 'Maximum STR-stat utilization. Zero Mystic Armor overlap. Adrammelech gives Battle Lore for both jobs, Hashmal gives Foebreaker Swiftness and Uhlan Bonecrusher. Optimized for Heavy Armor and Spear progression.', gambits: ['Foe: HP ≥ 10000 → Expose', 'Foe: HP ≥ 5000 → Shear'], gambitStrategy: 'Breaks amplify all party physical damage. HP gates prevent wasting MP on enemies that die in one hit.', gear: ['Zodiac Spear | Highest damage spear (rare chest or trial mode)', 'Holy Lance | Alternative for Holy-weak enemies', 'Grand Armor | Heavy Armor 12 for maximum defense', 'Hermes Sandals | STR boost and auto-Haste'] },
            { char: 'Fran', jobs: ['Monk', 'Time Battlemage'], espers: ['Zeromus', 'Ultima', 'Zodiark'], role: 'Support Mage', why: 'Critical Trinity Node: Swiftness 3, Channeling 3, Renew access, and natural Hastega (Time Battlemage). Ultimate support powerhouse.', gambits: ['Ally: Any → Hastega', 'Self: HP = 100% → Renew', 'Foe: HP ≥ 10000 → Expose'], gambitStrategy: 'Single point of failure - losing Fran loses Hastega. Renew maintains HP=100% for Berserk/Bubble status.', gear: ['Kanya | Best pole (109 ATK, Holy element, full 1.25x Genji bonus)', 'Grand Armor | Heavy Armor 12 for STR scaling', 'Golden Amulet | LP +10% boost', 'Ribbon | Status immunity'] },
            { char: 'Basch', jobs: ['Bushi', 'Black Mage'], espers: [], role: 'Magic DPS', why: 'Bushi/Mage synergy. Katanas scale with MAG stat, optimized by Black Mage augments.', gambits: ['Self: HP = 100% → Berserk'], gambitStrategy: 'Permanent auto-attack mode. No manual control, no gambits needed - just damage.', gear: ['Masamune | MAG-scaling katana (combos with Genji Gloves)', 'Black Robes | MAG boost + 50% Dark damage', 'Black Mask | Additional MAG +3 boost', 'Genji Gloves | Essential 1.8x combo rate for katanas'] },
            { char: 'Ashe', jobs: ['Knight', 'Black Mage'], espers: ['Belias'], role: 'Paladin Flex', why: 'Mystic Armor synergy for boosted Excalibur and magic. Provides healing via Espers and strong magical DPS.', gambits: ['Ally: HP < 60% → Curaga', 'Foe: Weak Holy → Attack'], gambitStrategy: 'Paladin switches roles mid-fight - heal when party struggles, attack when safe.', gear: ['Excalibur | Holy-element sword with MAG scaling', 'Black Robes | 50% Holy damage boost for Excalibur', 'Crystal Shield | High magic defense shield', 'Bubble Belt | HP +1000 boost'] },
            { char: 'Penelo', jobs: ['White Mage', 'Shikari'], espers: ['Cuchulainn'], role: 'Evasion Healer', why: 'Maximum-tier evasion via Main Gauche and Shields. Cuchulainn unlocks Shikari Protectga/Shellga for party-wide defense. White Mage has natural Haste (single target) but NOT Hastega - rely on Fran (Time Battlemage) for party-wide Hastega.', gambits: ['Ally: HP < 70% → Curaga', 'Ally: Any → Phoenix Down', 'Ally: Any → Protectga'], gambitStrategy: 'Healer survives via evasion. Dead healer = party wipe. Phoenix Down prevents cascading failures.', gear: ['Main Gauche | 50% evasion dagger', 'Crystal Shield | Highest evasion shield (90% total with Main Gauche)', 'Demon Shield | Alternative for status-heavy encounters', 'Ribbon | Status immunity'] }
        ]
    },
    'Big Game Hunter': {
        shortName: 'Hunter',
        desc: 'Maximum damage build. Optimized for boss killing.',
        metrics: { lp: 'B', atk: 'S', flex: 'B' },
        phase: 'mid',
        requirements: {
            availability: 'Mid to Late Game',
            unlocks: 'Most Espers unlocked - Requires significant LP investment.',
            criticalGear: [
                'Genji Gloves | Combo boost essential',
                'Berserk Bracers | Permanent Berserk status',
                'Kanya / Masamune | Top DPS weapons (poles/katanas)'
            ],
            keyEspers: ['Ultima/Zodiark (Swiftness)', 'Exodus (Channeling)', 'Zeromus (Monk Channeling)'],
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
            { char: 'Vaan', jobs: ['Bushi', 'Knight'], espers: ['Hashmal', 'Shemhazai'], role: 'Attacker', why: 'Optimized for physical combos and Holy-elemental dominance. Hashmal unlocks Knight Curaja/Bravery/Faith. Shemhazai gives Knight Potion Lore 2 and Bushi Shield Block for versatility.', gambits: ['Self: HP = 100% → Berserk'], gambitStrategy: 'Set-and-forget DPS. Berserk once, then zero micro-management needed.', gear: ['Masamune | MAG-scaling katana (combos with Genji Gloves)', 'Grand Armor | Maximum physical defense', 'Genji Gloves | Essential 1.8x combo rate boost', 'Berserk Bracers | Permanent Berserk status'] },
            { char: 'Balthier', jobs: ['Monk', 'Foebreaker'], espers: ['Zeromus', 'Ultima', 'Zodiark'], role: 'Brawler', why: 'Dual-Heavy synergy. Leverages all 16 Battle Lores for theoretical maximum physical damage. Ultima unlocks Monk Swiftness x2 (critical for DPS), Zeromus unlocks Monk Channeling (infinite MP), Zodiark unlocks Monk Renew for self-sustain.', gambits: ['Foe: HP ≥ 10000 → Expose', 'Foe: HP ≥ 5000 → Shear', 'Self: HP = 100% → Renew'], gambitStrategy: 'Debuff bosses first to amplify team damage, then maintain HP=100% for Berserk combos.', gear: ['Kanya | Best pole (109 ATK, Holy element, full 1.25x Genji bonus)', 'Grand Armor | Maximum physical defense', 'Genji Gloves | Essential 1.25x combo rate for Kanya', 'Berserk Bracers | Permanent Berserk status'] },
            { char: 'Fran', jobs: ['Uhlan', 'Time Battlemage'], espers: ['Mateus', 'Adrammelech', 'Famfrit'], role: 'Support', why: 'Primary Hastega source (Time Battlemage natural) and Zodiac Spear use. Adrammelech gives Uhlan Battle Lore, Famfrit gives Uhlan Potion Lore 3, Mateus gives Uhlan Magick Lore x2. Solid heavy armor progression with utility magic.', gambits: ['Ally: Any → Hastega', 'Ally: Any → Bravery', 'Foe: HP ≥ 10000 → Expose'], gambitStrategy: 'Sole Hastega - if she dies, party speed halves. Stack buffs/debuffs for exponential damage gains.', gear: ['Zodiac Spear | Highest damage spear (rare chest or trial mode)', 'Grand Armor | Maximum physical defense', 'Golden Amulet | LP boost for progression', 'Bubble Belt | HP boost for endgame'] },
            { char: 'Basch', jobs: ['Knight', 'Black Mage'], espers: ['Belias', 'Exodus'], role: 'Spellblade', why: 'Dual-role capability. Exodus gives Black Mage Heavy Armor 8-9 (Platinum Helm/Armor) for frontline durability, Belias gives Knight Potion Lore 1 and Bushi Libra for utility. Transitions between Holy Excalibur DPS and Arcane Magick support.', gambits: ['Foe: Weak Holy → Attack', 'Foe: Flying → Aeroga'], gambitStrategy: 'Auto-exploit weaknesses for 1.5x damage. Excalibur (physical/Holy) or Aeroga (magic/Wind) depending on enemy type.', gear: ['Excalibur | Holy-element sword with MAG scaling', 'Black Robes | Maximizes magic damage output', 'Grand Armor | Heavy armor for frontline durability', 'Demon Shield | High evasion with immunities'] },
            { char: 'Ashe', jobs: ['Black Mage', 'White Mage'], espers: ['Chaos'], role: 'Mage', why: 'Ultimate Magick character with all magic schools naturally. Chaos gives White Mage excellent weapons (Defender, Save the Queen) and HP +310. Black Mage/White Mage combo has natural access to all spells. White Mage has Haste (single target) but NOT Hastega - rely on Fran for party-wide Hastega.', gambits: ['Ally: HP < 60% → Curaja', 'Foe: Weak Element → -ga spell', 'Foe: HP ≥ 10000 → Scathe'], gambitStrategy: 'Triage healing - heal emergencies, otherwise nuke. Scathe hits everything for moderate damage when weaknesses unknown.', gear: ['Staff of the Magi | Primary weapon + 50% Holy boost', 'Defender | Alternative melee weapon (Chaos unlock)', 'Black Robes | Maximizes all magic damage', 'Circlet | MAG boost headgear', 'Sage\'s Ring | MP regeneration for casters'] },
            { char: 'Penelo', jobs: ['White Mage', 'Shikari'], espers: ['Cuchulainn'], role: 'Healer', why: 'High-evasion healer designed for long fights and party stability. Cuchulainn unlocks Shikari Protectga/Shellga for party-wide defense buffs.', gambits: ['Ally: HP < 70% → Curaga', 'Ally: Any → Phoenix Down', 'Ally: Any → Protectga'], gambitStrategy: 'Evasion healer can\'t heal when dead. Phoenix Down stops chain deaths. Protectga prevents damage cascades.', gear: ['Main Gauche | 50% evasion dagger for survival', 'Crystal Shield | Best shield for evasion tank', 'Rubber Suit | Situational Thunder immunity (vs specific bosses)', 'Ribbon | Status immunity for healer'] }
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
            keyEspers: ['Ultima (Monk Swiftness)', 'Zodiark (Monk Renew)', 'Shemhazai (Bushi Shield Block)'],
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
            { char: 'Vaan', jobs: ['Red Battlemage', 'Knight'], espers: ['Mateus', 'Exodus'], role: 'Knight', why: 'Tactical versatilty. Reliable physical damage and early-game recovery magicks.', gambits: ['Ally: HP < 50% → Curaga', 'Ally: Any → Protect'], gambitStrategy: 'Hybrid role reduces healer burden. Red Battlemage magic lets tank double as emergency medic.', gear: ['Excalibur | Holy-element sword with MAG scaling', 'Grand Armor | Best heavy armor for defense', 'Demon Shield | High evasion with immunities', 'Bubble Belt | HP boost for survivability'] },
            { char: 'Balthier', jobs: ['Foebreaker', 'Bushi'], espers: ['Belias'], role: 'Berserker', why: 'Bushi/Break synergy. High-mitigation offensive character with automated combat actions. Belias unlocks Bushi Libra and Foebreaker Horology for utility.', gambits: ['Foe: HP ≥ 10000 → Expose', 'Self: HP = 100% → Berserk'], gambitStrategy: 'Debuff boss once, then permanent DPS mode. Expose amplifies all party physical damage.', gear: ['Masamune | MAG-scaling katana (combos with Genji Gloves)', 'Genji Gloves | Essential 1.8x combo rate for katanas', 'Berserk Bracers | Permanent Berserk status', 'Golden Amulet | LP boost for faster progression'] },
            { char: 'Fran', jobs: ['Monk', 'Time Battlemage'], espers: ['Zeromus', 'Ultima', 'Zodiark'], role: 'Support', why: 'Highest utility density available. Core buff/debuff engine.', gambits: ['Ally: Any → Hastega', 'Ally: Any → Bravery', 'Self: HP = 100% → Renew'], gambitStrategy: 'Force multiplier - Hastega/Bravery double party effectiveness. Single point of failure if she dies.', gear: ['Kanya | Best pole (109 ATK, Holy element, full 1.25x Genji bonus)', 'Grand Armor | Maximum physical defense for STR scaling', 'Ribbon | Status immunity for support role', 'Bubble Belt | HP boost for survivability'] },
            { char: 'Basch', jobs: ['Archer', 'Uhlan'], espers: ['Adrammelech', 'Famfrit', 'Shemhazai'], role: 'Lancer', why: 'Shemhazai unlocks critical Heavy Armor for Archer (Dragon/Grand/Maximilian). Adrammelech gives Uhlan Battle Lore. Famfrit provides HP bonuses and Uhlan Potion Lore 3. Linear weapon progression with solid defensive scaling.', gambits: ['Self: HP = 100% → Berserk'], gambitStrategy: 'Weapon-flexible Berserker - bow for safety, spear for damage. Same augments benefit both.', gear: ['Zodiac Spear | Primary weapon (highest damage spear)', 'Perseus Bow or Dhanusha | Alternative ranged option', 'Grand Armor | Heavy armor from Shemhazai', 'Germinas Boots | +50 Speed essential for bow damage', 'Berserk Bracers | Permanent Berserk status'] },
            { char: 'Ashe', jobs: ['Black Mage', 'White Mage'], espers: ['Chaos'], role: 'Mage', why: 'Primary magus character with natural access to all magic schools (Black, White, Time, Green). Chaos provides excellent weapons (Defender, Save the Queen) and HP boost. White Mage has Haste (single target) but NOT Hastega - Fran (Monk/Time Battlemage) provides party-wide Hastega.', gambits: ['Ally: HP < 60% → Curaja', 'Foe: Flying → Aeroga', 'Foe: HP ≥ 10000 → Ardor'], gambitStrategy: 'Dual-purpose mage prioritizes emergency healing, otherwise nukes high-value targets.', gear: ['Staff of the Magi | Primary weapon + 50% Holy boost', 'Defender | Alternative melee weapon (Chaos unlock)', 'Black Robes | Maximizes all magic damage', 'Circlet | MAG boost headgear', 'Sage\'s Ring | MP regeneration for casters'] },
            { char: 'Penelo', jobs: ['White Mage', 'Shikari'], espers: ['Cuchulainn'], role: 'Healer', why: 'Evasion tank healer. Cuchulainn unlocks Shikari Protectga/Shellga for party-wide defense. Main Gauche + shields for 90%+ evasion. White Mage provides full healing suite naturally.', gambits: ['Ally: HP < 70% → Curaga', 'Ally: Any → Phoenix Down', 'Ally: Any → Protectga'], gambitStrategy: '90% dodge chance keeps dedicated healer alive. Dead healer = party wipe. Phoenix Down insurance.', gear: ['Main Gauche | 50% evasion dagger for survival', 'Crystal Shield | Primary shield (90% evasion with Main Gauche)', 'Demon Shield | Situational for status-heavy encounters', 'Ribbon | Status immunity for healer role'] }
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
            keyEspers: ['Cuchulainn (Protectga/Shellga)', 'Ultima (Swiftness)', 'Zodiark (Renew)'],
            recommendedLevel: 'Level 35+',
            notes: 'Won\'t work without Main Gauche evasion stacking. Strategy relies on Party Lead dodging all physical attacks. No backup Hastega source - keep Fran alive.'
        },
        why: 'Built around leader-targeting mechanics. This setup makes the party leader nearly untouchable via evasion stacking, letting support characters focus on offense. Ideal for technical players who understand positioning and threat management.',
        parties: [
            { name: 'Evasion Masters', members: ['Vaan', 'Fran', 'Ashe'], why: 'LEAD: Vaan (Evasion Tank). 90%+ evasion rating provides high stability.' },
            { name: 'Swift Assault', members: ['Vaan', 'Basch', 'Fran'], why: 'LEAD: Vaan (Evasion Tank). Offensive damage maximized through Berserker pairing.' },
            { name: 'Enduring Journey', members: ['Vaan', 'Ashe', 'Penelo'], why: 'LEAD: Vaan (Evasion Tank). Dual magic healers for long boss fights.' }
        ],
        builds: [
            { char: 'Vaan', jobs: ['Red Battlemage', 'Shikari'], espers: ['Mateus', 'Cuchulainn', 'Exodus'], role: 'Evasion Tank', why: 'Main Gauche + Shield synergy. Dodges nearly all physical attacks. Cuchulainn unlocks Red Battlemage tier 3 spells (Firaga/Thundaga/Blizzaga/Sleepga) and Shikari Protectga/Shellga. Mateus gives Shikari Gil Toss. Exodus unlocks Red Battlemage Heavy Armor for durability.', gambits: ['Ally: HP < 50% → Curaga', 'Ally: Any → Protectga'], gambitStrategy: 'Leader position draws aggro. 90% evasion means enemies miss constantly - tank becomes untouchable party healer.', gear: ['Main Gauche | 50% evasion dagger for tank role', 'Crystal Shield | Best shield for evasion stacking', 'Demon Shield | Situational alternative vs status effects', 'Genji Armor | High defense for evasion build', 'Ribbon | Status immunity for lead position'] },
            { char: 'Balthier', jobs: ['Knight', 'Black Mage'], espers: ['Hashmal'], role: 'Battle Mage', why: 'Evasion/Magick synergy. Leverages Holy Excalibur scaling with advanced Arcane Magick. Hashmal unlocks Knight healing suite (Curaja/Bravery/Faith/Confuse) and Black Mage Makara for support capability.', gambits: ['Foe: Weak Holy → Attack', 'Foe: Undead → Holy', 'Ally: HP < 50% → Curaga'], gambitStrategy: 'Auto-exploit Holy weakness (1.5x damage). Undead take quadruple damage from Holy element.', gear: ['Excalibur | Holy-element sword with MAG scaling', 'Black Robes | MAG boost + 50% Holy damage for Excalibur', 'Grand Armor | Heavy armor for frontline durability', 'Crystal Shield | High magic defense shield', 'Sage\'s Ring | MP regeneration for spell casting'] },
            { char: 'Fran', jobs: ['Monk', 'Time Battlemage'], espers: ['Zeromus', 'Ultima', 'Zodiark'], role: 'Support', why: 'Buff and debuff specialist with natural Hastega (Time Battlemage). Primary source of Expose and Renew. Ultima unlocks Monk Swiftness x2, Zeromus unlocks Monk Channeling (infinite MP), Zodiark unlocks Monk Renew. Complete utility powerhouse with Hastega + Renew + Swiftness + Channeling.', gambits: ['Ally: Any → Hastega', 'Self: HP = 100% → Renew', 'Foe: HP ≥ 10000 → Expose'], gambitStrategy: 'Build revolves around keeping Fran alive - losing Hastega cripples the entire team.', gear: ['Kanya | Best pole (109 ATK, Holy element, full 1.25x Genji bonus)', 'Grand Armor | Maximum physical defense for STR scaling', 'Ribbon | Status immunity for support role', 'Golden Amulet | LP boost for faster progression'] },
            { char: 'Basch', jobs: ['Bushi', 'Knight'], espers: ['Belias', 'Chaos'], role: 'Attacker', why: 'Swiftness 3 optimized Berserker for maximum damage. Belias unlocks Knight Potion Lore 1 and Bushi Libra. Chaos gives Knight excellent weapons (Excalipur, Revive) and HP +390.', gambits: ['Self: HP = 100% → Berserk'], gambitStrategy: 'Swiftness 3 doubles attack frequency. Berserk removes control but maximizes raw damage output.', gear: ['Masamune | MAG-scaling katana (combos with Genji Gloves)', 'Genji Gloves | Essential 1.8x combo rate for katanas', 'Berserk Bracers | Permanent Berserk status', 'Bubble Belt | HP boost for survivability'] },
            { char: 'Ashe', jobs: ['Black Mage', 'White Mage'], espers: ['Zalera'], role: 'Magick Support', why: 'Complete magic caster with natural access to Black, White, Time, and Green magic schools. Zalera gives Black Mage Steal and Poach for utility. White Mage has Haste (single target) but NOT Hastega - rely on Fran for party-wide Hastega.', gambits: ['Ally: HP < 60% → Curaja', 'Foe: Weak Element → -ga spell', 'Foe: HP ≥ 10000 → Scathe'], gambitStrategy: 'Backup healer when evasion tank takes a rare hit. Otherwise exploits weaknesses for max magic DPS.', gear: ['Staff of the Magi | Primary weapon + 50% Holy boost', 'Black Robes | Maximizes all magic damage', 'Circlet | MAG boost headgear', 'Sage\'s Ring | MP regeneration for casters'] },
            { char: 'Penelo', jobs: ['White Mage', 'Archer'], espers: ['Adrammelech', 'Shemhazai'], role: 'Support', why: 'Hybrid healer/ranged DPS. Shemhazai unlocks critical Heavy Armor for Archer (Dragon/Grand/Maximilian Helm/Armor). White Mage provides full healing suite, Archer provides ranged damage and item support.', gambits: ['Ally: Any → Phoenix Down', 'Ally: HP < 70% → Curaga', 'Ally: Any → Protect'], gambitStrategy: 'Ranged safety while providing healing. Phoenix Down insurance when evasion tank actually gets hit.', gear: ['Burning Bow | Fire-element bow for weaknesses', 'Perseus Bow or Dhanusha | Top endgame bows (comparable stats)', 'White Robes | Healing power boost', 'Grand Armor | Heavy armor unlocked by Shemhazai'] }
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
            keyEspers: ['Ultima (Swiftness)', 'Zodiark (Renew)', 'Zeromus (Channeling)'],
            recommendedLevel: 'Level 70+',
            notes: 'Yiazmat is Dark-weak. Primary strategy: Berserked Yagyu Darkblade with Black Robes (50% Dark boost). Multi-hour fight requires all 6 characters rotating through stages. Remember: Fran must be in every party rotation - no backup Hastega source.'
        },
        why: 'Built exclusively for Dark-weak superbosses like Yiazmat. Primary DPS: Berserked Penelo with Dark-boosted Yagyu Darkblade exploiting weakness. Support cast provides Hastega, Reverse, Expose, and infinite MP regeneration through rotation cycles. Not optimized for general use.',
        parties: [
            { name: 'Stage 1: Dark Assault', members: ['Penelo', 'Fran', 'Ashe'], why: 'PRIMARY DAMAGE PHASE. Penelo (Berserked Yagyu Darkblade + Black Robes) exploits Dark weakness. Fran provides Hastega/Expose. Ashe is full-time healer (Curaja/Reverse/Bio). Rotate out when MP depletes.' },
            { name: 'Stage 2: Relief Rotation', members: ['Balthier', 'Vaan', 'Basch'], why: 'RECOVERY PHASE. Balthier (Whale Whisker + Renew from Zodiark) + Basch (bow/spear) maintain pressure while Stage 1 recovers. Vaan provides backup healing. Balthier applies full Break suite for next rotation.' },
            { name: 'Stage 3: Sustained Endurance', members: ['Penelo', 'Ashe', 'Balthier'], why: 'MARATHON PHASE. Returns Penelo (primary DPS) with dual support - Ashe (primary healer) and Balthier (Renew/Expose/Breaks/backup DPS). For extended final phases and boss patience wars.' }
        ],
        builds: [
            { char: 'Penelo', jobs: ['White Mage', 'Shikari'], espers: ['Cuchulainn'], role: 'Attacker', why: 'CORE STRATEGY: Berserked Yagyu Darkblade + Black Robes = 50% Dark damage boost exploiting Yiazmat\'s weakness. Highest DPS for this fight. Cuchulainn unlocks Shikari Protectga/Shellga for party defense when not Berserked. Cannot cast magic while Berserked - Ashe handles all healing.', gambits: ['Self: HP = 100% → Berserk'], gambitStrategy: 'Dark-weak boss means Berserk with Dark weapon deals 1.5x damage. Entire DPS strategy in one gambit.', gear: ['Yagyu Darkblade | Dark-element ninja sword (combos with Genji Gloves)', 'Black Robes | 50% Dark damage boost essential', 'Genji Gloves | 1.8x combo rate for ninja swords', 'Germinas Boots | Speed boost for DPS', 'Bubble Belt | HP threshold for survivability'] },
            { char: 'Fran', jobs: ['Monk', 'Time Battlemage'], espers: ['Zeromus', 'Ultima'], role: 'Support', why: 'CRITICAL TRINITY NODE: Swiftness 3 (Ultima) + Channeling 3 (Zeromus) + Hastega (natural Time Battlemage). Provides Expose (Monk), Hastega, and infinite MP regeneration. Whale Whisker backup DPS (Yiazmat absorbs Holy so avoid Kanya).', gambits: ['Ally: Any → Hastega', 'Foe: HP ≥ 10000 → Expose', 'Ally: Any → Bravery'], gambitStrategy: 'Marathon fight requires Fran in every rotation - no other Hastega. Expose/Bravery multiply Penelo\'s DPS.', gear: ['Whale Whisker | Non-elemental pole (Yiazmat absorbs Holy)', 'Grand Armor | Maximum physical defense for STR scaling', 'Genji Gloves | Combo boost for poles', 'Ribbon | Status immunity for long fight', 'Bubble Belt | HP threshold survival'] },
            { char: 'Ashe', jobs: ['Black Mage', 'White Mage'], espers: ['Exodus', 'Chaos'], role: 'Primary Healer', why: 'FULL-TIME HEALER: Complete healing magic suite (Curaja/Reverse/Esuna) and Black Magic for damage. Penelo cannot cast while Berserked, making Ashe the sole healer. Exodus unlocks Black Mage Heavy Armor (Platinum Helm/Armor) for frontline durability. Chaos provides White Mage weapons (Defender, Save the Queen) and HP boost. White Mage has Haste (single target) but NOT Hastega - rely on Fran for party-wide Hastega.', gambits: ['Ally: HP < 10% → Reverse', 'Ally: HP < 60% → Curaja', 'Foe: HP ≥ 10000 → Bio'], gambitStrategy: 'Reverse at critical HP prevents 50M HP boss from one-shotting. Curaja sustains marathon healing.', gear: ['Staff of the Magi | Primary weapon + 50% Holy boost', 'White Robes | Maximizes healing output', 'Circlet | MAG boost for healing', 'Sage\'s Ring | MP regeneration for marathon healing', 'Bubble Belt | HP boost for survival'] },
            { char: 'Balthier', jobs: ['Monk', 'Foebreaker'], espers: ['Hashmal', 'Zodiark'], role: 'Break Specialist', why: 'Full Break suite (Expose, Shear, Wither, Addle) maximizes party DPS. Zodiark provides Renew (Monk) for backup healing. Hashmal unlocks Foebreaker Curaga for self-sustaining during relief rotations. Whale Whisker provides strong non-elemental DPS (Yiazmat absorbs Holy so avoid Kanya).', gambits: ['Foe: HP ≥ 10000 → Expose', 'Foe: HP ≥ 5000 → Shear', 'Self: HP = 100% → Renew'], gambitStrategy: '4-stack breaks (Expose/Shear/Wither/Addle) multiply all damage. Renew enables rotation cycling.', gear: ['Whale Whisker | Non-elemental pole (Yiazmat absorbs Holy)', 'Grand Armor | Maximum physical defense', 'Genji Gloves | Combo boost for poles', 'Ribbon | Status immunity essential', 'Bubble Belt | HP threshold survival'] },
            { char: 'Vaan', jobs: ['Red Battlemage', 'Knight'], espers: ['Mateus'], role: 'Support', why: 'Backup healing and support during relief rotation. Red Battlemage provides Cura/Curaga when Ashe needs MP recovery. Mateus unlocks Knight healing spells (Curaga/Regen/Cleanse/Esuna) for comprehensive support. Knight gives Heavy Armor for durability.', gambits: ['Ally: HP < 50% → Curaga', 'Ally: Any → Protect'], gambitStrategy: 'Team B healer for rotation swaps. Stage 1 recovers MP while Stage 2 maintains pressure.', gear: ['Excalibur | Holy-element sword (not super-effective but high ATK)', 'Grand Armor | Maximum physical defense', 'Demon Shield | High evasion with immunities', 'Ribbon | Status immunity', 'Bubble Belt | HP survival threshold'] },
            { char: 'Basch', jobs: ['Archer', 'Uhlan'], espers: ['Adrammelech', 'Shemhazai'], role: 'Ranged Support', why: 'Safe ranged attacks from distance. Provides backup physical DPS during relief phases. Adrammelech gives Uhlan Battle Lore. Shemhazai unlocks critical Heavy Armor for Archer (Dragon/Grand/Maximilian). Bow/spear versatility for different phases.', gambits: ['Ally: Any → Bravery', 'Foe: HP ≥ 10000 → Expose'], gambitStrategy: 'Ranged DPS stays safe while rotation recovers. Maintains buffs/debuffs between primary damage phases.', gear: ['Perseus Bow or Dhanusha | Top endgame bows (comparable)', 'Zodiac Spear | Alternative when switching to melee range', 'Grand Armor | Heavy Armor unlocked by Shemhazai', 'Ribbon | Status immunity', 'Bubble Belt | HP threshold'] }
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
            { char: 'Vaan', jobs: ['Shikari', 'Knight'], espers: ['Cuchulainn', 'Hashmal'], role: 'Evasion Tank', why: 'Signature thief-tank. Effectively combines Main Gauche evasion with high-tier item support. Cuchulainn unlocks Knight Battle Lore and Shikari Protectga/Shellga. Hashmal unlocks Knight healing (Curaja/Bravery/Faith/Confuse) and Shikari Bonecrusher.', gambits: ['Ally: HP < 50% → Curaga', 'Ally: Any → Protectga'], gambitStrategy: 'Street thief archetype - evade attacks, protect allies. Lore-friendly tank with narrative weight.', gear: ['Main Gauche | 50% evasion dagger for street thief', 'Crystal Shield | Primary shield (90% evasion total)', 'Demon Shield | Situational vs status effects', 'Genji Armor | High defense for evasion build', 'Ribbon | Status immunity for lead position'] },
            { char: 'Balthier', jobs: ['Machinist', 'Foebreaker'], espers: ['Adrammelech', 'Zeromus', 'Famfrit'], role: 'Marksman', why: 'Sky pirate gun specialist. Pairs guns with full Break suite. Zeromus unlocks Foebreaker Magick Lore x4. Adrammelech unlocks Foebreaker Battle Lore. Famfrit unlocks signature Machinist Hastega (and Foebreaker Magick Lore), completing the sky pirate fantasy with gun mastery and tactical support magic.', gambits: ['Ally: Any → Hastega', 'Foe: HP ≥ 10000 → Expose', 'Foe: Flying → Dark Shot'], gambitStrategy: 'Sky pirate uses signature gun + support magic. Famfrit unlock preserves Balthier\'s narrative identity.', gear: ['Fomalhaut | Highest damage gun (guns don\'t combo - no Genji Gloves needed)', 'Aldebaran | Alternative strong gun (slightly lower damage)', 'Heavy Armor | Physical defense for frontline', 'Golden Amulet | LP boost for progression'] },
            { char: 'Fran', jobs: ['Archer', 'Time Battlemage'], espers: ['Shemhazai'], role: 'Mystic Support', why: 'Viera archer build. Pairs bows with time magic and buffs. Shemhazai unlocks Archer Heavy Armor (Dragon/Magepower/Grand Helm, Dragon/Maximilian/Grand Armor) for frontline survivability. Time Battlemage provides natural Hastega.', gambits: ['Ally: Any → Hastega', 'Ally: Any → Bravery', 'Foe: HP ≥ 10000 → Expose'], gambitStrategy: 'Viera archer archetype with dual Hastega sources (Balthier backup). Flexibility for party swapping.', gear: ['Perseus Bow or Dhanusha | Top bows (need Germinas Boots for damage)', 'Burning Bow | Fire-element bow for weaknesses', 'Black Robes | Boosts magic damage', 'Ribbon | Status immunity for support role'] },
            { char: 'Basch', jobs: ['Knight', 'Foebreaker'], espers: ['Mateus', 'Zodiark'], role: 'Guardian', why: 'Royal knight and guard. Strong defense with Break abilities. Mateus unlocks Knight healing suite (Curaga/Esuna/Cleanse/Regen). Zodiark adds Knight Revive and HP boost. Knight has Haste (single target) but NOT Hastega - rely on Balthier or Fran for party-wide Hastega.', gambits: ['Foe: HP ≥ 10000 → Expose', 'Ally: HP < 50% → Curaga', 'Ally: Any → Protect'], gambitStrategy: 'Narrative-perfect captain of the guard - defends, heals, and leads from the front.', gear: ['Excalibur | Holy-element sword with MAG scaling (thematic for knight)', 'Grand Armor | Maximum defense for royal guard', 'Crystal Shield | High defense shield', 'Bubble Belt | HP boost for survivability'] },
            { char: 'Ashe', jobs: ['Black Mage', 'White Mage'], espers: ['Exodus', 'Chaos'], role: 'Apex Magus', why: 'Princess mage with natural access to all magic schools (Black, White, Time, Green). Chaos provides White Mage weapons (Defender, Save the Queen) and HP boost. Exodus unlocks Black Mage Heavy Armor for durability. White Mage has Haste (single target) but NOT Hastega - rely on Balthier or Fran for party-wide Hastega.', gambits: ['Ally: HP < 60% → Curaja', 'Foe: Weak Element → -ga spell', 'Foe: HP ≥ 10000 → Scathe'], gambitStrategy: 'Royalty commands all magic schools naturally. Princess leads with overwhelming magical supremacy.', gear: ['Staff of the Magi | Highest MAG staff + 50% Holy boost', 'Black Robes | Maximizes all magic damage', 'Circlet | MAG boost headgear for royalty', 'Sage\'s Ring | MP regeneration for casters'] },
            { char: 'Penelo', jobs: ['White Mage', 'Monk'], espers: ['Ultima'], role: 'White Mage', why: 'Fast healer with strong physical backup. Ultima unlocks Monk Swiftness x2 for enhanced action speed. White Mage provides full healing suite, Monk provides pole damage and durability.', gambits: ['Ally: HP < 70% → Curaga', 'Ally: Any → Phoenix Down', 'Ally: Any → Protect'], gambitStrategy: 'Dancer background fits Monk mobility. Swiftness 3 represents agility-based combat style.', gear: ['Kanya | Best pole (109 ATK, Holy element, full 1.25x Genji bonus)', 'White Robes | Healing power boost', 'Whale Whisker | Non-elemental alternative (108 ATK, for Holy-absorbing enemies)', 'Opal Ring | Dark/Thunder immunity accessory'] }
        ]
    },
    'Spare No Expense': {
        shortName: 'Ultimate',
        desc: 'Trial Mode luxury build. No equipment compromises.',
        metrics: { lp: 'A', atk: 'S', flex: 'S' },
        phase: 'late',
        requirements: {
            availability: 'Trial Mode Access Required',
            unlocks: 'Requires Trial Mode farming: 2 Genji Gloves (Gilgamesh + Hunt Club), unlimited Ribbons (Stage 49/93/99), multiple Zodiac Spears (Stage 62).',
            criticalGear: [
                'Genji Gloves x2 | One for Monk (pole), one for Bushi (katana)',
                'Ribbon x6 | Farm Trial Mode for full party immunity',
                'Zodiac Spear x2+ | Multiple copies via Stage 62 farming',
                'Main Gauche | Evasion base for tank'
            ],
            keyEspers: ['Adrammelech (TBM Cura+Raise)', 'Zeromus/Ultima (Monk Channeling+Swiftness)', 'Chaos/Zodiark (Monk Holy+Renew)', 'Shemhazai (Archer Heavy Armor)', 'Cuchulainn/Famfrit (Uhlan Wither+Sustain)'],
            recommendedLevel: 'Level 50+',
            notes: 'This build requires Trial Mode equipment farming. Without 2 Genji Gloves and unlimited Ribbons, use "Balanced" instead. Prioritizes best-in-slot job pairings over license efficiency.'
        },
        why: 'Built for players with Trial Mode access who want zero equipment compromises. Uses best-in-slot pairings: Bushi/Knight for Excalibur + White Robes synergy, Monk/Time Battlemage for ultimate utility with natural Hastega, Black Mage/White Mage for complete magic mastery, Archer/Foebreaker for maximum Battle Lores boosting bow damage, and Uhlan/Bushi for Holy Lance + White Robes synergy with Swiftness 3. Spreads 2 Genji Gloves across Monk and Bushi for maximum team DPS. Fran is sole Hastega source via Time Battlemage.',
        parties: [
            { name: 'Optimal Formation', members: ['Penelo', 'Fran', 'Vaan'], why: 'Best all-around party. Penelo leads (90%+ evasion tank + healing), Fran (Hastega + buffs/debuffs + utility), Vaan (katana DPS/Holy flex). Covers all roles with maximum efficiency. Fran is essential for Hastega - rotate other characters based on encounter needs.' }
        ],
        builds: [
            { char: 'Penelo', jobs: ['White Mage', 'Shikari'], espers: ['Zalera'], role: 'Evasion Healer', why: 'Maximum evasion tank + primary healer. Main Gauche + Crystal Shield = 90%+ evasion. Zalera gives Shikari HP +435 for survivability. White Mage has natural Haste (single target) but NOT Hastega - rely on Fran for party-wide Hastega. Full healing suite with evasion tanking.', gambits: ['Ally: HP < 70% → Curaga', 'Ally: Any → Phoenix Down', 'Ally: Any → Protectga'], gambitStrategy: 'Lead position + 90% evasion = unkillable healer. Party never loses its healing source.', gear: ['Main Gauche | 50% evasion dagger for tank role', 'Crystal Shield | Best shield for evasion stacking', 'Demon Shield | Alternative with status immunities', 'White Robes | Healing power boost', 'Ribbon | Trial Mode status immunity', 'Opal Ring | Elemental immunity backup'] },
            { char: 'Fran', jobs: ['Monk', 'Time Battlemage'], espers: ['Adrammelech', 'Zeromus', 'Chaos', 'Ultima', 'Zodiark'], role: 'Support Mage', why: 'Complete Monk Trinity + Time Battlemage synergy. Adrammelech (Cura/Raise for TBM backup healing), Zeromus (Channeling for Monk), Chaos (Esunaga/Protectga/Shellga/Holy for Monk), Ultima (Swiftness x2 for Monk), Zodiark (Renew for Monk). Time Battlemage provides natural Hastega (no esper needed). The ultimate buff/debuff/healing engine with Hastega, Cura, Raise, Bravery, Faith, Expose, Renew, Protectga, Shellga, Holy. Kanya with Genji Gloves for 1.25x combo-boosted Holy DPS when not supporting.', gambits: ['Ally: Any → Hastega', 'Self: HP = 100% → Renew', 'Foe: HP ≥ 10000 → Expose'], gambitStrategy: 'Sole Hastega - mandatory for every party. 5 Espers unlock every support tool needed.', gear: ['Kanya | Best pole (109 ATK, Holy element, full Genji bonus)', 'Grand Armor | STR scaling for pole damage', 'Genji Gloves | PRIORITY 2: 1.25x combo multiplier for Kanya', 'Ribbon | Trial Mode status immunity', 'Golden Amulet | LP boost for utility unlocks'] },
            { char: 'Vaan', jobs: ['Bushi', 'Knight'], espers: ['Belias', 'Mateus', 'Hashmal'], role: 'Warrior', why: 'Wiki-recommended best Bushi pairing. Excalibur + White Robes synergy (50% Holy boost) or Masamune katana with MAG scaling. Mateus unlocks Knight healing (Curaga/Esuna/Cleanse/Regen), Hashmal adds upgraded healing suite (Curaja/Bravery/Faith), Belias provides Libra for enemy info. Can flex between Holy damage (Knight) and katana Berserk (Bushi) with self-sustain.', gambits: ['Ally: HP < 50% → Curaga', 'Foe: Weak Holy → Attack'], gambitStrategy: 'Flex fighter - emergency heal allies, otherwise exploit Holy weakness with Excalibur. Manually Berserk when going full DPS mode with Masamune.', gear: ['Masamune | MAG-scaling katana for Berserk DPS', 'Excalibur | Holy sword with White Robes (50% boost)', 'White Robes | 50% Holy damage boost', 'Grand Armor | Heavy armor for frontline', 'Genji Gloves | PRIORITY 1: 1.8x combo rate for katanas', 'Ribbon | Trial Mode farmed status immunity'] },
            { char: 'Balthier', jobs: ['Archer', 'Foebreaker'], espers: ['Shemhazai'], role: 'Ranged DPS', why: 'Archer primary with Foebreaker augments. Shemhazai unlocks Archer Heavy Armor 10-12 (MANDATORY). Foebreaker provides maximum Battle Lores for bow damage scaling plus break utility (Expose/Shear before unloading arrows). Berserked bow DPS with Burning Bow for fire damage or Perseus Bow for raw power.', gambits: ['Foe: HP ≥ 10000 → Expose', 'Foe: HP ≥ 5000 → Shear', 'Self: HP = 100% → Berserk'], gambitStrategy: 'Stack breaks before Berserking. Maximum Battle Lores make bow damage competitive with melee.', gear: ['Perseus Bow / Dhanusha | Top-tier endgame bows', 'Burning Bow | Fire element for sustained physical damage', 'Grand Armor | Heavy armor from Shemhazai', 'Germinas Boots | +50 Speed essential for bow damage', 'Ribbon | Trial Mode status immunity', 'Bubble Belt | HP survival for Berserked DPS'] },
            { char: 'Basch', jobs: ['Uhlan', 'Bushi'], espers: ['Cuchulainn', 'Famfrit'], role: 'Spear DPS', why: 'Uhlan primary with Bushi augments. Holy Lance + White Robes = 50% Holy damage boost (same synergy as Excalibur). Zodiac Spear for non-Holy-weak enemies. Bushi provides Swiftness 3 for faster actions and Battle Lores for damage scaling. Cuchulainn gives Uhlan Wither (spreads break duties with Balthier for faster debuff application). Famfrit provides Uhlan Potion Lore 3 for sustain.', gambits: ['Self: HP = 100% → Berserk'], gambitStrategy: 'Permanent Berserk mode. Manually switch weapons based on enemy: Holy Lance for Holy-weak, Zodiac Spear otherwise.', gear: ['Holy Lance | Holy spear with White Robes (50% boost)', 'Zodiac Spear | Best spear for non-Holy-weak (farm multiple)', 'White Robes | 50% Holy damage boost for Holy Lance', 'Grand Armor | Heavy armor alternative', 'Ribbon | Trial Mode status immunity', 'Bubble Belt | HP survival for Berserked DPS'] },
            { char: 'Ashe', jobs: ['Black Mage', 'White Mage'], espers: ['Exodus'], role: 'Ultimate Mage', why: 'Complete magic mastery - Black Mage/White Mage naturally has ALL magic schools without espers (Black, White, Time, Green). Exodus unlocks Black Mage Heavy Armor 8-9 (Platinum Helm, Platinum Armor) for frontline durability. Can cast Curaja, Scathe, Ardor, Holy naturally. White Mage has natural Haste (single target) but NOT Hastega - rely on Fran for party-wide Hastega. Staff of the Magi provides 50% Holy damage boost.', gambits: ['Ally: HP < 60% → Curaja', 'Foe: Weak Element → -ga spell', 'Foe: Undead → Holy'], gambitStrategy: 'Every magic school without Espers. Complete spell access lets her respond to any situation.', gear: ['Staff of the Magi | Best staff + 50% Holy boost', 'Black Robes | 50% Dark damage for Scathe', 'White Robes | 50% Holy damage boost', 'Platinum Armor | Heavy armor from Exodus', 'Circlet | MAG boost headgear', 'Ribbon | Trial Mode status immunity', 'Sage\'s Ring | MP regeneration essential'] }
        ]
    }
};

// Preset Icon Mapping
const PRESET_ICONS = {
    'First Jobs': 'Beginner',
    'Max Efficiency': 'Efficiency',
    'Big Game Hunter': 'Hunter',
    'Balanced': 'Beginner',
    'Leader Trinity': 'Trinity',
    'Yiazmat Specialist': 'Endurance',
    'Lore Friendly': 'Lore',
    'Spare No Expense': 'Hunter'
};

