import React from 'react';
import { RoutePath } from '../types';
import { ArrowLeft, Zap, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

interface EcoDetailProps {
  onNavigate: (route: RoutePath) => void;
}

export const EcoDetail: React.FC<EcoDetailProps> = ({ onNavigate }) => {
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold tracking-wide border border-emerald-300">
            <Zap className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
            <span>Standart &amp; Hızlı Teslimat Modeli</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Hızlı Web / EKO Paket Detayları
          </h1>
          <p className="text-lg text-slate-800 font-medium leading-relaxed max-w-3xl text-justify" style={{ textAlign: 'justify' }}>
            <strong className="font-bold text-slate-900">VanGuard Studio Digital</strong> tarafından belirli standart bileşenler kullanılarak hazırlanan, 4-5 sayfa ile sınırlandırılmış tek dilli kurumsal web siteleri için teknik kapsam ve şeffaf sorumluluk rehberi.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Specifications */}
          <div className="lg:col-span-8 space-y-8">
            
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Teknik Kapsam ve Kurulum Şartları</h2>
              
              <div className="space-y-4 text-slate-800 text-sm leading-relaxed">
                <p className="text-justify" style={{ textAlign: 'justify' }}>
                  EKO paket, bütçe dostu ve hızlı bir şekilde dijital dünyada var olmak isteyen işletmeler için tasarlanmıştır. Karmaşık özel yazılımlar yerine önceden test edilmiş standart bileşenler kullanılır.
                </p>
                <p className="text-justify" style={{ textAlign: 'justify' }}>
                  <strong className="text-slate-950">Teslimat Koşulu:</strong> Müşteri tarafından tüm içeriklerin (metin ve görseller) eksiksiz olarak hazır teslim edilmesi koşuluyla, planlanan takvimde <span className="text-slate-950 font-bold">5 iş gününde</span> kurulur.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Pakete Dahil Olanlar:</div>
                <ul className="space-y-3 text-sm text-slate-800 font-medium">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Önceden tanımlanmış fonksiyonel bileşen yapısı ile 4-5 sayfa kapasitesi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Tek dil seçeneği (Türkçe)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>İletişim formları ve temel kurumsal tanıtım alanları</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>1 toplu revizyon hakkı</span>
                  </li>
                </ul>
              </div>

              {/* Şeffaf Sorumluluk Kutusu with internal links to PRO and Özel Mimari */}
              <div className="bg-slate-100 border border-slate-300 rounded-2xl p-6 text-xs sm:text-sm text-slate-900 leading-relaxed space-y-2">
                <div className="font-bold text-slate-950 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700" aria-hidden="true" />
                  <span>Şeffaf Sorumluluk Sınırları:</span>
                </div>
                <p className="text-justify" style={{ textAlign: 'justify' }}>
                  Özel yönetim paneli, üyelik sistemi, veri tabanı, ödeme entegrasyonu veya harici API bağlantısı içermez. Daha gelişmiş modüler altyapılar için <button type="button" onClick={() => onNavigate('/cozumler/kurumsal-web/')} aria-label="Kurumsal Web PRO paketini incele" className="text-blue-700 font-bold underline hover:text-blue-900 inline cursor-pointer">PRO</button> paketimizi ya da karmaşık süreçler için <button type="button" onClick={() => onNavigate('/cozumler/ozel-yazilim/')} aria-label="Özel Mimari modelini incele" className="text-blue-700 font-bold underline hover:text-blue-900 inline cursor-pointer">Özel Mimari</button> modelimizi inceleyebilirsiniz.
                </p>
              </div>

            </div>

          </div>

          {/* Right Column: Pricing & Action Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Hızlı Başlangıç</span>
                <h2 className="text-2xl font-extrabold text-white">Hızlı Web / EKO</h2>
                <div className="text-xs text-slate-300 font-medium">Sabit kapsamlı standart site</div>
              </div>

              <div className="py-6 border-y border-slate-800 space-y-2">
                <div className="text-xs text-slate-300 font-semibold">Başlangıç Bedeli</div>
                <div className="text-xl font-extrabold text-amber-300">19.900 TL</div>
                <div className="text-[11px] text-slate-300">(Vergi hariç · Tek seferlik kurulum)</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                  <Clock className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  <span>5 İş Gününde Kurulum</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  <span>Cloudflare + Resend Altyapı Güvencesi</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/proje-basvurusu/')}
                  aria-label="Hızlı Web EKO Paket için başvurun"
                  className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  <span>Hızlı Web İçin Başvurun</span>
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
