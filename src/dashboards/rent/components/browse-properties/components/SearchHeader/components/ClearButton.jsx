import React from 'react';

const ClearButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
    >
      <i className="fas fa-times mr-2"></i>
      Clear
    </button>
  );
};

export default ClearButton;