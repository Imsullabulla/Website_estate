
import React, { useState, useRef, useEffect } from 'react';

/* ══════════════════════════════════════════════
   FAQ DATA
   ══════════════════════════════════════════════ */

const FAQ_CATEGORIES = [
    {
        category: 'Buying & Selling',
        questions: [
            {
                q: 'How do I schedule a private property viewing?',
                a: 'You can request a private viewing directly from any property listing page by clicking "Schedule a Tour," or contact your dedicated advisor. We typically arrange exclusive viewings within 24–48 hours of your request.',
            },
            {
                q: 'What are your commission rates?',
                a: 'Our commission structure is competitive and transparent, typically ranging from 2–4% depending on the service tier. For Premium and Elite clients, we offer customized fee arrangements. Full details are discussed during your initial consultation.',
            },
            {
                q: 'Do you handle international property transactions?',
                a: 'Absolutely. We specialize in cross-border luxury transactions across the US, Europe, and the Caribbean. Our legal and tax advisory network ensures seamless compliance and optimal structuring for international buyers and sellers.',
            },
        ],
    },
    {
        category: 'Services & Pricing',
        questions: [
            {
                q: 'What services are included in the Premium tier?',
                a: 'Our Premium tier ($7,500+) includes a dedicated advisor, off-market access, legal & tax advisory coordination, professional staging consultation, relocation assistance, and priority 24/7 response. Visit our Services page for full details.',
            },
            {
                q: 'Can I upgrade my service tier later?',
                a: 'Yes! You can upgrade at any time. The price difference is prorated based on your current engagement. Many clients start with Essential and upgrade to Premium once they experience the value of our concierge approach.',
            },
            {
                q: 'Do you offer property management services?',
                a: 'While we don\'t provide day-to-day property management, our Elite tier includes ongoing portfolio management and we partner with top-tier property management firms. We\'re happy to connect you with trusted providers.',
            },
        ],
    },
    {
        category: 'Market & Investment',
        questions: [
            {
                q: 'How is the current luxury real estate market?',
                a: 'The luxury market is showing strong fundamentals with +12.4% average price growth YoY. Coastal markets are particularly active at +15.3% growth. Visit our Market Insights page for detailed regional analysis and quarterly reports.',
            },
            {
                q: 'What areas have the best investment potential?',
                a: 'Currently, emerging markets like Miami\'s Design District and Austin\'s Westlake show 18–24% projected appreciation. Secondary markets in Nashville and Denver are also gaining momentum. Our advisors can provide personalized investment strategies.',
            },
        ],
    },
];

/* ══════════════════════════════════════════════
   TYPES
   ══════════════════════════════════════════════ */

interface ChatMessage {
    id: number;
    type: 'bot' | 'user' | 'system';
    text: string;
    isCategory?: boolean;
    options?: string[];
}

/* ══════════════════════════════════════════════
   CHAT WIDGET COMPONENT
   ══════════════════════════════════════════════ */

const ChatWidget: React.FC<{ hidden?: boolean }> = ({ hidden = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [questionCount, setQuestionCount] = useState(0);
    const [showHumanOption, setShowHumanOption] = useState(false);
    const [showCategories, setShowCategories] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [humanMode, setHumanMode] = useState(false);
    const [humanInput, setHumanInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const msgIdRef = useRef(0);

    const nextId = () => ++msgIdRef.current;

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
    };

    // Initialize chat on first open
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    id: nextId(),
                    type: 'bot',
                    text: 'Hello! 👋 Welcome to LuxeMap. How can I help you today? Choose a topic below:',
                },
            ]);
            setShowCategories(true);
        }
    }, [isOpen]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleCategorySelect = (category: string) => {
        setActiveCategory(category);
        setShowCategories(false);

        setMessages((prev) => [
            ...prev,
            { id: nextId(), type: 'user', text: category },
        ]);

        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            const cat = FAQ_CATEGORIES.find((c) => c.category === category);
            if (cat) {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: nextId(),
                        type: 'bot',
                        text: `Great! Here are common questions about **${category}**:`,
                        options: cat.questions.map((q) => q.q),
                    },
                ]);
            }
        }, 600);
    };

    const handleQuestionSelect = (question: string) => {
        setMessages((prev) => [
            ...prev,
            { id: nextId(), type: 'user', text: question },
        ]);

        const newCount = questionCount + 1;
        setQuestionCount(newCount);

        // Find answer
        let answer = '';
        for (const cat of FAQ_CATEGORIES) {
            const found = cat.questions.find((q) => q.q === question);
            if (found) {
                answer = found.a;
                break;
            }
        }

        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            const helpfulMsg = newCount >= 2 && !showHumanOption;

            setMessages((prev) => [
                ...prev,
                { id: nextId(), type: 'bot', text: answer },
                {
                    id: nextId(),
                    type: 'bot',
                    text: helpfulMsg
                        ? 'Was this helpful? You can ask another question, or connect with a team member.'
                        : 'Is there anything else I can help you with?',
                },
            ]);

            if (newCount >= 2) {
                setShowHumanOption(true);
            }

            // Show categories again for follow-up
            setShowCategories(true);
            setActiveCategory(null);
        }, 800);
    };

    const handleTalkToHuman = () => {
        setMessages((prev) => [
            ...prev,
            { id: nextId(), type: 'user', text: 'I\'d like to talk to someone' },
        ]);

        setIsTyping(true);
        setShowCategories(false);
        setShowHumanOption(false);

        setTimeout(() => {
            setIsTyping(false);
            setHumanMode(true);
            setMessages((prev) => [
                ...prev,
                {
                    id: nextId(),
                    type: 'bot',
                    text: 'Of course! One of our luxury advisors will be with you shortly. You can type your message below, or reach us at **support@luxemap.com** or call **+1 (888) 555-LUXE**.',
                },
                {
                    id: nextId(),
                    type: 'system',
                    text: '🔔 A team member has been notified and will join this conversation.',
                },
            ]);
            // Focus the input after entering human mode
            setTimeout(() => inputRef.current?.focus(), 100);
        }, 1000);
    };

    const handleHumanSend = () => {
        const text = humanInput.trim();
        if (!text) return;

        setMessages((prev) => [
            ...prev,
            { id: nextId(), type: 'user', text },
        ]);
        setHumanInput('');

        // Simulate an auto-reply after a short delay
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                {
                    id: nextId(),
                    type: 'bot',
                    text: 'Thank you for your message! An advisor is reviewing it now and will respond shortly. Average response time is under 5 minutes.',
                },
            ]);
        }, 1500);
    };

    const handleReset = () => {
        setMessages([
            {
                id: nextId(),
                type: 'bot',
                text: 'Hello! 👋 Welcome back. How can I help you today?',
            },
        ]);
        setShowCategories(true);
        setActiveCategory(null);
        setQuestionCount(0);
        setShowHumanOption(false);
        setHumanMode(false);
        setHumanInput('');
    };

    // Simple bold markdown parser
    const renderText = (text: string) => {
        const parts = text.split(/\*\*(.*?)\*\*/g);
        return parts.map((part, i) =>
            i % 2 === 1 ? (
                <strong key={i} className="font-bold">
                    {part}
                </strong>
            ) : (
                <span key={i}>{part}</span>
            )
        );
    };

    return (
        <>
            {/* ═══ FLOATING CHAT BUBBLE ═══ */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-[60] w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group ${isOpen
                    ? 'bg-[#1D1D1F] rotate-0 scale-100'
                    : 'bg-[#0071E3] hover:bg-[#005BB5] hover:scale-110 animate-[chatPulse_3s_ease-in-out_infinite]'
                    } ${hidden ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'}`}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                {isOpen ? (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="transition-transform duration-300"
                    >
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                ) : (
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:scale-110"
                    >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                )}

                {/* Notification dot */}
                {!isOpen && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-[#C5A065] rounded-full border-2 border-white animate-ping opacity-75" />
                )}
                {!isOpen && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-[#C5A065] rounded-full border-2 border-white" />
                )}
            </button>

            {/* ═══ CHAT PANEL ═══ */}
            <div
                className={`fixed bottom-[6rem] right-6 z-[60] w-[380px] max-w-[calc(100vw-2rem)] transition-all duration-500 ease-out ${isOpen && !hidden
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                    }`}
            >
                <div className="bg-white rounded-[2rem] shadow-2xl border border-black/[0.05] overflow-hidden flex flex-col" style={{ height: '520px' }}>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#0071E3] to-[#0055b3] px-6 py-5 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-white font-bold text-sm">LuxeMap Concierge</div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                                    <span className="text-white/70 text-xs">Online now</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleReset}
                            className="text-white/60 hover:text-white transition-colors p-1"
                            title="Start new conversation"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 4v6h6" />
                                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#F7F7F9]/50">
                        {messages.map((msg) => (
                            <div key={msg.id}>
                                {msg.type === 'system' ? (
                                    <div className="text-center py-2">
                                        <span className="text-xs text-[#6B7280] bg-[#F7F7F9] px-4 py-2 rounded-full">
                                            {renderText(msg.text)}
                                        </span>
                                    </div>
                                ) : (
                                    <div className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div
                                            className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed animate-[fadeSlideIn_0.3s_ease-out] ${msg.type === 'user'
                                                ? 'bg-[#0071E3] text-white rounded-[1.2rem] rounded-br-md'
                                                : 'bg-white text-[#1D1D1F] rounded-[1.2rem] rounded-bl-md shadow-sm border border-black/[0.04]'
                                                }`}
                                        >
                                            {renderText(msg.text)}

                                            {/* Question options inside a bot message */}
                                            {msg.options && (
                                                <div className="mt-3 space-y-2">
                                                    {msg.options.map((opt) => (
                                                        <button
                                                            key={opt}
                                                            onClick={() => handleQuestionSelect(opt)}
                                                            className="w-full text-left px-3 py-2.5 text-xs font-medium bg-[#0071E3]/5 hover:bg-[#0071E3]/10 text-[#0071E3] rounded-xl transition-all duration-200 hover:translate-x-1 border border-[#0071E3]/10"
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white px-4 py-3 rounded-[1.2rem] rounded-bl-md shadow-sm border border-black/[0.04] flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-[#6B7280] rounded-full animate-[bounce_1.4s_ease-in-out_infinite]" />
                                    <span className="w-2 h-2 bg-[#6B7280] rounded-full animate-[bounce_1.4s_ease-in-out_0.2s_infinite]" />
                                    <span className="w-2 h-2 bg-[#6B7280] rounded-full animate-[bounce_1.4s_ease-in-out_0.4s_infinite]" />
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Bottom Actions */}
                    <div className="px-4 py-3 bg-white border-t border-black/[0.05] flex-shrink-0">
                        {/* Category Chips */}
                        {showCategories && (
                            <div className="flex flex-wrap gap-2 mb-2">
                                {FAQ_CATEGORIES.map((cat) => (
                                    <button
                                        key={cat.category}
                                        onClick={() => handleCategorySelect(cat.category)}
                                        className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${activeCategory === cat.category
                                            ? 'bg-[#0071E3] text-white'
                                            : 'bg-[#F7F7F9] text-[#1D1D1F] hover:bg-[#0071E3]/10 hover:text-[#0071E3]'
                                            }`}
                                    >
                                        {cat.category}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Talk to Human Button */}
                        {showHumanOption && !humanMode && (
                            <button
                                onClick={handleTalkToHuman}
                                className="w-full py-3 bg-gradient-to-r from-[#1D1D1F] to-[#2D2D2F] text-white text-sm font-bold rounded-xl hover:from-[#0071E3] hover:to-[#005BB5] transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                Talk to a Human
                            </button>
                        )}

                        {/* Human Mode Text Input */}
                        {humanMode && (
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleHumanSend(); }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={humanInput}
                                    onChange={(e) => setHumanInput(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-2.5 text-sm bg-[#F7F7F9] rounded-xl border border-black/[0.06] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3]/40 placeholder-[#9CA3AF] transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!humanInput.trim()}
                                    className="w-10 h-10 rounded-xl bg-[#0071E3] flex items-center justify-center text-white hover:bg-[#005BB5] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* ═══ KEYFRAME ANIMATIONS ═══ */}
            <style>{`
                @keyframes chatPulse {
                    0%, 100% { box-shadow: 0 4px 20px rgba(0, 113, 227, 0.3); }
                    50% { box-shadow: 0 4px 30px rgba(0, 113, 227, 0.5), 0 0 0 8px rgba(0, 113, 227, 0.1); }
                }
                @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
};

export default ChatWidget;
