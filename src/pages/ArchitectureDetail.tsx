import React, { useState } from 'react';
import { RoutePath } from '../types';
import { ArrowLeft, Hammer, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Clock, Sparkles, Eye } from 'lucide-react';
import { ArchitectureDemoModal } from '../components/ArchitectureDemoModal';

interface ArchitectureDetailProps {
  onNavigate: (route: RoutePath) => void;
}

export const ArchitectureDetail: React.FC<ArchitectureDetailProps> = ({ onNavigate }) => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white py-16 px-4 sm:px-6 lg:px-8">
      
      {/* Demo Modal */}
      <ArchitectureDemoModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />

      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Back navigation */}
        <div>
          <button
            type="button"
            onClick={() => onNavigate('/')}
            aria-label="Ana Sayfaya Dön"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Ana Sayfaya Dön</span>
          </button>
        </div>

        {/* Header Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-900 text-xs font-bold tracking-wide border border-teal-300">
            <Hammer className="w-3.5 h-3.5 text-teal-700" aria-hidden="true" />
            <span>Tasarım &amp; Yapı Sektörel Kapsam</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Mimarlık ve Nitelikli Tadilat Çözümleri
          </h1>
          <p className="text-lg text-slate-800 font-medium leading-relaxed max-w-3xl text-justify" style={{ textAlign: 'justify' }}>
            <strong className="font-bold text-slate-900">VanGuard Studio Digital</strong> tarafından projelerini yüksek çözünürlükle sergilemek ve nitelikli müşteri taleplerini kapıda filtrelemek isteyen mimarlık ofisleri için tasarlanmış web yapıları.
          </p>

          {/* Launch Demo Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setDemoModalOpen(true)}
              aria-label="Mimarlık Portföy Yönetim Paneli 5 sayfa canlı demosunu inceleyin"
              className="px-6 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-600 text-white font-extrabold text-sm shadow-lg shadow-teal-700/25 transition-all inline-flex items-center gap-2.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Mimarlık Portföy Yönetim Paneli Demosunu İnceleyin</span>
              <Eye className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Specifications */}
          <div className="lg:col-span-8 space-y-8">
            
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Kapsam Modülleri ve Teknik Sınırlar</h2>
              
              <div className="space-y-4 text-slate-800 text-sm leading-relaxed">
                <p className="text-justify" style={{ textAlign: 'justify' }}>
                  Mimarlık ve nitelikli tadilat ofisleri için en önemli varlık, tamamlanan projelerin estetik ve teknik detaylarıyla doğru hedef kitleye sunulmasıdır. Bu doğrultuda odaklanmış portföy mimarileri kuruyoruz.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Dahil Kapsam Modülleri:</div>
                <ul className="space-y-3 text-sm text-slate-800 font-medium">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Yüksek çözünürlüklü ve kategorilendirilmiş proje portföy görselleri sergileme alanı</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Aşamalı iş akışı ve metodoloji gösterim blokları</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Yapılandırılmış bütçe ve talep ön toplama formları</span>
                  </li>
                </ul>
              </div>

              {/* Şeffaf Sorumluluk Kutusu */}
              <div className="bg-slate-100 border border-slate-300 rounded-2xl p-6 text-xs sm:text-sm text-slate-900 leading-relaxed space-y-2">
                <div className="font-bold text-slate-950 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-teal-700" aria-hidden="true" />
                  <span>Şeffaf Sorumluluk Sınırları:</span>
                </div>
                <p className="text-justify" style={{ textAlign: 'justify' }}>
                  3D interaktif model gösterimleri, site içi canlı render motorları veya harici proje yönetim yazılımı entegrasyonları bu pakete dahil değildir.
                </p>
              </div>

            </div>

          </div>

          {/* Right Column: Pricing & Action Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-bold text-teal-300 uppercase tracking-widest">Mimarlık Paketi</span>
                <h2 className="text-2xl font-extrabold text-white">Mimarlık &amp; Tadilat</h2>
                <div className="text-xs text-slate-300 font-medium">Portföy ve talep toplama altyapısı</div>
              </div>

              <div className="py-6 border-y border-slate-800 space-y-2">
                <div className="text-xs text-slate-300 font-semibold">Önerilen Çözüm Modeli</div>
                <div className="text-base font-extrabold text-teal-300">Kurumsal Web / PRO</div>
                <div className="text-[11px] text-slate-300">(59.000 TL&apos;den başlayan fiyatlarla)</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                  <ShieldCheck className="w-4 h-4 text-teal-300" aria-hidden="true" />
                  <span>Yüksek Çözünürlüklü Portföy</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                  <Clock className="w-4 h-4 text-teal-300" aria-hidden="true" />
                  <span>Talep Ön Toplama Formları</span>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={() => setDemoModalOpen(true)}
                  aria-label="Portföy Panel Demosunu Aç"
                  className="w-full py-3.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Eye className="w-4 h-4" aria-hidden="true" />
                  <span>Portföy Panel Demosunu Aç</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/proje-basvurusu/')}
                  aria-label="Mimarlık sektörel projenizi planlayın"
                  className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
                >
                  <span>Sektörel Projenizi Planlayın</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
