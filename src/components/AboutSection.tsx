import React from 'react';
import { createGeneralWhatsAppUrl } from '../utils/whatsapp';
import { FadeIn } from './FadeIn';
import {
  ShieldCheck,
  Award,
  HeartHandshake,
  Target,
  Compass,
  MessageCircle,
  Quote
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-16 sm:py-20 border-b border-white/[0.06] relative overflow-hidden">
      {/* Liquid Red Halos */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-80 h-80 bg-red-950/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <FadeIn direction="up" distance={20}>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-red-600/15 border border-red-500/30 text-[10px] sm:text-[11px] font-bold text-red-400 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ESTABLISHED 2021 • MEERUT CANTT</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase leading-tight">
              Discover Story About How <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">
                Grace Sports Started
              </span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
              We love what we do: crafting high-performance table tennis gear that fuels passion, precision, and play.
            </p>
          </div>
        </FadeIn>

        {/* Founder & Legend Sharath Kamal Spotlight in Liquid Glass */}
        <FadeIn direction="up" distance={24} delay={0.1}>
          <div className="rounded-3xl p-1 bg-gradient-to-br from-white/10 via-red-900/20 to-black/80 border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-10 sm:mb-12 backdrop-blur-2xl">
            <div className="rounded-[22px] bg-[#0A0E18]/90 p-4 sm:p-8 border border-white/[0.04]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
                {/* Photo Box */}
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-black/60 border border-white/[0.1] shadow-2xl">
                    <img
                      src="/images/gallery/gallery-1.jpg"
                      alt="Founder Vardhan Mashi with Legend Sharath Kamal"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/gallery/gallery-1.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 p-3 sm:p-3.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
                      <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-red-400 font-bold block">
                        HONORING EXCELLENCE
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        Vardhan Mashi with Sharath Kamal
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-300">
                        Founder & CEO presenting custom Grace Sports apparel to India's Table Tennis Icon.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Exact Text from gracesports.in */}
                <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-red-600/20 text-red-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2">
                      <Award className="w-3.5 h-3.5" />
                      FOUNDER & VISIONARY
                    </div>
                    <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
                      Vardhan Mashi
                    </h3>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Founder & CEO of Grace Sport
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Grace sports was founded in the year <strong>2021</strong> and is being run under the auspices of a professional team. The founder-Director, <strong>Vardhan Mashi</strong>, has the spirit and the live force behind the sports project. He is an efficient visioner. Grace Sports has consistently strived to symbolize the true spirit of dedication to maintaining a high standard of sports.
                  </p>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    The primary objective of Grace Sports is to focus on grassroots players and ensure that they have access to high-quality sports products. Understanding the financial constraints that many aspiring athletes face, Grace Sports aims to provide the products that are comparable in quality to those used by professional athletes, but at more affordable prices.
                  </p>

                  {/* Founder's Motto Quote Card */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-red-950/20 border border-red-500/25 relative backdrop-blur-xl">
                    <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-red-400/40 absolute top-3 right-3" />
                    <p className="text-xs sm:text-sm text-red-100 italic leading-relaxed pr-6">
                      "If you plan for a year, you should sow rice; if you plan for a decade, you should plant trees; and if you plan for a lifetime of fitness, you should educate people through sports."
                    </p>
                    <span className="text-[10px] sm:text-[11px] text-red-400 font-bold block mt-2">
                      — Vardhan Mashi, Founder's Message
                    </span>
                  </div>

                  <div className="pt-2">
                    <a
                      href={createGeneralWhatsAppUrl("Hello Vardhan Mashi, I am reaching out from your website to discuss an academy equipment requirement.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#CB2522] to-[#b01e1b] hover:from-[#d82d29] hover:to-[#CB2522] text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(203,37,34,0.4)] transition-all cursor-pointer min-h-[48px]"
                    >
                      <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                      <span>Connect on WhatsApp <span className="hidden sm:inline">(+91 8791864565)</span></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 3 Pillars in Liquid Glass */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <FadeIn delay={0.05} direction="up" distance={16}>
            <div className="p-5 sm:p-8 rounded-3xl bg-white/[0.025] hover:bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl transition-all h-full">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-display text-xl font-bold text-white uppercase tracking-wide">
                We Love What We Do
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                Crafting high-performance table tennis gear that fuels passion, precision, and play. From beginners to pros, we're here to support every rally, every spin, and every win.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} direction="up" distance={16}>
            <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.025] hover:bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl transition-all h-full">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="font-display text-xl font-bold text-white uppercase tracking-wide">
                Our Working Process
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                Driven by passion, perfected with precision. From design to delivery, we ensure every product meets the highest standards for performance and durability.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.25} direction="up" distance={16}>
            <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.025] hover:bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl transition-all h-full">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-display text-xl font-bold text-white uppercase tracking-wide">
                Our Vision
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                At Grace Sports, our vision is to create a society where sports and physical fitness are embraced as essential components of a well-rounded life, with accessible quality equipment for all.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
