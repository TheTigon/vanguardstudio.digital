import React from 'react';
import { RoutePath } from '../types';
import { ArrowRight, Sparkles, Globe, Cpu, ArrowDown, ShoppingCart, Truck } from 'lucide-react';

interface HeroProps {
  onNavigate: (route: RoutePath) => void;
  onScrollToSolutions: () => void;
  onOpenEcommerceDemo?: () => void;
  onOpenLogisticDemo?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onNavigate, 
  onScrollToSolutions, 
  onOpenEcommerceDemo,
  onOpenLogisticDemo 
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-white pt-16 pb-20 lg:pt-24 lg:pb-32 border-b border-slate-200/60">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Header Area */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold tracking-wide border border-blue-300 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" aria-hidden="true" />
            <span><strong className="font-extrabold">VanGuard Studio Digital</strong> · Kapsamı Net Web Çözümleri ve AI Fizibilite</span>
          </div>

          <h1 className="text-3xl sm:text-4xl xl:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            İşletmenize uygun web çözümleri, özel yazılım ve AI yol haritası.
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-800 font-medium leading-relaxed max-w-3xl mx-auto">
            Hızlı teslim kurumsal sitelerden işinize özel uygulamalara; yapay zekâ yatırımınızın fizibilitesinden teknik uygulama planına kadar, kapsamı ve maliyeti net çözümler.
          </p>

          {/* CTAs (Vibrant Corporate Blue + Direct E-Commerce & Logistic Demos) */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={onScrollToSolutions}
              aria-label="Hizmet ve çözüm modellerini incelemek için aşağı kaydırın"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-blue-600 text-white font-bold text-base shadow-xl shadow-blue-600/25 hover:bg-blue-700 hover:shadow-blue-600/40 active:scale-95 transition-all inline-flex items-center justify-center gap-3 group cursor-pointer"
            >
              <span>Çözümleri İnceleyin</span>
              <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
            </button>

            {onOpenEcommerceDemo && (
              <button
                type="button"
                onClick={onOpenEcommerceDemo}
                aria-label="Bağımsız 5 Sayfalık E-Ticaret Otomasyonu Canlı Demosunu Tam Ekran Aç"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-zinc-900 text-white font-bold text-base border-2 border-[#25D366] shadow-xl shadow-[#25D366]/20 hover:bg-zinc-800 active:scale-95 transition-all inline-flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-ping" aria-hidden="true" />
                <ShoppingCart className="w-5 h-5 text-[#25D366]" aria-hidden="true" />
                <span>E-Ticaret Demosu (5 Sayfa)</span>
              </button>
            )}

            {onOpenLogisticDemo && (
              <button
                type="button"
                onClick={onOpenLogisticDemo}
                aria-label="Nexus AI Lojistik Vitrini ve Kontrol Kulesi Canlı Demosunu Tam Ekran Aç"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-zinc-900 text-white font-bold text-base border-2 border-[#25D366] shadow-xl shadow-[#25D366]/20 hover:bg-zinc-800 active:scale-95 transition-all inline-flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-ping" aria-hidden="true" />
                <Truck className="w-5 h-5 text-[#25D366]" aria-hidden="true" />
                <span>Nexus AI Lojistik Demosu</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onNavigate('/nexus/')}
              aria-label="nexus AI Fizibilite Raporlama Servisini keşfedin"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900 text-white font-bold text-base shadow-lg shadow-slate-900/10 hover:bg-slate-800 active:scale-95 transition-all inline-flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" aria-hidden="true" />
              <span>nexus AI Fizibilitesini Keşfedin</span>
            </button>
          </div>

        </div>

        {/* Two Clear Needs Tracks Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card 1: Web veya Uygulama İhtiyacı */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/30 hover:border-blue-500/50 hover:shadow-2xl transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors" aria-hidden="true">
                <Globe className="w-7 h-7" />
              </div>
              <div className="text-xs font-extrabold text-blue-700 uppercase tracking-widest">Kurumsal &amp; Hızlı Başlangıç</div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Web veya Uygulama Geliştirmek İstiyorum</h2>
              <p className="text-slate-800 text-sm leading-relaxed text-justify" style={{ textAlign: 'justify' }}>
                İşletmeniz için 5 günde hızlı EKO web paketleri, gelişmiş PRO kurumsal siteler veya tamamen size özel anahtar teslim yazılım mimarileri.
              </p>
            </div>
            <div className="pt-8">
              <button
                type="button"
                onClick={onScrollToSolutions}
                aria-label="Web ve uygulama çözümlerini inceleyin"
                className="w-full py-3.5 rounded-xl bg-slate-100 text-slate-900 font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Çözümleri İnceleyin</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Card 2: AI Fizibilite (Dark contrast card with yellow sparkle) */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-amber-500 text-slate-950 text-[10px] font-extrabold px-3.5 py-1.5 rounded-bl-xl uppercase tracking-widest flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3 text-slate-950" aria-hidden="true" /> nexus AI
            </div>

            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/30 border border-blue-500/40 text-amber-400 flex items-center justify-center font-bold" aria-hidden="true">
                <Cpu className="w-7 h-7" />
              </div>
              <div className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">Yapay Zeka Karar Desteği</div>
              <h2 className="text-2xl font-bold text-white tracking-tight">AI Yatırımımı Değerlendirmek İstiyorum</h2>
              <p className="text-slate-200 text-sm leading-relaxed text-justify" style={{ textAlign: 'justify' }}>
                Yapay zeka ve dijitalleşme bütçenizi en verimli şekilde yönlendirin. Sektörünüze özel bağımsız fizibilite raporu ve mimari yol haritası alın.
              </p>
            </div>
            <div className="pt-8">
              <button
                type="button"
                onClick={() => onNavigate('/nexus/')}
                aria-label="nexus AI Fizibilite raporlama hizmetini keşfedin"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                <span>AI Fizibilitesini Keşfedin</span>
                <ArrowRight className="w-4 h-4 text-amber-300" aria-hidden="true" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
