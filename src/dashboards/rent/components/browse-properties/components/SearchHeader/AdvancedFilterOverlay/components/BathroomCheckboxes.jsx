import React from 'react';

const BathroomCheckboxes = ({ selected = [], onChange }) => {
  const bathroomOptions = [
    { id: '1', label: '1', icon: 'bath' },
    { id: '2', label: '2', icon: 'bath' },
    { id: '3', label: '3', icon: 'bath' },
    { id: '4', label: '4+', icon: 'bath' }
  ];

  const handleToggle = (bathroomId) => {
    let newSelected;
    if (selected.includes(bathroomId)) {
      newSelected = selected.filter(id => id !== bathroomId);
    } else {
      newSelected = [...selected, bathroomId];
    }
    
    if (onChange) onChange(newSelected);
  };

  return (
    <div className="bathroom-checkboxes">
      <p className="font-medium text-gray-700 mb-3 flex items-center gap-2 text-sm">
        <i className="fas fa-bath text-[#9f7539]"></i>
        Bathrooms
      </p>
      
      <div className="grid grid-cols-2 gap-2">
        {bathroomOptions.map((option) => {
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

export default BathroomCheckboxes;