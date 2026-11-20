import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShieldCheck,
  Package,
  ShoppingCart,
  Mail,
  CheckCircle2,
  Activity,
} from 'lucide-react';
import {
  EcommerceCartItem,
  EcommerceDemoTab,
  PackageTierId,
} from './types';
import { DashboardPage } from './DashboardPage';
import { CorporatePage } from './CorporatePage';
import { ProductsPage } from './ProductsPage';
import { CartPage } from './CartPage';
import { ContactPage } from './ContactPage';
import { LiveSupportWidget } from './LiveSupportWidget';

export const EcommerceDemoApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EcommerceDemoTab>('dashboard');
  const [selectedPackage, setSelectedPackage] = useState<PackageTierId>('pro');
  const [cart, setCart] = useState<EcommerceCartItem[]>([
    {
      cartKey: 'prod-premium-theme__single',
      productId: 'prod-premium-theme',
      name: 'Premium E-Ticaret Teması',
      category: 'Arayüz & Storefront',
      variantLabel: 'Tek Mağaza Lisansı',
      unitPrice: 14500,
      quantity: 1,
    },
  ]);
  const [toastNotification, setToastNotification] = useState<string | null>(null);
  const [cartBadgeBump, setCartBadgeBump] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (newItem: EcommerceCartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.cartKey === newItem.cartKey);
      if (existing) {
        return prev.map((i) =>
          i.cartKey === newItem.cartKey
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }
      return [...prev, newItem];
    });

    setCartBadgeBump(true);
    setTimeout(() => setCartBadgeBump(false), 350);

    setToastNotification('Ürün Başarıyla Sepete Eklendi!');
    setTimeout(() => {
      setToastNotification(null);
    }, 3000);
  };

  const handleUpdateQuantity = (cartKey: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartKey === cartKey) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as EcommerceCartItem[]
    );
  };

  const handleRemoveItem = (cartKey: string) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const navTabs: { id: EcommerceDemoTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: '1. Yönetim Paneli', icon: LayoutDashboard },
    { id: 'kurumsal', label: '2. Kurumsal & Altyapı', icon: ShieldCheck },
    { id: 'urunler', label: '3. Ürünler', icon: Package },
    { id: 'sepet', label: '4. Sepet & Paketler', icon: ShoppingCart },
    { id: 'iletisim', label: '5. İletişim', icon: Mail },
  ];

  return (
    <div className="min-h-full bg-zinc-950 text-zinc-100 flex flex-col font-sans relative selection:bg-[#25D366] selection:text-zinc-950">
      {/* 1. DÜRÜSTLÜK ŞERİDİ (Honesty Strip at Very Top of All Demo Pages) */}
      <div className="bg-zinc-900/90 backdrop-blur-md border-b border-[#25D366]/30 px-4 py-2 text-center sticky top-0 z-40">
        <span className="text-[11px] sm:text-xs font-extrabold tracking-wide text-[#25D366]">
          [Mütevazı Şeffaflık İlkesi: Bu Alanlar Örnek Senaryo Simülasyonudur]
        </span>
      </div>

      {/* SaaS Top Navigation Bar */}
      <div className="bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-8 py-4 sticky top-[33px] z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Independent SaaS Brand Identity */}
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            aria-label="NovaCommerce SaaS Yönetim Paneli Ana Sayfası"
            className="flex items-center gap-3 text-left cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#25D366] text-zinc-950 flex items-center justify-center font-extrabold shadow-md shadow-[#25D366]/20 group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                VANGUARD COMMERCE CLOUD
              </div>
              <div className="text-[11px] text-zinc-400 font-medium">
                B2B &amp; Perakende E-Ticaret Otomasyon Kokpiti
              </div>
            </div>
          </button>

          {/* 5-Page Navigation Tabs */}
          <nav
            aria-label="E-Ticaret Demo Sayfaları"
            className="flex items-center gap-1.5 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800 overflow-x-auto"
          >
            {navTabs.map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-label={`${tab.label} sekmesine geç`}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#25D366] text-zinc-950 shadow-md shadow-[#25D366]/20'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Cart Counter Action Button */}
          <button
            type="button"
            onClick={() => setActiveTab('sepet')}
            aria-label={`Sepet ve Ticari Paket Baremleri, sepette ${totalCartCount} ürün var`}
            className={`px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-[#25D366]/50 text-white text-xs font-extrabold transition-all inline-flex items-center gap-2 cursor-pointer shrink-0 ${
              cartBadgeBump ? 'scale-110 bg-[#25D366]/20' : 'scale-100'
            }`}
          >
            <ShoppingCart className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
            <span>Sepet</span>
            <span className="px-2 py-0.5 rounded-lg bg-[#25D366] text-zinc-950 font-mono tabular-nums text-xs font-extrabold">
              {totalCartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Top-Right Sliding Green Toast Notification */}
      {toastNotification && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-24 right-6 z-50 bg-zinc-900 border-2 border-[#25D366] text-white px-5 py-3.5 rounded-2xl shadow-[0_15px_45px_rgba(37,211,102,0.35)] flex items-center gap-3 animate-in fade-in slide-in-from-right-8 duration-300"
        >
          <div className="w-7 h-7 rounded-lg bg-[#25D366] text-zinc-950 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-[#25D366]">
              {toastNotification}
            </div>
            <div className="text-[11px] text-zinc-300">
              Sepet sayacı güncellendi ({totalCartCount} Modül)
            </div>
          </div>
        </div>
      )}

      {/* Main 5-Page Viewport */}
      <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
        {activeTab === 'dashboard' && <DashboardPage onNavigate={setActiveTab} />}
        {activeTab === 'kurumsal' && <CorporatePage onNavigate={setActiveTab} />}
        {activeTab === 'urunler' && (
          <ProductsPage
            onAddToCart={handleAddToCart}
            onNavigate={setActiveTab}
            cartCount={totalCartCount}
          />
        )}
        {activeTab === 'sepet' && (
          <CartPage
            cart={cart}
            selectedPackage={selectedPackage}
            onSelectPackage={setSelectedPackage}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onNavigate={setActiveTab}
          />
        )}
        {activeTab === 'iletisim' && (
          <ContactPage
            selectedPackage={selectedPackage}
            cart={cart}
            onOpenChat={() => setChatOpen(true)}
          />
        )}
      </div>

      {/* Demo Footer */}
      <div className="bg-zinc-900 border-t border-zinc-800 px-6 py-5 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p className="text-justify" style={{ textAlign: 'justify' }}>
            <strong className="font-bold text-white">VanGuard Studio Digital</strong> · Bağımsız E-Ticaret Otomasyonu 5 Sayfalık İzole SaaS Simülasyonu. Tarayıcı belleğinde (LocalStorage/SessionStorage) hiçbir veri tutulmaz.
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('kurumsal')}
              aria-label="Altyapı ve Lisans standartlarını incele"
              className="hover:text-[#25D366] transition-colors cursor-pointer font-semibold"
            >
              KVKK &amp; BDDK Standartları
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setActiveTab('sepet')}
              aria-label="Ticari paket baremlerini incele"
              className="hover:text-[#25D366] transition-colors cursor-pointer font-semibold"
            >
              Ticari Paket Baremleri
            </button>
          </div>
        </div>
      </div>

      {/* Persistent Fluttering Live Support Bubble */}
      <LiveSupportWidget
        isOpen={chatOpen}
        onToggle={() => setChatOpen((prev) => !prev)}
      />
    </div>
  );
};
