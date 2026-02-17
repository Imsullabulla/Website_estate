
import React, { useState } from 'react';
import { Property } from '../types';

interface InteractiveMapSectionProps {
  properties: Property[];
}

const InteractiveMapSection: React.FC<InteractiveMapSectionProps> = ({ properties }) => {
  const [selectedProp, setSelectedProp] = useState<Property | null>(null);
  const [zoom, setZoom] = useState(1);

  return (
    <section className="py-24 bg-[#F7F7F9]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#0071E3] mb-4">Visual Exploration</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] sf-display mb-6">Interactive US Portfolio</h3>
          <p className="text-[#1D1D1F]/50 max-w-2xl mx-auto text-lg">
            Explore our curated selection across the country. Hover to see prices, click to reveal the full story.
          </p>
        </div>

        <div className="relative h-[700px] w-full bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-white/50">
          {/* Zoom Controls */}
          <div className="absolute top-8 left-8 z-30 flex flex-col gap-2">
            <button 
              onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
              className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-[#1D1D1F] hover:bg-[#0071E3] hover:text-white transition-all shadow-lg font-bold text-xl"
            >
              +
            </button>
            <button 
              onClick={() => setZoom(Math.max(zoom - 0.2, 0.8))}
              className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-[#1D1D1F] hover:bg-[#0071E3] hover:text-white transition-all shadow-lg font-bold text-xl"
            >
              -
            </button>
          </div>

          {/* Map Container */}
          <div 
            className="w-full h-full relative transition-transform duration-500 ease-out flex items-center justify-center bg-[#f0f2f5]"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* US Map Background (Simplified SVG) */}
            <svg viewBox="0 0 1000 600" className="w-[85%] h-[85%] text-[#e0e3e9]">
              <path d="M80,100 L920,100 L920,500 L80,500 Z" fill="currentColor" className="opacity-10" />
              {/* This is a placeholder path representing the US roughly */}
              <path d="M120,150 Q200,100 300,120 T500,150 T800,120 T950,200 L950,450 Q850,550 700,500 T400,550 T100,500 Z" fill="currentColor" />
            </svg>

            {/* Property Markers */}
            {properties.map((prop) => (
              <div 
                key={prop.id}
                className="absolute z-20 group cursor-pointer transition-all duration-300"
                style={{ left: `${prop.coords.x}%`, top: `${prop.coords.y}%` }}
                onClick={() => setSelectedProp(prop)}
              >
                <div className="flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
                   {/* Hover Price Tag */}
                  <div className="mb-2 px-3 py-1.5 glass rounded-full text-[12px] font-bold text-[#1D1D1F] shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 whitespace-nowrap">
                    ${(prop.price / 1000000).toFixed(1)}M
                  </div>
                  {/* The Dot */}
                  <div className={`w-5 h-5 rounded-full border-4 border-white shadow-lg transition-all duration-500 ${selectedProp?.id === prop.id ? 'bg-[#0071E3] scale-125 marker-pulse' : 'bg-[#0071E3]/80 group-hover:bg-[#0071E3]'}`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Property Detail Spotlight Panel */}
          {selectedProp && (
            <div className="absolute top-8 right-8 bottom-8 w-[400px] z-40 glass rounded-[3rem] shadow-2xl p-8 overflow-y-auto hide-scrollbar animate-in slide-in-from-right duration-500 border border-white/50">
              <button 
                onClick={() => setSelectedProp(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-[#0071E3] hover:text-white transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>

              <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-6 shadow-xl">
                <img src={selectedProp.imageUrl} className="w-full h-full object-cover" alt={selectedProp.title} />
              </div>

              <div className="mb-6">
                <div className="text-[#0071E3] font-bold text-xs uppercase tracking-widest mb-1">{selectedProp.type}</div>
                <h4 className="text-3xl font-bold text-[#1D1D1F] leading-tight mb-2">{selectedProp.title}</h4>
                <div className="text-2xl font-bold text-[#1D1D1F]/80">${(selectedProp.price / 1000000).toFixed(2)}M</div>
              </div>

              <div className="space-y-6">
                <section>
                  <h5 className="font-bold text-[#1D1D1F] mb-2 text-sm uppercase tracking-wide">About this Property</h5>
                  <p className="text-[#1D1D1F]/60 text-sm leading-relaxed">{selectedProp.description}</p>
                </section>

                <section>
                  <h5 className="font-bold text-[#1D1D1F] mb-2 text-sm uppercase tracking-wide">Community & Culture</h5>
                  <p className="text-[#1D1D1F]/60 text-sm leading-relaxed">{selectedProp.community}</p>
                </section>

                <section>
                  <h5 className="font-bold text-[#1D1D1F] mb-4 text-sm uppercase tracking-wide">Client Reviews</h5>
                  <div className="space-y-4">
                    {selectedProp.reviews.map((rev) => (
                      <div key={rev.id} className="bg-white/40 p-4 rounded-2xl border border-white/50 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-xs text-[#1D1D1F]">{rev.user}</span>
                          <div className="flex text-[#0071E3]">
                            {[...Array(rev.rating)].map((_, i) => <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                          </div>
                        </div>
                        <p className="text-[#1D1D1F]/60 text-[11px] leading-relaxed italic">"{rev.comment}"</p>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="pt-4 flex gap-4">
                  <button className="flex-1 py-4 bg-[#0071E3] text-white font-bold rounded-2xl shadow-lg hover:bg-[#0066CC] transition-all transform active:scale-95">
                    Request Tour
                  </button>
                  <button className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-[#0071E3] hover:bg-[#0071E3] hover:text-white transition-all shadow-md">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InteractiveMapSection;
