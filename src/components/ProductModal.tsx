import React, { useState, useEffect } from 'react';
import { Product, ProductVariation } from '../types';
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
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToInquiry: (product: Product, quantity: number, variation?: ProductVariation) => void;
  isInInquiry?: boolean;
  onNextProduct?: () => void;
  onPrevProduct?: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToInquiry,
  isInInquiry = false,
  onNextProduct,
  onPrevProduct,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);

  // Lock body scroll when modal is open and reset states
  useEffect(() => {
    if (product) {
      document.body.classList.add('modal-open');
      setQuantity(1);
      setActiveImage('');
      setSelectedVariation(product.variations && product.variations.length > 0 ? product.variations[0] : null);
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [product]);

  // Keyboard navigation for Next, Previous, and Escape
  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        onPrevProduct?.();
      } else if (e.key === 'ArrowRight') {
        onNextProduct?.();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onNextProduct, onPrevProduct, onClose]);

  if (!product) return null;

  const currentPrice = selectedVariation ? selectedVariation.price : product.price;
  const currentOriginalPrice = selectedVariation ? selectedVariation.originalPrice : product.originalPrice;
  const currentImage = activeImage || product.image;
  const whatsappUrl = createProductWhatsAppUrl(
    product,
    quantity,
    selectedVariation ? selectedVariation.name : undefined,
    currentPrice
  );

  const handleShare = () => {
    const shareName = selectedVariation ? `${product.name} (${selectedVariation.name})` : product.name;
    if (navigator.share) {
      navigator.share({
        title: shareName,
        text: `${shareName} - ₹${currentPrice} | Grace Sport Table Tennis`,
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
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      {/* Side floating navigation buttons for Desktop */}
      {onPrevProduct && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevProduct();
          }}
          className="hidden md:flex fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/80 hover:bg-red-600 border border-white/20 hover:border-red-500 text-white items-center justify-center transition-all shadow-[0_4px_20px_rgba(0,0,0,0.8)] hover:scale-110"
          title="Previous Product (Left Arrow)"
          aria-label="Previous product"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {onNextProduct && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNextProduct();
          }}
          className="hidden md:flex fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/80 hover:bg-red-600 border border-white/20 hover:border-red-500 text-white items-center justify-center transition-all shadow-[0_4px_20px_rgba(0,0,0,0.8)] hover:scale-110"
          title="Next Product (Right Arrow)"
          aria-label="Next product"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

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
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {onPrevProduct && (
              <button
                onClick={onPrevProduct}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.08] transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Previous Product"
                aria-label="Previous product"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {onNextProduct && (
              <button
                onClick={onNextProduct}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.08] transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"
                title="Next Product"
                aria-label="Next product"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] border border-white/[0.08] transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"
              title="Share Product"
              aria-label="Share product"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] border border-white/[0.08] transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"
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
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 border border-white/[0.08] flex items-center justify-center p-4 sm:p-6">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-contain object-center"
                />

                {/* Mobile chevrons over image for fast switching */}
                {onPrevProduct && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPrevProduct();
                    }}
                    className="md:hidden absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center justify-center shadow-lg active:scale-95"
                    aria-label="Previous product"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                {onNextProduct && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNextProduct();
                    }}
                    className="md:hidden absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center justify-center shadow-lg active:scale-95"
                    aria-label="Next product"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Gallery Thumbnails — horizontal scroll on mobile */}
              {product.galleryImages && product.galleryImages.length > 0 && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                  <button
                    onClick={() => setActiveImage(product.image)}
                    className={`relative w-16 h-14 sm:w-20 sm:h-16 rounded-xl overflow-hidden border transition-all shrink-0 bg-black/40 p-1 flex items-center justify-center ${
                      currentImage === product.image ? 'border-red-500 scale-105' : 'border-white/10 opacity-70'
                    }`}
                  >
                    <img src={product.image} alt={`${product.name} primary photo`} className="w-full h-full object-contain" />
                  </button>
                  {product.galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-16 h-14 sm:w-20 sm:h-16 rounded-xl overflow-hidden border transition-all shrink-0 bg-black/40 p-1 flex items-center justify-center ${
                        currentImage === img ? 'border-red-500 scale-105' : 'border-white/10 opacity-70'
                      }`}
                    >
                      <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-contain" />
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
                <h2 id="product-modal-title" className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {product.name}
                </h2>

                {/* Variations Selector (e.g. Weight Options) */}
                {product.variations && product.variations.length > 0 && (
                  <div className="mt-3.5 pb-3 border-b border-white/[0.08]">
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Select Weight:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {product.variations.map((v) => {
                        const isSelected = selectedVariation?.id === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setSelectedVariation(v)}
                            className={`px-3 py-2 rounded-xl text-left transition-all border ${
                              isSelected
                                ? 'bg-red-600/20 border-red-500 text-white shadow-[0_0_15px_rgba(229,32,44,0.3)] ring-1 ring-red-500'
                                : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.08] text-slate-300'
                            }`}
                          >
                            <span className="block text-xs font-bold">{v.name}</span>
                            <span className="block text-xs text-red-400 font-mono mt-0.5">₹{v.price.toLocaleString('en-IN')}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mt-2 sm:mt-3 pb-3 sm:pb-4 border-b border-white/[0.08]">
                  <span className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
                    {currentPrice === 0 ? 'FREE DOWNLOAD' : `₹${(currentPrice * quantity).toLocaleString('en-IN')}`}
                  </span>
                  {currentOriginalPrice && (
                    <span className="text-sm sm:text-base text-slate-400 line-through">
                      ₹{(currentOriginalPrice * quantity).toLocaleString('en-IN')}
                    </span>
                  )}
                  {quantity > 1 && (
                    <span className="text-xs text-red-400 font-mono">
                      (₹{currentPrice.toLocaleString('en-IN')} × {quantity})
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
                      className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.1] min-h-[38px] min-w-[38px] flex items-center justify-center"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 sm:w-10 text-center text-sm font-bold text-white font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.1] min-h-[38px] min-w-[38px] flex items-center justify-center"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Primary WhatsApp Action & Multi-Quote */}
                <div className="space-y-2.5 mt-4 pt-3 border-t border-white/[0.08]">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#CB2522] via-[#CB2522] to-[#b01e1b] hover:from-[#d82d29] hover:to-[#CB2522] text-white font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(203,37,34,0.4)] hover:shadow-[0_4px_30px_rgba(203,37,34,0.6)] transition-all transform active:scale-95 text-center min-h-[48px]"
                  >
                    <MessageCircle className="w-5 h-5 fill-white shrink-0" />
                    <span>Order / Inquire on WhatsApp</span>
                  </a>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => {
                        onAddToInquiry(product, quantity, selectedVariation || undefined);
                      }}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold border transition-all min-h-[44px] ${
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

                {product.description && (
                  <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Technical Specifications Table */}
                {((product.specifications && product.specifications.length > 0) || product.dimensions || product.weight) && (
                  <div className="mt-5 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-red-400" />
                      Equipment Specifications
                    </h4>
                    <div className="rounded-xl overflow-hidden border border-white/[0.07] bg-white/[0.02] divide-y divide-white/[0.05] text-xs">
                      {product.specifications?.map((spec, index) => (
                        <div key={spec.label} className="flex justify-between px-3 py-2 sm:px-3.5 sm:py-2.5">
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
