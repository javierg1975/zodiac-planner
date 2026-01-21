// FFXII: THE ZODIAC AGE - DEFINITIVE ESPER & JOB REFERENCE
// SOURCE: https://underbuffed.com/final-fantasy-xii-the-zodiac-age-esper-licenses/
// VALIDATED: 2026-01-21

// ============================================================================
// SECTION 1: COMPLETE ESPER UNLOCK DATABASE
// ============================================================================

const ESPER_UNLOCKS_DB = {
    'Belias': {
        'Knight': ['Potion Lore 1'],
        'Foebreaker': ['Horology'],
        'Bushi': ['Libra']
    },
    'Adrammelech': {
        'White Mage': ['Souleater', 'Battle Lore'],
        'Uhlan': ['Battle Lore'],
        'Time Battlemage': ['Cura', 'Raise'],
        'Foebreaker': ['Battle Lore'],
        'Black Mage': ['Fumarole', 'Tumulus'],
        'Bushi': ['Souleater'],
        'Shikari': ['Shades of Black']
    },
    'Zalera': {
        'Monk': ['Traveler'],
        'Time Battlemage': ['Ether Lore 3'],
        'Black Mage': ['Steal', 'Poach'],
        'Bushi': ['Blood Sword', 'Karkata'],
        'Shikari': ['HP +435']
    },
    'Cuchulainn': {
        'White Mage': ['Libra'],
        'Uhlan': ['Wither'],
        'Red Battlemage': ['Firaga', 'Thundaga', 'Blizzaga', 'Sleepga'],
        'Knight': ['Battle Lore'],
        'Foebreaker': ['Shades of Black'],
        'Bushi': ['Stamp'],
        'Shikari': ['Protectga', 'Shellga']  // NOT REMEDY LORE 3!
    },
    'Mateus': {
        'Uhlan': ['Magick Lore', 'Magick Lore'],
        'Knight': ['Curaga', 'Esuna', 'Cleanse', 'Regen'],
        'Time Battlemage': ['HP +230'],
        'Black Mage': ['Caldera', 'Volcano'],
        'Shikari': ['Gil Toss']
    },
    'Hashmal': {
        'Uhlan': ['Bonecrusher'],
        'Red Battlemage': ['Steal'],
        'Knight': ['Curaja', 'Bravery', 'Faith', 'Confuse'],
        'Monk': ['Cura', 'Raise'],
        'Time Battlemage': ['Channeling'],  // NOT Channeling 3, just "Channeling"
        'Foebreaker': ['Swiftness'],
        'Black Mage': ['Makara'],
        'Shikari': ['Bonecrusher']
    },
    'Famfrit': {
        'White Mage': ['Orichalcum Dirk', 'Platinum Dagger', 'Numerology'],  // NO HASTEGA
        'Uhlan': ['Potion Lore 3'],
        'Machinist': ['Hastega', 'Slowga', 'Vanishga', 'Reflectga', 'Warp', 'Graviga'],  // ONLY Machinist gets Hastega from esper
        'Red Battlemage': ['Battle Lore', 'Battle Lore'],
        'Monk': ['Arise', 'Dispelga'],
        'Time Battlemage': ['Battle Lore'],  // NO HASTEGA - already has it naturally
        'Foebreaker': ['Magick Lore'],
        'Archer': ['HP +390', 'HP +435'],
        'Black Mage': ['HP +190', 'HP +230', 'HP +310']
    },
    'Exodus': {
        'White Mage': ['Battle Lore'],
        'Machinist': ['Oil', 'Decoy'],
        'Red Battlemage': ['Heavy Armor 8-10'],  // Platinum/Giant/Dragon helms+armor
        'Knight': ['HP +350'],
        'Monk': ['Souleater'],
        'Time Battlemage': ['Battle Lore'],
        'Foebreaker': ['Magick Lore', 'Magick Lore', 'Magick Lore', 'Magick Lore'],
        'Black Mage': ['Heavy Armor 8-9'],  // Platinum Helm, Platinum Armor
        'Shikari': ['Stamp'],
        'Bushi': ['HP +500']
    },
    'Zeromus': {
        'White Mage': ['HP +270'],
        'Machinist': ['Makara'],
        'Red Battlemage': ['Channeling'],  // Channeling for infinite MP
        'Monk': ['Sight Unseeing'],
        'Time Battlemage': ['Addle', 'Shear'],  // Breaks
        'Foebreaker': ['Magick Lore', 'Magick Lore', 'Magick Lore', 'Magick Lore'],
        'Black Mage': ['Heavy Armor 10-11'],  // Giant's Helm, Carabineer Mail
        'Bushi': ['Magick Lore', 'Magick Lore']
    },
    'Chaos': {
        'White Mage': ['Defender', 'Save the Queen', 'HP +310'],  // NO HASTEGA!
        'Uhlan': ['Aeroga', 'Bio', 'Blindga', 'Silencega'],
        'Machinist': ['HP +350'],
        'Red Battlemage': ['Ultima Blade'],
        'Knight': ['Excalipur', 'Revive', 'HP +390'],
        'Monk': ['Esunaga', 'Protectga', 'Shellga', 'Holy'],  // Best for Monk
        'Time Battlemage': ['HP +270'],
        'Archer': ['Magick Lore'],
        'Bushi': ['Brawler']
    },
    'Shemhazai': {
        'White Mage': ['HP +230'],
        'Machinist': ['Caldera', 'Volcano'],
        'Red Battlemage': ['Cleanse', 'Esuna'],
        'Knight': ['Potion Lore 2'],
        'Monk': ['Potion Lore 3'],
        'Archer': ['Heavy Armor 10-12'],  // Dragon/Magepower/Grand Helm, Dragon/Maximilian/Grand Armor - CRITICAL
        'Black Mage': ['Steel Mask', 'Mirror Mail'],
        'Bushi': ['Shield Block'],
        'Shikari': ['Guns']  // Spica, Antares, Arcturus, Fomalhaut
    },
    'Ultima': {
        'Uhlan': ['Expose'],
        'Machinist': ['Magick Lore', 'Magick Lore', 'Magick Lore'],
        'Red Battlemage': ['Claymore', 'Defender', 'Save the Queen'],
        'Knight': ['Telekinesis', 'Battle Lore'],
        'Monk': ['Swiftness', 'Swiftness'],  // Swiftness x2 (often listed as "Swiftness 3" - gives ranks 2 and 3)
        'Time Battlemage': ['Swords'],  // Diamond Sword, Runeblade, Deathbringer, Stoneblade
        'Foebreaker': ['Swiftness'],
        'Archer': ['Infuse', '1000 Needles'],
        'Black Mage': ['Telekinesis'],
        'Bushi': ['Stamp'],
        'Shikari': ['Phoenix Lore', 'Phoenix Lore']  // Phoenix Lore x2
    },
    'Zodiark': {
        'White Mage': ['Claymore'],
        'Machinist': ['HP +390'],
        'Red Battlemage': ['Ragnarok'],
        'Knight': ['Excalipur', 'Revive', 'HP +390'],  // NO HASTEGA!
        'Monk': ['Renew'],  // THE critical unlock
        'Time Battlemage': ['Swords'],  // Durandal, Simha
        'Archer': ['Infuse', '1000 Needles'],
        'Bushi': ['Heavy Armor 10-12']  // Giant/Dragon/Magepower Helm, Carabineer/Dragon/Maximilian Armor
    }
};

