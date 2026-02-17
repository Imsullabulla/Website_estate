
import React, { useState, useMemo, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import VideoHero from './components/VideoHero';
import TrustStats from './components/TrustStats';
import PropertyFilter from './components/PropertyFilter';
import PropertyCard from './components/PropertyCard';
import LifestyleCurations from './components/LifestyleCurations';
import VideoShowcase from './components/VideoShowcase';
import Testimonials from './components/Testimonials';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import GeometricPattern from './components/GeometricPattern';
import PropertiesPage from './components/PropertiesPage';
import AgentsPage from './components/AgentsPage';
import MarketInsightsPage from './components/MarketInsightsPage';
import ServicesPage from './components/ServicesPage';
import { MOCK_PROPERTIES, AGENTS } from './constants';
import { FilterState, Property } from './types';
import { GoogleGenAI } from "@google/genai";

// Simple hash-based routing hook
function useHashRoute(): string {
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return route;
}

/* ── Scroll-Expand Bottom CTA ── */
const BottomCTA: React.FC<{ onContact: () => void }> = ({ onContact }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Simplified: just detect when visible, use CSS for animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 container mx-auto px-6">
      <div
        ref={ref}
        className={`relative rounded-[4rem] bg-[#0071E3] p-12 md:p-24 overflow-hidden text-center text-white shadow-2xl transition-all duration-700 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold sf-display mb-8 leading-tight">
            Ready to find your <br /> dream sanctuary?
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-12">
            Join 5,000+ luxury homeowners who found their perfect match through our visual intelligence platform.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-white text-[#0071E3] font-bold rounded-2xl shadow-xl hover:bg-[#F7F7F9] transition-all transform hover:scale-105 active:scale-95">
              Start Browsing Now
            </button>
            <button
              onClick={onContact}
              className="px-10 py-5 bg-transparent border-2 border-white/30 hover:border-white text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group"
            >
              Talk to a Consultant
              <svg className="transition-transform group-hover:translate-x-1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-[50%] h-full opacity-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="180" stroke="white" strokeWidth="2" strokeDasharray="10 20" />
            <circle cx="200" cy="200" r="120" stroke="white" strokeWidth="1" strokeDasharray="5 10" />
          </svg>
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const route = useHashRoute();
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [contactProperty, setContactProperty] = useState<Property | null>(null);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    type: '',
    minPrice: 0,
    maxPrice: 100000000,
    beds: '',
  });

  // Effect to enhance images using Nano Banana (gemini-2.5-flash-image)
  useEffect(() => {
    const enhanceImages = async () => {
      setIsGeneratingImages(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const updatedProperties = await Promise.all(
          MOCK_PROPERTIES.map(async (prop) => {
            try {
              const prompt = `A professional, hyper-realistic architectural photograph of a high-end luxury ${prop.type} located in ${prop.location}. Clear daylight, wide angle lens, stunning textures, 8k resolution, minimalist style.`;
              const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [{ text: prompt }] },
              });

              const imagePart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
              if (imagePart?.inlineData) {
                return {
                  ...prop,
                  imageUrl: `data:image/png;base64,${imagePart.inlineData.data}`
                };
              }
            } catch (err) {
              console.error(`Failed to generate image for ${prop.title}:`, err);
            }
            return prop;
          })
        );
        setProperties(updatedProperties);
      } catch (error) {
        console.error("AI image generation failed:", error);
      } finally {
        setIsGeneratingImages(false);
      }
    };

    // enhanceImages();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.location.toLowerCase().includes(filters.search.toLowerCase());
      const matchesType = filters.type ? p.type === filters.type : true;
      const matchesBeds = filters.beds ? p.beds >= parseInt(filters.beds) : true;
      return matchesSearch && matchesType && matchesBeds;
    });
  }, [filters, properties]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route]);

  // Render Properties page
  if (route === '#/properties') {
    return (
      <div className="min-h-screen relative">
        <GeometricPattern />
        <Navbar />
        <PropertiesPage />
        <Footer />
      </div>
    );
  }

  // Render Agents page
  if (route === '#/agents') {
    return (
      <div className="min-h-screen relative">
        <GeometricPattern />
        <Navbar />
        <AgentsPage />
        <Footer />
      </div>
    );
  }

  // Render Market Insights page
  if (route === '#/market-insights') {
    return (
      <div className="min-h-screen relative">
        <GeometricPattern />
        <Navbar />
        <MarketInsightsPage />
        <Footer />
      </div>
    );
  }

  // Render Services page
  if (route === '#/services') {
    return (
      <div className="min-h-screen relative">
        <GeometricPattern />
        <Navbar />
        <ServicesPage />
        <Footer />
      </div>
    );
  }

  // Default: Landing page
  return (
    <div className="min-h-screen relative">
      <GeometricPattern />
      <Navbar />

      {/* Video Hero Section */}
      <VideoHero />

      {/* Trust Stats Section */}
      <TrustStats />

      {/* Floating Filters */}
      <PropertyFilter
        filters={filters}
        onChange={setFilters}
        resultsCount={filteredProperties.length}
      />

      {/* Main Listing Grid */}
      <main className="container mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#0071E3] mb-4">Curated Collection</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] sf-display">Featured Estates</h3>
            {isGeneratingImages && (
              <div className="mt-4 flex items-center gap-2 text-sm text-[#0071E3] font-medium animate-pulse">
                <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"></div>
                AI Enhancing Gallery...
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 rounded-full bg-white font-bold text-sm shadow-sm border border-black/5 flex items-center gap-2 hover:bg-[#F7F7F9] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] focus-visible:ring-offset-2">
              Sort by Price
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m7 15 5 5 5-5" /><path d="m7 9 5-5 5 5" /></svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((prop) => (
              <div id={`property-${prop.id}`} key={prop.id}>
                <PropertyCard
                  property={prop}
                  isActive={selectedPropertyId === prop.id}
                  onSelect={() => setSelectedPropertyId(prop.id)}
                  onContact={(p) => setContactProperty(p)}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center">
              <div className="w-24 h-24 bg-[#0071E3]/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="1.5"><path d="M21 21l-4.35-4.35M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-[#1D1D1F] mb-2">No matches found</h3>
              <p className="text-[#6B7280] max-w-sm mx-auto">Try adjusting your filters or searching for a different area.</p>
            </div>
          )}
        </div>
      </main>

      {/* Video Showcase Section */}
      <VideoShowcase />

      {/* Lifestyle Curations */}
      <LifestyleCurations />

      {/* Social Proof */}
      <Testimonials />

      {/* Big Bottom CTA — scroll-expand effect */}
      <BottomCTA onContact={() => setContactProperty(MOCK_PROPERTIES[0])} />

      <Footer />

      {/* Modals */}
      <ContactModal
        property={contactProperty}
        onClose={() => setContactProperty(null)}
      />

      {/* Floating Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default App;
