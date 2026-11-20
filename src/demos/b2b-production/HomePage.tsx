import React from 'react';
import { DemoPage } from './types';
import { Building2, ArrowRight, ShieldCheck, Cpu, Globe, CheckCircle2 } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: DemoPage) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 rounded-3xl overflow-hidden shadow-2xl mx-4 sm:mx-6 lg:mx-8 mt-6">
        <div className="absolute inset-0 z-0 opacity-35">
          <img 
            src="/assets/demos/b2b-hero-factory.svg" 
            alt="Industrial Machinery" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider border border-amber-500/30">
            <Building2 className="w-3.5 h-3.5" />
            <span>ISO 9001 Sertifikalı Endüstriyel Üretim</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Küresel Ölçekte Ağır Sanayi ve Hidrolik Sistem Çözümleri
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Yüksek basınçlı valf blokları, sfero döküm rulman yatakları ve özel alaşımlı pinyon dişlilerde 25 yıllık mühendislik ve ihracat tecrübesi.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => onNavigate('catalog')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Ürün Kataloğunu İnceleyin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Mühendislik İletişimi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Öne Çıkan Ürün Grupları</h2>
          <p className="text-sm text-slate-600">Uluslararası standartlarda üretilen, test raporlu ve sertifikalı endüstriyel bileşenler.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4 hover:shadow-md transition-all">
            <div className="h-48 rounded-2xl overflow-hidden bg-slate-900">
              <img src="/assets/demos/b2b-hydraulic-valve.svg" alt="Valf" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Hidrolik Pnömatik Sistemler</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Max 350 Bar çalışma basıncına dayanıklı, ISO 4401 normuna uygun valf blokları.</p>
            <button onClick={() => onNavigate('catalog')} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Katalogda Gör</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4 hover:shadow-md transition-all">
            <div className="h-48 rounded-2xl overflow-hidden bg-slate-900">
              <img src="/assets/demos/b2b-bearing-housing.svg" alt="Rulman" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Mekanik Güç Aktarım</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Sfero döküm (GGG-40) gövdeli, yüksek sıcaklığa dayanıklı flanşlı rulman yatakları.</p>
            <button onClick={() => onNavigate('catalog')} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Katalogda Gör</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4 hover:shadow-md transition-all">
            <div className="h-48 rounded-2xl overflow-hidden bg-slate-900">
              <img src="/assets/demos/b2b-pinion-gear.svg" alt="Dişli" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Dişli Sistemleri</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Isıl işlem görmüş 42CrMo4 iyileştirme çeliğinden imal edilmiş pinyon dişliler.</p>
            <button onClick={() => onNavigate('catalog')} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer">
              <span>Katalogda Gör</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
