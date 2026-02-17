
import React, { useState, useRef, useEffect } from 'react';
import GeometricPattern from './GeometricPattern';
import ChatWidget from './ChatWidget';
import { AGENTS } from '../constants';
import { Agent } from '../types';

/* ══════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════ */

/* ══════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════ */

// Agent interface and AGENTS array moved to types.ts and constants.tsx

const SERVICES = [
    { icon: 'lock', label: 'Private Off-Market Access', desc: 'Exclusive listings never seen on public platforms' },
    { icon: 'scale', label: 'Legal & Tax Advisory', desc: 'Cross-border structuring and compliance coordination' },
    { icon: 'palette', label: 'Professional Staging', desc: 'Curated interiors by world-class design firms' },
    { icon: 'compass', label: 'Architecture Consultation', desc: 'Expert evaluation of build quality and design potential' },
    { icon: 'plane', label: 'Relocation Concierge', desc: 'End-to-end lifestyle transition for global families' },
    { icon: 'chart', label: 'Investment Portfolio Review', desc: 'Strategic diversification across prime markets' },
];

const AGENT_TESTIMONIALS = [
    { quote: 'Victoria found us a property we didn\'t even know existed. Her waterfront knowledge is unmatched.', client: 'Richard & Anne Kensington', agent: 'victoria' },
    { quote: 'Marcus navigated a complex off-market deal with extraordinary finesse. A true strategist.', client: 'Sofia Petrov', agent: 'marcus' },
    { quote: 'Elena\'s eye for architecture helped us see beyond the listing. She found our dream home.', client: 'Dr. Michael Chen', agent: 'elena' },
    { quote: 'James has managed our family\'s portfolio for over a decade. Discretion and trust personified.', client: 'The Hartwell Family', agent: 'james' },
    { quote: 'Working with Victoria felt like having a trusted friend in the industry. She truly listens.', client: 'Carla & Thomas Lindgren', agent: 'victoria' },
    { quote: 'Marcus delivered results that exceeded every expectation. His market insight is extraordinary.', client: 'Jonathan Blake', agent: 'marcus' },
];

const PRESS_LOGOS = [
    { name: 'BØRSEN', style: 'font-family: "Playfair Display", Georgia, serif; font-weight: 900; font-size: 1.8rem; letter-spacing: 0.08em;' },
    { name: 'Architectural Digest', style: 'font-family: "Playfair Display", Georgia, serif; font-weight: 400; font-size: 1.4rem; letter-spacing: 0.12em; text-transform: uppercase;' },
    { name: 'Financial Times', style: 'font-family: Georgia, "Times New Roman", serif; font-weight: 700; font-size: 1.6rem; font-style: italic; letter-spacing: 0.01em;' },
    { name: 'ROBB REPORT', style: 'font-family: "Playfair Display", Georgia, serif; font-weight: 400; font-size: 1.5rem; letter-spacing: 0.25em;' },
    { name: 'Forbes', style: 'font-family: "Playfair Display", Georgia, serif; font-weight: 900; font-size: 2rem; letter-spacing: -0.01em;' },
    { name: 'MANSION GLOBAL', style: 'font-family: system-ui, -apple-system, sans-serif; font-weight: 300; font-size: 1.3rem; letter-spacing: 0.2em;' },
];

/* ══════════════════════════════════════════════
   ICON HELPER
   ══════════════════════════════════════════════ */
const ServiceIcon: React.FC<{ icon: string }> = ({ icon }) => {
    const cls = 'w-6 h-6';
    switch (icon) {
        case 'lock': return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
        case 'scale': return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v18" /><path d="m4 7 8-4 8 4" /><path d="M4 7c0 3 2 5 4 5s4-2 4-5" /><path d="M12 7c0 3 2 5 4 5s4-2 4-5" /></svg>;
        case 'palette': return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><circle cx="8" cy="10" r="1.5" fill="currentColor" /><circle cx="12" cy="7" r="1.5" fill="currentColor" /><circle cx="16" cy="10" r="1.5" fill="currentColor" /><path d="M15 14c0 2.2-1.3 4-3 4s-3-1.8-3-4" /></svg>;
        case 'compass': return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="none" /></svg>;
        case 'plane': return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.7.5-1.1z" /></svg>;
        case 'chart': return <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3v18h18" /><path d="m7 17 4-8 4 4 5-9" /></svg>;
        default: return null;
    }
};



