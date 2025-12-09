// Update TermsAndConditions.jsx to accept props
const TermsAndConditions = ({ checked, onChange }) => {
  return (
    <div className="mb-8">
      <div className="bg-[#f8fafc] p-6 rounded-xl border border-[rgba(14,31,66,0.1)]">
        <label className="flex items-start gap-3 cursor-pointer select-none font-semibold text-[#0e1f42] mb-4">
          <input 
            type="checkbox" 
            id="agreeTerms" 
            checked={checked}
            onChange={onChange}
            className="hidden" 
          />
          <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all duration-300 mt-0.5 ${
            checked 
              ? 'bg-[#9f7539] border-[#9f7539]' 
              : 'border-[#64748b]'
          }`}>
            <i className={`fas fa-check text-white text-xs transition-opacity duration-300 ${
              checked ? 'opacity-100' : 'opacity-0'
            }`}></i>
          </div>
          <span>
            I agree to the{' '}
            <a href="#" className="text-[#9f7539] font-semibold hover:underline">
              Terms and Conditions
            </a>{' '}
            and understand that:
          </span>
        </label>
        
        <ul className="space-y-2 ml-8 mt-3">
          <li className="text-[#334155] flex items-start gap-2">
            <div className="text-[#9f7539] font-bold mt-0.5">•</div>
            <span>I must arrive on time for the scheduled inspection</span>
          </li>
          <li className="text-[#334155] flex items-start gap-2">
            <div className="text-[#9f7539] font-bold mt-0.5">•</div>
            <span>I need to bring a valid ID for verification</span>
          </li>
          <li className="text-[#334155] flex items-start gap-2">
            <div className="text-[#9f7539] font-bold mt-0.5">•</div>
            <span>Maximum inspection time is 30 minutes</span>
          </li>
          <li className="text-[#334155] flex items-start gap-2">
            <div className="text-[#9f7539] font-bold mt-0.5">•</div>
            <span>Photos and videos are allowed for personal reference only</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TermsAndConditions;