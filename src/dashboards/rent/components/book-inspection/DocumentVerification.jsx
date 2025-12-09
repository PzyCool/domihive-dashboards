// src/dashboards/rent/components/book-inspection/DocumentVerification.jsx
import React from 'react';

const DocumentVerification = () => {
  return (
    <div className="mb-10 pb-8 border-b border-[#e2e8f0]">
      <h3 className="text-xl font-semibold text-[#0e1f42] mb-4 flex items-center gap-2">
        <div className="w-1 h-6 bg-[#9f7539] rounded"></div>
        Required Documents for Verification
      </h3>
      
      {/* Important Notice */}
      <div className="bg-gradient-to-r from-[rgba(59,130,246,0.08)] to-[rgba(99,102,241,0.08)] p-4 rounded-lg border-l-4 border-[#3b82f6] flex items-start gap-3 mb-6">
        <i className="fas fa-info-circle text-[#3b82f6] text-lg mt-0.5"></i>
        <div className="text-sm text-[#334155]">
          <strong className="text-[#1e40af]">Important:</strong> Please bring the following original documents to your inspection for verification. 
          We will verify them on-site and return them immediately. No copies will be retained.
        </div>
      </div>
      
      {/* Documents Checklist */}
      <div className="bg-[#f8fafc] p-6 rounded-xl border border-[rgba(14,31,66,0.1)] mb-6">
        {/* Required Document 1 */}
        <div className="pb-4 mb-4 border-b border-[rgba(0,0,0,0.08)]">
          <div className="ml-4">
            <div className="text-[#0e1f42] font-semibold mb-1">
              Government Issued ID *
            </div>
            <div className="text-[#64748b] text-sm italic">
              (International Passport, Driver's License, National ID Card, or Voter's Card)
            </div>
          </div>
        </div>
        
        {/* Required Document 2 */}
        <div className="pb-4 mb-4 border-b border-[rgba(0,0,0,0.08)]">
          <div className="ml-4">
            <div className="text-[#0e1f42] font-semibold mb-1">
              Proof of Income *
            </div>
            <div className="text-[#64748b] text-sm italic">
              (Recent pay stub, employment letter, or 3 months bank statements)
            </div>
          </div>
        </div>
        
        {/* Optional Document */}
        <div className="pb-4">
          <div className="ml-4">
            <div className="text-[#334155] font-semibold mb-1">
              Additional Documents (Optional)
            </div>
            <div className="text-[#64748b] text-sm italic">
              (Reference letters, additional IDs, or any other supporting documents)
            </div>
          </div>
        </div>
      </div>

      {/* Verification Process */}
      <div className="bg-gradient-to-r from-[rgba(16,185,129,0.05)] to-[rgba(5,150,105,0.05)] p-6 rounded-xl border border-[rgba(16,185,129,0.2)]">
        <h4 className="text-lg font-semibold text-[#0e1f42] mb-4 flex items-center gap-2">
          <div className="w-6 h-6 bg-[#10b981] text-white rounded-full flex items-center justify-center text-sm font-bold">
            ✓
          </div>
          Verification Process:
        </h4>
        
        <ul className="space-y-4">
          <li className="flex items-start gap-3 text-[#334155]">
            <i className="fas fa-clipboard-check text-[#10b981] text-lg mt-0.5"></i>
            <span>Bring original documents to your inspection appointment</span>
          </li>
          <li className="flex items-start gap-3 text-[#334155]">
            <i className="fas fa-search text-[#10b981] text-lg mt-0.5"></i>
            <span>Our team will verify documents on-site</span>
          </li>
          <li className="flex items-start gap-3 text-[#334155]">
            <i className="fas fa-undo text-[#10b981] text-lg mt-0.5"></i>
            <span>Documents returned to you immediately after verification</span>
          </li>
          <li className="flex items-start gap-3 text-[#334155]">
            <i className="fas fa-lock text-[#10b981] text-lg mt-0.5"></i>
            <span>No digital copies stored - your data remains with you</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentVerification;