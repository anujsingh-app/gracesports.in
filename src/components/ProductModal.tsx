import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { createProductWhatsAppUrl, DISPLAY_PHONE } from '../utils/whatsapp';
import {
  X,
  MessageCircle,
  PhoneCall,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Factory,
  Sparkles,
  Share2
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToInquiry: (product: Product, quantity: number) => void;
  isInInquiry?: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToInquiry,
  isInInquiry = false,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.classList.add('modal-open');
      setQuantity(1);
      setActiveImage('');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [product]);

  if (!product) return null;

  const currentImage = activeImage || product.image;
  const whatsappUrl = createProductWhatsAppUrl(product, quantity);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `${product.name} - ₹${product.price} | Grace Sports Table Tennis`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Container in Liquid Glass */}
      <div
        className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl bg-[#0B0F19] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(229,32,44,0.15)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Controls */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/[0.08] bg-white/[0.02]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-red-400 font-bold truncate">
              {product.category}
            </span>
            {product.badge && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-red-600/20 text-red-400 border border-red-500/30 shrink-0">
                <ShieldCheck className="w-3 h-3" />
                <span>{product.badge}</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] border border-white/[0.08] transition-all cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
              title="Share Product"
              aria-label="Share product"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] border border-white/[0.08] transition-all cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
              title="Close modal"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 max-h-[85vh] overflow-y-auto overscroll-contain">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            {/* Left: Product Media Gallery */}
            <div className="md:col-span-6 space-y-3.5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/[0.08]">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-red-600 text-white shadow-lg">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Gallery Thumbnails — horizontal scroll on mobile */}
              {product.galleryImages && product.galleryImages.length > 0 && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                  <button
                    onClick={() => setActiveImage(product.image)}
                    className={`relative w-16 h-14 sm:w-20 sm:h-16 rounded-xl overflow-hidden border transition-all cursor-pointer shrink-0 ${
                      currentImage === product.image ? 'border-red-500 scale-105' : 'border-white/10 opacity-70'
                    }`}
                  >
                    <img src={product.image} alt="main" className="w-full h-full object-cover" />
                  </button>
                  {product.galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-16 h-14 sm:w-20 sm:h-16 rounded-xl overflow-hidden border transition-all cursor-pointer shrink-0 ${
                        currentImage === img ? 'border-red-500 scale-105' : 'border-white/10 opacity-70'
                      }`}
                    >
                      <img src={img} alt={`gallery ${i}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                <div className="p-2 sm:p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <Factory className="w-4 h-4 mx-auto text-red-400 mb-1" />
                  <span className="text-slate-300 font-semibold block text-[10px] sm:text-[11px]">Factory Direct</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500">Meerut Hub</span>
                </div>
                <div className="p-2 sm:p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <Truck className="w-4 h-4 mx-auto text-red-400 mb-1" />
                  <span className="text-slate-300 font-semibold block text-[10px] sm:text-[11px]">All-India Freight</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500">Wooden Crate</span>
                </div>
                <div className="p-2 sm:p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <ShieldCheck className="w-4 h-4 mx-auto text-red-400 mb-1" />
                  <span className="text-slate-300 font-semibold block text-[10px] sm:text-[11px]">Warranty</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-500">Genuine Spares</span>
                </div>
              </div>
            </div>

            {/* Right: Specifications & Direct WhatsApp Order */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4 sm:space-y-6">
              <div>
                <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {product.name}
                </h2>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mt-2 sm:mt-3 pb-3 sm:pb-4 border-b border-white/[0.08]">
                  <span className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
                    {product.price === 0 ? 'FREE DOWNLOAD' : `₹${(product.price * quantity).toLocaleString('en-IN')}`}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm sm:text-base text-slate-400 line-through">
                      ₹{(product.originalPrice * quantity).toLocaleString('en-IN')}
                    </span>
                  )}
                  {quantity > 1 && (
                    <span className="text-xs text-red-400 font-mono">
                      (₹{product.price.toLocaleString('en-IN')} × {quantity})
                    </span>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-3 mt-3.5 sm:mt-4">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                    Units:
                  </span>
                  <div className="flex items-center rounded-xl bg-white/[0.05] border border-white/[0.1] p-0.5">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.1] cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 sm:w-10 text-center text-sm font-bold text-white font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.1] cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-400 truncate">
                    Bulk rates for 2+ units
                  </span>
                </div>

                {/* Primary WhatsApp Action & Multi-Quote */}
                <div className="space-y-2.5 mt-4 pt-3 border-t border-white/[0.08]">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#CB2522] via-[#CB2522] to-[#b01e1b] hover:from-[#d82d29] hover:to-[#CB2522] text-white font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(203,37,34,0.4)] hover:shadow-[0_4px_30px_rgba(203,37,34,0.6)] transition-all transform active:scale-95 text-center cursor-pointer min-h-[48px]"
                  >
                    <MessageCircle className="w-5 h-5 fill-white shrink-0" />
                    <span>Order / Inquire on WhatsApp</span>
                  </a>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => {
                        onAddToInquiry(product, quantity);
                      }}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer min-h-[44px] ${
                        isInInquiry
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : 'bg-white/[0.05] hover:bg-white/[0.09] text-slate-200 border-white/[0.1]'
                      }`}
                    >
                      {isInInquiry ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      <span>{isInInquiry ? 'In Quote List' : 'Add to Multi Quote'}</span>
                    </button>

                    <a
                      href="tel:+918791864565"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] text-slate-300 hover:text-white border border-white/[0.08] text-xs font-semibold transition-all min-h-[44px]"
                    >
                      <PhoneCall className="w-4 h-4 text-red-400 shrink-0" />
                      <span>Call Factory</span>
                    </a>
                  </div>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-4">
                  {product.description}
                </p>

                {/* Technical Specifications Table */}
                <div className="mt-5 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-red-400" />
                    Equipment Specifications
                  </h4>
                  <div className="rounded-xl overflow-hidden border border-white/[0.07] bg-white/[0.02] divide-y divide-white/[0.05] text-xs">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between px-3 py-2 sm:px-3.5 sm:py-2.5">
                        <span className="text-slate-400 font-medium">{spec.label}</span>
                        <span className="text-white font-semibold text-right max-w-[60%]">{spec.value}</span>
                      </div>
                    ))}
                    {product.dimensions && (
                      <div className="flex justify-between px-3 py-2 sm:px-3.5 sm:py-2.5">
                        <span className="text-slate-400 font-medium">Dimensions</span>
                        <span className="text-white font-semibold">{product.dimensions}</span>
                      </div>
                    )}
                    {product.weight && (
                      <div className="flex justify-between px-3 py-2 sm:px-3.5 sm:py-2.5">
                        <span className="text-slate-400 font-medium">Net Weight</span>
                        <span className="text-white font-semibold">{product.weight}</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 text-center pt-4">
                  Direct factory supply by Vardhan Mashi & Grace Sports technical team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
