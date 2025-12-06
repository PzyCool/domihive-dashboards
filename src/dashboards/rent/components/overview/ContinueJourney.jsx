// src/dashboards/rent/components/overview/ContinueJourney.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';

const ContinueJourney = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // State for the pending booking property
  const [pendingProperty, setPendingProperty] = useState(null);
  const [showSection, setShowSection] = useState(true);
  
  // Check for pending booking from localStorage on component mount
  useEffect(() => {
    const checkPendingBooking = () => {
      try {
        const pendingBooking = localStorage.getItem('domihive_pending_booking');
        if (pendingBooking) {
          const propertyData = JSON.parse(pendingBooking);
          setPendingProperty(propertyData);
        }
      } catch (error) {
        console.error('Error loading pending booking:', error);
      }
    };
    
    checkPendingBooking();
    
    // Also check user's browsing history for recent views
    const recentViews = localStorage.getItem('domihive_recent_properties');
    if (recentViews && !pendingProperty) {
      try {
        const recent = JSON.parse(recentViews);
        if (recent.length > 0) {
          // Simulate a pending booking from recent view (for demo)
          const mockPending = {
            id: 'demo_property_001',
            title: '3 Bedroom Luxury Apartment in Lekki Phase 1',
            location: 'Lekki Phase 1, Lagos Island',
            price: '₦2,800,000/year',
            bedrooms: 3,
            bathrooms: 3,
            size: '180 sqm',
            image: 'https://images.unsplash.com/photo-1545323157-f6f63c0d66a7?w=800&h=600&fit=crop',
            viewedAt: new Date().toISOString(),
            type: 'rent'
          };
          setPendingProperty(mockPending);
        }
      } catch (error) {
        console.error('Error loading recent properties:', error);
      }
    }
  }, []);
  
  // Handle continue to booking
  const handleContinueBooking = () => {
    if (pendingProperty) {
      // Store property for booking flow
      localStorage.setItem('domihive_booking_property', JSON.stringify(pendingProperty));
      // Navigate to booking page (will create later)
      navigate(`/dashboard/rent/applications?property=${pendingProperty.id}`);
    }
  };
  
  // Handle view similar properties
  const handleViewSimilar = () => {
    if (pendingProperty) {
      // Navigate to browse with filters
      navigate(`/dashboard/rent/browse?type=${pendingProperty.type}&bedrooms=${pendingProperty.bedrooms}`);
    }
  };
  
  // Handle dismiss section
  const handleDismiss = () => {
    // Remove from localStorage if it's a real pending booking
    localStorage.removeItem('domihive_pending_booking');
    setShowSection(false);
  };
  
  // If no pending property or user dismissed, don't show
  if (!pendingProperty || !showSection) {
    return null;
  }
  
  // Calculate how long ago it was viewed
  const getTimeAgo = (dateString) => {
    const viewedDate = new Date(dateString);
    const now = new Date();
    const diffMs = now - viewedDate;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };
  
  return (
    <div className="continue-journey-section mb-8 animate-slide-in">
      <div className="bg-gradient-to-r from-[#0e1f42] to-[#1a2d5f] rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#9f7539] to-[#b58a4a] rounded-lg flex items-center justify-center">
                <i className="fas fa-home text-white"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Continue Your Journey
                </h3>
                <p className="text-sm text-white/80">
                  You were about to book an inspection for this property
                </p>
              </div>
            </div>
            
            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="Dismiss"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>
        </div>
        
        {/* Property Details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Property Image */}
            <div className="md:col-span-1">
              <div className="relative rounded-lg overflow-hidden shadow-md h-48 md:h-full">
                <img
                  src={pendingProperty.image}
                  alt={pendingProperty.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop';
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#9f7539] text-white text-xs font-bold px-2 py-1 rounded">
                    VIEWED {getTimeAgo(pendingProperty.viewedAt).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Property Info */}
            <div className="md:col-span-2">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-white mb-2">
                    {pendingProperty.title}
                  </h4>
                  <div className="flex items-center gap-4 text-white/80 mb-3">
                    <span className="flex items-center gap-1">
                      <i className="fas fa-map-marker-alt text-[#9f7539]"></i>
                      {pendingProperty.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="fas fa-clock text-[#9f7539]"></i>
                      Viewed {getTimeAgo(pendingProperty.viewedAt)}
                    </span>
                  </div>
                  
                  {/* Property Features */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-bed text-[#9f7539]"></i>
                        <span className="text-white font-medium">{pendingProperty.bedrooms} Bed</span>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-bath text-[#9f7539]"></i>
                        <span className="text-white font-medium">{pendingProperty.bathrooms} Bath</span>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-ruler-combined text-[#9f7539]"></i>
                        <span className="text-white font-medium">{pendingProperty.size}</span>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-tag text-[#9f7539]"></i>
                        <span className="text-white font-medium">{pendingProperty.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-auto">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleContinueBooking}
                      className="flex-1 bg-gradient-to-r from-[#9f7539] to-[#b58a4a] text-white font-bold py-3 px-6 rounded-lg hover:from-[#b58a4a] hover:to-[#9f7539] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                    >
                      <i className="fas fa-calendar-check group-hover:scale-110 transition-transform"></i>
                      Continue to Book Inspection
                    </button>
                    
                    <button
                      onClick={handleViewSimilar}
                      className="flex-1 bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-6 rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                    >
                      <i className="fas fa-search group-hover:scale-110 transition-transform"></i>
                      View Similar Properties
                    </button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex justify-center mt-4">
                    <div className="flex items-center gap-4 text-white/70 text-sm">
                      <button 
                        onClick={() => {
                          // Add to favorites logic
                          const favorites = JSON.parse(localStorage.getItem('domihive_user_favorites') || '[]');
                          favorites.push(pendingProperty);
                          localStorage.setItem('domihive_user_favorites', JSON.stringify(favorites));
                          // Show success message
                          alert('Added to favorites!');
                        }}
                        className="flex items-center gap-1 hover:text-white transition-colors"
                      >
                        <i className="fas fa-heart"></i>
                        Save to Favorites
                      </button>
                      <span className="text-white/30">•</span>
                      <button 
                        onClick={() => {
                          // Not interested logic
                          handleDismiss();
                          alert('We won\'t show this property again.');
                        }}
                        className="flex items-center gap-1 hover:text-white transition-colors"
                      >
                        <i className="fas fa-times-circle"></i>
                        Not Interested
                      </button>
                      <span className="text-white/30">•</span>
                      <button 
                        onClick={() => {
                          // Share property
                          navigator.clipboard.writeText(window.location.href);
                          alert('Property link copied to clipboard!');
                        }}
                        className="flex items-center gap-1 hover:text-white transition-colors"
                      >
                        <i className="fas fa-share-alt"></i>
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress Indicator */}
        <div className="px-6 py-3 bg-black/20 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="text-sm text-white/70">
              Your inspection booking is <span className="text-white font-bold">85% complete</span>
            </div>
            <div className="w-32 bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#9f7539] to-[#b58a4a] h-2 rounded-full" 
                style={{ width: '85%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinueJourney;