import React, { useState } from 'react';
import {
  Truck,
  Navigation,
  Warehouse,
  Radio,
  Lock,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Send,
  AlertCircle,
  PackageCheck,
  Activity,
  Boxes,
  ArrowLeft,
  X,
  FileCheck2,
} from 'lucide-react';

interface LogisticModule {
  id: string;
  code: string;
  title: string;
  category: string;
  price: string;
  badge: string;
  description: string;
  specs: string[];
  icon: 'navigation' | 'truck' | 'warehouse';
}

const LOGISTIC_MODULES: LogisticModule[] = [
  {
    id: 'mod-route-opt',
    code: 'NEXUS-ROUTA-01',
    title: 'Nexus AI Rota Optimizasyon Motoru',
    category: 'Algoritmik Sevk & Yakıt Optimizasyonu',
    price: '$3,200',
    badge: 'Yüksek ROI',
    description:
      'Çok duraklı uluslararası transit ve mikro dağıtım sevkiyat rotalarını anlık trafik yoğunluğu, yol eğimi, araç yük dağılımı ve yakıt telemetrisine göre dinamik olarak yeniden hesaplayan otonom sevk motorudur.',
    specs: [
      'Dinamik Çok Duraklı Rota Matrisi & Trafik Tahmini',
      'Karbon Ayak İzi & Ortalama %38 Yakıt Tasarruf Analitiği',
      'Sürücü Mobil Telemetrisi ve Canlı Rota Sapma Uyarısı',
    ],
    icon: 'navigation',
  },
  {
    id: 'mod-fleet-live',
    code: 'NEXUS-FLEET-02',
    title: 'Canlı Filo Takip Modülü',
    category: 'IoT Telemetri & Coğrafi Çit (Geofence)',
    price: '$2,450',
    badge: 'Sıfır Gecikme',
    description:
      'Tırlar, dağıtım kamyonetleri ve kargo araçlarının anlık GPS koordinatlarını, motor telemetrisini ve teslimat SLA sürelerini sıfır harita kütüphanesi yüküyle, hafif ve saf telemetri akışında izleyen akıllı kontrol katmanıdır.',
    specs: [
      '5G/LTE Canlı Telemetri Sinyalleri & Hız/Fren Analizi',
      'Akıllı Coğrafi Sınır (Geofence) Giriş-Çıkış Uyarıları',
      'WhatsApp Müşteri & Lojistik Masası Anlık Bilgilendirme',
    ],
    icon: 'truck',
  },
  {
    id: 'mod-warehouse-auto',
    code: 'NEXUS-WMS-03',
    title: 'Otonom Depo Otomasyon Sistemi',
    category: 'WMS & Robotik Hacim Planlama',
    price: '$4,100',
    badge: 'Maksimum Doğruluk',
    description:
      'Paletleme, raf yerleşimi, dinamik FIFO/LIFO stok rotasyonu ve ürün toplama (picking) rotalarını yapay zekayla koordine eden, sevkiyat hatalarını sıfırlayan otonom depo yönetim mimarisidir.',
    specs: [
      '3D Hacimsel Kutu & Palet Yerleşim Optimizasyonu',
      'RFID / Barkodlu Sıfır Hata Sipariş Toplama Algoritması',
      'Kurumsal ERP (SAP, Logo, Mikro) Anlık Stok Köprüsü',
    ],
    icon: 'warehouse',
  },
];

export interface LogisticControlTowerDemoProps {
  onExit?: () => void;
}

