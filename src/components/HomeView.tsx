import React from 'react';
import { Hero } from './Hero';
import { TestimonialsSection } from './TestimonialsSection';
import { FadeIn } from './FadeIn';
import { ActiveTab, CategoryId, Product } from '../types';
import { CATEGORIES } from '../data/products';
import { Layers } from 'lucide-react';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectProduct: (product: Product) => void;
  onAddToInquiry: (product: Product) => void;
  inquiryProductIds: Set<string>;
  onSelectCategory: (category: CategoryId) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActiveTab,
  onSelectCategory,
}) => {
  return (
    <div>
      {/* 1. Hero Section */}
      <Hero
        onExploreCatalogue={() => {
          setActiveTab('catalogue');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        setActiveTab={setActiveTab}
      />

      {/* 2. Featured Categories Grid */}
      <section className="py-10 sm:py-16 sm:py-20 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={20}>
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-1.5 sm:space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] sm:text-xs font-semibold text-red-400 uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                <span>SHOP BY EQUIPMENT CATEGORY</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight">
                Featured Categories
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                Discover competition tables, tournament balls, academy barriers, and custom athletic jerseys.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {CATEGORIES.map((cat, idx) => (
              <FadeIn key={cat.id} delay={(idx % 6) * 0.06} direction="up" distance={16}>
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectCategory(cat.id);
                      setActiveTab('catalogue');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setActiveTab('catalogue');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.08] hover:border-red-500/50 backdrop-blur-xl aspect-[3/4] p-3 sm:p-4 flex flex-col justify-end transition-all duration-300 cursor-pointer shadow-lg hover:-translate-y-1"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-contain bg-black/20 p-2 sm:p-3 transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-85 group-hover:opacity-90" />

                  <div className="relative z-10">
                    <h4 className="font-display text-base sm:text-xl font-bold text-white group-hover:text-red-300 transition-colors uppercase leading-none">
                      {cat.name}
                    </h4>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Coach Reviews & Testimonials */}
      <TestimonialsSection />
    </div>
  );
};
