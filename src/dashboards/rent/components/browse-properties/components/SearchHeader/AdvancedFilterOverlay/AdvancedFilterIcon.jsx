// SearchHeader/components/AdvancedFilterIcon.jsx
import React from 'react';

const AdvancedFilterIcon = ({ isActive, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center justify-center w-10 h-10 rounded-lg
        transition-all duration-200
        ${isActive 
          ? 'bg-[#9f7539] text-white shadow-md' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
        }
      `}
      title="Advanced Filters"
    >
      <i className="fas fa-sliders-h text-lg"></i>
    </button>
  );
};

export default AdvancedFilterIcon;