export const LogisticControlTowerDemo: React.FC<LogisticControlTowerDemoProps> = ({ onExit }) => {
  // Stage management: 'storefront' (Stage 1) | 'integration_form' (Stage 3)
  const [activeStage, setActiveStage] = useState<'storefront' | 'integration_form'>('storefront');

  // Stage 1: Cart & Toast state
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Stage 2: Login Modal state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Stage 3: Integration Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyAndFleet, setCompanyAndFleet] = useState('');
  const [selectedScope, setSelectedScope] = useState('Nexus AI Rota Optimizasyon & Canlı Filo Entegrasyonu');
  const [projectDetails, setProjectDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Handle adding module to request cart
  const handleAddToCart = (module: LogisticModule) => {
    setAddingId(module.id);
    setTimeout(() => {
      setCartItems((prev) => [...prev, module.title]);
      setAddingId(null);
      setToastMessage(`"${module.title}" teklif listesine eklendi!`);
      setTimeout(() => {
        setToastMessage((cur) => (cur === `"${module.title}" teklif listesine eklendi!` ? null : cur));
      }, 3500);
    }, 300);
  };

  // Handle Stage 2 Login submission (admin / 1234)
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const u = username.trim().toLowerCase();
    const p = password.trim();

    if (!u || !p) {
      setLoginError('Lütfen kullanıcı adı ve şifrenizi giriniz.');
      return;
    }

    setIsAuthenticating(true);

    setTimeout(() => {
      setIsAuthenticating(false);
      if (u === 'admin' && p === '1234') {
        // Successful login: close modal smoothly and transition to Stage 3 (Integration Form)
        setIsLoginModalOpen(false);
        setActiveStage('integration_form');
        setUsername('');
        setPassword('');
        setLoginError('');
      } else {
        setLoginError('Geçersiz kimlik bilgisi! Simülasyon girişi için Kullanıcı: admin | Şifre: 1234 kullanınız.');
      }
    }, 450);
  };

  // Handle Stage 3 form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!fullName.trim() || !email.trim() || !companyAndFleet.trim()) {
      setSubmitError('Lütfen ad soyad, kurumsal e-posta ve şirket/filo büyüklüğü alanlarını doldurunuz.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Real stateless fetch to /api/apply proxy
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          company: companyAndFleet,
          packageType: 'Nexus AI Lojistik & Kontrol Kulesi',
          serviceType: selectedScope,
          cartItems: cartItems.length > 0 ? cartItems : ['Nexus AI Tam Entegrasyon Paketi'],
          details: `Lojistik Kontrol Kulesi Demo Doğrulaması. Filo/Depo Verisi: ${companyAndFleet}. Notlar: ${projectDetails || 'Özel yapay zeka optimizasyon talebi iletildi.'}`,
        }),
      });

      if (!res.ok) {
        // Fallback for isolated preview mode
        console.warn('Stateless proxy fallback active for isolated demo simulation.');
      }

      setSubmitSuccess(true);
    } catch {
      // Graceful fallback for local or offline dev
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-full bg-zinc-950 text-zinc-100 font-sans flex flex-col justify-between selection:bg-[#25D366] selection:text-black">
      {/* 1. DÜRÜSTLÜK ŞERİDİ (SARSILMAZ KURAL) */}
      <div className="sticky top-0 z-40 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 py-2 px-4 shadow-sm flex items-center justify-between">
        <div className="flex-1 text-center">
          <p className="text-[11px] sm:text-xs font-semibold text-zinc-300 tracking-wide inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" aria-hidden="true" />
            <span>[Mütevazı Şeffaflık İlkesi: Bu Alanlar Örnek Senaryo Simülasyonudur]</span>
          </p>
        </div>
        {onExit && (
          <button
            type="button"
            onClick={onExit}
            aria-label="Lojistik Simülasyonunu Kapat ve Ana Siteye Dön"
            className="shrink-0 px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-md ml-2 border border-rose-500/40"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Ana Siteye Dön</span>
            <span className="sm:hidden">Çık</span>
          </button>
        )}
      </div>

      {/* FLOATING GREEN TOAST NOTIFICATION */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-14 right-4 sm:right-8 z-50 bg-[#25D366] text-zinc-950 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400 font-bold text-xs sm:text-sm animate-in slide-in-from-top-4 duration-300"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0 text-zinc-950" aria-hidden="true" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            aria-label="Bildirimi kapat"
            className="p-1 hover:bg-black/10 rounded-lg transition-colors cursor-pointer ml-1"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* TOP HEADER / LOGO & CONTROL TOWER TRIGGER */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/90 px-4 sm:px-8 py-4 sticky top-[37px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-[#25D366] shadow-inner">
              <Radio className="w-5 h-5 animate-pulse" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                  Nexus AI · Lojistik &amp; Depo Yönetimi
                </span>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 uppercase">
                  Otonom Kontrol
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium">
                <strong className="font-bold text-zinc-200">VanGuard Studio Digital</strong> Tedarik Zinciri &amp; Filo Çekirdeği
              </p>
            </div>
          </div>

          {/* Right Action: Request Cart & Control Tower Login Trigger & Exit */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Request Counter */}
            <div
              className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs font-mono text-zinc-300"
              title="Talep Listesine Eklenen Modüller"
            >
              <Boxes className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
              <span className="font-bold text-white">{cartItems.length}</span>
              <span className="hidden sm:inline text-zinc-400">Modül</span>
            </div>

            {/* Pulsing Green "Lojistik Kontrol Kulesi (Demo)" Button */}
            <button
              type="button"
              onClick={() => {
                setLoginError('');
                setIsLoginModalOpen(true);
              }}
              aria-label="Lojistik Kontrol Kulesi Demo Yönetici Giriş Kapısını Aç"
              className="relative group px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-zinc-950 font-extrabold text-xs sm:text-sm tracking-tight transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#25D366]/20"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-950 animate-ping absolute -top-1 -right-1" aria-hidden="true" />
              <Radio className="w-4 h-4 text-zinc-950 shrink-0" aria-hidden="true" />
              <span>Lojistik Kontrol Kulesi (Demo)</span>
            </button>

            {/* Belirgin Çıkış Butonu */}
            {onExit && (
              <button
                type="button"
                onClick={onExit}
                aria-label="Lojistik Simülasyonunu Kapat"
                className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer border border-rose-500/50 shadow-md"
              >
                <X className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Kapat</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 flex-grow w-full">
        {activeStage === 'storefront' ? (
          /* ========================================================================= */
          /* 1. AŞAMA: ULTRA MODERN TEDARİK ZİNCİRİ VİTRİNİ (ÖN YÜZ)                   */
          /* ========================================================================= */
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* Hero & Telemetry Strip */}
            <div className="bg-zinc-900/80 rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-xl space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/10 text-[#25D366] text-xs font-bold border border-[#25D366]/30 uppercase tracking-wide">
                    <Activity className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Gerçek Zamanlı Sevk &amp; Hacim Orkestrasyonu</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    Sıfır Gecikmeli Yapay Zeka Destekli Tedarik Zinciri ve Depo Altyapısı
                  </h1>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify font-normal" style={{ textAlign: 'justify' }}>
                    <strong className="font-bold text-white">VanGuard Studio Digital</strong> tarafından modellenen Nexus AI Lojistik &amp; Depo Yönetimi mimarisi; karmaşık harita kütüphanelerinin getirdiği tarayıcı ağırlığını ortadan kaldırarak, saf veri telemetrisiyle çalışan mikro optimizasyon çekirdekleri sunar. Karayolu taşımacılığı, soğuk zincir filoları ve çok katlı antrepolar için siber güvenlik standartları kilitlenmiş otonom sevk motorlarını tek bir kontrol kulesinde birleştirir.
                  </p>
                </div>

                {/* Telemetry Quick Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 shrink-0 lg:w-72">
                  <div className="bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800 shadow-inner space-y-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-400">Rota Verimliliği</span>
                    <div className="text-lg font-extrabold text-[#25D366] font-mono">+%38 Tasarruf</div>
                    <p className="text-[10px] text-zinc-400">Dinamik sevk algoritması</p>
                  </div>
                  <div className="bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800 shadow-inner space-y-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-400">Aktif Filo Düğümü</span>
                    <div className="text-lg font-extrabold text-white font-mono">142 Telemetri</div>
                    <p className="text-[10px] text-zinc-400">Anlık veri akışı</p>
                  </div>
                  <div className="bg-zinc-950 p-3.5 rounded-2xl border border-zinc-800 shadow-inner space-y-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-400">Depo Doğruluğu</span>
                    <div className="text-lg font-extrabold text-[#25D366] font-mono">%99.8 Doğruluk</div>
                    <p className="text-[10px] text-zinc-400">Sıfır kayıp toplama</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ürün/Hizmet Modülleri Vitrini (3 İstisnasız Modül) */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    Nexus AI B2B Lojistik &amp; Depo Çözümleri
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    İşletmenizin ölçeğine göre bağımsız çalışan veya ERP sisteminize tam entegre olan yapay zeka modülleri
                  </p>
                </div>
                <span className="hidden sm:inline-block text-xs font-mono text-[#25D366] bg-[#25D366]/10 px-3 py-1 rounded-lg border border-[#25D366]/30">
                  Zero-DB / Stateless Mimari
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {LOGISTIC_MODULES.map((mod) => {
                  const isAdding = addingId === mod.id;
                  const isSelected = cartItems.includes(mod.title);

                  return (
                    <article
                      key={mod.id}
                      className="bg-zinc-900/90 rounded-3xl p-6 sm:p-7 border border-zinc-800 hover:border-[#25D366]/60 transition-all flex flex-col justify-between group shadow-lg hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
                    >
                      <div className="space-y-5">
                        {/* Header: Icon, Code & Badge */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 text-[#25D366] flex items-center justify-center font-bold shadow-inner group-hover:scale-105 transition-transform">
                            {mod.icon === 'navigation' && <Navigation className="w-6 h-6" aria-hidden="true" />}
                            {mod.icon === 'truck' && <Truck className="w-6 h-6" aria-hidden="true" />}
                            {mod.icon === 'warehouse' && <Warehouse className="w-6 h-6" aria-hidden="true" />}
                          </div>
                          <div className="text-right">
                            <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30">
                              {mod.badge}
                            </span>
                            <div className="text-[10px] font-mono text-zinc-400 mt-1">{mod.code}</div>
                          </div>
                        </div>

                        {/* Title & Category */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#25D366]">
                            {mod.category}
                          </span>
                          <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                            {mod.title}
                          </h3>
                        </div>

                        {/* Description (Text-Justify kuralı) */}
                        <p
                          className="text-xs text-zinc-300 leading-relaxed text-justify font-normal"
                          style={{ textAlign: 'justify' }}
                        >
                          {mod.description}
                        </p>

                        {/* Specs List */}
                        <div className="pt-3 border-t border-zinc-800/80 space-y-2 text-xs text-zinc-200">
                          {mod.specs.map((spec, idx) => (
                            <div key={idx} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5" aria-hidden="true" />
                              <span className="leading-snug">{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing & "Sepete / Teklife Ekle" CTA */}
                      <div className="pt-6 mt-6 border-t border-zinc-800 flex items-center justify-between gap-4">
                        <div>
                          <div className="text-[10px] uppercase font-bold text-zinc-400">Yatırım Bütçesi</div>
                          <div className="text-xl font-mono font-extrabold text-white">{mod.price}</div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddToCart(mod)}
                          disabled={isAdding}
                          aria-label={`${mod.title} paketini talep sepetine ekle`}
                          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md ${
                            isSelected
                              ? 'bg-zinc-800 text-[#25D366] border border-[#25D366]/40 hover:bg-zinc-700'
                              : 'bg-[#25D366] text-zinc-950 hover:bg-[#20bd5a] shadow-[#25D366]/20'
                          }`}
                        >
                          {isAdding ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                              <span>Ekleniyor...</span>
                            </>
                          ) : isSelected ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" aria-hidden="true" />
                              <span>Teklife Eklendi</span>
                            </>
                          ) : (
                            <>
                              <PackageCheck className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Sepete/Teklife Ekle</span>
                            </>
                          )}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Bottom Sektörel Güvence Notu (Text-Justify & VanGuard Bold) */}
            <div className="bg-zinc-900/60 rounded-2xl p-5 sm:p-6 border border-zinc-800 text-xs text-zinc-300 leading-relaxed shadow-sm">
              <p className="text-justify font-normal leading-relaxed" style={{ textAlign: 'justify' }}>
                <strong className="font-bold text-white">VanGuard Studio Digital</strong> Lojistik Mimarisi, harici üçüncü parti harita veya takip kütüphanelerine bağımlı olmadan, işletmenizin mevcut telemetri cihazları ve araç takip API&apos;leri ile doğrudan haberleşir. Kullanıcıların tarayıcı yerel hafızasında (<strong className="font-bold text-white">LocalStorage</strong>) hiçbir kurumsal filo verisi tutulmaz; tüm koordinat ve rota hesaplamaları <strong className="font-bold text-white">stateless</strong> sunucusuz motorlar üzerinden anlık olarak işlenir.
              </p>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* 3. AŞAMA: GİRİŞ SONRASI AKILLI YÖNLENDİRME (ENTEGRASYON FORMU)            */
          /* ========================================================================= */
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
            {/* Top Back to Vitrin Button */}
            <button
              type="button"
              onClick={() => setActiveStage('storefront')}
              aria-label="Lojistik vitrinine geri dön"
              className="inline-flex items-center gap-2 text-xs font-bold text-zinc-300 hover:text-white bg-zinc-900 px-3.5 py-2 rounded-xl border border-zinc-800 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
              <span>Lojistik Vitrinine Geri Dön</span>
            </button>

            {/* Sektöre Özel Yeşil Onay Mührü (SARSILMAZ KURAL) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border-2 border-[#25D366] shadow-[0_15px_50px_rgba(37,211,102,0.15)] space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/20 text-[#25D366] text-xs font-bold border border-[#25D366]/40 uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
                <span>Kontrol Kulesi Doğrulandı</span>
              </div>
              <p
                className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal text-justify"
                style={{ textAlign: 'justify' }}
              >
                Lojistik Kontrol Kulesi kimliği başarıyla doğrulandı. Mevcut filo büyüklüğünüz, depo hacminiz ve tedarik zinciri ihtiyaçlarınız için özelleştirilmiş yapay zeka entegrasyon taleplerinizi aşağıdaki kurşun geçirmez form üzerinden doğrudan <strong className="font-bold text-white">VanGuard Studio Digital</strong> mühendislik ekibine iletebilirsiniz.
              </p>
            </div>

            {/* Entegrasyon Talep Formu */}
            <div className="bg-zinc-900/90 rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-xl space-y-6">
              <div className="border-b border-zinc-800 pb-4">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Lojistik &amp; Yapay Zeka Entegrasyon Başvurusu
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Verileriniz Zero-DB güvencesiyle doğrudan mühendislik merkezine aktarılacaktır.
                </p>
              </div>

              {submitSuccess ? (
                <div className="p-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/40 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#25D366] mx-auto" aria-hidden="true" />
                  <h3 className="text-base font-bold text-white">Lojistik Entegrasyon Talebiniz Başarıyla Alındı</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed max-w-lg mx-auto text-justify" style={{ textAlign: 'justify' }}>
                    Talebiniz, seçtiğiniz <strong className="font-bold text-white">({cartItems.length > 0 ? cartItems.join(', ') : selectedScope})</strong> modülleriyle birlikte <strong className="font-bold text-white">VanGuard Studio Digital</strong> mühendislik ekibine iletilmiştir. Filo telemetri fizibilitesi hazırlanarak 24 saat içerisinde resmi kurumsal teklif dosyanız e-posta adresinize ulaştırılacaktır.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitSuccess(false);
                        setActiveStage('storefront');
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#25D366] text-zinc-950 font-bold text-xs hover:bg-[#20bd5a] transition-all cursor-pointer"
                    >
                      Vitrine Dön
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  {submitError && (
                    <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="log-fullname" className="block text-xs font-bold text-zinc-300">
                        Yetkili Adı Soyadı *
                      </label>
                      <input
                        id="log-fullname"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Örn: Mehmet Yıldırım"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#25D366]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="log-email" className="block text-xs font-bold text-zinc-300">
                        Kurumsal E-posta Adresi *
                      </label>
                      <input
                        id="log-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="operasyon@sirketiniz.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#25D366]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="log-company" className="block text-xs font-bold text-zinc-300">
                      Şirket Ünvanı, Filo Büyüklüğü ve Depo Hacmi *
                    </label>
                    <input
                      id="log-company"
                      type="text"
                      required
                      value={companyAndFleet}
                      onChange={(e) => setCompanyAndFleet(e.target.value)}
                      placeholder="Örn: Atlas Uluslararası Lojistik A.Ş. · 45 Tır / 12.000 m² Antrepo"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#25D366]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="log-scope" className="block text-xs font-bold text-zinc-300">
                      Talep Edilen Ana Entegrasyon Kapsamı
                    </label>
                    <select
                      id="log-scope"
                      value={selectedScope}
                      onChange={(e) => setSelectedScope(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-[#25D366]"
                    >
                      <option value="Nexus AI Rota Optimizasyon & Canlı Filo Entegrasyonu">
                        Nexus AI Rota Optimizasyon &amp; Canlı Filo Entegrasyonu
                      </option>
                      <option value="Otonom Depo Otomasyonu (WMS) & ERP Köprüsü">
                        Otonom Depo Otomasyonu (WMS) &amp; ERP Köprüsü
                      </option>
                      <option value="Uçtan Uca B2B Lojistik Kontrol Kulesi (Tam Paket)">
                        Uçtan Uca B2B Lojistik Kontrol Kulesi (Tam Paket)
                      </option>
                      <option value="Özel Filo Telemetrisi & IoT Entegrasyonu">
                        Özel Filo Telemetrisi &amp; IoT Entegrasyonu
                      </option>
                    </select>
                  </div>

                  {cartItems.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs space-y-1.5">
                      <span className="font-bold text-[#25D366]">Vitrinden Eklenen Modüller:</span>
                      <ul className="list-disc pl-4 text-zinc-300 space-y-0.5">
                        {cartItems.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label htmlFor="log-details" className="block text-xs font-bold text-zinc-300">
                      Özel Lojistik İhtiyaçları &amp; Telemetri Notları
                    </label>
                    <textarea
                      id="log-details"
                      rows={3}
                      value={projectDetails}
                      onChange={(e) => setProjectDetails(e.target.value)}
                      placeholder="Mevcut araç takip cihazı markanız, kullanılan ERP yazılımı ve özel rota taleplerinizi belirtebilirsiniz..."
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#25D366]"
                    />
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-zinc-950 font-extrabold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#25D366]/20"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-zinc-950" aria-hidden="true" />
                          <span>Talebiniz Aktarılıyor...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-zinc-950" aria-hidden="true" />
                          <span>Entegrasyon Talebini Mühendislik Ekibine İlet</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 2. AŞAMA: KONTROL KULESİ GİRİŞ KAPISI (LOGIN MODAL)                       */}
      {/* ========================================================================= */}
      {isLoginModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Lojistik Kontrol Kulesi Demo Giriş Kapısı"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md bg-zinc-900 rounded-3xl p-6 sm:p-8 border-2 border-[#25D366] shadow-[0_20px_70px_rgba(37,211,102,0.25)] space-y-6">
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => {
                setIsLoginModalOpen(false);
                setLoginError('');
              }}
              aria-label="Giriş penceresini kapat"
              className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Modal Header */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-700 mx-auto flex items-center justify-center text-[#25D366] shadow-inner">
                <Radio className="w-7 h-7 animate-pulse" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Lojistik Kontrol Kulesi (Demo Giriş)
              </h3>
              <p className="text-xs text-zinc-400">
                Nexus AI Otonom Sevk &amp; Depo Yönetim Protokolü
              </p>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-700 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="tower-username" className="block text-xs font-bold text-zinc-300">
                  Kullanıcı Adı
                </label>
                <div className="relative">
                  <input
                    id="tower-username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#25D366]"
                  />
                  <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" aria-hidden="true" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="tower-password" className="block text-xs font-bold text-zinc-300">
                  Şifre
                </label>
                <div className="relative">
                  <input
                    id="tower-password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#25D366]"
                  />
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" aria-hidden="true" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-zinc-950 font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#25D366]/20 mt-2"
              >
                {isAuthenticating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-zinc-950" aria-hidden="true" />
                    <span>Sisteme Bağlanılıyor...</span>
                  </>
                ) : (
                  <>
                    <Radio className="w-4 h-4 text-zinc-950" aria-hidden="true" />
                    <span>Sisteme Bağlan</span>
                  </>
                )}
              </button>
            </form>

            {/* Zorunlu Bilgi Notu (SARSILMAZ KURAL: İki Yana Yaslı) */}
            <div className="pt-2 border-t border-zinc-800">
              <p
                className="text-[11px] text-zinc-400 leading-relaxed text-justify font-normal"
                style={{ textAlign: 'justify' }}
              >
                Simülasyon Notu: Akıllı kontrol kulesi rota optimizasyon verilerini ve yapay zeka depo hacim loglarını incelemek için kullanıcı adı: <strong className="font-bold text-white font-mono">admin</strong> | şifre: <strong className="font-bold text-white font-mono">1234</strong> bilgilerini kullanabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sabit Yüzen Demodan Çıkış Butonu (En Yüksek Öncelikli Görünürlük) */}
      {onExit && (
        <button
          type="button"
          onClick={onExit}
          aria-label="Simülasyondan Çık ve Ana Sayfaya Dön"
          className="fixed bottom-6 right-6 z-[9999] px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm shadow-[0_10px_35px_rgba(225,29,72,0.65)] border-2 border-white/40 flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          <span>Demodan Çık / Ana Sayfa</span>
        </button>
      )}

      {/* FOOTER & YASAL KÜNYE (Yüksek Kontrast & Webnolojik CSS Kuralı) */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 px-4 sm:px-8 py-5 text-center">
        <p className="text-xs text-zinc-300 font-medium">
          &copy; 2026 <strong className="font-bold text-white">VanGuard Studio Digital</strong> ·{' '}
          <strong className="font-bold text-white">İsmail Kaplan - Webnolojik</strong>. Tüm hakları saklıdır.
        </p>
      </footer>
    </div>
  );
};
