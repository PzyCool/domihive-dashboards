// src/dashboards/rent/components/property-details/PropertyDetailsModal.jsx
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

// Import components (we'll create these step by step)
// import PropertyHeader from './components/PropertyHeader/PropertyHeader';
// import PropertyGallery from './components/PropertyGallery/PropertyGallery';
// import PropertyTabs from './components/PropertyTabs/PropertyTabs';
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
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
  
  // Close modal when clicking on backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  // Create modal content
  const modalContent = (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998] transition-opacity duration-300"
        onClick={handleBackdropClick}
      />
      
      {/* Modal Container - Full screen */}
      <div className="fixed inset-0 z-[9999] overflow-y-auto">
        <div className="min-h-full bg-white">
          {/* Top Navigation Bar */}
          <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 lg:px-6 flex items-center justify-between shadow-sm">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900"
            >
              <i className="fas fa-arrow-left"></i>
              <span className="font-medium">Back to Browse</span>
            </button>
            
            <div className="text-sm text-gray-500">
              Property Details
            </div>
            
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-700 hover:text-gray-900"
              title="Close"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          
          {/* Main Content */}
          <div className="property-details-content">
            {loading ? (
              <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#9f7539]"></div>
                  <p className="mt-4 text-gray-600">Loading property details...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center min-h-screen">
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
                {/* Property Gallery */}
                {/* <PropertyGallery images={property.images} /> */}
                
                {/* Property Header */}
                {/* <PropertyHeader property={property} /> */}
                
                {/* Property Tabs */}
                {/* <PropertyTabs property={property} /> */}
                
                {/* Action Section */}
                {/* <ActionSection propertyId={propertyId} /> */}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      
      {/* Floating Call Button */}
      {/* <FloatingCallButton phoneNumber="+2349010851071" /> */}
    </>
  );
  
  // Use portal to render at root level
  return createPortal(modalContent, document.body);
};

export default PropertyDetailsModal;