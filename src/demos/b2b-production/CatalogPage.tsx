import React, { useState } from 'react';
import { ShoppingCart, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';
import { DemoCartItem, DemoPage } from './types';

interface CatalogPageProps {
  onAddToCart: (item: DemoCartItem) => void;
  onNavigate: (page: DemoPage) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ onAddToCart, onNavigate }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const products = [
    {
      id: 1,
      code: 'VG-PRC-8840',
      title: 'Yüksek Basınçlı Hidrolik Valf Bloğu',
      category: 'Hidrolik Pnömatik Sistemler',
      material: 'Alüminyum Alaşım / Çelik Kaplama',
      specs: 'Max 350 Bar Çalışma Basıncı, ISO 4401 Standartlı.',
      statusTags: ['✓ Teknik Dosya Hazır', '✓ CAD Modeli Mevcut'],
      image: '/assets/demos/b2b-hydraulic-valve.svg'
    },
    {
      id: 2,
      code: 'VG-PRC-9102',
      title: 'Ağır Hizmet Tipi Rulman Yatağı (Flanşlı)',
      category: 'Mekanik Güç Aktarım',
      material: 'Sfero Döküm (GGG-40)',
      specs: 'Sfero Döküm (GGG-40). Kendinden Ayarlı, Yüksek Sıcaklık Dayanımlı.',
      statusTags: ['✓ Stoktan Teslim'],
      image: '/assets/demos/b2b-bearing-housing.svg'
    },
    {
      id: 3,
      code: 'VG-PRC-1845',
      title: 'Endüstriyel Dişli Kutusu Pinyon Dişlisi',
      category: 'Dişli Sistemleri',
      material: 'Isıl İşlem Görmüş İyileştirme Çeliği (42CrMo4)',
      specs: 'Isıl İşlem Görmüş İyileştirme Çeliği (42CrMo4). Modül 6, 24 Diş, Taşlanmış Profil.',
      statusTags: ['✓ Teknik Dosya Hazır'],
      image: '/assets/demos/b2b-pinion-gear.svg'
    }
  ];

  const handleAdd = (product: typeof products[0]) => {
    onAddToCart({
      id: product.id,
      code: product.code,
      title: product.title,
      category: product.category,
      quantity: 1
    });
    setToastMessage(`"${product.title}" teklif sepetine eklendi.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-4 border border-slate-800 animate-in fade-in slide-in-from-top-2">
          <span className="text-sm font-medium">{toastMessage}</span>
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        </div>
      )}

      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wider">
            <span>Ürün Kataloğu (Sayfa 3)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Endüstriyel Parça ve Bileşen Seçkisi
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            İhtiyacınız olan bileşenleri teklif listesine ekleyerek sepet sayfasından resmi teklif talebinde bulunabilirsiniz.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('cart')}
          aria-label="Teklif Sepetine Git ve Resmi Teklif İste"
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md inline-flex items-center justify-center gap-2 cursor-pointer self-start sm:self-center"
        >
          <ShoppingCart className="w-4 h-4" aria-hidden="true" />
          <span>Sepete Git & Teklif İste</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between group">
            
            <div className="relative h-52 bg-slate-100 overflow-hidden border-b border-slate-100">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 font-mono font-bold text-xs px-3 py-1 rounded-lg">
                {product.code}
              </div>
              <div className="absolute top-4 right-4 flex flex-col gap-1 items-end">
                {product.statusTags.map((tag, idx) => (
                  <span key={idx} className="bg-emerald-50/90 backdrop-blur-md text-emerald-800 font-bold text-[11px] px-3 py-1 rounded-full border border-emerald-200 shadow-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6 flex-grow flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">{product.category}</span>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">{product.title}</h2>
                <p className="text-xs text-slate-700">Malzeme: <span className="font-semibold text-slate-900">{product.material}</span></p>
                <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 text-xs text-slate-800 text-justify">
                  <span className="font-semibold text-slate-900">Teknik Detay: </span>
                  {product.specs}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <a
                  href="/sample-technical-spec.pdf"
                  download={`${product.code}_Teknik_Dosya.pdf`}
                  aria-label={`${product.title} (${product.code}) Teknik PDF Dosyasını İndir`}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-slate-700" aria-hidden="true" />
                  <span>Teknik PDF İndir</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleAdd(product)}
                  aria-label={`${product.title} ürününü teklif listesine ekle`}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold inline-flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                  <span>Teklif Listesine Ekle</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
