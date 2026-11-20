import React from 'react';
import { RoutePath } from '../types';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { RestoranMenuDemo } from '../demo/RestoranMenuDemo';

interface DemoRestaurantMenuProps {
  onNavigate: (route: RoutePath) => void;
}

export const DemoRestaurantMenu: React.FC<DemoRestaurantMenuProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-16">
      <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-300">
          <ShieldAlert className="w-4 h-4" aria-hidden="true" />
          <span>[EKO Paket 5 Sayfa Örnek Simülasyonudur · VanGuard Bistro &amp; Cafe]</span>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('/calismalar/')}
          aria-label="Restoran ve Kafe demosunu kapat ve Çalışmalar sayfasına dön"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors px-4 py-2 rounded-xl cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Demoyu Kapat [X]</span>
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-6">
        <RestoranMenuDemo />
      </div>
    </div>
  );
};
