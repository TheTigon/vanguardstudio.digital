import React from 'react';
import { DemoPage } from './types';
import { Building2, ShoppingCart, Menu, X, ShieldAlert } from 'lucide-react';

interface B2bDemoNavbarProps {
  currentPage: DemoPage;
  onNavigate: (page: DemoPage) => void;
  cartCount: number;
}

export const B2bDemoNavbar: React.FC<B2bDemoNavbarProps> = ({ currentPage, onNavigate, cartCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNav = (page: DemoPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      
      {/* Top Banner Notice inside Demo */}
      <div className="bg-slate-950 text-amber-300 border-b border-slate-800 px-4 py-2 text-xs font-bold text-center flex items-center justify-center gap-2">
        <ShieldAlert className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>[Mütevazı Şeffaflık İlkesi: Bu Alanlar Örnek Senaryo Simülasyonudur] · <strong className="font-bold text-white">VanGuard Studio Digital</strong> B2B Endüstriyel Altyapısı</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            aria-label="Vanguard Industrial Demo Ana Sayfasına git"
            className="flex items-center gap-3 cursor-pointer group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold shadow-md" aria-hidden="true">
              <Building2 className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex flex-col">
              <div className="font-extrabold text-slate-900 tracking-tight text-base leading-tight">
                VANGUARD INDUSTRIAL
              </div>
              <div className="text-[10px] text-slate-700 font-bold uppercase tracking-widest">
                DEMO ÜRETİM A.Ş.
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="B2B Demo Masaüstü Navigasyon">
            <button
              type="button"
              onClick={() => handleNav('home')}
              aria-label="B2B Demo Ana Sayfasına git"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                currentPage === 'home' ? 'bg-slate-900 text-white' : 'text-slate-800 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Ana Sayfa
            </button>
            <button
              type="button"
              onClick={() => handleNav('about')}
              aria-label="B2B Demo Kurumsal Hakkımızda sayfasına git"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                currentPage === 'about' ? 'bg-slate-900 text-white' : 'text-slate-800 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Kurumsal / Hakkımızda
            </button>
            <button
              type="button"
              onClick={() => handleNav('catalog')}
              aria-label="B2B Demo Ürün Kataloğu sayfasına git"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                currentPage === 'catalog' ? 'bg-slate-900 text-white' : 'text-slate-800 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Ürün Kataloğu
            </button>
            <button
              type="button"
              onClick={() => handleNav('contact')}
              aria-label="B2B Demo İletişim sayfasına git"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                currentPage === 'contact' ? 'bg-slate-900 text-white' : 'text-slate-800 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              İletişim
            </button>
          </nav>

          {/* Cart Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNav('cart')}
              aria-label={`Teklif Sepetim sayfasına git (${cartCount} ürün)`}
              className="relative px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold inline-flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <ShoppingCart className="w-4 h-4" aria-hidden="true" />
              <span>Teklif Sepetim</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-400 text-slate-900 text-xs font-bold flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Demo mobil menüsünü kapat' : 'Demo mobil menüsünü aç'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-xl text-slate-800 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav aria-label="B2B Demo Mobil Navigasyon" className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2">
          <button type="button" onClick={() => handleNav('home')} aria-label="B2B Demo Ana Sayfasına git" className="w-full text-left px-4 py-2.5 rounded-xl font-bold text-slate-900 hover:bg-slate-100 cursor-pointer">Ana Sayfa</button>
          <button type="button" onClick={() => handleNav('about')} aria-label="B2B Demo Kurumsal Hakkımızda sayfasına git" className="w-full text-left px-4 py-2.5 rounded-xl font-bold text-slate-900 hover:bg-slate-100 cursor-pointer">Kurumsal / Hakkımızda</button>
          <button type="button" onClick={() => handleNav('catalog')} aria-label="B2B Demo Ürün Kataloğu sayfasına git" className="w-full text-left px-4 py-2.5 rounded-xl font-bold text-slate-900 hover:bg-slate-100 cursor-pointer">Ürün Kataloğu</button>
          <button type="button" onClick={() => handleNav('cart')} aria-label={`B2B Demo Teklif Sepetim sayfasına git (${cartCount} ürün)`} className="w-full text-left px-4 py-2.5 rounded-xl font-bold text-slate-900 hover:bg-slate-100 cursor-pointer">Teklif Sepetim ({cartCount})</button>
          <button type="button" onClick={() => handleNav('contact')} aria-label="B2B Demo İletişim sayfasına git" className="w-full text-left px-4 py-2.5 rounded-xl font-bold text-slate-900 hover:bg-slate-100 cursor-pointer">İletişim</button>
        </nav>
      )}
    </header>
  );
};
