// src/dashboards/rent/components/overview/RecentlyViewedProperty.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecentlyViewedProperty = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const property = {
    id: 'recent_001',
    title: '3 Bedroom Luxury Apartment',
    location: 'Lekki Phase 1, Lagos',
    price: '₦2,800,000/year',
    bedrooms: 3,
    bathrooms: 3,
    size: '180 sqm',
    image: 'https://images.unsplash.com/photo-1545323157-f6f63c0d66a7?w=800&h=600&fit=crop',
    viewedAt: '2 hours ago'
  };

  const features = [
    { icon: 'bed', label: 'Bedrooms', value: property.bedrooms },
    { icon: 'bath', label: 'Bathrooms', value: property.bathrooms },
    { icon: 'ruler-combined', label: 'Size', value: property.size },
    { icon: 'tag', label: 'Price', value: property.price }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Recently Viewed</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
            VIEWED {property.viewedAt.toUpperCase()}
          </span>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Property Image */}
        <div className="relative h-48 md:h-56">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <i className={`fas fa-heart ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}></i>
          </button>
          
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-bold">{property.title}</h3>
            <div className="flex items-center gap-2 text-sm">
              <i className="fas fa-map-marker-alt"></i>
              <span>{property.location}</span>
            </div>
          </div>
        </div>
        
        {/* Property Details */}
        <div className="p-4">
          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2">
                  <i className={`fas fa-${feature.icon} text-[#9f7539]`}></i>
                  <div>
                    <div className="text-xs text-gray-600">{feature.label}</div>
                    <div className="font-semibold text-gray-800">{feature.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Description */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Beautiful modern apartment in prime Lekki location. Perfect for families or professionals.
              Features include 24/7 security, swimming pool, gym, and dedicated parking.
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate(`/dashboard/rent/browse?property=${property.id}`)}
              className="flex-1 bg-gradient-to-r from-[#0e1f42] to-[#1a2d5f] text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <i className="fas fa-eye"></i>
              View Details
            </button>
            <button
              onClick={() => navigate('/dashboard/rent/applications')}
              className="flex-1 bg-gradient-to-r from-[#9f7539] to-[#b58a4a] text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <i className="fas fa-calendar-check"></i>
              Book Inspection
            </button>
          </div>
          
          {/* Status */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
            <div className="text-gray-600">
              <i className="fas fa-clock text-gray-400 mr-2"></i>
              Viewed {property.viewedAt}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium text-green-600">Available for rent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewedProperty;