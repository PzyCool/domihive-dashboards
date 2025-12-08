import React from 'react';

const HorizontalScroll = ({ children }) => {
  return (
    <div className="horizontal-scroll-container px-6 py-4">
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {React.Children.map(children, (child, index) => (
          <div key={index} className="flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroll;