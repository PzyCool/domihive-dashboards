// src/dashboards/rent/components/property-details/components/PropertyTabs/PropertyTabs.jsx
import React, { useState } from 'react';
import MediaTab from '../tabs/MediaTab/MediaTab';
import ReviewsTab from '../tabs/ReviewsTab/ReviewsTab';
import LocationTab from '../tabs/LocationTab/LocationTab';

const PropertyTabs = ({ property }) => {
  const [activeTab, setActiveTab] = useState('media');

  const tabs = [
    { 
      id: 'media', 
      label: 'Media',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      id: 'reviews', 
      label: 'Reviews',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
        </svg>
      )
    },
    { 
      id: 'location', 
      label: 'Location',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <div className="property-tabs mt-8">
      {/* Sticky Tab Headers */}
      <div className="sticky top-20 z-30 bg-white border-b border-[#e2e8f0] rounded-t-2xl shadow-sm">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-4 text-center font-medium transition-all duration-300 ease-in-out ${
                activeTab === tab.id
                  ? 'text-[#0e1f42] border-b-2 border-[#9f7539] bg-gradient-to-b from-white to-[#f8fafc]'
                  : 'text-[#64748b] hover:text-[#0e1f42] hover:bg-[#f8fafc]'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span className={`transition-colors duration-300 ${
                  activeTab === tab.id ? 'text-[#9f7539]' : 'text-[#64748b]'
                }`}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content with Animation */}
      <div className="py-8 animate-fadeIn">
        {activeTab === 'media' && <MediaTab property={property} />}
        {activeTab === 'reviews' && <ReviewsTab property={property} />}
        {activeTab === 'location' && <LocationTab property={property} />}
      </div>
    </div>
  );
};

export default PropertyTabs;