// ============================================================================
// SECTION 2: JOB NATURAL ABILITIES (NO ESPER REQUIRED)
// ============================================================================

const JOB_NATURAL_ABILITIES = {
    'White Mage': {
        hastega: false,  // CRITICAL: White Mage CANNOT get Hastega!
        haste: true,
        curaja: true,
        renew: false,  // Must get from esper
        swiftness: 0,
        channeling: false,
        remedyLore: 1,
        heavyArmor: false
    },
    'Black Mage': {
        hastega: false,  // CRITICAL: Black Mage CANNOT get Hastega!
        haste: false,
        scathe: true,
        ardor: true,
        swiftness: 0,
        channeling: false,
        renew: false,
        heavyArmor: false
    },
    'Time Battlemage': {
        hastega: true,   // CRITICAL: Time Battlemage HAS natural Hastega!
        haste: true,
        swiftness: 0,
        channeling: false,  // Must get from Hashmal esper
        heavyArmor: false
    },
    'Monk': {
        hastega: false,
        haste: false,
        swiftness: 1,  // Has Swiftness 1, needs Ultima for ranks 2-3
        channeling: false,
        renew: false,  // Must get from Zodiark
        expose: true,  // Natural
        heavyArmor: false
    },
    'Knight': {
        hastega: false,  // CRITICAL: Knight CANNOT get Hastega from any source!
        haste: false,
        swiftness: 1,
        heavyArmor: true
    },
    'Red Battlemage': {
        hastega: false,
        haste: true,
        ardor: true,
        swiftness: 0,
        channeling: false,  // Must get from Zeromus
        heavyArmor: false  // Must get from Exodus
    },
    'Machinist': {
        hastega: false,  // Must get from Famfrit - ONLY esper-unlocked Hastega source
        haste: false,
        swiftness: 3,  // Natural Swiftness 3
        channeling: false,
        heavyArmor: false
    },
    'Bushi': {
        hastega: false,
        haste: false,
        swiftness: 3,  // Natural Swiftness 3
        heavyArmor: false  // Must get from Zodiark
    },
    'Uhlan': {
        hastega: false,
        haste: false,
        swiftness: 1,
        expose: false,  // Must get from Ultima
        heavyArmor: true
    },
    'Foebreaker': {
        hastega: false,
        haste: false,
        swiftness: 0,  // Must get from Hashmal/Ultima
        expose: true,  // Natural
        shear: true,   // Natural
        wither: true,  // Natural
        heavyArmor: true
    },
    'Archer': {
        hastega: false,
        haste: false,
        swiftness: 3,  // Natural Swiftness 3
        shear: true,   // Natural
        heavyArmor: false  // Must get from Shemhazai - CRITICAL
    },
    'Shikari': {
        hastega: false,
        haste: false,
        swiftness: 3,  // Natural Swiftness 3
        remedyLore: 1,  // Natural Remedy Lore 1
        heavyArmor: false  // Can get from Famfrit (HA 3-8) or Shemhazai (guns)
    }
};

// ============================================================================
// SECTION 3: HASTEGA SOURCE VALIDATION (MOST CRITICAL)
// ============================================================================

const HASTEGA_SOURCES = {
    natural: [
        'Time Battlemage'  // ONLY natural source!
    ],
    esperUnlocked: {
        'Machinist': 'Famfrit'  // ONLY esper-unlocked source!
    },
    cannotGetHastega: [
        'White Mage',      // Common error - WM CANNOT get Hastega!
        'Black Mage',      // Common error - BM CANNOT get Hastega!
        'Knight',          // Cannot get from any source
        'Monk',            // Cannot get from any source
        'Red Battlemage',  // Cannot get from any source
        'Bushi',           // Cannot get from any source
        'Uhlan',           // Cannot get from any source
        'Foebreaker',      // Cannot get from any source
        'Archer',          // Cannot get from any source
        'Shikari'          // Cannot get from any source
    ]
};

// ============================================================================
// SECTION 4: CRITICAL ESPER UNLOCKS (HIGH VALUE)
// ============================================================================

const CRITICAL_ESPER_UNLOCKS = {
    // Monk Trinity (highest priority)
    'Ultima_Monk': {
        jobs: ['Monk'],
        unlocks: ['Swiftness x2'],
        priority: 'CRITICAL',
        why: 'Monk needs Swiftness 2-3 for DPS. Other jobs have natural Swiftness 3.'
    },
    'Zodiark_Monk': {
        jobs: ['Monk'],
        unlocks: ['Renew'],
        priority: 'CRITICAL',
        why: 'Only way Monk gets Renew. Ultimate healing spell.'
    },
    'Chaos_Monk': {
        jobs: ['Monk'],
        unlocks: ['Esunaga', 'Protectga', 'Shellga', 'Holy'],
        priority: 'HIGH',
        why: 'Best target for Chaos. Gives Monk full support suite.'
    },

    // Knight Healing
    'Mateus_Knight': {
        jobs: ['Knight'],
        unlocks: ['Curaga', 'Esuna', 'Cleanse', 'Regen'],
        priority: 'HIGH',
        why: 'First healing tier for Knight'
    },
    'Hashmal_Knight': {
        jobs: ['Knight'],
        unlocks: ['Curaja', 'Bravery', 'Faith', 'Confuse'],
        priority: 'HIGH',
        why: 'Upgraded healing + buff suite for Knight'
    },

    // Red Battlemage Tier 3 Magic
    'Cuchulainn_RedBattlemage': {
        jobs: ['Red Battlemage'],
        unlocks: ['Firaga', 'Thundaga', 'Blizzaga', 'Sleepga'],
        priority: 'CRITICAL',
        why: 'MANDATORY. Red Battlemage cannot get tier 3 elemental spells naturally!'
    },
    'Zeromus_RedBattlemage': {
        jobs: ['Red Battlemage'],
        unlocks: ['Channeling'],
        priority: 'HIGH',
        why: 'Infinite MP for sustained casting. Critical for magic DPS.'
    },
    'Exodus_RedBattlemage': {
        jobs: ['Red Battlemage'],
        unlocks: ['Heavy Armor 8-10'],
        priority: 'HIGH',
        why: 'Heavy Armor for frontline Red Battlemage paired with light armor class'
    },

    // Archer Heavy Armor
    'Shemhazai_Archer': {
        jobs: ['Archer'],
        unlocks: ['Heavy Armor 10-12'],
        priority: 'CRITICAL',
        why: 'MANDATORY. Archer needs heavy armor for STR scaling on bows.'
    },

    // Machinist Hastega
    'Famfrit_Machinist': {
        jobs: ['Machinist'],
        unlocks: ['Hastega', 'Slowga', 'Vanishga', 'Reflectga', 'Warp', 'Graviga'],
        priority: 'HIGH',
        why: 'ONLY esper-unlocked Hastega source. Critical for builds without Time Battlemage.'
    },

    // Shikari Protectga/Shellga
    'Cuchulainn_Shikari': {
        jobs: ['Shikari'],
        unlocks: ['Protectga', 'Shellga'],
        priority: 'MEDIUM',
        why: 'Party-wide defense buffs for evasion tank'
    },

    // Time Battlemage Breaks
    'Zeromus_TimeBattlemage': {
        jobs: ['Time Battlemage'],
        unlocks: ['Addle', 'Shear'],
        priority: 'MEDIUM',
        why: 'Adds Break technicks to Time Battlemage utility'
    },
    'Hashmal_TimeBattlemage': {
        jobs: ['Time Battlemage'],
        unlocks: ['Channeling'],
        priority: 'HIGH',
        why: 'Infinite MP for sustained buffing/debuffing'
    },

    // Bushi Heavy Armor
    'Zodiark_Bushi': {
        jobs: ['Bushi'],
        unlocks: ['Heavy Armor 10-12'],
        priority: 'MEDIUM',
        why: 'Heavy Armor for Bushi paired with light armor class'
    }
};

