import React from 'react';

const FilterBadge = ({ count, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault(); // Prevent any default behavior
    e.stopPropagation(); // Stop event bubbling
    if (onClick) onClick();
  };
  
  return (
    <button
      type="button" // IMPORTANT: Add this
      onClick={handleClick}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
    >
      <i className="fas fa-filter text-gray-700"></i>
      <span className="text-sm font-medium text-gray-900">
        Filters
        {count > 0 && (
          <span className="ml-1 bg-[#9f7539] text-white text-xs rounded-full w-5 h-5 inline-flex items-center justify-center">
            {count}
          </span>
        )}
      </span>
    </button>
  );
};

export default FilterBadge;