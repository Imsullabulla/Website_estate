
import React, { useState, useRef, useEffect } from 'react';
import GeometricPattern from './GeometricPattern';
import ChatWidget from './ChatWidget';

/* ══════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════ */

const CORE_SERVICES = [
    {
        icon: 'lock',
        title: 'Private Off-Market Access',
        description: 'Gain exclusive access to premium properties never listed on public platforms. Our extensive network and trusted relationships with elite property owners unlock doors that remain closed to traditional buyers. We curate opportunities tailored to your investment criteria and lifestyle preferences.',
    },
    {
        icon: 'scale',
        title: 'Legal & Tax Advisory',
        description: 'Navigate complex cross-border transactions with confidence. Our network of international tax specialists and real estate attorneys ensures optimal structuring, compliance coordination, and asset protection strategies for your luxury property investments.',
    },
    {
        icon: 'palette',
        title: 'Professional Staging',
        description: 'Transform your property into an irresistible showcase with our world-class interior design partners. From curated furniture selections to bespoke art installations, we create environments that captivate discerning buyers and command premium valuations.',
    },
    {
        icon: 'compass',
        title: 'Architecture Consultation',
        description: 'Receive expert evaluation of build quality, design potential, and renovation possibilities. Our architectural consultants assess structural integrity, spatial optimization, and value-add opportunities to inform your investment decisions.',
    },
    {
        icon: 'plane',
        title: 'Relocation Concierge',
        description: 'Experience seamless lifestyle transitions with our comprehensive relocation services. From school enrollment and private club memberships to staff placement and local orientation, we handle every detail of your move to a new destination.',
    },
    {
        icon: 'chart',
        title: 'Investment Portfolio Review',
        description: 'Optimize your real estate holdings with strategic portfolio analysis. Our investment advisors evaluate market positioning, diversification opportunities, and exit strategies to maximize returns across prime global markets.',
    },
];

const PROCESS_STEPS = [
    {
        number: 1,
        title: 'Initial Consultation',
        description: 'We begin with a confidential conversation to understand your vision, timeline, and unique requirements.',
    },
    {
        number: 2,
        title: 'Needs Assessment',
        description: 'Our team conducts a comprehensive analysis of your lifestyle priorities, investment goals, and preferred locations.',
    },
    {
        number: 3,
        title: 'Curated Selection',
        description: 'We present a handpicked portfolio of properties and services precisely matched to your criteria.',
    },
    {
        number: 4,
        title: 'Seamless Transaction',
        description: 'From negotiation to closing, we orchestrate every detail ensuring a flawless experience.',
    },
];

const SERVICE_TIERS = [
    {
        name: 'Essential',
        price: 'From $2,500',
        description: 'Perfect for buyers seeking guided support through their property journey.',
        features: [
            'Dedicated property advisor',
            'Market analysis reports',
            'Property tour coordination',
            'Negotiation support',
            'Transaction management',
        ],
        recommended: false,
    },
    {
        name: 'Premium',
        price: 'From $7,500',
        description: 'Comprehensive concierge service for discerning clients with elevated expectations.',
        features: [
            'Everything in Essential',
            'Off-market property access',
            'Legal & tax advisory coordination',
            'Professional staging consultation',
            'Relocation planning assistance',
            'Priority response (24/7)',
        ],
        recommended: true,
    },
    {
        name: 'Elite',
        price: 'Contact Us',
        description: 'Bespoke partnership for ultra-high-net-worth individuals and family offices.',
        features: [
            'Everything in Premium',
            'Exclusive pocket listings',
            'Full relocation concierge',
            'Investment portfolio management',
            'Architecture & renovation oversight',
            'Personal lifestyle management',
            'Global market access',
        ],
        recommended: false,
    },
];

const FAQ_ITEMS = [
    {
        question: 'What makes your concierge service different from traditional real estate agencies?',
        answer: 'Unlike traditional agencies focused solely on transactions, we provide a holistic lifestyle partnership. Our advisors are not salespeople — they are market specialists, investment strategists, and lifestyle architects who operate with absolute discretion. We maintain relationships with our clients long after the transaction, ensuring ongoing support for all property-related needs.',
    },
    {
        question: 'How do you access off-market properties?',
        answer: 'Our off-market access stems from decades of relationship-building with elite property owners, family offices, and fellow luxury advisors worldwide. Many owners prefer discretion and trust us to connect them with qualified buyers without public exposure. We also maintain exclusive partnerships with invitation-only property networks across major global markets.',
    },
    {
        question: 'What is the typical timeline for finding the right property?',
        answer: 'Timeline varies significantly based on your specific criteria and market conditions. For clients with flexible requirements, we often present exceptional opportunities within weeks. For those seeking rare or highly specific properties, the search may extend over several months. Our patient, thorough approach ensures you never compromise on what matters most.',
    },
    {
        question: 'Do you work with international clients and properties?',
        answer: 'Absolutely. We serve a global clientele and maintain active networks in major luxury markets including the United States, Europe, the Caribbean, and beyond. Our team includes advisors with international experience and multilingual capabilities, supported by local partners who provide on-the-ground expertise.',
    },
    {
        question: 'How are your fees structured?',
        answer: 'Our fee structure depends on the scope of services required. For standard buying and selling, we work on commission basis aligned with industry standards. For comprehensive concierge services, advisory retainers, and portfolio management, we offer transparent fixed-fee and success-based arrangements. We always discuss fees openly during our initial consultation.',
    },
];

