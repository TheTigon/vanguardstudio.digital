import React, { useState, useRef, useEffect } from 'react';
import { RoutePath } from '../types';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  Globe, 
  Layers, 
  Cpu, 
  Building2, 
  Store, 
  Hammer, 
  ShoppingCart,
  ArrowRight,
  Zap,
  ShieldCheck,
  Truck,
  BookOpen
} from 'lucide-react';
import { EcommerceDemoModal } from './EcommerceDemoModal';
import { LogisticDemoModal } from './LogisticDemoModal';

interface NavbarProps {
  currentRoute: RoutePath;
  onNavigate: (route: RoutePath, anchorId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'cozumler' | 'sektorler' | null>(null);
  const [ecommerceDemoOpen, setEcommerceDemoOpen] = useState(false);
  const [logisticDemoOpen, setLogisticDemoOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (menu: 'cozumler' | 'sektorler') => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleNavClick = (route: RoutePath, anchorId?: string) => {
    setEcommerceDemoOpen(false);
    setLogisticDemoOpen(false);
    window.dispatchEvent(new CustomEvent('close-all-demos'));
    onNavigate(route, anchorId);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <EcommerceDemoModal isOpen={ecommerceDemoOpen} onClose={() => setEcommerceDemoOpen(false)} />
      <LogisticDemoModal isOpen={logisticDemoOpen} onClose={() => setLogisticDemoOpen(false)} />
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Honesty & Announcement Banner (High Contrast for Desktop & Mobile OLED) */}
      <div className="bg-slate-950 text-white border-b border-slate-800 px-4 py-2 text-xs font-semibold text-center flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-amber-300 font-extrabold text-[11px] tracking-wide">
          [Mütevazı Şeffaflık İlkesi: Bu Alanlar Örnek Senaryo Simülasyonudur]
        </span>
        <span className="hidden md:inline text-slate-200 font-bold" aria-hidden="true">|</span>
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" aria-hidden="true" />
          <span className="text-white"><strong className="font-bold text-white">VanGuard Studio Digital</strong> · nexus AI Fizibilite motoru ile anında maliyet ve mimari analizi alın!</span>
          <button 
            type="button"
            onClick={() => handleNavClick('/nexus/')}
            aria-label="nexus AI Fizibilite motorunu hemen deneyin"
            className="underline text-amber-300 hover:text-amber-200 font-extrabold inline-flex items-center gap-0.5 cursor-pointer"
          >
            Hemen Deneyin <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </button>
        </div>
        <span className="hidden sm:inline text-slate-200 font-bold" aria-hidden="true">|</span>
        <button
          type="button"
          onClick={() => setEcommerceDemoOpen(true)}
          aria-label="Bağımsız E-Ticaret Otomasyonu Canlı Demosunu Aç"
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-[#25D366] text-[#25D366] hover:bg-zinc-800 font-extrabold text-[11px] transition-colors cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" aria-hidden="true" />
          <span>E-Ticaret Otomasyonu Canlı Demosu</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20" ref={dropdownRef}>
          
          {/* Logo (Two-Line Structure) */}
          <button
            type="button"
            onClick={() => handleNavClick('/')}
            aria-label="VanGuard Studio Digital Ana Sayfa"
            className="flex items-center gap-3 cursor-pointer group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform" aria-hidden="true">
              <span className="text-xl tracking-tighter">V</span>
            </div>
            <div className="flex flex-col">
              <div className="font-extrabold text-slate-900 tracking-tight text-base leading-tight">
                VanGuard Studio
              </div>
              <div className="font-extrabold text-blue-700 tracking-[0.2em] text-xs leading-tight">
                DIGITAL
              </div>
              <div className="text-[10px] text-slate-800 uppercase tracking-wider font-extrabold mt-0.5">
                ÇÖZÜMLER &amp; AI FİZİBİLİTE
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Ana Navigasyon">
            
            {/* Ana Sayfa */}
            <button
              type="button"
              onClick={() => handleNavClick('/')}
              aria-label="Ana Sayfaya git"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                (currentRoute === '/' || currentRoute === '/tr/') 
                  ? 'text-blue-700 bg-blue-50 font-bold' 
                  : 'text-slate-800 hover:text-blue-700 hover:bg-slate-100'
              }`}
            >
              Ana Sayfa
            </button>

            {/* Çözümler (Clickable dropdown) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('cozumler')}
                aria-expanded={activeDropdown === 'cozumler'}
                aria-haspopup="true"
                aria-label="Çözümler alt menüsünü aç veya kapat"
                className={`px-3 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                  (currentRoute.startsWith('/cozumler') || currentRoute.startsWith('/tr/cozumler')) 
                    ? 'text-blue-700 bg-blue-50 font-bold' 
                    : 'text-slate-800 hover:text-blue-700 hover:bg-slate-100'
                }`}
              >
                <span>Çözümler</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'cozumler' ? 'rotate-180 text-blue-700' : ''}`} aria-hidden="true" />
              </button>

