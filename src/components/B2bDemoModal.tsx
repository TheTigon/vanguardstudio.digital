import React, { useEffect } from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { B2BProductionDemo } from '../demo/B2BProductionDemo';

interface B2bDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const B2bDemoModal: React.FC<B2bDemoModalProps> = ({ isOpen, onClose }) => {
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
      aria-label="B2B Endüstriyel Katalog 5 Sayfa Örnek Simülasyonu"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-1 sm:p-4 animate-in fade-in duration-200"
    >
      {/* Sabit Acil Çıkış Butonu (Ekranın en sağ üst köşesinde kesin görünür) */}
      <button
        type="button"
        onClick={onClose}
        aria-label="B2B Kataloğu Simülasyonunu Kapat ve Ana Siteye Dön"
        className="fixed top-3 right-3 sm:top-5 sm:right-5 z-[10000] px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm shadow-[0_10px_35px_rgba(225,29,72,0.7)] border-2 border-white/40 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
      >
        <X className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        <span>Demodan Çık [X]</span>
      </button>

      {/* Modal Container */}
      <div className="relative w-full max-w-7xl h-[95vh] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col border border-slate-700">
        {/* Modal Top Bar Header */}
        <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0 z-50">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
            <span className="text-xs sm:text-sm font-bold tracking-tight text-amber-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" aria-hidden="true" />
              <span>[EKO Paket 5 Sayfa Örnek Simülasyonudur · B2B Endüstriyel Katalog]</span>
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="B2B Endüstriyel Katalog demo penceresini kapat"
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold transition-all inline-flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>Kapat [X]</span>
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body: 5-Page Demo App */}
        <div className="flex-grow overflow-y-auto">
          <B2BProductionDemo />
        </div>
      </div>
    </div>
  );
};
