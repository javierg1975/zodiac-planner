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
      // '♍': `<path d="M12 2v20M5 5l14 14M19 5L5 19" stroke-width="1.2"/>
      //             <circle cx="12" cy="12" r="6" stroke-width="2" fill="none"/>
      //             <path d="M12 8v8M8 12h8" stroke-width="1.5"/>`,
      '♍': `<path d="M4 7c0-3 3-3 4 0v11M8 7c0-3 3-3 4 0v11M12 7c0-3 3-3 4 0v8c0 5 5 4 5 1" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M21 16c0 3-3 5-6 4" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
      '♉': `<path d="M6 6c0 4 3 6 6 6s6-2 6-6" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="12" cy="15" r="5" stroke-width="2" fill="none"/>`,
      '♎': `<path d="M12 5v14M7 19h10M5 9l7-3 7 3" stroke-width="2" fill="none" stroke-linecap="round"/>
             <path d="M5 9l-1 5h2l-1-5z M19 9l-1 5h2l-1-5z" fill="currentColor"/>`,
      '⛎': `<path d="M12 2v20M9 22h6" stroke-width="1.5" />
                  <path d="M12 6c4 0 7 2 7 5s-3 5-7 5-7-2-7-5 3-5 7-5" stroke-width="1.2" />
                  <path d="M12 18c-3 0-5-1.5-5-3.5s2-3.5 5-3.5 5 1.5 5 3.5-2 3.5-5 3.5" stroke-width="1.2" />
                  <path d="M5 8l2 2M19 8l-2 2" stroke-width="1.5" />`,
      '♒': `<path d="M12 2v14M8 22h8M4 16h16" stroke-width="2"/>
                  <path d="M12 6c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5" stroke-width="1.5"/>`
};

// --- DATA CONFIGURATION ---

// Full Esper Titles
const ESPER_FULL_NAMES = {
      'Belias': 'Belias, the Gigas',
      'Adrammelech': 'Adrammelech, the Wroth',
      'Zalera': 'Zalera, the Death Seraph',
      'Cuchulainn': 'Cuchulainn, the Impure',
      'Mateus': 'Mateus, the Corrupt',
      'Hashmal': 'Hashmal, Bringer of Order',
      'Famfrit': 'Famfrit, the Darkening Cloud',
      'Exodus': 'Exodus, the Judge-Sal',
      'Zeromus': 'Zeromus, the Condemner',
      'Chaos': 'Chaos, Walker of the Wheel',
      'Shemhazai': 'Shemhazai, the Whisperer',
      'Ultima': 'Ultima, the High Seraph',
      'Zodiark': 'Zodiark, Keeper of Precepts'
};

// SOURCE: https://underbuffed.com/final-fantasy-xii-the-zodiac-age-esper-licenses/
const ESPER_UNLOCKS = {
      'Belias': { 'Knight': 'Potion Lore 1', 'Foebreaker': 'Horology', 'Bushi': 'Libra' },
      'Adrammelech': { 'White Mage': 'Souleater, Battle Lore', 'Uhlan': 'Battle Lore', 'Time Battlemage': 'Cura, Raise', 'Foebreaker': 'Battle Lore', 'Black Mage': 'Fumarole, Tumulus', 'Bushi': 'Souleater', 'Shikari': 'Shades of Black' },
      'Zalera': { 'Monk': 'Traveler', 'Time Battlemage': 'Ether Lore 3', 'Black Mage': 'Steal, Poach', 'Bushi': 'Blood Sword, Karkata', 'Shikari': 'HP +435' },
      'Cuchulainn': { 'White Mage': 'Libra', 'Uhlan': 'Wither', 'Red Battlemage': 'Firaga, Thundaga, Blizzaga, Sleepga', 'Knight': 'Battle Lore', 'Foebreaker': 'Shades of Black', 'Bushi': 'Stamp', 'Shikari': 'Protectga, Shellga' },
      'Mateus': { 'Uhlan': 'Magick Lore (x2)', 'Knight': 'Curaga, Esuna, Cleanse, Regen', 'Time Battlemage': 'HP +230', 'Black Mage': 'Caldera, Volcano', 'Shikari': 'Gil Toss' },
      'Hashmal': { 'Uhlan': 'Bonecrusher', 'Red Battlemage': 'Steal', 'Knight': 'Curaja, Bravery, Faith, Confuse', 'Monk': 'Cura, Raise', 'Time Battlemage': 'Channeling', 'Foebreaker': 'Swiftness', 'Black Mage': 'Makara', 'Shikari': 'Bonecrusher' },
      'Famfrit': { 'White Mage': 'Orichalcum Dirk, Platinum Dagger, Numerology', 'Uhlan': 'Potion Lore 3', 'Machinist': 'Hastega, Slowga, Vanishga, Reflectga, Warp, Graviga', 'Red Battlemage': 'Battle Lore (x2)', 'Monk': 'Arise, Dispelga', 'Time Battlemage': 'Battle Lore', 'Foebreaker': 'Magick Lore', 'Archer': 'HP+390, HP+435', 'Black Mage': 'HP+190, HP+230, HP+310' },
      'Exodus': { 'White Mage': 'Battle Lore', 'Machinist': 'Oil, Decoy', 'Red Battlemage': 'Heavy Armor (Platinum/Giant/Dragon Helm, Platinum/Carabineer/Dragon Armor)', 'Knight': 'HP +350', 'Monk': 'Souleater', 'Time Battlemage': 'Battle Lore', 'Foebreaker': 'Magick Lore (x4)', 'Black Mage': 'Heavy Armor (Platinum Helm, Platinum Armor)', 'Shikari': 'Stamp', 'Bushi': 'HP +500' },
      'Zeromus': { 'White Mage': 'HP +270', 'Machinist': 'Makara', 'Red Battlemage': 'Channeling', 'Monk': 'Sight Unseeing', 'Time Battlemage': 'Addle, Shear', 'Foebreaker': 'Magick Lore (x4)', 'Black Mage': 'Heavy Armor (Giant\'s Helm, Carabineer Mail)', 'Bushi': 'Magick Lore (x2)' },
      'Chaos': { 'White Mage': 'Defender, Save the Queen, HP +310', 'Uhlan': 'Aeroga, Bio, Blindga, Silencega', 'Machinist': 'HP+350', 'Red Battlemage': 'Ultima Blade', 'Knight': 'Excalipur, Revive, HP+390', 'Monk': 'Esunaga, Protectga, Shellga, Holy', 'Time Battlemage': 'HP+270', 'Archer': 'Magick Lore', 'Bushi': 'Brawler' },
      'Shemhazai': { 'White Mage': 'HP+230', 'Machinist': 'Caldera, Volcano', 'Red Battlemage': 'Cleanse, Esuna', 'Knight': 'Potion Lore 2', 'Monk': 'Potion Lore 3', 'Archer': 'Heavy Armor (Dragon/Magepower/Grand Helm, Dragon/Maximilian/Grand Armor)', 'Black Mage': 'Steel Mask, Mirror Mail', 'Bushi': 'Shield Block', 'Shikari': 'Guns (Spica, Antares, Arcturus, Fomalhaut)' },
      'Ultima': { 'Uhlan': 'Expose', 'Machinist': 'Magick Lore (x3)', 'Red Battlemage': 'Claymore, Defender, Save the Queen', 'Knight': 'Telekinesis, Battle Lore', 'Monk': 'Swiftness (x2)', 'Time Battlemage': 'Swords (Diamond Sword, Runeblade, Deathbringer, Stoneblade)', 'Foebreaker': 'Swiftness', 'Archer': 'Infuse, 1000 Needles', 'Black Mage': 'Telekinesis', 'Bushi': 'Stamp', 'Shikari': 'Phoenix Lore (x2)' },
      'Zodiark': { 'White Mage': 'Claymore', 'Machinist': 'HP+390', 'Red Battlemage': 'Ragnarok', 'Knight': 'Excalipur, Revive, HP+390', 'Monk': 'Renew', 'Time Battlemage': 'Swords (Durandal, Simha)', 'Archer': 'Infuse, 1000 Needles', 'Bushi': 'Heavy Armor (Giant/Dragon/Magepower Helm, Carabineer/Dragon/Maximilian Armor)' }
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

