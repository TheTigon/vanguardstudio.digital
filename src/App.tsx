import React, { useState, useEffect } from 'react';
import { RoutePath } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ProjectApplication } from './pages/ProjectApplication';
import { SolutionsComparison } from './pages/SolutionsComparison';
import { EcoDetail } from './pages/EcoDetail';
import { ProDetail } from './pages/ProDetail';
import { CustomArchDetail } from './pages/CustomArchDetail';
import { MaintenanceDetail } from './pages/MaintenanceDetail';
import { B2bManufacturingDetail } from './pages/B2bManufacturingDetail';
import { FoodCafeDetail } from './pages/FoodCafeDetail';
import { ArchitectureDetail } from './pages/ArchitectureDetail';
import { NexusAiPage } from './pages/NexusAiPage';
import { WorksPage } from './pages/WorksPage';
import { PricingPage } from './pages/PricingPage';
import { DemoB2bCatalog } from './pages/DemoB2bCatalog';
import { DemoRestaurantMenu } from './pages/DemoRestaurantMenu';
import { DemoArchitecturePortfolio } from './pages/DemoArchitecturePortfolio';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { KvkkPage } from './pages/KvkkPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { FaqPage } from './pages/FaqPage';
import { AboutPage } from './pages/AboutPage';
import { SitemapPage } from './pages/SitemapPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { BLOG_ARTICLES } from './data/blogArticles';
import { GoToTop } from './components/GoToTop';
import { CookieBanner } from './components/CookieBanner';

interface RouteSeoMeta {
  title: string;
  description: string;
}

const DEFAULT_SEO: RouteSeoMeta = {
  title: 'VanGuard Studio Digital | Dijital Çözümler & AI Fizibilite',
  description:
    'VanGuard Studio Digital; B2B işletmeler, ihracatçılar ve kurumsal firmalar için sabit bütçeli web çözümleri, özel yazılım mimarisi ve bağımsız nexus AI fizibilite analizleri sunar.',
};

