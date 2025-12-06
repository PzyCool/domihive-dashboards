// src/components/layout/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  const [sidebarState, setSidebarState] = useState('expanded'); // 'expanded', 'collapsed', 'hidden'
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useAuth();
  const { currentDashboard } = useDashboard();
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Handle responsive sidebar
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      
      if (mobile) {
        // On mobile, default to hidden sidebar
        setSidebarState('hidden');
      } else {
        // On desktop, restore from localStorage or default to expanded
        const savedState = localStorage.getItem('domihive_sidebar_state');
        if (savedState && ['expanded', 'collapsed', 'hidden'].includes(savedState)) {
          setSidebarState(savedState);
        } else {
          setSidebarState('expanded');
        }
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Save sidebar state to localStorage when it changes (desktop only)
  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem('domihive_sidebar_state', sidebarState);
    }
  }, [sidebarState, isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      // On mobile: hidden ↔ mobile-open
      setSidebarState(sidebarState === 'hidden' ? 'mobile-open' : 'hidden');
    } else {
      // On desktop: cycle through expanded → collapsed → hidden → expanded
      if (sidebarState === 'expanded') {
        setSidebarState('collapsed');
      } else if (sidebarState === 'collapsed') {
        setSidebarState('hidden');
      } else {
        setSidebarState('expanded');
      }
    }
  };

  const closeMobileSidebar = () => {
    if (isMobile && sidebarState === 'mobile-open') {
      setSidebarState('hidden');
    }
  };

  // Calculate main content margin based on sidebar state
  const getMainMargin = () => {
    if (isMobile) return 'ml-0';
    
    if (sidebarState === 'expanded') return 'ml-64'; // w-64 = 256px
    if (sidebarState === 'collapsed') return 'ml-20'; // w-20 = 80px
    return 'ml-0'; // hidden
  };

  return (
    <div className="dashboard-layout flex min-h-screen bg-[var(--light-gray)]">
      {/* Sidebar - fixed position */}
      <Sidebar 
        sidebarState={sidebarState}
        toggleSidebar={toggleSidebar}
        closeMobileSidebar={closeMobileSidebar}
        isMobile={isMobile}
        currentDashboard={currentDashboard}
      />
      
      {/* Main Content Area */}
      <div className={`dashboard-main flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${getMainMargin()}`}>
        {/* Header - fixed at top */}
        <Header 
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
          sidebarState={sidebarState}
        />
        
        {/* Content Area - scrollable */}
        <main className="dashboard-content flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;