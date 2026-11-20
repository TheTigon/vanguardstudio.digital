import React from 'react';
import { RoutePath } from '../types';
import { Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: RoutePath, anchorId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-100 pt-16 pb-12 border-t border-slate-800" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP LAYER: Logo & 4 Left-Aligned Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-slate-800">
          
          {/* Brand Logo column */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/25" aria-hidden="true">
                <span className="text-xl tracking-tighter">V</span>
              </div>
              <div className="flex flex-col">
                <div className="font-extrabold text-white tracking-tight text-base leading-tight">
                  VanGuard Studio
                </div>
                <div className="font-extrabold text-blue-300 tracking-[0.2em] text-xs leading-tight">
                  DIGITAL
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-100 leading-relaxed pt-2 text-justify">
              <strong className="font-bold text-white">VanGuard Studio Digital</strong>; kapsamı net, şeffaf ve ölçülebilir dijital çözümler ve bağımsız AI fizibilite ortağınız.
            </p>
          </div>

          {/* 4 Left-Aligned Columns */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            
            {/* 1. Sütun (Kurumsal) */}
            <div className="space-y-4">
              <h2 className="text-xs font-extrabold text-white uppercase tracking-wider">Kurumsal</h2>
              <ul className="space-y-2.5 text-sm text-slate-200">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('/kurumsal/hakkimizda/')}
                    aria-label="VanGuard Studio Digital Kurumsal Hakkımızda, Vizyon ve Misyon sayfasına git"
                    className="hover:text-white transition-colors cursor-pointer font-medium"
                  >
                    Hakkımızda
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('/blog/')}
                    aria-label="VanGuard Studio Digital B2B Teknoloji, Siber Güvenlik ve AI Bloguna git"
                    className="hover:text-white transition-colors cursor-pointer font-medium"
                  >
                    B2B Blog
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('/cozumler/hizli-web/')}
                    aria-label="Hızlı Web EKO Paket detay sayfasına git"
                    className="hover:text-white transition-colors cursor-pointer font-medium"
                  >
                    Hızlı Web / EKO
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('/cozumler/kurumsal-web/')}
                    aria-label="Kurumsal Web PRO Paket detay sayfasına git"
                    className="hover:text-white transition-colors cursor-pointer font-medium"
                  >
                    Kurumsal Web / PRO
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('/cozumler/ozel-yazilim/')}
                    aria-label="Özel Yazılım ve Mimari çözümleri sayfasına git"
                    className="hover:text-white transition-colors cursor-pointer font-medium"
                  >
                    Özel Yazılım &amp; Mimari
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('/cozumler/', 'bakim-hizmetleri')}
                    aria-label="Bakım ve Destek Hizmetleri bölümüne git"
                    className="hover:text-white transition-colors cursor-pointer font-medium"
                  >
                    Bakım Hizmetleri
                  </button>
                </li>
              </ul>
            </div>

            {/* 2. Sütun (Yasal Belgeler) */}
            <div className="space-y-4">
              <h2 className="text-xs font-extrabold text-white uppercase tracking-wider">Yasal Belgeler</h2>
              <ul className="space-y-2.5 text-sm text-slate-200">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('/yasal/gizlilik-politikasi/')}
                    aria-label="Gizlilik Politikası ve Kişisel Verilerin Korunması sayfasına git"
                    className="hover:text-white transition-colors cursor-pointer font-medium"
                  >
                    Gizlilik Politikası
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('/yasal/cerez-politikasi/')}
                    aria-label="Çerez Politikası sayfasına git"
                    className="hover:text-white transition-colors cursor-pointer font-medium"
                  >
                    Çerez Politikası
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('/yasal/kvkk-aydinlatma-metni/')}
                    aria-label="KVKK Aydınlatma Metni sayfasına git"
                    className="hover:text-white transition-colors cursor-pointer font-medium"
                  >
                    KVKK Aydınlatma Metni
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('/yasal/hizmet-sartlari/')}
                    aria-label="Site Kullanım ve Hizmet Şartları Sözleşmesi sayfasına git"
                    className="hover:text-white transition-colors cursor-pointer font-medium"
                  >
                    Site Kullanım Şartları
                  </button>
                </li>
              </ul>
            </div>

            {/* 3. Sütun (Destek) */}
            <div className="space-y-4">
              <h2 className="text-xs font-extrabold text-white uppercase tracking-wider">Destek</h2>
              <ul className="space-y-2.5 text-sm text-slate-200">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('/destek/sss/')}
                    aria-label="Sıkça Sorulan Sorular (SSS) sayfasına git"
                    className="hover:text-white transition-colors cursor-pointer font-medium"
                  >
                    SSS (Sıkça Sorulan Sorular)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate('/proje-basvurusu/')}
                    aria-label="Kurumsal İletişim ve Proje Başvurusu sayfasına git"
                    className="hover:text-white transition-colors cursor-pointer font-medium"
                  >
                    İletişim
                  </button>
                </li>
                <li>
                  <a
                    href="https://wa.me/905057030194"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="+90 505 703 0194"
                    aria-label="VanGuard Studio Digital WhatsApp Destek Hattı ile iletişime geçin: +90 505 703 0194"
                    className="text-slate-200 hover:text-white transition-colors inline-flex items-center gap-1.5 font-medium"
                  >
                    <span>WhatsApp Destek Hattı</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* 4. Sütun (Bio / Kısa Tanım) */}
            <div className="space-y-3">
              <h2 className="text-xs font-extrabold text-white uppercase tracking-wider">Hakkımızda</h2>
              <p className="text-xs text-slate-200 leading-relaxed font-normal text-justify" style={{ textAlign: 'justify' }}>
                <strong className="font-bold text-white">VanGuard Studio Digital</strong>; B2B işletmeler, ihracatçılar ve geleneksel sektörler için kapsamı netleştirilmiş web çözümleri, özel yazılımlar ve bağımsız yapay zekâ (AI) fizibilite süreçleri tasarlar.
              </p>
            </div>

          </div>

        </div>

        {/* BOTTOM LAYER: Multinational Offices & Phone Hierarchy */}
        <div className="py-10 border-b border-slate-800 text-center space-y-6">
          <h2 className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold border border-slate-700 shadow-sm">
            <Globe className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span>Bölge Ofisleri &amp; Stratejik İşbirliği İletişim Hattı</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-100 max-w-5xl mx-auto">
            
            {/* Headquarters */}
            <div className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700 flex flex-col justify-center items-center text-center space-y-2 shadow-md">
              <h3 className="font-bold text-white text-sm">Genel Merkez (HQ)</h3>
              <span className="text-slate-200 font-medium">Antalya / Türkiye</span>
              <a
                href="tel:+905442258828"
                aria-label="VanGuard Studio Digital Antalya Genel Merkez (HQ) Kurumsal Doğrudan Telefon Hattı: +90 544 225 8828"
                className="font-mono font-bold text-blue-300 hover:text-blue-200 transition-colors pt-1"
              >
                +90 544 225 8828
              </a>
              <a 
                href="https://wa.me/905057030194" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="VanGuard Studio Digital Antalya Genel Merkez (HQ) Küresel Kurumsal WhatsApp Hattı üzerinden mesaj gönderin: +90 505 703 0194"
                className="font-mono font-bold text-emerald-300 hover:text-emerald-200 transition-colors cursor-pointer pt-0.5 inline-flex items-center gap-1.5"
              >
                <span>+90 505 703 0194</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-700 font-bold">WhatsApp</span>
              </a>
              <a
                href="mailto:info@vanguardstudio.digital"
                aria-label="VanGuard Studio Digital Resmi Kurumsal E-posta Adresi: info@vanguardstudio.digital"
                className="text-slate-200 hover:text-white text-[11px] pt-1 font-medium"
              >
                info@vanguardstudio.digital
              </a>
            </div>

            {/* Russia Strategic Cooperation Office */}
            <div className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700 flex flex-col justify-center items-center text-center space-y-2 shadow-md">
              <h3 className="font-bold text-white text-sm">Rusya Stratejik İşbirliği Ofisi</h3>
              <span className="text-slate-200 font-medium">Oktyabrskiy, Başkurt Cumhuriyeti, RF</span>
              <a 
                href="https://wa.me/905057030194" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="VanGuard Studio Digital Antalya Genel Merkez Küresel WhatsApp Koordinasyon Hattı: +90 505 703 0194"
                className="font-mono font-bold text-emerald-300 hover:text-emerald-200 transition-colors cursor-pointer pt-1 inline-flex items-center gap-1.5"
              >
                <span>+90 505 703 0194</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-700 font-bold">WhatsApp</span>
              </a>
              <a 
                href="https://wa.me/79273133597" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="VanGuard Studio Digital Rusya Stratejik İşbirliği Ofisi Resmi WhatsApp Operasyonel İletişim Hattı: +7 927 313 3597"
                className="font-mono font-bold text-emerald-300 hover:text-emerald-200 transition-colors cursor-pointer pt-0.5 inline-flex items-center gap-1.5"
              >
                <span>+7 927 313 3597</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-700 font-bold">WhatsApp</span>
              </a>
              <span className="text-slate-100 text-[11px] pt-1 font-semibold">Rusya Operasyonel Hattı</span>
            </div>

            {/* Kosovo Regional Office */}
            <div className="bg-slate-800/70 rounded-2xl p-6 border border-slate-700 flex flex-col justify-center items-center text-center space-y-2 shadow-md">
              <h3 className="font-bold text-white text-sm">Kosova Bölge Ofisi</h3>
              <span className="text-slate-100 font-medium">Prishtina - Kosova</span>
              <a 
                href="https://wa.me/905057030194" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="VanGuard Studio Digital Kosova Bölge Ofisi Küresel WhatsApp Koordinasyon Hattı: +90 505 703 0194"
                className="font-mono font-bold text-emerald-300 hover:text-emerald-200 transition-colors cursor-pointer pt-1 inline-flex items-center gap-1.5"
              >
                <span>+90 505 703 0194</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-700 font-bold">WhatsApp</span>
              </a>
              <a
                href="tel:+38349976844"
                aria-label="VanGuard Studio Digital Kosova Bölge Ofisi (Priştine) Standart Doğrudan Kurumsal Telefon Hattı: +383 49 976 844"
                className="font-mono text-white hover:text-blue-300 transition-colors font-bold pt-0.5"
              >
                +383 49 976 844
              </a>
              <span className="text-slate-100 text-[11px] pt-1 font-semibold">Kosova Bölge İletişim Hattı</span>
            </div>

          </div>

          {/* Resmi İştirak & Hukuki Katman (3 Bölge Ofisi Kutusunun Altında) - image_3934f65d.png Referansı */}
          <div className="max-w-5xl mx-auto bg-slate-900/80 rounded-2xl p-6 sm:p-7 border border-slate-800 text-xs text-slate-200 leading-relaxed shadow-lg space-y-3">
            <p className="text-justify font-normal text-slate-200 leading-relaxed" style={{ textAlign: 'justify' }}>
              <strong className="font-bold text-white">VanGuard Studio Digital</strong>, bir <strong className="font-bold text-white">İsmail Kaplan - Webnolojik Dijital Teknolojiler</strong> iştirakidir. Sitede sunulan tüm B2B yazılım, optimizasyon, yapay zeka mimarisi ve sunucusuz bulut çözümlerinin mali, hukuki ve operasyonel hakları resmi olarak <strong className="font-bold text-white">İsmail Kaplan - Webnolojik Dijital Teknolojiler</strong> ukdesindedir.
            </p>
            <div className="flex items-center justify-center pt-1">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-950 text-[11px] text-slate-300 border border-slate-800 font-mono">
                <span className="text-slate-400">Vergi Dairesi:</span>
                <strong className="font-semibold text-slate-100">Kalekapı Vergi Dairesi/Antalya</strong>
              </span>
            </div>
          </div>

        </div>

        {/* High-Contrast Legal Imprint & Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-200 gap-4">
          <div className="text-center sm:text-left font-medium text-slate-200">
            &copy; 2026 <strong className="font-bold text-white">VanGuard Studio Digital</strong> · <strong className="font-bold text-white">İsmail Kaplan - Webnolojik</strong>. Tüm hakları saklıdır.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-100">
            <button
              type="button"
              onClick={() => onNavigate('/yasal/gizlilik-politikasi/')}
              aria-label="Alt bilgi menüsünden Gizlilik Politikası sayfasına git"
              className="hover:text-white cursor-pointer font-semibold text-slate-100"
            >
              Gizlilik Politikası
            </button>
            <span className="text-slate-200" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onNavigate('/yasal/cerez-politikasi/')}
              aria-label="Alt bilgi menüsünden Çerez Politikası sayfasına git"
              className="hover:text-white cursor-pointer font-semibold text-slate-100"
            >
              Çerez Politikası
            </button>
            <span className="text-slate-200" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onNavigate('/yasal/hizmet-sartlari/')}
              aria-label="Alt bilgi menüsünden Site Kullanım Şartları sayfasına git"
              className="hover:text-white cursor-pointer font-semibold text-slate-100"
            >
              Site Kullanım Şartları
            </button>
            <span className="text-slate-200" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onNavigate('/site-haritasi/')}
              aria-label="Site Haritası (sitemap.xml ve robots.txt) sayfasına git"
              className="hover:text-white cursor-pointer font-semibold text-slate-100"
            >
              Site Haritası (sitemap.xml &amp; robots.txt)
            </button>
            <span className="text-slate-200" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onNavigate('/blog/')}
              aria-label="VanGuard Studio Digital B2B Teknoloji Bloguna git"
              className="hover:text-white cursor-pointer font-semibold text-slate-100"
            >
              B2B Blog
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
