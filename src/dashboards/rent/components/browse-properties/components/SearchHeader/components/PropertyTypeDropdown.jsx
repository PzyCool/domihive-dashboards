import React, { useState } from 'react';

const PropertyTypeDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const options = [
    { id: 'all', label: 'All Types' },
    { id: 'apartment', label: 'Apartment' },
    { id: 'duplex', label: 'Duplex' },
    { id: 'bungalow', label: 'Bungalow' },
    { id: 'self_contain', label: 'Self Contain' },
    { id: 'mini_flat', label: 'Mini Flat' },
    { id: 'penthouse', label: 'Penthouse' }
  ];
  
  const selectedLabel = options.find(opt => opt.id === value)?.label || 'All Types';
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left rounded-lg border border-gray-300 hover:border-gray-400 transition-colors text-sm bg-white"
      >
        <div className="flex justify-between items-center">
          <span className="truncate">{selectedLabel}</span>
          <i className="fas fa-chevron-down text-xs text-gray-500"></i>
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
              className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors text-sm"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyTypeDropdown;