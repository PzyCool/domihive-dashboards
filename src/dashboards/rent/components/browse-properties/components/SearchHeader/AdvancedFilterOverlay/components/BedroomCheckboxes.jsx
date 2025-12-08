import React from 'react';

const BedroomCheckboxes = ({ selected = [], onChange }) => {
  const bedroomOptions = [
    { id: '1', label: '1', icon: 'bed' },
    { id: '2', label: '2', icon: 'bed' },
    { id: '3', label: '3', icon: 'bed' },
    { id: '4', label: '4+', icon: 'bed' }
  ];

  const handleToggle = (bedroomId) => {
    let newSelected;
    if (selected.includes(bedroomId)) {
      newSelected = selected.filter(id => id !== bedroomId);
    } else {
      newSelected = [...selected, bedroomId];
    }
    
    if (onChange) onChange(newSelected);
  };

  return (
    <div className="bedroom-checkboxes">
      <p className="font-medium text-gray-700 mb-3 flex items-center gap-2 text-sm">
        <i className="fas fa-bed text-[#9f7539]"></i>
        Bedrooms
      </p>
      
      <div className="grid grid-cols-2 gap-2">
        {bedroomOptions.map((option) => {
          const isChecked = selected.includes(option.id);
          
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleToggle(option.id)}
              className={`
                p-2 rounded-lg border text-sm font-medium transition-all duration-150
                flex items-center justify-center gap-1
                ${isChecked 
                  ? 'bg-[#9f7539] text-white border-[#9f7539] shadow-sm' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }
              `}
            >
              <i className={`fas fa-${option.icon} ${isChecked ? 'text-white' : 'text-gray-500'}`}></i>
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BedroomCheckboxes;