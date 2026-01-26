const ESPER_LOCATIONS = {
    'Belias': {
        location: 'Tomb of Raithwall',
        title: 'The Gigas',
        desc: "Belias is found in the Tomb of Raithwall, guarding King Raithwall's tomb, and is the first Esper obtained. Belias is the only Esper that must be summoned during the main storyline, to open the gate to the Ancient City of Giruvegan.",
        zodiac: 'Aries',
        glyph: '♈',
        element: 'Fire',
        cost: 1,
        image: './espers/Belias-bnw.png'
    },
    'Mateus': {
        location: 'Stilshrine of Miriam',
        title: 'The Corrupt',
        desc: "Mateus is fought during the main storyline. He is found in the Stilshrine of Miriam, guarding the Sword of Kings left by King Raithwall.",
        zodiac: 'Pisces',
        glyph: '♓',
        element: 'Ice',
        cost: 1,
        image: './espers/Mateus-bnw.png'
    },
    'Adrammelech': {
        location: 'Zertinan Caverns',
        title: 'The Wroth',
        desc: "Adrammelech is fought as an optional boss in the middle of the Zertinan Caverns and summons several undead to aid him during the fight. He is found in the Athroza Quicksands area. Once defeated, Adrammelech's license can be purchased for 25 LP.",
        zodiac: 'Capricorn',
        glyph: '♑',
        element: 'Thunder',
        cost: 1,
        image: './espers/Adrammelech-bnw.png',
        url: 'https://finalfantasy.fandom.com/wiki/Adrammelech_(Final_Fantasy_XII)'
    },
    'Zalera': {
        location: 'Barheim Passage',
        title: 'The Death Seraph',
        desc: "Zalera is fought as an optional boss in the Barheim Passage, in Terminus No. 7. The party must obtain the Barheim Key in the Dalmasca Estersand to find him. If the player cannot defeat Zalera within five minutes they are teleported out of the room and must begin the battle over. Once defeated, Zalera's license can be purchased for 25 LP.",
        zodiac: 'Gemini',
        glyph: '♊',
        element: 'Death',
        cost: 1,
        image: './espers/Zalera-bnw.png',
        url: 'https://finalfantasy.fandom.com/wiki/Zalera_(Final_Fantasy_XII)'
    },
    'Shemhazai': {
        location: 'Giruvegan',
        title: 'The Whisperer',
        desc: "Shemhazai is found in the lowest reaches of Giruvegan, just before the warp point leading to the Occuria, in the Gate of Fire. Shemhazai is the third of the five Espers obtained during the main story.",
        zodiac: 'Sagittarius',
        glyph: '♐',
        element: 'Soul',
        cost: 2,
        image: './espers/Shemhazai-bnw.png'
    },
    'Hashmal': {
        location: 'Pharos of Ridorana',
        title: 'Bringer of Order',
        desc: "Hashmal is one of the five storyline Espers and is the fourth obtained. He is found at the Pharos, guarding one of the platforms leading up to the Sun-Cryst. The Occuria sealed him here to protect the Sun-Cryst from intruders. Princess Ashe and her entourage brave the tower to reach the Sun-Cryst and defeat Hashmal along their way to the top.",
        zodiac: 'Leo',
        glyph: '♌',
        element: 'Earth',
        cost: 2,
        image: './espers/Hashmal-bnw.png'
    },
    'Cuchulainn': {
        location: 'Garamsythe Waterway',
        title: 'The Impure',
        desc: "Cúchulainn is an optional Esper residing in the central area of the Garamsythe Waterway (Cloaca No. 1). To reach him, the player must complete the 'Waterway Haunting' and 'Lost in the Pudding' hunts to obtain the Sluice Gate Key. By manipulating the water level control panels, the party can drain the central area to face him. The battle has a permanent HP drain field effect.",
        zodiac: 'Scorpio',
        glyph: '♏',
        element: 'Poison',
        cost: 2,
        image: './espers/Cuchulainn-bnw.png',
        url: 'https://finalfantasy.fandom.com/wiki/Cuchulainn_(Final_Fantasy_XII)'
    },
    'Zeromus': {
        location: 'Stilshrine of Miriam',
        title: 'The Condemner',
        desc: "Zeromus is located in a hidden chamber in the Stilshrine of Miriam that can be accessed by using the Stone of the Condemner, received by speaking to an acolyte at the bottom of the temple in Mt Bur-Omisace after Judge Bergan has been defeated. Use the Stone at the Way Stone to transport to the Throne of the Veiled Gods.",
        zodiac: 'Cancer',
        glyph: '♋',
        element: 'Gravity',
        cost: 2,
        image: './espers/Zeromus-bnw.png',
        url: 'https://finalfantasy.fandom.com/wiki/Zeromus_(Final_Fantasy_XII)'
    },
    'Exodus': {
        location: 'Mosphoran Highwaste',
        title: 'The Judge-Sal',
        desc: "Exodus is found on the highest peak of the Mosphoran Highwaste, in the Empyrean Seat. The player must activate the shrines in a correct order to float the moss islands and create a path. This involves enabling the South Wind Shrine, feeding a Chocobo Gysahl Greens to cross the ridge, and then activating the West and Northwest Wind Shrines.",
        zodiac: 'Libra',
        glyph: '♎',
        element: 'None',
        cost: 2,
        image: './espers/Exodus-bnw.png',
        url: 'https://finalfantasy.fandom.com/wiki/Exodus_(Final_Fantasy_XII)'
    },
    'Famfrit': {
        location: 'Pharos of Ridorana',
        title: 'The Darkening Cloud',
        desc: "Famfrit is summoned by Dr. Cid when the party fights him at the top of the Pharos. Dr. Cid uses the nethicite to obtain him at that moment from the Pharos's peak. When both Cid and Famfrit are defeated, the player obtains the glyph needed to command the Esper. He is the fifth of the five Espers obtained during the main storyline.",
        zodiac: 'Aquarius',
        glyph: '♒',
        element: 'Water',
        cost: 3,
        image: './espers/Famfrit-bnw.png'
    },
    'Chaos': {
        location: 'Necrohol of Nabudis',
        title: 'Walker of the Wheel',
        desc: "To find Chaos in the Necrohol of Nabudis, the player needs to complete the 'Three Medallions' sidequest. This involves utilizing the Sluice Gate Key in the Garamsythe Waterway and completing hunts to obtain the blackened fragments. Once the medallions are assembled, the player must defeat two optional bosses, Fury and Humbaba Mistant, in the Necrohol before unlocking the door to the Cloister of the Highborn where Chaos waits.",
        zodiac: 'Taurus',
        glyph: '♉',
        element: 'Wind',
        cost: 3,
        image: './espers/Chaos-bnw.png',
        url: 'https://finalfantasy.fandom.com/wiki/Chaos_(Final_Fantasy_XII)'
    },
    'Ultima': {
        location: 'Great Crystal',
        title: 'The High Seraph',
        desc: "Ultima is located within the deepest reaches of the Great Crystal (Crystal Peak). Reaching her requires the Treaty Blade. The path involves navigating the upper layer of the Great Crystal, toggling the Scorpio, Sagittarius, Leo, Libra, Capricorn, and Virgo gates in a specific sequence, often under strict time limits, to unseal the path to the Crystal Peak.",
        zodiac: 'Virgo',
        glyph: '♍',
        element: 'Holy',
        cost: 3,
        image: './espers/Ultima-bnw.png',
        url: 'https://finalfantasy.fandom.com/wiki/Ultima_(Final_Fantasy_XII)'
    },
    'Zodiark': {
        location: 'Henne Mines',
        title: 'Keeper of Precepts',
        desc: "Zodiark is located in the Henne Mines, in the Special Charter Dig area. To unlock the Special Dig site, the player must collect at least ten Espers, go to Jahara and speak to Geomancer Yugelu. He will unlock the gate to the Phase 2 Dig, which leads to the Special Charter Dig area. Zodiark is found at the very end. The path to Zodiark is littered with strong foes, but the player can use the Immobilize glitch to avoid them.",
        zodiac: 'Ophiuchus',
        glyph: '⛎',
        element: 'Dark',
        cost: 3,
        image: './espers/Zodiark-bnw.png',
        url: 'https://finalfantasy.fandom.com/wiki/Zodiark_(Final_Fantasy_XII)'
    }
};
