import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/testimonials';
import { FadeIn } from './FadeIn';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? TESTIMONIALS.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === TESTIMONIALS.length - 1 ? 0 : prevIdx + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-10 sm:py-16 sm:py-20 border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <FadeIn direction="up" distance={20}>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] sm:text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">
                <Star className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                <span>VERIFIED COACH TESTIMONIALS</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">
                Trusted by India's Top TT Coaches
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
                Real feedback from professional academy founders and national level coaches training the next generation.
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] text-white border border-white/[0.08] transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] text-white border border-white/[0.08] transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Featured Testimonial Card in Liquid Glass */}
        <FadeIn direction="up" distance={24} delay={0.1}>
          <div className="rounded-3xl p-1 bg-gradient-to-r from-red-600/30 via-white/10 to-red-900/20 border border-white/[0.08] backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
            <div className="rounded-[22px] bg-[#0A0D15]/95 p-5 sm:p-10 lg:p-12 relative overflow-hidden">
              <Quote className="absolute right-6 top-6 sm:right-8 sm:top-8 w-16 h-16 sm:w-24 sm:h-24 text-white/[0.03] pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
                <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-3.5 sm:space-y-4">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-red-500/50 shadow-[0_0_20px_rgba(229,32,44,0.3)]">
                    <img
                      src={current.avatar}
                      alt={current.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide">
                      {current.name}
                    </h3>
                    <p className="text-xs font-semibold text-red-400">
                      {current.academy}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {current.role}
                    </p>
                  </div>

                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]"
                      />
                    ))}
                  </div>
                </div>

                <div className="md:col-span-8 border-t md:border-t-0 md:border-l border-white/[0.08] pt-5 sm:pt-6 md:pt-0 md:pl-8">
                  <p className="text-base sm:text-xl lg:text-2xl text-slate-200 font-medium leading-relaxed italic">
                    "{current.content}"
                  </p>
                </div>
              </div>

              {/* Pagination Indicators */}
              <div className="flex justify-center gap-2 mt-8 pt-6 border-t border-white/[0.06]">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === i ? 'w-8 bg-red-500' : 'w-2 bg-white/20'
                    }`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
};
