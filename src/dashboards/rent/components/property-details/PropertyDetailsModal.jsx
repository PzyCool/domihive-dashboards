// src/dashboards/rent/components/property-details/PropertyDetailsModal.jsx
import React, { useEffect } from 'react';

// Import components
import PropertyHeader from './components/PropertyHeader/PropertyHeader';
import PropertyGallery from './components/PropertyGallery/PropertyGallery';
import PropertyTabs from './components/PropertyTabs/PropertyTabs';

// import ActionSection from './components/ActionSection/ActionSection';
// import FloatingCallButton from './components/FloatingCallButton';

// Import hooks
import { usePropertyDetails } from './hooks/usePropertyDetails';

const PropertyDetailsModal = ({ propertyId, isOpen, onClose }) => {
  const { property, loading, error } = usePropertyDetails(propertyId);
  
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    // CHANGED: Added background gradient like RentBrowse
    <div className="property-details-page min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Content */}
      <div className="property-details-content p-4 md:p-6">
        {/* CHANGED: Wrapped content in white container with shadow/border */}
        <div className="bg-white rounded-lg shadow-md border border-[#e2e8f0] p-4 md:p-6">
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#9f7539]"></div>
                <p className="mt-4 text-gray-600">Loading property details...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                <p className="text-gray-600">Failed to load property details</p>
                <button
                  onClick={onClose}
                  className="mt-4 px-4 py-2 bg-[#9f7539] text-white rounded-lg hover:bg-[#b58a4a]"
                >
                  Go Back
                </button>
              </div>
            </div>
          ) : property ? (
            <div className="container mx-auto px-4 lg:px-6 py-6">
              {/* Back to Browse Navigation - From your HTML */}
              <div className="mb-6">
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
                >
                  <i className="fas fa-arrow-left"></i>
                  <span className="font-medium">Back to Browse</span>
                </button>
              </div>
              
              {/* Property Gallery */}
              <PropertyGallery images={property.images} />
              
              {/* Property Header */}
              <PropertyHeader property={property} />
              
              {/* Property Tabs */}
              <PropertyTabs property={property} />
              
              {/* Action Section */}
              {/* <ActionSection propertyId={propertyId} /> */}
            </div>
          ) : null}
        </div>
      </div>
      
      {/* Floating Call Button */}
      {/* <FloatingCallButton phoneNumber="+2349010851071" /> */}
    </div>
  );
};

export default PropertyDetailsModal;