/* ══════════════════════════════════════════════
   ICON HELPER
   ══════════════════════════════════════════════ */
const ServiceIcon: React.FC<{ icon: string; className?: string }> = ({ icon, className = 'w-8 h-8' }) => {
    switch (icon) {
        case 'lock':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
            );
        case 'scale':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 3v18" />
                    <path d="m4 7 8-4 8 4" />
                    <path d="M4 7c0 3 2 5 4 5s4-2 4-5" />
                    <path d="M12 7c0 3 2 5 4 5s4-2 4-5" />
                </svg>
            );
        case 'palette':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="8" cy="10" r="1.5" fill="currentColor" />
                    <circle cx="12" cy="7" r="1.5" fill="currentColor" />
                    <circle cx="16" cy="10" r="1.5" fill="currentColor" />
                    <path d="M15 14c0 2.2-1.3 4-3 4s-3-1.8-3-4" />
                </svg>
            );
        case 'compass':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="none" />
                </svg>
            );
        case 'plane':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.7.5-1.1z" />
                </svg>
            );
        case 'chart':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 3v18h18" />
                    <path d="m7 17 4-8 4 4 5-9" />
                </svg>
            );
        default:
            return null;
    }
};

/* ══════════════════════════════════════════════
   FAQ ACCORDION ITEM
   ══════════════════════════════════════════════ */
