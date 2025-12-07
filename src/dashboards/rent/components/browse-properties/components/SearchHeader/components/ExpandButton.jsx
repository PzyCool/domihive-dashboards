import React from 'react';

const ExpandButton = ({ isExpanded, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) onClick();
  };
  
  return (
    <button
      type="button" // IMPORTANT
      onClick={handleClick}
      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      title={isExpanded ? "Collapse filters" : "Expand filters"}
    >
      <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} text-gray-700`}></i>
    </button>
  );
};

export default ExpandButton;