import React, { useState } from 'react';
import {
  CheckCircle2,
  Send,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  User,
  RotateCcw,
  MessageSquare,
} from 'lucide-react';
import { EcommerceCartItem, PackageTierId } from './types';
import { PACKAGE_TIERS } from './mockData';

interface ContactPageProps {
  selectedPackage: PackageTierId;
  cart: EcommerceCartItem[];
  onOpenChat: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  selectedPackage,
  cart,
  onOpenChat,
}) => {
  const [formState, setFormState] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [isClosingForm, setIsClosingForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeTier =
    PACKAGE_TIERS.find((t) => t.id === selectedPackage) || PACKAGE_TIERS[1];
  const modulesSubtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const totalWithVat = Math.round((activeTier.price + modulesSubtotal) * 1.2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsClosingForm(true);
    setTimeout(() => {
      setIsSubmitted(true);
      setIsClosingForm(false);
    }, 380);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormState({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      notes: '',
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="text-xs font-bold text-[#25D366] uppercase tracking-wider">
            İnteraktif Entegrasyon &amp; Kurumsal Başvuru Simülasyonu
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            İletişim ve E-Ticaret Otomasyon Başvurusu
          </h1>
          <p
            className="text-sm text-zinc-300 leading-relaxed text-justify"
            style={{ textAlign: 'justify' }}
          >
            Seçtiğiniz e-ticaret paketini ve otomasyon eklentilerini kurumsal başvuru simülasyonu üzerinden test edin. Ayrıca ekranın sağ alt köşesinde yer alan canlı destek balonuna tıklayarak <strong className="text-white font-bold">VanGuard E-Ticaret Asistanı</strong> ile anlık etkileşime geçebilirsiniz.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenChat}
          aria-label="VanGuard E-Ticaret Asistanı canlı destek penceresini aç"
          className="px-5 py-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/40 text-xs font-extrabold transition-all inline-flex items-center gap-2 cursor-pointer shrink-0 self-start lg:self-auto"
        >
          <MessageSquare className="w-4 h-4" aria-hidden="true" />
          <span>Canlı Destek Asistanını Aç</span>
        </button>
      </div>

      {/* Main Content Area: Animated Form Slide-Out -> Approved Screen */}
      <div className="relative overflow-hidden">
        {!isSubmitted ? (
          <div
            className={`grid grid-cols-1 lg:grid-cols-12 gap-6 items-start transition-all duration-400 transform ${
              isClosingForm
                ? '-translate-y-8 opacity-0 scale-95'
                : 'translate-y-0 opacity-100 scale-100'
            }`}
          >
            {/* Left 7 Cols: Interactive Application Form */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5"
            >
              <div className="border-b border-zinc-800 pb-4">
                <h2 className="text-lg font-extrabold text-white">
                  Kurumsal E-Ticaret Kurulum &amp; Entegrasyon Formu
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Formu doldurup &quot;Gönder&quot; butonuna bastığınızda akıcı onay ekranı simülasyonu tetiklenir.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="ec-fullname"
                    className="text-xs font-extrabold text-zinc-200 uppercase tracking-wider block"
                  >
                    AD SOYAD *
                  </label>
                  <div className="relative">
                    <User
                      className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3"
                      aria-hidden="true"
                    />
                    <input
                      id="ec-fullname"
                      type="text"
                      required
                      value={formState.fullName}
                      onChange={(e) =>
                        setFormState({ ...formState, fullName: e.target.value })
                      }
                      placeholder="Örn: Murat Kaya"
                      className="w-full bg-zinc-950 border border-zinc-700 focus:border-[#25D366] text-white text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="ec-company"
                    className="text-xs font-extrabold text-zinc-200 uppercase tracking-wider block"
                  >
                    FİRMA / MARKA ADI *
                  </label>
                  <div className="relative">
                    <Building2
                      className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3"
                      aria-hidden="true"
                    />
                    <input
                      id="ec-company"
                      type="text"
                      required
                      value={formState.companyName}
                      onChange={(e) =>
                        setFormState({ ...formState, companyName: e.target.value })
                      }
                      placeholder="Örn: Atlas Tekstil A.Ş."
                      className="w-full bg-zinc-950 border border-zinc-700 focus:border-[#25D366] text-white text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="ec-email"
                    className="text-xs font-extrabold text-zinc-200 uppercase tracking-wider block"
                  >
                    KURUMSAL E-POSTA *
                  </label>
                  <div className="relative">
                    <Mail
                      className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3"
                      aria-hidden="true"
                    />
                    <input
                      id="ec-email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      placeholder="ornek@sirketiniz.com"
                      className="w-full bg-zinc-950 border border-zinc-700 focus:border-[#25D366] text-white text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="ec-phone"
                    className="text-xs font-extrabold text-zinc-200 uppercase tracking-wider block"
                  >
                    İLETİŞİM TELEFONU *
                  </label>
                  <div className="relative">
                    <Phone
                      className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3"
                      aria-hidden="true"
                    />
                    <input
                      id="ec-phone"
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) =>
                        setFormState({ ...formState, phone: e.target.value })
                      }
                      placeholder="+90 5XX XXX XX XX"
                      className="w-full bg-zinc-950 border border-zinc-700 focus:border-[#25D366] text-white text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="ec-notes"
                  className="text-xs font-extrabold text-zinc-200 uppercase tracking-wider block"
                >
                  ENTEGRASYON BEKLENTİLERİNİZ (ERP, KARGO, SANAL POS)
                </label>
                <textarea
                  id="ec-notes"
                  rows={4}
                  value={formState.notes}
                  onChange={(e) =>
                    setFormState({ ...formState, notes: e.target.value })
                  }
                  placeholder="Mevcut ürün sayınız, hedef pazaryerleri ve özel entegrasyon taleplerinizi kısaca belirtin..."
                  className="w-full bg-zinc-950 border border-zinc-700 focus:border-[#25D366] text-white text-sm rounded-xl p-3.5 outline-none transition-colors"
                />
              </div>

              <div
                className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-xs text-zinc-300 leading-relaxed text-justify"
                style={{ textAlign: 'justify' }}
              >
                Bu form simülasyon amaçlıdır. Gönderdiğiniz bilgiler tarayıcı hafızasında saklanmaz ve <strong className="font-bold text-white">VanGuard Studio Digital</strong> KVKK sıfır veri tutma standartlarına tam uyumlu olarak işlenir.
              </div>

              <button
                type="submit"
                aria-label="Başvuru formunu gönder"
                className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-zinc-950 font-extrabold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#25D366]/25 active:scale-98"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>Gönder</span>
              </button>
            </form>

            {/* Right 5 Cols: Active Configuration & SLA Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <h2 className="text-base font-extrabold text-white">
                    Seçili E-Ticaret Yapılandırmanız
                  </h2>
                  <span className="text-xs font-mono text-[#25D366] font-bold">
                    {activeTier.name}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-zinc-300">
                  <div className="flex items-center justify-between">
                    <span>Ana Yazılım Paketi:</span>
                    <span className="font-bold text-white">
                      {activeTier.name} (₺{activeTier.price.toLocaleString('tr-TR')})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Seçili Eklenti Modül Sayısı:</span>
                    <span className="font-bold text-white">
                      {cart.reduce((a, b) => a + b.quantity, 0)} Adet Lisans
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Kaynak Kod Mülkiyeti:</span>
                    <span
                      className={`font-bold ${
                        activeTier.codeOwnership ? 'text-[#25D366]' : 'text-rose-400'
                      }`}
                    >
                      {activeTier.codeOwnership ? '%100 Resmi Devir' : 'Devredilmez (EKO)'}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-sm font-extrabold text-white">
                    <span>KDV Dahil Toplam Bütçe:</span>
                    <span className="text-[#25D366] font-mono tabular-nums">
                      ₺{totalWithVat.toLocaleString('tr-TR')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#25D366] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  <span>Kurumsal Entegrasyon Garantisi</span>
                </div>
                <p
                  className="text-xs text-zinc-300 leading-relaxed text-justify"
                  style={{ textAlign: 'justify' }}
                >
                  Başvurunuz onaylandığında tüm sanal POS, kargo API ve pazaryeri entegrasyon anahtarlarınız izole Cloudflare güvenlik katmanı üzerinden yapılandırılır ve anahtar teslim canlıya alınır.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Kusursuz Yeşil Onay Tikli ve İki Yana Yaslanmış "Başvuru Talebiniz Alınmıştır" Ekranı */
          <div className="bg-zinc-900 border-2 border-[#25D366] rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto shadow-[0_20px_70px_rgba(37,211,102,0.2)] animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-zinc-800 pb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#25D366] text-zinc-950 flex items-center justify-center shrink-0 shadow-lg shadow-[#25D366]/30">
                <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#25D366] uppercase tracking-wider block">
                  Simülasyon Onay Kaydı · Referans #VG-{Math.floor(10000 + Math.random() * 90000)}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
                  Başvuru Talebiniz Alınmıştır
                </h2>
              </div>
            </div>

            <div className="space-y-4 text-sm text-zinc-200 leading-relaxed">
              <p className="text-justify" style={{ textAlign: 'justify' }}>
                Sayın <strong className="font-bold text-white">{formState.fullName || 'Kurumsal Yönetici'}</strong>, <strong className="font-bold text-white">{formState.companyName || 'İşletmeniz'}</strong> adına oluşturduğunuz <strong className="font-bold text-[#25D366]">{activeTier.name}</strong> ve toplam <strong className="font-bold text-white">{cart.reduce((a, b) => a + b.quantity, 0)} adet e-ticaret otomasyon modülü</strong> yapılandırma talebiniz şifreli iletişim katmanımız üzerinden başarıyla simüle edilmiştir.
              </p>
              <p className="text-justify" style={{ textAlign: 'justify' }}>
                <strong className="font-bold text-white">VanGuard Studio Digital</strong> kurumsal mimari ekibi, gerçek proje başvurularında işletmenizin ERP, sanal POS ve lojistik entegrasyon gereksinimlerini 24 saat içerisinde analiz ederek kapsam sınırları netleştirilmiş resmi sözleşme taslağını <strong className="font-bold text-white">{formState.email || 'kurumsal e-posta'}</strong> adresinize iletmektedir. Seçtiğiniz paket kuralları doğrultusunda fikri mülkiyet ve KVKK sıfır veri saklama standartlarımız eksiksiz olarak korunmaktadır.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-zinc-400 font-mono">
                KDV Dahil Simülasyon Tutarı: <strong className="text-[#25D366]">₺{totalWithVat.toLocaleString('tr-TR')}</strong>
              </div>
              <button
                type="button"
                onClick={handleReset}
                aria-label="Yeni bir başvuru simülasyonu başlat"
                className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#25D366]" aria-hidden="true" />
                <span>Formu Sıfırla ve Yeniden Test Et</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
