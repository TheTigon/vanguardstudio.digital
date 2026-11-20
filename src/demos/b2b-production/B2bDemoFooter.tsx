import React from 'react';
import { DemoPage } from './types';
import { Building2, ShieldCheck, Mail, MapPin } from 'lucide-react';

interface B2bDemoFooterProps {
  onNavigate: (page: DemoPage) => void;
}

export const B2bDemoFooter: React.FC<B2bDemoFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-900 flex items-center justify-center font-bold" aria-hidden="true">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="font-extrabold tracking-tight text-lg">VANGUARD INDUSTRIAL</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed text-justify">
            Endüstriyel valf, hidrolik blok ve ağır hizmet mekanik aksam üretiminde küresel standartlar. ISO 9001 sertifikalı tesis.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-white">Hızlı Menü (5 Sayfa)</h2>
          <ul className="space-y-2 text-xs text-slate-200">
            <li><button type="button" onClick={() => onNavigate('home')} aria-label="1. Ana Sayfaya git" className="hover:text-white cursor-pointer">1. Ana Sayfa</button></li>
            <li><button type="button" onClick={() => onNavigate('about')} aria-label="2. Kurumsal Hakkımızda sayfasına git" className="hover:text-white cursor-pointer">2. Kurumsal / Hakkımızda</button></li>
            <li><button type="button" onClick={() => onNavigate('catalog')} aria-label="3. Ürün Kataloğu sayfasına git" className="hover:text-white cursor-pointer">3. Ürün Kataloğu</button></li>
            <li><button type="button" onClick={() => onNavigate('cart')} aria-label="4. Teklif Sepeti sayfasına git" className="hover:text-white cursor-pointer">4. Teklif Sepeti</button></li>
            <li><button type="button" onClick={() => onNavigate('contact')} aria-label="5. İletişim sayfasına git" className="hover:text-white cursor-pointer">5. İletişim</button></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-white">İletişim &amp; Merkez (Kurgusal)</h2>
          <div className="space-y-2 text-xs text-slate-200">
            <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" /><span>1. OSB, Örnek Sanayi Cad. No: 100, Bursa (Demo Adres)</span></div>
            <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" /><span>ornek-teklif@vanguard-industrial-demo.tes</span></div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-white">EKO Paket Güvencesi</h2>
          <div className="bg-slate-900 rounded-xl p-3 border border-slate-700 text-xs text-slate-100 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-300">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>5 İş Günü Teslim</span>
            </div>
            <p className="text-[11px] text-slate-200 text-justify">Bu simülasyon <strong className="font-bold text-white">VanGuard Studio Digital</strong> EKO paket altyapısıyla oluşturulmuştur.</p>
          </div>
        </div>

      </div>
      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-slate-800 text-center text-xs text-slate-100 font-medium">
        &copy; 2026 <strong className="font-bold text-white">VanGuard Studio Digital</strong> · <span className="font-bold text-white">İsmail Kaplan - <strong className="text-amber-400 font-bold">Web</strong>nolojik</span>
      </div>
    </footer>
  );
};
