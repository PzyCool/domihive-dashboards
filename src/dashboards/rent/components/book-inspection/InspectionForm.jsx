// src/dashboards/rent/components/book-inspection/InspectionForm.jsx
import React, { useState, useEffect } from 'react';

// Nigerian Public Holidays 2024-2028 (from your JS)
const NIGERIAN_HOLIDAYS = {
  "2024": [
    "2024-01-01", "2024-03-29", "2024-04-01", "2024-05-01", 
    "2024-05-27", "2024-06-12", "2024-06-16", "2024-09-16", 
    "2024-10-01", "2024-12-25", "2024-12-26"
  ],
  "2025": [
    "2025-01-01", "2025-04-18", "2025-04-21", "2025-05-01", 
    "2025-05-27", "2025-06-12", "2025-06-06", "2025-09-05", 
    "2025-10-01", "2025-12-25", "2025-12-26"
  ]
};

const InspectionForm = ({ propertyId, formValues, onFormChange }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loadingDates, setLoadingDates] = useState(true);
  
  // Destructure form values from props
  const { inspectionDate, inspectionTime, numberOfPeople, inspectionNotes } = formValues;
  
  // Generate available dates (2 weeks ahead, no weekends/holidays)
  useEffect(() => {
    const generateAvailableDates = () => {
      const dates = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const maxDays = 14;
      
      for (let i = 1; i <= maxDays; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        // Skip weekends
        if (date.getDay() === 0 || date.getDay() === 6) continue;
        
        // Skip public holidays
        const year = date.getFullYear().toString();
        const dateString = date.toISOString().split('T')[0];
        if (NIGERIAN_HOLIDAYS[year]?.includes(dateString)) continue;
        
        // Simulate available slots (random between 3-8)
        const availableSlots = Math.floor(Math.random() * 6) + 3;
        
        dates.push({
          date: dateString,
          dateObj: new Date(date),
          availableSlots,
          isNextDay: i === 1
        });
      }
      
      setAvailableDates(dates);
      setLoadingDates(false);
    };
    
    // Simulate API loading
    setTimeout(generateAvailableDates, 500);
  }, []);
  
  // Generate available times for selected date
  useEffect(() => {
    if (!inspectionDate) {
      setAvailableTimes([]);
      return;
    }
    
    const generateAvailableTimes = () => {
      const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'];
      
      // Randomly remove some times to simulate booked slots
      const availableCount = Math.floor(Math.random() * 4) + 3;
      const shuffled = [...timeSlots].sort(() => 0.5 - Math.random());
      
      setAvailableTimes(shuffled.slice(0, availableCount));
    };
    
    generateAvailableTimes();
  }, [inspectionDate]);
  
  const formatDateDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const formatTimeDisplay = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };
  
  const handleDateClick = (dateString) => {
    if (onFormChange) {
      onFormChange('inspectionDate', dateString);
    }
  };
  
  const handleTimeClick = (timeString) => {
    if (onFormChange) {
      onFormChange('inspectionTime', timeString);
    }
  };
  
  const handleNumberOfPeopleChange = (e) => {
    if (onFormChange) {
      onFormChange('numberOfPeople', e.target.value);
    }
  };
  
  const handleNotesChange = (e) => {
    if (onFormChange) {
      onFormChange('inspectionNotes', e.target.value);
    }
  };
  
  return (
    <div className="space-y-8 mb-8 pb-8 border-b border-[#e2e8f0]">
      {/* Form Section Heading */}
      <div>
        <h3 className="text-xl font-semibold text-[#0e1f42] mb-4 flex items-center gap-2">
          <div className="w-1 h-6 bg-[#9f7539] rounded"></div>
          Inspection Details
        </h3>
      </div>
      
      {/* Available Dates Calendar */}
      <div className="form-group">
        <label className="font-semibold text-[#0e1f42] mb-2 block">
          Select Available Date *
        </label>
        
        {loadingDates ? (
          <div className="flex items-center justify-center p-8 bg-[#f8fafc] rounded-xl border border-dashed border-[#e2e8f0]">
            <i className="fas fa-spinner fa-spin text-[#9f7539] mr-3"></i>
            <span className="text-[#64748b]">Loading available dates...</span>
          </div>
        ) : availableDates.length === 0 ? (
          <div className="text-center p-8 bg-[#f8fafc] rounded-xl border border-dashed border-[#e2e8f0]">
            <i className="fas fa-calendar-times text-3xl text-[#64748b] mb-3"></i>
            <h4 className="text-[#0e1f42] font-semibold mb-1">No Available Dates</h4>
            <p className="text-[#64748b]">Please check back later for available inspection dates</p>
          </div>
        ) : (
          <>
            {/* Dates Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
              {availableDates.map((dateInfo) => {
                const date = dateInfo.dateObj;
                const day = date.getDate();
                const month = date.toLocaleDateString('en-US', { month: 'short' });
                const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
                const isSelected = inspectionDate === dateInfo.date;
                
                let statusClass = '';
                let statusBadge = '';
                
                if (dateInfo.availableSlots <= 2) {
                  statusClass = 'border-[#f59e0b] bg-[rgba(245,158,11,0.05)]';
                  statusBadge = (
                    <div className="text-xs font-bold bg-[#f59e0b] text-white px-2 py-1 rounded-full mt-1">
                      {dateInfo.availableSlots} left
                    </div>
                  );
                } else if (dateInfo.isNextDay) {
                  statusClass = 'border-[#10b981] bg-[rgba(16,185,129,0.05)]';
                  statusBadge = (
                    <div className="text-xs font-bold bg-[#10b981] text-white px-2 py-1 rounded-full mt-1">
                      Next Day
                    </div>
                  );
                }
                
                return (
                  <button
                    key={dateInfo.date}
                    type="button"
                    onClick={() => handleDateClick(dateInfo.date)}
                    className={`p-4 text-center border-2 rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                      isSelected 
                        ? 'border-[#9f7539] bg-gradient-to-br from-[#9f7539] to-[#b58a4a] text-white shadow-md' 
                        : `border-[#e2e8f0] bg-white text-[#0e1f42] ${statusClass}`
                    }`}
                  >
                    <div className={`text-2xl font-bold ${isSelected ? 'text-white' : 'text-[#0e1f42]'}`}>
                      {day}
                    </div>
                    <div className={`text-sm uppercase tracking-wide ${isSelected ? 'text-white/90' : 'text-[#64748b]'}`}>
                      {month}
                    </div>
                    <div className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-[#64748b]'}`}>
                      {weekday}
                    </div>
                    {!isSelected && statusBadge}
                  </button>
                );
              })}
            </div>
            
            {/* Selected Date Display */}
            {inspectionDate && (
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9] rounded-xl border-l-4 border-[#9f7539]">
                <i className="fas fa-calendar-check text-[#9f7539] text-lg"></i>
                <div>
                  <span className="font-semibold text-[#0e1f42]">Selected: </span>
                  <span className="text-[#334155]">{formatDateDisplay(inspectionDate)}</span>
                </div>
              </div>
            )}
            
            <input
              type="hidden"
              name="inspectionDate"
              value={inspectionDate}
              required
            />
          </>
        )}
      </div>
      
      {/* Available Time Slots */}
      <div className="form-group">
        <label className="font-semibold text-[#0e1f42] mb-2 block">
          Select Available Time *
        </label>
        
        {!inspectionDate ? (
          <div className="flex items-center justify-center p-8 bg-[#f8fafc] rounded-xl border border-dashed border-[#e2e8f0]">
            <i className="fas fa-clock text-[#9f7539] mr-3"></i>
            <span className="text-[#64748b]">Please select a date first</span>
          </div>
        ) : availableTimes.length === 0 ? (
          <div className="text-center p-8 bg-[#f8fafc] rounded-xl border border-dashed border-[#e2e8f0]">
            <i className="fas fa-clock text-3xl text-[#64748b] mb-3"></i>
            <h4 className="text-[#0e1f42] font-semibold mb-1">No Available Times</h4>
            <p className="text-[#64748b]">All time slots are booked for this date</p>
          </div>
        ) : (
          <>
            {/* Time Slots Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
              {availableTimes.map((time) => {
                const isSelected = inspectionTime === time;
                
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleTimeClick(time)}
                    className={`p-4 text-center border-2 rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                      isSelected 
                        ? 'border-[#9f7539] bg-gradient-to-br from-[#9f7539] to-[#b58a4a] text-white shadow-md' 
                        : 'border-[#e2e8f0] bg-white text-[#0e1f42] hover:border-[#9f7539]'
                    }`}
                  >
                    <div className={`font-semibold ${isSelected ? 'text-white' : 'text-[#0e1f42]'}`}>
                      {formatTimeDisplay(time)}
                    </div>
                  </button>
                );
              })}
            </div>
            
            <input
              type="hidden"
              name="inspectionTime"
              value={inspectionTime}
              required
            />
          </>
        )}
        
        {/* Time Slots Info */}
        <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-[rgba(159,117,57,0.08)] to-[rgba(181,138,74,0.08)] rounded-lg border-l-4 border-[#9f7539] mt-4">
          <i className="fas fa-info-circle text-[#9f7539] text-lg mt-0.5"></i>
          <div className="text-sm text-[#334155]">
            Each inspection slot is 1 hour 30 min between 9:00 AM - 5:00 PM, Monday to Friday
          </div>
        </div>
      </div>
      
      {/* Number of People */}
      <div className="form-group">
        <label htmlFor="numberOfPeople" className="font-semibold text-[#0e1f42] mb-2 block">
          Number of people attending *
        </label>
        <select
          id="numberOfPeople"
          value={numberOfPeople}
          onChange={handleNumberOfPeopleChange}
          required
          className="w-full p-3 border border-[#e2e8f0] rounded-lg focus:border-[#9f7539] focus:ring-2 focus:ring-[#9f7539]/20 transition-colors"
        >
          <option value="">Select number</option>
          <option value="1">1 person</option>
          <option value="2">2 people</option>
          <option value="3">3 people</option>
          <option value="4">4 people</option>
          <option value="5">5+ people</option>
        </select>
      </div>
      
      {/* Additional Notes */}
      <div className="form-group">
        <label htmlFor="inspectionNotes" className="font-semibold text-[#0e1f42] mb-2 block">
          Additional Notes (Optional)
        </label>
        <textarea
          id="inspectionNotes"
          value={inspectionNotes}
          onChange={handleNotesChange}
          rows={4}
          placeholder="Any specific areas you'd like to focus on during the inspection..."
          className="w-full p-3 border border-[#e2e8f0] rounded-lg focus:border-[#9f7539] focus:ring-2 focus:ring-[#9f7539]/20 transition-colors resize-none"
        />
      </div>
    </div>
  );
};

export default InspectionForm;