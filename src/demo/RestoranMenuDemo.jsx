import React, { useState } from 'react';
import {
  Utensils,
  ShoppingBag,
  Home,
  Info,
  BookOpen,
  Phone,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  FileText,
  MapPin,
  Clock,
  ChefHat,
  Sparkles,
  AlertCircle,
  ArrowRight,
  Download
} from 'lucide-react';

export const RestoranMenuDemo = () => {
  const [activeTab, setActiveTab] = useState('anasayfa'); // 'anasayfa' | 'hakkimizda' | 'menu' | 'sepet' | 'iletisim'
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [selectedBurgerVariant, setSelectedBurgerVariant] = useState('Orta');
  const [selectedTable, setSelectedTable] = useState('Masa 12 (Salon)');
  const [orderNote, setOrderNote] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [kitchenOrderSent, setKitchenOrderSent] = useState(null);
  const [reservationSent, setReservationSent] = useState(false);
  const [reservationForm, setReservationForm] = useState({
    name: '',
    phone: '',
    date: '2026-05-15',
    time: '19:30',
    guests: '2 Kişi'
  });

  // Initial cart with 2 sample items so the user immediately sees how the cart works, or starts at 0?
  // Wait: User said:
  // 'Telefon çerçevesinin sağ üst köşesine ya da alt menüsüne anlık güncellenen bir "Sepetim (0)" ikonu yerleştir. Ürün eklendikten sonra o sayı (1), (2) diye artsın.'
  // So initial cart MUST start empty [] so "Sepetim (0)" is shown first and increments to (1), (2) when items are added!
  const [cart, setCart] = useState([]);

  const menuItems = [
    {
      id: 'truf-patates',
      category: 'Başlangıç & Çorba',
      name: 'Trüflü Patates Kızartması',
      desc: 'Parmesan rendesi, siyah trüf yağı ve taze biberiye ile sıcak servis.',
      price: 180,
      badge: 'Şefin Önerisi',
      featured: true,
      prepTime: '10 dk'
    },
    {
      id: 'koz-corba',
      category: 'Başlangıç & Çorba',
      name: 'Közlenmiş Domates & Kırmızı Biber Çorbası',
      desc: 'Fırınlanmış sarımsaklı kıtır ekşi maya kroton ve taze fesleğen sosu ile.',
      price: 145,
      badge: 'Günlük Taze',
      featured: true,
      prepTime: '8 dk'
    },
    {
      id: 'tulum-salata',
      category: 'Başlangıç & Çorba',
      name: 'Erzincan Tulum Peynirli Bahçe Salatası',
      desc: 'Akdeniz yeşillikleri, kavrulmuş ceviz içi, nar taneleri ve soğuk sıkım zeytinyağı.',
      price: 220,
      badge: 'Hafif Başlangıç',
      featured: false,
      prepTime: '10 dk'
    },
    {
      id: 'vanguard-burger',
      category: 'Ana Yemek & Burger',
      name: 'VanGuard Özel Burger',
      desc: '200gr Dinlendirilmiş Dana Köftesi, Karamelize Soğan, 12 Aylık Cheddar Sos, Brioche Ekmeği.',
      price: 380,
      badge: 'İmza Lezzet',
      hasVariant: true,
      featured: true,
      prepTime: '18 dk'
    },
    {
      id: 'dana-antrikot',
      category: 'Ana Yemek & Burger',
      name: 'Izgara Dinlendirilmiş Dana Antrikot (250g)',
      desc: 'Trüflü patates püresi, ızgara kuşkonmaz ve demiglace sos eşliğinde.',
      price: 640,
      badge: 'Şefin Özel Seçimi',
      featured: true,
      prepTime: '22 dk'
    },
    {
      id: 'burrata-tagliatelle',
      category: 'Ana Yemek & Burger',
      name: 'Taze Burrata & Fesleğenli Ev Yapımı Tagliatelle',
      desc: 'Günlük açılan taze makarna, San Marzano domates sosu ve bütün burrata peyniri.',
      price: 410,
      badge: 'El Yapımı',
      featured: false,
      prepTime: '15 dk'
    },
    {
      id: 'reyhan-serbeti',
      category: 'İçecek & Tatlı',
      name: 'Ev Yapımı Reyhan Şerbeti',
      desc: 'Mor fesleğen, karanfil ve tarçın ile günlük demlenen geleneksel ferahlatıcı içecek.',
      price: 90,
      badge: '✓ Günlük Taze',
      featured: true,
      prepTime: '3 dk'
    },
    {
      id: 'zencefil-limonata',
      category: 'İçecek & Tatlı',
      name: 'Taze Zencefilli & Naneli Ev Limonata',
      desc: 'Rafine şeker ilavesiz, taze sıkım limon ve doğal çiçek balı ile.',
      price: 115,
      badge: 'Doğal İçerik',
      featured: false,
      prepTime: '4 dk'
    },
    {
      id: 'san-sebastian',
      category: 'İçecek & Tatlı',
      name: 'Fırınlanmış San Sebastian Cheesecake',
      desc: 'Akışkan iç doku, sıcak Belçika bitter çikolata sosu ile servis edilir.',
      price: 230,
      badge: 'Günlük Üretim',
      featured: false,
      prepTime: '6 dk'
    }
  ];

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  };

  const handleAddToCart = (item) => {
    const variantLabel = item.hasVariant ? selectedBurgerVariant : null;
    const cartKey = variantLabel ? `${item.id}-${variantLabel}` : item.id;
    const displayName = variantLabel ? `${item.name} (${variantLabel})` : item.name;

    setCart((prev) => {
      const existing = prev.find((c) => c.cartKey === cartKey);
      if (existing) {
        return prev.map((c) =>
          c.cartKey === cartKey ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [
        ...prev,
        {
          cartKey,
          id: item.id,
          name: displayName,
          category: item.category,
          price: item.price,
          quantity: 1
        }
      ];
    });

    setKitchenOrderSent(null);
    triggerToast(`"${displayName}" sepete eklendi.`);
  };

  const handleUpdateQty = (cartKey, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartKey === cartKey) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveItem = (cartKey) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const getItemCountInCart = (itemId) => {
    return cart
      .filter((c) => c.id === itemId)
      .reduce((acc, c) => acc + c.quantity, 0);
  };

  const handleSendToKitchen = () => {
    if (cart.length === 0) return;
    const orderCode = `VG-KDS-${Math.floor(1000 + Math.random() * 9000)}`;
    setKitchenOrderSent({
      orderCode,
      table: selectedTable,
      itemCount: totalCount,
      totalAmount,
      note: orderNote || 'Standart Servis',
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    });
    setCart([]);
    setOrderNote('');
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    setReservationSent(true);
    setTimeout(() => setReservationSent(false), 5000);
  };

  const filteredMenu =
    activeCategory === 'Tümü'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="w-full flex flex-col items-center justify-center py-2 sm:py-4 px-2">
      {/* Honesty / Package Strip Above Phone */}
      <div className="w-full max-w-[430px] mb-3 bg-slate-800/90 border border-slate-700 rounded-2xl px-4 py-2.5 flex items-center justify-between text-xs text-slate-200 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="font-bold text-amber-300">[EKO Paket 5 Sayfa Örnek Simülasyonudur]</span>
        </div>
        <span className="text-[11px] text-slate-400 font-mono">Mobile-First v2.4</span>
      </div>

      {/* SMARTPHONE MOCKUP FRAME */}
      <div className="w-full max-w-[430px] bg-white rounded-[42px] shadow-2xl border-[8px] border-slate-800 overflow-hidden flex flex-col h-[760px] text-slate-800 relative">
        
        {/* 1. PHONE TOP STATUS & BRAND HEADER */}
        <div className="bg-slate-900 text-white px-4 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0 z-30">
          <div
            onClick={() => setActiveTab('anasayfa')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-600 transition-colors">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-extrabold tracking-tight text-white leading-tight">
                VanGuard Bistro & Cafe
              </div>
              <div className="text-[10px] text-slate-400 font-medium">
                {selectedTable} · Dijital QR Sistem
              </div>
            </div>
          </div>

          {/* Real-time updating "Sepetim (X)" button in top-right corner */}
          <button
            onClick={() => setActiveTab('sepet')}
            className="px-3 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-900/40 active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Sepetim ({totalCount})</span>
          </button>
        </div>

        {/* Instant Toast Notification inside Phone */}
        {toastMessage && (
          <div className="absolute top-16 left-3 right-3 z-40 bg-slate-900/95 backdrop-blur-md text-white px-3.5 py-2.5 rounded-xl shadow-xl border border-slate-700 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">{toastMessage}</span>
            </div>
            <button
              onClick={() => setActiveTab('sepet')}
              className="text-[11px] font-bold text-blue-300 hover:text-blue-200 underline ml-2 shrink-0 cursor-pointer"
            >
              Sepete Git →
            </button>
          </div>
        )}

        {/* 2. SCROLLABLE SCREEN CONTENT AREA (5 TABS) */}
        <div className="flex-grow overflow-y-auto bg-slate-50/70">
          
          {/* ==========================================
              SAYFA 1: ANA SAYFA (Karşılama, Şefin Önerileri, Öne Çıkanlar)
          ========================================== */}
          {activeTab === 'anasayfa' && (
            <div className="p-4 space-y-5">
              {/* Corporate Welcome Hero */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-3xl p-5 shadow-md space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between text-[11px] text-blue-300 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Kurumsal Gastronomi Deneyimi</span>
                  </span>
                  <span className="text-emerald-400">● Mutfak Aktif</span>
                </div>

                <div className="space-y-1">
                  <h1 className="text-lg font-extrabold tracking-tight leading-snug">
                    VanGuard Bistro & Cafe’ye Hoş Geldiniz
                  </h1>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Günlük taze yerel malzemeler, şeffaf açık mutfak disiplini ve hızlı masa servisi simülasyonu.
                  </p>
                </div>

                <div className="pt-1 flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('menu')}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Dijital Menüyü Aç</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('hakkimizda')}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer border border-slate-700"
                  >
                    Mutfak Politikası
                  </button>
                </div>
              </div>

              {/* Quick Info Strip */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-2xs">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Ort. Hazırlık</div>
                  <div className="text-xs font-extrabold text-slate-900 mt-0.5">12 - 18 Dk</div>
                </div>
                <div className="bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-2xs">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Gıda Standart</div>
                  <div className="text-xs font-extrabold text-blue-700 mt-0.5">ISO 22000</div>
                </div>
                <div className="bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-2xs">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Servis Saatleri</div>
                  <div className="text-xs font-extrabold text-slate-900 mt-0.5">09:00 - 23:30</div>
                </div>
              </div>

              {/* Şefin Önerileri (Chef's Recommendations) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <ChefHat className="w-4 h-4 text-blue-700" />
                    <h2 className="text-sm font-extrabold text-slate-900">Şefin Önerileri</h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('menu')}
                    className="text-xs font-bold text-blue-700 hover:underline cursor-pointer"
                  >
                    Tüm Menü →
                  </button>
                </div>

                {menuItems
                  .filter((item) => item.featured)
                  .slice(0, 3)
                  .map((item) => {
                    const countInCart = getItemCountInCart(item.id);
                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-0.5">
                            <div className="text-[10px] font-semibold text-blue-700">
                              {item.badge} · {item.prepTime}
                            </div>
                            <h3 className="text-sm font-bold text-slate-900 leading-snug">
                              {item.name}
                            </h3>
                          </div>
                          <span className="text-sm font-extrabold text-slate-900 shrink-0">
                            {item.price} TL
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>

                        <div className="pt-1 flex items-center justify-between border-t border-slate-100">
                          <span className="text-[11px] text-slate-400">
                            {countInCart > 0 ? `Sepetinizde: ${countInCart} adet` : 'Günlük taze hazırlık'}
                          </span>
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="px-3 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Sepete Ekle</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Öne Çıkan Lezzetler Vitrini */}
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900">
                    Öne Çıkan Lezzetler Vitrini
                  </span>
                  <span className="text-[11px] text-blue-700 font-semibold">9 Seçkin Ürün</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Başlangıçlardan dinlendirilmiş et çeşitlerine, geleneksel reyhan şerbetinden tatlılara kadar tüm menüyü inceleyip sipariş sepetinize ekleyebilirsiniz.
                </p>
                <button
                  onClick={() => setActiveTab('menu')}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Dijital Menüye Geç ve Sipariş Oluştur</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ==========================================
              SAYFA 2: HAKKIMIZDA (Şeffaf Mutfak Politikası & Hijyen Dökümanları)
          ========================================== */}
          {activeTab === 'hakkimizda' && (
            <div className="p-4 space-y-5">
              <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2">
                <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                  Kurumsal Tanıtım & Standartlar
                </div>
                <h2 className="text-base font-extrabold text-slate-900">
                  Şeffaf Mutfak Politikamız
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  VanGuard Bistro & Cafe olarak misafirlerimize sunduğumuz her tabakta malzeme kaynağını, pişirme yöntemini ve gramaj bilgisini eksiksiz paylaşıyoruz.
                </p>
              </div>

              {/* Hygiene & Kitchen Principles */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider px-1">
                  Temel Mutfak İlkelerimiz
                </h3>

                <div className="bg-white rounded-2xl p-3.5 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>%100 İzlenebilir Yerel Tedarik</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">
                    Et ürünlerimiz sertifikalı besi çiftliklerinden, sebze ve yeşilliklerimiz ise günlük olarak yerel üreticilerden soğuk zincir kırılmadan teslim alınır.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-3.5 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Sıfır Yapay Katkı & Günlük Hazırlık</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">
                    Burger köftelerimiz, makarna soslarımız ve geleneksel reyhan şerbetimiz dondurulmuş hazır ürün kullanılmadan her sabah mutfağımızda taze hazırlanır.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-3.5 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Clock className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>Anlık Fiyat ve Alerjen Şeffaflığı</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">
                    Dijital menümüzde gördüğünüz fiyatlara KDV dahildir; kuver veya gizli servis ücreti talep edilmez.
                  </p>
                </div>
              </div>

              {/* Hygiene Documents & Downloadable PDF */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Hijyen & Kalite Dökümanları
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-semibold">Denetim Onaylı</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-800">ISO 22000:2018 Gıda Güvenliği</div>
                      <div className="text-[11px] text-slate-500">Belge No: TR-VG-2026-089 · Geçerli</div>
                    </div>
                    <FileText className="w-4 h-4 text-blue-700 shrink-0" />
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-800">HACCP Periyodik Hijyen Raporu</div>
                      <div className="text-[11px] text-slate-500">Son Bağımsız Denetim: A+ Seviye</div>
                    </div>
                    <FileText className="w-4 h-4 text-blue-700 shrink-0" />
                  </div>
                </div>

                <a
                  href="/sample-menu.pdf"
                  download="VanGuard_Bistro_Hijyen_ve_Menu_Dokumani.pdf"
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Resmi Menü & Alerjen PDF Dosyasını İndir</span>
                </a>
              </div>
            </div>
          )}

          {/* ==========================================
              SAYFA 3: DİJİTAL MENÜ (Kategorili Yemek Listesi & Aktif 'Sepete Ekle' Butonları)
          ========================================== */}
          {activeTab === 'menu' && (
            <div className="p-4 space-y-4">
              {/* Header & Category Filter Bar */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-extrabold text-slate-900">Dijital QR Menü</h2>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {filteredMenu.length} Lezzet Listeleniyor
                  </span>
                </div>

                {/* Interactive Category Segmented Buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {['Tümü', 'Başlangıç & Çorba', 'Ana Yemek & Burger', 'İçecek & Tatlı'].map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                          activeCategory === cat
                            ? 'bg-blue-700 text-white shadow-xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Menu Items List */}
              <div className="space-y-3">
                {filteredMenu.map((item) => {
                  const countInCart = getItemCountInCart(item.id);
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-0.5">
                          <div className="text-[10px] font-semibold text-slate-400">
                            {item.category} · {item.badge}
                          </div>
                          <h3 className="text-sm font-bold text-slate-900 leading-snug">
                            {item.name}
                          </h3>
                        </div>
                        <span className="text-sm font-extrabold text-slate-900 shrink-0">
                          {item.price} TL
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>

                      {/* Optional Burger Cooking Degree Selector */}
                      {item.hasVariant && (
                        <div className="pt-2 border-t border-slate-100 space-y-1.5">
                          <span className="text-[11px] font-bold text-slate-700 block">
                            Pişme Derecesi Seçimi:
                          </span>
                          <div className="grid grid-cols-3 gap-1.5">
                            {['Az Pişmiş', 'Orta', 'Çok Pişmiş'].map((variant) => (
                              <button
                                key={variant}
                                onClick={() => setSelectedBurgerVariant(variant)}
                                className={`py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                                  selectedBurgerVariant === variant
                                    ? 'bg-slate-900 text-white shadow-2xs'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                              >
                                {variant}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Price & Corporate Blue "+ Sepete Ekle" Action Bar */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div className="text-xs font-semibold text-slate-500">
                          {countInCart > 0 ? (
                            <span className="text-blue-700 font-bold">
                              ✓ Sepette {countInCart} adet var
                            </span>
                          ) : (
                            <span>Hazırlama: ~{item.prepTime}</span>
                          )}
                        </div>

                        <button
                          onClick={() => handleAddToCart(item)}
                          className="px-3.5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Sepete Ekle</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==========================================
              SAYFA 4: SİPARİŞ SEPETİ (Dinamik Sepet, Adet Değiştirme ve Mutfak Paneline İlet)
          ========================================== */}
          {activeTab === 'sepet' && (
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Sipariş Sepetim</h2>
                  <p className="text-xs text-slate-500">
                    Masadan mutfak ekranına (KDS) sipariş simülasyonu
                  </p>
                </div>
                <span className="text-xs font-extrabold text-blue-700">
                  {totalCount} Ürün
                </span>
              </div>

              {/* Order Confirmation Screen if Order Was Sent */}
              {kitchenOrderSent && (
                <div className="bg-emerald-950 text-white rounded-2xl p-4 border border-emerald-700 space-y-3 shadow-lg animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mutfak Paneline İletildi [Simülasyon]</span>
                    </span>
                    <span className="text-[11px] font-mono text-emerald-300">
                      #{kitchenOrderSent.orderCode}
                    </span>
                  </div>
                  <div className="text-xs text-slate-200 space-y-1 border-y border-emerald-800/80 py-2.5">
                    <div>
                      <strong>Masa:</strong> {kitchenOrderSent.table}
                    </div>
                    <div>
                      <strong>Toplam Kalem:</strong> {kitchenOrderSent.itemCount} Adet ({kitchenOrderSent.totalAmount} TL)
                    </div>
                    <div>
                      <strong>Mutfak Notu:</strong> {kitchenOrderSent.note}
                    </div>
                    <div>
                      <strong>İletim Saati:</strong> {kitchenOrderSent.timestamp}
                    </div>
                  </div>
                  <p className="text-[11px] text-emerald-300 leading-relaxed">
                    Bu ekran örnek senaryo simülasyonudur. Gerçek ödeme veya POS tahsilatı içermez.
                  </p>
                </div>
              )}

              {/* Empty Cart State */}
              {cart.length === 0 ? (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">
                      Sipariş Sepetiniz Henüz Boş
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Dijital menüden burger, çorba veya içeceklerin yanındaki mavi "Sepete Ekle" butonuna tıklayarak sipariş listesi oluşturabilirsiniz.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('menu')}
                    className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Dijital Menüye Git</span>
                  </button>
                </div>
              ) : (
                <>
                  {/* Table Selector */}
                  <div className="bg-white rounded-2xl p-3.5 border border-slate-200 flex items-center justify-between gap-2">
                    <label htmlFor="demo-table-select" className="text-xs font-bold text-slate-800">Aktif Masa Konumu:</label>
                    <select
                      id="demo-table-select"
                      aria-label="Aktif Masa Konumu Seçimi"
                      value={selectedTable}
                      onChange={(e) => setSelectedTable(e.target.value)}
                      className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-xl px-2.5 py-1.5 outline-none cursor-pointer"
                    >
                      <option value="Masa 12 (Salon)">Masa 12 (Salon)</option>
                      <option value="Masa 04 (Teras)">Masa 04 (Teras)</option>
                      <option value="Masa 08 (Bahçe)">Masa 08 (Bahçe)</option>
                      <option value="VIP Loca 01">VIP Loca 01</option>
                    </select>
                  </div>

                  {/* Cart Items with Quantity Controls */}
                  <div className="space-y-2.5">
                    {cart.map((item) => (
                      <div
                        key={item.cartKey}
                        className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-[10px] text-slate-600 font-semibold">
                              {item.category}
                            </div>
                            <h3 className="text-xs font-bold text-slate-900">{item.name}</h3>
                          </div>
                          <button
                            type="button"
                            aria-label={`${item.name} ürününü sepetten kaldır`}
                            onClick={() => handleRemoveItem(item.cartKey)}
                            className="text-slate-600 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                            title="Ürünü Kaldır"
                          >
                            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
                            <button
                              type="button"
                              aria-label={`${item.name} adedini azalt`}
                              onClick={() => handleUpdateQty(item.cartKey, -1)}
                              className="w-6 h-6 rounded-lg bg-white text-slate-800 hover:bg-slate-200 flex items-center justify-center font-bold cursor-pointer shadow-2xs"
                            >
                              <Minus className="w-3 h-3" aria-hidden="true" />
                            </button>
                            <span className="text-xs font-extrabold text-slate-900 px-1.5">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label={`${item.name} adedini artır`}
                              onClick={() => handleUpdateQty(item.cartKey, 1)}
                              className="w-6 h-6 rounded-lg bg-blue-700 text-white hover:bg-blue-800 flex items-center justify-center font-bold cursor-pointer shadow-2xs"
                            >
                              <Plus className="w-3 h-3" aria-hidden="true" />
                            </button>
                          </div>

                          <div className="text-xs font-extrabold text-slate-900">
                            {item.price * item.quantity} TL
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Kitchen Note Input */}
                  <div className="bg-white rounded-2xl p-3.5 border border-slate-200 space-y-1.5">
                    <label htmlFor="demo-kitchen-note" className="text-[11px] font-bold text-slate-800 block">
                      Mutfak / Servis Notunuz (Opsiyonel):
                    </label>
                    <input
                      id="demo-kitchen-note"
                      type="text"
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      placeholder="Örn: Burger soğansız olsun, çorba sıcak gelsin..."
                      className="w-full text-xs bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3 py-2 outline-none focus:border-blue-600"
                    />
                  </div>

                  {/* Total Summary & Submit to Kitchen Button */}
                  <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-3 shadow-md">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Ara Toplam ({totalCount} Ürün)</span>
                        <span>{totalAmount} TL</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Kuver / Servis Ücreti</span>
                        <span className="text-emerald-400">Ücretsiz (0 TL)</span>
                      </div>
                      <div className="flex items-center justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-800">
                        <span>Genel Toplam</span>
                        <span className="text-amber-400">{totalAmount} TL</span>
                      </div>
                    </div>

                    <button
                      onClick={handleSendToKitchen}
                      className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-extrabold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/50 active:scale-95"
                    >
                      <Utensils className="w-4 h-4" />
                      <span>Siparişi Mutfak Paneline İlet [Simülasyon]</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ==========================================
              SAYFA 5: İLETİŞİM (Rezervasyon, Şube Harita Yer Tutucusu, Cloudflare Form Simülasyonu)
          ========================================== */}
          {activeTab === 'iletisim' && (
            <div className="p-4 space-y-4">
              <div>
                <h2 className="text-base font-extrabold text-slate-900">
                  Rezervasyon & Şube İletişim
                </h2>
                <p className="text-xs text-slate-500">
                  Masa rezervasyonu ve şube lokasyon bilgileri
                </p>
              </div>

              {/* Branch Map Placeholder */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 space-y-2.5 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-400 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>Şube Lokasyon Harita Yer Tutucusu (Kurgusal)</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">40.9833° N, 29.0256° E</span>
                </div>

                <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-3 text-xs space-y-1">
                  <div className="font-bold text-white">VanGuard Bistro &amp; Cafe — Örnek Demo Şube</div>
                  <div className="text-slate-300 text-[11px]">
                    Örnek Lezzet Bulvarı, Gastronomi Sokak No: 100, Kadıköy / İstanbul (Kurgusal Adres)
                  </div>
                  <div className="text-slate-400 text-[11px] pt-1 flex items-center justify-between">
                    <span>Tel: +90 (216) 000 00 00 (Demo)</span>
                    <span className="text-emerald-400 font-semibold">Vale &amp; Otopark Mevcut</span>
                  </div>
                </div>
              </div>

              {/* Reservation Form with Cloudflare Simulation */}
              <form
                onSubmit={handleReservationSubmit}
                className="bg-white rounded-2xl p-4 border border-slate-200 space-y-3 shadow-2xs"
              >
                <div className="text-xs font-extrabold text-slate-900">
                  Hızlı Masa Rezervasyon Formu
                </div>

                {reservationSent && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-3 text-xs flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Rezervasyon Talebiniz Alındı [Simülasyon]</strong>
                      <p className="text-[11px] text-emerald-700 mt-0.5">
                        Cloudflare korumalı form üzerinden işletme yetkilisine e-posta bildirimi iletildi.
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Adınız Soyadınız
                    </label>
                    <input
                      type="text"
                      required
                      value={reservationForm.name}
                      onChange={(e) =>
                        setReservationForm({ ...reservationForm, name: e.target.value })
                      }
                      placeholder="Örn: Ahmet Yılmaz"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Telefon Numaranız
                    </label>
                    <input
                      type="tel"
                      required
                      value={reservationForm.phone}
                      onChange={(e) =>
                        setReservationForm({ ...reservationForm, phone: e.target.value })
                      }
                      placeholder="+90 5XX XXX XX XX"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-700 block mb-1">
                        Tarih
                      </label>
                      <input
                        type="date"
                        value={reservationForm.date}
                        onChange={(e) =>
                          setReservationForm({ ...reservationForm, date: e.target.value })
                        }
                        className="w-full text-[11px] bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-700 block mb-1">
                        Saat
                      </label>
                      <select
                        value={reservationForm.time}
                        onChange={(e) =>
                          setReservationForm({ ...reservationForm, time: e.target.value })
                        }
                        className="w-full text-[11px] bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 outline-none"
                      >
                        <option>13:00</option>
                        <option>15:00</option>
                        <option>19:30</option>
                        <option>20:30</option>
                        <option>21:30</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-700 block mb-1">
                        Kişi Sayısı
                      </label>
                      <select
                        value={reservationForm.guests}
                        onChange={(e) =>
                          setReservationForm({ ...reservationForm, guests: e.target.value })
                        }
                        className="w-full text-[11px] bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 outline-none"
                      >
                        <option>1 Kişi</option>
                        <option>2 Kişi</option>
                        <option>4 Kişi</option>
                        <option>6+ Kişi</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Cloudflare Form Simulation Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-800">
                        Cloudflare Turnstile Doğrulaması
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Anti-Spam & Bot Koruması Aktif [Simülasyon]
                      </div>
                    </div>
                  </div>
                  <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  Rezervasyon Talebini Gönder [Simülasyon]
                </button>
              </form>

              {/* Scope Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-[11px] text-amber-900 leading-relaxed flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Şeffaf Sorumluluk Notu:</strong> Bu 5 sayfalık mobil uygulama görünümü, örnek senaryo simülasyonudur. Gerçek kredi kartı tahsilatı veya fiziki POS entegrasyonu EKO pakete dahil değildir.
                </div>
              </div>
            </div>
          )}

        </div>

        {/* 3. BOTTOM NAVIGATION BAR (5 CLICKABLE TABS INSIDE PHONE FRAME) */}
        <div className="bg-white border-t border-slate-200 px-2 py-2 shrink-0 z-30">
          <div className="grid grid-cols-5 gap-1">
            {/* Tab 1: Ana Sayfa */}
            <button
              onClick={() => setActiveTab('anasayfa')}
              className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                activeTab === 'anasayfa'
                  ? 'bg-blue-50 text-blue-700 font-extrabold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="text-[10px] leading-none">Ana Sayfa</span>
            </button>

            {/* Tab 2: Hakkımızda */}
            <button
              onClick={() => setActiveTab('hakkimizda')}
              className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                activeTab === 'hakkimizda'
                  ? 'bg-blue-50 text-blue-700 font-extrabold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'
              }`}
            >
              <Info className="w-4 h-4" />
              <span className="text-[10px] leading-none">Hakkımızda</span>
            </button>

            {/* Tab 3: Dijital Menü */}
            <button
              onClick={() => setActiveTab('menu')}
              className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                activeTab === 'menu'
                  ? 'bg-blue-50 text-blue-700 font-extrabold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-[10px] leading-none">Dijital Menü</span>
            </button>

            {/* Tab 4: Sipariş Sepeti */}
            <button
              onClick={() => setActiveTab('sepet')}
              className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer relative ${
                activeTab === 'sepet'
                  ? 'bg-blue-700 text-white font-extrabold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-[10px] leading-none">Sepet ({totalCount})</span>
            </button>

            {/* Tab 5: İletişim */}
            <button
              onClick={() => setActiveTab('iletisim')}
              className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                activeTab === 'iletisim'
                  ? 'bg-blue-50 text-blue-700 font-extrabold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="text-[10px] leading-none">İletişim</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RestoranMenuDemo;