// ============================================================================
// SECTION 5: ANTI-PATTERNS (WASTED ESPERS)
// ============================================================================

const ESPER_ANTI_PATTERNS = {
    'Belias_on_Archer': {
        error: 'Belias unlocks NOTHING for Archer',
        fix: 'Remove Belias, use Shemhazai instead for Heavy Armor'
    },
    'Belias_on_Uhlan': {
        error: 'Belias unlocks NOTHING for Uhlan',
        fix: 'Remove Belias, use Adrammelech/Famfrit/Mateus for actual unlocks'
    },
    'Belias_on_Machinist': {
        error: 'Belias unlocks NOTHING for Machinist',
        fix: 'Remove Belias, use Famfrit for Hastega'
    },
    'Belias_on_TimeBattlemage': {
        error: 'Belias unlocks NOTHING for Time Battlemage',
        fix: 'Remove Belias, use Hashmal/Zeromus/Adrammelech'
    },
    'Belias_on_RedBattlemage': {
        error: 'Belias unlocks NOTHING for Red Battlemage',
        fix: 'Remove Belias, use Cuchulainn/Zeromus/Exodus'
    },
    'Belias_on_Monk': {
        error: 'Belias unlocks NOTHING for Monk',
        fix: 'Remove Belias, use Ultima/Chaos/Zodiark trinity'
    },
    'Belias_on_Archer': {
        error: 'Belias unlocks NOTHING for Archer',
        fix: 'Remove Belias, use Shemhazai for Heavy Armor'
    },
    'Belias_on_Shikari': {
        error: 'Belias unlocks NOTHING for Shikari',
        fix: 'Remove Belias, use Cuchulainn for Protectga/Shellga'
    },
    'Belias_on_BlackMage': {
        error: 'Belias unlocks NOTHING for Black Mage',
        fix: 'Remove Belias, use Exodus/Zeromus for Heavy Armor or Channeling'
    },
    'Belias_on_WhiteMage': {
        error: 'Belias unlocks NOTHING for White Mage',
        fix: 'Remove Belias, use Chaos for weapons or Adrammelech for Souleater'
    },

    'Famfrit_wasted_on_TimeBattlemage': {
        error: 'Time Battlemage already has natural Hastega. Famfrit only gives Battle Lore.',
        fix: 'Use Famfrit on Machinist instead for esper-unlocked Hastega'
    },

    'Chaos_for_WhiteMage_Hastega': {
        error: 'Chaos does NOT unlock Hastega for White Mage! Only gives weapons/HP.',
        fix: 'White Mage can only use Haste (single target). Use Time Battlemage for Hastega.'
    },

    'Zodiark_for_Knight_Hastega': {
        error: 'Zodiark does NOT unlock Hastega for Knight! Only gives weapons/HP/Revive.',
        fix: 'Knight CANNOT get Hastega from any source. Use Time Battlemage or Machinist for party Hastega.'
    },

    'Cuchulainn_for_Shikari_RemedyLore3': {
        error: 'Cuchulainn unlocks Protectga/Shellga for Shikari, NOT Remedy Lore 3',
        fix: 'Shikari has natural Remedy Lore 1. Cuchulainn gives party defense buffs.'
    }
};

// ============================================================================
// SECTION 6: VALIDATION FUNCTIONS
// ============================================================================

function validateEsperAssignment(character, job1, job2, espers) {
    const errors = [];
    const warnings = [];

    // Check each esper
    for (const esper of espers) {
        const esperData = ESPER_UNLOCKS_DB[esper];
        if (!esperData) {
            errors.push(`Unknown esper: ${esper}`);
            continue;
        }

        const job1Unlocks = esperData[job1] || [];
        const job2Unlocks = esperData[job2] || [];

        // Check if esper unlocks NOTHING
        if (job1Unlocks.length === 0 && job2Unlocks.length === 0) {
            errors.push(`${character}: ${esper} unlocks NOTHING for ${job1}/${job2}`);
        }
    }

    return { errors, warnings };
}

function validateHastegaCoverage(builds) {
    const hastegaSources = [];

    for (const build of builds) {
        const { char, jobs, espers } = build;
        const [job1, job2] = jobs;

        // Check natural Hastega
        if (JOB_NATURAL_ABILITIES[job1]?.hastega || JOB_NATURAL_ABILITIES[job2]?.hastega) {
            hastegaSources.push(`${char} (natural Time Battlemage)`);
        }

        // Check esper-unlocked Hastega (Machinist + Famfrit)
        if ((job1 === 'Machinist' || job2 === 'Machinist') && espers.includes('Famfrit')) {
            hastegaSources.push(`${char} (Machinist + Famfrit)`);
        }

        // Check for FALSE Hastega claims
        if ((job1 === 'White Mage' || job2 === 'White Mage') && espers.includes('Chaos')) {
            hastegaSources.push(`${char} (FALSE - Chaos does NOT give WM Hastega!)`);
        }
        if ((job1 === 'Knight' || job2 === 'Knight') && espers.includes('Zodiark')) {
            hastegaSources.push(`${char} (FALSE - Zodiark does NOT give Knight Hastega!)`);
        }
    }

    return hastegaSources;
}

// ============================================================================
// SECTION 7: EXPORT FOR USE
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ESPER_UNLOCKS_DB,
        JOB_NATURAL_ABILITIES,
        HASTEGA_SOURCES,
        CRITICAL_ESPER_UNLOCKS,
        ESPER_ANTI_PATTERNS,
        validateEsperAssignment,
        validateHastegaCoverage
    };
}