const ROUTE_SEO_MAP: Partial<Record<RoutePath, RouteSeoMeta>> = {
  '/': DEFAULT_SEO,
  '/tr/': DEFAULT_SEO,
  '/kurumsal/hakkimizda/': {
    title: 'Kurumsal Hakkımızda, Vizyon & Misyon | VanGuard Studio Digital',
    description:
      'VanGuard Studio Digital; Türkiye, Rusya Federasyonu ve Kosova ekseninde B2B işletmeler ve ihracatçılar için mühendislik odaklı, sabit bütçeli dijital çözümler inşa eder.',
  },
  '/tr/kurumsal/hakkimizda/': {
    title: 'Kurumsal Hakkımızda, Vizyon & Misyon | VanGuard Studio Digital',
    description:
      'VanGuard Studio Digital; Türkiye, Rusya Federasyonu ve Kosova ekseninde B2B işletmeler ve ihracatçılar için mühendislik odaklı, sabit bütçeli dijital çözümler inşa eder.',
  },
  '/cozumler/': {
    title: 'Web Çözümleri, Paket Karşılaştırma & Bakım Modelleri | VanGuard Studio Digital',
    description:
      'Hızlı Web / EKO (19.900 TL), Kurumsal Web / PRO (59.000 TL), Özel Mimari (149.000 TL) ve şeffaf aylık bakım/SLA modellerimizi karşılaştırın.',
  },
  '/tr/cozumler/': {
    title: 'Web Çözümleri, Paket Karşılaştırma & Bakım Modelleri | VanGuard Studio Digital',
    description:
      'Hızlı Web / EKO (19.900 TL), Kurumsal Web / PRO (59.000 TL), Özel Mimari (149.000 TL) ve şeffaf aylık bakım/SLA modellerimizi karşılaştırın.',
  },
  '/cozumler/hizli-web/': {
    title: 'Hızlı Web / EKO Paketi (5 İş Gününde Teslim) | VanGuard Studio Digital',
    description:
      '19.900 TL sabit emek bütçesi ve 5 iş günü teslim garantisiyle işletmeler için hazır şablon altyapılı, mobil uyumlu ve hızlı kurumsal web çözümü.',
  },
  '/tr/cozumler/hizli-web/': {
    title: 'Hızlı Web / EKO Paketi (5 İş Gününde Teslim) | VanGuard Studio Digital',
    description:
      '19.900 TL sabit emek bütçesi ve 5 iş günü teslim garantisiyle işletmeler için hazır şablon altyapılı, mobil uyumlu ve hızlı kurumsal web çözümü.',
  },
  '/cozumler/kurumsal-web/': {
    title: 'Kurumsal Web / PRO Paketi (Tam Kod Devirli) | VanGuard Studio Digital',
    description:
      '59.000 TL sabit bütçe, sıfırdan özel UI/UX tasarım, çok dilli altyapı (TR/EN/RU), teknik SEO/AEO mimarisi ve %100 kaynak kod mülkiyeti devri.',
  },
  '/tr/cozumler/kurumsal-web/': {
    title: 'Kurumsal Web / PRO Paketi (Tam Kod Devirli) | VanGuard Studio Digital',
    description:
      '59.000 TL sabit bütçe, sıfırdan özel UI/UX tasarım, çok dilli altyapı (TR/EN/RU), teknik SEO/AEO mimarisi ve %100 kaynak kod mülkiyeti devri.',
  },
  '/cozumler/ozel-yazilim/': {
    title: 'Özel Yazılım & Kurumsal Mimari Çözümleri | VanGuard Studio Digital',
    description:
      'B2B ürün katalogları, bayi portalları, ERP/CRM entegrasyonları ve yüksek güvenlikli özel web yazılım mimarileri.',
  },
  '/tr/cozumler/ozel-yazilim/': {
    title: 'Özel Yazılım & Kurumsal Mimari Çözümleri | VanGuard Studio Digital',
    description:
      'B2B ürün katalogları, bayi portalları, ERP/CRM entegrasyonları ve yüksek güvenlikli özel web yazılım mimarileri.',
  },
  '/cozumler/bakim/': {
    title: 'Süreklilik, Teknik Güvence ve Bakım Modelleri | VanGuard Studio Digital',
    description:
      'EKO Bakım & Sunucu Takibi (2.900 TL/Ay) ve PRO Kurumsal SLA & Geliştirme (7.900 TL/Ay) paketleriyle sitenizi 7/24 güvende tutun.',
  },
  '/tr/cozumler/bakim/': {
    title: 'Süreklilik, Teknik Güvence ve Bakım Modelleri | VanGuard Studio Digital',
    description:
      'EKO Bakım & Sunucu Takibi (2.900 TL/Ay) ve PRO Kurumsal SLA & Geliştirme (7.900 TL/Ay) paketleriyle sitenizi 7/24 güvende tutun.',
  },
  '/sektorler/uretim-tedarik/': {
    title: 'B2B Üretim ve İhracat Web Çözümleri | VanGuard Studio Digital',
    description:
      'Sanayi üreticileri ve ihracatçılar için çok dilli ürün katalogları, teknik şartname (PDF) indirme merkezi ve hızlı RFQ teklif toplama altyapısı.',
  },
  '/tr/sektorler/uretim-tedarik/': {
    title: 'B2B Üretim ve İhracat Web Çözümleri | VanGuard Studio Digital',
    description:
      'Sanayi üreticileri ve ihracatçılar için çok dilli ürün katalogları, teknik şartname (PDF) indirme merkezi ve hızlı RFQ teklif toplama altyapısı.',
  },
  '/sektorler/restoran-kafe/': {
    title: 'Restoran ve Kafe Dijital Menü & Web Çözümleri | VanGuard Studio Digital',
    description:
      'Restoran, kafe ve gastronomi işletmeleri için komisyonsuz QR dijital menü, alerjen filtreleme, masa rezervasyonu ve yerel SEO mimarisi.',
  },
  '/tr/sektorler/restoran-kafe/': {
    title: 'Restoran ve Kafe Dijital Menü & Web Çözümleri | VanGuard Studio Digital',
    description:
      'Restoran, kafe ve gastronomi işletmeleri için komisyonsuz QR dijital menü, alerjen filtreleme, masa rezervasyonu ve yerel SEO mimarisi.',
  },
  '/sektorler/mimarlik-tadilat/': {
    title: 'Mimarlık ve Tadilat Firmaları İçin Portföy Web Çözümleri | VanGuard Studio Digital',
    description:
      'Mimarlık ofisleri, iç mimarlar ve inşaat/tadilat firmaları için yüksek çözünürlüklü proje portföyü ve nitelikli keşif talep sistemi.',
  },
  '/tr/sektorler/mimarlik-tadilat/': {
    title: 'Mimarlık ve Tadilat Firmaları İçin Portföy Web Çözümleri | VanGuard Studio Digital',
    description:
      'Mimarlık ofisleri, iç mimarlar ve inşaat/tadilat firmaları için yüksek çözünürlüklü proje portföyü ve nitelikli keşif talep sistemi.',
  },
  '/calismalar/': {
    title: 'Çalışmalar & Canlı Sektörel Demo Vitrini | VanGuard Studio Digital',
    description:
      'B2B üretim kataloğu, restoran QR menü ve mimarlık portföyü için geliştirdiğimiz canlı, etkileşimli web demolarını deneyimleyin.',
  },
  '/tr/calismalar/': {
    title: 'Çalışmalar & Canlı Sektörel Demo Vitrini | VanGuard Studio Digital',
    description:
      'B2B üretim kataloğu, restoran QR menü ve mimarlık portföyü için geliştirdiğimiz canlı, etkileşimli web demolarını deneyimleyin.',
  },
  '/calismalar/demo-b2b-katalog/': {
    title: 'Canlı Demo: B2B Üretim & İhracat Kataloğu | VanGuard Studio Digital',
    description:
      'Endüstriyel üreticiler ve ihracatçılar için tasarlanan teknik filtrelemeli ürün kataloğu ve RFQ teklif toplama canlı demosu.',
  },
  '/tr/calismalar/demo-b2b-katalog/': {
    title: 'Canlı Demo: B2B Üretim & İhracat Kataloğu | VanGuard Studio Digital',
    description:
      'Endüstriyel üreticiler ve ihracatçılar için tasarlanan teknik filtrelemeli ürün kataloğu ve RFQ teklif toplama canlı demosu.',
  },
  '/calismalar/demo-restoran-menu/': {
    title: 'Canlı Demo: Restoran & Kafe QR Dijital Menü | VanGuard Studio Digital',
    description:
      'Gastronomi işletmeleri için komisyonsuz dijital QR menü, kategori filtreleme ve hızlı rezervasyon canlı demosu.',
  },
  '/tr/calismalar/demo-restoran-menu/': {
    title: 'Canlı Demo: Restoran & Kafe QR Dijital Menü | VanGuard Studio Digital',
    description:
      'Gastronomi işletmeleri için komisyonsuz dijital QR menü, kategori filtreleme ve hızlı rezervasyon canlı demosu.',
  },
  '/calismalar/demo-mimarlik-portfolyo/': {
    title: 'Canlı Demo: Mimarlık & Tadilat Proje Portföyü | VanGuard Studio Digital',
    description:
      'Mimarlık ve iç mimarlık stüdyoları için öncesi/sonrası proje galerisi ve keşif randevu modülü canlı demosu.',
  },
  '/tr/calismalar/demo-mimarlik-portfolyo/': {
    title: 'Canlı Demo: Mimarlık & Tadilat Proje Portföyü | VanGuard Studio Digital',
    description:
      'Mimarlık ve iç mimarlık stüdyoları için öncesi/sonrası proje galerisi ve keşif randevu modülü canlı demosu.',
  },
  '/fiyatlandirma/': {
    title: 'Şeffaf Fiyatlandırma & Emek Bütçesi Tablosu | VanGuard Studio Digital',
    description:
      'Gizli maliyet veya zorunlu lisans ücreti olmadan Hızlı Web / EKO, Kurumsal Web / PRO ve Özel Mimari paketlerimizin şeffaf fiyat tablosu.',
  },
  '/tr/fiyatlandirma/': {
    title: 'Şeffaf Fiyatlandırma & Emek Bütçesi Tablosu | VanGuard Studio Digital',
    description:
      'Gizli maliyet veya zorunlu lisans ücreti olmadan Hızlı Web / EKO, Kurumsal Web / PRO ve Özel Mimari paketlerimizin şeffaf fiyat tablosu.',
  },
  '/nexus/': {
    title: 'nexus · Bağımsız AI Proje Fizibilite Motoru | VanGuard Studio Digital',
    description:
      'Dijital proje fikrinizi bütçe, teslim süresi, teknik karmaşıklık ve yatırım geri dönüşü (ROI) açısından saniyeler içinde yapay zeka ile analiz edin.',
  },
  '/tr/nexus/': {
    title: 'nexus · Bağımsız AI Proje Fizibilite Motoru | VanGuard Studio Digital',
    description:
      'Dijital proje fikrinizi bütçe, teslim süresi, teknik karmaşıklık ve yatırım geri dönüşü (ROI) açısından saniyeler içinde yapay zeka ile analiz edin.',
  },
  '/proje-basvurusu/': {
    title: 'Proje Başvurusu & Kurumsal İletişim | VanGuard Studio Digital',
    description:
      'Web tasarım, özel yazılım mimarisi veya B2B dijital dönüşüm projeniz için kapsamlı başvuru formunu doldurun, 24 saat içinde teknik yanıt alın.',
  },
  '/tr/proje-basvurusu/': {
    title: 'Proje Başvurusu & Kurumsal İletişim | VanGuard Studio Digital',
    description:
      'Web tasarım, özel yazılım mimarisi veya B2B dijital dönüşüm projeniz için kapsamlı başvuru formunu doldurun, 24 saat içinde teknik yanıt alın.',
  },
  '/destek/sss/': {
    title: 'Sıkça Sorulan Sorular (SSS) | VanGuard Studio Digital',
    description:
      'Teslim süreleri, ödeme takvimi, kaynak kod mülkiyeti, revizyon hakları ve bakım SLA süreçleri hakkında en sık sorulan 10 soru ve net yanıtları.',
  },
  '/tr/destek/sss/': {
    title: 'Sıkça Sorulan Sorular (SSS) | VanGuard Studio Digital',
    description:
      'Teslim süreleri, ödeme takvimi, kaynak kod mülkiyeti, revizyon hakları ve bakım SLA süreçleri hakkında en sık sorulan 10 soru ve net yanıtları.',
  },
  '/yasal/gizlilik-politikasi/': {
    title: 'Gizlilik Politikası ve Veri Güvenliği | VanGuard Studio Digital',
    description:
      'VanGuard Studio Digital kurumsal gizlilik politikası, siber güvenlik standartları ve veri işleme ilkeleri.',
  },
  '/tr/yasal/gizlilik-politikasi/': {
    title: 'Gizlilik Politikası ve Veri Güvenliği | VanGuard Studio Digital',
    description:
      'VanGuard Studio Digital kurumsal gizlilik politikası, siber güvenlik standartları ve veri işleme ilkeleri.',
  },
  '/yasal/cerez-politikasi/': {
    title: 'Çerez (Cookie) Politikası | VanGuard Studio Digital',
    description:
      'VanGuard Studio Digital web sitesinde kullanılan zorunlu, analitik ve işlevsel çerezlerin yönetimi ve yasal bilgilendirme metni.',
  },
  '/tr/yasal/cerez-politikasi/': {
    title: 'Çerez (Cookie) Politikası | VanGuard Studio Digital',
    description:
      'VanGuard Studio Digital web sitesinde kullanılan zorunlu, analitik ve işlevsel çerezlerin yönetimi ve yasal bilgilendirme metni.',
  },
  '/yasal/kvkk-aydinlatma-metni/': {
    title: 'KVKK Aydınlatma Metni | VanGuard Studio Digital',
    description:
      '6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusu aydınlatma metni ve başvuru haklarınız.',
  },
  '/tr/yasal/kvkk-aydinlatma-metni/': {
    title: 'KVKK Aydınlatma Metni | VanGuard Studio Digital',
    description:
      '6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusu aydınlatma metni ve başvuru haklarınız.',
  },
  '/yasal/hizmet-sartlari/': {
    title: 'Site Kullanım ve Hizmet Şartları | VanGuard Studio Digital',
    description:
      'VanGuard Studio Digital web platformu kullanım koşulları, fikri mülkiyet hakları ve ticari hizmet çerçevesi.',
  },
  '/tr/yasal/hizmet-sartlari/': {
    title: 'Site Kullanım ve Hizmet Şartları | VanGuard Studio Digital',
    description:
      'VanGuard Studio Digital web platformu kullanım koşulları, fikri mülkiyet hakları ve ticari hizmet çerçevesi.',
  },
  '/site-haritasi/': {
    title: 'Site Haritası (sitemap.xml, robots.txt & llms.txt) | VanGuard Studio Digital',
    description:
      'VanGuard Studio Digital tüm aktif sayfa dizini, XML site haritası, arama motoru robots.txt ve yapay zeka GEO llms.txt yapılandırması.',
  },
  '/tr/site-haritasi/': {
    title: 'Site Haritası (sitemap.xml, robots.txt & llms.txt) | VanGuard Studio Digital',
    description:
      'VanGuard Studio Digital tüm aktif sayfa dizini, XML site haritası, arama motoru robots.txt ve yapay zeka GEO llms.txt yapılandırması.',
  },
};

