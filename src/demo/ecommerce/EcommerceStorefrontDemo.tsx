import React, { useState } from 'react';
import {
  ShoppingCart,
  Lock,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Loader2,
  Send,
  AlertCircle,
  Package,
  Cpu,
  Truck,
  Globe,
  KeyRound,
  UserCheck,
  ArrowLeft,
  X,
} from 'lucide-react';

interface StorePackage {
  id: string;
  code: string;
  title: string;
  category: string;
  price: string;
  badge: string;
  description: string;
  specs: string[];
  icon: 'package' | 'cpu' | 'truck' | 'globe';
}

const B2B_PACKAGES: StorePackage[] = [
  {
    id: 'pkg-enterprise-core',
    code: 'B2B-CORE-01',
    title: 'Kurumsal B2B Omnichannel Mağaza Çekirdeği',
    category: 'Tam Otomasyon Paketi',
    price: '$2,450',
    badge: 'En Çok Tercih Edilen',
    description:
      'Yüksek hacimli toptan ve perakende operasyonlar için sıfır gecikmeli sepet mimarisi, bayi kademeli fiyatlandırma motoru ve çoklu döviz kuru senkronizasyonu sağlayan anahtar teslim B2B ticaret çekirdeğidir.',
    specs: [
      'Dinamik Bayi İskonto & Kademeli Fiyat Motoru',
      'Çoklu Depo ve Anlık Stok Blokaj Senkronizasyonu',
      '256-Bit SSL & 3D Secure Sanal POS Orkestrasyonu',
    ],
    icon: 'package',
  },
  {
    id: 'pkg-erp-bridge',
    code: 'B2B-ERP-02',
    title: 'Gerçek Zamanlı ERP & E-Fatura Köprüsü',
    category: 'Finans & Muhasebe Entegrasyonu',
    price: '$1,650',
    badge: 'Tam Otomatik',
    description:
      'Mağaza üzerinden onaylanan her siparişi saniyeler içinde kurumsal ERP yazılımınıza aktaran, GİB e-Fatura ve e-Arşiv belgelerini insan müdahalesi olmaksızın kesip müşteriye ileten yüksek güvenlikli veri köprüsüdür.',
    specs: [
      'SAP, Logo, Mikro ve Netsis Çift Yönlü Veri Akışı',
      'Otomatik E-Fatura / E-İrsaliye Üretim Servisi',
      'Cari Hesap Ekstresi ve Online Tahsilat Modülü',
    ],
    icon: 'cpu',
  },
  {
    id: 'pkg-logistics-hub',
    code: 'B2B-LOG-03',
    title: 'Akıllı Kargo & Global Lojistik Otomasyonu',
    category: 'Fulfillment & Dağıtım',
    price: '$1,290',
    badge: 'Hızlı Teslimat',
    description:
      'Sipariş onaylandığı anda en uygun kargo firmasını seçerek barkod üreten, depo toplama listelerini optimize eden ve alıcıya WhatsApp üzerinden canlı kargo takip bildirimleri gönderen lojistik otomasyon katmanıdır.',
    specs: [
      'Tek Tıkla Toplu Kargo Barkodu & Konşimento Basımı',
      'Otomatik WhatsApp & SMS Teslimat Bildirim Hattı',
      'Yurtiçi ve Mikro İhracat (ETGB) Gümrük Entegrasyonu',
    ],
    icon: 'truck',
  },
  {
    id: 'pkg-global-b2b',
    code: 'B2B-EXP-04',
    title: 'Sınır Ötesi B2B İhracat & Çok Dilli Vitrin',
    category: 'Global E-İhracat Modülü',
    price: '$1,950',
    badge: 'Global Ölçek',
    description:
      'Avrupa, Orta Doğu ve CIS pazarlarına doğrudan satış yapmak isteyen üreticiler için lokasyona göre otomatik dil, para birimi ve yerel ödeme yöntemi (Stripe, SEPA, SWIFT) sunan uluslararası ticaret modülüdür.',
    specs: [
      'IP Bazlı Otomatik Ülke, Dil ve Döviz Yönlendirmesi',
      'Uluslararası B2B Proforma ve Paketleme Listesi Üretimi',
      'Global CDN ile Tüm Kıtalar Arası <50ms Açılış Hızı',
    ],
    icon: 'globe',
  },
];