const FAQItem: React.FC<{
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}> = ({ question, answer, isOpen, onToggle }) => {
    return (
        <div className="border-b border-black/5 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <span className="text-lg font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors pr-4">
                    {question}
                </span>
                <div
                    className={`w-10 h-10 rounded-full bg-[#F7F7F9] flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#0071E3] rotate-180' : 'group-hover:bg-[#E5E5EA]'
                        }`}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={isOpen ? 'white' : '#1D1D1F'}
                        strokeWidth="2"
                        strokeLinecap="round"
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] pb-6' : 'max-h-0'
                    }`}
            >
                <p className="text-[#6B7280] leading-relaxed">{answer}</p>
            </div>
        </div>
    );
};

/* ══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════ */
const ServicesPage: React.FC = () => {
    const [openFAQ, setOpenFAQ] = useState<number | null>(0);
    const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

    const toggleFAQ = (index: number) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    // Intersection Observer for staggered process step animations
    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        stepRefs.current.forEach((ref, index) => {
            if (!ref) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisibleSteps((prev) => new Set([...prev, index]));
                        observer.disconnect();
                    }
                },
                { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
            );

            observer.observe(ref);
            observers.push(observer);
        });

        return () => observers.forEach((obs) => obs.disconnect());
    }, []);

    return (
        <div className="min-h-screen bg-[#F7F7F9]">
            {/* ═══ 1. HERO SECTION ═══ */}
            <section className="relative z-30 bg-[#1D1D1F] text-white pt-32 pb-24 shadow-2xl overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-white/50 mb-8">
                        <a href="#/" className="hover:text-white transition-colors cursor-pointer">
                            Home
                        </a>
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                        <span className="text-white/80 font-medium">Services</span>
                    </div>

                    <div className="max-w-3xl">
                        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#0071E3] mb-6">
                            Concierge Excellence
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-bold sf-display mb-8 leading-[1.1]">
                            Our Premium <br />
                            <span className="text-[#0071E3]">Services</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-2xl">
                            Experience white-glove service and bespoke solutions tailored to your unique
                            lifestyle. From property discovery to seamless transitions, we orchestrate every
                            detail with precision and discretion.
                        </p>
                    </div>
                </div>

                {/* Decorative arcs */}
                <div className="absolute top-0 right-0 w-[40%] h-full opacity-[0.06] pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
                        <circle
                            cx="300"
                            cy="200"
                            r="280"
                            stroke="white"
                            strokeWidth="1"
                            strokeDasharray="8 16"
                        />
                        <circle
                            cx="300"
                            cy="200"
                            r="200"
                            stroke="white"
                            strokeWidth="1"
                            strokeDasharray="6 12"
                        />
                        <circle
                            cx="300"
                            cy="200"
                            r="120"
                            stroke="white"
                            strokeWidth="1"
                            strokeDasharray="4 8"
                        />
                    </svg>
                </div>
            </section>

            {/* ═══ 2. CORE SERVICES GRID ═══ */}
            <section className="py-24 relative">
                <GeometricPattern />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#0071E3] mb-4">
                            What We Offer
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] sf-display">
                            Comprehensive <span className="text-[#C5A065]">Solutions</span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {CORE_SERVICES.map((service) => (
                            <div
                                key={service.title}
                                className="group bg-white rounded-[2.5rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-black/[0.03] cursor-default"
                            >
                                {/* Icon */}
                                <div className="w-16 h-16 rounded-2xl bg-[#0071E3]/5 group-hover:bg-[#0071E3] flex items-center justify-center mb-6 text-[#0071E3] group-hover:text-white transition-all duration-500">
                                    <ServiceIcon icon={service.icon} />
                                </div>

                                {/* Title */}
                                <h4 className="text-xl font-bold text-[#1D1D1F] sf-display mb-4">
                                    {service.title}
                                </h4>

                                {/* Description */}
                                <p className="text-[#6B7280] leading-relaxed mb-6">{service.description}</p>

                                {/* Learn More Button */}
                                <button className="flex items-center gap-2 text-sm font-bold text-[#0071E3] group-hover:text-[#005BB5] transition-colors">
                                    <span>Learn More</span>
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="transition-transform group-hover:translate-x-1"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ 3. PROCESS TIMELINE ═══ */}
            <section className="py-24 bg-white relative z-10 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1),0_20px_40px_-15px_rgba(0,0,0,0.1)]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#0071E3] mb-4">
                            How It Works
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] sf-display">
                            Our <span className="text-[#C5A065]">Process</span>
                        </h3>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {PROCESS_STEPS.map((step, index) => {
                            const isVisible = visibleSteps.has(index);

                            return (
                                <div
                                    key={step.number}
                                    ref={(el) => (stepRefs.current[index] = el)}
                                    className="flex gap-6 md:gap-10"
                                >
                                    {/* Timeline Column */}
                                    <div className="flex flex-col items-center">
                                        {/* Number Circle */}
                                        <div
                                            className={`w-14 h-14 rounded-full bg-[#0071E3] flex items-center justify-center text-white font-bold text-xl sf-display flex-shrink-0 transition-all duration-700 ease-out ${
                                                isVisible
                                                    ? 'opacity-100 translate-x-0 scale-100'
                                                    : 'opacity-0 -translate-x-[50px] scale-90'
                                            }`}
                                            style={{ transitionDelay: isVisible ? '0ms' : '0ms' }}
                                        >
                                            {step.number}
                                        </div>
                                        {/* Connecting Line - animates drawing downward */}
                                        {index < PROCESS_STEPS.length - 1 && (
                                            <div className="w-0.5 flex-1 my-3 bg-[#0071E3]/10 relative overflow-hidden">
                                                <div
                                                    className={`absolute top-0 left-0 w-full bg-gradient-to-b from-[#0071E3] to-[#0071E3]/40 transition-all duration-700 ease-out`}
                                                    style={{
                                                        height: isVisible ? '100%' : '0%',
                                                        transitionDelay: isVisible ? '300ms' : '0ms',
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div
                                        className={`flex-1 transition-all duration-700 ease-out ${
                                            index < PROCESS_STEPS.length - 1 ? 'pb-12' : ''
                                        } ${
                                            isVisible
                                                ? 'opacity-100 translate-x-0'
                                                : 'opacity-0 -translate-x-[50px]'
                                        }`}
                                        style={{ transitionDelay: isVisible ? '150ms' : '0ms' }}
                                    >
                                        <h4 className="text-xl md:text-2xl font-bold text-[#1D1D1F] sf-display mb-2 mt-3">
                                            {step.title}
                                        </h4>
                                        <p className="text-[#6B7280] leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══ 4. SERVICE TIERS SECTION ═══ */}
            <section className="py-24 bg-[#1D1D1F] relative z-30 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.3),0_20px_40px_-15px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#0071E3] mb-4">
                            Choose Your Level
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-white sf-display">
                            Service <span className="text-[#C5A065]">Tiers</span>
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {SERVICE_TIERS.map((tier) => (
                            <div
                                key={tier.name}
                                className={`relative rounded-[2.5rem] p-8 transition-all duration-500 hover:-translate-y-2 ${tier.recommended
                                    ? 'bg-white shadow-2xl scale-[1.02]'
                                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                                    }`}
                            >
                                {/* Recommended Badge */}
                                {tier.recommended && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#0071E3] text-white text-xs font-bold uppercase tracking-wider rounded-full">
                                        Recommended
                                    </div>
                                )}

                                {/* Tier Name */}
                                <h4
                                    className={`text-2xl font-bold sf-display mb-2 ${tier.recommended ? 'text-[#1D1D1F]' : 'text-white'
                                        }`}
                                >
                                    {tier.name}
                                </h4>

                                {/* Price */}
                                <div
                                    className={`text-3xl font-bold mb-4 ${tier.recommended ? 'text-[#0071E3]' : 'text-[#C5A065]'
                                        }`}
                                >
                                    {tier.price}
                                </div>

                                {/* Description */}
                                <p
                                    className={`text-sm leading-relaxed mb-8 ${tier.recommended ? 'text-[#6B7280]' : 'text-white/60'
                                        }`}
                                >
                                    {tier.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className={`flex-shrink-0 mt-0.5 ${tier.recommended ? 'text-[#0071E3]' : 'text-[#C5A065]'
                                                    }`}
                                            >
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                />
                                                <path
                                                    d="m8 12 3 3 5-6"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <span
                                                className={`text-sm ${tier.recommended ? 'text-[#1D1D1F]' : 'text-white/80'
                                                    }`}
                                            >
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <button
                                    className={`w-full py-4 font-bold rounded-2xl transition-all transform hover:scale-[1.02] active:scale-95 ${tier.recommended
                                        ? 'bg-[#0071E3] text-white hover:bg-[#005BB5] shadow-lg shadow-[#0071E3]/20'
                                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                                        }`}
                                >
                                    {tier.price === 'Contact Us' ? 'Contact Us' : 'Get Started'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Decorative arcs */}
                <div className="absolute top-0 left-0 w-[40%] h-full opacity-[0.06] pointer-events-none -scale-x-100">
                    <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
                        <circle
                            cx="300"
                            cy="200"
                            r="280"
                            stroke="white"
                            strokeWidth="1"
                            strokeDasharray="8 16"
                        />
                        <circle
                            cx="300"
                            cy="200"
                            r="200"
                            stroke="white"
                            strokeWidth="1"
                            strokeDasharray="6 12"
                        />
                        <circle
                            cx="300"
                            cy="200"
                            r="120"
                            stroke="white"
                            strokeWidth="1"
                            strokeDasharray="4 8"
                        />
                    </svg>
                </div>
            </section>




            {/* ═══ 6. FAQ ACCORDION ═══ */}
            <section className="py-24 bg-white relative z-10 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1),0_20px_40px_-15px_rgba(0,0,0,0.1)]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#0071E3] mb-4">
                            Questions Answered
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] sf-display">
                            Frequently Asked <span className="text-[#C5A065]">Questions</span>
                        </h3>
                    </div>

                    <div className="max-w-3xl mx-auto bg-[#F7F7F9] rounded-[2.5rem] p-8 md:p-12 border-2 border-[#0071E3]/30">
                        {FAQ_ITEMS.map((item, index) => (
                            <FAQItem
                                key={index}
                                question={item.question}
                                answer={item.answer}
                                isOpen={openFAQ === index}
                                onToggle={() => toggleFAQ(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ 7. BOTTOM CTA ═══ */}
            <section className="py-20 container mx-auto px-6">
                <div className="relative rounded-[3rem] bg-gradient-to-br from-[#0071E3] to-[#0055b3] p-12 md:p-16 overflow-hidden text-center text-white shadow-2xl">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold sf-display mb-6 leading-tight">
                            Ready to Experience Premium Service?
                        </h2>
                        <p className="text-lg text-white/80 mb-8">
                            Let our team craft a personalized approach tailored to your unique requirements
                            and aspirations.
                        </p>
                        <button className="px-10 py-5 bg-white text-[#0071E3] font-bold rounded-2xl shadow-xl hover:bg-[#F7F7F9] transition-all transform hover:scale-105 active:scale-95">
                            Schedule Your Consultation
                        </button>
                    </div>

                    {/* Decorative SVG */}
                    <div className="absolute top-0 right-0 w-[40%] h-full opacity-10 pointer-events-none">
                        <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none">
                            <circle
                                cx="200"
                                cy="200"
                                r="180"
                                stroke="white"
                                strokeWidth="2"
                                strokeDasharray="10 20"
                            />
                            <circle
                                cx="200"
                                cy="200"
                                r="120"
                                stroke="white"
                                strokeWidth="1"
                                strokeDasharray="5 10"
                            />
                        </svg>
                    </div>
                </div>
            </section>
            <ChatWidget />
        </div>
    );
};

export default ServicesPage;
