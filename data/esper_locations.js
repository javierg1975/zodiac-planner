const ESPER_LOCATIONS = {
    'Belias': {
        location: 'Tomb of Raithwall',
        title: 'The Gigas',
        desc: "Belias, the Gigas, is found guarding the Dawn Shard at the bottom of the Tomb of Raithwall. Created by the gods, he is a being of fire and fury suitable for a guardian.\n\nHe is the first Esper obtained in the main storyline.",
        zodiac: 'Aries',
        glyph: '♈',
        element: 'Fire',
        cost: 1,
        image: './espers/Belias-bnw.png'
    },
    'Mateus': {
        location: 'Stilshrine of Miriam',
        title: 'The Corrupt',
        desc: "Found in the Stilshrine of Miriam, guarding the Sword of Kings. Mateus is an aquatic creature with multiple limbs wielding a trident, with a goddess chained to his chest he uses as a living shield.\n\nHe is obtained during the main storyline.",
        zodiac: 'Pisces',
        glyph: '♓',
        element: 'Ice',
        cost: 1,
        image: './espers/Mateus-bnw.png'
    },
    'Adrammelech': {
        location: 'Zertinan Caverns',
        title: 'The Wroth',
        desc: "An optional Esper located in the Athroza Quicksands area of the Zertinan Caverns. He commands the thunder and is surrounded by Shambling Corpses.\n\nAdrammelech becomes available after the events at the Tomb of Raithwall.",
        zodiac: 'Capricorn',
        glyph: '♑',
        element: 'Thunder',
        cost: 1,
        image: './espers/Adrammelech-bnw.png'
    },
    'Zalera': {
        location: 'Barheim Passage',
        title: 'The Death Seraph',
        desc: "Found in Terminus No. 7 within the Barheim Passage. Accessing him requires the Barheim Key and the battle has a strict time limit.\n\nHe is a heretic scion who fused with a shamaness to cheat death.",
        zodiac: 'Gemini',
        glyph: '♊',
        element: 'Death',
        cost: 1,
        image: './espers/Zalera-bnw.png'
    },
    'Shemhazai': {
        location: 'Giruvegan',
        title: 'The Whisperer',
        desc: "Guardian of the waystone to the Occurian realm, found at the end of Giruvegan. Shemhazai manipulates the souls of the living and acts as a spy for the gods.\n\nObtained as part of the main storyline.",
        zodiac: 'Sagittarius',
        glyph: '♐',
        element: 'Soul',
        cost: 2,
        image: './espers/Shemhazai-bnw.png'
    },
    'Hashmal': {
        location: 'Pharos of Ridorana',
        title: 'Bringer of Order',
        desc: "Fought at the peak of the Pharos, guarding the way to the Sun-Cryst. He served the Occuria faithfully until his rebellion.\n\nObtained near the end of the main storyline.",
        zodiac: 'Leo',
        glyph: '♌',
        element: 'Earth',
        cost: 2,
        image: './espers/Hashmal-bnw.png'
    },
    'Cuchulainn': {
        location: 'Garamsythe Waterway',
        title: 'The Impure',
        desc: "Resides in the pestilent Cloaca No. 1 of the Garamsythe Waterway. Players must complete specific Hunts to obtain the Sluice Gate Key to drain the area.\n\nHe slowly drains the party's HP during battle with his vile aura.",
        zodiac: 'Scorpio',
        glyph: '♏',
        element: 'Poison',
        cost: 2,
        image: './espers/Cuchulainn-bnw.png'
    },
    'Zeromus': {
        location: 'Stilshrine of Miriam',
        title: 'The Condemner',
        desc: "Sealed in a hidden chamber within the Stilshrine of Miriam. Access requires the Stone of the Condemner, obtained from the Nu Mou Acolyte at Mt. Bur-Omisace.\n\nHe hates all things and utilizes gravity magic to crush his foes.",
        zodiac: 'Cancer',
        glyph: '♋',
        element: 'Gravity',
        cost: 2,
        image: './espers/Zeromus-bnw.png'
    },
    'Exodus': {
        location: 'Mosphoran Highwaste',
        title: 'The Judge-Sal',
        desc: "Exodus waits at the Empyrean Seat, the highest peak of the Mosphoran Highwaste. Reaching him requires activating shrines to float islands of moss.\n\nHe is the most ancient of scions, judging the world from his high perch.",
        zodiac: 'Libra',
        glyph: '♎',
        element: 'None',
        cost: 2,
        image: './espers/Exodus-bnw.png'
    },
    'Famfrit': {
        location: 'Pharos of Ridorana',
        title: 'The Darkening Cloud',
        desc: "Summoned by Dr. Cid in the Pharos of Ridorana. He wields a massive ewer from which he pours rain of darkness.\n\nHe is the final Esper obtained in the main story.",
        zodiac: 'Aquarius',
        glyph: '♒',
        element: 'Water',
        cost: 3,
        image: './espers/Famfrit-bnw.png'
    },
    'Chaos': {
        location: 'Necrohol of Nabudis',
        title: 'Walker of the Wheel',
        desc: "Located in the glowing Cloister of the Highborn within the Necrohol. Access requires the Medallions of Might and significant sidequest progression.\n\nHe was the guardian of the sacred crystals until he turned against the gods.",
        zodiac: 'Taurus',
        glyph: '♉',
        element: 'Wind',
        cost: 3,
        image: './espers/Chaos-bnw.png'
    },
    'Ultima': {
        location: 'Great Crystal',
        title: 'The High Seraph',
        desc: "Found at the very apex of the Great Crystal in Giruvegan. She is the masterpiece of the gods who led the rebellion against them.\n\nThe path to her is a complex maze that requires the Treaty Blade.",
        zodiac: 'Virgo',
        glyph: '♍',
        element: 'Holy',
        cost: 3,
        image: './espers/Ultima-bnw.png'
    },
    'Zodiark': {
        location: 'Henne Mines',
        title: 'Keeper of Precepts',
        desc: "The most powerful Esper, hidden in the deepest Special Charter Shaft of the Henne Mines. Access requires collecting at least 10 other Espers.\n\nHe is the strongest scion, banished for his dangerous power.",
        zodiac: 'Ophiuchus',
        glyph: '⛎',
        element: 'Dark',
        cost: 3,
        image: './espers/Zodiark-bnw.png'
    }
};
