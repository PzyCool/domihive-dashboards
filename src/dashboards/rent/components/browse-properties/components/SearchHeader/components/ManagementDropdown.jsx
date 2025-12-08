import React, { useState } from 'react';

const ManagementDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Updated options focusing on estate vs non-estate
  const options = [
    { 
      value: 'all', 
      label: 'All Properties', 
      description: 'Show all properties',
      icon: 'fas fa-layer-group',
      color: '#9f7539'
    },
    { 
      value: 'estate_property', 
      label: 'Estate Properties', 
      description: 'Gated communities & estates',
      icon: 'fas fa-building-shield',
      color: '#0e1f42'
    },
    { 
      value: 'non_estate', 
      label: 'Non-Estate Properties', 
      description: 'Individual houses & apartments',
      icon: 'fas fa-house-user',
      color: '#10b981'
    }
  ];
  
  const selectedOption = options.find(opt => opt.value === value) || options[0];
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:border-gray-400 bg-white transition-colors text-sm min-w-[140px] justify-between"
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: selectedOption.color }}
          ></div>
          <span className="font-medium truncate">{selectedOption.label}</span>
        </div>
        <i className="fas fa-chevron-down text-xs text-gray-500 flex-shrink-0"></i>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-3 py-2 border-b border-gray-100">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Property Type
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Filter by estate or individual properties
            </div>
          </div>
          
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full flex items-start gap-3 px-3 py-3 hover:bg-gray-50 transition-colors ${
                option.value === selectedOption.value ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: option.color }}
                ></div>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <i className={`${option.icon} text-sm text-gray-700`}></i>
                  <span className="font-medium text-gray-900">{option.label}</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">{option.description}</div>
              </div>
              {option.value === selectedOption.value && (
                <i className="fas fa-check text-blue-600 text-sm"></i>
              )}
            </button>
          ))}
          
          <div className="border-t border-gray-100 mt-2 pt-2 px-3">
            <div className="text-xs text-gray-500 italic">
              All properties managed by DomiHive
            </div>
          </div>
        </div>
      )}
      
      {/* Close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default ManagementDropdown;