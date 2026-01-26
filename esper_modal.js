// Official Esper Details Modal (Grimoire Style)
// Main production implementation

const EsperModal = {
    render(esper) {
        const data = ESPER_LOCATIONS[esper];
        if (!data) return '';

        // Safely access the SVG glyph. ZodiacGlyphs is global from data/espers.js
        const svgGlyph = (typeof ZodiacGlyphs !== 'undefined' && ZodiacGlyphs[data.glyph])
            ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full">${ZodiacGlyphs[data.glyph]}</svg>`
            : data.glyph;

        return `
            <div class="ff-modal-grimoire animate-fade-in-up max-w-5xl w-full mx-auto my-auto relative"> <!-- Added mx-auto my-auto -->
                <!-- Decorative Header -->
                <div class="ff-grimoire-header mb-6 pt-6 pb-2"> <!-- Generous padding -->
                    <div class="ff-grimoire-ornament-l"></div>
                    <div class="text-center relative z-20"> 
                        <div class="text-xs font-serif italic text-amber-500/60 mb-2">Archives of Ivalice</div>
                        <!-- Relaxed leading and margin -->
                        <h2 class="text-5xl md:text-6xl font-serif font-bold text-amber-100 uppercase tracking-widest text-shadow-amber leading-normal mb-2">${esper}</h2>
                        <div class="text-sm font-serif text-amber-500 font-bold uppercase tracking-[0.3em]">${data.title}</div>
                    </div>
                    <div class="ff-grimoire-ornament-r"></div>
                </div>

                <!-- Content Body - Mobile: Stacked, Desktop: Overlapping -->
                <div class="relative grid grid-cols-1 md:grid-cols-12 gap-0 mt-0 md:mt-4 min-h-[auto] md:min-h-[500px] items-start md:items-center pb-8 md:pb-0">
                    
                    <!-- LAYER 1: Image (Mobile: Top/Background, Desktop: Left/Background) -->
                    <div class="order-1 md:col-span-7 md:col-start-1 md:row-start-1 h-auto md:h-full flex items-start md:items-center justify-center relative z-0 pointer-events-none select-none overflow-visible w-full">
                        <!-- Decorative Glow -->
                        <div class="absolute inset-0 bg-amber-500/10 blur-3xl rounded-full opacity-30 transform md:-translate-x-10"></div>
                        
                        <!-- Main Image - Mobile: Full Width, Natural Height, Fade Bottom -->
                        <img src="${data.image}" alt="${esper}" 
                             class="relative w-full md:w-full md:max-w-[650px] h-auto md:h-full object-contain opacity-80 mix-blend-screen filter drop-shadow-[0_0_30px_rgba(255,179,0,0.2)]"
                             style="mask-image: linear-gradient(to bottom, black 40%, transparent 95%); -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 95%);">
                    </div>

                    <!-- LAYER 2: Text & Details -->
                    <!-- Mobile: Order 2, Large Negative Margin for Overlap -->
                    <div class="order-2 md:col-span-8 md:col-start-5 md:row-start-1 relative z-10 flex flex-col h-auto md:h-full px-4 md:pl-10 md:pr-0 md:py-4 -mt-32 md:mt-0">
                        
                        <!-- Stats Row -->
                        <div class="flex items-center justify-center md:justify-start gap-8 mb-6 md:ml-8 relative z-20"> <!-- Added z-20 -->
                            <div class="text-center bg-black/40 md:bg-transparent rounded px-4 py-2 md:p-0 backdrop-blur-md md:backdrop-blur-none border border-amber-500/20 md:border-none">
                                <div class="text-[9px] text-amber-500/70 uppercase tracking-widest mb-1">Cost</div>
                                <div class="text-xl font-serif text-amber-300">${data.cost} <span class="text-[9px] align-middle opacity-50 font-sans font-normal text-amber-100">Mist</span></div>
                            </div>
                            <div class="text-center bg-black/40 md:bg-transparent rounded px-4 py-2 md:p-0 backdrop-blur-md md:backdrop-blur-none border border-amber-500/20 md:border-none">
                                <div class="text-[9px] text-amber-500/70 uppercase tracking-widest mb-1">Sign</div>
                                <div class="text-xl font-serif text-amber-300 flex items-center gap-2">
                                    ${data.zodiac}
                                    <div class="w-4 h-4 text-amber-500/70">${svgGlyph}</div>
                                </div>
                            </div>
                        </div>

                        <!-- Description Box -->
                        <div class="relative flex-1 bg-gradient-to-b from-amber-950/95 via-amber-950/90 to-amber-950/80 md:bg-gradient-to-br md:from-amber-950/90 md:via-amber-950/80 md:to-amber-950/40 border border-amber-500/20 rounded-sm overflow-hidden backdrop-blur-md shadow-2xl">
                            
                            <!-- Location Header -->
                            <div class="relative z-10 p-5 border-b border-amber-500/10 bg-black/20">
                                <div class="flex items-center gap-2 text-amber-500/80 mb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span class="text-[10px] font-bold uppercase tracking-widest">Location</span>
                                </div>
                                <div class="text-2xl md:text-3xl text-amber-100/90 font-serif italic">
                                    ${data.location}
                                </div>
                            </div>

                            <!-- Scroll Area -->
                            <div class="relative h-[300px] md:h-[280px] overflow-y-auto custom-scrollbar-amber p-6 pr-6 md:pr-8">
                                <div class="relative"> <!-- Removed pl-6 to reduce indentation -->
                                    <!-- Quote Mark: Subtle inline-block design -->
                                    <span class="float-left text-4xl text-amber-500/20 font-serif leading-none mr-2 -mt-1">"</span>
                                    
                                    <!-- REMOVED whitespace-pre-line to fix double spacing -->
                                    <p class="text-amber-100/90 leading-relaxed font-serif text-lg md:text-xl relative z-10 drop-shadow-md">
                                        ${data.desc}
                                    </p>
                                    
                                    <span class="block text-right mt-2 text-4xl text-amber-500/20 font-serif leading-none">"</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Actions -->
                        <div class="mt-6 flex justify-center md:justify-end">
                             <button @click="modalOpen = false" class="group px-8 py-3 bg-amber-500/5 border border-amber-500/30 text-amber-400 font-serif uppercase tracking-[0.2em] hover:bg-amber-500/20 hover:text-amber-100 transition-all shadow-[0_0_20px_rgba(255,179,0,0.05)] hover:shadow-[0_0_30px_rgba(255,179,0,0.15)] flex items-center gap-3">
                                <span>Close Archives</span>
                                <span class="group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};
