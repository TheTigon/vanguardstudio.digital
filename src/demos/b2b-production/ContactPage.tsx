import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, Building2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }
    setSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5" />
          <span>Mühendislik İletişim (Sayfa 5)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Vanguard Industrial İletişim Merkezi
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          Fabrika merkezimiz, AR-GE laboratuvarımız veya ihracat departmanımızla doğrudan iletişime geçin.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Fabrika İletişim Bilgileri (Kurgusal Demo)</h2>
            
            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span>1. Organize Sanayi Bölgesi, Örnek Sanayi Cad. No: 100, Nilüfer / Bursa (Kurgusal Demo Adresi)</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600 shrink-0" aria-hidden="true" />
                <span>+90 (224) 000 00 00 (Kurgusal Demo Hattı)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600 shrink-0" aria-hidden="true" />
                <span>ornek-teklif@vanguard-industrial-demo.tes</span>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-48 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 text-xs font-bold">
              [Örnek OSB Fabrika Konum Haritası Yer Tutucusu — Kurgusal]
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200 space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Doğrudan Mesaj Gönderin</h2>

            {sent ? (
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" aria-hidden="true" />
                <h3 className="font-bold text-emerald-900 text-base">Mesajınız Alındı</h3>
                <p className="text-xs text-emerald-800">Cloudflare korumalı iletişim formumuz üzerinden mesajınız ilgili mühendise iletilmiştir.</p>
              </div>
            ) : (
              <form onSubmit={handleSend} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-900">Ad Soyad *</label>
                    <input 
                      type="text" 
                      required
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      placeholder="Mehmet Demir" 
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-900">E-posta Adresi *</label>
                    <input 
                      type="email" 
                      required
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      placeholder="mehmet@firma.com" 
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-900">Mesajınız *</label>
                  <textarea 
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    placeholder="Ürün talepleri veya teknik destek hakkında..." 
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  aria-label="İletişim mesajını gönder"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Mesajı İlet</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
