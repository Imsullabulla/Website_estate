
import React from 'react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-white relative z-10 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.1),0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-[#0071E3] mb-4">Success Stories</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] sf-display">Trusted by visionaries.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={t.id}
              className={`relative p-10 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 overflow-hidden ${idx === 1 ? 'bg-[#0071E3] text-white shadow-2xl' : 'text-white shadow-xl'}`}
            >
              {/* Background image for non-blue cards */}
              {idx !== 1 && (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url(/lightning-city.png)' }}
                  />
                  <div className="absolute inset-0 bg-black/50" />
                </>
              )}

              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" fill={idx === 1 ? "white" : "#0071E3"} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  ))}
                </div>
                <p className="text-xl font-medium mb-8 leading-relaxed">"{t.content}"</p>
                <div>
                  <div className="font-bold">{t.author}</div>
                  <div className={`text-sm ${idx === 1 ? 'text-white/80' : 'text-white/70'}`}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0071E3]/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0071E3]/5 rounded-full blur-3xl -ml-48 -mb-48"></div>
    </section>
  );
};

export default Testimonials;
