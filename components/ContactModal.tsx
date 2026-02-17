
import React, { useState } from 'react';
import { Property } from '../types';

interface ContactModalProps {
  property: Property | null;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ property, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!property) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    alert('Message sent successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-xl glass rounded-[3rem] p-8 md:p-12 shadow-2xl animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-8 right-8 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-[#0071E3] hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>

        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-xl">
            <img src={property.agent.image} alt={property.agent.name} className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold text-[#1D1D1F] mb-1">Talk to {property.agent.name}</h2>
          <p className="text-[#6B7280] font-medium">Expert for {property.title}</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-[#1D1D1F] mb-2">First Name</label>
              <input id="firstName" type="text" placeholder="John" className="w-full p-4 bg-white/50 rounded-2xl outline-none focus:ring-2 focus:ring-[#0071E3]/40 border border-transparent focus:border-[#0071E3]/20" required />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-[#1D1D1F] mb-2">Last Name</label>
              <input id="lastName" type="text" placeholder="Doe" className="w-full p-4 bg-white/50 rounded-2xl outline-none focus:ring-2 focus:ring-[#0071E3]/40 border border-transparent focus:border-[#0071E3]/20" required />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1D1D1F] mb-2">Email Address</label>
            <input id="email" type="email" placeholder="john@example.com" className="w-full p-4 bg-white/50 rounded-2xl outline-none focus:ring-2 focus:ring-[#0071E3]/40 border border-transparent focus:border-[#0071E3]/20" required />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#1D1D1F] mb-2">Message</label>
            <textarea id="message" placeholder="How can we help?" rows={3} className="w-full p-4 bg-white/50 rounded-2xl outline-none focus:ring-2 focus:ring-[#0071E3]/40 border border-transparent focus:border-[#0071E3]/20 resize-none"></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-5 bg-[#0071E3] text-white font-bold rounded-2xl shadow-lg transition-all transform flex items-center justify-center gap-2 ${isSubmitting
              ? 'opacity-70 cursor-not-allowed'
              : 'hover:bg-[#0066CC] hover:scale-[1.02] active:scale-95'
              }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              'Send Inquiry'
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-black/5 flex justify-center gap-8">
          <div className="text-center">
            <div className="text-sm font-bold text-[#1D1D1F]">Response Time</div>
            <div className="text-[#0071E3] font-medium">&lt; 15 mins</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
