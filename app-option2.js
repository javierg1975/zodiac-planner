document.addEventListener('alpine:init', () => {
    Alpine.data('planner', () => ({
        preset: localStorage.getItem('ffxii_preset') || 'First Jobs',
        expanded: JSON.parse(localStorage.getItem('ffxii_expanded') || '{}'),
        selectedParty: parseInt(localStorage.getItem('ffxii_party') || '0'),
        teamView: localStorage.getItem('ffxii_team') || 'A',
        showBuildDetails: false,
        memoir: null,
        headerScrolled: false,
        init() {
            // Pick a random memoir
            this.memoir = MEMOIRS[Math.floor(Math.random() * MEMOIRS.length)];

            this.$watch('preset', val => localStorage.setItem('ffxii_preset', val));
            this.$watch('expanded', val => localStorage.setItem('ffxii_expanded', JSON.stringify(val)));
            this.$watch('selectedParty', val => localStorage.setItem('ffxii_party', val));
            this.$watch('teamView', val => localStorage.setItem('ffxii_team', val));
        },
        get current() {
            return PRESETS[this.preset];
        },
        get groupedPresets() {
            const phases = {
                early: { label: 'Early Game', presets: [] },
                mid: { label: 'Mid to Late Game', presets: [] },
                late: { label: 'Late Game / Endgame', presets: [] }
            };
            Object.entries(PRESETS).forEach(([name, data]) => {
                phases[data.phase].presets.push({ name, data });
            });
            return phases;
        },
        get activePartyMembers() {
            const currentPreset = PRESETS[this.preset];
            if (!currentPreset.parties || currentPreset.parties.length === 0) return null;
            const partyIndex = (this.selectedParty >= 0 && this.selectedParty < currentPreset.parties.length) ? this.selectedParty : 0;
            return currentPreset.parties[partyIndex].members;
        },
        get bTeamMembers() {
            const currentPreset = PRESETS[this.preset];
            if (!currentPreset.parties || currentPreset.parties.length === 0) return null;
            const teamA = this.activePartyMembers;
            if (!teamA) return null;
            const allCharacters = currentPreset.builds.map(b => b.char);
            return allCharacters.filter(char => !teamA.includes(char));
        },
        getPresetIcon(presetName) {
            return Icons[PRESET_ICONS[presetName]];
        },
        isInActiveParty(charName) {
            if (!this.activePartyMembers) return true;
            return this.activePartyMembers.includes(charName);
        },
        isInBTeam(charName) {
            if (!this.bTeamMembers) return false;
            return this.bTeamMembers.includes(charName);
        },
        shouldShowCharacter(charName) {
            if (this.teamView === 'A') {
                return this.isInActiveParty(charName);
            } else {
                return this.isInBTeam(charName);
            }
        },
        renderStatusNote(text) {
            if (!text) return '';
            return text.replace(/\[(ASSERT|STATUS): (CRITICAL|MANDATORY)(?: - (.*?))?\]/g, (match, type, status, desc) => {
                const icon = status === 'CRITICAL' ? Icons.AlertCircle : Icons.AlertTriangle;
                const colorClass = status.toLowerCase();
                const label = desc ? status + ': ' + desc : status;
                return `<span class="ff-status-node ${colorClass}"><svg class="w-2.5 h-2.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${icon}</svg>${label}</span>`;
            });
        },
        isLeader(charName) {
            const currentTeam = this.teamView === 'A' ? this.activePartyMembers : this.bTeamMembers;
            return currentTeam && currentTeam[0] === charName;
        },
        getGambitType(gambit) {
            // Comments in parentheses get neutral styling
            if (gambit.trim().startsWith('(')) {
                return 'neutral';
            }

            const text = gambit.toLowerCase();
            // Check target in gambit text (before the →)
            const target = gambit.includes(' → ') ? gambit.split(' → ')[0].toLowerCase() : text;

            // Blue = Ally or Self targets
            if (target.includes('ally') || target.includes('self:')) {
                return 'ally';
            }
            // Red = Foe targets
            if (target.includes('foe')) {
                return 'foe';
            }
            return 'neutral';
        },
        renderGearItem(item) {
            if (item.includes(' | ')) {
                const [gear, reason] = item.split(' | ');
                return `<span class="font-extrabold text-yellow-300">${gear.trim()}</span> <span class="text-gray-500 mx-1">›</span> <span class="text-gray-400">${reason.trim()}</span>`;
            }
            return `<span class="text-gray-300">${item}</span>`;
        },
        gradeToPercent(grade) {
            const mapping = { 'S': 95, 'A': 80, 'B': 65, 'C': 50, 'D': 35 };
            return mapping[grade] || 50;
        },
        gradeToWord(grade) {
            const words = { 'S': 'MAX', 'A': 'HIGH', 'B': 'GOOD', 'C': 'LOW', 'D': 'WEAK' };
            return words[grade] || 'N/A';
        },
        gradeColor(grade) {
            return grade === 'S' ? 'text-amber-400' : 'text-white';
        },
        renderNotes(text) {
            if (!text) return '';
            // Split by period followed by space or end of string, filter empty
            const sentences = text.split(/\.\s+/).filter(s => s.trim());
            return sentences.map(sentence =>
                `<div class="flex gap-2"><span class="text-cyan-400/60 flex-shrink-0">›</span><span>${sentence.trim()}.</span></div>`
            ).join('');
        }
    }))
})
