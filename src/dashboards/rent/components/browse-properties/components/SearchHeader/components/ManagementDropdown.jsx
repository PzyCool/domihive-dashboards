import React, { useState } from 'react';

const ManagementDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const options = [
    { value: 'all', label: 'All Management', color: '#9f7539' },
    { value: 'domihive_managed', label: 'DomiHive Managed', color: '#9f7539' },
    { value: 'estate_managed', label: 'Estate Managed', color: '#0e1f42' },
    { value: 'landlord_managed', label: 'Landlord Managed', color: '#10b981' }
  ];
  
  const selectedOption = options.find(opt => opt.value === value) || options[0];
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors text-sm"
      >
        <div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: selectedOption.color }}
        ></div>
        <span className="font-medium">{selectedOption.label}</span>
        <i className="fas fa-chevron-down text-xs text-gray-500"></i>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors"
            >
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: option.color }}
              ></div>
              <span className="text-sm">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagementDropdown;