// src/dashboards/rent/components/overview/UnifiedActionsPanel.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { useDashboard } from '../../../../context/DashboardContext';

const UnifiedActionsPanel = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { currentDashboard, switchDashboard, getAvailableDashboards } = useDashboard();
  
  // State for notifications and quick actions
  const [notifications, setNotifications] = useState([]);
  const [quickActions, setQuickActions] = useState([]);
  const [dashboardShortcuts, setDashboardShortcuts] = useState([]);
  
  // Load unified data
  useEffect(() => {
    // Load notifications (cross-dashboard)
    const loadNotifications = () => {
      const mockNotifications = [
        { id: 1, type: 'payment', title: 'Payment Reminder', message: 'Rent payment due in 3 days', dashboard: 'rent', time: '2 hours ago', read: false, priority: 'high' },
        { id: 2, type: 'maintenance', title: 'Maintenance Update', message: 'Your maintenance request #123 has been approved', dashboard: 'rent', time: '1 day ago', read: true, priority: 'medium' },
        { id: 3, type: 'application', title: 'Application Status', message: 'Your property application is under review', dashboard: 'buy', time: '2 days ago', read: false, priority: 'medium' },
        { id: 4, type: 'message', title: 'New Message', message: 'You have a new message from property agent', dashboard: 'commercial', time: '3 days ago', read: true, priority: 'low' },
        { id: 5, type: 'system', title: 'System Update', message: 'New features available in your dashboard', dashboard: 'all', time: '1 week ago', read: true, priority: 'low' }
      ];
      setNotifications(mockNotifications);
    };
    
    // Load quick actions
    const loadQuickActions = () => {
      const actions = [
        { id: 1, title: 'Update Profile', icon: 'user-edit', description: 'Complete your profile information', path: '/dashboard/settings', color: 'from-blue-500 to-blue-600' },
        { id: 2, title: 'Payment Methods', icon: 'credit-card', description: 'Manage your payment options', path: '/dashboard/rent/payments', color: 'from-green-500 to-green-600' },
        { id: 3, title: 'Document Center', icon: 'file-alt', description: 'Access all your documents', path: '/dashboard/rent/applications', color: 'from-purple-500 to-purple-600' },
        { id: 4, title: 'Help Center', icon: 'question-circle', description: 'Get help and support', path: '/dashboard/settings?tab=help', color: 'from-amber-500 to-amber-600' },
        { id: 5, title: 'Privacy Settings', icon: 'shield-alt', description: 'Manage your privacy preferences', path: '/dashboard/settings?tab=privacy', color: 'from-red-500 to-red-600' },
        { id: 6, title: 'Notification Settings', icon: 'bell', description: 'Customize your notifications', path: '/dashboard/settings?tab=notifications', color: 'from-indigo-500 to-indigo-600' }
      ];
      setQuickActions(actions);
    };
    
    // Load dashboard shortcuts
    const loadDashboardShortcuts = () => {
      const shortcuts = [
        { id: 'rent', name: 'For Rent', icon: 'home', enabled: true, description: 'Manage rental properties', notifications: 3 },
        { id: 'buy', name: 'Buy', icon: 'money-bill-wave', enabled: false, description: 'Purchase properties', notifications: 1 },
        { id: 'commercial', name: 'Commercial', icon: 'building', enabled: false, description: 'Commercial spaces', notifications: 1 },
        { id: 'shortlet', name: 'Shortlets', icon: 'hotel', enabled: false, description: 'Short-term stays', notifications: 0 }
      ];
      setDashboardShortcuts(shortcuts);
    };
    
    loadNotifications();
    loadQuickActions();
    loadDashboardShortcuts();
    
    // Simulate new notifications
    const interval = setInterval(() => {
      setNotifications(prev => {
        if (Math.random() > 0.8) {
          const newNotif = {
            id: Date.now(),
            type: 'system',
            title: 'Live Update',
            message: 'New properties matching your preferences',
            dashboard: 'all',
            time: 'Just now',
            read: false,
            priority: 'medium'
          };
          return [newNotif, ...prev.slice(0, 4)];
        }
        return prev;
      });
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle notification click
  const handleNotificationClick = (notification) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );
    
    // Navigate based on notification type
    if (notification.dashboard !== 'all' && notification.dashboard !== currentDashboard) {
      switchDashboard(notification.dashboard);
    }
    
    // Navigate to relevant section
    switch(notification.type) {
      case 'payment':
        navigate('/dashboard/rent/payments');
        break;
      case 'maintenance':
        navigate('/dashboard/rent/maintenance');
        break;
      case 'application':
        navigate(`/dashboard/${notification.dashboard}/applications`);
        break;
      case 'message':
        navigate(`/dashboard/${notification.dashboard}/messages`);
        break;
      default:
        navigate('/dashboard/settings');
    }
  };
  
  // Handle quick action click
  const handleQuickActionClick = (action) => {
    navigate(action.path);
  };
  
  // Handle dashboard switch
  const handleDashboardSwitch = (dashboard) => {
    if (dashboard.enabled) {
      switchDashboard(dashboard.id);
      navigate(`/dashboard/${dashboard.id}/overview`);
    } else {
      // Show activation modal/notification
      alert(`To activate ${dashboard.name} dashboard, please upgrade your account or contact support.`);
    }
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };
  
  // Get unread notifications count
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <section className="unified-actions-panel bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#0e1f42] mb-2">Unified Actions</h2>
          <p className="text-gray-600">Quick access across all dashboards</p>
        </div>
        <div className="text-sm font-medium text-[#9f7539] bg-[#9f7539]/10 px-3 py-1.5 rounded-full">
          <i className="fas fa-bolt mr-1"></i> QUICK ACTIONS
        </div>
      </div>
      
      {/* Notifications Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <i className="fas fa-bell text-[#9f7539]"></i>
            Cross-Dashboard Notifications
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </h3>
          <button 
            onClick={markAllAsRead}
            className="text-sm text-[#0e1f42] hover:text-[#9f7539] font-medium"
          >
            Mark all as read
          </button>
        </div>
        
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {notifications.map(notification => (
            <div 
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                notification.read ? 'bg-gray-50' : 'bg-blue-50'
              } ${getPriorityColor(notification.priority)}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  notification.read ? 'bg-gray-200' : 'bg-blue-100'
                }`}>
                  <i className={`fas fa-${
                    notification.type === 'payment' ? 'credit-card' :
                    notification.type === 'maintenance' ? 'tools' :
                    notification.type === 'application' ? 'file-alt' :
                    notification.type === 'message' ? 'comments' :
                    'bell'
                  } ${notification.read ? 'text-gray-600' : 'text-blue-600'}`}></i>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                      {notification.title}
                    </span>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{notification.message}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded">
                      {notification.dashboard === 'all' ? 'All Dashboards' : `${notification.dashboard} Dashboard`}
                    </span>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => navigate('/dashboard/settings?tab=notifications')}
          className="mt-3 w-full py-2 text-sm font-medium text-[#0e1f42] hover:text-[#9f7539] hover:bg-gray-50 rounded-lg transition-colors"
        >
          <i className="fas fa-cog mr-2"></i>
          Configure Notification Preferences
        </button>
      </div>
      
      {/* Dashboard Switcher Shortcuts */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i className="fas fa-th-large text-purple-500"></i>
          Dashboard Shortcuts
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {dashboardShortcuts.map(dashboard => (
            <div
              key={dashboard.id}
              onClick={() => handleDashboardSwitch(dashboard)}
              className={`rounded-xl p-4 border cursor-pointer transition-all duration-200 ${
                dashboard.id === currentDashboard
                  ? 'bg-gradient-to-br from-[#0e1f42] to-[#1a2d5f] border-[#0e1f42] text-white'
                  : dashboard.enabled
                  ? 'bg-white border-gray-200 hover:shadow-md hover:border-gray-300'
                  : 'bg-gray-100 border-gray-300 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  dashboard.id === currentDashboard
                    ? 'bg-white/20'
                    : dashboard.enabled
                    ? 'bg-gray-100'
                    : 'bg-gray-200'
                }`}>
                  <i className={`fas fa-${dashboard.icon} ${
                    dashboard.id === currentDashboard ? 'text-white' : 'text-gray-600'
                  }`}></i>
                </div>
                
                {dashboard.notifications > 0 && (
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                    dashboard.id === currentDashboard
                      ? 'bg-white/30 text-white'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {dashboard.notifications}
                  </span>
                )}
              </div>
              
              <div className={`font-medium mb-1 ${
                dashboard.id === currentDashboard ? 'text-white' : 'text-gray-800'
              }`}>
                {dashboard.name}
              </div>
              
              <div className={`text-xs ${
                dashboard.id === currentDashboard ? 'text-white/80' : 'text-gray-600'
              }`}>
                {dashboard.description}
              </div>
              
              {!dashboard.enabled && (
                <div className="mt-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                  Coming Soon
                </div>
              )}
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => navigate('/dashboard/settings?tab=dashboards')}
          className="mt-4 w-full py-2 text-sm font-medium text-[#0e1f42] hover:text-[#9f7539] hover:bg-gray-50 rounded-lg transition-colors"
        >
          <i className="fas fa-sliders-h mr-2"></i>
          Manage Dashboard Preferences
        </button>
      </div>
    </section>
  );
};

export default UnifiedActionsPanel;