function normalizePath(rawPath: string): RoutePath {
  if (!rawPath) return '/';
  let p = rawPath.trim();
  p = p.replace(/\/index\.html$/i, '');
  if (p === '' || p === '/' || p === '/tr' || p === '/tr/') return '/';
  if (p.startsWith('/tr/')) {
    p = p.substring(3);
  }
  if (p === '' || p === '/') return '/';
  if (!p.endsWith('/') && !p.includes('.')) {
    p = `${p}/`;
  }
  return p as RoutePath;
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<RoutePath>(() => {
    if (typeof window !== 'undefined' && window.location.pathname) {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        setCurrentRoute(normalizePath(window.location.pathname));
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    let seo: RouteSeoMeta = ROUTE_SEO_MAP[currentRoute] ?? DEFAULT_SEO;

    if (currentRoute === '/blog/' || currentRoute === '/tr/blog/') {
      seo = {
        title: 'B2B Teknoloji, Siber Güvenlik & AI Fizibilitesi Blogu | VanGuard Studio Digital',
        description:
          'B2B şirketleri ve ihracatçılar için yapay zeka fizibilitesi, siber güvenlik, veri minimizasyonu ve kurumsal yazılım mimarisi analizleri.',
      };
    } else if (currentRoute.startsWith('/blog/') || currentRoute.startsWith('/tr/blog/')) {
      const cleanSlug = currentRoute
        .replace('/tr/blog/', '')
        .replace('/blog/', '')
        .replace(/\/$/, '');
      const matchedArticle = BLOG_ARTICLES.find((a) => a.slug === cleanSlug);
      if (matchedArticle) {
        seo = {
          title: `${matchedArticle.title} | VanGuard Studio Digital Blog`,
          description: matchedArticle.metaDescription,
        };
      }
    }

    document.title = seo.title;

    const setMetaContent = (selector: string, content: string) => {
      const el = document.querySelector<HTMLMetaElement>(selector);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    setMetaContent('meta[name="description"]', seo.description);
    setMetaContent('meta[property="og:title"]', seo.title);
    setMetaContent('meta[property="og:description"]', seo.description);
    setMetaContent('meta[property="og:url"]', `https://vanguardstudio.digital${currentRoute}`);
    setMetaContent('meta[name="twitter:title"]', seo.title);
    setMetaContent('meta[name="twitter:description"]', seo.description);

    const canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.setAttribute('href', `https://vanguardstudio.digital${currentRoute}`);
    }
  }, [currentRoute]);

  const handleNavigate = (route: RoutePath, anchorId?: string) => {
    const cleanRoute = normalizePath(route);
    const targetRoute = cleanRoute === '/cozumler/bakim/' ? '/cozumler/' : cleanRoute;
    const targetAnchor = cleanRoute === '/cozumler/bakim/' ? 'bakim-hizmetleri' : anchorId;

    setCurrentRoute(targetRoute);

    if (typeof window !== 'undefined' && window.location.pathname !== targetRoute) {
      window.history.pushState(null, '', targetRoute);
    }

    if (targetAnchor) {
      setTimeout(() => {
        const element = document.getElementById(targetAnchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-blue-600 selection:text-white relative">
      {/* Ana Menü */}
      <Navbar currentRoute={currentRoute} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentRoute === '/blog/' || currentRoute === '/tr/blog/' ? (
          <BlogListPage onNavigate={handleNavigate} />
        ) : currentRoute.startsWith('/blog/') || currentRoute.startsWith('/tr/blog/') ? (
          <BlogDetailPage
            slug={currentRoute.replace('/tr/blog/', '').replace('/blog/', '').replace(/\/$/, '')}
            onNavigate={handleNavigate}
          />
        ) : currentRoute === '/' || currentRoute === '/tr/' ? (
          <Home onNavigate={handleNavigate} />
        ) : currentRoute === '/proje-basvurusu/' || currentRoute === '/tr/proje-basvurusu/' ? (
          <ProjectApplication onNavigate={handleNavigate} />
        ) : currentRoute === '/cozumler/' || currentRoute === '/tr/cozumler/' ? (
          <SolutionsComparison onNavigate={handleNavigate} />
        ) : currentRoute === '/cozumler/hizli-web/' || currentRoute === '/tr/cozumler/hizli-web/' ? (
          <EcoDetail onNavigate={handleNavigate} />
        ) : currentRoute === '/cozumler/kurumsal-web/' || currentRoute === '/tr/cozumler/kurumsal-web/' ? (
          <ProDetail onNavigate={handleNavigate} />
        ) : currentRoute === '/cozumler/ozel-yazilim/' || currentRoute === '/tr/cozumler/ozel-yazilim/' ? (
          <CustomArchDetail onNavigate={handleNavigate} />
        ) : currentRoute === '/cozumler/bakim/' || currentRoute === '/tr/cozumler/bakim/' ? (
          <MaintenanceDetail onNavigate={handleNavigate} />
        ) : currentRoute === '/sektorler/uretim-tedarik/' || currentRoute === '/tr/sektorler/uretim-tedarik/' ? (
          <B2bManufacturingDetail onNavigate={handleNavigate} />
        ) : currentRoute === '/sektorler/restoran-kafe/' || currentRoute === '/tr/sektorler/restoran-kafe/' ? (
          <FoodCafeDetail onNavigate={handleNavigate} />
        ) : currentRoute === '/sektorler/mimarlik-tadilat/' || currentRoute === '/tr/sektorler/mimarlik-tadilat/' ? (
          <ArchitectureDetail onNavigate={handleNavigate} />
        ) : currentRoute === '/nexus/' || currentRoute === '/tr/nexus/' ? (
          <NexusAiPage onNavigate={handleNavigate} />
        ) : currentRoute === '/fiyatlandirma/' || currentRoute === '/tr/fiyatlandirma/' ? (
          <PricingPage onNavigate={handleNavigate} />
        ) : currentRoute === '/calismalar/' || currentRoute === '/tr/calismalar/' ? (
          <WorksPage onNavigate={handleNavigate} />
        ) : currentRoute === '/calismalar/demo-b2b-katalog/' || currentRoute === '/tr/calismalar/demo-b2b-katalog/' ? (
          <DemoB2bCatalog onNavigate={handleNavigate} />
        ) : currentRoute === '/calismalar/demo-restoran-menu/' || currentRoute === '/tr/calismalar/demo-restoran-menu/' ? (
          <DemoRestaurantMenu onNavigate={handleNavigate} />
        ) : currentRoute === '/calismalar/demo-mimarlik-portfolyo/' || currentRoute === '/tr/calismalar/demo-mimarlik-portfolyo/' ? (
          <DemoArchitecturePortfolio onNavigate={handleNavigate} />
        ) : currentRoute === '/yasal/cerez-politikasi/' || currentRoute === '/tr/yasal/cerez-politikasi/' ? (
          <CookiePolicyPage onNavigate={handleNavigate} />
        ) : currentRoute === '/yasal/gizlilik-politikasi/' || currentRoute === '/tr/yasal/gizlilik-politikasi/' ? (
          <PrivacyPolicyPage onNavigate={handleNavigate} />
        ) : currentRoute === '/yasal/kvkk-aydinlatma-metni/' || currentRoute === '/tr/yasal/kvkk-aydinlatma-metni/' ? (
          <KvkkPage onNavigate={handleNavigate} />
        ) : currentRoute === '/yasal/hizmet-sartlari/' || currentRoute === '/tr/yasal/hizmet-sartlari/' ? (
          <TermsOfServicePage onNavigate={handleNavigate} />
        ) : currentRoute === '/destek/sss/' || currentRoute === '/tr/destek/sss/' ? (
          <FaqPage onNavigate={handleNavigate} />
        ) : currentRoute === '/kurumsal/hakkimizda/' || currentRoute === '/tr/kurumsal/hakkimizda/' ? (
          <AboutPage onNavigate={handleNavigate} />
        ) : currentRoute === '/site-haritasi/' || currentRoute === '/tr/site-haritasi/' ? (
          <SitemapPage onNavigate={handleNavigate} />
        ) : (
          <NotFoundPage onNavigate={handleNavigate} requestedRoute={currentRoute} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Utilities: GoToTop & KVKK Cookie Banner */}
      <GoToTop />
      <CookieBanner />
    </div>
  );
}
