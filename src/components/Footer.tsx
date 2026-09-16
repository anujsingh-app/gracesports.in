import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { ActiveTab } from '../types';
import { DISPLAY_PHONE, OFFICIAL_EMAIL, FACTORY_ADDRESS, createGeneralWhatsAppUrl } from '../utils/whatsapp';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ShieldCheck,
  Award,
  ChevronRight,
  FileText,
  Lock,
  RotateCcw
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenPolicy: (policy: 'terms' | 'refund' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenPolicy,
}) => {
  return (
    <footer className="bg-[#05070B] border-t border-white/[0.08] text-slate-400 text-sm relative overflow-hidden">
      {/* Liquid Red Glow at Bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-red-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10">
          {/* Col 1: Brand & Bio (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo size="lg" showSubtitle={true} showBadge={false} />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm pt-2">
              Manufacturer, Importer & Exporter of Table Tennis Products. Providing tournament-grade equipment to champions, national academies, and schools across India since 2021.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                TOURNAMENT GRADE BRAND
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="py-1 hover:text-red-400 transition-colors cursor-pointer inline-flex items-center"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('catalogue');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="py-1 hover:text-red-400 transition-colors cursor-pointer inline-flex items-center"
                >
                  Product Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="py-1 hover:text-red-400 transition-colors cursor-pointer inline-flex items-center"
                >
                  About Vardhan Mashi
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('gallery');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="py-1 hover:text-red-400 transition-colors cursor-pointer inline-flex items-center"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="py-1 hover:text-red-400 transition-colors cursor-pointer inline-flex items-center"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Useful Links & Policies (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-wider">
              Useful Links
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="py-1 hover:text-red-400 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('refund')}
                  className="py-1 hover:text-red-400 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>Refund & Returns</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="py-1 hover:text-red-400 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>Terms & Conditions</span>
                </button>
              </li>
              <li>
                <a
                  href={createGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1 hover:text-red-400 transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>WhatsApp Inquiries</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Factory Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-wider">
              Factory Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{FACTORY_ADDRESS}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-400 shrink-0" />
                <a href="tel:+918791864565" className="hover:text-red-400 font-semibold transition-colors py-0.5">
                  {DISPLAY_PHONE}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-400 shrink-0" />
                <a href={`mailto:${OFFICIAL_EMAIL}`} className="hover:text-red-400 transition-colors py-0.5">
                  {OFFICIAL_EMAIL}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={createGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] flex flex-col items-center justify-center gap-1 py-2.5 px-4 rounded-xl bg-[#CB2522] hover:bg-[#b01e1b] active:scale-[0.98] text-white font-bold text-xs shadow-[0_0_20px_rgba(203,37,34,0.35)] transition-all"
              >
                <span className="flex items-center gap-2"><MessageCircle className="w-4 h-4 fill-white shrink-0" />Order on WhatsApp</span>
                <span className="text-[10px] font-normal text-red-100/80">(+91 8791864565)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-white/[0.06] flex items-center justify-center text-center text-[11px] sm:text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Grace Sports. All Rights Reserved. India's Table Tennis Equipment Manufacturer.</p>
        </div>
      </div>
    </footer>
  );
};
