import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { createProductWhatsAppUrl } from '../utils/whatsapp';
import {
  MessageCircle,
  Eye,
  Plus,
  Check,
  ShieldCheck,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToInquiry: (product: Product) => void;
  isInInquiry?: boolean;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToInquiry,
  isInInquiry = false,
  index = 0,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const whatsappUrl = createProductWhatsAppUrl(product);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.45,
        delay: (index % 4) * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group relative flex flex-col h-full rounded-2xl bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent border border-white/[0.08] hover:border-red-500/50 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_45px_-10px_rgba(229,32,44,0.3)] transition-all duration-300 overflow-hidden"
    >
      {/* Top Gloss Highlight Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-red-500/50 transition-colors" />

      {/* Image Container with Badges - Tap to Open on mobile/desktop */}
      <div
        onClick={() => onSelect(product)}
        className="relative aspect-[4/3] w-full overflow-hidden bg-black/40 cursor-pointer"
      >
        {/* Shimmer Skeleton Placeholder during image asset loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 z-0 bg-white/[0.04] animate-shimmer flex items-center justify-center">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06]" />
          </div>
        )}

        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-center hover-scale-img ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090C13] via-transparent to-black/30 pointer-events-none" />

        {/* Badges Container */}
        <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-start justify-between gap-2 pointer-events-none">
          <div className="flex flex-col gap-1.5">
            {product.badge && (
              <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-red-600/90 text-white shadow-lg backdrop-blur-md">
                <ShieldCheck className="w-3 h-3 text-white" />
                {product.badge}
              </span>
            )}
          </div>

          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-black/60 text-slate-300 border border-white/10 backdrop-blur-md">
            {product.category}
          </span>
        </div>

        {/* Quick View Button on Image Hover (desktop) */}
        <div className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/90 hover:bg-white text-slate-900 text-xs font-bold shadow-xl transform scale-95 hover:scale-100 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-red-600" />
            <span>Full Specs & Photos</span>
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-5">
        {/* Title */}
        <h3
          onClick={() => onSelect(product)}
          className="font-display text-xl sm:text-2xl font-bold tracking-wide text-white group-hover:text-red-400 transition-colors line-clamp-1 cursor-pointer"
        >
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-400 line-clamp-2 mt-1 sm:mt-1.5 mb-2.5 sm:mb-3 leading-relaxed">
          {product.shortDescription}
        </p>

        {/* Key Specs Pills */}
        <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-4">
          {product.specifications.slice(0, 2).map((spec, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.06] truncate max-w-full"
            >
              <strong className="text-slate-200">{spec.label}:</strong> <span className="truncate">{spec.value}</span>
            </span>
          ))}
        </div>

        {/* Price & Availability */}
        <div className="mt-auto pt-2.5 sm:pt-3 border-t border-white/[0.07] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">
              Direct Price / Quote
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-white tracking-wide">
                {product.price === 0 ? 'FREE' : `₹${product.price.toLocaleString('en-IN')}`}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {/* Quick Quote Add Button - >=44px Touch Target */}
          <button
            onClick={() => onAddToInquiry(product)}
            className={`p-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center ${
              isInInquiry
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-white/[0.04] hover:bg-white/[0.09] text-slate-300 hover:text-white border-white/[0.08]'
            }`}
            title={isInInquiry ? 'Already in Inquiry Quote' : 'Add to Multi-Product Quote'}
            aria-label={isInInquiry ? 'In Quote List' : 'Add to Inquiry Quote'}
          >
            {isInInquiry ? (
              <Check className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-2 gap-2 mt-3.5 sm:mt-4">
          <button
            onClick={() => onSelect(product)}
            className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-slate-200 border border-white/[0.08] transition-all cursor-pointer min-h-[44px]"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>Specs</span>
          </button>

          {/* Buy Now / Direct WhatsApp Redirect */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#CB2522] to-[#b01e1b] hover:from-[#d82d29] hover:to-[#CB2522] text-xs font-bold text-white shadow-[0_0_15px_rgba(203,37,34,0.35)] hover:shadow-[0_4px_20px_rgba(203,37,34,0.5)] transition-all transform active:scale-95 cursor-pointer min-h-[44px]"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>Buy on WA</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};
