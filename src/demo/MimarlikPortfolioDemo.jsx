import React, { useState } from 'react';
import {
  Hammer,
  Home,
  Info,
  Layers,
  ShoppingBag,
  Phone,
  CheckCircle2,
  FileText,
  Download,
  Plus,
  Trash2,
  MapPin,
  ShieldCheck,
  Calendar,
  Maximize2,
  ArrowRight,
  Sparkles,
  Building2
} from 'lucide-react';

export const MimarlikPortfolioDemo = () => {
  const [activeTab, setActiveTab] = useState('anasayfa'); // 'anasayfa' | 'kurumsal' | 'projeler' | 'sepet' | 'iletisim'
  const [selectedFilter, setSelectedFilter] = useState('Tümü');
  const [inquiryCart, setInquiryCart] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [proposalSent, setProposalSent] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  const projects = [
    {
      id: 'istanbul-loft',
      title: 'Kuzey Ormanları Loft Daire İç Mekan Tasarımı',
      year: '2025',
      area: '140 m²',
      budget: 'PRO Kapsam',
      status: '✓ Anahtar Teslim Tamamlandı',
      category: 'Tamamlandı',
      location: 'Sarıyer, İstanbul (Kurgusal Konum)',
      image: '/assets/demos/arch-loft-interior.svg',
      description: 'Minimalist endüstriyel dokunuşlar, özel imalat meşe ahşap detaylar ve entegre DALI aydınlatma otomasyonu.'
    },
    {
      id: 'ankara-ofis',
      title: 'Teknopark Ar-Ge Kurumsal Ofis Uygulaması',
      year: '2026',
      area: '450 m²',
      budget: 'Özel Mimari',
      status: '✓ Proje & Uygulama',
      category: 'Devam Eden',
      location: 'Çankaya, Ankara (Kurgusal Konum)',
      image: '/assets/demos/arch-corporate-office.svg',
      description: 'Çok katlı genel merkez yerleşimi, yüksek akustik yalıtımlı toplantı odaları ve modüler çalışma istasyonları.'
    },
    {
      id: 'cesme-villa',
      title: 'Ege Sahil Müstakil Villa Cephe Renovasyonu',
      year: '2026',
      area: '320 m²',
      budget: 'PRO Kapsam',
      status: '✓ PRO Kapsam',
      category: 'Tamamlandı',
      location: 'Çeşme, İzmir (Kurgusal Konum)',
      image: '/assets/demos/arch-villa-facade.svg',
      description: 'İklim şartlarına dayanıklı ısı yalıtımlı cephe sistemi, termo-ahşap kaplama ve kış bahçesi entegrasyonu.'
    },
    {
      id: 'urla-tas-ev',
      title: 'Urla Sürdürülebilir Taş Konut & Peyzaj',
      year: '2025',
      area: '280 m²',
      budget: 'Özel Mimari',
      status: '✓ Anahtar Teslim Tamamlandı',
      category: 'Tamamlandı',
      location: 'Urla, İzmir (Kurgusal Konum)',
      image: '/assets/demos/arch-stone-house.svg',
      description: 'Doğal bazalt taş işçiliği, yağmur suyu hasat sistemi ve pasif iklimlendirme prensipleriyle inşa edilen müstakil yaşam alanı.'
    }
  ];

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleAddToInquiry = (project) => {
    setInquiryCart((prev) => {
      const exists = prev.find((item) => item.id === project.id);
      if (exists) {
        return prev.map((item) =>
          item.id === project.id ? { ...item, scaleCount: item.scaleCount + 1 } : item
        );
      }
      return [...prev, { ...project, scaleCount: 1 }];
    });
    setProposalSent(false);
    triggerToast(`"${project.title}" keşif & teklif listesine eklendi.`);
  };

  const handleRemoveFromInquiry = (id) => {
    setInquiryCart((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredProjects =
    selectedFilter === 'Tümü'
      ? projects
      : projects.filter((p) => p.category === selectedFilter);

  return (
    <div className="min-h-full bg-slate-50 text-slate-800 flex flex-col">
      {/* Top Navigation Bar inside Demo */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div
            onClick={() => setActiveTab('anasayfa')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold shadow-xs">
              <Hammer className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-900 tracking-tight">
                VANGUARD ARCHITECTS & DESIGN
              </div>
              <div className="text-[11px] text-slate-500">
                Kurumsal Mimari Portföy & Keşif Talep Sistemi
              </div>
            </div>
          </div>

          {/* 5-Page Navigation Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('anasayfa')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'anasayfa'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Ana Sayfa</span>
            </button>

            <button
              onClick={() => setActiveTab('kurumsal')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'kurumsal'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Kurumsal</span>
            </button>

            <button
              onClick={() => setActiveTab('projeler')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'projeler'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Projeler</span>
            </button>

            <button
              onClick={() => setActiveTab('sepet')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'sepet'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Keşif Sepeti ({inquiryCart.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('iletisim')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'iletisim'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>İletişim</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast Message */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-grow max-w-6xl w-full mx-auto p-6 sm:p-8 space-y-8">
        {/* TAB 1: ANA SAYFA */}
        {activeTab === 'anasayfa' && (
          <div className="space-y-8">
            <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-5 relative overflow-hidden">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Mimari Tasarım · Mühendislik · Nitelikli Uygulama</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight max-w-2xl leading-tight">
                Şeffaf Bütçe ve Doğrulanabilir Mühendislik ile Mekansal Çözümler
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Konut, kurumsal ofis ve dış cephe renovasyon projelerinde metrekare, uygulama yılı ve kapsam sınırlarını şeffafça sergileyen kurumsal portföy yapısı.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('projeler')}
                  className="px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs sm:text-sm font-bold transition-all inline-flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Proje Portföyünü İncele</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab('kurumsal')}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer border border-slate-700"
                >
                  Uygulama Metodolojimiz
                </button>
              </div>
            </div>

            {/* Featured Projects Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-slate-900">Seçkin Referans Projeler</h2>
                <button
                  onClick={() => setActiveTab('projeler')}
                  className="text-xs font-bold text-blue-700 hover:underline cursor-pointer"
                >
                  Tüm Portföyü Gör →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.slice(0, 3).map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-44 bg-slate-100 overflow-hidden relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5 space-y-2">
                        <div className="text-[11px] text-slate-500 font-medium">
                          {project.location} · {project.year} · {project.area}
                        </div>
                        <h3 className="text-sm font-bold text-slate-900">{project.title}</h3>
                        <p className="text-xs text-slate-600 line-clamp-2">{project.description}</p>
                      </div>
                    </div>
                    <div className="px-5 pb-5 pt-2">
                      <button
                        onClick={() => handleAddToInquiry(project)}
                        className="w-full py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Benzer Keşif Listesine Ekle</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KURUMSAL */}
        {activeTab === 'kurumsal' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 space-y-4">
              <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                Kurumsal Mimari Disiplin
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Şeffaf Metraj, Bütçe ve Uygulama Metodolojisi
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                VanGuard Architects & Design olarak mimari tasarım ve nitelikli tadilat süreçlerinde sürpriz maliyetleri ortadan kaldıran 3 aşamalı doğrulama protokolü uyguluyoruz.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2">
                  <div className="text-xs font-extrabold text-blue-700">01 · Röleve ve Statik Analiz</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Mevcut mekanın lazer metraj ölçümü, tesisat altyapısı ve taşıyıcı sistem kontrolü yapılır.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2">
                  <div className="text-xs font-extrabold text-blue-700">02 · Malzeme & Keşif Özeti</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Kullanılacak tüm yapı malzemeleri marka, model ve metrekare birim fiyatlarıyla yazılı şartnameye bağlanır.
                  </p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2">
                  <div className="text-xs font-extrabold text-blue-700">03 · Anahtar Teslim Uygulama</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Haftalık şantiye ilerleme raporları ve iş programı takvimi ile sözleşme süresinde teslim edilir.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="/sample-proposal.pdf"
                  download="VanGuard_Mimari_Sartname_Ornegi.pdf"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Örnek Mimari Keşif & Şartname PDF İndir</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROJELER (PORTFÖY) */}
        {activeTab === 'projeler' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Proje Portföy Arşivi</h2>
                <p className="text-xs text-slate-500">
                  İlgilendiğiniz referans projeleri keşif sepetinize ekleyerek benzer bütçe talebi oluşturabilirsiniz.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start">
                {['Tümü', 'Tamamlandı', 'Devam Eden'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedFilter === filter
                        ? 'bg-blue-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="h-56 bg-slate-100 relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="text-xs text-slate-500 font-medium">
                        {project.location} · {project.status}
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
                        <div className="bg-slate-50 rounded-xl p-2 border border-slate-200">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">
                            Yıl
                          </span>
                          <span className="text-xs font-extrabold text-slate-900">
                            {project.year}
                          </span>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-2 border border-slate-200">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">
                            Alan
                          </span>
                          <span className="text-xs font-extrabold text-slate-900">
                            {project.area}
                          </span>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-2 border border-slate-200">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">
                            Bütçe Sınıfı
                          </span>
                          <span className="text-xs font-extrabold text-blue-700">
                            {project.budget}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-6 flex items-center gap-2">
                    <button
                      onClick={() => handleAddToInquiry(project)}
                      className="flex-1 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Keşif Sepetine Ekle</span>
                    </button>
                    <a
                      href="/sample-proposal.pdf"
                      download={`${project.id}_sartname.pdf`}
                      className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: KEŞİF & TEKLİF SEPETİ */}
        {activeTab === 'sepet' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Mimari Keşif & Teklif Sepeti
                </h2>
                <p className="text-xs text-slate-500">
                  Seçtiğiniz referans projeler doğrultusunda ön keşif ve bütçe çalışması talep edin.
                </p>
              </div>
              <span className="text-sm font-extrabold text-blue-700">
                {inquiryCart.length} Referans Seçildi
              </span>
            </div>

            {proposalSent && (
              <div className="bg-emerald-950 text-white rounded-3xl p-6 border border-emerald-700 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Mimari Keşif Talebiniz Proje Ekibine İletildi [Simülasyon]</span>
                </div>
                <p className="text-xs text-slate-300">
                  Seçtiğiniz referans standartlarına uygun birim maliyet ve ön keşif dosyası hazırlanacaktır.
                </p>
              </div>
            )}

            {inquiryCart.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-4">
                <ShoppingBag className="w-10 h-10 text-blue-700 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">
                  Keşif Sepetinizde Henüz Referans Proje Yok
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Projeler sekmesinden kendi mekanınıza en yakın gördüğünüz mimari uygulamaları sepete ekleyerek hızlı keşif talebi oluşturabilirsiniz.
                </p>
                <button
                  onClick={() => setActiveTab('projeler')}
                  className="px-5 py-2.5 rounded-xl bg-blue-700 text-white text-xs font-bold cursor-pointer"
                >
                  Projelere Göz At
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4">
                {inquiryCart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200"
                  >
                    <div>
                      <div className="text-xs font-bold text-blue-700">
                        {item.location} · {item.area} · {item.budget}
                      </div>
                      <div className="text-sm font-extrabold text-slate-900">{item.title}</div>
                    </div>
                    <button
                      type="button"
                      aria-label={`${item.title} referansını keşif sepetinden kaldır`}
                      onClick={() => handleRemoveFromInquiry(item.id)}
                      className="text-slate-600 hover:text-rose-600 p-2 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                ))}

                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    type="button"
                    aria-label="Seçili Referanslar İçin Keşif Talebini Gönder"
                    onClick={() => {
                      setProposalSent(true);
                      setInquiryCart([]);
                    }}
                    className="px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold cursor-pointer shadow-md"
                  >
                    Seçili Referanslar İçin Keşif Talebini Gönder [Simülasyon]
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: İLETİŞİM */}
        {activeTab === 'iletisim' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-4">
              <div className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                Mimari Ofis &amp; Kurgusal Demo Lokasyonları
              </div>
              <h2 className="text-lg font-extrabold">Örnek Tasarım Stüdyolarımız (Kurgusal)</h2>
              <div className="space-y-3 text-xs text-slate-200">
                <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700">
                  <div className="font-bold text-white">İstanbul Merkez Stüdyo (Kurgusal Demo Adresi)</div>
                  <div>Maslak Mah. Tasarım Bulvarı No: 100, Sarıyer / İstanbul · +90 (212) 000 00 01</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700">
                  <div className="font-bold text-white">Ankara Proje &amp; Uygulama Ofisi (Kurgusal Demo Adresi)</div>
                  <div>Söğütözü Cad. Mimarlar Plaza No: 42, Çankaya / Ankara · +90 (312) 000 00 02</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700">
                  <div className="font-bold text-white">İzmir Ege Tasarım Atölyesi (Kurgusal Demo Adresi)</div>
                  <div>Alsancak Kordon Cad. No: 18, Konak / İzmir · +90 (232) 000 00 03</div>
                </div>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setContactSent(true);
              }}
              className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4"
            >
              <h2 className="text-base font-extrabold text-slate-900">
                Mimari Ön Görüşme & Röleve Formu
              </h2>
              {contactSent && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                  ✓ Talebiniz Cloudflare korumalı form üzerinden iletildi [Simülasyon].
                </div>
              )}
              <input
                type="text"
                required
                aria-label="Adınız Soyadınız veya Kurum Adı"
                placeholder="Adınız Soyadınız / Kurum Adı"
                className="w-full text-xs bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3.5 py-2.5 outline-none"
              />
              <input
                type="text"
                required
                aria-label="Proje Lokasyonu ve Yaklaşık Metrekare"
                placeholder="Proje Lokasyonu ve Yaklaşık m²"
                className="w-full text-xs bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3.5 py-2.5 outline-none"
              />
              <textarea
                rows={3}
                aria-label="Tadilat veya mimari proje beklentiniz"
                placeholder="Tadilat veya mimari proje beklentiniz..."
                className="w-full text-xs bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3.5 py-2.5 outline-none"
              />
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px] text-slate-700">
                <span>✓ Cloudflare Turnstile Form Koruması Aktif</span>
                <ShieldCheck className="w-4 h-4 text-blue-700" aria-hidden="true" />
              </div>
              <button
                type="submit"
                aria-label="Keşif Randevusu Talep Et"
                className="w-full py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold cursor-pointer"
              >
                Keşif Randevusu Talep Et [Simülasyon]
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MimarlikPortfolioDemo;
