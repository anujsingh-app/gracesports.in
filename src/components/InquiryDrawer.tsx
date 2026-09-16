import React, { useState, useEffect } from 'react';
import { InquiryItem } from '../types';
import { createBulkInquiryWhatsAppUrl, DISPLAY_PHONE } from '../utils/whatsapp';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  PhoneCall,
  ClipboardList,
  Sparkles,
  ShieldCheck,
  Send
} from 'lucide-react';

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: InquiryItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearAll: () => void;
}

export const InquiryDrawer: React.FC<InquiryDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll,
}) => {
  const [customNotes, setCustomNotes] = useState('');

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const bulkWhatsappUrl = createBulkInquiryWhatsAppUrl(items, customNotes);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-fadeIn cursor-pointer"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-[#090D16] sm:border-l border-white/10 shadow-2xl flex flex-col animate-slideInRight">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 shrink-0">
                <ClipboardList className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide">
                  Bulk Inquiry Quote
                </h3>
                <span className="text-xs text-slate-400">
                  {items.length} {items.length === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {items.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-red-400 hover:bg-white/[0.04] transition-colors cursor-pointer min-h-[40px] flex items-center"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close quote drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Items List */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-3.5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-slate-500">
                  <ClipboardList className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-display text-xl font-bold text-white">
                    No Products In Quote Yet
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xs mt-1">
                    Click the '+' icon on any table, ball pack, or accessory to compile your custom academy quotation list.
                  </p>
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-red-500/30 transition-all flex gap-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-black/40 border border-white/[0.05] shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-white truncate">
                      {item.product.name}
                    </h5>
                    <div className="text-[11px] text-red-400 font-mono mt-0.5">
                      ₹{item.product.price.toLocaleString('en-IN')} each
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center rounded-xl bg-white/[0.05] border border-white/[0.08] p-0.5">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-2 text-slate-300 hover:text-white cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg hover:bg-white/[0.06]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-white font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-2 text-slate-300 hover:text-white cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg hover:bg-white/[0.06]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-bold text-white font-mono">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-600/10 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with WhatsApp Action */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 pb-6 sm:pb-5 border-t border-white/[0.08] bg-[#090D16] space-y-3.5 shrink-0">
              {/* Optional Custom Notes Input */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Delivery City / Academy Name (Optional)
                </label>
                <input
                  type="text"
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="e.g., Delivery to Delhi TT Academy, 2nd floor"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-white placeholder-slate-500 outline-none focus:border-red-500/40 focus:ring-2 focus:ring-red-500/20 transition-all min-h-[44px]"
                />
              </div>

              {/* Total Estimate */}
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="text-xs text-slate-400 block">Total Est. Value</span>
                  <span className="text-[10px] text-slate-500">Excl. freight & GST</span>
                </div>
                <span className="font-display text-3xl font-extrabold text-white">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <a
                  href={bulkWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#CB2522] via-[#CB2522] to-[#b01e1b] hover:from-[#d82d29] hover:to-[#CB2522] text-white font-bold text-sm shadow-[0_0_20px_rgba(203,37,34,0.4)] hover:shadow-[0_4px_25px_rgba(203,37,34,0.6)] transition-all cursor-pointer text-center min-h-[48px]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Quote via WhatsApp</span>
                </a>

                <a
                  href="tel:+918791864565"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] text-slate-300 hover:text-white border border-white/[0.08] text-xs font-semibold transition-all min-h-[44px]"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-red-400" />
                  <span>Call Us for Instant Verbal Quote</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
