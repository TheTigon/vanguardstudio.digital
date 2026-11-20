import React, { useState } from 'react';
import {
  ShoppingBag,
  Loader2,
  CheckCircle2,
  Flame,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { ECOMMERCE_PRODUCTS } from './mockData';
import { EcommerceCartItem, EcommerceDemoTab, EcommerceProduct } from './types';

interface ProductsPageProps {
  onAddToCart: (item: EcommerceCartItem) => void;
  onNavigate: (tab: EcommerceDemoTab) => void;
  cartCount: number;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onAddToCart,
  onNavigate,
  cartCount,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({
    'prod-premium-theme': 'single',
    'prod-ai-recommendation': 'single',
    'prod-shipping-integration': 'single',
    'prod-marketplace-sync': 'single',
    'prod-whatsapp-recovery': 'single',
    'prod-b2b-dealer-portal': 'single',
  });
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  const categories = [
    'Tümü',
    'Arayüz & Storefront',
    'Dönüşüm & AI Otomasyon',
    'Lojistik & Operasyon',
    'Pazaryeri & ERP',
    'Pazarlama Otomasyonu',
    'B2B & Kurumsal Ticaret',
  ];

  const filteredProducts =
    selectedCategory === 'Tümü'
      ? ECOMMERCE_PRODUCTS
      : ECOMMERCE_PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleVariantSelect = (productId: string, variantId: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: variantId,
    }));
  };

  const handleAddClick = (product: EcommerceProduct) => {
    if (loadingProductId) return;
    setLoadingProductId(product.id);

    const chosenVariantId = selectedVariants[product.id] || product.variants[0].id;
    const variantObj =
      product.variants.find((v) => v.id === chosenVariantId) || product.variants[0];
    const finalUnitPrice = product.basePrice + variantObj.priceDelta;

    setTimeout(() => {
      onAddToCart({
        cartKey: `${product.id}__${variantObj.id}`,
        productId: product.id,
        name: product.name,
        category: product.category,
        variantLabel: variantObj.label,
        unitPrice: finalUnitPrice,
        quantity: 1,
      });
      setLoadingProductId(null);
    }, 450);
  };

  return (
    <div className="space-y-8">
      {/* Header & Category Bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="text-xs font-bold text-[#25D366] uppercase tracking-wider">
              Modüler E-Ticaret Eklenti &amp; Lisans Kataloğu
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ürünler (Gelişmiş Varyasyon Kataloğu)
            </h1>
            <p
              className="text-sm text-zinc-300 leading-relaxed text-justify"
              style={{ textAlign: 'justify' }}
            >
              İhtiyacınız olan kurumsal e-ticaret modüllerini ve lisans kapasitesini seçerek sepetinize ekleyin. Kartların üzerine geldiğinizde 3D derinlik etkileşimini deneyimleyebilir, sepete eklediğiniz modüllerin KDV ve ticari paket baremleriyle anlık hesaplamasını Sepet sayfasında görebilirsiniz.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('sepet')}
            aria-label={`Sepet ve Ticari Paket Baremleri sayfasına git, sepette ${cartCount} ürün var`}
            className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white border border-[#25D366]/40 text-xs font-extrabold transition-all inline-flex items-center gap-2.5 cursor-pointer shrink-0 self-start lg:self-auto"
          >
            <ShoppingBag className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
            <span>Sepete &amp; Paketlere Git ({cartCount})</span>
            <ArrowRight className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-zinc-800">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              aria-label={`${cat} kategorisini filtrele`}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#25D366] text-zinc-950 shadow-md shadow-[#25D366]/20'
                  : 'bg-zinc-950 text-zinc-300 border border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Hover Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const chosenVariantId = selectedVariants[product.id] || product.variants[0].id;
          const activeVariant =
            product.variants.find((v) => v.id === chosenVariantId) || product.variants[0];
          const currentPrice = product.basePrice + activeVariant.priceDelta;
          const isAdding = loadingProductId === product.id;

          return (
            <div
              key={product.id}
              className="group relative bg-zinc-900 border border-zinc-800 hover:border-[#25D366] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.015] hover:shadow-[0_22px_55px_rgba(37,211,102,0.18)]"
            >
              {/* Top Shimmer Highlight on Hover */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-transparent via-[#25D366] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />

              <div className="space-y-4">
                {/* Metadata Header */}
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-semibold text-[#25D366]">{product.category}</span>
                  <span className="font-mono">{product.sku}</span>
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h2 className="text-lg font-extrabold text-white group-hover:text-[#25D366] transition-colors">
                    {product.name}
                  </h2>
                  <p
                    className="text-xs text-zinc-300 leading-relaxed text-justify"
                    style={{ textAlign: 'justify' }}
                  >
                    {product.detailedDesc}
                  </p>
                </div>

                {/* Tech Specs inline text */}
                <div className="text-[11px] text-zinc-400 pt-1">
                  {product.techStack.join(' · ')} · Kurulum: {product.integrationTime}
                </div>

                {/* Variant Selector */}
                <div className="space-y-2 pt-3 border-t border-zinc-800/90">
                  <label className="text-[11px] font-bold text-zinc-300 block">
                    Lisans / Kapasite Varyasyonu Seçin:
                  </label>
                  <div className="space-y-1.5">
                    {product.variants.map((variant) => {
                      const isSelected = variant.id === chosenVariantId;
                      return (
                        <button
                          key={variant.id}
                          type="button"
                          onClick={() => handleVariantSelect(product.id, variant.id)}
                          aria-label={`${product.name} için ${variant.label} varyasyonunu seç`}
                          className={`w-full px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#25D366]/15 border-[#25D366] text-white'
                              : 'bg-zinc-950/90 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                          }`}
                        >
                          <span className="truncate">{variant.label}</span>
                          <span className="font-mono tabular-nums text-[11px] shrink-0 ml-2">
                            {variant.priceDelta === 0
                              ? 'Standart'
                              : `+₺${variant.priceDelta.toLocaleString('tr-TR')}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Urgency Counter, Price & Add to Cart Button */}
              <div className="pt-5 mt-5 border-t border-zinc-800 space-y-4">
                {/* Dynamic Blinking Urgency Alert */}
                <div
                  className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 animate-pulse ${
                    product.urgencyType === 'remaining_license'
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                      : 'bg-[#25D366]/10 border-[#25D366]/40 text-[#25D366]'
                  }`}
                >
                  {product.urgencyType === 'remaining_license' ? (
                    <Flame className="w-4 h-4 shrink-0 text-amber-400" aria-hidden="true" />
                  ) : (
                    <Sparkles className="w-4 h-4 shrink-0 text-[#25D366]" aria-hidden="true" />
                  )}
                  <span>{product.urgencyText}</span>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-bold text-zinc-400 uppercase">
                      Modül Lisans Bedeli
                    </div>
                    <div className="text-xl font-extrabold text-white font-mono tabular-nums">
                      ₺{currentPrice.toLocaleString('tr-TR')}
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isAdding}
                    onClick={() => handleAddClick(product)}
                    aria-label={`${product.name} ürününü sepete ekle`}
                    className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-80 text-zinc-950 font-extrabold text-xs transition-all inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#25D366]/20 min-w-[148px] active:scale-95"
                  >
                    {isAdding ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-zinc-950" aria-hidden="true" />
                        <span>Ekleniyor...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                        <span>Sepete Ekle</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
