import React, { useState } from 'react';
import { MANAGEMENT_TYPE_LABELS, MANAGEMENT_TYPE_COLORS } from '../../utils/constants';

const PropertyCard = ({ property, onViewDetails, onToggleFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!property) return null;
  
  // Get management type info
  const managementType = property.managementType || 'domihive_managed';
  const managementLabel = MANAGEMENT_TYPE_LABELS[managementType] || 'DomiHive Managed';
  const managementColor = MANAGEMENT_TYPE_COLORS[managementType] || '#9f7539';
  
  // Format price with Nigerian formatting
  const formatPrice = (price) => {
    return `₦${price.toLocaleString('en-NG')}/year`;
  };
  
  // Handle favorite toggle
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    if (onToggleFavorite) {
      onToggleFavorite(property.id, !isFavorite);
    }
  };
  
  // Handle view details
  const handleViewDetails = (e) => {
    e.stopPropagation();
    if (onViewDetails) {
      onViewDetails(property.id);
    }
  };
  
  // Handle next image
  const handleNextImage = (e) => {
    e.stopPropagation();
    if (property.amenities && property.amenities.length > 1) {
      setCurrentImageIndex((currentImageIndex + 1) % property.amenities.length);
    }
  };
  
  // Shorten amenities to fit
  const getShortAmenities = () => {
    if (!property.amenities) return [];
    // Take only first 2 amenities, shorten if needed
    return property.amenities.slice(0, 2).map(amenity => 
      amenity.length > 20 ? amenity.substring(0, 20) + '...' : amenity
    );
  };
  
  return (
    <div 
      className="property-card bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] cursor-pointer"
      style={{
        width: '100%',
        maxWidth: '465px',
        height: '580px', // Reduced from 651px to 580px
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Property Image Section - 40% of card */}
      <div 
        className="relative"
        style={{
          height: '232px', // 40% of 580px
          flexShrink: 0
        }}
      >
        <img
          src={property.images?.[currentImageIndex] || 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop'}
          alt={property.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop';
          }}
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <div 
            className="px-2 py-1 rounded text-white text-xs font-bold shadow-sm"
            style={{ backgroundColor: managementColor }}
          >
            {managementLabel}
          </div>
          
          {property.isVerified && (
            <div className="px-2 py-1 bg-green-500 rounded text-white text-xs font-bold shadow-sm">
              ✓ VERIFIED
            </div>
          )}
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform"
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <i className={`fas fa-heart ${isFavorite ? 'text-red-500' : 'text-gray-500'} text-sm`}></i>
        </button>
        
        {/* Price Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="text-xl font-bold text-white">
            {formatPrice(property.price)}
          </div>
        </div>
      </div>
      
      {/* Property Details - 60% of card */}
      <div className="p-4 flex-1 flex flex-col" style={{ height: '348px' }}>
        {/* Title - Fixed height */}
        <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2" style={{ height: '48px' }}>
          {property.title}
        </h3>
        
        {/* Location - Fixed height */}
        <div className="flex items-start gap-2 text-gray-600 mb-3" style={{ height: '40px' }}>
          <i className="fas fa-map-marker-alt text-[#9f7539] mt-1 flex-shrink-0"></i>
          <span className="text-sm line-clamp-2">{property.location}</span>
        </div>
        
        {/* Property Features - Compact */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <i className="fas fa-bed text-[#9f7539] text-sm mb-1"></i>
            <span className="text-sm font-semibold text-gray-800">{property.bedrooms}</span>
            <span className="text-xs text-gray-600">Beds</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <i className="fas fa-bath text-[#9f7539] text-sm mb-1"></i>
            <span className="text-sm font-semibold text-gray-800">{property.bathrooms}</span>
            <span className="text-xs text-gray-600">Baths</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
            <i className="fas fa-ruler-combined text-[#9f7539] text-sm mb-1"></i>
            <span className="text-sm font-semibold text-gray-800">{property.size}</span>
            <span className="text-xs text-gray-600">Size</span>
          </div>
        </div>
        
        {/* Key Features - Limited and fixed height */}
        <div className="mb-3" style={{ height: '60px' }}>
          <div className="text-sm font-medium text-gray-700 mb-1">Features:</div>
          <div className="flex flex-wrap gap-1">
            {getShortAmenities().map((amenity, index) => (
              <span 
                key={index} 
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {amenity}
              </span>
            ))}
            {property.amenities && property.amenities.length > 2 && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                +{property.amenities.length - 2}
              </span>
            )}
          </div>
        </div>
        
        {/* Property Type and Date */}
        <div className="mb-4 flex justify-between items-center" style={{ height: '24px' }}>
          <span className="text-xs text-gray-600 font-medium">
            <i className="fas fa-home mr-1"></i>
            {property.propertyType}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(property.dateAdded).toLocaleDateString('en-NG', { 
              month: 'short', 
              day: 'numeric'
            })}
          </span>
        </div>
        
        {/* Action Buttons - ALWAYS VISIBLE AT BOTTOM */}
        <div className="mt-auto">
          <div className="flex gap-2">
            <button
              onClick={handleViewDetails}
              className="flex-1 bg-[#0e1f42] text-white font-medium py-2.5 rounded-lg hover:bg-[#1a2d5f] transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <i className="fas fa-eye"></i>
              View Details
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log('Book inspection for:', property.id);
              }}
              className="flex-1 bg-[#9f7539] text-white font-medium py-2.5 rounded-lg hover:bg-[#b58a4a] transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <i className="fas fa-calendar-check"></i>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;