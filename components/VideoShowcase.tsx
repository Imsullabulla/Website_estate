
import React, { useEffect, useRef, useState } from 'react';
import GeometricPattern from './GeometricPattern';

const VideoShowcase: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const START_TIME = 11; // Start at 0:11
  const END_TIME = 120; // End at 2:00

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set initial time
    video.currentTime = START_TIME;

    // Handle time update to loop between start and end
    const handleTimeUpdate = () => {
      if (video.currentTime >= END_TIME) {
        video.currentTime = START_TIME;
      }
    };

    // Handle video loaded
    const handleLoadedMetadata = () => {
      video.currentTime = START_TIME;
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // Intersection observer for scroll animations and autoplay
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Autoplay video when scrolling into view
            video.currentTime = START_TIME;
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                // Autoplay was prevented, video will remain paused
                console.log('Autoplay prevented by browser');
              });
            }
          } else {
            // Pause and reset when scrolled away
            video.pause();
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% visible (starts sooner)
        rootMargin: '50px 0px' // Start loading 50px before visible
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="video-showcase" ref={sectionRef} className="relative pt-16 pb-8 overflow-hidden bg-[#F7F7F9]">
      <GeometricPattern />

      {/* Section Header */}
      <div className="container mx-auto px-6 mb-8 relative z-10">
        <div
          className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <h2 className="text-xl md:text-2xl uppercase tracking-[0.3em] font-bold text-[#0071E3] mb-4">
            Visual Experience
          </h2>
        </div>
      </div>

      {/* Full-Width Video Container with Soft Edges */}
      <div
        className={`relative w-full transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
      >
        <div className="relative w-full overflow-hidden">
          {/* 4K Video - Full Width */}
          <video
            ref={videoRef}
            muted
            playsInline
            preload="metadata"
            className="w-full aspect-[21/9] object-cover will-change-auto"
            style={{
              minHeight: '60vh',
              maxHeight: '80vh',
            }}
          >
            <source
              src="/cinematic-tour.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>

    </section>
  );
};

export default VideoShowcase;
