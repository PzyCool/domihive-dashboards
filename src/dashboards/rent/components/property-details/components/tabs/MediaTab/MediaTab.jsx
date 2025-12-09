// src/dashboards/rent/components/property-details/components/tabs/MediaTab/MediaTab.jsx
import React from 'react';
import RoomGallery from './RoomGallery';
import VideoSection from './VideoSection';
import ActionSection from '../../ActionSection/ActionSection'; // Add this import

const MediaTab = ({ property }) => {
  const handleBookInspection = (propertyId) => {
    console.log('Book inspection for property:', propertyId);
    // This will navigate to booking page - we'll implement this later
  };

  return (
    <div className="media-tab space-y-8">
      <RoomGallery property={property} />
      <VideoSection property={property} />
      
      {/* Add ActionSection at the bottom */}
      <div className="mt-8">
        <ActionSection 
          propertyId={property?.id || 'default'} 
          onBookInspection={handleBookInspection}
        />
      </div>
    </div>
  );
};

export default MediaTab;