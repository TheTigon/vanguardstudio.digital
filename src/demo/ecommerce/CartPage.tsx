import React from 'react';
import {
  Plus,
  Minus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  EcommerceCartItem,
  EcommerceDemoTab,
  PackageTierId,
} from './types';
import { PACKAGE_TIERS } from './mockData';
import { AnimatedNumber } from './AnimatedNumber';

interface CartPageProps {
  cart: EcommerceCartItem[];
  selectedPackage: PackageTierId;
  onSelectPackage: (tier: PackageTierId) => void;
  onUpdateQuantity: (cartKey: string, delta: number) => void;
  onRemoveItem: (cartKey: string) => void;
  onNavigate: (tab: EcommerceDemoTab) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cart,
  selectedPackage,
  onSelectPackage,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
}) => {
  const activeTier =
    PACKAGE_TIERS.find((t) => t.id === selectedPackage) || PACKAGE_TIERS[1];

  const modulesSubtotal = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const subTotal = activeTier.price + modulesSubtotal;
  const vatAmount = Math.round(subTotal * 0.2);
  const grandTotal = subTotal + vatAmount;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="text-xs font-bold text-[#25D366] uppercase tracking-wider">
          Dinamik Maliyet Simülatörü · Paket &amp; Eklenti Hesaplama Motoru
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Sepet &amp; Ticari Paket Baremleri
        </h1>
        <p
          className="text-sm text-zinc-300 leading-relaxed text-justify"
          style={{ textAlign: 'justify' }}
        >
          Aşağıdaki modül adetlerini <strong className="text-white font-bold">+</strong> ve <strong className="text-white font-bold">-</strong> butonlarıyla değiştirdikçe veya ticari paket seçiminizi güncelledikçe; Ara Toplam, KDV (%20) ve Genel Toplam hanelerindeki rakamların anlık olarak hesaplandığını ve kaynak kod mülkiyeti kurallarının otomatik mühürlendiğini deneyimleyebilirsiniz.
        </p>
      </div>

      {/* Commercial Package Tier Selection + Lock Rules */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white">
              1. Ana Ticari Paket Seçimi ve Kaynak Kod Mülkiyeti Kuralı
            </h2>
            <p className="text-xs text-zinc-400">
              İşletmenizin ölçeğine uygun temel yazılım paketini seçin
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#25D366]">
            Aktif Paket: {activeTier.name}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PACKAGE_TIERS.map((tier) => {
            const isSelected = tier.id === selectedPackage;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => onSelectPackage(tier.id)}
                aria-label={`${tier.name} (${tier.price.toLocaleString('tr-TR')} TL) paketini seç`}
                className={`text-left rounded-2xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? tier.id === 'eko'
                      ? 'bg-zinc-950 border-rose-500 shadow-[0_10px_35px_rgba(244,63,94,0.18)]'
                      : 'bg-zinc-950 border-[#25D366] shadow-[0_10px_35px_rgba(37,211,102,0.2)]'
                    : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="space-y-3 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-xs font-extrabold uppercase tracking-wider ${
                        isSelected
                          ? tier.id === 'eko'
                            ? 'text-rose-400'
                            : 'text-[#25D366]'
                          : 'text-zinc-400'
                      }`}
                    >
                      {tier.name}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      Teslim: {tier.deliveryTime}
                    </span>
                  </div>

                  <div className="text-2xl font-extrabold text-white font-mono tabular-nums">
                    {tier.price.toLocaleString('tr-TR')} TL
                  </div>
                  <div className="text-xs text-zinc-300 font-medium">{tier.subtitle}</div>

                  <ul className="space-y-1.5 pt-2 border-t border-zinc-800/80 text-xs text-zinc-300">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <span className="text-[#25D366] font-bold">·</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 w-full">
                  <div
                    className={`w-full py-2 rounded-xl text-center text-xs font-extrabold transition-colors ${
                      isSelected
                        ? tier.id === 'eko'
                          ? 'bg-rose-600 text-white'
                          : 'bg-[#25D366] text-zinc-950'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    {isSelected ? '✓ Seçili Ana Paket' : 'Bu Paketi Seç'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Lock Rule Banner */}
        {selectedPackage === 'eko' ? (
          <div
            role="alert"
            className="bg-rose-950/70 border-2 border-rose-500 rounded-2xl p-5 flex items-start sm:items-center gap-4 text-rose-100 shadow-lg animate-in fade-in duration-200"
          >
            <div className="w-11 h-11 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <AlertTriangle className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <div className="text-sm sm:text-base font-extrabold text-rose-300">
                Dikkat: Bu pakette kaynak kod mülkiyeti devredilmez.
              </div>
              <p
                className="text-xs sm:text-sm text-rose-200 leading-relaxed text-justify"
                style={{ textAlign: 'justify' }}
              >
                EKO Paket (19.900 TL), standart hazır bileşen şablonları üzerine kurulduğundan yalnızca kullanım lisansı sunar. Tam kaynak kod devri ve özel veritabanı/API mimarisi için PRO Paket (59.000 TL) veya Nexus AI (35.000 TL) seçeneğini tercih edebilirsiniz.
              </p>
            </div>
          </div>
        ) : (
          <div
            role="status"
            className="bg-[#25D366]/10 border-2 border-[#25D366] rounded-2xl p-5 flex items-start sm:items-center gap-4 text-zinc-100 shadow-lg animate-in fade-in duration-200"
          >
            <div className="w-11 h-11 rounded-xl bg-[#25D366] text-zinc-950 flex items-center justify-center shrink-0 shadow-md">
              <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <div className="text-sm sm:text-base font-extrabold text-[#25D366]">
                Tüm kaynak kod mülkiyeti resmi olarak şirketinize devredilecektir.
              </div>
              <p
                className="text-xs sm:text-sm text-zinc-200 leading-relaxed text-justify"
                style={{ textAlign: 'justify' }}
              >
                Seçtiğiniz {activeTier.name} ({activeTier.price.toLocaleString('tr-TR')} TL) kapsamında geliştirilen tüm yazılım mimarisi, arayüz bileşenleri ve otomasyon betikleri proje tesliminde ıslak imzalı fikri mülkiyet devir protokolü ile %100 kurumunuza teslim edilir.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Cart Items + Real-Time Calculation Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Cols: Selected Modules List */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                2. Sepetteki E-Ticaret Otomasyon Eklentileri
              </h2>
              <p className="text-xs text-zinc-400">
                Adet ve lisans sayısını + / - butonlarıyla anlık güncelleyin
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('urunler')}
              aria-label="Katalogdan yeni ürün veya eklenti ekle"
              className="text-xs font-bold text-[#25D366] hover:underline cursor-pointer"
            >
              + Yeni Modül Ekle
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 text-center space-y-4">
              <ShoppingBag className="w-10 h-10 text-[#25D366] mx-auto" aria-hidden="true" />
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">
                  Sepetinizde Ekstra Modül Bulunmuyor
                </h3>
                <p className="text-xs text-zinc-400 max-w-md mx-auto">
                  Şu an yalnızca seçili ana paket ({activeTier.name}) hesaplanmaktadır. Ürünler sayfasından yapay zeka öneri motoru veya kargo entegrasyonu ekleyebilirsiniz.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('urunler')}
                aria-label="Ürünler sayfasına git"
                className="px-5 py-2.5 rounded-xl bg-[#25D366] text-zinc-950 text-xs font-extrabold cursor-pointer"
              >
                Ürün Kataloğuna Git
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.cartKey}
                  className="bg-zinc-950/90 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-[#25D366]">
                      {item.category} · {item.variantLabel}
                    </div>
                    <h3 className="text-sm font-extrabold text-white">{item.name}</h3>
                    <div className="text-xs text-zinc-400 font-mono tabular-nums">
                      Birim Bedel: ₺{item.unitPrice.toLocaleString('tr-TR')}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    {/* + / - Quantity Controls */}
                    <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-xl p-1">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.cartKey, -1)}
                        aria-label={`${item.name} lisans adedini azalt`}
                        className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center font-bold cursor-pointer transition-colors active:scale-95"
                      >
                        <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <span className="w-7 text-center text-sm font-mono font-extrabold text-white tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.cartKey, 1)}
                        aria-label={`${item.name} lisans adedini artır`}
                        className="w-8 h-8 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-zinc-950 flex items-center justify-center font-bold cursor-pointer transition-colors active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="text-right min-w-[95px]">
                      <div className="text-sm font-extrabold text-white font-mono tabular-nums">
                        <AnimatedNumber value={item.unitPrice * item.quantity} prefix="₺" />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.cartKey)}
                      aria-label={`${item.name} modülünü sepetten çıkar`}
                      className="p-2 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 5 Cols: Anlık Hesaplama Motoru Summary Box */}
        <div className="lg:col-span-5 bg-zinc-900 border-2 border-[#25D366]/60 rounded-2xl p-6 space-y-6 shadow-[0_15px_50px_rgba(37,211,102,0.12)]">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div>
              <span className="text-[11px] font-bold text-[#25D366] uppercase tracking-wider block">
                Canlı Maliyet Motoru
              </span>
              <h2 className="text-lg font-extrabold text-white">
                Sipariş &amp; Bütçe Özeti
              </h2>
            </div>
            <Sparkles className="w-5 h-5 text-[#25D366]" aria-hidden="true" />
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between text-zinc-300">
              <span>Seçili Ana Paket ({activeTier.name})</span>
              <span className="font-mono font-bold text-white tabular-nums">
                <AnimatedNumber value={activeTier.price} prefix="₺" />
              </span>
            </div>

            <div className="flex items-center justify-between text-zinc-300">
              <span>Otomasyon Eklentileri ({cart.reduce((a, b) => a + b.quantity, 0)} Adet)</span>
              <span className="font-mono font-bold text-white tabular-nums">
                <AnimatedNumber value={modulesSubtotal} prefix="₺" />
              </span>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-zinc-200 font-semibold">
              <span>Ara Toplam</span>
              <span className="text-base font-extrabold text-white">
                <AnimatedNumber value={subTotal} prefix="₺" />
              </span>
            </div>

            <div className="flex items-center justify-between text-zinc-300">
              <span>KDV (%20)</span>
              <span className="text-base font-bold text-amber-300">
                <AnimatedNumber value={vatAmount} prefix="₺" />
              </span>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-base font-extrabold text-white block">Genel Toplam</span>
                <span className="text-[11px] text-zinc-400">Resmi Sözleşme &amp; Faturalı</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#25D366]">
                <AnimatedNumber value={grandTotal} prefix="₺" />
              </div>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-xs text-zinc-300 leading-relaxed text-justify" style={{ textAlign: 'justify' }}>
            <strong className="text-white font-bold">VanGuard Studio Digital</strong> güvencesiyle bu sepet yapılandırmasını son adımda kurumsal başvuru olarak iletebilir ve teknik ekibimizden resmi kurulum takvimi alabilirsiniz.
          </div>

          <button
            type="button"
            onClick={() => onNavigate('iletisim')}
            aria-label="Seçili paket ve sepet ile İletişim ve Başvuru adımına geç"
            className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-zinc-950 font-extrabold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#25D366]/25 active:scale-98"
          >
            <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            <span>Yapılandırmayı Onayla &amp; Başvuruya Geç</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
