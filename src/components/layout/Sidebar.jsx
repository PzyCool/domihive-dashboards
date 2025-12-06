// src/components/layout/Sidebar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';

const Sidebar = ({ sidebarState, toggleSidebar, closeMobileSidebar, isMobile, currentDashboard }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const sidebarNavRef = useRef(null);
  
  // Get dashboard-specific navigation items - MATCHING HTML STRUCTURE
  const getDashboardNavItems = () => {
    const navConfigs = {
      rent: {
        main: [
          { label: 'Overview', icon: 'chart-pie', path: '/dashboard/rent/overview' },
          { label: 'Browse Properties', icon: 'search', path: '/dashboard/rent/browse' },
          { label: 'Favorites', icon: 'heart', path: '/dashboard/rent/favorites' },
        ],
        applications: [
          { label: 'My Applications', icon: 'file-alt', path: '/dashboard/rent/applications', badge: 0 },
        ],
        management: [
          { label: 'My Properties', icon: 'home', path: '/dashboard/rent/my-properties' },
          { label: 'Maintenance', icon: 'tools', path: '/dashboard/rent/maintenance' },
          { label: 'Payments', icon: 'credit-card', path: '/dashboard/rent/payments' },
          { label: 'Messages', icon: 'comments', path: '/dashboard/rent/messages' },
        ]
      },
      // Other dashboards will be added later
    };
    
    return navConfigs[currentDashboard] || navConfigs.rent;
  };

  const navItems = getDashboardNavItems();

  // Auto-scroll to active nav item
  useEffect(() => {
    const sidebarNav = sidebarNavRef.current;
    if (!sidebarNav) return;

    // Find active link
    const activeLink = sidebarNav.querySelector('.nav-link.active');
    if (activeLink) {
      // Add scroll highlight class
      activeLink.classList.add('scroll-highlight');
      
      // Calculate scroll position
      const navRect = sidebarNav.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      const linkTopRelativeToNav = linkRect.top - navRect.top;
      const navMiddle = navRect.height / 2;
      
      // Calculate scroll position to center the active item
      const targetScrollTop = sidebarNav.scrollTop + linkTopRelativeToNav - navMiddle + (linkRect.height / 2);
      
      // Smooth scroll to position
      sidebarNav.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
      
      // Remove highlight after animation
      setTimeout(() => {
        activeLink.classList.remove('scroll-highlight');
      }, 1500);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      // Redirect handled by AuthContext
    }
  };

  // Don't render sidebar if user not loaded
  if (!user) return null;

  const isExpanded = sidebarState === 'expanded';
  const isCollapsed = sidebarState === 'collapsed';
  const isHidden = sidebarState === 'hidden';
  const isMobileOpen = sidebarState === 'mobile-open';

  return (
    <>
      {/* Mobile overlay */}
      {(isMobile && isMobileOpen) && (
        <div 
          className="mobile-sidebar-overlay fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar Container with Glassmorphism Effect */}
      <aside className={`
        dashboard-sidebar
        fixed top-0 left-0 h-screen z-50
        transition-all duration-300 ease-in-out
        ${isMobile ? 'w-72' : isCollapsed ? 'w-20' : 'w-64'}
        ${isMobile ? (isMobileOpen ? 'translate-x-0' : '-translate-x-full') : ''}
        ${isHidden && !isMobile ? 'lg:-translate-x-full' : ''}
        ${isExpanded ? 'lg:w-64' : ''}
        bg-white/80 backdrop-blur-lg backdrop-saturate-150 /* Glass effect */
        flex flex-col
        border-r border-white/30 /* Softer border for glass effect */
        shadow-lg shadow-black/5 /* Soft shadow */
      `}>
        
        {/* Sidebar Header with Logo - Glass effect */}
        <div className="sidebar-header px-6 py-5 flex items-center justify-between min-h-[80px] border-b border-white/30 bg-white/60 backdrop-blur-sm">
          <div className="sidebar-logo flex items-center gap-3">
            {isCollapsed && !isMobile ? (
              /* COLLAPSED STATE: Show icon logo */
              <img 
                src="/src/assets/domihive-icon.png" 
                alt="DomiHive Icon"
                className="h-7 w-auto transition-all duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/28?text=DH';
                }}
              />
            ) : (
              /* EXPANDED STATE: Show full logo */
              <img 
                src="/src/assets/domihive-logo.png" 
                alt="DomiHive"
                className="h-8 w-auto transition-all duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150x32?text=DomiHive';
                }}
              />
            )}
          </div>

          {/* Desktop Toggle Button */}
          {!isMobile && (
            <button 
              onClick={toggleSidebar}
              className="sidebar-toggle w-9 h-9 rounded-md hover:bg-white/30 flex items-center justify-center transition-colors text-[#64748b] hover:text-[#0e1f42] backdrop-blur-sm"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <i className={`fas fa-chevron-${isCollapsed ? 'right' : 'left'} text-sm`}></i>
            </button>
          )}
        </div>

        {/* Sidebar Navigation - Scrollable */}
        <nav 
          ref={sidebarNavRef}
          className="sidebar-nav flex-1 overflow-y-auto py-4"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#9f7539 transparent' }}
        >
          {/* MAIN Section - MATCHING HTML */}
          <div className="nav-section mb-6">
            {!isCollapsed && (
              <div className="nav-section-title px-6 mb-3 text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                MAIN
              </div>
            )}
            
            <div className="space-y-1 px-3">
              {navItems.main.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileSidebar}
                  className={({ isActive }) => 
                    `nav-link flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isCollapsed ? 'justify-center px-0' : ''}
                    ${isActive 
                      ? 'bg-white/60 text-[#0e1f42] border-l-3 border-[#9f7539] backdrop-blur-sm' 
                      : 'text-[#334155] hover:bg-white/40 hover:text-[#0e1f42] backdrop-blur-sm'
                    }
                    ${isCollapsed ? 'mx-2' : 'mx-3'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <i className={`fas fa-${item.icon} ${isCollapsed ? 'text-lg' : 'text-base'} w-5 text-center ${isActive ? 'text-[#9f7539]' : 'text-[#64748b]'}`}></i>
                      {!isCollapsed && (
                        <span className="nav-text font-medium text-sm">{item.label}</span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          {/* CONTINUE APPLICATIONS Section - MATCHING HTML */}
          <div className="nav-section mb-6">
            {!isCollapsed && (
              <div className="nav-section-title px-6 mb-3 text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                CONTINUE APPLICATIONS
              </div>
            )}
            
            <div className="space-y-1 px-3">
              {navItems.applications.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileSidebar}
                  className={({ isActive }) => 
                    `nav-link flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative
                    ${isCollapsed ? 'justify-center px-0' : ''}
                    ${isActive 
                      ? 'bg-white/60 text-[#0e1f42] border-l-3 border-[#9f7539] backdrop-blur-sm' 
                      : 'text-[#334155] hover:bg-white/40 hover:text-[#0e1f42] backdrop-blur-sm'
                    }
                    ${isCollapsed ? 'mx-2' : 'mx-3'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <i className={`fas fa-${item.icon} ${isCollapsed ? 'text-lg' : 'text-base'} w-5 text-center ${isActive ? 'text-[#9f7539]' : 'text-[#64748b]'}`}></i>
                      {!isCollapsed && (
                        <>
                          <span className="nav-text font-medium text-sm">{item.label}</span>
                          {item.badge > 0 && (
                            <span className="nav-badge bg-[#9f7539] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center ml-auto shadow-sm">
                              {item.badge > 99 ? '99+' : item.badge}
                            </span>
                          )}
                        </>
                      )}
                      {/* Badge for collapsed state */}
                      {isCollapsed && item.badge > 0 && (
                        <span className="nav-badge absolute top-1 right-1 bg-[#9f7539] text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                          {item.badge > 9 ? '9+' : item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          {/* MY MANAGEMENTS Section - MATCHING HTML */}
          <div className="nav-section mb-6">
            {!isCollapsed && (
              <div className="nav-section-title px-6 mb-3 text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                MY MANAGEMENTS
              </div>
            )}
            
            <div className="space-y-1 px-3">
              {navItems.management.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileSidebar}
                  className={({ isActive }) => 
                    `nav-link flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isCollapsed ? 'justify-center px-0' : ''}
                    ${isActive 
                      ? 'bg-white/60 text-[#0e1f42] border-l-3 border-[#9f7539] backdrop-blur-sm' 
                      : 'text-[#334155] hover:bg-white/40 hover:text-[#0e1f42] backdrop-blur-sm'
                    }
                    ${isCollapsed ? 'mx-2' : 'mx-3'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <i className={`fas fa-${item.icon} ${isCollapsed ? 'text-lg' : 'text-base'} w-5 text-center ${isActive ? 'text-[#9f7539]' : 'text-[#64748b]'}`}></i>
                      {!isCollapsed && (
                        <span className="nav-text font-medium text-sm">{item.label}</span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        {/* Sidebar Footer - User Profile with Glass effect */}
        <div className="sidebar-footer p-6 border-t border-white/30 bg-white/60 backdrop-blur-sm">
          {isExpanded ? (
            <>
              {/* Expanded View */}
              <div className="user-profile flex items-center gap-3 mb-4">
                <div className="user-avatar w-10 h-10 rounded-full overflow-hidden border-2 border-white/40 shadow-sm">
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
                    <div className="w-full h-full bg-[#9f7539] flex items-center justify-center">
                      <i className="fas fa-user text-white"></i>
                    </div>
                  )}
                </div>
                
                <div className="user-info flex-1 min-w-0">
                  <div className="user-name font-semibold text-[#334155] truncate text-sm">
                    {user.name || 'User'}
                  </div>
                  <div className="user-role text-xs text-[#64748b] truncate">
                    Tenant
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="logout-btn w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/60 hover:bg-white/80 text-[#334155] hover:text-[#dc2626] rounded-lg border border-white/40 hover:border-[#dc2626]/30 transition-colors font-medium text-sm backdrop-blur-sm shadow-sm"
              >
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              {/* Collapsed/Mobile View */}
              <div className="flex flex-col items-center gap-3">
                <div className="user-avatar w-8 h-8 rounded-full overflow-hidden border-2 border-white/40 shadow-sm">
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
                    <div className="w-full h-full bg-[#9f7539] flex items-center justify-center">
                      <i className="fas fa-user text-white text-xs"></i>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-white/40 text-[#64748b] hover:text-[#334155] transition-colors backdrop-blur-sm"
                  title="Logout"
                >
                  <i className="fas fa-sign-out-alt text-sm"></i>
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;