/* ══════════════════════════════════════════════
   BOOKING MODAL
   ══════════════════════════════════════════════ */
const BookingModal: React.FC<{ agent: Agent | null; onClose: () => void }> = ({ agent, onClose }) => {
    if (!agent) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div
                className="relative bg-white rounded-[2rem] p-8 md:p-12 max-w-lg w-full shadow-2xl animate-in"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: 'fadeInUp 0.4s ease-out' }}
            >
                <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#F7F7F9] flex items-center justify-center hover:bg-[#E5E5EA] transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>

                <div className="flex items-center gap-4 mb-8">
                    <img src={agent.image} alt={agent.name} className="w-16 h-16 rounded-full object-cover" />
                    <div>
                        <h3 className="text-xl font-bold text-[#1D1D1F]">{agent.name}</h3>
                        <p className="text-sm text-[#6B7280]">{agent.title}</p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-[#1D1D1F] sf-display mb-2">Book a Private Consultation</h2>
                <p className="text-[#6B7280] mb-8">Select a preferred time and we'll confirm within 24 hours.</p>

                <div className="space-y-4">
                    <input type="text" placeholder="Full Name" className="w-full px-5 py-4 bg-[#F7F7F9] rounded-xl text-sm font-medium text-[#1D1D1F] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30" />
                    <input type="email" placeholder="Email Address" className="w-full px-5 py-4 bg-[#F7F7F9] rounded-xl text-sm font-medium text-[#1D1D1F] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30" />
                    <input type="tel" placeholder="Phone Number" className="w-full px-5 py-4 bg-[#F7F7F9] rounded-xl text-sm font-medium text-[#1D1D1F] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30" />
                    <select className="w-full px-5 py-4 bg-[#F7F7F9] rounded-xl text-sm font-medium text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 appearance-none">
                        <option value="">Preferred Time</option>
                        <option>Morning (9 AM – 12 PM)</option>
                        <option>Afternoon (12 PM – 5 PM)</option>
                        <option>Evening (5 PM – 8 PM)</option>
                    </select>
                </div>

                <button className="w-full mt-8 px-8 py-5 bg-[#0071E3] text-white font-bold rounded-2xl shadow-xl hover:bg-[#005BB5] transition-all transform hover:scale-[1.02] active:scale-95">
                    Confirm Consultation
                </button>
            </div>
        </div>
    );
};

