import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText, Lock, RotateCcw } from 'lucide-react';
import { FACTORY_ADDRESS, OFFICIAL_EMAIL } from '../utils/whatsapp';

interface PolicyModalProps {
  policy: 'terms' | 'refund' | 'privacy' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policy, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (policy) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [policy]);

  if (!policy) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-[#0A0E18] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.08] bg-white/[0.02] shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 shrink-0">
              {policy === 'privacy' && <Lock className="w-5 h-5" />}
              {policy === 'refund' && <RotateCcw className="w-5 h-5" />}
              {policy === 'terms' && <FileText className="w-5 h-5" />}
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-2xl font-bold text-white uppercase tracking-wide">
                {policy === 'privacy' && 'Privacy Policy'}
                {policy === 'refund' && 'Refund and Returns Policy'}
                {policy === 'terms' && 'Terms & Conditions'}
              </h3>
              <span className="text-xs text-slate-400">
                Official Grace Sports Legal Documentation
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto overscroll-contain space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {policy === 'terms' && (
            <>
              <p className="font-semibold text-white">
                Effective Date: 1 May 2025 | Grace Sports Table Tennis
              </p>
              <h4 className="text-white font-bold text-base mt-4">1. Acceptance of Terms</h4>
              <p>
                By accessing Grace Sports' catalogue, inquiring about products, or placing offline purchase orders via WhatsApp or telephone, you confirm your acceptance of these Terms and Conditions.
              </p>
              <h4 className="text-white font-bold text-base mt-4">2. Product Orders & Dispatches</h4>
              <p>
                All orders are subject to stock availability and manufacturing schedules. Grace Sports provides direct factory quotes. Due to fluctuating freight charges on heavy table tennis tables (120kg+), final delivered invoices include negotiated carrier logistics.
              </p>
              <h4 className="text-white font-bold text-base mt-4">3. Intellectual Property</h4>
              <p>
                All brand marks, product certifications, photographs, and table model trademarks ("Sonic Pro", "Sonic X", "Grace Sport GS") are proprietary to Grace Sports Meerut.
              </p>
              <h4 className="text-white font-bold text-base mt-4">4. Governing Law</h4>
              <p>
                These terms are governed by the laws of Meerut, Uttar Pradesh, India.
              </p>
            </>
          )}

          {policy === 'refund' && (
            <>
              <p className="font-semibold text-white">
                Effective Date: 1 May 2025 | Grace Sports Table Tennis
              </p>
              <h4 className="text-white font-bold text-base mt-4">1. Returns & Exchanges Eligibility</h4>
              <p>
                Grace Sports inspects all table tennis tables, tournament nets, and 40+ ABS balls prior to wooden-crate packaging. In the unlikely event of transit damage, clients must report within 7 days of receiving the consignment with photos/videos to {OFFICIAL_EMAIL} or via WhatsApp.
              </p>
              <h4 className="text-white font-bold text-base mt-4">2. Transit Damage & Replacement</h4>
              <p>
                For defective or transit-damaged items, Grace Sports will arrange immediate replacement components (table wings, wheel assemblies, net clamps) at zero extra cost.
              </p>
              <h4 className="text-white font-bold text-base mt-4">3. Return Address</h4>
              <p>
                Consignments must be shipped back in original packaging to our factory at: <br />
                <strong>{FACTORY_ADDRESS}</strong>
              </p>
            </>
          )}

          {policy === 'privacy' && (
            <>
              <p className="font-semibold text-white">
                Effective Date: 1 May 2025 | Grace Sports Table Tennis
              </p>
              <h4 className="text-white font-bold text-base mt-4">1. Information We Collect</h4>
              <p>
                We only collect information voluntarily provided by coaches, academies, and players when initiating WhatsApp inquiries, telephone calls, or quote requests (such as name, academy location, and contact numbers).
              </p>
              <h4 className="text-white font-bold text-base mt-4">2. No Payment Card Storage</h4>
              <p>
                Grace Sports does not store credit card or bank credentials on this web portal, as all transactions occur via direct offline invoicing and authorized banking rails.
              </p>
              <h4 className="text-white font-bold text-base mt-4">3. Contact</h4>
              <p>
                For any data privacy questions, contact our administrator at {OFFICIAL_EMAIL}.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-white/[0.02] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-white cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
