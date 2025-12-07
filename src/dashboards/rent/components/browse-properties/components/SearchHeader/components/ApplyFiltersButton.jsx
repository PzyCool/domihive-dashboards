import React from 'react';

const ApplyFiltersButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-[#9f7539] text-white rounded-lg hover:bg-[#b58a4a] transition-colors text-sm font-medium"
    >
      <i className="fas fa-check mr-2"></i>
      Apply
    </button>
  );
};

export default ApplyFiltersButton;