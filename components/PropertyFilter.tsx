
import React from 'react';
import { FilterState } from '../types';

interface PropertyFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  resultsCount: number;
}

const PropertyFilter: React.FC<PropertyFilterProps> = ({ filters, onChange, resultsCount }) => {
  return (
    <div className="relative -mt-8 z-30 px-6">
      <div className="max-w-6xl mx-auto glass rounded-[2.5rem] p-4 md:p-6 shadow-2xl border-white/50">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          {/* Search */}
          <div className="md:col-span-2 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1D1D1F]/40" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input 
              type="text" 
              placeholder="City, neighborhood, or address..."
              className="w-full pl-12 pr-4 py-4 bg-white/50 rounded-2xl border-transparent focus:bg-white focus:ring-2 focus:ring-[#0071E3]/20 transition-all text-[#1D1D1F] outline-none placeholder-[#1D1D1F]/30 font-medium"
              value={filters.search}
              onChange={(e) => onChange({...filters, search: e.target.value})}
            />
          </div>

          {/* Property Type */}
          <div className="relative">
             <select 
              className="w-full px-4 py-4 bg-white/50 rounded-2xl border-transparent focus:bg-white focus:ring-2 focus:ring-[#0071E3]/20 transition-all text-[#1D1D1F] outline-none font-medium appearance-none"
              value={filters.type}
              onChange={(e) => onChange({...filters, type: e.target.value})}
            >
              <option value="">Any Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
              <option value="Penthouse">Penthouse</option>
            </select>
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#1D1D1F]/40" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
          </div>

          {/* Min Beds */}
          <div className="relative">
             <select 
              className="w-full px-4 py-4 bg-white/50 rounded-2xl border-transparent focus:bg-white focus:ring-2 focus:ring-[#0071E3]/20 transition-all text-[#1D1D1F] outline-none font-medium appearance-none"
              value={filters.beds}
              onChange={(e) => onChange({...filters, beds: e.target.value})}
            >
              <option value="">Beds (Any)</option>
              <option value="1">1+ Bed</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
              <option value="5">5+ Beds</option>
            </select>
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#1D1D1F]/40" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
          </div>

          {/* CTA / Results */}
          <div className="flex flex-col items-center">
             <button className="w-full py-4 bg-[#0071E3] text-white rounded-2xl font-bold shadow-lg hover:bg-[#0066CC] transition-all transform hover:scale-[1.02] active:scale-95">
              Search {resultsCount} Properties
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;
