import React, { useEffect } from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { EcommerceStorefrontDemo } from '../demo/ecommerce/EcommerceStorefrontDemo';

interface EcommerceDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EcommerceDemoModal: React.FC<EcommerceDemoModalProps> = ({
  isOpen,
  onClose,
}) => {
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
      aria-label="E-Ticaret Otomasyonu Vitrini ve Giriş Kapısı İzole Simülasyonu"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-1 sm:p-4 animate-in fade-in duration-200"
    >
      {/* Sabit Acil Çıkış Butonu (Ekranın en sağ üst köşesinde kesin görünür) */}
      <button
        type="button"
        onClick={onClose}
        aria-label="E-Ticaret Simülasyonunu Kapat ve Ana Siteye Dön"
        className="fixed top-3 right-3 sm:top-5 sm:right-5 z-[10000] px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm shadow-[0_10px_35px_rgba(225,29,72,0.7)] border-2 border-white/40 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
      >
        <X className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        <span>Demodan Çık [X]</span>
      </button>

      {/* Fullscreen Isolated Layer Container */}
      <div className="relative w-full max-w-[1440px] h-[96vh] bg-zinc-950 rounded-3xl shadow-[0_25px_90px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col border border-zinc-800">
        {/* Top Isolation Control Bar */}
        <div className="bg-zinc-950 text-white px-4 sm:px-6 py-3 flex items-center justify-between border-b border-zinc-800 shrink-0 z-50">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-[#25D366] shrink-0" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-bold tracking-tight text-zinc-200">
              <strong className="font-extrabold text-white">VanGuard Studio Digital</strong> · E-Ticaret Otomasyonu Vitrini ve Giriş Kapısı
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="E-Ticaret Otomasyonu demo penceresini kapat"
            className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold transition-all inline-flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>Simülasyonu Kapat [X]</span>
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Isolated Storefront & Login Gate */}
        <div className="flex-grow overflow-y-auto">
          <EcommerceStorefrontDemo onExit={onClose} />
        </div>
      </div>
    </div>
  );
};
