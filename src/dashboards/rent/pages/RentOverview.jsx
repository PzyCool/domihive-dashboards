// src/dashboards/rent/pages/RentOverview.jsx
import React from 'react';
// import ContinueJourney from '../components/overview/ContinueJourney';
// import StatsCards from '../components/overview/StatsCards';
// import RecentlyViewedProperty from '../components/overview/RecentlyViewedProperty';
// import TimelineCalendar from '../components/overview/TimelineCalendar';
// import PerformanceDashboard from '../components/overview/PerformanceDashboard';
// import UnifiedActionsPanel from '../components/overview/UnifiedActionsPanel';
// import RentalJourneyStatus from '../components/overview/RentalJourneyStatus';

const RentOverview = () => {
  return (
    <div className="overview-content p-4 lg:p-6 xl:p-8">
      {/* 1. Continue Your Journey Section (Top) */}
      {/* <ContinueJourney /> */}
      
      {/* 2. Top Section - 3 Boxes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {/* Box 1: Stats Cards (3 small cards) */}
        <div className="lg:col-span-1">
          {/* <StatsCards /> */}
        </div>
        
        {/* Box 2: Recently Viewed Property */}
        <div className="lg:col-span-1">
          {/* <RecentlyViewedProperty /> */}
        </div>
        
        {/* Box 3: Timeline Calendar */}
        <div className="lg:col-span-1">
          {/* <TimelineCalendar /> */}
        </div>
      </div>
      
      {/* 3. Middle Section - 2 Big Boxes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
        {/* Box 1: Performance Dashboard */}
        <div>
          {/* <PerformanceDashboard /> */}
        </div>
        
        {/* Box 2: Unified Actions Panel */}
        <div>
          {/* <UnifiedActionsPanel /> */}
        </div>
      </div>
      
      {/* 4. Bottom Section - Rental Journey Status */}
      <div className="mb-6 lg:mb-8">
        {/* <RentalJourneyStatus /> */}
      </div>
    </div>
  );
};

export default RentOverview;