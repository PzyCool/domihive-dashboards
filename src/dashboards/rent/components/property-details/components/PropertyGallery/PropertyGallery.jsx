// src/dashboards/rent/components/property-details/components/PropertyGallery/PropertyGallery.jsx
import React, { useState, useEffect } from 'react';

const PropertyGallery = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  // Default images if none provided
  const propertyImages = images && images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1858&q=80',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80'
  ];

  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? propertyImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === propertyImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleThumbnailClick = (index, e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex(index);
  };

  // Close fullscreen on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showFullscreen) {
        setShowFullscreen(false);
      }
    };
    
    if (showFullscreen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showFullscreen]);

  return (
    <div className="property-gallery mb-8">
      {/* Main Gallery Section */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 mb-4">
        {/* Main Image */}
        <div 
          className="relative h-64 md:h-80 lg:h-96 cursor-zoom-in"
          onClick={() => setShowFullscreen(true)}
        >
          <img
            src={propertyImages[currentImageIndex]}
            alt={`Property image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
            loading="lazy"
          />
          
          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {propertyImages.length}
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Fullscreen Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowFullscreen(true);
            }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            aria-label="Expand to fullscreen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {propertyImages.map((image, index) => (
          <button
            key={index}
            onClick={(e) => handleThumbnailClick(index, e)}
            className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              currentImageIndex === index 
                ? 'border-[#9f7539] ring-2 ring-[#9f7539]/20' 
                : 'border-transparent hover:border-gray-300'
            }`}
            aria-label={`View image ${index + 1}`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4"
          onClick={() => setShowFullscreen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowFullscreen(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors mb-4"
            aria-label="Close fullscreen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Fullscreen Image Container */}
          <div className="relative w-full max-w-6xl h-[70vh] flex items-center justify-center">
            <img
              src={propertyImages[currentImageIndex]}
              alt={`Property image ${currentImageIndex + 1} (fullscreen)`}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Fullscreen Navigation */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Image Counter in Fullscreen */}
          <div className="mt-4 bg-black/70 text-white px-4 py-2 rounded-full">
            {currentImageIndex + 1} / {propertyImages.length}
          </div>
          
          {/* Thumbnails in Fullscreen */}
          <div className="flex justify-center space-x-2 mt-4 px-4">
            {propertyImages.map((image, index) => (
              <button
                key={index}
                onClick={(e) => handleThumbnailClick(index, e)}
                className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                  currentImageIndex === index 
                    ? 'border-[#9f7539] ring-2 ring-[#9f7539]/20' 
                    : 'border-transparent hover:border-gray-300'
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyGallery;