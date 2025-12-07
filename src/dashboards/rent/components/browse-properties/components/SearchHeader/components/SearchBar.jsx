import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <i className="fas fa-search"></i>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search properties..."
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-[#9f7539] focus:ring-2 focus:ring-[#9f7539]/20 outline-none transition-all text-sm"
      />
    </div>
  );
};

export default SearchBar;