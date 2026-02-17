
import React, { useState, useRef, useEffect } from 'react';
import GeometricPattern from './GeometricPattern';
import ChatWidget from './ChatWidget';

/* ══════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════ */

const MARKET_STATS = [
    { label: 'Average Price Growth', value: '+12.4%', icon: 'trending', description: 'Year over year' },
    { label: 'Properties Sold', value: '847', icon: 'home', description: 'Last quarter' },
    { label: 'Days on Market', value: '23', icon: 'clock', description: 'Average listing time' },
    { label: 'Price per Sq Ft', value: '$1,245', icon: 'dollar', description: 'Median rate' },
];

const REGIONAL_MARKETS = [
    {
        id: 'coastal',
        name: 'Coastal Markets',
        icon: 'wave',
        avgPrice: '$8.2M',
        growth: '+15.3%',
        hotNeighborhoods: ['Malibu Colony', 'Fisher Island', 'Meadow Lane'],
        locations: ['Malibu', 'Miami', 'Hamptons'],
    },
    {
        id: 'mountain',
        name: 'Mountain Retreats',
        icon: 'mountain',
        avgPrice: '$6.5M',
        growth: '+11.8%',
        hotNeighborhoods: ['Red Mountain', 'Martis Camp', 'Mountain Village'],
        locations: ['Aspen', 'Tahoe', 'Telluride'],
    },
    {
        id: 'urban',
        name: 'Urban Centers',
        icon: 'building',
        avgPrice: '$12.4M',
        growth: '+8.7%',
        hotNeighborhoods: ['Tribeca', 'Pacific Heights', 'Gold Coast'],
        locations: ['NYC', 'SF', 'Chicago'],
    },
];

const INVESTMENT_INSIGHTS = [
    {
        title: 'Market Timing Indicators',
        description: 'Current market conditions favor buyers in select coastal regions with inventory up 12% quarter-over-quarter.',
        icon: 'timing',
        highlight: 'Buyer Favorable',
    },
    {
        title: 'Best ROI Neighborhoods',
        description: 'Emerging areas in Miami\'s Design District and Austin\'s Westlake show 18-24% projected appreciation.',
        icon: 'roi',
        highlight: '18-24% Growth',
    },
    {
        title: 'Emerging Luxury Markets',
        description: 'Nashville, Austin, and Denver leading secondary market growth with tech-driven wealth migration.',
        icon: 'emerging',
        highlight: 'High Potential',
    },
    {
        title: 'Global Investment Flows',
        description: 'International buyers returning to US markets with 34% increase in cross-border transactions.',
        icon: 'global',
        highlight: '+34% Intl.',
    },
];

/* ══════════════════════════════════════════════
   ICON COMPONENTS
   ══════════════════════════════════════════════ */

const StatIcon: React.FC<{ icon: string }> = ({ icon }) => {
    const cls = 'w-8 h-8';
    switch (icon) {
        case 'trending':
            return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" /></svg>;
        case 'home':
            return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
        case 'clock':
            return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
        case 'dollar':
            return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>;
        default:
            return null;
    }
};

const RegionIcon: React.FC<{ icon: string }> = ({ icon }) => {
    const cls = 'w-6 h-6';
    switch (icon) {
        case 'wave':
            return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12c1.5-2 3-3 5-3s4 2 6 2 4-2 6-2 3.5 1 5 3" /><path d="M2 17c1.5-2 3-3 5-3s4 2 6 2 4-2 6-2 3.5 1 5 3" /></svg>;
        case 'mountain':
            return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m8 3 4 8 5-5 5 10H2L8 3z" /></svg>;
        case 'building':
            return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" /></svg>;
        default:
            return null;
    }
};

const InsightIcon: React.FC<{ icon: string }> = ({ icon }) => {
    const cls = 'w-6 h-6';
    switch (icon) {
        case 'timing':
            return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>;
        case 'roi':
            return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3v18h18" /><path d="m7 16 4-8 4 4 5-9" /></svg>;
        case 'emerging':
            return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
        case 'global':
            return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
        default:
            return null;
    }
};

/* ══════════════════════════════════════════════
   SCROLL-EXPAND BOTTOM CTA
   ══════════════════════════════════════════════ */

