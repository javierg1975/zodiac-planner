// Option B: The System Style (Cyan/Tech Theme)
// Wired to: Mateus & Exodus

const ModalVariantB = {
    render(esper) {
        const data = ESPER_LOCATIONS[esper];
        if (!data) return '';

        // Safely access the SVG glyph. ZodiacGlyphs is global from data/espers.js
        const svgGlyph = (typeof ZodiacGlyphs !== 'undefined' && ZodiacGlyphs[data.glyph])
            ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">${ZodiacGlyphs[data.glyph]}</svg>`
            : data.glyph;

        return `
            <div class="ff-modal-system animate-fade-in-up">
                <!-- Tech Header -->
                <div class="flex items-center justify-between border-b border-cyan-500/30 pb-4 mb-6">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded bg-cyan-900/40 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                            ${svgGlyph}
                        </div>
                        <div>
                            <h2 class="text-3xl font-black text-white uppercase tracking-tighter italic leading-none" style="text-shadow: 0 0 10px rgba(0,212,255,0.5)">${esper}</h2>
                            <div class="text-xs font-bold text-cyan-400 uppercase tracking-[0.3em] mt-1">${data.title}</div>
                        </div>
                    </div>
                    <div class="hidden md:block text-right opacity-60">
                        <div class="text-[10px] text-cyan-500 font-mono">ID: ${esper.substring(0, 3).toUpperCase()}-99</div>
                        <div class="text-[10px] text-cyan-500 font-mono">SYS.VER.12.0.4</div>
                    </div>
                </div>

                <!-- Main Grid - Adjusted for wider text area -->
                <div class="grid md:grid-cols-[200px_1fr] gap-8">
                    <!-- Column 1: Visual Data -->
                    <div class="flex flex-col gap-4">
                        <div class="bg-cyan-950/30 border border-cyan-500/20 p-4 rounded relative overflow-hidden group aspect-[3/4] flex items-center justify-center">
                            <!-- Scanning Grid/Overlay -->
                            <div class="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
                            
                            <img src="${data.image}" alt="${esper}" class="w-full h-full object-contain filter grayscale brightness-150 contrast-125 drop-shadow-[0_0_5px_rgba(0,212,255,0.5)] opacity-80 group-hover:opacity-100 transition-all">
                            
                            <div class="absolute bottom-2 left-2 right-2">
                                <div class="h-1 bg-cyan-900/50 w-full overflow-hidden rounded-full">
                                    <div class="h-full bg-cyan-400 w-3/4 animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Data Modules -->
                        <div class="grid grid-cols-1 gap-2">
                            <div class="bg-cyan-900/20 p-2 border border-cyan-500/10 flex justify-between items-center">
                                <div class="text-[9px] text-cyan-500 uppercase tracking-widest">Cost</div>
                                <div class="text-white font-bold text-sm">
                                    <span class="text-lg">${data.cost}</span>
                                    <span class="text-[9px] text-cyan-500/50 ml-1">MIST</span>
                                </div>
                            </div>
                             <div class="bg-cyan-900/20 p-2 border border-cyan-500/10 flex justify-between items-center">
                                <div class="text-[9px] text-cyan-500 uppercase tracking-widest">Element</div>
                                <div class="text-white font-bold text-xs tracking-wider">${data.element}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Column 2: Tactical Info (Scrollable) -->
                    <div class="flex flex-col min-h-0">
                         <div class="bg-black/40 border-l-2 border-cyan-500 p-3 mb-4 flex items-center gap-3">
                            <span class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping flex-shrink-0"></span>
                            <div>
                                <div class="text-[9px] text-cyan-500 font-bold uppercase tracking-widest">Target Location</div>
                                <div class="text-lg text-white font-bold tracking-wide leading-none mt-1">${data.location}</div>
                            </div>
                        </div>

                        <!-- Scrollable Description Area -->
                        <div class="relative flex-1 bg-cyan-950/10 border border-cyan-500/10 rounded p-1">
                            <div class="absolute inset-0 overflow-y-auto custom-scrollbar p-3 pr-4">
                                <div class="text-sm text-cyan-100/90 leading-relaxed font-normal whitespace-pre-line text-justify">
                                    ${data.desc}
                                </div>
                            </div>
                            <!-- Scroll Indicator Fade -->
                            <div class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                </div>

                <!-- Tech Footer -->
                <div class="mt-6 pt-3 border-t border-cyan-500/30 flex justify-between items-center">
                    <div class="text-[10px] text-cyan-600 font-mono">
                         // END TRANSMISSION
                    </div>
                    <button @click="modalOpen = false" class="group px-8 py-2 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 text-xs font-bold uppercase tracking-widest hover:bg-cyan-500 hover:text-black hover:border-cyan-400 transition-all shadow-[0_0_10px_rgba(0,212,255,0.1)] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]">
                        Close
                    </button>
                </div>
            </div>
        `;
    }
};
