import React, { useState } from 'react';
import { DemoCartItem, DemoPage } from './types';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, CheckCircle2, Building2 } from 'lucide-react';

interface CartPageProps {
  cart: DemoCartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onClearCart: () => void;
  onNavigate: (page: DemoPage) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cart,
  onUpdateQuantity,
  onRemove,
  onClearCart,
  onNavigate
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      alert('Lütfen ad soyad ve kurumsal e-posta alanlarını doldurun.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wider">
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Teklif Sepeti & Talep Formu (Sayfa 4)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Kurumsal Teklif ve Talep Listesi
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          Katologdan seçtiğiniz endüstriyel bileşenleri inceleyin, miktarları güncelleyin ve resmi teklif talebinizi anında iletin.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-200 text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Teklif Talebiniz Başarıyla Alındı!</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Sayın <strong className="text-slate-900">{formData.fullName}</strong> ({formData.company || 'Kurumsal'}), <strong className="text-slate-900">{cart.length}</strong> kalem endüstriyel parça talebiniz teknik ekibimize iletilmiştir. En kısa sürede <span className="text-blue-600 font-medium">{formData.email}</span> adresinize resmi fiyat teklifimiz gönderilecektir.
            </p>
          </div>
          <button
            onClick={() => {
              onClearCart();
              setSubmitted(false);
              onNavigate('catalog');
            }}
            className="px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-blue-600 transition-all cursor-pointer"
          >
            Kataloğa Geri Dön
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Cart Items List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-lg font-bold text-slate-900">Seçilen Kalemler ({cart.length})</h2>
                {cart.length > 0 && (
                  <button type="button" onClick={onClearCart} aria-label="Teklif sepetindeki tüm ürünleri temizle" className="text-xs font-semibold text-rose-600 hover:underline cursor-pointer">
                    Listeyi Temizle
                  </button>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                    <ShoppingCart className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="text-sm text-slate-700 font-medium">Teklif sepetinizde henüz ürün bulunmuyor.</div>
                  <button
                    type="button"
                    onClick={() => onNavigate('catalog')}
                    aria-label="Ürün Kataloğu sayfasına git"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-all cursor-pointer shadow-xs"
                  >
                    Ürün Kataloğuna Git
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded">
                          {item.code}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                        <span className="text-xs text-slate-700">{item.category}</span>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-slate-200 shadow-xs">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            aria-label={`${item.title} miktarını azalt`}
                            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-slate-900">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            aria-label={`${item.title} miktarını artır`}
                            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemove(item.id)}
                          aria-label={`${item.title} ürününü teklif listesinden kaldır`}
                          className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Submission Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl border border-slate-800 space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-bold tracking-tight">Resmi Teklif İsteme Formu</h2>
                <p className="text-xs text-slate-200">Bilgilerinizi girerek seçilen kalemler için anında talep oluşturun.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Ad Soyad *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="Ahmet Yılmaz"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Şirket Adı</label>
                  <input 
                    type="text" 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="Örn: Anadolu Makine Sanayi"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Kurumsal E-posta *</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="ahmet@anadolumakine.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Proje Notları & Özel Toleranslar</label>
                  <textarea 
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="İhtiyaç duyulan teslim tarihi veya özel kaplama talepleri..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={cart.length === 0}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>Teklif Talebini Gönder</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