const MarketInsightsBottomCTA: React.FC = () => {
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
                        Get Personalized Market Analysis
                    </h2>
                    <p className="text-lg text-white/80 mb-8">
                        Our expert consultants provide tailored insights for your specific investment goals and preferred markets.
                    </p>
                    <button className="px-8 py-4 bg-white text-[#0071E3] font-bold rounded-2xl shadow-xl hover:bg-[#F7F7F9] transition-all transform hover:scale-105 active:scale-95">
                        Contact a Consultant
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

/* ══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════ */

const MarketInsightsPage: React.FC = () => {
    const [activeRegion, setActiveRegion] = useState<string>('coastal');
    const [email, setEmail] = useState('');

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter signup
        alert(`Thank you for subscribing with: ${email}`);
        setEmail('');
    };

    return (
        <div className="min-h-screen bg-[#F7F7F9]">

            {/* ═══ 1. HERO SECTION ═══ */}
            <section className="relative z-30 bg-[#1D1D1F] text-white pt-32 pb-24 shadow-2xl overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex items-center gap-2 text-sm text-white/50 mb-8">
                        <a href="#/" className="hover:text-white transition-colors cursor-pointer">Home</a>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
                        <span className="text-white/80 font-medium">Market Insights</span>
                    </div>

                    <div className="max-w-3xl">
                        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#0071E3] mb-6">Market Intelligence</h2>
                        <h1 className="text-5xl md:text-7xl font-bold sf-display mb-8 leading-[1.1]">
                            Real Estate Market <br />
                            <span className="text-[#0071E3]">Insights</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-2xl">
                            Data-driven analysis and expert perspectives on luxury real estate markets across the nation. Make informed decisions with our comprehensive market intelligence.
                        </p>
                    </div>
                </div>

                {/* Decorative arcs */}
                <div className="absolute top-0 right-0 w-[40%] h-full opacity-[0.06] pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
                        <circle cx="300" cy="200" r="280" stroke="white" strokeWidth="1" strokeDasharray="8 16" />
                        <circle cx="300" cy="200" r="200" stroke="white" strokeWidth="1" strokeDasharray="6 12" />
                        <circle cx="300" cy="200" r="120" stroke="white" strokeWidth="1" strokeDasharray="4 8" />
                    </svg>
                </div>
            </section>

            {/* ═══ 2. MARKET OVERVIEW STATS ═══ */}
            <section className="py-24 relative">
                <GeometricPattern />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#0071E3] mb-4">Current Snapshot</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] sf-display">Market Overview</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {MARKET_STATS.map((stat) => (
                            <div
                                key={stat.label}
                                className="group relative bg-white rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-black/[0.03] overflow-hidden"
                            >
                                {/* Gradient background on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0071E3]/5 to-[#C5A065]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-[#0071E3]/10 flex items-center justify-center mb-6 text-[#0071E3] group-hover:bg-[#0071E3] group-hover:text-white transition-all duration-500">
                                        <StatIcon icon={stat.icon} />
                                    </div>
                                    <div className="text-4xl font-bold text-[#1D1D1F] sf-display mb-2">{stat.value}</div>
                                    <div className="text-sm font-semibold text-[#1D1D1F] mb-1">{stat.label}</div>
                                    <div className="text-xs text-[#6B7280]">{stat.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ 3. REGIONAL MARKET TRENDS ═══ */}
            <section className="py-24 bg-[#1D1D1F] relative z-30 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.3),0_20px_40px_-15px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#0071E3] mb-4">Regional Analysis</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-white sf-display">Market Trends by Region</h3>
                    </div>

                    {/* Region Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {REGIONAL_MARKETS.map((region) => (
                            <button
                                key={region.id}
                                onClick={() => setActiveRegion(region.id)}
                                className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 flex items-center gap-2 ${activeRegion === region.id
                                    ? 'bg-[#0071E3] text-white'
                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                                    }`}
                            >
                                <RegionIcon icon={region.icon} />
                                {region.name}
                            </button>
                        ))}
                    </div>

                    {/* Active Region Details */}
                    {REGIONAL_MARKETS.filter((r) => r.id === activeRegion).map((region) => (
                        <div key={region.id} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Stats Card */}
                            <div className="lg:col-span-1 bg-gradient-to-br from-[#0071E3] to-[#0055b3] rounded-[2.5rem] p-8 text-white">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                        <RegionIcon icon={region.icon} />
                                    </div>
                                    <h4 className="text-xl font-bold">{region.name}</h4>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <div className="text-sm text-white/60 mb-1">Average Price</div>
                                        <div className="text-4xl font-bold sf-display">{region.avgPrice}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-white/60 mb-1">YoY Growth</div>
                                        <div className="text-3xl font-bold text-green-300">{region.growth}</div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {region.locations.map((loc) => (
                                            <span key={loc} className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium">
                                                {loc}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Hot Neighborhoods */}
                            <div className="lg:col-span-2 bg-white/5 rounded-[2.5rem] p-8 border border-white/10">
                                <h4 className="text-lg font-bold text-white mb-6">Hot Neighborhoods</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {region.hotNeighborhoods.map((neighborhood, idx) => (
                                        <div
                                            key={neighborhood}
                                            className="group p-6 rounded-2xl bg-white/5 hover:bg-white transition-all duration-500 border border-white/10"
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-8 h-8 rounded-full bg-[#C5A065] flex items-center justify-center text-white text-sm font-bold">
                                                    {idx + 1}
                                                </div>
                                                <span className="text-[#C5A065] text-xs font-bold uppercase tracking-wider group-hover:text-[#0071E3] transition-colors">
                                                    Trending
                                                </span>
                                            </div>
                                            <h5 className="font-bold text-white group-hover:text-[#1D1D1F] transition-colors text-lg">
                                                {neighborhood}
                                            </h5>
                                            <p className="text-sm text-white/50 group-hover:text-[#6B7280] transition-colors mt-2">
                                                High demand area with limited inventory
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Decorative arcs */}
                <div className="absolute top-0 left-0 w-[40%] h-full opacity-[0.06] pointer-events-none -scale-x-100">
                    <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
                        <circle cx="300" cy="200" r="280" stroke="white" strokeWidth="1" strokeDasharray="8 16" />
                        <circle cx="300" cy="200" r="200" stroke="white" strokeWidth="1" strokeDasharray="6 12" />
                        <circle cx="300" cy="200" r="120" stroke="white" strokeWidth="1" strokeDasharray="4 8" />
                    </svg>
                </div>
            </section>

            {/* ═══ 4. INVESTMENT INSIGHTS SECTION ═══ */}
            <section className="py-24 relative z-10 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1),0_20px_40px_-15px_rgba(0,0,0,0.1)] bg-[#F7F7F9]">
                <GeometricPattern />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#0071E3] mb-4">Strategic Intelligence</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] sf-display">Investment Insights</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {INVESTMENT_INSIGHTS.map((insight) => (
                            <div
                                key={insight.title}
                                className="group bg-white rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-black/[0.03]"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-[#0071E3]/10 flex items-center justify-center text-[#0071E3] flex-shrink-0 group-hover:bg-[#0071E3] group-hover:text-white transition-all duration-500">
                                        <InsightIcon icon={insight.icon} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className="text-xl font-bold text-[#1D1D1F]">{insight.title}</h4>
                                            <span className="px-3 py-1 bg-[#C5A065]/10 text-[#C5A065] text-xs font-bold rounded-full">
                                                {insight.highlight}
                                            </span>
                                        </div>
                                        <p className="text-[#6B7280] leading-relaxed">{insight.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ 5. MARKET REPORTS CTA ═══ */}
            <section className="py-24 bg-[#F7F7F9] relative z-10 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1),0_20px_40px_-15px_rgba(0,0,0,0.1)]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Download Report Card */}
                        <div className="relative rounded-[2.5rem] p-10 md:p-12 shadow-lg overflow-hidden min-h-[400px] flex flex-col justify-end">
                            {/* Background Image */}
                            <img
                                src="/skyscraper-grey.png"
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            {/* Dark Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />

                            {/* Content */}
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                        <line x1="16" y1="13" x2="8" y2="13" />
                                        <line x1="16" y1="17" x2="8" y2="17" />
                                        <polyline points="10 9 9 9 8 9" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white sf-display mb-4">
                                    Quarterly Market Report
                                </h3>
                                <p className="text-white/70 mb-8 leading-relaxed">
                                    Get our comprehensive Q4 2024 luxury real estate market report with detailed analysis, trends, and forecasts for all major markets.
                                </p>
                                <button className="px-8 py-4 bg-[#0071E3] text-white font-bold rounded-2xl shadow-lg hover:bg-[#005BB5] transition-all transform hover:scale-[1.02] active:scale-95 flex items-center gap-3">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" y1="15" x2="12" y2="3" />
                                    </svg>
                                    Download Report (PDF)
                                </button>
                            </div>
                        </div>

                        {/* Newsletter Signup Card */}
                        <div className="bg-gradient-to-br from-[#1D1D1F] to-[#2D2D2F] rounded-[2.5rem] p-10 md:p-12 text-white">
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold sf-display mb-4">
                                Market Updates Newsletter
                            </h3>
                            <p className="text-white/60 mb-8 leading-relaxed">
                                Stay ahead of the market with weekly insights, new listings alerts, and exclusive off-market opportunities delivered to your inbox.
                            </p>
                            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    required
                                    className="w-full px-5 py-4 bg-white/10 rounded-xl text-sm font-medium text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#0071E3] border border-white/10"
                                />
                                <button
                                    type="submit"
                                    className="w-full px-8 py-4 bg-[#C5A065] text-white font-bold rounded-2xl shadow-lg hover:bg-[#B08F55] transition-all transform hover:scale-[1.02] active:scale-95"
                                >
                                    Subscribe to Updates
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ 6. BOTTOM CTA ═══ */}
            <MarketInsightsBottomCTA />

            {/* Animation keyframes */}
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            <ChatWidget />
        </div>
    );
};

export default MarketInsightsPage;
