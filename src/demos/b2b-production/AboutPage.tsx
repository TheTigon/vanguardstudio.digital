import React from 'react';
import { Building2, ShieldCheck, Award, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5" />
          <span>Kurumsal Miras & Üretim Tarihi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Vanguard Industrial Tarihçesi ve Kalite Politikası
        </h1>
        <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
          1999 yılında Bursa Organize Sanayi Bölgesi'nde kurulan tesisimiz, bugün 45.000 m² kapalı alanda 320 uzman mühendis ve teknisyen kadrosuyla küresel otomotiv ve makine üreticilerine hizmet vermektedir.
        </p>
      </div>

      {/* Quality & Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Kalite Güvence ve Test Laboratuvarı</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Üretim hattımızdan çıkan her parça spektrometre analizi, 3 boyutlu koordinat ölçüm (CMM) ve basınç testlerinden geçirilerek sertifikalandırılır.
          </p>
          <ul className="space-y-2.5 text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>ISO 9001:2015 Kalite Yönetim Sistemi</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>IATF 16949 Otomotiv Kalite Standardı</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>CE ve PED Basınçlı Ekipman Direktifi Onayları</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">İhracat Ağı ve Küresel Vizyon</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
             başta Almanya, İtalya, Fransa ve ABD olmak üzere 34 farklı ülkeye yüksek kaliteli endüstriyel bileşen ihracatı gerçekleştiriyoruz.
          </p>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Üretim Kapasitesi</div>
            <div className="text-2xl font-extrabold text-slate-900">Yıllık 1.200.000+ Parça</div>
            <p className="text-xs text-slate-500">CNC dik işleme merkezleri ve robotik otomasyon hatları.</p>
          </div>
        </div>

      </div>

    </div>
  );
};
