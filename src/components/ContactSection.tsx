import React from 'react';
import { DISPLAY_PHONE, OFFICIAL_EMAIL, FACTORY_ADDRESS, createGeneralWhatsAppUrl } from '../utils/whatsapp';
import { FadeIn } from './FadeIn';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Building2,
  ExternalLink
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-16 sm:py-20 border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn direction="up" distance={20}>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14 space-y-1.5 sm:space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] sm:text-xs font-semibold text-red-400 uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>DIRECT FACTORY & EXPORT HEADQUARTERS</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">
              Don't Hesitate to Contact With Us
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              To empower every table tennis enthusiast with top-quality equipment. We're here to answer every equipment question, bulk quote, and academy setup.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-stretch">
          {/* Left: Contact Info in Liquid Glass Cards */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-4 flex flex-col justify-between">
            <div className="space-y-3.5 sm:space-y-4">
              <FadeIn direction="up" distance={16} delay={0.05}>
                {/* Address */}
                <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl hover:border-red-500/40 transition-all flex items-start gap-3.5 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                      Office Location
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                      {FACTORY_ADDRESS}
                    </p>
                    <span className="text-[10px] sm:text-[11px] text-red-400 font-semibold block mt-1.5 sm:mt-2">
                      Meerut Sports Manufacturing Industrial Zone
                    </span>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="up" distance={16} delay={0.12}>
                {/* Direct Phone */}
                <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl hover:border-red-500/40 transition-all flex items-start gap-3.5 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                      Phone Number
                    </h4>
                    <a
                      href="tel:+918791864565"
                      className="text-base sm:text-lg font-bold text-white hover:text-red-400 transition-colors block mt-0.5"
                    >
                      {DISPLAY_PHONE}
                    </a>
                    <span className="text-[11px] sm:text-xs text-slate-400 block mt-1">
                      Instant call access
                    </span>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="up" distance={16} delay={0.18}>
                {/* Email */}
                <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl hover:border-red-500/40 transition-all flex items-start gap-3.5 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                      Official Email
                    </h4>
                    <a
                      href={`mailto:${OFFICIAL_EMAIL}`}
                      className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-red-400 transition-colors block mt-0.5"
                    >
                      {OFFICIAL_EMAIL}
                    </a>
                    <span className="text-[11px] sm:text-xs text-slate-400 block mt-1">
                      For formal institutional tenders & academy purchase orders
                    </span>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="up" distance={16} delay={0.24}>
                {/* Timings */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center gap-3 text-xs text-slate-400">
                  <Clock className="w-4 h-4 text-red-400 shrink-0" />
                  <span>
                    Working Hours: <strong>9:00 AM – 8:00 PM IST</strong> (Mon – Sat)
                  </span>
                </div>
              </FadeIn>
            </div>

            {/* Quick WhatsApp Button */}
            <FadeIn direction="up" distance={16} delay={0.28}>
              <a
                href={createGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#CB2522] via-[#CB2522] to-[#b01e1b] hover:from-[#d82d29] hover:to-[#CB2522] text-white font-bold text-sm shadow-[0_0_25px_rgba(203,37,34,0.3)] transition-all transform active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                <span>Chat Direct on WhatsApp (+91 8791864565)</span>
              </a>
            </FadeIn>
          </div>

          {/* Right: Google Maps Location in Liquid Glass */}
          <div className="lg:col-span-7">
            <FadeIn direction="up" distance={22} delay={0.1} className="h-full">
              <div className="rounded-3xl p-1 bg-gradient-to-br from-white/10 via-red-950/30 to-black/80 border border-white/[0.1] backdrop-blur-2xl shadow-2xl h-full">
                <div className="rounded-[22px] bg-[#0A0D16]/95 p-4 sm:p-6 lg:p-8 border border-white/[0.04] h-full flex flex-col justify-between space-y-4 sm:space-y-5">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-red-600/15 border border-red-500/30 text-[10px] sm:text-xs font-semibold text-red-400 uppercase tracking-wider">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>OUR LOCATION</span>
                      </div>
                      <a
                        href="https://www.google.com/maps/place/Grace+Sports/@29.0224097,77.6797059,17z"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-semibold transition-colors"
                      >
                        <span>Open in Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <h3 className="font-display text-xl sm:text-3xl font-bold text-white uppercase">
                      Visit Grace Sports
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Direct factory inspections, tournament table viewings, and bulk academy pickups in Meerut.
                    </p>
                  </div>

                  {/* Responsive Google Maps Embed */}
                  <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg min-h-[350px] sm:min-h-[420px] lg:min-h-[440px] flex-1 bg-black/50">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3488.8169137686755!2d77.6797059!3d29.022409699999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c65ddec654f49%3A0x6ea9eb169e1e98c5!2sGrace%20Sports!5e0!3m2!1sen!2sin!4v1789654199323!5m2!1sen!2sin"
                      className="absolute inset-0 w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      title="Grace Sports Google Map Location"
                    />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
