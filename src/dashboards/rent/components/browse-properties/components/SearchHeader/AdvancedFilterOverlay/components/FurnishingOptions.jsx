import React from 'react';

const FurnishingOptions = ({ selected = '', onChange }) => {
  const furnishingOptions = [
    { id: 'furnished', label: 'Full', icon: 'couch', title: 'Fully Furnished' },
    { id: 'semi_furnished', label: 'Semi', icon: 'chair', title: 'Semi-Furnished' },
    { id: 'unfurnished', label: 'None', icon: 'box-open', title: 'Unfurnished' }
  ];

  const handleSelect = (furnishingId) => {
    if (onChange) {
      onChange(selected === furnishingId ? '' : furnishingId);
    }
  };

  return (
    <div className="furnishing-options">
      <p className="font-medium text-gray-700 mb-3 flex items-center gap-2 text-sm">
        <i className="fas fa-couch text-[#9f7539]"></i>
        Furnishing
      </p>
      
      <div className="flex gap-2">
        {furnishingOptions.map((option) => {
          const isSelected = selected === option.id;
          
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              title={option.title}
              className={`
                flex-1 p-2 rounded-lg border text-sm font-medium transition-all duration-150
                flex flex-col items-center justify-center gap-1
                ${isSelected 
                  ? 'bg-[#9f7539] text-white border-[#9f7539] shadow-sm' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }
              `}
            >
              <i className={`fas fa-${option.icon}`}></i>
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FurnishingOptions;