// src/context/DashboardContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

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
  const [userDashboards, setUserDashboards] = useState({
    rent: true,
    buy: false,
    commercial: false,
    shortlet: false
  });

  // Load dashboard preferences on mount
  useEffect(() => {
    const loadDashboardPrefs = () => {
      try {
        const savedDashboard = localStorage.getItem('domihive_last_dashboard');
        const savedUser = localStorage.getItem('domihive_user');
        
        if (savedDashboard) {
          setCurrentDashboard(savedDashboard);
        }
        
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          if (userData.dashboards) {
            setUserDashboards(userData.dashboards);
          }
        }
      } catch (error) {
        console.error('Error loading dashboard preferences:', error);
      }
    };

    loadDashboardPrefs();
  }, []);

  // Switch dashboard function
  const switchDashboard = (dashboardType) => {
    if (!userDashboards[dashboardType]) {
      // Dashboard not activated yet - show onboarding
      return { 
        success: false, 
        error: 'Dashboard not activated' 
      };
    }
    
    setCurrentDashboard(dashboardType);
    localStorage.setItem('domihive_last_dashboard', dashboardType);
    
    return { success: true };
  };

  // Activate a new dashboard
  const activateDashboard = (dashboardType) => {
    const updatedDashboards = {
      ...userDashboards,
      [dashboardType]: true
    };
    
    setUserDashboards(updatedDashboards);
    
    // Update user data in localStorage
    const savedUser = localStorage.getItem('domihive_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      userData.dashboards = updatedDashboards;
      localStorage.setItem('domihive_user', JSON.stringify(userData));
    }
    
    // Switch to newly activated dashboard
    switchDashboard(dashboardType);
    
    return { success: true };
  };

  // Get available dashboards for current user
  const getAvailableDashboards = () => {
    return Object.entries(userDashboards)
      .filter(([_, enabled]) => enabled)
      .map(([type]) => type);
  };

  // Dashboard configurations
  const getDashboardConfig = (type) => {
    const configs = {
      rent: {
        id: 'rent',
        name: 'For Rent',
        icon: 'home',
        color: 'bg-blue-500',
        description: 'Find and manage rental properties',
        routes: {
          overview: '/dashboard/rent/overview',
          browse: '/dashboard/rent/browse',
          applications: '/dashboard/rent/applications',
          'my-properties': '/dashboard/rent/my-properties',
          maintenance: '/dashboard/rent/maintenance',
          payments: '/dashboard/rent/payments',
          messages: '/dashboard/rent/messages'
        }
      },
      buy: {
        id: 'buy',
        name: 'Buy',
        icon: 'money-bill-wave',
        color: 'bg-amber-500',
        description: 'Purchase properties',
        routes: {
          overview: '/dashboard/buy/overview',
          browse: '/dashboard/buy/browse',
          applications: '/dashboard/buy/applications',
          'my-properties': '/dashboard/buy/my-properties'
        }
      },
      commercial: {
        id: 'commercial',
        name: 'Commercial',
        icon: 'building',
        color: 'bg-green-500',
        description: 'Commercial properties and spaces',
        routes: {
          overview: '/dashboard/commercial/overview',
          browse: '/dashboard/commercial/browse',
          applications: '/dashboard/commercial/applications',
          'my-properties': '/dashboard/commercial/my-properties'
        }
      },
      shortlet: {
        id: 'shortlet',
        name: 'Shortlets',
        icon: 'hotel',
        color: 'bg-purple-500',
        description: 'Short-term rentals and stays',
        routes: {
          overview: '/dashboard/shortlet/overview',
          browse: '/dashboard/shortlet/browse',
          applications: '/dashboard/shortlet/applications',
          'my-properties': '/dashboard/shortlet/my-properties'
        }
      }
    };
    
    return configs[type] || configs.rent;
  };

  const value = {
    currentDashboard,
    userDashboards,
    switchDashboard,
    activateDashboard,
    getAvailableDashboards,
    getDashboardConfig,
    getCurrentConfig: () => getDashboardConfig(currentDashboard)
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;