
import React from 'react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  isActive: boolean;
  onSelect: () => void;
  onContact: (prop: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, isActive, onSelect, onContact }) => {
  return (
    <div
      onClick={onSelect}
      className={`relative group bg-white rounded-3xl overflow-hidden shadow-sm transition-all duration-500 cursor-pointer border-2 ${isActive ? 'border-[#0071E3] shadow-xl ring-4 ring-[#0071E3]/10' : 'border-transparent hover:shadow-md'}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-xs font-bold text-[#1D1D1F]">
          {property.type}
        </div>
        <div className="absolute top-4 right-4 glass w-8 h-8 rounded-full flex items-center justify-center text-[#1D1D1F] hover:text-[#0071E3] transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-[#1D1D1F] leading-tight truncate mr-2">{property.title}</h3>
          <span className="text-lg font-bold text-[#0071E3] whitespace-nowrap">
            ${(property.price / 1000).toLocaleString()}k
          </span>
        </div>
        <p className="text-sm text-[#6B7280] mb-4 flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
          {property.location}
        </p>

        <div className="flex items-center gap-4 py-3 border-t border-gray-100 text-xs font-medium text-[#6B7280]">
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" /></svg>
            {property.beds} Beds
          </span>
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-2.12 0L3.5 4.38a1.5 1.5 0 0 0 0 2.12L6 9" /><path d="M10 16 7 19" /><path d="M11 7h10" /><path d="M14 16 11 19" /><path d="M15 10v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V10Z" /></svg>
            {property.baths} Baths
          </span>
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 3.6V21H3.6" /><path d="M21 9h-9" /><path d="M15 15h-3" /><path d="M9 12v3" /><path d="M12 21v-9" /><path d="M21 15v6" /></svg>
            {property.sqft} sqft
          </span>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onContact(property); }}
          className="w-full mt-4 py-3 bg-[#F7F7F9] hover:bg-[#0071E3] hover:text-white text-[#0071E3] font-bold rounded-xl transition-all flex items-center justify-center gap-2 group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] focus-visible:ring-offset-2"
        >
          <img src={property.agent.image} alt={property.agent.name} className="w-6 h-6 rounded-full object-cover" />
          Talk to {property.agent.name}
          <svg className="transition-transform group-hover/btn:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
