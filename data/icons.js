const Icons = {
            // --- Mystic Jobs ---
            'White Mage': '<path d="M12 2v20M5 12h14" stroke-width="2.5"/><circle cx="12" cy="12" r="8" stroke-dasharray="4 2"/>', // Holy Cross/Light
            'Black Mage': '<path d="m13 2-10 12h9l-1 8 10-12h-9l1-8Z"/><circle cx="12" cy="12" r="10" stroke-width="1" opacity="0.5"/>', // Lightning Bolt
            'Red Battlemage': '<path d="m14.5 17.5-11.5-11.5 3-3 11.5 11.5"/><path d="m13 19 6-6M16 16 20 20"/><path d="M19 21 21 19"/>', // Spellblade
            'Bushi': `<path d="M20 4c-4 0-14 6-17 17" stroke-width="2" /> <path d="M17 3l3 3" stroke-width="3" stroke-linecap="butt" /> <path d="M18 6l2-2" stroke-width="1" opacity="0.5" />`,
            // --- Heavy Jobs ---
            'Knight': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v8M9 11h6"/>', // Shield + Sword Cross
            'Monk': `<path d="M7 11V7a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4" stroke-width="1.5" /> <path d="M11 11V6a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v5" stroke-width="1.5" /> <path d="M15 11V7a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4" stroke-width="1.5" /> <path d="M6 11h12v6a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-6Z" stroke-width="1.5" /> <path d="M6 12l4 3" stroke-width="1.5" /> `,            'Time Battlemage': '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>', // Clock/Hourglass
            'Foebreaker': '<path d="M7 7h10v3l-5 7-5-7V7ZM12 17v4M9 21h6"/>', // Heavy Axe/Mace

            // --- Light Jobs ---
            'Shikari': '<path d="m15 2 6 6-12 12-4-1-1-4L15 2Z"/><path d="m9 8 7 7" opacity="0.5"/>', // Hunter's Dagger/Kukri
            'Uhlan': '<path d="M12 2v20M9 5l3-3 3 3M12 2L5 9M12 2l7 7"/>', // Heavy Spear/Lance
            'Archer': '<path d="M6 3a15 15 0 0 1 0 18M6 12h14l-3-3M20 12l-3 3"/>', // Bow and Arrow
            'Machinist': '<rect x="4" y="10" width="16" height="6" rx="1"/><path d="M16 10V7a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3M10 16v3M14 16v3"/>', // Rifle/Tools

            // --- Thematic UI Icons ---
            'Book': '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V5H6.5a2.5 2.5 0 0 0-2.5 2.5v12zM12 9v6M9 12h6" stroke-width="1.5"/>',
            'Tactics': '<path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/>',
            'GambitSystem': '<rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 15h10M7 18h10M12 2v6M9 5l3 3 3-3" stroke-width="1.5"/>',

            // --- Build Preset Icons ---
            'Efficiency': '<path d="M20 7h-7m7 5h-7m7 5h-7M4 7V4h9v3M4 11v-3h6v3M4 15v-3h3v3M4 19v-3h12v3" stroke-width="2"/>',
            'Nuclear': '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="currentColor"/>',
            'Beginner': '<circle cx="12" cy="12" r="9"/><path d="M12 7l1 4 4 1-4 1-1 4-1-4-4-1 4-1 1-4Z" fill="currentColor"/>',
            'Trinity': '<path d="M12 2L3 7v5c0 5 9 10 9 10s9-5 9-10V7l-9-5Z" stroke-width="1.5"/><path d="M12 22V12M3 12h18" opacity="0.5"/>',
            'Endurance': '<path d="M6 2h12l-6 10 6 10H6l6-10L6 2Z" stroke-width="2"/><path d="M10 18h4" opacity="0.5"/>',
            'Lore': '<path d="M20 4L8.5 15.5a4 4 0 1 1-4-4L16 2l4 2Z"/><path d="M11 13l3 3" opacity="0.5"/>',

            // --- Navigation/General ---
            'ChevronDown': '<path d="m6 9 6 6 6-6"/>',
            'ChevronUp': '<path d="m18 15-6-6-6 6"/>',
            'Sparkles': '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>',
            'Crown': '<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>',

            // --- Requirements Section Icons ---
            'Clock': '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
            'Unlock': '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
            'Package': '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M12 22V12M3.27 6.96L12 12M20.73 6.96L12 12"/>',
            'Target': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
            'TrendingUp': '<path d="M22 7L13.5 15.5L8.5 10.5L2 17M22 7h-6M22 7v6"/>',
            'AlertCircle': '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>'
        };
