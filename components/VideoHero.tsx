
import React, { useEffect, useRef, useState, useCallback } from 'react';

const VideoHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isContentHidden, setIsContentHidden] = useState(false);
  const lastScrollY = useRef(0);
  const rafId = useRef<number>(0);
  const heroHeight = useRef(0);
  const scrollThreshold = 50;

  useEffect(() => {
    // Cache hero height on mount and resize
    const updateHeroHeight = () => {
      if (heroRef.current) {
        heroHeight.current = heroRef.current.offsetHeight;
      }
    };
    updateHeroHeight();
    window.addEventListener('resize', updateHeroHeight);

    const handleScroll = () => {
      // Cancel any pending RAF to avoid stacking
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        if (!heroRef.current) return;

        const currentScrollY = window.scrollY;
        const progress = Math.min(Math.max(currentScrollY / heroHeight.current, 0), 1);

        setScrollProgress(progress);

        // Determine scroll direction for hide/show effect
        if (currentScrollY > lastScrollY.current + scrollThreshold) {
          setIsContentHidden(true);
          lastScrollY.current = currentScrollY;
        } else if (currentScrollY < lastScrollY.current - 10) {
          setIsContentHidden(false);
          lastScrollY.current = currentScrollY;
        }

        // Always show at top
        if (currentScrollY <= 20) {
          setIsContentHidden(false);
          lastScrollY.current = currentScrollY;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateHeroHeight);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Parallax and fade calculations (simplified for performance)
  const contentOpacity = 1 - scrollProgress * 1.5;
  const contentTranslateY = scrollProgress * 100;

  return (
    <div ref={heroRef} className="relative w-full h-[100vh] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full will-change-transform">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
          poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
        >
          {/* 1080p video for better performance */}
          <source
            src="https://videos.pexels.com/video-files/3771822/3771822-hd_1920_1080_24fps.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Gradient Overlays - static for performance */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#F7F7F9] to-transparent" />

      {/* Hero Content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 will-change-transform"
        style={{
          opacity: isContentHidden ? 0 : Math.max(contentOpacity, 0),
          transform: isContentHidden ? 'translateY(-96px)' : `translateY(${contentTranslateY}px)`,
          transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
        }}
      >
        <div className="max-w-5xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse" />
            <span className="text-sm font-medium text-white/90 uppercase tracking-widest">
              Luxury Living Redefined
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 sf-display leading-[1.05] tracking-tight">
            Discover Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-[#0071E3]">
              Dream Estate
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed">
            Experience the finest properties through our visual intelligence platform.
            Curated luxury, delivered seamlessly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#/properties" className="px-8 py-4 bg-white text-[#1D1D1F] font-bold rounded-2xl shadow-2xl hover:bg-[#F7F7F9] transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/50 cursor-pointer">
              Explore Properties
            </a>
            <a href="#video-showcase" onClick={(e) => { e.preventDefault(); document.getElementById('video-showcase')?.scrollIntoView({ behavior: 'smooth' }); }} className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Watch Showreel
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-500 ease-out`}
        style={{
          opacity: isContentHidden ? 0 : Math.max(1 - scrollProgress * 3, 0),
          transform: isContentHidden ? 'translateX(-50%) translateY(-48px)' : 'translateX(-50%)',
          transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
        }}
      >
        <span className="text-xs font-medium text-white/60 uppercase tracking-widest">
          Scroll to explore
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-white/80 animate-bounce" />
        </div>
      </div>

      {/* Floating Stats */}
      <div
        className={`absolute bottom-32 right-8 md:right-16 hidden lg:block transition-all duration-500 ease-out`}
        style={{
          opacity: isContentHidden ? 0 : Math.max(1 - scrollProgress * 2, 0),
          transform: isContentHidden ? 'translateY(-48px)' : `translateY(${scrollProgress * 50}px)`,
          transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
        }}
      >
        <div className="rounded-2xl p-6 backdrop-blur-sm bg-white/15 border border-white/20">
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">142</div>
              <div className="text-xs text-white/60 uppercase tracking-wider">Listings</div>
            </div>
            <div className="w-px bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">$4.2M</div>
              <div className="text-xs text-white/60 uppercase tracking-wider">Avg. Value</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoHero;
