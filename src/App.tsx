import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { CatalogueView } from './components/CatalogueView';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { ProductModal } from './components/ProductModal';
import { InquiryDrawer } from './components/InquiryDrawer';
import { PolicyModal } from './components/PolicyModal';
import { Footer } from './components/Footer';
import { ActiveTab, CategoryId, InquiryItem, Product } from './types';

const VALID_TABS: ActiveTab[] = ['home', 'catalogue', 'about', 'gallery', 'contact', 'policies'];

function getInitialTab(): ActiveTab {
  if (typeof window === 'undefined') return 'home';

  // 1. Check URL hash (e.g. #gallery, #about, #catalogue)
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase() as ActiveTab;
  if (VALID_TABS.includes(hash)) {
    return hash;
  }

  // 2. Check URL pathname (e.g. /gallery, /about)
  const path = window.location.pathname.replace(/^\//, '').toLowerCase() as ActiveTab;
  if (VALID_TABS.includes(path)) {
    return path;
  }

  // 3. Fallback to localStorage persistence
  try {
    const saved = localStorage.getItem('grace_sports_active_tab') as ActiveTab;
    if (saved && VALID_TABS.includes(saved)) {
      return saved;
    }
  } catch {}

  return 'home';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(getInitialTab);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(() => {
    try {
      const saved = localStorage.getItem('grace_sports_category') as CategoryId;
      if (saved && ['tables', 'balls', 'accessories', 'arena', 'sportswear', 'flooring'].includes(saved)) {
        return saved;
      }
    } catch {}
    return 'tables';
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inquiryDrawerOpen, setInquiryDrawerOpen] = useState<boolean>(false);
  const [activePolicy, setActivePolicy] = useState<'terms' | 'refund' | 'privacy' | null>(null);

  // Sync activeTab with URL hash and localStorage on change
  useEffect(() => {
    const currentHash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
    if (currentHash !== activeTab) {
      const targetHash = activeTab === 'home' ? '' : `#${activeTab}`;
      window.history.replaceState(null, '', targetHash || window.location.pathname);
    }
    try {
      localStorage.setItem('grace_sports_active_tab', activeTab);
    } catch {}
  }, [activeTab]);

  // Sync selectedCategory to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('grace_sports_category', selectedCategory);
    } catch {}
  }, [selectedCategory]);

  // Listen to browser Back / Forward buttons (hashchange and popstate)
  useEffect(() => {
    const handleNavigation = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase() as ActiveTab;
      if (VALID_TABS.includes(hash)) {
        setActiveTab(hash);
      } else if (!hash) {
        setActiveTab('home');
      }
    };

    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('popstate', handleNavigation);
    return () => {
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  // Local storage persistence for inquiry items
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem('grace_sports_inquiry');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('grace_sports_inquiry', JSON.stringify(inquiryItems));
    } catch {}
  }, [inquiryItems]);

  // Centralized scroll-to-top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const inquiryProductIds = new Set(inquiryItems.map((item) => item.product.id));

  const handleAddToInquiry = (product: Product, quantity = 1) => {
    setInquiryItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setInquiryItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setInquiryItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  };

  const handleClearAll = () => {
    setInquiryItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07090E] text-slate-100 selection:bg-red-600 selection:text-white pb-0">
      {/* 1. Glass Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        inquiryCount={inquiryItems.length}
        openInquiryDrawer={() => setInquiryDrawerOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* 2. Main Content Routing */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={setActiveTab}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToInquiry={handleAddToInquiry}
            inquiryProductIds={inquiryProductIds}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setActiveTab('catalogue');
            }}
          />
        )}

        {activeTab === 'catalogue' && (
          <CatalogueView
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToInquiry={handleAddToInquiry}
            inquiryProductIds={inquiryProductIds}
          />
        )}

        {activeTab === 'about' && (
          <div className="py-4 sm:py-8">
            <AboutSection />
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="py-4 sm:py-8">
            <GallerySection />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="py-4 sm:py-8">
            <ContactSection />
          </div>
        )}
      </main>

      {/* 3. Clean Rich Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenPolicy={(p) => setActivePolicy(p)}
      />

      {/* 4. Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToInquiry={handleAddToInquiry}
        isInInquiry={selectedProduct ? inquiryProductIds.has(selectedProduct.id) : false}
      />

      {/* 5. WhatsApp Bulk Inquiry Drawer */}
      <InquiryDrawer
        isOpen={inquiryDrawerOpen}
        onClose={() => setInquiryDrawerOpen(false)}
        items={inquiryItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearAll={handleClearAll}
      />

      {/* 6. Legal Policy Modal */}
      <PolicyModal
        policy={activePolicy}
        onClose={() => setActivePolicy(null)}
      />
    </div>
  );
}
