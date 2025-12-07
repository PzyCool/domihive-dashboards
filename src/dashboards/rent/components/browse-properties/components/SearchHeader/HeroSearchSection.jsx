import React, { useState, useEffect } from 'react';

const HeroSearchSection = ({ filters, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery || '');
  
  // Lagos areas data
  const lagosAreas = {
    island: [
      'Ikoyi', 'Lekki Phase 1', 'Victoria Island', 'Ajah', 'Sangotedo',
      'Chevron', 'Oniru', 'Banana Island', 'Lekki Phase 2', 
      'Victoria Garden City (VGC)', 'Lekki Scheme 2', 'Osapa London'
    ],
    mainland: [
      'Ikeja', 'Ikeja GRA', 'Yaba', 'Surulere', 'Ojota', 'Oshodi', 'Ilupeju',
      'Egbeda', 'Maryland', 'Ikorodu', 'Agege', 'Festac Town', 'Gbagada',
      'Mushin', 'Mende', 'Ogba', 'Alausa', 'Anthony', 'Palmgroove'
    ]
  };
  
  // Property types
  const propertyTypes = [
    'Any Type',
    'Apartment',
    'Duplex', 
    'Terrace House',
    'Bungalow',
    'Self-Contain',
    'Mini-Flat',
    'Penthouse'
  ];
  
  // Bedroom options
  const bedroomOptions = [
    'Any',
    '1',
    '2', 
    '3',
    '4',
    '5+'
  ];
  
  // Price range options (yearly)
  const priceRanges = [
    'Any Price',
    'Under ₦1M/year',
    '₦1M - ₦3M/year',
    '₦3M - ₦5M/year',
    '₦5M - ₦10M/year',
    '₦10M+/year'
  ];
  
  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ searchQuery });
  };
  
  // Handle area type change
  const handleAreaTypeChange = (e) => {
    const areaType = e.target.value;
    onFilterChange({ 
      areaType: areaType === 'all' ? 'all' : areaType,
      location: 'all' // Reset location when area type changes
    });
  };
  
  // Handle location change
  const handleLocationChange = (e) => {
    onFilterChange({ location: e.target.value === 'all' ? 'all' : e.target.value });
  };
  
  // Handle property type change
  const handlePropertyTypeChange = (e) => {
    onFilterChange({ propertyType: e.target.value === 'all' ? 'all' : e.target.value });
  };
  
  // Handle bedrooms change
  const handleBedroomsChange = (e) => {
    onFilterChange({ bedrooms: e.target.value === 'all' ? 'all' : e.target.value });
  };
  
  // Handle price range change
  const handlePriceRangeChange = (e) => {
    onFilterChange({ priceRange: e.target.value === 'all' ? 'all' : e.target.value });
  };
  
  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    onFilterChange({
      searchQuery: '',
      areaType: 'all',
      location: 'all',
      propertyType: 'all',
      bedrooms: 'all',
      priceRange: 'all'
    });
  };
  
  // Get locations based on selected area type
  const getLocations = () => {
    if (filters.areaType === 'island') {
      return lagosAreas.island;
    } else if (filters.areaType === 'mainland') {
      return lagosAreas.mainland;
    }
    return [];
  };
  
  const locations = getLocations();
  
  return (
    <div className="hero-search-section mb-10">
      {/* Hero Background */}
      <div 
        className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0e1f42] to-[#1a2d5f]"
        style={{
          backgroundImage: `url('/src/assets/browse-property-background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          minHeight: '400px'
        }}
      >
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="relative z-10 p-6 md:p-10 lg:p-12">
          {/* Hero Text */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Find Your Perfect Property
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Search through verified Nigerian properties across Lagos. 
              Filter by management type, location, and budget.
            </p>
          </div>
          
          {/* Search Container */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-4 md:p-6">
            {/* Search Input Row */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <i className="fas fa-search"></i>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search by property name, location, or features..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-[#9f7539] focus:ring-2 focus:ring-[#9f7539]/20 outline-none transition-all"
                />
                <button
                  onClick={handleSearchSubmit}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#0e1f42] text-white px-6 py-2 rounded-lg hover:bg-[#1a2d5f] transition-colors font-medium"
                >
                  Search
                </button>
              </div>
            </div>
            
            {/* Filter Row - 5 Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* Area Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <i className="fas fa-map-marker-alt text-[#9f7539] mr-2"></i>
                  Area Type
                </label>
                <select
                  value={filters.areaType || 'all'}
                  onChange={handleAreaTypeChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-[#9f7539] focus:ring-2 focus:ring-[#9f7539]/20 outline-none transition-all"
                >
                  <option value="all">All Areas</option>
                  <option value="island">Lagos Island</option>
                  <option value="mainland">Lagos Mainland</option>
                </select>
              </div>
              
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <i className="fas fa-location-dot text-[#9f7539] mr-2"></i>
                  Location
                </label>
                <select
                  value={filters.location || 'all'}
                  onChange={handleLocationChange}
                  disabled={!filters.areaType || filters.areaType === 'all'}
                  className={`w-full px-3 py-2.5 rounded-lg border focus:border-[#9f7539] focus:ring-2 focus:ring-[#9f7539]/20 outline-none transition-all ${
                    !filters.areaType || filters.areaType === 'all' 
                      ? 'bg-gray-100 cursor-not-allowed' 
                      : 'border-gray-300'
                  }`}
                >
                  <option value="all">
                    {!filters.areaType || filters.areaType === 'all' 
                      ? 'Choose Area Type First' 
                      : 'All Locations'}
                  </option>
                  {locations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <i className="fas fa-home text-[#9f7539] mr-2"></i>
                  Property Type
                </label>
                <select
                  value={filters.propertyType || 'all'}
                  onChange={handlePropertyTypeChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-[#9f7539] focus:ring-2 focus:ring-[#9f7539]/20 outline-none transition-all"
                >
                  {propertyTypes.map((type, index) => (
                    <option key={index} value={index === 0 ? 'all' : type.toLowerCase()}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <i className="fas fa-bed text-[#9f7539] mr-2"></i>
                  Bedrooms
                </label>
                <select
                  value={filters.bedrooms || 'all'}
                  onChange={handleBedroomsChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-[#9f7539] focus:ring-2 focus:ring-[#9f7539]/20 outline-none transition-all"
                >
                  {bedroomOptions.map((option, index) => (
                    <option key={index} value={index === 0 ? 'all' : option}>
                      {option} {index > 0 ? 'Bedroom' + (option !== '1' ? 's' : '') : ''}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <i className="fas fa-tag text-[#9f7539] mr-2"></i>
                  Price Range
                </label>
                <select
                  value={filters.priceRange || 'all'}
                  onChange={handlePriceRangeChange}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-[#9f7539] focus:ring-2 focus:ring-[#9f7539]/20 outline-none transition-all"
                >
                  {priceRanges.map((range, index) => (
                    <option key={index} value={index === 0 ? 'all' : range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <i className="fas fa-filter text-[#9f7539] mr-2"></i>
                <span>Advanced filters coming soon</span>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium flex items-center gap-2"
                >
                  <i className="fas fa-times"></i>
                  Clear Filters
                </button>
                <button
                  onClick={handleSearchSubmit}
                  className="px-6 py-2.5 bg-[#9f7539] text-white rounded-lg hover:bg-[#b58a4a] transition-colors font-medium flex items-center gap-2"
                >
                  <i className="fas fa-search"></i>
                  Search Properties
                </button>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-700">
                    <span className="font-semibold">80+</span> Verified Properties
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#9f7539]"></div>
                  <span className="text-gray-700">
                    <span className="font-semibold">3</span> Management Types
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-gray-700">
                    <span className="font-semibold">24/7</span> Support Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Management Type Toggle - Placeholder for now */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
          <i className="fas fa-building text-[#9f7539]"></i>
          <span className="text-sm text-gray-700">
            Management Type Toggle coming next
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroSearchSection;