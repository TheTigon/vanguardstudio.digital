import React from 'react';
import { RoutePath } from '../types';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { B2BProductionDemo } from '../demo/B2BProductionDemo';

interface DemoB2bCatalogProps {
  onNavigate: (route: RoutePath) => void;
}

export const DemoB2bCatalog: React.FC<DemoB2bCatalogProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-300">
          <ShieldAlert className="w-4 h-4" aria-hidden="true" />
          <span>[EKO Paket 5 Sayfa Örnek Simülasyonudur · B2B Endüstriyel Katalog]</span>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('/calismalar/')}
          aria-label="B2B Endüstriyel Katalog demosunu kapat ve Çalışmalar sayfasına dön"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors px-4 py-2 rounded-xl cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Demoyu Kapat [X]</span>
        </button>
      </div>

      <B2BProductionDemo />
    </div>
  );
};
