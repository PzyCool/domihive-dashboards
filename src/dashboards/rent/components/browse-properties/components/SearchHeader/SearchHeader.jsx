import React, { useState, useEffect } from 'react';
import PrimaryRow from './PrimaryRow';
import SecondaryRow from './SecondaryRow';
import AdvancedFilterOverlay from './AdvancedFilterOverlay/AdvancedFilterOverlay';

const SearchHeader = ({ 
  filters, 
  onFilterChange,
  viewType,
  onViewToggle
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  
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
  
  // Listen for sidebar state changes
  useEffect(() => {
    const checkSidebarState = () => {
      const sidebar = document.querySelector('.dashboard-sidebar');
      if (!sidebar) {
        setSidebarWidth(0);
        setIsSidebarVisible(false);
        return;
      }
      
      // Check if sidebar is hidden (has -translate-x-full class)
      const isHidden = sidebar.classList.contains('-translate-x-full') || 
                       sidebar.classList.contains('lg:-translate-x-full');
      
      setIsSidebarVisible(!isHidden);
      
      // If sidebar is hidden, width should be 0
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
    
    // Function to update sidebar state
    const updateSidebarState = () => {
      checkSidebarState();
    };
    
    // Initial check
    updateSidebarState();
    
    // Create a more specific MutationObserver
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          shouldUpdate = true;
        }
      });
      
      if (shouldUpdate) {
        updateSidebarState();
      }
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
    
    // Also check when URL changes (page navigation)
    const handleUrlChange = () => {
      setTimeout(updateSidebarState, 100);
    };
    window.addEventListener('popstate', handleUrlChange);
    
    // Add interval check as fallback
    const interval = setInterval(updateSidebarState, 500);
    
    // Listen for custom sidebar toggle events (if you have any)
    const handleSidebarToggle = () => {
      setTimeout(updateSidebarState, 50);
    };
    document.addEventListener('sidebarToggled', handleSidebarToggle);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('popstate', handleUrlChange);
      clearInterval(interval);
      document.removeEventListener('sidebarToggled', handleSidebarToggle);
    };
  }, []);
  
  // Get responsive width style
  const getHeaderStyle = () => {
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 900;
    
    if (isMobile) {
      // On mobile, check if sidebar is open
      const sidebar = document.querySelector('.dashboard-sidebar');
      const isMobileOpen = sidebar && sidebar.classList.contains('translate-x-0');
      
      // If sidebar is open on mobile, shift header
      if (isMobileOpen) {
        return {
          left: '288px', // 72 * 4 = 288px
          right: '0px',
          width: `calc(100% - 288px)`
        };
      }
      
      // Mobile with sidebar closed
      return {
        left: '0px',
        right: '0px',
        width: '100%'
      };
    }
    
    // Desktop: Use the calculated sidebar width
    return {
      left: `${sidebarWidth}px`,
      right: '0px',
      width: `calc(100% - ${sidebarWidth}px)`
    };
  };
  
  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };
  
  // Handle expand/collapse
  const handleToggleExpand = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    
    // Tell parent about expansion state
    if (onFilterChange) {
      onFilterChange({ isExpanded: newExpandedState });
    }
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
        searchQuery: filters.searchQuery || ''
      });
    }
  };

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

const handleAdvancedToggle = () => {
  setShowAdvancedFilters(!showAdvancedFilters);
};
  
return (
  <div 
    className="search-header fixed top-16 z-40 bg-white border-b border-gray-200 transition-all duration-300 ease-in-out"
    style={{
      borderBottom: '2px solid rgba(159, 117, 57, 0.3)',
      ...getHeaderStyle()
    }}
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
      showAdvancedFilters={showAdvancedFilters} // ADD THIS
      onAdvancedToggle={handleAdvancedToggle}   // ADD THIS
    />
      
      {/* Secondary Row - Slide Down Animation */}
      <div className={`
        transition-all duration-300 ease-out
        ${isExpanded 
          ? 'max-h-96 opacity-100 translate-y-0' 
          : 'max-h-0 opacity-0 -translate-y-2'
        }
      `}>
        {isExpanded && (
          <SecondaryRow
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        )}
      </div>
    
    {/* ADD THIS: Advanced Filter Overlay */}
    <AdvancedFilterOverlay
      isOpen={showAdvancedFilters}
      onClose={() => setShowAdvancedFilters(false)}
      filters={filters}
      onFilterChange={handleFilterChange}
      onApplyFilters={() => setShowAdvancedFilters(false)}
      onClearFilters={() => {
        onFilterChange({
          priceMin: null,
          priceMax: null,
          bedrooms: [],
          bathrooms: [],
          furnishing: '',
          amenities: [],
          petsAllowed: false,
          propertyAge: ''
        });
        setShowAdvancedFilters(false);
      }}
    />
  </div>
  );
};

export default SearchHeader;