
import React, { useState, useEffect, useRef } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const rafId = useRef<number>(0);
  const scrollThreshold = 50;

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending RAF to avoid stacking
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        setIsScrolled(currentScrollY > 20);

        // Determine scroll direction
        if (currentScrollY > lastScrollY.current + scrollThreshold) {
          setIsHidden(true);
          lastScrollY.current = currentScrollY;
        } else if (currentScrollY < lastScrollY.current - 10) {
          setIsHidden(false);
          lastScrollY.current = currentScrollY;
        }

        // Always show at top
        if (currentScrollY <= 20) {
          setIsHidden(false);
          lastScrollY.current = currentScrollY;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <nav className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ease-out rounded-2xl py-4 bg-white/80 backdrop-blur-sm border border-white/20 will-change-transform ${isScrolled ? 'shadow-lg shadow-black/5' : ''} ${isHidden ? '-translate-y-[calc(100%+2rem)] opacity-0' : 'translate-y-0 opacity-100'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#/" className="flex items-center gap-2 cursor-pointer">
          <img src="/logo.png" alt="LuxeMap" className="h-32 w-auto object-contain -my-8" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Properties', href: '#/properties' },
            { label: 'Agents', href: '#/agents' },
            { label: 'Market Insights', href: '#/market-insights' },
            { label: 'Services', href: '#/services' },
          ].map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-medium text-[#1E3A5F] hover:text-[#0071E3] transition-colors duration-300 focus:outline-none focus-visible:underline underline-offset-4 focus-visible:text-[#0071E3]">
              {link.label}
            </a>
          ))}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