              {activeDropdown === 'cozumler' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  
                  <button
                    type="button"
                    onClick={() => handleNavClick('/cozumler/')}
                    aria-label="Tüm Çözümler ve Karşılaştırma sayfasına git"
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50/70 flex items-start gap-3 transition-colors group cursor-pointer border-b border-slate-200 mb-1"
                  >
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors" aria-hidden="true">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Tüm Çözümler &amp; Karşılaştırma</div>
                      <div className="text-xs text-slate-700 font-medium">EKO, PRO ve Özel Mimari</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavClick('/cozumler/hizli-web/')}
                    aria-label="Hızlı Web EKO Paketler sayfasına git"
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50/70 flex items-start gap-3 transition-colors group cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors" aria-hidden="true">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Hızlı Web / EKO Paketler</div>
                      <div className="text-xs text-slate-700 font-medium">5 İş Gününde teslim</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavClick('/cozumler/kurumsal-web/')}
                    aria-label="Kurumsal Web PRO sayfasına git"
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50/70 flex items-start gap-3 transition-colors group cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors" aria-hidden="true">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Kurumsal Web / PRO</div>
                      <div className="text-xs text-slate-700 font-medium">Modüler kurumsal altyapı</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavClick('/cozumler/ozel-yazilim/')}
                    aria-label="Özel Yazılım ve Mimari sayfasına git"
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50/70 flex items-start gap-3 transition-colors group cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-violet-100 text-violet-700 group-hover:bg-violet-600 group-hover:text-white transition-colors" aria-hidden="true">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Özel Yazılım &amp; Mimari</div>
                      <div className="text-xs text-slate-700 font-medium">Analiz tabanlı özel yapılar</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavClick('/cozumler/', 'bakim-hizmetleri')}
                    aria-label="Bakım Hizmetleri bölümüne git"
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50/70 flex items-start gap-3 transition-colors group cursor-pointer border-t border-slate-200 mt-1 pt-2.5"
                  >
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-colors" aria-hidden="true">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Bakım Hizmetleri</div>
                      <div className="text-xs text-slate-700 font-medium">Süreklilik ve teknik güvence</div>
                    </div>
                  </button>

                </div>
              )}
            </div>

            {/* Sektörler (Clickable dropdown with correct routes) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('sektorler')}
                aria-expanded={activeDropdown === 'sektorler'}
                aria-haspopup="true"
                aria-label="Sektörler alt menüsünü aç veya kapat"
                className={`px-3 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                  (currentRoute.startsWith('/sektorler') || currentRoute.startsWith('/tr/sektorler')) 
                    ? 'text-blue-700 bg-blue-50 font-bold' 
                    : 'text-slate-800 hover:text-blue-700 hover:bg-slate-100'
                }`}
              >
                <span>Sektörler</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'sektorler' ? 'rotate-180 text-blue-700' : ''}`} aria-hidden="true" />
              </button>

              {activeDropdown === 'sektorler' && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2 border-b border-slate-200 mb-1">
                    <div className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Sektörel Kapsamlar</div>
                    <div className="text-xs text-slate-800 font-medium"><strong className="font-bold text-slate-900">VanGuard Studio Digital</strong> uzmanlığı</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveDropdown(null);
                      setMobileMenuOpen(false);
                      setEcommerceDemoOpen(true);
                    }}
                    aria-label="Bağımsız E-Ticaret Otomasyonu 5 sayfa canlı demo simülasyonunu aç"
                    className="w-full text-left px-3 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-white flex items-start gap-3 transition-colors group cursor-pointer mb-1 border border-[#25D366]/60"
                  >
                    <div className="p-2 rounded-lg bg-[#25D366]/20 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-zinc-950 transition-colors" aria-hidden="true">
                      <ShoppingCart className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#25D366]">E-Ticaret &amp; SaaS Otomasyonu</div>
                      <div className="text-xs text-zinc-300 font-medium">5 Sayfalık İzole Canlı Demo</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveDropdown(null);
                      setMobileMenuOpen(false);
                      setLogisticDemoOpen(true);
                    }}
                    aria-label="Nexus AI Lojistik ve Kontrol Kulesi canlı demo simülasyonunu aç"
                    className="w-full text-left px-3 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-white flex items-start gap-3 transition-colors group cursor-pointer mb-1 border border-[#25D366]/60"
                  >
                    <div className="p-2 rounded-lg bg-[#25D366]/20 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-zinc-950 transition-colors" aria-hidden="true">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#25D366]">Nexus AI Lojistik &amp; Depo</div>
                      <div className="text-xs text-zinc-300 font-medium">Kontrol Kulesi Canlı Demosu</div>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleNavClick('/sektorler/uretim-tedarik/')}
                    aria-label="B2B Üretim ve İhracat sektörel çözümleri sayfasına git"
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50/70 flex items-start gap-3 transition-colors group cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-amber-100 text-amber-800 group-hover:bg-amber-600 group-hover:text-white transition-colors" aria-hidden="true">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">B2B Üretim ve İhracat</div>
                      <div className="text-xs text-slate-700 font-medium">Katalog ve teklif formları</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavClick('/sektorler/restoran-kafe/')}
                    aria-label="Gıda, Restoran ve Kafe sektörel çözümleri sayfasına git"
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50/70 flex items-start gap-3 transition-colors group cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-orange-100 text-orange-800 group-hover:bg-orange-600 group-hover:text-white transition-colors" aria-hidden="true">
                      <Store className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Gıda (Restoran ve Kafe)</div>
                      <div className="text-xs text-slate-700 font-medium">Dijital menü altyapısı</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleNavClick('/sektorler/mimarlik-tadilat/')}
                    aria-label="Mimarlık ve Tadilat sektörel çözümleri sayfasına git"
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50/70 flex items-start gap-3 transition-colors group cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-teal-100 text-teal-800 group-hover:bg-teal-600 group-hover:text-white transition-colors" aria-hidden="true">
                      <Hammer className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Mimarlık ve Tadilat</div>
                      <div className="text-xs text-slate-700 font-medium">Portföy ve talep toplama</div>
                    </div>
                  </button>

                </div>
              )}
            </div>

            {/* Çalışmalar */}
            <button
              type="button"
              onClick={() => handleNavClick('/calismalar/')}
              aria-label="Çalışmalar ve Canlı Demo Vitrini sayfasına git"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                (currentRoute === '/calismalar/' || currentRoute === '/tr/calismalar/') 
                  ? 'text-blue-700 bg-blue-50 font-bold' 
                  : 'text-slate-800 hover:text-blue-700 hover:bg-slate-100'
              }`}
            >
              Çalışmalar
            </button>

            {/* Fiyatlandırma */}
            <button
              type="button"
              onClick={() => handleNavClick('/fiyatlandirma/')}
              aria-label="Fiyatlandırma ve Emek Bütçesi Tablosu sayfasına git"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                (currentRoute === '/fiyatlandirma/' || currentRoute === '/tr/fiyatlandirma/') 
                  ? 'text-blue-700 bg-blue-50 font-bold' 
                  : 'text-slate-800 hover:text-blue-700 hover:bg-slate-100'
              }`}
            >
              Fiyatlandırma
            </button>

            {/* B2B Blog */}
            <button
              type="button"
              onClick={() => handleNavClick('/blog/')}
              aria-label="B2B Teknoloji, Siber Güvenlik ve AI Blogu sayfasına git"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                currentRoute.startsWith('/blog') || currentRoute.startsWith('/tr/blog')
                  ? 'text-blue-700 bg-blue-50 font-bold' 
                  : 'text-slate-800 hover:text-blue-700 hover:bg-slate-100'
              }`}
            >
              Blog
            </button>

            {/* nexus · AI Fizibilite */}
            <button
              type="button"
              onClick={() => handleNavClick('/nexus/')}
              aria-label="nexus AI Fizibilite Raporlama Servisi sayfasına git"
              className={`px-3 py-2 rounded-lg text-sm font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                (currentRoute === '/nexus/' || currentRoute === '/tr/nexus/') 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
              <span>nexus · AI Fizibilite</span>
            </button>

          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNavClick('/proje-basvurusu/')}
              aria-label="Projenizi Anlatın - Proje Başvuru Formuna git"
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-600/25 hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Projenizi Anlatın</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Mobil navigasyon menüsünü kapat' : 'Mobil navigasyon menüsünü aç'}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-xl text-slate-800 hover:text-slate-950 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav 
          aria-label="Mobil Navigasyon" 
          className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-8 space-y-3 animate-in slide-in-from-top-4 duration-200 shadow-2xl max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain"
        >
          <button
            type="button"
            onClick={() => handleNavClick('/')}
            aria-label="Ana Sayfaya git"
            className={`w-full text-left px-4 py-2.5 rounded-xl font-bold cursor-pointer transition-colors ${
              (currentRoute === '/' || currentRoute === '/tr/') 
                ? 'text-blue-700 bg-blue-50 font-bold' 
                : 'text-slate-900 hover:bg-slate-100'
            }`}
          >
            Ana Sayfa
          </button>
          
          <div className="space-y-1 pl-2 border-l-2 border-blue-600">
            <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider px-2 py-1">Çözümler</div>
            <button type="button" onClick={() => handleNavClick('/cozumler/')} aria-label="Tüm Çözümler ve Karşılaştırma sayfasına git" className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-900 hover:bg-blue-50 cursor-pointer">Tüm Çözümler &amp; Karşılaştırma</button>
            <button type="button" onClick={() => handleNavClick('/cozumler/hizli-web/')} aria-label="Hızlı Web EKO Paketler sayfasına git" className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-900 hover:bg-blue-50 cursor-pointer">Hızlı Web / EKO (5 İş Günü)</button>
            <button type="button" onClick={() => handleNavClick('/cozumler/kurumsal-web/')} aria-label="Kurumsal Web PRO sayfasına git" className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-900 hover:bg-blue-50 cursor-pointer">Kurumsal Web / PRO</button>
            <button type="button" onClick={() => handleNavClick('/cozumler/ozel-yazilim/')} aria-label="Özel Yazılım ve Mimari sayfasına git" className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-900 hover:bg-blue-50 cursor-pointer">Özel Yazılım &amp; Mimari</button>
            <button type="button" onClick={() => handleNavClick('/cozumler/', 'bakim-hizmetleri')} aria-label="Bakım Hizmetleri bölümüne git" className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-900 hover:bg-blue-50 cursor-pointer">Bakım Hizmetleri</button>
          </div>

          <div className="space-y-1 pl-2 border-l-2 border-amber-600">
            <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider px-2 py-1">Sektörler</div>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setEcommerceDemoOpen(true);
              }}
              aria-label="Bağımsız E-Ticaret Otomasyonu canlı demo simülasyonunu aç"
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-[#25D366] bg-zinc-950 border border-[#25D366]/60 cursor-pointer"
            >
              E-Ticaret &amp; SaaS Otomasyonu (Canlı Demo)
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setLogisticDemoOpen(true);
              }}
              aria-label="Nexus AI Lojistik ve Kontrol Kulesi canlı demo simülasyonunu aç"
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-[#25D366] bg-zinc-950 border border-[#25D366]/60 cursor-pointer"
            >
              Nexus AI Lojistik (Kontrol Kulesi)
            </button>
            <button type="button" onClick={() => handleNavClick('/sektorler/uretim-tedarik/')} aria-label="B2B Üretim ve İhracat sektörel çözümleri sayfasına git" className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-900 hover:bg-blue-50 cursor-pointer">B2B Üretim ve İhracat</button>
            <button type="button" onClick={() => handleNavClick('/sektorler/restoran-kafe/')} aria-label="Gıda, Restoran ve Kafe sektörel çözümleri sayfasına git" className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-900 hover:bg-blue-50 cursor-pointer">Gıda (Restoran ve Kafe)</button>
            <button type="button" onClick={() => handleNavClick('/sektorler/mimarlik-tadilat/')} aria-label="Mimarlık ve Tadilat sektörel çözümleri sayfasına git" className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-900 hover:bg-blue-50 cursor-pointer">Mimarlık ve Tadilat</button>
          </div>

          <button
            type="button"
            onClick={() => handleNavClick('/calismalar/')}
            aria-label="Çalışmalar ve Canlı Demo Vitrini sayfasına git"
            className={`w-full text-left px-4 py-2.5 rounded-xl font-bold cursor-pointer transition-colors ${
              (currentRoute.startsWith('/calismalar') || currentRoute.startsWith('/tr/calismalar'))
                ? 'text-blue-700 bg-blue-50 font-bold'
                : 'text-slate-900 hover:bg-slate-100'
            }`}
          >
            Çalışmalar
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('/fiyatlandirma/')}
            aria-label="Fiyatlandırma ve Emek Bütçesi Tablosu sayfasına git"
            className={`w-full text-left px-4 py-2.5 rounded-xl font-bold cursor-pointer transition-colors ${
              (currentRoute.startsWith('/fiyatlandirma') || currentRoute.startsWith('/tr/fiyatlandirma'))
                ? 'text-blue-700 bg-blue-50 font-bold'
                : 'text-slate-900 hover:bg-slate-100'
            }`}
          >
            Fiyatlandırma
          </button>
          
          {/* Blog (Mobil Menü) */}
          <button
            type="button"
            onClick={() => handleNavClick('/blog/')}
            aria-label="Blog sayfasına git"
            className={`w-full text-left px-4 py-2.5 rounded-xl font-bold flex items-center justify-between cursor-pointer transition-colors ${
              (currentRoute.startsWith('/blog') || currentRoute.startsWith('/tr/blog'))
                ? 'text-blue-700 bg-blue-50 font-bold ring-1 ring-blue-200'
                : 'text-slate-900 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-blue-600" aria-hidden="true" />
              <span>Blog</span>
            </div>
            <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-blue-100 text-blue-700">
              Rehber &amp; Analiz
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('/nexus/')}
            aria-label="nexus AI Fizibilite Raporlama Servisi sayfasına git"
            className="w-full text-left px-4 py-2.5 rounded-xl bg-slate-950 text-white font-bold flex items-center justify-between cursor-pointer"
          >
            <span>nexus · AI Fizibilite</span>
            <Sparkles className="w-4 h-4 text-amber-300" aria-hidden="true" />
          </button>
          
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleNavClick('/proje-basvurusu/')}
              aria-label="Projenizi Anlatın - Proje Başvuru Formuna git"
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-center shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Projenizi Anlatın</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </nav>
      )}
      </header>
    </>
  );
};
