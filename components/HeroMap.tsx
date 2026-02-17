
import React from 'react';

const HeroMap: React.FC = () => {
  return (
    <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden bg-[#e5e7eb]">
      {/* Decorative Mock Map Patterns */}
      <div className="absolute inset-0 opacity-40">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0071E3" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Abstract Map Shapes */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 1000 1000">
        <path d="M0,400 Q200,300 400,500 T800,400 T1000,600 L1000,1000 L0,1000 Z" fill="#0071E3" />
        <path d="M200,0 Q300,200 100,400 T200,800" fill="none" stroke="#0071E3" strokeWidth="20" />
      </svg>

      {/* Hero Content Overlay - Positioned lower to avoid Navbar overlap */}
      <div className="absolute top-[52%] -translate-y-1/2 left-8 md:left-16 max-w-3xl pointer-events-none">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-[#1D1D1F] mb-16 sf-display leading-[1.1]">
          Modern Real Estate <br />
          <span className="text-[#0071E3]">Redefined.</span>
        </h1>
        <p className="text-xl md:text-3xl text-[#4B5563] sf-text max-w-2xl leading-relaxed">
          The future of property searching has arrived. Visual, intuitive, and remarkably fast.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs font-medium text-[#1D1D1F] uppercase tracking-widest">Scroll to explore</span>
        <svg className="animate-bounce" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </div>
    </div>
  );
};

export default HeroMap;
