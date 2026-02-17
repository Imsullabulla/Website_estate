
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#/' },
    { label: 'Properties', href: '#/properties' },
    { label: 'Agents', href: '#/agents' },
    { label: 'Market Insights', href: '#/market-insights' },
    { label: 'Services', href: '#/services' },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-6 right-6 z-50 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-md shadow-lg border border-black/5 flex flex-col items-center justify-center gap-1.5 hover:bg-white transition-all duration-300"
        aria-label="Toggle menu"
      >
        <span className={`w-5 h-0.5 bg-[#1D1D1F] rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`w-5 h-0.5 bg-[#1D1D1F] rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
        <span className={`w-5 h-0.5 bg-[#1D1D1F] rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Logo */}
      <a href="#/" className="fixed top-4 left-6 z-50 cursor-pointer">
        <img src="/logo.png" alt="LuxeMap" className="h-20 w-auto object-contain" />
      </a>

      {/* Fullscreen Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#1D1D1F] transition-all duration-500 ease-out ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="h-full flex flex-col items-center justify-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-4xl md:text-6xl font-bold text-white hover:text-[#0071E3] transition-all duration-300 transform ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
