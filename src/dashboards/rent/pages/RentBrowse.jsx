import React, { useState, useEffect } from 'react';
import { generateNigerianProperties } from '../components/browse-properties/utils/propertyData';
import { VIEW_TYPES, SORT_OPTIONS, ITEMS_PER_PAGE } from '../components/browse-properties/utils/constants';

// Components to be created (commented out for now)
import HeroSearchSection from '../components/browse-properties/components/HeroSearchSection/HeroSearchSection';
import PropertyGrid from '../components/browse-properties/components/PropertyGrid/PropertyGrid';
// import SortOptions from '../components/browse-properties/components/SortOptions/SortOptions';
// import PropertyFilters from '../components/browse-properties/components/PropertyFilters/PropertyFilters';

const RentBrowse = () => {
  // State for properties
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [displayedProperties, setDisplayedProperties] = useState([]);
  
  // Filter states
  const [filters, setFilters] = useState({
    managementType: 'all',
    areaType: 'all',
    location: 'all',
    bedrooms: 'all',
    priceRange: 'all',
    searchQuery: '',
    sortBy: 'newest'
  });
  
  // View states
  const [viewType, setViewType] = useState(VIEW_TYPES.GRID);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize properties
  useEffect(() => {
    const loadProperties = () => {
      setIsLoading(true);
      try {
        // Generate Nigerian properties
        const properties = generateNigerianProperties(80);
        setAllProperties(properties);
        setFilteredProperties(properties);
        
        // Calculate initial pagination
        const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
        setTotalPages(totalPages);
        
        // Display first page
        updateDisplayedProperties(properties, 1);
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProperties();
  }, []);
  
  // Update displayed properties based on pagination
  const updateDisplayedProperties = (properties, page) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedProperties(properties.slice(startIndex, endIndex));
  };
  
  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page on filter change
  };
  
  // Apply filters to properties
  useEffect(() => {
    if (allProperties.length === 0) return;
    
    let filtered = [...allProperties];
    
    // Apply management type filter
    if (filters.managementType !== 'all') {
      filtered = filtered.filter(property => 
        property.managementType === filters.managementType
      );
    }
    
    // Apply area type filter
    if (filters.areaType !== 'all') {
      filtered = filtered.filter(property => 
        property.areaType === filters.areaType
      );
    }
    
    // Apply location filter
    if (filters.location !== 'all') {
      filtered = filtered.filter(property => 
        property.location.includes(filters.location)
      );
    }
    
    // Apply bedrooms filter
    if (filters.bedrooms !== 'all') {
      if (filters.bedrooms === '4') {
        filtered = filtered.filter(property => property.bedrooms >= 4);
      } else {
        filtered = filtered.filter(property => 
          property.bedrooms === parseInt(filters.bedrooms)
        );
      }
    }
    
    // Apply price range filter
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(str => {
        if (str.includes('+')) return parseInt(str.replace('+', '')) + 1;
        return parseInt(str);
      });
      
      filtered = filtered.filter(property => {
        if (filters.priceRange.includes('+')) {
          return property.price >= min;
        }
        return property.price >= min && property.price <= max;
      });
    }
    
    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        case 'featured':
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        case 'verified':
          return (b.isVerified ? 1 : 0) - (a.isVerified ? 1 : 0);
        default:
          return 0;
      }
    });
    
    setFilteredProperties(filtered);
    
    // Update pagination
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    setTotalPages(totalPages);
    
    // Update displayed properties for current page
    updateDisplayedProperties(filtered, currentPage);
  }, [filters, allProperties, currentPage]);
  
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateDisplayedProperties(filteredProperties, page);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle view type toggle
  const handleViewToggle = (type) => {
    setViewType(type);
  };
  
  // Handle property click (view details)
  const handlePropertyClick = (propertyId) => {
    console.log('View property details:', propertyId);
    // Will implement navigation to property details later
  };
  
  // Handle favorite toggle
  const handleFavoriteToggle = (propertyId) => {
    console.log('Toggle favorite:', propertyId);
    // Will implement favorite logic later
  };
  
  if (isLoading) {
    return (
      <div className="rent-browse-container min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-md border border-[#e2e8f0] p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#9f7539]"></div>
              <p className="mt-4 text-gray-600">Loading Nigerian properties...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="rent-browse-container min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
    <div className="bg-white rounded-lg shadow-md border border-[#e2e8f0] p-4 md:p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0e1f42] mb-2">Browse Properties</h1>
        <p className="text-gray-600">
          Showing {displayedProperties.length} of {filteredProperties.length} properties
        </p>
      </div>
      
      <HeroSearchSection 
  filters={filters}
  onFilterChange={handleFilterChange}
/>
      
      {/* Property Grid Section */}
      <div className="mb-10">
        <PropertyGrid 
          properties={displayedProperties}
          viewType={viewType}
          onPropertyClick={handlePropertyClick}
          onFavoriteToggle={handleFavoriteToggle}
        />
      </div>
      
      {/* Simple Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-lg ${currentPage === page ? 'bg-[#0e1f42] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        
        <div className="text-sm text-gray-600">
          {ITEMS_PER_PAGE} per page
        </div>
      </div>
    </div>
  </div>
  );
};

export default RentBrowse;