// src/dashboards/rent/components/property-details/components/tabs/ReviewsTab/ReviewFilters.jsx
import React, { useState } from 'react';

const ReviewFilters = () => {
  const [sortBy, setSortBy] = useState('most-recent');
  const [filters, setFilters] = useState({
    verifiedOnly: false,
    starFilters: [],
    hasPhotos: false
  });

  const sortOptions = [
    { id: 'most-recent', label: 'Most Recent' },
    { id: 'highest-rated', label: 'Highest Rated' },
    { id: 'lowest-rated', label: 'Lowest Rated' },
    { id: 'most-helpful', label: 'Most Helpful' }
  ];

  const starOptions = [
    { stars: 5, label: '5 stars' },
    { stars: 4, label: '4 stars & above' },
    { stars: 3, label: '3 stars & above' },
    { stars: 2, label: '2 stars & above' },
    { stars: 1, label: '1 star & above' }
  ];

  const toggleStarFilter = (stars) => {
    setFilters(prev => ({
      ...prev,
      starFilters: prev.starFilters.includes(stars)
        ? prev.starFilters.filter(s => s !== stars)
        : [...prev.starFilters, stars]
    }));
  };

  const clearFilters = () => {
    setFilters({
      verifiedOnly: false,
      starFilters: [],
      hasPhotos: false
    });
  };

  const activeFiltersCount = 
    (filters.verifiedOnly ? 1 : 0) + 
    filters.starFilters.length + 
    (filters.hasPhotos ? 1 : 0);

  return (
    <div className="review-filters mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h4 className="text-lg font-bold text-[#0e1f42]">Reviews</h4>
          <p className="text-[#64748b] text-sm">Filter and sort tenant reviews</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search in reviews..."
              className="pl-10 pr-4 py-2 border border-[#e2e8f0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#9f7539]/20 focus:border-[#9f7539]"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#64748b] absolute left-3 top-1/2 transform -translate-y-1/2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-[#e2e8f0] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#9f7539]/20 focus:border-[#9f7539]"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>
                  Sort by: {option.label}
                </option>
              ))}
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#64748b] absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Active Filters Count */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#9f7539] text-white rounded-lg text-sm font-medium">
            <span>{activeFiltersCount} active</span>
            <button
              onClick={clearFilters}
              className="hover:bg-white/20 rounded-full w-5 h-5 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        {/* Star Rating Filters */}
        {starOptions.map(option => (
          <button
            key={option.stars}
            onClick={() => toggleStarFilter(option.stars)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors duration-300 ${
              filters.starFilters.includes(option.stars)
                ? 'bg-[#9f7539] text-white border-[#9f7539]'
                : 'bg-white text-[#64748b] border-[#e2e8f0] hover:bg-[#f8fafc]'
            }`}
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-3 w-3 ${
                    i < option.stars
                      ? filters.starFilters.includes(option.stars)
                        ? 'text-white'
                        : 'text-[#9f7539]'
                      : 'text-gray-300'
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium">{option.label}</span>
          </button>
        ))}

        {/* Verified Only Toggle */}
        <button
          onClick={() => setFilters(prev => ({ ...prev, verifiedOnly: !prev.verifiedOnly }))}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors duration-300 ${
            filters.verifiedOnly
              ? 'bg-green-100 text-green-800 border-green-200'
              : 'bg-white text-[#64748b] border-[#e2e8f0] hover:bg-[#f8fafc]'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${filters.verifiedOnly ? 'text-green-600' : 'text-[#64748b]'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium">Verified only</span>
        </button>

        {/* With Photos Toggle */}
        <button
          onClick={() => setFilters(prev => ({ ...prev, hasPhotos: !prev.hasPhotos }))}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors duration-300 ${
            filters.hasPhotos
              ? 'bg-blue-100 text-blue-800 border-blue-200'
              : 'bg-white text-[#64748b] border-[#e2e8f0] hover:bg-[#f8fafc]'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${filters.hasPhotos ? 'text-blue-600' : 'text-[#64748b]'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium">With photos</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewFilters;