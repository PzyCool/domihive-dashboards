// src/dashboards/rent/components/property-details/components/PropertyHeader/PropertyHeader.jsx
import React from 'react';

const PropertyHeader = ({ property }) => {
  return (
    <div className="property-header mb-8">
      {/* Property Title, Price and ID */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0e1f42] mb-2">
              Luxury 3-Bedroom Apartment in Ikoyi
            </h1>
            <div className="text-[#64748b] mb-2">
              Ikoyi, Lagos Island
            </div>
          </div>
          <div className="mt-2 md:mt-0">
            <div className="text-xl md:text-2xl font-bold text-[#0e1f42] mb-1">
              ₦4,500,000/year
            </div>
            <div className="text-sm text-[#64748b]">
              <span className="font-medium">Property ID:</span> rent_123
            </div>
          </div>
        </div>

        {/* Property Features Compact */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 py-3">
          <div className="flex items-center gap-2">
            <i className="fas fa-bed text-[#9f7539] text-lg"></i>
            <span className="font-semibold text-[#0e1f42]">3</span>
            <span className="text-[#64748b] text-sm">Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-bath text-[#9f7539] text-lg"></i>
            <span className="font-semibold text-[#0e1f42]">3</span>
            <span className="text-[#64748b] text-sm">Baths</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-ruler-combined text-[#9f7539] text-lg"></i>
            <span className="font-semibold text-[#0e1f42]">180</span>
            <span className="text-[#64748b] text-sm">sqm</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-layer-group text-[#9f7539] text-lg"></i>
            <span className="font-semibold text-[#0e1f42]">Apartment</span>
          </div>
        </div>
      </div>

      {/* Property Overview */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#0e1f42] mb-3">Overview</h2>
        <p className="text-[#64748b] text-sm leading-relaxed">
          This stunning 3-bedroom apartment offers luxurious living in the heart of Ikoyi. Featuring modern finishes, spacious rooms, and premium amenities, this property is perfect for families seeking comfort and style.
        </p>
      </div>

      {/* Detailed Specifications - Compact Accordion Style */}
      <div className="bg-[#f8fafc] p-5 rounded-xl border border-[#e2e8f0]">
        <h2 className="text-xl font-bold text-[#0e1f42] mb-4">Specifications</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Building Details */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#9f7539]/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#9f7539]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#0e1f42]">Building</h3>
            </div>
            <div className="space-y-2 pl-10">
              {['New construction (2023)', '6-floor building with elevator', 'Modern architectural design', 'Energy efficient windows', 'Fire safety system'].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <i className="fas fa-check text-[#9f7539] text-xs"></i>
                  <span className="text-[#64748b]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interior Features */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#9f7539]/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#9f7539]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#0e1f42]">Interior</h3>
            </div>
            <div className="space-y-2 pl-10">
              {['Marble flooring in living areas', 'Fitted wardrobes in all bedrooms', 'Modern ceiling lights', 'Central air conditioning', 'Smart home ready'].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <i className="fas fa-check text-[#9f7539] text-xs"></i>
                  <span className="text-[#64748b]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exterior & Outdoor */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#9f7539]/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#9f7539]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#0e1f42]">Exterior</h3>
            </div>
            <div className="space-y-2 pl-10">
              {['Swimming pool', 'Children\'s playground', 'Landscaped gardens', 'Secure parking space', '24/7 security guard'].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <i className="fas fa-check text-[#9f7539] text-xs"></i>
                  <span className="text-[#64748b]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Utilities & Services */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#9f7539]/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#9f7539]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#0e1f42]">Utilities</h3>
            </div>
            <div className="space-y-2 pl-10">
              {['Constant water supply', 'Backup generator', 'High-speed fiber internet', 'CCTV surveillance', 'Waste management'].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <i className="fas fa-check text-[#9f7539] text-xs"></i>
                  <span className="text-[#64748b]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;