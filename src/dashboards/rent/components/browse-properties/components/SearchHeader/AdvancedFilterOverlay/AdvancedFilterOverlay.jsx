import React, { useState, useEffect } from 'react';
import HorizontalScroll from './components/HorizontalScroll';

// Import components
import PriceSlider from './components/PriceSlider';
import BedroomCheckboxes from './components/BedroomCheckboxes';
import BathroomCheckboxes from './components/BathroomCheckboxes';
import FurnishingOptions from './components/FurnishingOptions';
import AmenitiesGrid from './components/AmenitiesGrid';
import PetPolicyToggle from './components/PetPolicyToggle';
import PropertyAgeSelect from './components/PropertyAgeSelect';

const AdvancedFilterOverlay = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange,
  onApplyFilters,
  onClearFilters 
}) => {
  console.log('AdvancedFilterOverlay - isOpen:', isOpen);
  
  const [sidebarWidth, setSidebarWidth] = useState(256); // Default expanded width
  
  // Listen for sidebar state changes
  useEffect(() => {
    const checkSidebarState = () => {
      const sidebar = document.querySelector('.dashboard-sidebar');
      if (!sidebar) {
        setSidebarWidth(256);
        return;
      }
      
      // Check if sidebar is hidden
      const isHidden = sidebar.classList.contains('-translate-x-full') || 
                       sidebar.classList.contains('lg:-translate-x-full');
      
      if (isHidden) {
        setSidebarWidth(0);
        return;
      }
      
      // Check for mobile state
      if (sidebar.classList.contains('w-72')) {
        setSidebarWidth(288); // 72 * 4 = 288px (mobile open)
        return;
      }
      
      // Check for desktop collapsed state
      if (sidebar.classList.contains('w-20')) {
        setSidebarWidth(80); // 20 * 4 = 80px (collapsed)
        return;
      }
      
      // Check for desktop expanded state
      if (sidebar.classList.contains('w-64')) {
        setSidebarWidth(256); // 64 * 4 = 256px (expanded)
        return;
      }
      
      // Default to 0 if we can't determine
      setSidebarWidth(0);
    };
    
    // Initial check
    checkSidebarState();
    
    // Create MutationObserver
    const observer = new MutationObserver(() => {
      checkSidebarState();
    });
    
    // Observe the sidebar
    const sidebar = document.querySelector('.dashboard-sidebar');
    if (sidebar) {
      observer.observe(sidebar, { 
        attributes: true, 
        attributeFilter: ['class'],
        childList: false, 
        subtree: false 
      });
    }
    
    // Listen for resize
    window.addEventListener('resize', checkSidebarState);
    
    // Check periodically (fallback)
    const interval = setInterval(checkSidebarState, 500);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkSidebarState);
      clearInterval(interval);
    };
  }, []);
  
  if (!isOpen) return null;
  
  // Get the SearchHeader's position to cover it (ORIGINAL LOGIC)
  const getOverlayStyle = () => {
    const searchHeader = document.querySelector('.search-header');
    const isMobile = window.innerWidth <= 900;
    
    if (!searchHeader) {
      // Fallback positioning
      if (isMobile) {
        return {
          left: '0px',
          right: '0px',
          top: '64px',
          height: 'auto',
          minHeight: '200px'
        };
      }
      
      return {
        left: `${sidebarWidth}px`,
        right: '0px',
        top: '64px',
        height: 'auto',
        minHeight: '200px'
      };
    }
    
    const headerRect = searchHeader.getBoundingClientRect();
    
    if (isMobile) {
      // Check if mobile sidebar is open
      const sidebar = document.querySelector('.dashboard-sidebar');
      const isMobileOpen = sidebar && sidebar.classList.contains('translate-x-0');
      
      return {
        left: isMobileOpen ? '288px' : '0px',
        right: '0px',
        top: `${headerRect.top}px`,
        height: 'auto',
        minHeight: `${headerRect.height}px`
      };
    }
    
    // Desktop: use calculated sidebar width
    return {
      left: `${sidebarWidth}px`,
      right: '0px',
      top: `${headerRect.top}px`,
      height: 'auto',
      minHeight: `${headerRect.height}px`
    };
  };
  
  return (
    <div 
      className="fixed bg-white rounded-b-xl shadow-2xl z-[999] border border-gray-200 animate-slide-down transition-all duration-300 ease-in-out"
      style={{
        ...getOverlayStyle(),
        borderLeft: '3px solid #9f7539',
        boxShadow: '0 10px 25px -5px rgba(159, 117, 57, 0.1), 0 10px 10px -5px rgba(159, 117, 57, 0.04)'
      }}
    >
      {/* Header with accent color */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-[#9f7539]/5">
        <div>
          <h3 className="text-lg font-bold text-[#0e1f42]">
            <i className="fas fa-sliders-h mr-2 text-[#9f7539]"></i>
            Advanced Filters
          </h3>
          <p className="text-sm text-gray-600">
            Select multiple options to narrow your search
          </p>
        </div>
        
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-full hover:bg-[#9f7539]/10 flex items-center justify-center transition-colors"
          title="Close"
        >
          <i className="fas fa-times text-xl text-gray-700 hover:text-[#9f7539]"></i>
        </button>
      </div>
      
      {/* Horizontal Scroll Container */}
      <HorizontalScroll>
        {/* Price Range */}
        <div className="filter-section min-w-[220px] p-4">
          <PriceSlider
            min={filters.priceMin || 0}
            max={filters.priceMax || 10000000}
            onPriceChange={(min, max) => onFilterChange({ priceMin: min, priceMax: max })}
          />
        </div>
        
        {/* Bedrooms */}
        <div className="filter-section min-w-[180px] p-4">
          <BedroomCheckboxes
            selected={filters.bedrooms || []}
            onChange={(bedrooms) => onFilterChange({ bedrooms })}
          />
        </div>

        {/* Bathrooms */}
        <div className="filter-section min-w-[180px] p-4">
          <BathroomCheckboxes
            selected={filters.bathrooms || []}
            onChange={(bathrooms) => onFilterChange({ bathrooms })}
          />
        </div>
        
        {/* Furnishing */}
        <div className="filter-section min-w-[200px] p-4">
          <FurnishingOptions
            selected={filters.furnishing || ''}
            onChange={(furnishing) => onFilterChange({ furnishing })}
          />
        </div>
        
        {/* Amenities */}
        <div className="filter-section min-w-[220px] p-4">
          <AmenitiesGrid
            selected={filters.amenities || []}
            onToggle={(amenityId) => {
              const current = filters.amenities || [];
              const newAmenities = current.includes(amenityId)
                ? current.filter(id => id !== amenityId)
                : [...current, amenityId];
              onFilterChange({ amenities: newAmenities });
            }}
          />
        </div>
        
        {/* Pet Policy */}
        <div className="filter-section min-w-[180px] p-4">
          <PetPolicyToggle
            allowed={filters.petsAllowed || false}
            onChange={(petsAllowed) => onFilterChange({ petsAllowed })}
          />
        </div>
        
        {/* Property Age */}
        <div className="filter-section min-w-[200px] p-4">
          <PropertyAgeSelect
            age={filters.propertyAge || ''}
            onChange={(propertyAge) => onFilterChange({ propertyAge })}
          />
        </div>
      </HorizontalScroll>
      
      {/* Action Buttons */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-[#9f7539]/5 flex justify-between">
        <button
          type="button"
          onClick={onClearFilters}
          className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-[#9f7539]/10 transition-colors font-medium flex items-center"
        >
          <i className="fas fa-times mr-2"></i>
          Clear All
        </button>
        
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-[#9f7539]/10 transition-colors font-medium"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={onApplyFilters}
            className="px-5 py-2.5 bg-[#9f7539] text-white rounded-lg hover:bg-[#b58a4a] transition-colors font-medium flex items-center shadow-sm"
          >
            <i className="fas fa-check mr-2"></i>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilterOverlay;