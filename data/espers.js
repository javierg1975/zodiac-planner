// Optimized Zodiac SVG Glyphs (Centered for 24x24 Viewbox)
const ZodiacGlyphs = {
      '♈': `<path d="M12 21V7M8 4l4 3 4-3" stroke-width="2"/>
                  <circle cx="12" cy="13" r="5" stroke-width="1.5" fill="none"/>
                  <path d="M4 11s2-4 8-4 8 4 8 4" stroke-width="1.5"/>`,
      '♓': `<path d="M12 2v16M9 20h6" stroke-width="2"/>
                  <path d="M5 8c0-3 3-5 7-5s7 2 7 5-3 5-7 5-7-2-7-5" stroke-width="1.5"/>
                  <path d="M12 11c-3 0-5 2-5 4.5s2 4.5 5 4.5 5-2 5-4.5-2-4.5-5-4.5" stroke-width="1.2"/>`,
      '♑': `<path d="M12 2v18M4 6l16 12M20 6L4 18" stroke-width="1.5"/>
                  <circle cx="12" cy="12" r="4" stroke-width="2" fill="none"/>`,
      '♐': `<path d="M12 21V3M12 3l-4 4M12 3l4 4" stroke-width="2"/>
                  <path d="M6 10q6 4 12 0M6 16q6-4 12 0" stroke-width="1.5"/>`,
      '♌': `<path d="M12 2v20M4 12h16" stroke-width="2"/>
                  <path d="M12 7c4 0 6 2 6 5s-2 5-6 5-6-2-6-5 2-5 6-5" stroke-width="1.5"/>
                  <path d="M7 7l2 2M17 7l-2 2M7 17l2-2M17 17l-2 2" stroke-width="1.5"/>`,
      '♊': `<path d="M7 2v20M17 2v20" stroke-width="2"/>
                  <path d="M4 12h16" stroke-width="1.5"/>
                  <path d="M12 7c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5" stroke-width="1.5"/>`,
      '♏': `<path d="M12 2v16M12 18l-3 4M12 18l3 4" stroke-width="2"/>
                  <path d="M5 10c0-4 3-6 7-6s7 2 7 6-7 8-7 8-7-4-7-8" stroke-width="1.5"/>
                  <circle cx="12" cy="10" r="2" fill="currentColor"/>`,
      '♋': `<path d="M12 4v16M4 12c0-5 4-8 8-8s8 3 8 8-8 8-8 8-8-3-8-8" stroke-width="2"/>
                  <path d="M8 12h8" stroke-width="1.5"/>`,
      '♍': `<path d="M12 2v20M5 5l14 14M19 5L5 19" stroke-width="1.2"/>
                  <circle cx="12" cy="12" r="6" stroke-width="2" fill="none"/>
                  <path d="M12 8v8M8 12h8" stroke-width="1.5"/>`,
      '♉': `<path d="M12 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" stroke-width="2"/>
                  <path d="M6 7c-2-4 0-7 6-7s8 3 6 7" stroke-width="2"/>`,
      '♎': `<path d="M4 20h16M12 11h8M4 11h2M8 11c0-2 1.5-4 4-4s4 2 4 4" stroke-width="2"/>
                  <path d="M12 11h8M4 11h8" stroke-width="1.2" opacity="0.5"/>`,
      '⛎': `<path d="M12 2v20M9 22h6" stroke-width="1.5" />
                  <path d="M12 6c4 0 7 2 7 5s-3 5-7 5-7-2-7-5 3-5 7-5" stroke-width="1.2" />
                  <path d="M12 18c-3 0-5-1.5-5-3.5s2-3.5 5-3.5 5 1.5 5 3.5-2 3.5-5 3.5" stroke-width="1.2" />
                  <path d="M5 8l2 2M19 8l-2 2" stroke-width="1.5" />`,
      '♒': `<path d="M12 2v14M8 22h8M4 16h16" stroke-width="2"/>
                  <path d="M12 6c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5" stroke-width="1.5"/>`
};

// --- DATA CONFIGURATION ---

const ESPER_UNLOCKS = {
      'Belias': { 'White Mage': 'Potion Lore 3', 'Uhlan': 'Heavy Armor 12', 'Monk': 'Phoenix Lore 2' },
      'Mateus': { 'Knight': 'Curaga/Regen/Cleanse/Esuna', 'Red Battlemage': 'Esuna', 'Time Battlemage': 'Stamp/Numerology' },
      'Adrammelech': { 'Foebreaker': 'Telekinesis', 'Uhlan': 'Heavy Armor 9', 'Shikari': 'Libra' },
      'Shemhazai': { 'Foebreaker': 'Heavy Armor 10-11', 'Archer': 'Firaga (Heavy Armor 10-12)', 'Knight': 'Protectga/Shellga' },
      'Hashmal': { 'Foebreaker': 'Curaga', 'Bushi': 'Confuse', 'Knight': 'Confuse/Faith/Bravery' },
      'Exodus': { 'White Mage': 'Channeling 3', 'Black Mage': 'Channeling 3', 'Red Battlemage': 'Heavy Armor 8-10' },
      'Cuchulainn': { 'Shikari': 'Remedy Lore 3', 'Time Battlemage': 'Status breaks', 'Monk': 'Telekinesis' },
      'Zeromus': { 'Monk': 'Channeling 3', 'Machinist': 'Channeling 3', 'Uhlan': 'Heavy Armor 11' },
      'Chaos': { 'White Mage': 'Hastega', 'Black Mage': 'Renew', 'Monk': 'Dispelga/Protectga/Shellga' },
      'Ultima': { 'Monk': 'Swiftness 3', 'White Mage': 'Excalibur', 'Knight': 'Bravery' },
      'Zodiark': { 'Monk': 'Renew', 'Knight': 'Hastega', 'Foebreaker': 'Magick Lore 5' },
      'Famfrit': { 'Machinist': 'Hastega', 'Time Battlemage': 'Hastega', 'Shikari': 'Heavy Armor 3-8' }
};

const ESPER_ZODIAC = {
      'Belias': '♈',      // Aries
      'Mateus': '♓',      // Pisces
      'Adrammelech': '♑', // Capricorn
      'Shemhazai': '♐',   // Sagittarius
      'Hashmal': '♌',     // Leo
      'Exodus': '♎',      // Libra
      'Cuchulainn': '♏', // Scorpio
      'Zeromus': '♋',     // Cancer
      'Chaos': '♉',       // Taurus
      'Ultima': '♍',      // Virgo
      'Zodiark': '⛎',     // Ophiuchus
      'Famfrit': '♒'      // Aquarius
};

