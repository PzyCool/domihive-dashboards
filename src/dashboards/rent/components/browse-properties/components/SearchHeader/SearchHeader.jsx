import React, { useState, useEffect } from 'react';
import { useSearchHeader } from './hooks/useSearchHeader';
import PrimaryRow from './PrimaryRow';
// import SecondaryRow from './SecondaryRow';

const SearchHeader = ({ 
  filters, 
  onFilterChange,
  viewType,
  onViewToggle
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  
  // Use custom hook for animations and sticky behavior
  const { headerRef, isSticky, shouldShow } = useSearchHeader();
  
  // Calculate active filters count
  useEffect(() => {
    let count = 0;
    const { areaType, location, propertyType, bedrooms, priceRange, managementType } = filters;
    
    if (areaType && areaType !== 'all') count++;
    if (location && location !== 'all') count++;
    if (propertyType && propertyType !== 'all') count++;
    if (bedrooms && bedrooms !== 'all') count++;
    if (priceRange && priceRange !== 'all') count++;
    if (managementType && managementType !== 'all') count++;
    
    setActiveFiltersCount(count);
  }, [filters]);
  
  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };
  
  // Handle expand/collapse
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Handle clear all filters
  const handleClearFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        areaType: 'all',
        location: 'all',
        propertyType: 'all',
        bedrooms: 'all',
        priceRange: 'all',
        managementType: 'all',
        searchQuery: filters.searchQuery || '' // Keep search query
      });
    }
  };
  
  if (!shouldShow) return null;
  
  return (
    <div 
      ref={headerRef}
      className={`
        search-header
        bg-white border-b border-gray-200
        transition-all duration-300 ease-in-out
        ${isSticky ? 'sticky top-0 z-40 shadow-md' : 'relative'}
        ${isExpanded ? 'expanded' : 'collapsed'}
      `}
    >
      {/* Primary Row - Always Visible */}
      <PrimaryRow
        filters={filters}
        onFilterChange={handleFilterChange}
        viewType={viewType}
        onViewToggle={onViewToggle}
        activeFiltersCount={activeFiltersCount}
        isExpanded={isExpanded}
        onToggleExpand={handleToggleExpand}
      />
      
      {/* Secondary Row - Expandable Filters */}
      {isExpanded && (
        <SecondaryRow
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
      )}
    </div>
  );
};

export default SearchHeader;