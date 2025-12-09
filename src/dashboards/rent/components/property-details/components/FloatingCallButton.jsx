// src/dashboards/rent/components/property-details/components/FloatingCallButton.jsx
import React, { useState, useEffect } from 'react';

const FloatingCallButton = ({ phoneNumber = '+2349010851071' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [scrollTimer, setScrollTimer] = useState(null);

  // Show/hide button on scroll with delay
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true);
      
      // Clear previous timer
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      
      // Set new timer to hide after 3 seconds of no scrolling
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      
      setScrollTimer(timer);
    };

    // Show button initially after 1 second
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
      clearTimeout(initialTimer);
    };
  }, [scrollTimer]);

  const handleCallClick = () => {
    window.open(`tel:${phoneNumber}`);
  };

  return (
    <button
      onClick={handleCallClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className={`fixed right-8 bottom-8 bg-gradient-to-br from-[#9f7539] to-[#b58a4a] text-white p-4 rounded-full shadow-lg hover:shadow-xl flex items-center gap-3 z-50 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] border-none font-sans font-semibold ${
        isVisible 
          ? 'opacity-100 translate-x-0 visible' 
          : 'opacity-0 translate-x-5 invisible'
      }`}
      style={{ boxShadow: '0 8px 30px rgba(159, 117, 57, 0.3)' }}
    >
      {/* Call Icon */}
      <div className="w-6 h-6 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      </div>
      
      {/* Call Text */}
      <span className="pr-2">Contact</span>

      {/* Tooltip */}
      <div 
        className={`absolute right-full top-1/2 -translate-y-1/2 mr-4 bg-white text-[#0e1f42] p-4 rounded-xl shadow-lg border border-[#e2e8f0] min-w-[200px] transition-all duration-300 ${
          showTooltip 
            ? 'opacity-100 visible -translate-x-4' 
            : 'opacity-0 invisible -translate-x-2'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#f8fafc] rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#9f7539]" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <div>
            <div className="font-medium text-[#0e1f42]">{phoneNumber}</div>
            <div className="text-sm text-[#64748b]">Click to call DomiHive</div>
          </div>
        </div>
        
        {/* Tooltip Arrow */}
        <div className="absolute left-full top-1/2 -translate-y-1/2">
          <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[8px] border-t-transparent border-b-transparent border-l-white"></div>
        </div>
      </div>
    </button>
  );
};

export default FloatingCallButton;