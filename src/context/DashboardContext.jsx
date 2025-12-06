// src/context/DashboardContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the Dashboard Context
const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const [currentDashboard, setCurrentDashboard] = useState('rent');
  const [sidebarConfig, setSidebarConfig] = useState(null);

  // Load saved dashboard preference on mount
  useEffect(() => {
    const savedDashboard = localStorage.getItem('domihive_dashboard');
    if (savedDashboard) {
      setCurrentDashboard(savedDashboard);
    }
    // Initialize sidebar config
    updateSidebarConfig(savedDashboard || 'rent');
  }, []);

  // Dashboard sidebar configurations
  const getDashboardConfig = (type) => {
    const configs = {
      rent: {
        label: 'For Rent',
        icon: '🏠',
        color: 'bg-blue-500',
        sidebar: {
          main: [
            { label: 'Overview', icon: 'chart-pie', section: 'overview' },
            { label: 'Browse Properties', icon: 'search', section: 'browse' },
            { label: 'Favorites', icon: 'heart', section: 'favorites' },
          ],
          applications: [
            { label: 'My Applications', icon: 'file-alt', section: 'applications' },
          ],
          management: [
            { label: 'My Properties', icon: 'home', section: 'my-properties' },
            { label: 'Maintenance', icon: 'tools', section: 'maintenance' },
            { label: 'Payments', icon: 'credit-card', section: 'payments' },
            { label: 'Messages', icon: 'comments', section: 'messages' },
          ]
        }
      },
      shortlet: {
        label: 'Shortlets',
        icon: '🏨',
        color: 'bg-purple-500',
        sidebar: {
          main: [
            { label: 'Overview', icon: 'chart-pie', section: 'overview' },
            { label: 'Browse Shortlets', icon: 'search', section: 'browse' },
            { label: 'Favorites', icon: 'heart', section: 'favorites' },
          ],
          bookings: [
            { label: 'My Bookings', icon: 'calendar-alt', section: 'bookings' },
            { label: 'Booking Requests', icon: 'clock', section: 'requests' },
          ],
          management: [
            { label: 'My Shortlets', icon: 'home', section: 'my-properties' },
            { label: 'Requests', icon: 'inbox', section: 'requests' },
            { label: 'Payments', icon: 'credit-card', section: 'payments' },
            { label: 'Messages', icon: 'comments', section: 'messages' },
          ]
        }
      },
      commercial: {
        label: 'Commercial',
        icon: '🏢',
        color: 'bg-green-500',
        sidebar: {
          main: [
            { label: 'Overview', icon: 'chart-pie', section: 'overview' },
            { label: 'Browse Commercial', icon: 'search', section: 'browse' },
            { label: 'Favorites', icon: 'heart', section: 'favorites' },
          ],
          applications: [
            { label: 'My Applications', icon: 'file-alt', section: 'applications' },
            { label: 'Proposals', icon: 'file-contract', section: 'proposals' },
          ],
          management: [
            { label: 'My Commercial', icon: 'building', section: 'my-properties' },
            { label: 'Maintenance', icon: 'tools', section: 'maintenance' },
            { label: 'Payments', icon: 'credit-card', section: 'payments' },
            { label: 'Messages', icon: 'comments', section: 'messages' },
          ]
        }
      },
      buy: {
        label: 'Buy',
        icon: '💰',
        color: 'bg-amber-500',
        sidebar: {
          main: [
            { label: 'Overview', icon: 'chart-pie', section: 'overview' },
            { label: 'Browse Properties', icon: 'search', section: 'browse' },
            { label: 'Favorites', icon: 'heart', section: 'favorites' },
          ],
          applications: [
            { label: 'My Applications', icon: 'file-alt', section: 'applications' },
            { label: 'Mortgage', icon: 'hand-holding-usd', section: 'mortgage' },
          ],
          management: [
            { label: 'My Properties', icon: 'home', section: 'my-properties' },
            { label: 'Documents', icon: 'file', section: 'documents' },
            { label: 'Payments', icon: 'credit-card', section: 'payments' },
            { label: 'Legal', icon: 'balance-scale', section: 'legal' },
          ]
        }
      }
    };
    
    return configs[type] || configs.rent;
  };

  const updateSidebarConfig = (type) => {
    const config = getDashboardConfig(type);
    setSidebarConfig(config);
  };

  // Switch dashboard function
  const switchDashboard = (type) => {
    setCurrentDashboard(type);
    updateSidebarConfig(type);
    localStorage.setItem('domihive_dashboard', type);
  };

  // Get current dashboard config
  const getCurrentConfig = () => {
    return getDashboardConfig(currentDashboard);
  };

  // Context value
  const value = {
    currentDashboard,
    sidebarConfig,
    switchDashboard,
    getCurrentConfig
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;