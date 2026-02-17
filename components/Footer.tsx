
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1D1D1F] text-white py-24 rounded-t-[4rem]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-[#0071E3] rounded-xl flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <span className="text-2xl font-bold tracking-tight">LuxeMap</span>
            </div>
            <p className="text-white/70 text-lg max-w-sm mb-8 leading-relaxed">
              We provide the tools and high-touch service needed to acquire the most exclusive real estate on the market.
            </p>
            <div className="flex gap-6">
              {['Instagram', 'Twitter', 'LinkedIn', 'YouTube'].map(s => (
                <a key={s} href="#" className="text-sm font-bold hover:text-[#0071E3] transition-colors">{s}</a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-[#0071E3]">Company</h4>
            <ul className="space-y-4 text-white/60 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-[#0071E3]">Resources</h4>
            <ul className="space-y-4 text-white/60 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Market Reports</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Buyer's Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Seller's Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/70 text-sm">
            © Made by Sebastian Christensen 2026. Built with visual excellence.
          </div>
          <div className="flex items-center gap-8 text-white/70 text-sm">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
