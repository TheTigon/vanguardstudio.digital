import React, { useState } from 'react';
import { RoutePath } from '../types';
import { ArrowLeft, Building2, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Clock, Eye, Sparkles, ShoppingCart } from 'lucide-react';
import { B2bDemoModal } from '../components/B2bDemoModal';
import { EcommerceDemoModal } from '../components/EcommerceDemoModal';

interface B2bManufacturingDetailProps {
  onNavigate: (route: RoutePath) => void;
}

export const B2bManufacturingDetail: React.FC<B2bManufacturingDetailProps> = ({ onNavigate }) => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [ecommerceModalOpen, setEcommerceModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white py-16 px-4 sm:px-6 lg:px-8">
      
      {/* Demo Modal Popups */}
      <B2bDemoModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />
      <EcommerceDemoModal isOpen={ecommerceModalOpen} onClose={() => setEcommerceModalOpen(false)} />

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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold tracking-wide border border-amber-300">
            <Building2 className="w-3.5 h-3.5 text-amber-800" aria-hidden="true" />
            <span>B2B Üretim &amp; İhracat Sektörel Kapsam</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            B2B Üretim, Tedarik ve İhracat Çözümleri
          </h1>
          <p className="text-lg text-slate-800 font-medium leading-relaxed max-w-3xl text-justify" style={{ textAlign: 'justify' }}>
            <strong className="font-bold text-slate-900">VanGuard Studio Digital</strong> olarak küresel pazarda varlık gösteren üreticiler ve ihracatçı işletmeler için kapsamı ve teknik sınırları netleştirilmiş kurumsal web yapıları sunuyoruz.
          </p>

          {/* Launch Demo Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setEcommerceModalOpen(true)}
              aria-label="Bağımsız E-Ticaret Otomasyonu 5 Sayfalık İzole SaaS Demosunu Aç"
              className="px-6 py-3.5 rounded-2xl bg-zinc-950 hover:bg-zinc-900 text-[#25D366] border-2 border-[#25D366] font-extrabold text-sm shadow-lg transition-all inline-flex items-center gap-2.5 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" aria-hidden="true" />
              <span>E-Ticaret Otomasyonu Demosunu Aç (5 Sayfa İzole SaaS)</span>
              <Eye className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setDemoModalOpen(true)}
              aria-label="B2B Endüstriyel Katalog EKO Demo Arayüzünü İnceleyin"
              className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/25 transition-all inline-flex items-center gap-2.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>EKO Demo Arayüzünü İnceleyin (5 Sayfalı Canlı Simülasyon)</span>
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
                  Üretim ve ihracat yapan işletmelerin en temel dijital ihtiyacı; ürün portföyünü uluslararası standartlarda sergilemek, teknik dokümanları güvenle paylaşmak ve potansiyel alıcılardan yapılandırılmış teklifler toplamaktır.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Dahil Kapsam Modülleri:</div>
                <ul className="space-y-3 text-sm text-slate-800 font-medium">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Dijital ürün kataloğu altyapısı</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Teknik döküman, sertifika ve PDF paylaşım alanları</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Çok dilli (TR/EN) kurumsal mimari</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Yapılandırılmış kurumsal teklif talebi formları</span>
                  </li>
                </ul>
              </div>

              {/* Şeffaf Sorumluluk Kutusu */}
              <div className="bg-slate-100 border border-slate-300 rounded-2xl p-6 text-xs sm:text-sm text-slate-900 leading-relaxed space-y-2">
                <div className="font-bold text-slate-950 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700" aria-hidden="true" />
                  <span>Şeffaf Sorumluluk Sınırları:</span>
                </div>
                <p className="text-justify" style={{ textAlign: 'justify' }}>
                  Mevcut ERP, canlı stok takip otomasyonları veya dinamik fiyat taahhüt entegrasyonları bu başlangıç kapsamının dışındadır. Bu tarz ileri düzey veri bağlantıları sadece Ücretli Analiz Süreci sonrasında <button type="button" onClick={() => onNavigate('/cozumler/ozel-yazilim/')} aria-label="Özel Mimari modelini incele" className="text-blue-700 font-bold underline hover:text-blue-900 inline cursor-pointer">Özel Mimari</button> modeli altında projelendirilebilir.
                </p>
              </div>

            </div>

          </div>

          {/* Right Column: Pricing & Action Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">B2B Uzmanlık</span>
                <h2 className="text-2xl font-extrabold text-white">B2B Üretim &amp; İhracat</h2>
                <div className="text-xs text-slate-300 font-medium">Kurumsal e-ihracat altyapısı</div>
              </div>

              <div className="py-6 border-y border-slate-800 space-y-2">
                <div className="text-xs text-slate-300 font-semibold">Önerilen Çözüm Modeli</div>
                <div className="text-base font-extrabold text-amber-300">Kurumsal Web / PRO</div>
                <div className="text-[11px] text-slate-300">(59.000 TL&apos;den başlayan fiyatlarla)</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                  <ShieldCheck className="w-4 h-4 text-amber-300" aria-hidden="true" />
                  <span>Çok Dilli Katalog Mimarisi</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                  <Clock className="w-4 h-4 text-amber-300" aria-hidden="true" />
                  <span>Teknik Doküman Paylaşımı</span>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={() => setDemoModalOpen(true)}
                  aria-label="B2B 5 Sayfalık Demoyu Aç"
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Eye className="w-4 h-4" aria-hidden="true" />
                  <span>5 Sayfalık Demoyu Aç</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/proje-basvurusu/')}
                  aria-label="B2B sektörel projenizi planlayın"
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
