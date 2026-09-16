import React, { useState } from 'react';
import { DISPLAY_PHONE, OFFICIAL_EMAIL, FACTORY_ADDRESS, createGeneralWhatsAppUrl } from '../utils/whatsapp';
import { FadeIn } from './FadeIn';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  Building2
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    category: 'Tables',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New Contact Inquiry - Grace Sports*\n\n` +
      `👤 *Name:* ${formData.name || 'Not provided'}\n` +
      `📞 *Phone:* ${formData.phone || 'Not provided'}\n` +
      `📍 *Location:* ${formData.city || 'Not provided'}\n` +
      `🏓 *Product Interest:* ${formData.category}\n` +
      `💬 *Message:* ${formData.message || 'I am interested in Grace Sports products. Please share current rates and catalogue.'}`;

    const url = `https://wa.me/918791864565?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
          {/* Left: Contact Info in Liquid Glass Cards */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
            <FadeIn direction="up" distance={16} delay={0.05}>
              {/* Address */}
              <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl hover:border-red-500/40 transition-all flex items-start gap-3.5 sm:gap-4">
                <div className="p-2.5 sm:p-3 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                    Factory & Office Location
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
                    Phone & Direct Calling
                  </h4>
                  <a
                    href="tel:+918791864565"
                    className="text-base sm:text-lg font-bold text-white hover:text-red-400 transition-colors block mt-0.5"
                  >
                    {DISPLAY_PHONE}
                  </a>
                  <span className="text-[11px] sm:text-xs text-slate-400 block mt-1">
                    Instant call access with senior manufacturing team
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

          {/* Right: Direct WhatsApp Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <FadeIn direction="up" distance={22} delay={0.1}>
              <div className="rounded-3xl p-1 bg-gradient-to-br from-white/10 via-red-950/30 to-black/80 border border-white/[0.1] backdrop-blur-2xl shadow-2xl">
                <form
                  onSubmit={handleSubmit}
                  className="rounded-[22px] bg-[#0A0D16]/95 p-4 sm:p-8 lg:p-10 border border-white/[0.04] space-y-4 sm:space-y-5"
                >
                <div>
                  <h3 className="font-display text-xl sm:text-3xl font-bold text-white uppercase">
                    Direct WhatsApp Dispatch Form
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill out the quick details below and click Send to open an instant pre-formatted conversation on WhatsApp.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Coach Ramesh Sharma"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-sm text-white placeholder-slate-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                      Contact / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-red-500 text-sm text-white placeholder-slate-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                      Delivery City / State
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g., Delhi NCR / Bengaluru"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-red-500 text-sm text-white placeholder-slate-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                      Product of Interest
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{ colorScheme: 'dark' }}
                      className="w-full px-4 py-3 rounded-xl bg-[#0D111D] border border-white/[0.08] focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-sm text-white outline-none transition-all cursor-pointer [color-scheme:dark]"
                    >
                      <option value="TT Tables (Sonic Pro / Club / Professional)" className="bg-[#0D111D] text-white py-2">
                        TT Tables (Sonic Pro / Club / Professional)
                      </option>
                      <option value="3-Star Gold 40+ Balls (Pack of 144)" className="bg-[#0D111D] text-white py-2">
                        3-Star Gold 40+ Balls (Pack of 144)
                      </option>
                      <option value="Training Accessories (Returnboard, Ball Net, Picker)" className="bg-[#0D111D] text-white py-2">
                        Training Accessories (Returnboard, Ball Net, Picker)
                      </option>
                      <option value="Custom Academy Sportswear & Jerseys" className="bg-[#0D111D] text-white py-2">
                        Custom Academy Sportswear & Jerseys
                      </option>
                      <option value="Arena Barriers & Court Flooring" className="bg-[#0D111D] text-white py-2">
                        Arena Barriers & Court Flooring
                      </option>
                      <option value="Complete Academy Turnkey Setup" className="bg-[#0D111D] text-white py-2">
                        Complete Academy Turnkey Setup
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                    Your Requirements / Quantities
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g., Need 2 Sonic Pro tables and 10 boxes of 3-star balls for upcoming state ranking tournament."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-sm text-white placeholder-slate-500 outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-[#CB2522] via-[#CB2522] to-[#b01e1b] hover:from-[#d82d29] hover:to-[#CB2522] text-white font-bold text-base shadow-[0_0_25px_rgba(203,37,34,0.4)] transition-all transform active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span className="hidden sm:inline">Send Inquiry to Grace Sports WhatsApp (+91 8791864565)</span>
                  <span className="sm:hidden">Send Inquiry via WhatsApp</span>
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
        </div>
      </div>
    </section>
  );
};
