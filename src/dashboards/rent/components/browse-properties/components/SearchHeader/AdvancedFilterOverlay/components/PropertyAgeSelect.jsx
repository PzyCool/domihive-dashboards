import React from 'react';

const PropertyAgeSelect = ({ age = '', onChange }) => {
  const ageOptions = [
    { id: '', label: 'Any', icon: 'question' },
    { id: 'new', label: 'New', icon: 'home' },
    { id: 'modern', label: 'Modern', icon: 'building' },
    { id: 'established', label: 'Old', icon: 'landmark' }
  ];
  
  const handleSelect = (ageId) => {
    if (onChange) onChange(ageId);
  };
  
  return (
    <div className="property-age-select">
      <p className="font-medium text-gray-700 mb-3 flex items-center gap-2 text-sm">
        <i className="fas fa-building text-[#9f7539]"></i>
        Property Age
      </p>
      
      {/* 2x2 grid exactly like others */}
      <div className="grid grid-cols-2 gap-2">
        {ageOptions.map((option) => {
          const isSelected = age === option.id;
          
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              className={`
                p-2 rounded-lg border text-xs font-medium transition-all duration-150
                flex items-center justify-center gap-1
                ${isSelected 
                  ? 'bg-[#9f7539] text-white border-[#9f7539] shadow-sm' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }
              `}
            >
              <i className={`fas fa-${option.icon} ${isSelected ? 'text-white' : 'text-gray-500'}`}></i>
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyAgeSelect;