// src/dashboards/rent/components/property-details/components/tabs/LocationTab/NearbyAmenities.jsx
import React from 'react';

const NearbyAmenities = ({ activeCategory }) => {
  const allAmenities = [
    {
      id: 1,
      category: 'transport',
      name: 'Ikoyi-Obalende BRT Station',
      type: 'Bus Station',
      distance: '1.2km',
      rating: 4.5
    },
    {
      id: 2,
      category: 'transport',
      name: 'Falomo Taxi Park',
      type: 'Taxi Stand',
      distance: '800m',
      rating: 4.0
    },
    {
      id: 3,
      category: 'education',
      name: 'Children International School',
      type: 'Primary School',
      distance: '1.5km',
      rating: 4.8
    },
    {
      id: 4,
      category: 'education',
      name: 'Corona Secondary School',
      type: 'Secondary School',
      distance: '2.1km',
      rating: 4.7
    },
    {
      id: 5,
      category: 'health',
      name: 'St. Nicholas Hospital',
      type: 'Hospital',
      distance: '900m',
      rating: 4.6
    },
    {
      id: 6,
      category: 'health',
      name: 'First Cardiology',
      type: 'Specialist Hospital',
      distance: '1.4km',
      rating: 4.9
    },
    {
      id: 7,
      category: 'shopping',
      name: 'The Palms Shopping Mall',
      type: 'Shopping Mall',
      distance: '3.2km',
      rating: 4.4
    },
    {
      id: 8,
      category: 'shopping',
      name: 'Ikoyi Plaza',
      type: 'Supermarket',
      distance: '1.1km',
      rating: 4.3
    },
    {
      id: 9,
      category: 'dining',
      name: 'Nok by Alara',
      type: 'Restaurant',
      distance: '1.8km',
      rating: 4.7
    },
    {
      id: 10,
      category: 'dining',
      name: 'Hard Rock Cafe',
      type: 'Cafe & Bar',
      distance: '2.3km',
      rating: 4.5
    },
    {
      id: 11,
      category: 'entertainment',
      name: 'Filmhouse Cinema',
      type: 'Cinema',
      distance: '3.1km',
      rating: 4.4
    },
    {
      id: 12,
      category: 'entertainment',
      name: 'Lagos Yacht Club',
      type: 'Recreation Club',
      distance: '2.5km',
      rating: 4.8
    }
  ];

  // Filter amenities based on active category
  const filteredAmenities = activeCategory === 'all' 
    ? allAmenities 
    : allAmenities.filter(amenity => amenity.category === activeCategory);

  const categoryLabels = {
    'all': 'All Nearby Amenities',
    'transport': 'Transportation',
    'education': 'Schools & Education',
    'health': 'Healthcare',
    'shopping': 'Shopping',
    'dining': 'Dining & Restaurants',
    'entertainment': 'Entertainment'
  };

  const getCategoryIcon = (category) => {
    const icons = {
      transport: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.684A1 1 0 008.279 3H5z" />
        </svg>
      ),
      education: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      health: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      shopping: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      dining: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
        </svg>
      ),
      entertainment: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    };
    return icons[category] || icons.transport;
  };

  return (
    <div className="nearby-amenities">
      <div className="mb-6">
        <h5 className="text-lg font-semibold text-gray-900 mb-1">
          {categoryLabels[activeCategory]}
        </h5>
        <p className="text-sm text-gray-600">
          {filteredAmenities.length} locations • Within 3.2km radius
        </p>
      </div>

      <div className="space-y-3">
        {filteredAmenities.map((amenity) => (
          <div
            key={amenity.id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-150"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-gray-600">
                    {getCategoryIcon(amenity.category)}
                  </div>
                </div>
              </div>
              
              <div>
                <h6 className="font-medium text-gray-900">{amenity.name}</h6>
                <p className="text-xs text-gray-600 mt-0.5">{amenity.type}</p>
                
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xs text-gray-700 font-medium">{amenity.distance}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs text-gray-700 font-medium">{amenity.rating}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                className="text-xs px-3 py-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-150"
                title="Get directions"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              
              <button 
                className="text-xs px-3 py-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-150"
                title="Save for later"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Distances are approximate • Based on walking routes
          </div>
          <button className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-150 flex items-center space-x-1">
            <span>View on map</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NearbyAmenities;