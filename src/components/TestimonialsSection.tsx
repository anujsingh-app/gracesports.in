import React, { useState, useEffect, useCallback } from 'react';
import { TESTIMONIALS } from '../data/testimonials';
import { FadeIn } from './FadeIn';
import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isPaused, setIsPaused] = useState(false);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? TESTIMONIALS.length - 1 : prevIdx - 1));
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIdx) => (prevIdx === TESTIMONIALS.length - 1 ? 0 : prevIdx + 1));
  }, []);

  // Auto-rotate every 5 seconds, pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const current = TESTIMONIALS[currentIndex];

  // Get adjacent testimonials for the mini-preview cards
  const getAdjacentIndex = useCallback(
    (offset: number) =>
      (currentIndex + offset + TESTIMONIALS.length) % TESTIMONIALS.length,
    [currentIndex]
  );

  const prevTestimonial = TESTIMONIALS[getAdjacentIndex(-1)];
  const nextTestimonial = TESTIMONIALS[getAdjacentIndex(1)];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.96,
    }),
  };

  return (
    <section
      className="py-12 sm:py-20 lg:py-24 border-b border-white/[0.06] relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient glow effects */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-red-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-red-500/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <FadeIn direction="up" distance={20}>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 sm:mb-14">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] sm:text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">
                <Star className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                <span>VERIFIED COACH TESTIMONIALS</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">
                Trusted by India's Top TT Coaches
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-xl">
                Real feedback from professional academy founders and national level coaches training the next generation.
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-mono mr-2 tabular-nums">
                {String(currentIndex + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
              </span>
              <button
                onClick={prev}
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] text-white border border-white/[0.08] hover:border-red-500/40 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center backdrop-blur-xl"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] text-white border border-white/[0.08] hover:border-red-500/40 transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center backdrop-blur-xl"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Main Content Area */}
        <FadeIn direction="up" distance={24} delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">

            {/* Featured Testimonial - Liquid Glass Card */}
            <div className="lg:col-span-8">
              <div
                className="relative rounded-3xl p-[1px] h-full overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(229,32,44,0.4) 0%, rgba(255,255,255,0.12) 40%, rgba(229,32,44,0.2) 100%)',
                }}
              >
                {/* Inner liquid glass surface */}
                <div className="rounded-[23px] h-full relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(7,9,14,0.92) 50%, rgba(229,32,44,0.04) 100%)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                  }}
                >
                  {/* Specular highlight overlay */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)',
                    }}
                  />

                  {/* Subtle inner glass reflection arc */}
                  <div
                    className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none opacity-[0.04]"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
                    }}
                  />

                  <div className="relative p-6 sm:p-8 lg:p-10">
                    {/* Large quote icon */}
                    <Quote className="absolute right-6 top-6 sm:right-8 sm:top-8 w-20 h-20 sm:w-28 sm:h-28 text-white/[0.03] pointer-events-none" />

                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={current.id}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          duration: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center"
                      >
                        {/* Avatar + Info Column */}
                        <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                          {/* Avatar with liquid glass ring */}
                          <div className="relative">
                            <div
                              className="absolute -inset-1 rounded-2xl opacity-60"
                              style={{
                                background: 'linear-gradient(135deg, rgba(229,32,44,0.5), rgba(255,255,255,0.2), rgba(229,32,44,0.3))',
                                filter: 'blur(1px)',
                              }}
                            />
                            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-white/20"
                              style={{
                                boxShadow: '0 8px 32px rgba(229,32,44,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
                              }}
                            >
                              <img
                                src={current.avatar}
                                alt={current.name}
                                className="w-full h-full object-cover"
                              />
                              {/* Glass reflection on avatar */}
                              <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
                                }}
                              />
                            </div>
                          </div>

                          {/* Name & Role */}
                          <div>
                            <div className="flex items-center gap-1.5 justify-center md:justify-start">
                              <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide">
                                {current.name}
                              </h3>
                              <BadgeCheck className="w-4 h-4 text-red-400 fill-red-500/20 shrink-0" />
                            </div>
                            <p className="text-xs font-semibold text-red-400 mt-0.5">
                              {current.academy}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {current.role}
                            </p>
                          </div>

                          {/* Star Rating with glow */}
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-amber-400 text-amber-400"
                                style={{
                                  filter: 'drop-shadow(0 0 4px rgba(251,191,36,0.5))',
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Testimonial Content Column */}
                        <div className="md:col-span-8 border-t md:border-t-0 md:border-l border-white/[0.08] pt-5 sm:pt-6 md:pt-0 md:pl-8 flex flex-col justify-center">
                          <p className="text-base sm:text-xl lg:text-2xl text-slate-200 font-medium leading-relaxed italic">
                            "{current.content}"
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Progress bar */}
                    <div className="flex justify-center gap-2 mt-8 pt-5 border-t border-white/[0.06]">
                      {TESTIMONIALS.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setDirection(i > currentIndex ? 1 : -1);
                            setCurrentIndex(i);
                          }}
                          className="relative h-1.5 rounded-full transition-all cursor-pointer overflow-hidden"
                          style={{
                            width: currentIndex === i ? 32 : 8,
                            background: currentIndex === i
                              ? 'linear-gradient(90deg, #E5202C, #ff4d58)'
                              : 'rgba(255,255,255,0.15)',
                            boxShadow: currentIndex === i
                              ? '0 0 12px rgba(229,32,44,0.6)'
                              : 'none',
                          }}
                          aria-label={`Testimonial ${i + 1}`}
                        >
                          {currentIndex === i && !isPaused && (
                            <motion.div
                              className="absolute inset-0 bg-white/20 rounded-full origin-left"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 5, ease: 'linear' }}
                              key={`progress-${i}-${currentIndex}`}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Preview Cards - Liquid Glass Mini Cards */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 sm:gap-4">
              {/* Previous testimonial peek */}
              <button
                type="button"
                onClick={prev}
                aria-label={`Previous testimonial by ${prevTestimonial.name}`}
                className="flex-1 group relative rounded-2xl p-[1px] text-left overflow-hidden transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                }}
              >
                <div
                  className="rounded-[15px] p-4 sm:p-5 h-full relative overflow-hidden transition-all duration-300 group-hover:border-red-500/30"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(7,9,14,0.90) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {/* Glass shine */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
                    }}
                  />

                  <div className="relative flex items-start gap-3">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-white/10 shrink-0"
                      style={{
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                      }}
                    >
                      <img
                        src={prevTestimonial.avatar}
                        alt={prevTestimonial.name}
                        className="w-full h-full object-cover"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="block font-display text-sm sm:text-base font-bold text-white/70 group-hover:text-white transition-colors truncate">
                        {prevTestimonial.name}
                      </span>
                      <span className="block text-[10px] text-red-400/60 group-hover:text-red-400 transition-colors truncate">
                        {prevTestimonial.academy}
                      </span>
                      <span className="block text-[11px] text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                        "{prevTestimonial.content.slice(0, 80)}..."
                      </span>
                    </div>
                  </div>

                  {/* Subtle arrow indicator */}
                  <div className="absolute top-3 right-3 text-white/10 group-hover:text-white/30 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {/* Next testimonial peek */}
              <button
                type="button"
                onClick={next}
                aria-label={`Next testimonial by ${nextTestimonial.name}`}
                className="flex-1 group relative rounded-2xl p-[1px] text-left overflow-hidden transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                }}
              >
                <div
                  className="rounded-[15px] p-4 sm:p-5 h-full relative overflow-hidden transition-all duration-300 group-hover:border-red-500/30"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(7,9,14,0.90) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {/* Glass shine */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
                    }}
                  />

                  <div className="relative flex items-start gap-3">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-white/10 shrink-0"
                      style={{
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                      }}
                    >
                      <img
                        src={nextTestimonial.avatar}
                        alt={nextTestimonial.name}
                        className="w-full h-full object-cover"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="block font-display text-sm sm:text-base font-bold text-white/70 group-hover:text-white transition-colors truncate">
                        {nextTestimonial.name}
                      </span>
                      <span className="block text-[10px] text-red-400/60 group-hover:text-red-400 transition-colors truncate">
                        {nextTestimonial.academy}
                      </span>
                      <span className="block text-[11px] text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                        "{nextTestimonial.content.slice(0, 80)}..."
                      </span>
                    </div>
                  </div>

                  {/* Subtle arrow indicator */}
                  <div className="absolute top-3 right-3 text-white/10 group-hover:text-white/30 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {/* Stats mini card */}
              <div
                className="flex-1 rounded-2xl p-[1px] overflow-hidden hidden lg:block"
                style={{
                  background: 'linear-gradient(135deg, rgba(229,32,44,0.3), rgba(255,255,255,0.06))',
                }}
              >
                <div
                  className="rounded-[15px] p-4 sm:p-5 h-full relative overflow-hidden flex flex-col justify-center items-center text-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(229,32,44,0.06) 0%, rgba(7,9,14,0.92) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
                    }}
                  />
                  <div className="relative space-y-1">
                    <div className="font-display text-4xl font-extrabold text-white">
                      {TESTIMONIALS.length}+
                    </div>
                    <div className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                      Verified Reviews
                    </div>
                    <div className="flex justify-center gap-0.5 pt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-500 pt-0.5">
                      5.0 Average Rating
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
};
