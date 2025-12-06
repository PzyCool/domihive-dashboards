// src/dashboards/rent/components/overview/RentalJourneyStatus.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { useDashboard } from '../../../../context/DashboardContext';

const RentalJourneyStatus = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentDashboard } = useDashboard();
  
  // State for live status values
  const [statusData, setStatusData] = useState({
    browse: '80+ verified properties',
    applications: '0 active applications',
    applicationsBadge: 0,
    inspections: '0 upcoming inspections',
    inspectionsBadge: 0,
    favorites: '0 saved properties',
    favoritesBadge: 0,
    messages: '0 unread messages',
    messagesBadge: 0
  });

  // Navigation handlers
  const handleNavigate = (section) => {
    switch(section) {
      case 'browse':
        navigate(`/dashboard/${currentDashboard}/browse`);
        break;
      case 'applications':
        navigate(`/dashboard/${currentDashboard}/applications`);
        break;
      case 'inspections':
        navigate(`/dashboard/${currentDashboard}/applications`);
        break;
      case 'favorites':
        navigate('/dashboard/favorites');
        break;
      case 'messages':
        navigate(`/dashboard/${currentDashboard}/messages`);
        break;
      default:
        break;
    }
  };

  // Simulate live updates (in real app, this would come from API)
  useEffect(() => {
    // Initial data
    const loadInitialData = () => {
      const savedFavorites = JSON.parse(localStorage.getItem('domihive_user_favorites') || '[]');
      const applications = JSON.parse(localStorage.getItem('domihive_user_applications') || '[]');
      
      setStatusData(prev => ({
        ...prev,
        favorites: `${savedFavorites.length} saved properties`,
        favoritesBadge: savedFavorites.length,
        applications: `${applications.length} active applications`,
        applicationsBadge: applications.length
      }));
    };

    loadInitialData();

    // Simulate live updates
    const interval = setInterval(() => {
      // Random badge updates for demo
      if (Math.random() > 0.7) {
        setStatusData(prev => ({
          ...prev,
          messagesBadge: Math.floor(Math.random() * 5)
        }));
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="sidebar-status-panel bg-white rounded-lg shadow-md border border-[#e2e8f0] p-6 mb-8">
      <h2 className="panel-title text-2xl font-bold text-[#0e1f42] mb-8 text-center">
        Your Rental Journey Status
      </h2>
      
      <div className="status-grid grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* MAIN Section */}
        <div className="status-category border-r border-[#e2e8f0] pr-6 md:pr-8">
          <h3 className="category-title text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-6 pb-2 border-b-2 border-[#9f7539]">
            MAIN
          </h3>
          
          <div 
            className="status-item flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-300 hover:translate-x-2 hover:shadow-md"
            onClick={() => handleNavigate('browse')}
          >
            <div className="status-icon w-12 h-12 bg-[#f8fafc] rounded-lg flex items-center justify-center text-[#9f7539] text-lg">
              <i className="fas fa-search"></i>
            </div>
            
            <div className="status-content flex-1 min-w-0">
              <span className="status-label block font-semibold text-[#0e1f42] mb-1 text-sm md:text-base">
                Browse Properties
              </span>
              <span className="status-value text-xs md:text-sm text-[#64748b]" id="browseStatus">
                {statusData.browse}
              </span>
            </div>
            
            <div className="status-badge new bg-[#0e1f42] text-white text-xs font-bold px-3 py-1.5 rounded" id="browseBadge">
              LIVE
            </div>
          </div>
        </div>

        {/* APPLICATIONS Section */}
        <div className="status-category border-r border-[#e2e8f0] px-6 md:px-8">
          <h3 className="category-title text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-6 pb-2 border-b-2 border-[#9f7539]">
            APPLICATIONS
          </h3>
          
          <div 
            className="status-item flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-300 hover:translate-x-2 hover:shadow-md mb-4"
            onClick={() => handleNavigate('applications')}
          >
            <div className="status-icon w-12 h-12 bg-[#f8fafc] rounded-lg flex items-center justify-center text-[#9f7539] text-lg">
              <i className="fas fa-file-alt"></i>
            </div>
            
            <div className="status-content flex-1 min-w-0">
              <span className="status-label block font-semibold text-[#0e1f42] mb-1 text-sm md:text-base">
                My Applications
              </span>
              <span className="status-value text-xs md:text-sm text-[#64748b]" id="applicationsStatus">
                {statusData.applications}
              </span>
            </div>
            
            {statusData.applicationsBadge > 0 && (
              <div className="status-badge bg-[#9f7539] text-white text-xs font-bold px-2.5 py-1.5 rounded min-w-[28px] text-center" id="applicationsBadge">
                {statusData.applicationsBadge > 99 ? '99+' : statusData.applicationsBadge}
              </div>
            )}
          </div>
          
          <div 
            className="status-item flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-300 hover:translate-x-2 hover:shadow-md"
            onClick={() => handleNavigate('inspections')}
          >
            <div className="status-icon w-12 h-12 bg-[#f8fafc] rounded-lg flex items-center justify-center text-[#9f7539] text-lg">
              <i className="fas fa-calendar-check"></i>
            </div>
            
            <div className="status-content flex-1 min-w-0">
              <span className="status-label block font-semibold text-[#0e1f42] mb-1 text-sm md:text-base">
                Booked Inspections
              </span>
              <span className="status-value text-xs md:text-sm text-[#64748b]" id="inspectionsStatus">
                {statusData.inspections}
              </span>
            </div>
            
            {statusData.inspectionsBadge > 0 && (
              <div className="status-badge bg-[#9f7539] text-white text-xs font-bold px-2.5 py-1.5 rounded min-w-[28px] text-center" id="inspectionsBadge">
                {statusData.inspectionsBadge > 99 ? '99+' : statusData.inspectionsBadge}
              </div>
            )}
          </div>
        </div>

        {/* ACCOUNT Section */}
        <div className="status-category pl-6 md:pl-8">
          <h3 className="category-title text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-6 pb-2 border-b-2 border-[#9f7539]">
            ACCOUNT
          </h3>
          
          <div 
            className="status-item flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-300 hover:translate-x-2 hover:shadow-md mb-4"
            onClick={() => handleNavigate('favorites')}
          >
            <div className="status-icon w-12 h-12 bg-[#f8fafc] rounded-lg flex items-center justify-center text-[#9f7539] text-lg">
              <i className="fas fa-heart"></i>
            </div>
            
            <div className="status-content flex-1 min-w-0">
              <span className="status-label block font-semibold text-[#0e1f42] mb-1 text-sm md:text-base">
                Favorites
              </span>
              <span className="status-value text-xs md:text-sm text-[#64748b]" id="favoritesStatus">
                {statusData.favorites}
              </span>
            </div>
            
            {statusData.favoritesBadge > 0 && (
              <div className="status-badge bg-[#9f7539] text-white text-xs font-bold px-2.5 py-1.5 rounded min-w-[28px] text-center" id="favoritesBadge">
                {statusData.favoritesBadge > 99 ? '99+' : statusData.favoritesBadge}
              </div>
            )}
          </div>
          
          <div 
            className="status-item flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-300 hover:translate-x-2 hover:shadow-md"
            onClick={() => handleNavigate('messages')}
          >
            <div className="status-icon w-12 h-12 bg-[#f8fafc] rounded-lg flex items-center justify-center text-[#9f7539] text-lg">
              <i className="fas fa-comments"></i>
            </div>
            
            <div className="status-content flex-1 min-w-0">
              <span className="status-label block font-semibold text-[#0e1f42] mb-1 text-sm md:text-base">
                Messages
              </span>
              <span className="status-value text-xs md:text-sm text-[#64748b]" id="messagesStatus">
                {statusData.messages}
              </span>
            </div>
            
            {statusData.messagesBadge > 0 && (
              <div className="status-badge bg-[#9f7539] text-white text-xs font-bold px-2.5 py-1.5 rounded min-w-[28px] text-center" id="messagesBadge">
                {statusData.messagesBadge > 99 ? '99+' : statusData.messagesBadge}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentalJourneyStatus;