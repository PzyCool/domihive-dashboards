import React, { useState, useRef, useEffect } from 'react';

const PriceSlider = ({ min = 0, max = 10000000, onPriceChange }) => {
  const [value, setValue] = useState(max);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const formatNaira = (amount) => {
    if (amount >= 1000000) {
      return `₦${(amount / 1000000).toFixed(1)}M/year`;
    }
    return `₦${(amount / 1000).toFixed(0)}K/year`;
  };

  const calculateValueFromPosition = (clientX) => {
    if (!sliderRef.current) return min;
    
    const sliderRect = sliderRef.current.getBoundingClientRect();
    const position = (clientX - sliderRect.left) / sliderRect.width;
    const calculatedValue = min + position * (max - min);
    return Math.round(Math.max(min, Math.min(max, calculatedValue)));
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const newValue = calculateValueFromPosition(e.clientX);
    setValue(newValue);
    if (onPriceChange) onPriceChange(newValue);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const newValue = calculateValueFromPosition(e.clientX);
      setValue(newValue);
      if (onPriceChange) onPriceChange(newValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [isDragging, onPriceChange]);

  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="price-slider">
      <p className="font-medium text-gray-700 mb-4 flex items-center gap-2 text-sm">
        <i className="fas fa-tag text-[#9f7539]"></i>
        Max Price: <span className="font-bold text-[#9f7539]">{formatNaira(value)}</span>
      </p>

      {/* Slider */}
      <div className="relative mb-2">
        {/* Track */}
        <div 
          ref={sliderRef}
          className="h-2 bg-gray-200 rounded-full cursor-pointer"
          onMouseDown={handleMouseDown}
        >
          {/* Filled Portion */}
          <div 
            className="absolute h-2 bg-[#9f7539] rounded-full"
            style={{ width: `${percent}%` }}
          ></div>
          
          {/* Thumb (Circle) */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-white border-2 border-[#9f7539] rounded-full shadow-md cursor-grab active:cursor-grabbing"
            style={{ left: `${percent}%`, marginLeft: '-10px' }}
            onMouseDown={handleMouseDown}
          ></div>
        </div>
      </div>

      {/* Min/Max Labels */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>{formatNaira(min)}</span>
        <span>{formatNaira(max)}</span>
      </div>
    </div>
  );
};

export default PriceSlider;