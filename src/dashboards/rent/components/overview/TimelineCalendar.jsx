// src/dashboards/rent/components/overview/TimelineCalendar.jsx
import React, { useState } from 'react';

const TimelineCalendar = () => {
  const [view, setView] = useState('month');
  
  const events = [
    { date: '2024-01-15', type: 'rented', title: 'Moved into Ikeja Apartment', color: 'bg-green-500' },
    { date: '2024-03-01', type: 'rented', title: 'Started renting VI Studio', color: 'bg-green-500' },
    { date: '2024-06-10', type: 'inspection', title: 'Property Inspection', color: 'bg-blue-500' },
    { date: '2024-09-05', type: 'payment', title: 'Quarterly Payment Due', color: 'bg-amber-500' },
    { date: '2025-01-14', type: 'renewal', title: 'Lease Renewal', color: 'bg-purple-500' }
  ];

  const timelineStats = [
    { label: 'Properties Rented', value: '2' },
    { label: 'Total Duration', value: '11 months' },
    { label: 'Next Renewal', value: '45 days' },
    { label: 'Timeline Events', value: '5' }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Rental Timeline</h2>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {['month', 'week', 'timeline'].map((item) => (
            <button
              key={item}
              onClick={() => setView(item)}
              className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-colors ${
                view === item 
                  ? 'bg-white text-[#0e1f42] shadow-sm' 
                  : 'text-gray-600 hover:text-[#0e1f42]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        {/* Mini Calendar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <button className="text-gray-600 hover:text-gray-800 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="text-lg font-bold text-gray-800">
              December 2024
            </div>
            <button className="text-gray-600 hover:text-gray-800 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
              const hasEvent = day === 5 || day === 15 || day === 25;
              return (
                <div 
                  key={day}
                  className={`text-center text-xs py-2 rounded-lg ${
                    day === 15 
                      ? 'bg-gradient-to-r from-[#0e1f42] to-[#1a2d5f] text-white font-bold' 
                      : hasEvent 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Upcoming Events</h3>
          
          <div className="space-y-4">
            {events.slice(0, 3).map((event, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{event.title}</div>
                  <div className="text-xs text-gray-600">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
                <div className="text-xs px-2 py-1 bg-white rounded-full border">
                  {event.type}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {timelineStats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3">
              <div className="text-xs text-gray-600 mb-1">{stat.label}</div>
              <div className="text-lg font-bold text-gray-800">{stat.value}</div>
            </div>
          ))}
        </div>
        
        <button className="mt-4 w-full text-sm text-[#0e1f42] hover:text-[#9f7539] font-medium py-2 hover:bg-gray-50 rounded-lg transition-colors">
          <i className="fas fa-calendar-alt mr-2"></i>
          View Full Calendar
        </button>
      </div>
    </div>
  );
};

export default TimelineCalendar;