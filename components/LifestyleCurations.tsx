
import React, { useEffect, useRef, useState } from 'react';
import GeometricPattern from './GeometricPattern';

interface LifestyleTile {
    id: string;
    lifestyle: string;
    tagline: string;
    description: string;
    image: string;
    properties: number;
    priceRange: string;
}

const LIFESTYLE_TILES: LifestyleTile[] = [
    {
        id: 'waterfront',
        lifestyle: 'Waterfront Living',
        tagline: 'Where the horizon is your backyard',
        description: 'Wake to sun-drenched coastlines and crystal-clear waters. These estates redefine seaside luxury with private beach access and panoramic ocean views.',
        image: '/Cold_hawaii.png',
        properties: 12,
        priceRange: '$2.8M – $18M',
    },
    {
        id: 'urban',
        lifestyle: 'Urban Penthouses',
        tagline: 'Above the skyline, beyond expectation',
        description: 'Commanding views from the apex of the world\'s most iconic cities. Private elevators, wraparound terraces, and world-class amenities at your doorstep.',
        image: '/Penthouse_1.png',
        properties: 8,
        priceRange: '$4.5M – $32M',
    },
    {
        id: 'forest',
        lifestyle: 'Forest Sanctuaries',
        tagline: 'Serenity sculpted by nature',
        description: 'Architectural masterpieces embraced by ancient woodlands. These retreats offer total privacy, organic materials, and an immersive connection to the natural world.',
        image: '/Forrest_house.png',
        properties: 6,
        priceRange: '$1.9M – $12M',
    },
    {
        id: 'resort',
        lifestyle: 'Resort Estates',
        tagline: 'Permanent vacation, perfected',
        description: 'Sun-soaked villas with resort-grade pools, outdoor kitchens, and landscaped grounds designed for year-round entertaining and effortless relaxation.',
        image: '/Villa_1.png',
        properties: 15,
        priceRange: '$3.2M – $22M',
    },
    {
        id: 'modern',
        lifestyle: 'Modern Villas',
        tagline: 'Clean lines, limitless living',
        description: 'Bold contemporary architecture meets cutting-edge smart-home technology. Open floor plans, floor-to-ceiling glass, and curated minimalist design.',
        image: '/Villa_3.png',
        properties: 10,
        priceRange: '$2.4M – $15M',
    },
    {
        id: 'coastal',
        lifestyle: 'Coastal Retreats',
        tagline: 'The art of seaside living',
        description: 'Breezy elegance meets coastal sophistication. These homes blend indoor-outdoor living with the rhythm of the tides and salt-kissed air.',
        image: '/Sea_house.png',
        properties: 9,
        priceRange: '$3.6M – $20M',
    },
];

const LifestyleCurations: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visibleTiles, setVisibleTiles] = useState<Set<string>>(new Set());
    const [hoveredTile, setHoveredTile] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('data-tile-id');
                        if (id) setVisibleTiles((prev) => new Set(prev).add(id));
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        const tiles = sectionRef.current?.querySelectorAll('[data-tile-id]');
        tiles?.forEach((tile) => observer.observe(tile));
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative pt-12 pb-28 bg-[#F7F7F9] overflow-hidden">
            <GeometricPattern />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#0071E3] mb-4">
                        Neighborhood Curations
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-bold text-[#1D1D1F] sf-display mb-6 leading-tight">
                        Find Your <span className="text-[#0071E3]">Lifestyle</span>
                    </h3>
                    <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
                        Luxury is more than a price tag — it's how you want to live. Explore curated environments that match your vision.
                    </p>
                </div>

                {/* Bento-style Tile Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {LIFESTYLE_TILES.map((tile, index) => {
                        const isVisible = visibleTiles.has(tile.id);
                        const isHovered = hoveredTile === tile.id;
                        // First two tiles span full width on large screens for hero impact
                        const isHero = index < 2;

                        return (
                            <a
                                key={tile.id}
                                href="#/properties"
                                data-tile-id={tile.id}
                                onMouseEnter={() => setHoveredTile(tile.id)}
                                onMouseLeave={() => setHoveredTile(null)}
                                className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                    } ${isHero ? 'lg:col-span-1 lg:row-span-2' : ''}`}
                                style={{
                                    transitionDelay: `${index * 100}ms`,
                                    minHeight: isHero ? '520px' : '320px',
                                }}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={tile.image}
                                        alt={tile.lifestyle}
                                        className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isHovered ? 'scale-110' : 'scale-100'
                                            }`}
                                    />
                                </div>

                                {/* Gradient Overlay */}
                                <div className={`absolute inset-0 transition-all duration-500 ${isHovered
                                    ? 'bg-gradient-to-t from-black/80 via-black/40 to-black/10'
                                    : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'
                                    }`} />

                                {/* Top Badge */}
                                <div className="absolute top-5 left-5 z-10">
                                    <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                                        {tile.properties} Properties · {tile.priceRange}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                                    <h4 className="text-2xl md:text-3xl font-bold text-white sf-display mb-1 leading-tight">
                                        {tile.lifestyle}
                                    </h4>
                                    <p className="text-sm text-white/70 italic mb-3">{tile.tagline}</p>

                                    {/* Description — appears on hover */}
                                    <div className={`transition-all duration-500 overflow-hidden ${isHovered ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
                                        }`}>
                                        <p className="text-sm text-white/80 leading-relaxed mb-4">
                                            {tile.description}
                                        </p>
                                    </div>

                                    {/* CTA Arrow */}
                                    <div className={`flex items-center gap-2 text-white/90 text-sm font-semibold transition-all duration-300 ${isHovered ? 'translate-x-2' : ''
                                        }`}>
                                        <span>Explore Collection</span>
                                        <svg
                                            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                                            className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
                                        >
                                            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Subtle Border */}
                                <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
                            </a>
                        );
                    })}

                    {/* Unique Lifestyle Card */}
                    <a
                        href="#/agents"
                        data-tile-id="unique-lifestyle"
                        className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-white transition-all duration-700 ease-out flex flex-col items-center justify-center p-8 border border-gray-100 shadow-2xl hover:border-[#0071E3]/20 ${visibleTiles.has('unique-lifestyle') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                        style={{
                            transitionDelay: '600ms',
                            minHeight: '320px',
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F7F7F9] to-white opacity-50" />

                        <div className="relative z-10 text-center max-w-xs mx-auto transform transition-transform duration-500 group-hover:scale-105">
                            <h4 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] sf-display leading-tight mb-8">
                                Find your <span className="text-[#0071E3]">unique</span><br />lifestyle this way
                            </h4>

                            <div className="w-16 h-16 mx-auto rounded-full bg-[#F5F5F7] group-hover:bg-[#0071E3] flex items-center justify-center transition-colors duration-300">
                                <svg
                                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                    className="text-[#1D1D1F] group-hover:text-white transition-colors duration-300 ml-1"
                                >
                                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default LifestyleCurations;
