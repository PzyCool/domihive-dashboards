// src/dashboards/rent/components/property-details/components/tabs/LocationTab/LocationTab.jsx
import React, { useState } from 'react';
import MapSection from './MapSection';
import NearbyAmenities from './NearbyAmenities';
import ActionSection from '../../ActionSection/ActionSection'; // Add import

const LocationTab = ({ property }) => {
  const [activeAmenity, setActiveAmenity] = useState('all');

  const amenities = [
    { id: 'all', label: 'All Amenities', icon: '📍', count: 15 },
    { id: 'transport', label: 'Transport', icon: '🚌', count: 4 },
    { id: 'education', label: 'Education', icon: '🎓', count: 3 },
    { id: 'health', label: 'Healthcare', icon: '🏥', count: 2 },
    { id: 'shopping', label: 'Shopping', icon: '🛍️', count: 4 },
    { id: 'dining', label: 'Dining', icon: '🍽️', count: 5 },
    { id: 'entertainment', label: 'Entertainment', icon: '🎬', count: 3 }
  ];

  const handleBookInspection = (propertyId) => {
    console.log('Book inspection for property:', propertyId);
    // Navigation logic will go here
  };

  return (
    <div className="location-tab">
      {/* Location Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[#0e1f42] mb-4">Location & Neighborhood</h3>
        <p className="text-[#64748b]">
          Prime location in Ikoyi, Lagos Island. This area is known for its security, 
          excellent infrastructure, and proximity to major business districts and lifestyle amenities.
        </p>
      </div>

      {/* Map Section */}
      <div className="mb-8">
        <MapSection property={property} />
      </div>

      {/* Nearby Amenities Grid */}
      <div className="mb-8">
        <NearbyAmenities activeCategory={activeAmenity} />
      </div>

      {/* ActionSection - Add this */}
      <div className="mt-12 pt-8 border-t border-[#e2e8f0]">
        <ActionSection 
          propertyId={property?.id || 'default'} 
          onBookInspection={handleBookInspection}
        />
      </div>

    </div>
  );
};

export default LocationTab;