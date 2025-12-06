// src/components/layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';

const Header = ({ toggleSidebar, isMobile, sidebarState }) => {
  const { user } = useAuth();
  const { currentDashboard, switchDashboard } = useDashboard();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [breadcrumb, setBreadcrumb] = useState('Dashboard');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showDashboardSwitcher, setShowDashboardSwitcher] = useState(false);

  // Update breadcrumb based on route
  useEffect(() => {
    const path = location.pathname;
    let newBreadcrumb = 'Dashboard';
    
    if (path.includes('/overview')) newBreadcrumb = 'Overview';
    else if (path.includes('/browse')) newBreadcrumb = 'Browse Properties';
    else if (path.includes('/applications')) newBreadcrumb = 'My Applications';
    else if (path.includes('/my-properties')) newBreadcrumb = 'My Properties';
    else if (path.includes('/maintenance')) newBreadcrumb = 'Maintenance';
    else if (path.includes('/payments')) newBreadcrumb = 'Payments';
    else if (path.includes('/messages')) newBreadcrumb = 'Messages';
    else if (path.includes('/favorites')) newBreadcrumb = 'Favorites';
    else if (path.includes('/settings')) newBreadcrumb = 'Settings';
    
    setBreadcrumb(newBreadcrumb);
  }, [location]);

  // Get dashboard display name
  const getDashboardName = () => {
    const names = {
      rent: 'For Rent',
      shortlet: 'Shortlets',
      commercial: 'Commercial',
      buy: 'Buy'
    };
    return names[currentDashboard] || 'Dashboard';
  };

  // Get dashboard icon
  const getDashboardIcon = () => {
    const icons = {
      rent: 'home',
      shortlet: 'hotel',
      commercial: 'building',
      buy: 'money-bill-wave'
    };
    return icons[currentDashboard] || 'chart-line';
  };

  // Handle dashboard switch
  const handleSwitchDashboard = (dashboard) => {
    switchDashboard(dashboard);
    setShowDashboardSwitcher(false);
    // Navigate to dashboard overview
    navigate(`/dashboard/${dashboard}/overview`);
  };

  // Available dashboards (will later come from user preferences)
  const availableDashboards = [
    { id: 'rent', name: 'For Rent', icon: 'home', enabled: true },
    { id: 'shortlet', name: 'Shortlets', icon: 'hotel', enabled: false },
    { id: 'commercial', name: 'Commercial', icon: 'building', enabled: false },
    { id: 'buy', name: 'Buy', icon: 'money-bill-wave', enabled: false }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowUserDropdown(false);
      setShowDashboardSwitcher(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <header className="dashboard-header bg-white border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3 lg:gap-4">
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="mobile-menu-btn p-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors"
              title="Toggle sidebar"
            >
              <i className="fas fa-bars text-lg"></i>
            </button>
          )}

          {/* Desktop Toggle Button (when sidebar is hidden) */}
          {!isMobile && sidebarState === 'hidden' && (
            <button
              onClick={toggleSidebar}
              className="desktop-toggle-btn p-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors"
              title="Show sidebar"
            >
              <i className="fas fa-bars text-lg"></i>
            </button>
          )}

          {/* Breadcrumb */}
          <div className="breadcrumb hidden lg:flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium text-gray-900">{getDashboardName()}</span>
            <i className="fas fa-chevron-right text-xs text-gray-400"></i>
            <span className="breadcrumb-active font-semibold text-gray-900">
              {breadcrumb}
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 lg:gap-4">
          {/* Dashboard Switcher */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDashboardSwitcher(!showDashboardSwitcher);
                setShowUserDropdown(false);
              }}
              className="dashboard-switcher-btn flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <i className={`fas fa-${getDashboardIcon()} text-gray-700`}></i>
              <span className="text-sm font-medium text-gray-900 hidden lg:inline">
                {getDashboardName()}
              </span>
              <i className="fas fa-chevron-down text-xs text-gray-500"></i>
            </button>

            {/* Dashboard Switcher Dropdown */}
            {showDashboardSwitcher && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-40">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Switch Dashboard
                </div>
                
                {availableDashboards.map((dashboard) => (
                  <button
                    key={dashboard.id}
                    onClick={() => handleSwitchDashboard(dashboard.id)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-gray-50 transition-colors
                      ${dashboard.id === currentDashboard ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}
                      ${!dashboard.enabled ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    disabled={!dashboard.enabled}
                  >
                    <i className={`fas fa-${dashboard.icon} w-5 text-center`}></i>
                    <span className="flex-1 font-medium">{dashboard.name}</span>
                    
                    {dashboard.id === currentDashboard && (
                      <i className="fas fa-check text-blue-600"></i>
                    )}
                    
                    {!dashboard.enabled && (
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded">Coming Soon</span>
                    )}
                  </button>
                ))}
                
                <div className="border-t border-gray-200 mt-2 pt-2 px-3">
                  <button
                    onClick={() => {
                      setShowDashboardSwitcher(false);
                      // Will later navigate to dashboard management
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium w-full text-left py-2"
                  >
                    <i className="fas fa-sliders-h mr-2"></i>
                    Manage Dashboards
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="quick-actions hidden lg:flex items-center gap-1">
            <button
              className="action-btn p-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors relative"
              title="Notifications"
            >
              <i className="fas fa-bell"></i>
              <span className="notification-badge absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                0
              </span>
            </button>
            
            <button
              className="action-btn p-2 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-colors"
              title="Help"
            >
              <i className="fas fa-question-circle"></i>
            </button>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowUserDropdown(!showUserDropdown);
                setShowDashboardSwitcher(false);
              }}
              className="user-menu-btn flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="user-avatar-sm w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200">
                {user.profilePhoto ? (
                  <img 
                    src={user.profilePhoto} 
                    alt={user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=9f7539&color=fff`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                    <i className="fas fa-user text-blue-600"></i>
                  </div>
                )}
              </div>
              
              <div className="hidden lg:block text-left">
                <div className="user-name-sm text-sm font-semibold text-gray-900 truncate max-w-[120px]">
                  {user.name || 'User'}
                </div>
                <div className="user-role text-xs text-gray-600">
                  @{user.username || 'username'}
                </div>
              </div>
              
              <i className="fas fa-chevron-down text-xs text-gray-500"></i>
            </button>

            {/* User Dropdown */}
            {showUserDropdown && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-40">
                <div className="px-3 py-2 border-b border-gray-100">
                  <div className="font-semibold text-gray-900">{user.name || 'User'}</div>
                  <div className="text-sm text-gray-600">@{user.username || 'username'}</div>
                </div>
                
                <div className="py-2">
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      navigate('/dashboard/settings');
                    }}
                    className="user-dropdown-item w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <i className="fas fa-user text-gray-600 w-5"></i>
                    <span className="text-gray-700 font-medium">My Profile</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      navigate('/dashboard/settings');
                    }}
                    className="user-dropdown-item w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <i className="fas fa-cog text-gray-600 w-5"></i>
                    <span className="text-gray-700 font-medium">Settings</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      navigate('/dashboard/favorites');
                    }}
                    className="user-dropdown-item w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <i className="fas fa-heart text-gray-600 w-5"></i>
                    <span className="text-gray-700 font-medium">Favorites</span>
                  </button>
                </div>
                
                <div className="border-t border-gray-100 pt-2">
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to logout?')) {
                        // Logout logic will be added when we enhance AuthContext
                        navigate('/login');
                      }
                    }}
                    className="user-dropdown-item w-full flex items-center gap-3 px-3 py-2.5 hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <i className="fas fa-sign-out-alt w-5"></i>
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;