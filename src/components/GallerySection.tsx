import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY_ITEMS } from '../data/gallery';
import { FadeIn } from './FadeIn';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Handlers for next and prev
  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === null ? null : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length));
  }, []);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % GALLERY_ITEMS.length));
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        setActiveIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, handlePrev, handleNext]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStart(null);
  };

  const currentPhoto = activeIndex !== null ? GALLERY_ITEMS[activeIndex] : null;

  return (
    <section className="py-10 sm:py-16 sm:py-20 border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn direction="up" distance={20}>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight">
              Grace Sports in Action
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Explore our collection of {GALLERY_ITEMS.length} high-performance tournament tables, competition balls, and arena equipment.
            </p>
          </div>
        </FadeIn>

        {/* Full Uncropped Masonry Gallery Grid in Liquid Glass */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <FadeIn
              key={item.id}
              delay={(idx % 6) * 0.04}
              direction="none"
              className="break-inside-avoid mb-4 sm:mb-6"
            >
              <div
                onClick={() => setActiveIndex(idx)}
                className="group relative rounded-2xl overflow-hidden bg-[#0A0D15] border border-white/[0.08] hover:border-red-500/50 backdrop-blur-xl shadow-lg transition-all duration-300 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto block object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />

                {/* Minimal Hover Overlay with Zoom Icon */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="p-3 rounded-full bg-black/60 text-white border border-white/20 backdrop-blur-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="w-5 h-5 text-red-400" />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Clean Minimalist Lightbox Modal */}
        {currentPhoto && activeIndex !== null && (
          <div
            onClick={() => setActiveIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-fadeIn cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative max-w-5xl w-full max-h-[92vh] rounded-2xl sm:rounded-3xl overflow-hidden bg-black/80 border border-white/10 shadow-2xl cursor-default select-none flex items-center justify-center"
            >
              {/* Photo Display */}
              <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4">
                <img
                  src={currentPhoto.image}
                  alt={currentPhoto.title}
                  className="max-h-[85vh] w-auto max-w-full object-contain rounded-lg"
                />

                {/* Close Button */}
                <button
                  onClick={() => setActiveIndex(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl bg-black/60 hover:bg-red-600 text-white/80 hover:text-white border border-white/10 transition-colors cursor-pointer z-10 backdrop-blur-md"
                  aria-label="Close photo"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Previous Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-2xl bg-black/60 hover:bg-red-600 text-white/80 hover:text-white border border-white/10 hover:border-red-500 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xl group z-10 active:scale-95"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-2xl bg-black/60 hover:bg-red-600 text-white/80 hover:text-white border border-white/10 hover:border-red-500 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xl group z-10 active:scale-95"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
