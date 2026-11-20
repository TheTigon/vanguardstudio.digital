import React, { useEffect } from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { RestoranMenuDemo } from '../demo/RestoranMenuDemo';

interface RestaurantDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RestaurantDemoModal: React.FC<RestaurantDemoModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const handleCloseAll = () => onClose();

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('close-all-demos', handleCloseAll);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('close-all-demos', handleCloseAll);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Restoran ve Kafe 5 Sayfa Örnek Simülasyonu"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-1 sm:p-4 animate-in fade-in duration-200"
    >
      {/* Sabit Acil Çıkış Butonu (Ekranın en sağ üst köşesinde kesin görünür) */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Restoran Menü Simülasyonunu Kapat ve Ana Siteye Dön"
        className="fixed top-3 right-3 sm:top-5 sm:right-5 z-[10000] px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm shadow-[0_10px_35px_rgba(225,29,72,0.7)] border-2 border-white/40 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
      >
        <X className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        <span>Demodan Çık [X]</span>
      </button>

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-[95vh] bg-slate-900 rounded-[32px] shadow-2xl overflow-hidden flex flex-col border border-slate-700">
        {/* Top Header Banner */}
        <div className="bg-slate-950 text-white px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0 z-50">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-bold tracking-tight text-amber-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>[EKO Paket 5 Sayfa Örnek Simülasyonudur · VanGuard Bistro &amp; Cafe]</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Restoran ve Kafe demo penceresini kapat"
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold transition-all inline-flex items-center gap-2 cursor-pointer shadow-md shrink-0"
          >
            <span>Kapat [X]</span>
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body: 5-Page Mobile-First Interactive Restaurant Demo */}
        <div className="flex-grow overflow-y-auto bg-slate-900 flex items-start sm:items-center justify-center p-2 sm:p-6">
          <RestoranMenuDemo />
        </div>
      </div>
    </div>
  );
};
