import React, { useState, useRef, useEffect, useMemo } from 'react';
import { BrandLogo } from './BrandLogo';
import { ActiveTab, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { DISPLAY_PHONE, createGeneralWhatsAppUrl } from '../utils/whatsapp';
import {
  Search,
  MessageCircle,
  Phone,
  FileText,
  X,
  ClipboardList,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Menu
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  inquiryCount: number;
  openInquiryDrawer: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectProduct?: (product: Product) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  inquiryCount,
  openInquiryDrawer,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
}) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const matchingProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.badge && p.badge.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const POPULAR_TAGS = [
    'Sonic Pro 25mm',
    '3-Star 40+ Balls',
    'Tournament Tables',
    'Club Barriers',
    'Carbon Bat',
    'Return Board',
    'Tournament Net'
  ];

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'catalogue', label: 'Catalogue' },
    { id: 'about', label: 'About GS' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full liquid-glass border-b border-white/[0.08] !border-t-0 !border-x-0 transition-all">
      {/* Top Notification Announcement Bar - Full Desktop Only */}
      <div className="hidden lg:block bg-gradient-to-r from-red-950/50 via-black/40 to-black/60 border-b border-white/[0.06] px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-hidden">
          <div className="flex items-center gap-2 min-w-0 overflow-hidden">
            <span className="inline-flex items-center gap-1 rounded-full bg-red-600/30 px-2 py-0.5 font-semibold text-red-300 border border-red-500/40 text-[10px] shrink-0 whitespace-nowrap">
              <ShieldCheck className="w-3 h-3 text-red-400" />
              OFFICIAL TOURNAMENT GRADE
            </span>
            <span className="text-slate-300 text-xs truncate whitespace-nowrap">
              India's Fastest Growing TT Brand
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium text-slate-300 shrink-0">
            <a
              href="tel:+918791864565"
              className="flex items-center gap-1 text-slate-300 hover:text-red-400 transition-colors whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-red-400" />
              <span>{DISPLAY_PHONE}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          {/* Brand Logo - Fixed size and never shrinks */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer shrink-0"
          >
            <BrandLogo showSubtitle={true} />
          </div>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-1.5 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-[0_0_10px_rgba(229,32,44,0.8)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Header Actions (Search, Quote Drawer, WhatsApp, Mobile Toggles) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop & Tablet Compact Search Bar */}
            <div ref={searchContainerRef} className="relative hidden sm:block">
              <div className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onClick={() => {
                    setIsSearchOpen(true);
                    if (activeTab !== 'catalogue') {
                      setActiveTab('catalogue');
                    }
                  }}
                  onFocus={() => {
                    setIsSearchOpen(true);
                    if (activeTab !== 'catalogue') {
                      setActiveTab('catalogue');
                    }
                  }}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                    if (activeTab !== 'catalogue') {
                      setActiveTab('catalogue');
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setIsSearchOpen(false);
                    } else if (e.key === 'Enter') {
                      if (activeTab !== 'catalogue') {
                        setActiveTab('catalogue');
                      }
                      setIsSearchOpen(false);
                    }
                  }}
                  placeholder="Search equipment..."
                  className="w-36 md:w-40 lg:w-48 xl:w-56 focus:w-52 lg:focus:w-64 pl-9 pr-7 py-2 rounded-xl liquid-glass focus:border-red-500/70 focus:ring-2 focus:ring-red-500/20 text-xs sm:text-sm text-slate-100 placeholder-slate-400 outline-none transition-all shadow-inner"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white p-1 cursor-pointer rounded-md hover:bg-white/10"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="hidden xl:inline absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400 pointer-events-none border border-white/[0.08]">
                    /
                  </span>
                )}
              </div>

              {/* Interactive Liquid Glass Search Results Dropdown (Right-aligned) */}
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-2.5 w-[360px] sm:w-[420px] max-w-[calc(100vw-2rem)] p-4 rounded-2xl liquid-glass border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-50 animate-fadeIn backdrop-blur-2xl">
                  {searchQuery.trim() ? (
                    matchingProducts.length > 0 ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between px-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          <span>Products Found ({matchingProducts.length})</span>
                          <span className="text-red-400 text-[10px]">Click to inspect</span>
                        </div>
                        <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1">
                          {matchingProducts.slice(0, 5).map((product) => (
                            <div
                              key={product.id}
                              onClick={() => {
                                onSelectProduct?.(product);
                                setIsSearchOpen(false);
                                if (activeTab !== 'catalogue') {
                                 setActiveTab('catalogue');
                                }
                              }}
                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/[0.08] border border-transparent hover:border-white/[0.08] transition-all cursor-pointer group"
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-10 h-10 rounded-lg object-cover bg-black/40 border border-white/10 shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5">
                                  <h5 className="text-xs font-bold text-white group-hover:text-red-400 truncate">
                                    {product.name}
                                  </h5>
                                  {product.badge && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-600/30 text-red-300 border border-red-500/30 shrink-0 font-semibold">
                                      {product.badge}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                                  <span className="text-red-400 font-semibold">{product.price === 0 ? 'FREE' : `₹${product.price.toLocaleString('en-IN')}`}</span>
                                  <span>•</span>
                                  <span className="truncate capitalize">{product.category}</span>
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-red-400 transition-colors shrink-0" />
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setIsSearchOpen(false);
                            if (activeTab !== 'catalogue') setActiveTab('catalogue');
                          }}
                          className="w-full py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-xs font-bold text-red-300 text-center transition-all cursor-pointer hover:text-white"
                        >
                          View all {matchingProducts.length} results in Catalogue →
                        </button>
                      </div>
                    ) : (
                      <div className="py-4 text-center text-xs text-slate-400 space-y-1">
                        <p>No products matching "<span className="text-white font-semibold">{searchQuery}</span>"</p>
                        <p className="text-[11px] text-slate-500">Try searching for tables, 3-star balls, barriers, or bats</p>
                      </div>
                    )
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center gap-1.5 px-1 pb-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          <TrendingUp className="w-3.5 h-3.5 text-red-400" />
                          <span>Quick Searches</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {POPULAR_TAGS.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => {
                                setSearchQuery(tag);
                                if (activeTab !== 'catalogue') setActiveTab('catalogue');
                                setIsSearchOpen(false);
                              }}
                              className="whitespace-nowrap px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.04] hover:bg-red-600/20 text-slate-300 hover:text-red-300 border border-white/[0.08] hover:border-red-500/40 transition-all cursor-pointer"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/[0.08]">
                        <div className="px-1 pb-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Browse by Category
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setSearchQuery('table');
                              if (activeTab !== 'catalogue') setActiveTab('catalogue');
                              setIsSearchOpen(false);
                            }}
                            className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-xs text-slate-200 border border-white/[0.06] hover:border-red-500/30 transition-all text-left cursor-pointer group"
                          >
                            <span className="group-hover:text-red-400 font-medium">TT Tables</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400 font-mono">6 models</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSearchQuery('ball');
                              if (activeTab !== 'catalogue') setActiveTab('catalogue');
                              setIsSearchOpen(false);
                            }}
                            className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-xs text-slate-200 border border-white/[0.06] hover:border-red-500/30 transition-all text-left cursor-pointer group"
                          >
                            <span className="group-hover:text-red-400 font-medium">TT Balls</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400 font-mono">3 packs</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Search Toggle (under sm) */}
            <button
              onClick={() => {
                setShowMobileSearch(!showMobileSearch);
                setShowMobileMenu(false);
              }}
              className="sm:hidden p-2.5 rounded-xl text-slate-300 hover:text-white liquid-glass shrink-0 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Mobile Quote Button (under lg) */}
            <button
              onClick={openInquiryDrawer}
              className="lg:hidden relative p-2.5 sm:px-3 sm:py-2 rounded-xl text-slate-300 hover:text-white liquid-glass shrink-0 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5"
              aria-label="View Inquiry Quote"
              title="View Inquiry Quote Items"
            >
              <ClipboardList className="w-4 h-4 text-red-400" />
              <span className="hidden sm:inline text-xs font-semibold">Quote</span>
              {inquiryCount > 0 && (
                <span className="absolute -top-1 -right-1 sm:static flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold bg-red-600 text-white shadow-[0_0_10px_rgba(229,32,44,0.6)] animate-pulse">
                  {inquiryCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle (under md) */}
            <button
              onClick={() => {
                setShowMobileMenu(!showMobileMenu);
                setShowMobileSearch(false);
              }}
              className="md:hidden p-2.5 rounded-xl text-slate-300 hover:text-white liquid-glass shrink-0 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Navigation Menu"
            >
              {showMobileMenu ? <X className="w-4 h-4 text-red-400" /> : <Menu className="w-4 h-4" />}
            </button>

            {/* Header Quote Button - Desktop only */}
            <button
              onClick={openInquiryDrawer}
              className="hidden lg:flex relative items-center gap-2 px-3.5 py-2 rounded-xl liquid-glass hover:border-red-500/40 text-slate-200 hover:text-white text-sm font-semibold transition-all cursor-pointer shrink-0 min-h-[44px]"
              title="View Inquiry Quote Items"
            >
              <ClipboardList className="w-4 h-4 text-red-400 shrink-0" />
              <span>Inquiry Quote</span>
              {inquiryCount > 0 && (
                <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold bg-red-600 text-white shadow-[0_0_10px_rgba(229,32,44,0.6)]">
                  {inquiryCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Action Button */}
            <a
              href={createGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#CB2522] to-[#b01e1b] hover:from-[#d82d29] hover:to-[#CB2522] text-white text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(203,37,34,0.35)] transition-all transform active:scale-95 shrink-0 min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4 fill-white shrink-0" />
              <span className="whitespace-nowrap">WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* Mobile Search Input */}
        {showMobileSearch && (
          <div className="lg:hidden pb-4 pt-1">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onClick={() => {
                  if (activeTab !== 'catalogue') {
                    setActiveTab('catalogue');
                  }
                }}
                onFocus={() => {
                  if (activeTab !== 'catalogue') {
                    setActiveTab('catalogue');
                  }
                }}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'catalogue') {
                    setActiveTab('catalogue');
                  }
                }}
                placeholder="Search TT tables, balls, accessories..."
                className="w-full pl-10 pr-4 py-3 rounded-xl liquid-glass border-red-500/40 text-sm text-slate-100 placeholder-slate-400 outline-none min-h-[48px]"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation Dropdown Menu */}
        {showMobileMenu && (
          <div className="md:hidden pb-4 pt-1 animate-fadeIn border-t border-white/[0.08] mt-2">
            <nav className="flex flex-col gap-1.5 p-2.5 rounded-2xl bg-[#090C15]/95 backdrop-blur-2xl border border-white/10 shadow-2xl">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleNavClick(item.id);
                      setShowMobileMenu(false);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer min-h-[48px] ${
                      isActive
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                );
              })}

              {/* Inquiry Quote in Mobile Menu */}
              <button
                onClick={() => {
                  openInquiryDrawer();
                  setShowMobileMenu(false);
                }}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/[0.05] border border-white/[0.06] transition-all cursor-pointer min-h-[48px]"
              >
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-red-400" />
                  <span>Inquiry Quotation List</span>
                </div>
                {inquiryCount > 0 ? (
                  <span className="flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full text-[10px] font-bold bg-red-600 text-white shadow-[0_0_10px_rgba(229,32,44,0.6)]">
                    {inquiryCount} {inquiryCount === 1 ? 'item' : 'items'}
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 font-mono">0 items</span>
                )}
              </button>

              <div className="pt-2 mt-1 border-t border-white/[0.08] flex items-center justify-between gap-2 px-1">
                <a
                  href={createGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all min-h-[48px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="tel:+918791864565"
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-all min-h-[48px]"
                >
                  <Phone className="w-4 h-4 text-red-400" />
                  <span>Call Us</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
