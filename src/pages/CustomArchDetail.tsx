import React from 'react';
import { RoutePath } from '../types';
import { ArrowLeft, Cpu, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

interface CustomArchDetailProps {
  onNavigate: (route: RoutePath) => void;
}

export const CustomArchDetail: React.FC<CustomArchDetailProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white py-16 px-4 sm:px-6 lg:px-8">
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 text-violet-900 text-xs font-bold tracking-wide border border-violet-300">
            <Cpu className="w-3.5 h-3.5 text-violet-700" aria-hidden="true" />
            <span>İleri Düzey Entegrasyon &amp; Özel Mimari</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Özel Mimari &amp; Kurumsal Uygulamalar
          </h1>
          <p className="text-lg text-slate-800 font-medium leading-relaxed max-w-3xl text-justify" style={{ textAlign: 'justify' }}>
            <strong className="font-bold text-slate-900">VanGuard Studio Digital</strong> tarafından işletmeye özel süreç haritaları, farklı kullanıcı rolleri, karmaşık veri yapıları ve harici sistem entegrasyonları gerektiren özel web uygulamaları.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Specifications */}
          <div className="lg:col-span-8 space-y-8">
            
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Analiz Süreci ve Mimari Yaklaşım</h2>
              
              <div className="space-y-4 text-slate-800 text-sm leading-relaxed">
                <p className="text-justify" style={{ textAlign: 'justify' }}>
                  Özel mimari projeleri, standart şablonlarla veya önceden belirlenmiş sabit paketlerle çözülemeyecek kadar niş ve çok rollü iş akışları barındırır. Bu nedenle her özel proje titiz bir analiz ve dokümantasyon aşaması gerektirir.
                </p>
                <p className="text-justify" style={{ textAlign: 'justify' }}>
                  <strong className="text-slate-950">Çalışma Şekli:</strong> Süreç her zaman ücretli bir analiz çalışması ile başlar. İş süreçleri, veri akışları ve entegrasyon haritası doğrulanmadan kesin geliştirme bedeli veya kesin takvim taahhüdü verilmez.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Kapsam Maddeleri:</div>
                <ul className="space-y-2.5 text-sm text-slate-800 font-medium">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-violet-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Kullanıcı rolleri ve yetkilendirme hiyerarşisi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-violet-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Mevcut ERP, CRM veya harici API sistemleri ile entegrasyon</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-violet-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Aşamalı ve doğrulanabilir kilometre taşları (Milestones)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-violet-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Net teknik kabul kriterleri ve kod mülkiyeti devir şartları</span>
                  </li>
                </ul>
              </div>

              {/* Şeffaf Sorumluluk Kutusu */}
              <div className="bg-slate-100 border border-slate-300 rounded-2xl p-6 text-xs sm:text-sm text-slate-900 leading-relaxed space-y-2">
                <div className="font-bold text-slate-950 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-violet-700" aria-hidden="true" />
                  <span>Şeffaf Sorumluluk Sınırları:</span>
                </div>
                <p className="text-justify" style={{ textAlign: 'justify' }}>
                  Gereksinimler netleşmeden sabit teslim veya geliştirme bedeli verilmez. Standart modüler ihtiyaçlar için <button type="button" onClick={() => onNavigate('/cozumler/kurumsal-web/')} aria-label="PRO Kurumsal modelini incele" className="text-violet-700 font-bold underline hover:text-violet-900 inline cursor-pointer">PRO Kurumsal</button> modelimizi tercih edebilirsiniz.
                </p>
              </div>

            </div>

          </div>

          {/* Right Column: Pricing & Action Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-bold text-violet-300 uppercase tracking-widest">Özel Mimari</span>
                <h2 className="text-2xl font-extrabold text-white">Özel Mimari &amp; Kurumsal</h2>
                <div className="text-xs text-slate-300 font-medium">Analiz tabanlı özel geliştirme</div>
              </div>

              <div className="py-6 border-y border-slate-800 space-y-2">
                <div className="text-xs text-slate-300 font-semibold">Fiyatlandırma</div>
                <div className="text-lg font-extrabold text-amber-300">Analiz Sonrası Teklif Edilir</div>
                <div className="text-[11px] text-slate-300">(Ücretli Analiz Çalışması Zorunludur)</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                  <Clock className="w-4 h-4 text-violet-300" aria-hidden="true" />
                  <span>Aşamalı Kilometre Taşları</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                  <ShieldCheck className="w-4 h-4 text-violet-300" aria-hidden="true" />
                  <span>Net Kabul Kriterleri</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/proje-basvurusu/')}
                  aria-label="Özel Mimari analiz çalışmasını planlayın"
                  className="w-full py-3.5 rounded-xl bg-violet-600 text-white font-bold text-sm hover:bg-violet-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-600/30 cursor-pointer"
                >
                  <span>Analiz Çalışmasını Planlayın</span>
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
