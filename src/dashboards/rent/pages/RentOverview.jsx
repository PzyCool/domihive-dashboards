// src/dashboards/rent/pages/RentOverview.jsx
import React from 'react';
import ContinueJourney from '../components/overview/ContinueJourney';
import StatsCards from '../components/overview/StatsCards';
import RecentlyViewedProperty from '../components/overview/RecentlyViewedProperty';
import TimelineCalendar from '../components/overview/TimelineCalendar';
import PerformanceDashboard from '../components/overview/PerformanceDashboard';
import UnifiedActionsPanel from '../components/overview/UnifiedActionsPanel';
import RentalJourneyStatus from '../components/overview/RentalJourneyStatus';

const RentOverview = () => {
  return (
    <div className="unified-overview-container bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4 md:p-6">
      {/* 1. Continue Your Journey Section (Top) */}
      <div className="mb-6 md:mb-8">
        <ContinueJourney />
      </div>
      
      {/* 2. Top Section - 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="space-y-6">
          <StatsCards />
        </div>
        <div className="space-y-6">
          <RecentlyViewedProperty />
        </div>
        <div className="space-y-6">
          <TimelineCalendar />
        </div>
      </div>
      
      {/* 3. Middle Section - 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <PerformanceDashboard />
        </div>
        <div>
          <UnifiedActionsPanel />
        </div>
      </div>
      
      {/* 4. Bottom Section */}
      <div>
        <RentalJourneyStatus />
      </div>
    </div>
  );
};

export default RentOverview;