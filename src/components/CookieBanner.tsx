import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

function setCookie(name: string, value: string, days: number = 365) {
  try {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  } catch {
    // In environments where document.cookie throws, fail silently
  }
}

function getCookie(name: string): string | null {
  try {
    if (typeof document === 'undefined' || !document.cookie) return null;
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1] || '') : r;
    }, null as string | null);
  } catch {
    return null;
  }
}

export const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const [hasConsentedState, setHasConsentedState] = useState(false);

  useEffect(() => {
    const consent = getCookie('vanguard_cookie_consent');
    if (!consent) {
      setShowBanner(true);
      setHasConsentedState(false);
    } else {
      setHasConsentedState(true);
    }
  }, []);

  const handleAcceptAll = () => {
    setCookie('vanguard_cookie_consent', JSON.stringify({ analytics: true, marketing: true }));
    setShowBanner(false);
    setShowSettingsModal(false);
    setHasConsentedState(true);
  };

  const handleRejectAll = () => {
    setCookie('vanguard_cookie_consent', JSON.stringify({ analytics: false, marketing: false }));
    setShowBanner(false);
    setShowSettingsModal(false);
    setHasConsentedState(true);
  };

  const handleSavePreferences = () => {
    setCookie('vanguard_cookie_consent', JSON.stringify({ analytics: analyticsEnabled, marketing: marketingEnabled }));
    setShowBanner(false);
    setShowSettingsModal(false);
    setHasConsentedState(true);
  };

  return (
    <>
      {/* 1. First Visit Bottom Banner */}
      {showBanner && (
        <div
          role="region"
          aria-label="Çerez Tercihleri Bildirimi"
          className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 text-white p-4 sm:p-6 shadow-2xl animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3.5 max-w-3xl">
              <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-300 border border-blue-500/30 shrink-0 mt-0.5" aria-hidden="true">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-sm tracking-tight text-white">Çerez Tercihleri</div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed text-justify" style={{ textAlign: 'justify' }}>
                  <strong className="font-bold text-white">VanGuard Studio Digital</strong> olarak, deneyiminizi geliştirmek ve yasal mevzuata uygun hareket etmek adına çerezler kullanıyoruz.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowSettingsModal(true)}
                aria-label="Çerez Ayarları penceresini aç"
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-white text-xs font-bold border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Çerez Ayarları
              </button>
              <button
                type="button"
                onClick={handleRejectAll}
                aria-label="Zorunlu olmayan tüm çerezleri reddet"
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-white text-xs font-bold border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Hepsini Reddet
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                aria-label="Tüm çerez tercihlerini kabul et"
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-500 transition-colors cursor-pointer"
              >
                Hepsini Kabul Et
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Bottom-Left Fixed Cookie Settings Icon (Visible after consent) */}
      {hasConsentedState && !showBanner && (
        <button
          type="button"
          onClick={() => setShowSettingsModal(true)}
          aria-label="Çerez Ayarlarını Yapılandır"
          className="fixed bottom-[20px] left-[20px] z-50 p-3.5 rounded-2xl bg-white text-slate-900 shadow-xl border border-slate-300 hover:bg-slate-50 hover:text-blue-700 active:scale-95 transition-all flex items-center justify-center group cursor-pointer"
          title="Çerez Ayarları"
        >
          <Cookie className="w-5 h-5 text-blue-700 group-hover:rotate-12 transition-transform" aria-hidden="true" />
        </button>
      )}

      {/* 3. Center Cookie Settings Modal */}
      {showSettingsModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 relative">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold" aria-hidden="true">
                  <Cookie className="w-5 h-5" />
                </div>
                <div>
                  <h2 id="cookie-modal-title" className="text-lg font-bold text-slate-900 tracking-tight">Çerez Ayarları</h2>
                  <p className="text-xs text-slate-700 font-medium">KVKK ve GDPR uyumlu veri tercihleri</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setShowSettingsModal(false)}
                aria-label="Çerez Ayarları penceresini kapat"
                className="p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-4">
              
              {/* Zorunlu Çerezler */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-slate-900">Zorunlu Çerezler</div>
                  <div className="text-xs text-slate-700">Sitenin güvenli çalışması için gereklidir.</div>
                </div>
                <div className="px-3 py-1 rounded-full bg-slate-200 text-slate-900 text-xs font-bold">
                  Her Zaman Açık
                </div>
              </div>

              {/* Analitik Çerezler */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="cookie-analytics" className="text-sm font-bold text-slate-900 cursor-pointer block">
                    Analitik Çerezler
                  </label>
                  <div className="text-xs text-slate-700">Site performansını anonim olarak ölçer.</div>
                </div>
                <label htmlFor="cookie-analytics" className="relative inline-flex items-center cursor-pointer">
                  <span className="sr-only">Analitik Çerezleri Etkinleştir</span>
                  <input 
                    id="cookie-analytics"
                    type="checkbox" 
                    aria-label="Analitik Çerezleri Etkinleştir"
                    checked={analyticsEnabled} 
                    onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Pazarlama Çerezler */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="cookie-marketing" className="text-sm font-bold text-slate-900 cursor-pointer block">
                    Pazarlama Çerezler
                  </label>
                  <div className="text-xs text-slate-700">İlgili içerik ve kampanyaları sunar.</div>
                </div>
                <label htmlFor="cookie-marketing" className="relative inline-flex items-center cursor-pointer">
                  <span className="sr-only">Pazarlama Çerezlerini Etkinleştir</span>
                  <input 
                    id="cookie-marketing"
                    type="checkbox" 
                    aria-label="Pazarlama Çerezlerini Etkinleştir"
                    checked={marketingEnabled} 
                    onChange={(e) => setMarketingEnabled(e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-400 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

            </div>

            {/* Modal Bottom Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handleRejectAll}
                aria-label="Tüm çerezleri reddet"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-slate-800 hover:text-slate-950 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Hepsini Reddet
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  aria-label="Tüm çerezleri kabul et"
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-200 text-slate-900 text-xs font-bold hover:bg-slate-300 transition-colors cursor-pointer"
                >
                  Hepsini Kabul Et
                </button>
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  aria-label="Seçilen çerez tercihlerini kaydet"
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Tercihleri Kaydet
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