export interface EcommerceStorefrontDemoProps {
  onExit?: () => void;
}

export const EcommerceStorefrontDemo: React.FC<EcommerceStorefrontDemoProps> = ({ onExit }) => {
  // Stage state: 'storefront' (Stage 1) or 'integration_form' (Stage 3)
  const [activeStage, setActiveStage] = useState<'storefront' | 'integration_form'>('storefront');

  // Stage 1: Cart & Toast state
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Stage 2: Login Modal state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isClosingLoginModal, setIsClosingLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Stage 3: VanGuard Studio Digital Integration Request Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyAndSector, setCompanyAndSector] = useState('');
  const [selectedIntegrationScope, setSelectedIntegrationScope] = useState(
    'B2B E-Ticaret Otomasyonu & ERP Entegrasyonu'
  );
  const [requestDetails, setRequestDetails] = useState('');
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // Handle "Sepete Ekle"
  const handleAddToCart = (pkg: StorePackage) => {
    setAddingId(pkg.id);
    setTimeout(() => {
      setCartItems((prev) => [...prev, pkg.title]);
      setAddingId(null);
      setToastMessage(`"${pkg.title}" sepete eklendi!`);
      setTimeout(() => {
        setToastMessage((current) =>
          current === `"${pkg.title}" sepete eklendi!` ? null : current
        );
      }, 3600);
    }, 350);
  };

  // Handle Stage 2 Login Submit (admin / 1234)
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    if (cleanUser === 'admin' && cleanPass === '1234') {
      setIsAuthenticating(true);
      setTimeout(() => {
        setIsAuthenticating(false);
        setIsClosingLoginModal(true);
        setTimeout(() => {
          setIsLoginModalOpen(false);
          setIsClosingLoginModal(false);
          setActiveStage('integration_form');
        }, 280);
      }, 450);
    } else {
      setLoginError(
        'Geçersiz kimlik bilgisi. Lütfen kullanıcı adı: admin ve şifre: 1234 bilgilerini kullanınız.'
      );
    }
  };

  // Quick fill helper for convenience
  const handleQuickFillCredentials = () => {
    setUsername('admin');
    setPassword('1234');
    setLoginError('');
  };

  // Handle Stage 3 Form Submit (/api/apply)
  const handleIntegrationFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim() || !email.trim()) {
      setFormError('Lütfen Ad Soyad ve Kurumsal E-posta alanlarını eksiksiz doldurunuz.');
      return;
    }

    setIsSubmittingForm(true);

    const cartContext =
      cartItems.length > 0
        ? ` [Vitrinde Seçilen Paketler (${cartItems.length}): ${cartItems.join(', ')}]`
        : '';

    const payload = {
      name: fullName.trim(),
      fullName: fullName.trim(),
      email: email.trim(),
      phone: companyAndSector.trim() || 'E-Ticaret Demo Yönetici Girişi',
      packageType: selectedIntegrationScope,
      preferredService: selectedIntegrationScope,
      companyAndSector: companyAndSector.trim() || 'B2B E-Ticaret Otomasyonu',
      message: `${requestDetails.trim() || 'Yönetici doğrulaması sonrası e-ticaret altyapı entegrasyon talebi.'}${cartContext}`,
    };

    try {
      const apiBase = (import.meta as any).env?.VITE_API_URL || '';
      const response = await fetch(`${apiBase}/api/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 200 && (data.success || data.status === 'success')) {
        setFormSuccess(true);
        setFullName('');
        setEmail('');
        setCompanyAndSector('');
        setRequestDetails('');
      } else {
        setFormError(data.error || 'Başvuru iletimi sırasında bir hata oluştu.');
      }
    } catch {
      setFormError('İletim sırasında bağlantı hatası oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const renderPackageIcon = (type: StorePackage['icon']) => {
    switch (type) {
      case 'package':
        return <Package className="w-6 h-6 text-[#25D366]" aria-hidden="true" />;
      case 'cpu':
        return <Cpu className="w-6 h-6 text-[#25D366]" aria-hidden="true" />;
      case 'truck':
        return <Truck className="w-6 h-6 text-[#25D366]" aria-hidden="true" />;
      case 'globe':
        return <Globe className="w-6 h-6 text-[#25D366]" aria-hidden="true" />;
    }
  };

  return (
    <div className="min-h-full bg-zinc-950 text-zinc-100 font-sans relative selection:bg-[#25D366] selection:text-zinc-950 flex flex-col">
      {/* 1. DÜRÜSTLÜK BANDI (Yüksek Kontrastlı Sabit Şerit - Masaüstü & Mobil OLED Uyumlu) */}
      <div className="sticky top-0 z-40 w-full bg-zinc-950 border-b border-[#25D366]/70 px-4 py-2 flex items-center justify-between shadow-lg">
        <div className="flex-1 text-center">
          <p className="text-[11px] sm:text-xs font-extrabold tracking-widest text-[#25D366] uppercase">
            [Mütevazı Şeffaflık İlkesi: Bu Alanlar Örnek Senaryo Simülasyonudur]
          </p>
        </div>
        {onExit && (
          <button
            type="button"
            onClick={onExit}
            aria-label="E-Ticaret Simülasyonundan Çık ve Ana Siteye Dön"
            className="shrink-0 px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-md ml-2 border border-rose-500/40"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Ana Siteye Dön</span>
            <span className="sm:hidden">Çık</span>
          </button>
        )}
      </div>

      {/* Yeşil Sepet Bildirim Kutusu (Toast) */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#25D366] text-zinc-950 font-extrabold text-xs sm:text-sm shadow-[0_15px_40px_rgba(37,211,102,0.4)] border border-white/30 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0 text-zinc-950" aria-hidden="true" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            aria-label="Bildirimi kapat"
            className="ml-1 p-1 rounded-lg hover:bg-black/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* ÜST VİTRİN BAR (Mağaza Başlığı, Sepet Sayacı ve Pırpır Eden Yönetici Paneli Butonu) */}
      <header className="bg-zinc-900/90 border-b border-zinc-800 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Sol: Kurumsal Mağaza Kimliği */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 border border-[#25D366]/50 flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.2)]">
              <Sparkles className="w-5 h-5 text-[#25D366]" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-tight text-white">
                  NEXUS B2B COMMERCE
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 rounded-md">
                  Kurumsal Vitrin
                </span>
              </div>
              <p className="text-xs text-zinc-200">
                <strong className="font-extrabold text-white">VanGuard Studio Digital</strong>{' '}
                İzole E-Ticaret Otomasyonu Vitrini
              </p>
            </div>
          </div>

          {/* Sağ: Sepet Sayacı & Pırpır Eden "Yönetici Paneli (Demo)" Butonu & Çıkış */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Sepet İkonu ve Anlık Sayaç */}
            <div
              aria-label={`Sepetteki paket sayısı: ${cartItems.length}`}
              className="relative inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs sm:text-sm font-bold"
            >
              <ShoppingCart className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
              <span className="hidden sm:inline">Kurumsal Sepet</span>
              <span className="px-2 py-0.5 rounded-full bg-[#25D366] text-zinc-950 font-black text-xs shadow-[0_0_12px_rgba(37,211,102,0.6)]">
                {cartItems.length}
              </span>
            </div>

            {/* Sağ Üst Köşe Pırpır Eden Yeşil "Yönetici Paneli (Demo)" Butonu */}
            <button
              type="button"
              onClick={() => {
                setLoginError('');
                setIsLoginModalOpen(true);
              }}
              aria-label="Yönetici Paneli Demo Giriş Penceresini Aç"
              className="relative inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-zinc-950 font-black text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(37,211,102,0.55)] hover:shadow-[0_0_35px_rgba(37,211,102,0.85)] transition-all cursor-pointer animate-pulse"
            >
              <Lock className="w-4 h-4 text-zinc-950 shrink-0" aria-hidden="true" />
              <span>Yönetici Paneli (Demo)</span>
            </button>

            {/* Belirgin Çıkış Butonu */}
            {onExit && (
              <button
                type="button"
                onClick={onExit}
                aria-label="E-Ticaret Simülasyonunu Kapat"
                className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer border border-rose-500/50 shadow-md"
              >
                <X className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Kapat</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ANA İÇERİK KATMANI */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-10">
        {activeStage === 'storefront' ? (
          /* =====================================================================
             1. AŞAMA: ULTRA LÜKS E-TİCARET VİTRİNİ (ÖN YÜZ)
             ===================================================================== */
          <div className="space-y-10">
            {/* Vitrin Üst Karşılama Kartı */}
            <section className="rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="max-w-4xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs font-extrabold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  <span>Zero-Waste Kurumsal B2B Mağaza Mimarisi</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  Kurumsal E-Ticaret Otomasyonu & Modüler Paket Vitrini
                </h1>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed text-justify">
                  <strong className="font-extrabold text-white">VanGuard Studio Digital</strong>{' '}
                  tarafından kurgulanan bu ultra lüks e-ticaret vitrini, yüksek hacimli B2B ve
                  perakende operasyonlarının ihtiyaç duyduğu modüler otomasyon paketlerini canlı
                  olarak deneyimlemeniz için tasarlanmıştır. İlgilendiğiniz altyapı paketlerini
                  sepetinize ekleyebilir veya sağ üst köşede yer alan{' '}
                  <strong className="font-extrabold text-[#25D366]">Yönetici Paneli (Demo)</strong>{' '}
                  kapısını kullanarak doğrudan yönetim ve entegrasyon süreçlerini
                  tetikleyebilirsiniz.
                </p>
              </div>
            </section>

            {/* B2B E-Ticaret Paketleri Listesi */}
            <section aria-label="B2B E-Ticaret Paketleri Kataloğu" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-white">
                    Aktif B2B E-Ticaret Altyapı Paketleri
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-200 text-justify">
                    Tüm modüller <strong className="font-extrabold text-white">VanGuard Studio Digital</strong>{' '}
                    mühendislik standartlarıyla sıfır kesinti garantisi altında teslim edilmektedir.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/40 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  4 Kurumsal Paket Hazır
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {B2B_PACKAGES.map((pkg) => {
                  const isAdding = addingId === pkg.id;
                  return (
                    <article
                      key={pkg.id}
                      className="group rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-[#25D366]/60 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_12px_40px_rgba(37,211,102,0.12)]"
                    >
                      <div className="space-y-5">
                        {/* Üst Etiket ve Kod */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 group-hover:border-[#25D366]/50 flex items-center justify-center transition-colors">
                              {renderPackageIcon(pkg.icon)}
                            </div>
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#25D366]">
                                {pkg.category}
                              </span>
                              <p className="text-xs text-zinc-200 font-mono">{pkg.code}</p>
                            </div>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] text-xs font-extrabold">
                            {pkg.badge}
                          </span>
                        </div>

                        {/* Paket Başlığı ve İki Yana Yaslı (text-justify) Açıklama */}
                        <div className="space-y-2.5">
                          <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-[#25D366] transition-colors">
                            {pkg.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify">
                            {pkg.description}
                          </p>
                        </div>

                        {/* Teknik Özellikler */}
                        <ul className="space-y-2 pt-2 border-t border-zinc-800/80">
                          {pkg.specs.map((spec, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-200 font-medium"
                            >
                              <CheckCircle2
                                className="w-4 h-4 text-[#25D366] shrink-0"
                                aria-hidden="true"
                              />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Alt Fiyat ve Sepete Ekle Butonu */}
                      <div className="mt-6 pt-5 border-t border-zinc-800 flex items-center justify-between gap-4">
                        <div>
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-200">
                            Anahtar Teslim Lisans
                          </span>
                          <span className="text-2xl font-black text-white">{pkg.price}</span>
                        </div>

                        <button
                          type="button"
                          disabled={isAdding}
                          onClick={() => handleAddToCart(pkg)}
                          aria-label={`${pkg.title} paketini sepete ekle`}
                          className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-70 text-zinc-950 font-black text-xs sm:text-sm inline-flex items-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_25px_rgba(37,211,102,0.6)] transition-all cursor-pointer"
                        >
                          {isAdding ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                              <span>Ekleniyor...</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                              <span>Sepete Ekle</span>
                            </>
                          )}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Kurumsal Altyapı ve Yasal Bilgi Notu (text-justify + VanGuard Studio Digital kalın) */}
            <section className="rounded-2xl bg-zinc-900/70 border border-zinc-800 p-6 space-y-2">
              <div className="flex items-center gap-2 text-[#25D366] text-xs font-extrabold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                <span>Kurumsal Altyapı ve Mimari Güvence Notu</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify">
                Bu vitrinde yer alan tüm e-ticaret otomasyon paketleri,{' '}
                <strong className="font-extrabold text-white">VanGuard Studio Digital</strong>{' '}
                tarafından geliştirilen yüksek güvenlikli, gereksiz kod yükünden arındırılmış
                (Zero-Waste) kurumsal mimari standartlarını temsil etmektedir. Mevcut e-ticaret
                altyapınızı yükseltmek veya kurumunuza özel ERP/Kargo entegrasyonu talep etmek için
                sağ üstteki{' '}
                <strong className="font-extrabold text-[#25D366]">Yönetici Paneli (Demo)</strong>{' '}
                butonuna tıklayarak yönetici doğrulamasını gerçekleştirebilirsiniz.
              </p>
            </section>
          </div>
        ) : (
          /* =====================================================================
             3. AŞAMA: GİRİŞ SONRASI AKILLI YÖNLENDİRME (ENTEGRASYON FORMU)
             ===================================================================== */
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Üst Dönüş Butonu */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveStage('storefront')}
                aria-label="Mağaza Vitrinine Geri Dön"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-300 hover:text-[#25D366] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>E-Ticaret Vitrinine Geri Dön</span>
              </button>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] text-xs font-extrabold">
                <UserCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Yönetici Oturumu: Doğrulandı (admin)</span>
              </span>
            </div>

            {/* ZORUNLU YEŞİL ONAY METNİ (text-justify ve VanGuard Studio Digital kalın) */}
            <div
              role="region"
              aria-label="Yönetici Kimliği Doğrulama Onayı"
              className="rounded-2xl bg-[#25D366]/15 border-2 border-[#25D366] p-6 sm:p-7 shadow-[0_0_35px_rgba(37,211,102,0.2)]"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#25D366] text-zinc-950 flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                  <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                </div>
                <p className="text-sm sm:text-base text-emerald-100 font-medium leading-relaxed text-justify">
                  “Yönetici kimliği başarıyla doğrulandı. Mevcut e-ticaret altyapınız için
                  özelleştirilmiş entegrasyon taleplerinizi ve sektörel isteklerinizi aşağıdaki
                  kurşun geçirmez form üzerinden doğrudan{' '}
                  <strong className="font-extrabold text-white">VanGuard Studio Digital</strong>{' '}
                  mühendislik ekibine iletebilirsiniz.”
                </p>
              </div>
            </div>

            {/* Kurşun Geçirmez VanGuard Studio Digital İletişim / Entegrasyon Talep Formu */}
            <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6 sm:p-10 shadow-2xl space-y-6">
              <div className="border-b border-zinc-800 pb-5 space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#25D366]">
                  Doğrudan Mühendislik Hattı
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  <strong className="font-extrabold">VanGuard Studio Digital</strong> · E-Ticaret
                  Altyapı & Entegrasyon Talep Formu
                </h1>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed text-justify">
                  Aşağıdaki form üzerinden ileteceğiniz teknik gereksinimler,{' '}
                  <strong className="font-extrabold text-white">VanGuard Studio Digital</strong>{' '}
                  sistem mimarları tarafından incelenerek işletmenize özel entegrasyon yol haritası
                  olarak tarafınıza sunulacaktır.
                </p>
              </div>

              {formSuccess ? (
                <div className="rounded-2xl bg-[#25D366]/15 border border-[#25D366] p-6 sm:p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#25D366] text-zinc-950 flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-black text-white">
                    Entegrasyon Talebiniz Başarıyla Kaydedildi
                  </h2>
                  <p className="text-sm text-zinc-100 leading-relaxed text-justify max-w-xl mx-auto">
                    Talebiniz kurşun geçirmez iletişim protokolümüz üzerinden doğrudan{' '}
                    <strong className="font-extrabold text-white">VanGuard Studio Digital</strong>{' '}
                    mühendislik ekibine ulaştırılmıştır. En kısa sürede kurumsal e-posta adresiniz
                    üzerinden dönüş sağlanacaktır.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFormSuccess(false)}
                      aria-label="Yeni entegrasyon talebi oluştur"
                      className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                    >
                      Yeni Talep Oluştur
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStage('storefront')}
                      aria-label="E-Ticaret mağaza vitrinine geri dön"
                      className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-zinc-950 text-xs sm:text-sm font-black transition-colors cursor-pointer"
                    >
                      Mağaza Vitrinine Dön
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleIntegrationFormSubmit} className="space-y-5">
                  {formError && (
                    <div
                      role="alert"
                      className="p-4 rounded-xl bg-rose-950/80 border border-rose-500/60 text-rose-200 text-xs sm:text-sm font-bold flex items-center gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" aria-hidden="true" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {cartItems.length > 0 && (
                    <div className="p-4 rounded-xl bg-zinc-950 border border-[#25D366]/40 space-y-1.5">
                      <span className="text-xs font-extrabold text-[#25D366] uppercase tracking-wider block">
                        Vitrinde Seçtiğiniz Paketler ({cartItems.length})
                      </span>
                      <p className="text-xs text-zinc-300 text-justify">
                        {cartItems.join(' • ')}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="vanguard-demo-fullname"
                        className="block text-xs font-extrabold uppercase tracking-wider text-white mb-2"
                      >
                        AD SOYAD <span className="text-[#25D366]">*</span>
                      </label>
                      <input
                        id="vanguard-demo-fullname"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Örn: Ahmet Yılmaz"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-300 text-sm focus:outline-none focus:border-[#25D366] transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="vanguard-demo-email"
                        className="block text-xs font-extrabold uppercase tracking-wider text-white mb-2"
                      >
                        KURUMSAL E-POSTA ADRESİ <span className="text-[#25D366]">*</span>
                      </label>
                      <input
                        id="vanguard-demo-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ahmet@sirketiniz.com"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-300 text-sm focus:outline-none focus:border-[#25D366] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="vanguard-demo-company"
                        className="block text-xs font-extrabold uppercase tracking-wider text-white mb-2"
                      >
                        FİRMA ADI & SEKTÖR / TELEFON
                      </label>
                      <input
                        id="vanguard-demo-company"
                        type="text"
                        value={companyAndSector}
                        onChange={(e) => setCompanyAndSector(e.target.value)}
                        placeholder="Örn: Özkan Tekstil B2B - +90 555..."
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-300 text-sm focus:outline-none focus:border-[#25D366] transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="vanguard-demo-scope"
                        className="block text-xs font-extrabold uppercase tracking-wider text-white mb-2"
                      >
                        TALEP EDİLEN ENTEGRASYON KAPSAMI
                      </label>
                      <select
                        id="vanguard-demo-scope"
                        value={selectedIntegrationScope}
                        onChange={(e) => setSelectedIntegrationScope(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-sm focus:outline-none focus:border-[#25D366] transition-colors"
                      >
                        <option value="B2B E-Ticaret Otomasyonu & ERP Entegrasyonu">
                          B2B E-Ticaret Otomasyonu & ERP Entegrasyonu
                        </option>
                        <option value="Özel Sanal POS & Bayi Tahsilat Sistemi">
                          Özel Sanal POS & Bayi Tahsilat Sistemi
                        </option>
                        <option value="Kargo, Depo (WMS) ve E-Fatura Otomasyonu">
                          Kargo, Depo (WMS) ve E-Fatura Otomasyonu
                        </option>
                        <option value="Anahtar Teslim Kurumsal E-İhracat Altyapısı">
                          Anahtar Teslim Kurumsal E-İhracat Altyapısı
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="vanguard-demo-details"
                      className="block text-xs font-extrabold uppercase tracking-wider text-white mb-2"
                    >
                      MEVCUT ALTYAPINIZ VE ENTEGRASYON TALEPLERİNİZ
                    </label>
                    <textarea
                      id="vanguard-demo-details"
                      rows={4}
                      value={requestDetails}
                      onChange={(e) => setRequestDetails(e.target.value)}
                      placeholder="Mevcut e-ticaret altyapınız, kullandığınız ERP yazılımı ve talep ettiğiniz özel otomasyon süreçlerini kısaca belirtiniz..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-300 text-sm focus:outline-none focus:border-[#25D366] transition-colors"
                    />
                  </div>

                  <p className="text-xs text-zinc-200 leading-relaxed text-justify">
                    Bu form üzerinden iletilen tüm kurumsal veriler uçtan uca şifrelenerek doğrudan{' '}
                    <strong className="font-extrabold text-white">
                      VanGuard Studio Digital
                    </strong>{' '}
                    yetkili mühendislik birimine aktarılır ve üçüncü taraflarla kesinlikle
                    paylaşılmaz.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmittingForm}
                    aria-label="Entegrasyon Talebini VanGuard Studio Digital Ekibine İlet"
                    className="w-full py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-60 text-zinc-950 font-black text-sm sm:text-base inline-flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_40px_rgba(37,211,102,0.7)] transition-all cursor-pointer"
                  >
                    {isSubmittingForm ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                        <span>Talebiniz İletiliyor...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" aria-hidden="true" />
                        <span>
                          Entegrasyon Talebini VanGuard Studio Digital Ekibine İlet
                        </span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      {/* =====================================================================
          2. AŞAMA: KOTAYI KORUYAN GİRİŞ KAPISI (LOGIN MODAL)
          ===================================================================== */}
      {isLoginModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Yönetici Paneli Demo Giriş Penceresi"
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 transition-all duration-300 ${
            isClosingLoginModal ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <div className="relative w-full max-w-md rounded-3xl bg-zinc-900 border-2 border-[#25D366]/60 p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.9)] space-y-6">
            {/* Modal Kapatma Butonu */}
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(false)}
              aria-label="Giriş penceresini kapat"
              className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* Başlık */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 border border-[#25D366] flex items-center justify-center text-[#25D366] shadow-[0_0_20px_rgba(37,211,102,0.3)]">
                <KeyRound className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#25D366]">
                  Güvenli Kimlik Doğrulama
                </span>
                <h2 className="text-xl font-black text-white">Yönetici Paneli (Demo)</h2>
              </div>
            </div>

            {loginError && (
              <div
                role="alert"
                className="p-3.5 rounded-xl bg-rose-950/90 border border-rose-500/60 text-rose-200 text-xs font-bold flex items-center gap-2.5"
              >
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" aria-hidden="true" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Giriş Formu */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="demo-admin-username"
                  className="block text-xs font-extrabold uppercase tracking-wider text-white mb-1.5"
                >
                  KULLANICI ADI
                </label>
                <input
                  id="demo-admin-username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  autoComplete="off"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-300 text-sm font-medium focus:outline-none focus:border-[#25D366] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="demo-admin-password"
                  className="block text-xs font-extrabold uppercase tracking-wider text-white mb-1.5"
                >
                  ŞİFRE
                </label>
                <input
                  id="demo-admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••"
                  autoComplete="off"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-300 text-sm font-medium focus:outline-none focus:border-[#25D366] transition-colors"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleQuickFillCredentials}
                  aria-label="Demo yönetici kullanıcı adı admin ve şifre 1234 bilgilerini otomatik doldur"
                  className="text-xs font-bold text-[#25D366] hover:underline cursor-pointer"
                >
                  Demo Bilgilerini Otomatik Doldur (admin / 1234)
                </button>
              </div>

              <button
                type="submit"
                disabled={isAuthenticating}
                aria-label="Yönetici Paneline Giriş Yap"
                className="w-full py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-zinc-950 font-black text-sm inline-flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(37,211,102,0.45)] transition-all cursor-pointer"
              >
                {isAuthenticating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Kimlik Doğrulanıyor...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" aria-hidden="true" />
                    <span>Giriş Yap</span>
                  </>
                )}
              </button>
            </form>

            {/* ZORUNLU ALT BİLGİ NOTU (Tam İki Yana Yaslı - text-justify) */}
            <div className="pt-4 border-t border-zinc-800">
              <p className="text-xs text-zinc-200 leading-relaxed text-justify">
                “Simülasyon Notu: Yönetim panelini incelemek ve altyapı entegrasyon süreçlerini
                tetiklemek için kullanıcı adı: <strong className="font-extrabold text-[#25D366]">admin</strong> | şifre:{' '}
                <strong className="font-extrabold text-[#25D366]">1234</strong> bilgilerini
                kullanabilirsiniz.”
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

      {/* YÜKSEK KONTRASTLI YASAL KÜNYE ŞERİDİ (Masaüstü & Mobil OLED Standart Kontrast) */}
      <footer className="bg-zinc-950 border-t border-zinc-800 px-4 sm:px-8 py-4 text-center">
        <p className="text-xs text-zinc-100 font-medium">
          &copy; 2026 <strong className="font-extrabold text-white">VanGuard Studio Digital</strong> ·{' '}
          <strong className="font-extrabold text-white">İsmail Kaplan - Webnolojik</strong>. Tüm hakları saklıdır.
        </p>
      </footer>
    </div>
  );
};
