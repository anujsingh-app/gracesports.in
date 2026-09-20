import React, { useState, useMemo, useEffect } from 'react';
import { CategoryId, Product } from '../types';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { ProductGridSkeleton } from './ProductCardSkeleton';
import { FadeIn } from './FadeIn';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';
import {
  SlidersHorizontal,
  Search,
  Filter,
  Check,
  Download,
  MessageCircle,
  ShieldCheck,
  Layers
} from 'lucide-react';

interface CatalogueViewProps {
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToInquiry: (product: Product) => void;
  inquiryProductIds: Set<string>;
}

export const CatalogueView: React.FC<CatalogueViewProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
  onAddToInquiry,
  inquiryProductIds,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Smooth shimmer-style skeleton loading state during category change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 280);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.shortDescription.toLowerCase().includes(q);
        const matchesSpecs = product.specifications.some(
          (s) => s.label.toLowerCase().includes(q) || s.value.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesDesc && !matchesSpecs) return false;
      }

      return true;
    }).sort((a, b) => {
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <FadeIn direction="up" distance={20}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 pb-6 sm:pb-8 border-b border-white/[0.08]">
            <div>
              <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-[8.5px] min-[380px]:text-[10px] sm:text-xs font-semibold text-red-400 uppercase tracking-tight sm:tracking-wider mb-2 max-w-full whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>DIRECT FACTORY CATALOGUE • NO ONLINE CART REQUIRED</span>
              </div>
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight">
                Grace Sport Catalogue
              </h1>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-1">
                Select products for individual WhatsApp orders or compile multiple items into your official quotation list.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <a
                href="/file assets/GS-APPAREL Catalogue.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] text-xs font-semibold transition-all min-h-[44px] text-center"
              >
                <Download className="w-4 h-4 text-red-400 shrink-0" />
                <span>Download PDF</span>
              </a>

              <a
                href={createGeneralWhatsAppUrl("Hello Grace Sport, I would like to request your complete dealer/academy wholesale price list.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#CB2522] to-[#b01e1b] hover:from-[#d82d29] hover:to-[#CB2522] text-white text-xs font-bold shadow-[0_0_15px_rgba(203,37,34,0.35)] transition-all min-h-[44px] text-center"
              >
                <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                <span>Wholesale WhatsApp</span>
              </a>
            </div>
          </div>
        </FadeIn>

        {/* Category Horizontal Pills with edge-to-edge mobile scroll */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 sm:py-6 no-scrollbar border-b border-white/[0.06] -mx-4 px-4 sm:mx-0 sm:px-0">
          {/* All Products pill */}
          <button
            onClick={() => onSelectCategory('all')}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold tracking-wide whitespace-nowrap transition-all min-h-[40px] shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(229,32,44,0.4)] border border-red-500'
                : 'bg-white/[0.03] text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
            }`}
          >
            <span>All Products</span>
          </button>

          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold tracking-wide whitespace-nowrap transition-all min-h-[40px] shrink-0 ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(229,32,44,0.4)] border border-red-500'
                    : 'bg-white/[0.03] text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
                }`}
              >
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Search & Results Summary */}
        <div className="py-4 sm:py-6 flex flex-wrap items-center justify-between gap-4">
          {/* Active Search / Filters summary */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              Showing <strong className="text-white">{filteredProducts.length}</strong> products
            </span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-950/40 text-red-300 border border-red-500/30 text-xs">
                Search: "{searchQuery}"
                <button
                  onClick={() => setSearchQuery('')}
                  className="hover:text-white font-bold ml-1 cursor-pointer"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <ProductGridSkeleton count={8} />
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 sm:py-20 text-center rounded-3xl bg-white/[0.02] border border-white/[0.06] space-y-4">
            <SlidersHorizontal className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="font-display text-2xl font-bold text-white">
              No products found matching criteria
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search query or switching category tabs.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('tables');
              }}
              className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold cursor-pointer hover:bg-red-500 transition-colors min-h-[44px]"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                index={idx}
                onSelect={onSelectProduct}
                onAddToInquiry={onAddToInquiry}
                isInInquiry={inquiryProductIds.has(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