/* ══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════ */
const AgentsPage: React.FC = () => {
    const [bookingAgent, setBookingAgent] = useState<Agent | null>(null);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    // Auto-advance testimonials
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % AGENT_TESTIMONIALS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleDownloadVCard = (agent: Agent) => {
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${agent.name}
TITLE:${agent.title}
TEL:${agent.phone}
EMAIL:${agent.email}
ORG:LuxeMap Estates
URL:https://luxemap.com
END:VCARD`;
        const blob = new Blob([vcard], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${agent.name.replace(/\s+/g, '_')}.vcf`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-[#F7F7F9]">

            {/* ═══ 1. PHILOSOPHY HEADER ═══ */}
            <section className="relative z-30 bg-[#1D1D1F] text-white pt-32 pb-24 shadow-2xl overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex items-center gap-2 text-sm text-white/50 mb-8">
                        <a href="#/" className="hover:text-white transition-colors cursor-pointer">Home</a>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
                        <span className="text-white/80 font-medium">Our Partners</span>
                    </div>

                    <div className="max-w-3xl">
                        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#0071E3] mb-6">The Advisory Circle</h2>
                        <h1 className="text-5xl md:text-7xl font-bold sf-display mb-8 leading-[1.1]">
                            Your Trusted <br />
                            <span className="text-[#0071E3]">Partners</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-2xl">
                            Our advisors are not salespeople — they are market specialists, investment strategists, and lifestyle architects who operate with absolute discretion.
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

            {/* ═══ 2. ADVISOR PROFILES ═══ */}
            {/* ═══ 2. ADVISOR PROFILES ═══ */}
            <section className="py-24 relative">
                <GeometricPattern />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#0071E3] mb-4">Meet the Team</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-[#C5A065] sf-display">Elite Market Specialists</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {AGENTS.map((agent) => (
                            <div
                                key={agent.id}
                                className="group bg-white rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-black/[0.03]"
                            >
                                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                                    {/* Portrait */}
                                    <div className="w-28 h-28 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#0071E3]/10">
                                        <img
                                            src={agent.image}
                                            alt={agent.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    {/* Name & Title */}
                                    <div className="flex-1">
                                        <h4 className="text-2xl font-bold text-[#1D1D1F] sf-display mb-1">{agent.name}</h4>
                                        <p className="text-sm text-[#0071E3] font-semibold mb-3">{agent.title}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {agent.specializations.map((tag) => (
                                                <span key={tag} className="px-3 py-1 bg-[#0071E3]/5 text-[#0071E3] text-xs font-bold rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-[#6B7280] leading-relaxed mb-6">{agent.bio}</p>

                                {/* Metrics */}
                                <div className="grid grid-cols-3 gap-4 mb-6 bg-[#F7F7F9] rounded-2xl p-4">
                                    {agent.metrics.map((m) => (
                                        <div key={m.label} className="text-center">
                                            <div className="text-xl font-bold text-[#1D1D1F]">{m.value}</div>
                                            <div className="text-[10px] uppercase tracking-widest text-[#6B7280] font-semibold mt-1">{m.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={() => setBookingAgent(agent)}
                                        className="flex-1 px-6 py-4 bg-[#0071E3] text-white font-bold rounded-2xl text-sm transition-all hover:bg-[#005BB5] transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></svg>
                                        Book Consultation
                                    </button>
                                    <button
                                        onClick={() => handleDownloadVCard(agent)}
                                        className="px-6 py-4 bg-[#F7F7F9] text-[#1D1D1F] font-bold rounded-2xl text-sm transition-all hover:bg-[#E5E5EA] transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                        Download Contact
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ 3. CONCIERGE SERVICES + GOLDEN ZONES ═══ */}
            {/* ═══ 3. CONCIERGE SERVICES + GOLDEN ZONES ═══ */}
            <section className="py-24 bg-[#1D1D1F] relative z-30 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.3),0_20px_40px_-15px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#0071E3] mb-4">Beyond the Transaction</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-white sf-display">Concierge-Level Service</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Services Grid */}
                        <div>
                            <h4 className="text-lg font-bold text-white mb-8">White-Glove Services</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {SERVICES.map((s) => (
                                    <div key={s.label} className="group p-6 rounded-2xl bg-white/5 hover:bg-white transition-all duration-500 cursor-default border border-white/5">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 group-hover:bg-[#0071E3]/10 flex items-center justify-center mb-4 text-white group-hover:text-[#0071E3] transition-colors duration-500">
                                            <ServiceIcon icon={s.icon} />
                                        </div>
                                        <h5 className="font-bold text-white group-hover:text-[#1D1D1F] transition-colors duration-500 mb-1">{s.label}</h5>
                                        <p className="text-sm text-white/50 group-hover:text-[#6B7280] transition-colors duration-500">{s.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Golden Zones */}
                        <div>
                            <h4 className="text-lg font-bold text-white mb-8">Our Golden Zones</h4>
                            <div className="space-y-6">
                                {[
                                    { region: 'Coastal', icon: '🌊', zones: ['Malibu', 'Miami Beach', 'Hamptons', 'Laguna Beach'] },
                                    { region: 'Mountain & Lake', icon: '🏔️', zones: ['Aspen', 'Lake Tahoe', 'Park City', 'Telluride'] },
                                    { region: 'Urban', icon: '🏙️', zones: ['Manhattan', 'San Francisco', 'Chicago Gold Coast', 'Beverly Hills'] },
                                ].map((group) => (
                                    <div key={group.region} className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-2xl">{group.icon}</span>
                                            <h5 className="font-bold text-white">{group.region}</h5>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {group.zones.map((z) => (
                                                <span key={z} className="px-4 py-2 bg-white/5 hover:bg-white/10 transition-colors rounded-full text-sm font-medium text-white/80 border border-white/10">
                                                    {z}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative arcs (Hero Style) */}
                <div className="absolute top-0 left-0 w-[40%] h-full opacity-[0.06] pointer-events-none -scale-x-100">
                    <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
                        <circle cx="300" cy="200" r="280" stroke="white" strokeWidth="1" strokeDasharray="8 16" />
                        <circle cx="300" cy="200" r="200" stroke="white" strokeWidth="1" strokeDasharray="6 12" />
                        <circle cx="300" cy="200" r="120" stroke="white" strokeWidth="1" strokeDasharray="4 8" />
                    </svg>
                </div>
            </section>

            {/* ═══ 4. AGENT-LINKED TESTIMONIALS ═══ */}
            {/* ═══ 4. AGENT-LINKED TESTIMONIALS ═══ */}
            <section className="py-24 relative">
                <GeometricPattern />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#0071E3] mb-4">Client Voices</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] sf-display">Stories of Trust</h3>
                    </div>

                    {/* Testimonial Card */}
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-xl border border-black/[0.03] transition-all duration-500">
                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} width="18" height="18" fill="#0071E3" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                ))}
                            </div>

                            <p className="text-2xl md:text-3xl font-medium text-[#1D1D1F] leading-relaxed mb-10 sf-display">
                                "{AGENT_TESTIMONIALS[activeTestimonial].quote}"
                            </p>

                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-bold text-[#1D1D1F] text-lg">{AGENT_TESTIMONIALS[activeTestimonial].client}</div>
                                    <div className="text-sm text-[#6B7280] mt-1">
                                        Worked with{' '}
                                        <span className="text-[#0071E3] font-semibold">
                                            {AGENTS.find((a) => a.id === AGENT_TESTIMONIALS[activeTestimonial].agent)?.name}
                                        </span>
                                    </div>
                                </div>
                                <img
                                    src={AGENTS.find((a) => a.id === AGENT_TESTIMONIALS[activeTestimonial].agent)?.image}
                                    alt=""
                                    className="w-12 h-12 rounded-full object-cover border-2 border-[#0071E3]/20"
                                />
                            </div>
                        </div>

                        {/* Dots Navigation */}
                        <div className="flex justify-center gap-2 mt-8">
                            {AGENT_TESTIMONIALS.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveTestimonial(idx)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === activeTestimonial ? 'bg-[#0071E3] w-8' : 'bg-[#1D1D1F]/15 hover:bg-[#1D1D1F]/30'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ 5. PRESS / AS SEEN IN — INFINITE MARQUEE ═══ */}
            <section className="py-16 overflow-hidden">
                <p className="text-center text-xs uppercase tracking-[0.3em] font-bold text-[#6B7280] mb-10">As Featured In</p>
                <div className="relative">
                    {/* Edge fade masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F7F7F9] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F7F7F9] to-transparent z-10 pointer-events-none" />

                    <div className="marquee-track">
                        {[0, 1].map((copy) => (
                            <div key={copy} className="marquee-strip">
                                {PRESS_LOGOS.map((logo) => (
                                    <div key={`${logo.name}-${copy}`} className="marquee-item">
                                        <span
                                            className="marquee-text-logo"
                                            style={{ ...Object.fromEntries(logo.style.split(';').filter(Boolean).map(s => { const [k, ...v] = s.split(':'); return [k.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v.join(':').trim()]; })) }}
                                        >
                                            {logo.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* ═══ BOOKING MODAL ═══ */}
            <BookingModal agent={bookingAgent} onClose={() => setBookingAgent(null)} />

            {/* Animation keyframes */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Infinite Marquee ── */
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 50s linear infinite;
          will-change: transform;
        }

        .marquee-strip {
          display: flex;
          flex-shrink: 0;
        }
        .marquee-item {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 220px;
          height: 80px;
          margin: 0 40px;
          flex-shrink: 0;
        }
        .marquee-text-logo {
          color: #C5A065;
          user-select: none;
          white-space: nowrap;
          transition: opacity 0.3s ease;
        }
        @media (min-width: 768px) {
          .marquee-item {
            width: 260px;
            height: 90px;
            margin: 0 50px;
          }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
            <ChatWidget />
        </div>
    );
};

export default AgentsPage;
