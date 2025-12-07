import React, { useState } from 'react';

const AreaToggle = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const options = [
    { id: 'all', label: 'All Areas', icon: 'globe', color: '#9f7539' },
    { id: 'island', label: 'Lagos Island', icon: 'island-tropical', color: '#0e1f42' },
    { id: 'mainland', label: 'Lagos Mainland', icon: 'city', color: '#10b981' }
  ];
  
  const selectedOption = options.find(opt => opt.id === value) || options[0];
  
  const handleSelect = (optionId) => {
    onChange(optionId);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left rounded-lg border border-gray-300 hover:border-gray-400 transition-colors text-sm bg-white flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: selectedOption.color }}
          ></div>
          <span className="truncate">{selectedOption.label}</span>
        </div>
        <i className="fas fa-chevron-down text-xs text-gray-500"></i>
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {options.map((option) => (
            <button
              type="button"
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`
                w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors text-sm
                flex items-center gap-3
                ${value === option.id ? 'bg-gray-50' : ''}
              `}
            >
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: option.color }}
              ></div>
              <i className={`fas fa-${option.icon} text-gray-600 w-4 text-center`}></i>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AreaToggle;