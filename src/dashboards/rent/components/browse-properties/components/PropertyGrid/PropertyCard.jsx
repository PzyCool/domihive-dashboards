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
    if (property.images && property.images.length > 1) {
      setCurrentImageIndex((currentImageIndex + 1) % property.images.length);
    }
  };
  
  return (
    <div 
      className="property-card bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] cursor-pointer"
      style={{
        width: '100%',
        maxWidth: '465px',
        height: '651px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Property Image Section */}
      <div 
        className="relative overflow-hidden"
        style={{
          height: '250px',
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
        
        {/* Image Navigation */}
        {property.images && property.images.length > 1 && (
          <button
            onClick={handleNextImage}
            className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow hover:scale-110 transition-transform"
            title="View next image"
          >
            <i className="fas fa-images text-gray-700 text-sm"></i>
          </button>
        )}
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <div 
            className="px-3 py-1.5 rounded-md text-white text-xs font-bold shadow-sm"
            style={{ backgroundColor: managementColor }}
          >
            {managementLabel.toUpperCase()}
          </div>
          
          {property.isVerified && (
            <div className="px-3 py-1.5 bg-green-500 rounded-md text-white text-xs font-bold shadow-sm">
              VERIFIED
            </div>
          )}
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform"
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <i className={`fas fa-heart ${isFavorite ? 'text-red-500' : 'text-gray-500'} text-lg`}></i>
        </button>
      </div>
      
      {/* Property Details - Scrollable if needed */}
      <div className="p-5 flex-1 flex flex-col overflow-hidden">
        {/* Price */}
        <div className="mb-3">
          <div className="text-2xl font-bold text-gray-800">
            {formatPrice(property.price)}
          </div>
          {property.maintenanceIncluded && (
            <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-medium inline-block mt-1">
              <i className="fas fa-tools mr-1"></i>
              Maintenance Included
            </div>
          )}
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2" style={{ minHeight: '3.5rem' }}>
          {property.title}
        </h3>
        
        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <i className="fas fa-map-marker-alt text-[#9f7539] flex-shrink-0"></i>
          <span className="text-sm line-clamp-1">{property.location}</span>
        </div>
        
        {/* Property Features */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
            <i className="fas fa-bed text-[#9f7539] mb-1"></i>
            <span className="text-sm font-semibold text-gray-800">{property.bedrooms}</span>
            <span className="text-xs text-gray-600">Beds</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
            <i className="fas fa-bath text-[#9f7539] mb-1"></i>
            <span className="text-sm font-semibold text-gray-800">{property.bathrooms}</span>
            <span className="text-xs text-gray-600">Baths</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
            <i className="fas fa-ruler-combined text-[#9f7539] mb-1"></i>
            <span className="text-sm font-semibold text-gray-800">{property.size}</span>
            <span className="text-xs text-gray-600">Size</span>
          </div>
        </div>
        
        {/* Key Features - Limited to 2-3 items */}
        <div className="mb-4 flex-1">
          <div className="text-sm font-medium text-gray-700 mb-2">Key Features:</div>
          <div className="flex flex-wrap gap-2">
            {property.amenities?.slice(0, 3).map((amenity, index) => (
              <span 
                key={index} 
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
        
        {/* Action Buttons - ALWAYS VISIBLE AT BOTTOM */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex gap-2">
            <button
              onClick={handleViewDetails}
              className="flex-1 bg-[#0e1f42] text-white font-medium py-3 rounded-lg hover:bg-[#1a2d5f] transition-colors flex items-center justify-center gap-2"
            >
              <i className="fas fa-eye"></i>
              View Details
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log('Book inspection for:', property.id);
              }}
              className="flex-1 bg-[#9f7539] text-white font-medium py-3 rounded-lg hover:bg-[#b58a4a] transition-colors flex items-center justify-center gap-2"
            >
              <i className="fas fa-calendar-check"></i>
              Book Now
            </button>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-3 text-center">
          <span className="text-xs text-gray-500">
            {property.propertyType} • Added {new Date(property.dateAdded).toLocaleDateString('en-NG', { 
              month: 'short', 
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;