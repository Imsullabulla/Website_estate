
import React, { useState, useMemo, useRef, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import ContactModal from './ContactModal';
import ChatWidget from './ChatWidget';
import { MOCK_PROPERTIES, NEIGHBORHOOD_DATA } from '../constants';
import { FilterState, Property } from '../types';

/* ── Scroll-Expand Bottom CTA ── */
const PropertiesBottomCTA: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
        const observer = new IntersectionObserver(
            ([entry]) => setProgress(entry.intersectionRatio),
            { threshold: thresholds }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const scale = 0.85 + progress * 0.15;
    const opacity = Math.min(progress * 2, 1);

    return (
        <section className="py-20 container mx-auto px-6">
            <div
                ref={ref}
                className="relative rounded-[3rem] bg-gradient-to-br from-[#0071E3] to-[#0055b3] p-12 md:p-16 overflow-hidden text-center text-white shadow-2xl will-change-transform"
                style={{
                    transform: `scale(${scale})`,
                    opacity,
                    transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
                }}
            >
                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold sf-display mb-6 leading-tight">
                        Didn't find what you're looking for?
                    </h2>
                    <p className="text-lg text-white/80 mb-8">
                        Our luxury property consultants can help you discover off-market listings tailored to your preferences.
                    </p>
                    <button className="px-8 py-4 bg-white text-[#0071E3] font-bold rounded-2xl shadow-xl hover:bg-[#F7F7F9] transition-all transform hover:scale-105 active:scale-95">
                        Talk to a Consultant
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-[40%] h-full opacity-10 pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
                        <circle cx="200" cy="200" r="180" stroke="white" strokeWidth="2" strokeDasharray="10 20" />
                        <circle cx="200" cy="200" r="120" stroke="white" strokeWidth="1" strokeDasharray="5 10" />
                    </svg>
                </div>
            </div>
        </section>
    );
};

const PropertiesPage: React.FC = () => {
    const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
    const [contactProperty, setContactProperty] = useState<Property | null>(null);
    const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
    const [savedProperties, setSavedProperties] = useState<Set<string>>(new Set());
    const [shareToast, setShareToast] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        type: '',
        minPrice: 0,
        maxPrice: 100000000,
        beds: '',
    });

    const listingsRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const properties = MOCK_PROPERTIES;

    const filteredProperties = useMemo(() => {
        return properties.filter(p => {
            const matchesSearch = p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                p.location.toLowerCase().includes(filters.search.toLowerCase());
            const matchesType = filters.type ? p.type === filters.type : true;
            const matchesBeds = filters.beds ? p.beds >= parseInt(filters.beds) : true;
            const matchesPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
            return matchesSearch && matchesType && matchesBeds && matchesPrice;
        });
    }, [filters, properties]);

    const selectedProperty = selectedPropertyId ? properties.find(p => p.id === selectedPropertyId) : null;
    const neighborhood = selectedPropertyId ? NEIGHBORHOOD_DATA[selectedPropertyId] : null;

    const toggleSave = (id: string) => {
        setSavedProperties(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    const handleShare = (prop: Property) => {
        navigator.clipboard?.writeText(`Check out ${prop.title} — $${(prop.price / 1000000).toFixed(1)}M in ${prop.location}`);
        setShareToast(true);
        setTimeout(() => setShareToast(false), 2000);
    };

    const closePanel = () => setSelectedPropertyId(null);

    // Close panel on Escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closePanel(); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    // Scroll panel to top when selection changes
    useEffect(() => {
        if (panelRef.current) panelRef.current.scrollTop = 0;
    }, [selectedPropertyId]);

    const propertyTypes = ['Apartment', 'House', 'Villa', 'Penthouse'];

    // Mock view counts for social proof
    const viewCounts: Record<string, number> = {
        '1': 342, '2': 891, '3': 214, '4': 567, '5': 189, '6': 423, '7': 756, '8': 638,
    };

    return (
        <div className="min-h-screen bg-[#F7F7F9]">
            {/* Page Hero */}
            <div className="pt-28 pb-12">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-6">
                        <a href="#/" className="hover:text-[#0071E3] transition-colors cursor-pointer">Home</a>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
                        <span className="text-[#1D1D1F] font-medium">Properties</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-[#1D1D1F] sf-display mb-4">
                        Explore Our <span className="text-[#0071E3]">Portfolio</span>
                    </h1>
                    <p className="text-lg text-[#6B7280] max-w-2xl">
                        Browse our curated collection of luxury properties across the United States.
                        Select a listing to explore its full story.
                    </p>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="backdrop-blur-xl">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Search */}
                        <div className="relative flex-1 min-w-[200px]">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            <input
                                type="text"
                                placeholder="Search by name or location..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 bg-transparent rounded-xl text-sm font-medium text-[#1D1D1F] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 transition-all border-none"
                            />
                        </div>

                        {/* Type Filter */}
                        <select
                            value={filters.type}
                            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                            className="px-4 py-3 bg-[#F7F7F9] rounded-xl text-sm font-medium text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3] cursor-pointer appearance-none min-w-[140px]"
                        >
                            <option value="">All Types</option>
                            {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>

                        {/* Beds Filter */}
                        <select
                            value={filters.beds}
                            onChange={(e) => setFilters({ ...filters, beds: e.target.value })}
                            className="px-4 py-3 bg-[#F7F7F9] rounded-xl text-sm font-medium text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3] cursor-pointer appearance-none min-w-[120px]"
                        >
                            <option value="">Any Beds</option>
                            {[2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}+ Beds</option>)}
                        </select>

                        {/* Results Count */}
                        <div className="text-sm font-medium text-[#6B7280]">
                            <span className="text-[#0071E3] font-bold">{filteredProperties.length}</span> properties
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content: Listings Grid */}
            <div className="container mx-auto px-6 py-10">
                <div ref={listingsRef} className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProperties.length > 0 ? (
                            filteredProperties.map((prop) => (
                                <div
                                    id={`listing-${prop.id}`}
                                    key={prop.id}
                                    onMouseEnter={() => setHoveredPropertyId(prop.id)}
                                    onMouseLeave={() => setHoveredPropertyId(null)}
                                    className={`transition-all duration-300 rounded-3xl ${selectedPropertyId === prop.id ? 'ring-4 ring-[#0071E3]/20 scale-[1.02]' : ''
                                        }`}
                                >
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
                </div>
            </div>

            {/* ───────── CONTEXTUAL PROPERTY INSIGHTS PANEL ───────── */}
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${selectedProperty ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={closePanel}
            />

            {/* Slide-in Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-[520px] bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${selectedProperty ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {selectedProperty && neighborhood && (
                    <div ref={panelRef} className="h-full overflow-y-auto pb-28">

                        {/* ── 1. IMMERSIVE VISUAL HEADER ── */}
                        <div className="relative">
                            <img
                                src={selectedProperty.imageUrl}
                                alt={selectedProperty.title}
                                className="w-full aspect-[16/10] object-cover"
                            />
                            {/* Gradient overlay for readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                            {/* Close button */}
                            <button
                                onClick={closePanel}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition-all"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                            </button>

                            {/* Micro-actions: Save & Share */}
                            <div className="absolute top-4 left-4 flex gap-2">
                                <button
                                    onClick={() => toggleSave(selectedProperty.id)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${savedProperties.has(selectedProperty.id) ? 'bg-red-500 text-white' : 'bg-black/30 text-white hover:bg-black/50'}`}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill={savedProperties.has(selectedProperty.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                                </button>
                                <button
                                    onClick={() => handleShare(selectedProperty)}
                                    className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition-all"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" /></svg>
                                </button>
                            </div>

                            {/* Title overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <span className="inline-block px-3 py-1 rounded-full bg-[#0071E3] text-white text-xs font-bold mb-3">{selectedProperty.type}</span>
                                <h2 className="text-2xl font-bold text-white sf-display leading-tight">{selectedProperty.title}</h2>
                                <p className="text-sm text-white/80 mt-1 flex items-center gap-1.5">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                    {selectedProperty.location}
                                </p>
                            </div>
                        </div>

                        {/* ── 2. CORE LISTING ESSENTIALS ── */}
                        <div className="px-6 pt-6">
                            {/* Price & Social Proof */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <p className="text-3xl font-bold text-[#1D1D1F] sf-display">${(selectedProperty.price / 1000000).toFixed(2)}<span className="text-lg font-medium text-[#6B7280]">M</span></p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1.5 text-xs font-semibold text-[#6B7280] bg-[#F7F7F9] px-3 py-1.5 rounded-full">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                        {viewCounts[selectedProperty.id] || 0} views
                                    </span>
                                    {selectedProperty.reviews.length > 0 && (
                                        <span className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full">
                                            ★ {(selectedProperty.reviews.reduce((a, r) => a + r.rating, 0) / selectedProperty.reviews.length).toFixed(1)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Vital Statistics Bar */}
                            <div className="flex items-center gap-0 bg-[#F7F7F9] rounded-2xl p-1 mb-6">
                                <div className="flex-1 text-center py-3 rounded-xl">
                                    <div className="flex items-center justify-center gap-1.5 text-[#0071E3] mb-1">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7v4a1 1 0 0 0 1 1h3M21 7v4a1 1 0 0 1-1 1h-3M7 12v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-5M8 7h8a2 2 0 0 1 2 2v1H6V9a2 2 0 0 1 2-2z" /></svg>
                                    </div>
                                    <p className="text-lg font-bold text-[#1D1D1F]">{selectedProperty.beds}</p>
                                    <p className="text-[10px] text-[#6B7280] font-medium uppercase tracking-wider">Beds</p>
                                </div>
                                <div className="w-px h-10 bg-black/5" />
                                <div className="flex-1 text-center py-3 rounded-xl">
                                    <div className="flex items-center justify-center gap-1.5 text-[#0071E3] mb-1">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m4 12 2 8h12l2-8M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M7 12h10" /></svg>
                                    </div>
                                    <p className="text-lg font-bold text-[#1D1D1F]">{selectedProperty.baths}</p>
                                    <p className="text-[10px] text-[#6B7280] font-medium uppercase tracking-wider">Baths</p>
                                </div>
                                <div className="w-px h-10 bg-black/5" />
                                <div className="flex-1 text-center py-3 rounded-xl">
                                    <div className="flex items-center justify-center gap-1.5 text-[#0071E3] mb-1">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 12h18" /></svg>
                                    </div>
                                    <p className="text-lg font-bold text-[#1D1D1F]">{selectedProperty.sqft.toLocaleString()}</p>
                                    <p className="text-[10px] text-[#6B7280] font-medium uppercase tracking-wider">Sq Ft</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#0071E3] mb-3">About This Property</h3>
                                <p className="text-sm text-[#4B5563] leading-relaxed">{selectedProperty.description}</p>
                            </div>

                            {/* Location Context */}
                            <div className="mb-6 p-4 bg-gradient-to-br from-[#F0F7FF] to-[#F7F7F9] rounded-2xl border border-[#0071E3]/10">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#0071E3]/10 flex items-center justify-center">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                    </div>
                                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#0071E3]">Location Context</h3>
                                </div>
                                <p className="text-sm text-[#4B5563] leading-relaxed">{selectedProperty.community}</p>
                            </div>

                            {/* ── 3. COMMUNITY & LIFESTYLE MODULE ── */}
                            <div className="mb-6">
                                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#0071E3] mb-4">Nearby Amenities</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {neighborhood.amenities.map((a, i) => (
                                        <div key={i} className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-black/5 shadow-sm hover:shadow-md transition-shadow">
                                            <span className="text-lg">{a.icon}</span>
                                            <span className="text-xs font-medium text-[#1D1D1F] leading-tight">{a.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Demographic Insights */}
                            <div className="mb-6">
                                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#0071E3] mb-3">Market Insights</h3>
                                <div className="flex flex-wrap gap-2">
                                    {neighborhood.demographics.map((d, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-[#F7F7F9] rounded-full text-xs font-semibold text-[#4B5563] border border-black/5">{d}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Lifestyle Highlights */}
                            <div className="mb-6">
                                <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#0071E3] mb-3">Lifestyle</h3>
                                <div className="space-y-2">
                                    {neighborhood.lifestyleHighlights.map((l, i) => (
                                        <div key={i} className="flex items-start gap-2.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#0071E3] mt-1.5 flex-shrink-0" />
                                            <span className="text-sm text-[#4B5563]">{l}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Reviews */}
                            {selectedProperty.reviews.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#0071E3] mb-3">Reviews</h3>
                                    <div className="space-y-3">
                                        {selectedProperty.reviews.map(r => (
                                            <div key={r.id} className="p-4 bg-white rounded-xl border border-black/5">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-bold text-[#1D1D1F]">{r.user}</span>
                                                    <span className="text-xs text-amber-500 font-bold">{'★'.repeat(r.rating)}</span>
                                                </div>
                                                <p className="text-xs text-[#6B7280] leading-relaxed">{r.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Agent Info */}
                            <div className="mb-8 p-4 bg-white rounded-2xl border border-black/5 shadow-sm flex items-center gap-4">
                                <img src={selectedProperty.agent.image} alt={selectedProperty.agent.name} className="w-12 h-12 rounded-full object-cover" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-[#1D1D1F]">{selectedProperty.agent.name}</p>
                                    <p className="text-xs text-[#6B7280]">{selectedProperty.agent.title}</p>
                                </div>
                            </div>
                        </div>

                        {/* ── 4. STICKY CTA BAR ── */}
                    </div>
                )}

                {/* Sticky bottom CTA — outside scroll container */}
                {selectedProperty && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-black/5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setContactProperty(selectedProperty)}
                                className="flex-1 py-4 bg-[#0071E3] text-white font-bold rounded-2xl hover:bg-[#0066CC] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#0071E3]/20"
                            >
                                Contact Agent
                            </button>
                            <button
                                onClick={() => setContactProperty(selectedProperty)}
                                className="py-4 px-5 bg-[#F7F7F9] text-[#1D1D1F] font-bold rounded-2xl hover:bg-[#E5E7EB] transition-all border border-black/5"
                            >
                                Book Viewing
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Share Toast */}
            <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 bg-[#1D1D1F] text-white text-sm font-medium rounded-full shadow-2xl transition-all duration-300 ${shareToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                ✓ Link copied to clipboard
            </div>

            {/* Footer CTA — scroll-expand */}
            <PropertiesBottomCTA />

            {/* Contact Modal */}
            <ContactModal
                property={contactProperty}
                onClose={() => setContactProperty(null)}
            />
            <ChatWidget hidden={!!selectedProperty} />
        </div>
    );
};

export default PropertiesPage;
