import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ActiveTab } from '../types';
import { BRAND_STATS } from '../data/testimonials';
import { createGeneralWhatsAppUrl, DISPLAY_PHONE } from '../utils/whatsapp';
import {
  ShieldCheck,
  ChevronRight,
  MessageCircle,
  PhoneCall
} from 'lucide-react';

interface HeroProps {
  onExploreCatalogue: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalogue,
  setActiveTab
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Motion values for fluid mouse-driven liquid glass parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for dampened, liquid inertia
  const springConfig = { damping: 28, stiffness: 160 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D card tilt and displacement
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const cardX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const cardY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  // Specular sheen light coordinates across the glass
  const sheenX = useTransform(smoothX, [-0.5, 0.5], ['20%', '80%']);
  const sheenY = useTransform(smoothY, [-0.5, 0.5], ['20%', '80%']);

  // Subtle stat card shifts
  const statShiftX1 = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const statShiftY1 = useTransform(smoothY, [-0.5, 0.5], [-4, 4]);
  const statShiftX2 = useTransform(smoothX, [-0.5, 0.5], [4, -4]);
  const statShiftY2 = useTransform(smoothY, [-0.5, 0.5], [3, -3]);

  const animFrameId = React.useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const currentTarget = e.currentTarget;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (animFrameId.current !== null) {
      cancelAnimationFrame(animFrameId.current);
    }

    animFrameId.current = requestAnimationFrame(() => {
      const rect = currentTarget.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const x = (clientX - rect.left) / rect.width - 0.5;
        const y = (clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
      }
    });
  };

  const handleMouseLeave = () => {
    if (animFrameId.current !== null) {
      cancelAnimationFrame(animFrameId.current);
      animFrameId.current = null;
    }
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    return () => {
      if (animFrameId.current !== null) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  const heroSlides = [
    {
      badge: 'INDIA FASTEST GROWING',
      title: 'Welcome To Grace Sport',
      highlight: "India's Own Table Tennis Brand",
      tagline: 'Manufacturer Importer & Exporter of Table Tennis Products',
      image: '/images/hero/X.webp',
      pillText: 'TABLE TENNIS BRAND',
      spec: 'TABLE TENNIS BRAND'
    },

    {
      badge: 'NATIONAL RECOGNITION',
      title: 'Founder & CEO with Legend',
      highlight: 'Sharath Kamal',
      tagline: "India's Table Tennis Icon in Grace Sport Apparel",
      image: '/images/hero/hero-sarathkamal.webp',
      pillText: 'SHARATH KAMAL APPROVED',
      spec: 'Pro Academy Gear'
    },
    {
      badge: 'CHAMPIONSHIP STANDARDS',
      title: 'Precision Engineered',
      highlight: 'Championship Series',
      tagline: 'International Standards',
      image: '/images/hero/hero-1.webp',
      pillText: 'TTFI APPROVED',
      spec: '25mm Glare-Proof Surface'
    },

  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const slide = heroSlides[currentSlide];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden pt-3 sm:pt-8 pb-10 sm:pb-16 border-b border-white/[0.06]"
    >
      {/* Liquid Red Ambient Halos */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-red-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-[28rem] h-[28rem] bg-red-900/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-4 sm:space-y-5">
            {/* Top Badge */}
            <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-red-500/30 backdrop-blur-xl max-w-full">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse shrink-0" />
              <ShieldCheck className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                {slide.badge}
              </span>
              <span className="text-white/20">•</span>
              <span className="text-[10px] sm:text-[11px] font-bold text-red-400">
                {slide.pillText}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1 sm:space-y-1.5">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white uppercase leading-[1.04]">
                {slide.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-white drop-shadow-[0_0_25px_rgba(229,32,44,0.4)]">
                  {slide.highlight}
                </span>
              </h1>
              <p className="text-sm sm:text-lg font-medium text-slate-300">
                {slide.tagline}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3 pt-2 w-full sm:w-auto">
              <button
                onClick={onExploreCatalogue}
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#CB2522] to-[#b01e1b] hover:from-[#d82d29] hover:to-[#CB2522] text-white font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(203,37,34,0.4)] transition-all transform active:scale-95 min-h-[48px] text-center"
              >
                <span>View Products</span>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>

              <a
                href={createGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-red-500/40 font-semibold text-sm sm:text-base backdrop-blur-xl transition-all shadow-lg cursor-pointer min-h-[48px] text-center"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-500/20 shrink-0" />
                <span>WhatsApp Order</span>
              </a>

              <a
                href="tel:+918791864565"
                className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-slate-300 hover:text-white transition-all hidden sm:flex items-center justify-center min-h-[48px] min-w-[48px]"
                title="Call Direct: +91 8791864565"
              >
                <PhoneCall className="w-4 h-4 text-red-400" />
              </a>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center gap-2 pt-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-current={currentSlide === idx ? 'true' : undefined}
                  className={`h-1.5 rounded-full transition-all ${currentSlide === idx
                    ? 'w-7 bg-red-500 shadow-[0_0_10px_rgba(229,32,44,0.7)]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Liquid Glass Parallax Showcase Card */}
          <div className="lg:col-span-5" style={{ perspective: 1200 }}>
            <motion.div
              style={{
                rotateX,
                rotateY,
                x: cardX,
                y: cardY,
                transformStyle: 'preserve-3d',
              }}
              className="relative rounded-3xl p-1 bg-gradient-to-br from-white/15 via-red-950/25 to-black/80 border border-white/10 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.65)] transition-shadow duration-300"
            >
              {/* Dynamic Liquid Specular Light Reflection */}
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none opacity-40 mix-blend-overlay"
                style={{
                  background: useTransform(
                    [sheenX, sheenY],
                    ([sx, sy]) => `radial-gradient(500px circle at ${sx} ${sy}, rgba(255,255,255,0.35), transparent 70%)`
                  ),
                }}
              />

              <div className="relative rounded-[22px] overflow-hidden bg-[#0A0D16]/90 p-3.5 sm:p-4 border border-white/[0.05]">
                {/* Hero Showcase Image - 1:1 Aspect Ratio */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/hero/hero-1.webp';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Brand Key Stats in Liquid Glass with subtle coordinated parallax */}
        <div className="mt-8 sm:mt-12 pt-5 sm:pt-6 border-t border-white/[0.06]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {BRAND_STATS.map((stat, i) => (
              <motion.div
                key={i}
                style={{
                  x: i % 2 === 0 ? statShiftX1 : statShiftX2,
                  y: i % 2 === 0 ? statShiftY1 : statShiftY2,
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-red-500/30 backdrop-blur-xl transition-colors cursor-default"
              >
                <div className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-white truncate min-w-0 leading-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-300 truncate">
                  {stat.label}
                </div>
                <div className="text-[10px] text-slate-500 truncate min-w-0">
                  {stat.subtext}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
