import React from 'react';

const PetPolicyToggle = ({ allowed = false, onChange }) => {
  const handleToggle = () => {
    if (onChange) {
      onChange(!allowed);
    }
  };

  return (
    <div className="pet-policy-toggle">
      <div className="flex items-center justify-between mb-3">
        <p className="font-medium text-gray-700 flex items-center gap-2 text-sm">
          <i className="fas fa-paw text-[#9f7539]"></i>
          Pet Policy
        </p>
        
        {/* Toggle switch */}
        <button
          type="button"
          onClick={handleToggle}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors
            ${allowed ? 'bg-[#9f7539]' : 'bg-gray-300'}
          `}
        >
          <span className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${allowed ? 'translate-x-6' : 'translate-x-1'}
          `} />
        </button>
      </div>
      
      <div className="text-xs text-gray-600">
        {allowed ? 'Pets are allowed in this property' : 'No pets allowed in this property'}
      </div>
    </div>
  );
};

export default PetPolicyToggle;