import React from 'react';
import {
  ShieldCheck,
  Lock,
  Landmark,
  FileCheck2,
  Server,
  Cpu,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { EcommerceDemoTab } from './types';

interface CorporatePageProps {
  onNavigate: (tab: EcommerceDemoTab) => void;
}

export const CorporatePage: React.FC<CorporatePageProps> = ({ onNavigate }) => {
  const trustStandards = [
    {
      id: 'ssl-256',
      icon: Lock,
      badge: 'TLS 1.3 · SHA-256 Kriptografi',
      title: '256-Bit SSL Şifreleme Altyapısı',
      description:
        'Müşterilerinizin tarayıcısı ile sunucu katmanı arasındaki tüm oturum, sepet ve kimlik doğrulama trafiği 256-Bit uçtan uca şifreleme protokolü ile korunur. Üçüncü taraf ağ dinlemelerine ve veri sızıntılarına karşı banka seviyesinde izolasyon sağlar.',
    },
    {
      id: 'bddk-payment',
      icon: Landmark,
      badge: 'PCI-DSS Level 1 · 3D Secure 2.0',
      title: 'BDDK Uyumlu Ödeme Ağ Geçidi',
      description:
        'Türkiye Cumhuriyet Merkez Bankası ve BDDK lisanslı tüm banka sanal POS sistemleri ve ödeme kuruluşlarıyla doğrudan entegre çalışır. Kredi kartı verileri sunucu belleğinde dahi tutulmadan doğrudan şifreli banka 토큰 (token) katmanına iletilir.',
    },
    {
      id: 'kvkk-compliance',
      icon: FileCheck2,
      badge: '6698 Sayılı Kanun · Sıfır Kalıcı Veri',
      title: 'KVKK Veri Koruma Standartları',
      description:
        'Kişisel Verilerin Korunması Kanunu (KVKK) ve uluslararası GDPR normlarına tam uyumlu mimari. Açık rıza metinleri, çerez tercih yönetimi ve veri minimizasyonu ilkeleri sistem çekirdeğinde standart olarak yapılandırılmıştır.',
    },
    {
      id: 'edge-waf',
      icon: ShieldCheck,
      badge: 'Küresel CDN · DDoS Koruması',
      title: 'Cloudflare Kurumsal Güvenlik Kalkanı',
      description:
        'Kampanya dönemlerindeki ani trafik artışlarını ve kötü niyetli bot saldırılarını otonom olarak filtreleyen küresel sınır (Edge) güvenlik duvarı. Mağazanız yüksek yoğunluklu indirim günlerinde dahi kesintisiz hızla yanıt verir.',
    },
    {
      id: 'iso-27001',
      icon: Server,
      badge: 'Yüksek Erişilebilirlik · %99,98 SLA',
      title: 'Yedekli Bulut & Mikroservis Mimarisi',
      description:
        'Sipariş toplama, stok düşümü ve e-fatura kesimi işlemleri birbirinden bağımsız mikro kuyruklarda yürütülür. Herhangi bir harici kargo veya banka servisinde yavaşlama yaşansa bile müşterinin sepet onayı saniyeler içinde tamamlanır.',
    },
    {
      id: 'api-bridge',
      icon: Cpu,
      badge: 'REST & Webhook · ERP Uyumlu',
      title: 'Kurumsal ERP & Muhasebe Köprüsü',
      description:
        'Logo, Mikro, Nebim, SAP ve Paraşüt gibi kurumsal kaynak planlama yazılımlarıyla çift yönlü veri haberleşmesi kurar. Stok kartları, cari bakiyeler ve e-arşiv faturalar insan müdahalesine gerek kalmadan otomatik eşitlenir.',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="text-xs font-bold text-[#25D366] uppercase tracking-wider">
          Kurumsal Altyapı · Güvenlik Sertifikaları &amp; Resmi Lisans Standartları
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          B2B Güven Standartları ve Kurumsal Mimari Güvencesi
        </h1>
        <p
          className="text-sm sm:text-base text-zinc-300 leading-relaxed text-justify"
          style={{ textAlign: 'justify' }}
        >
          Yüksek hacimli e-ticaret operasyonlarında hız kadar siber güvenlik, yasal mevzuat uyumu ve finansal işlem bütünlüğü de hayati önem taşır. <strong className="font-bold text-white">VanGuard Studio Digital</strong> mühendislik standartlarıyla kurgulanan bu örnek e-ticaret otomasyon platformu; veri güvenliğini, ödeme ağ geçidi standartlarını ve şeffaf kaynak kod mülkiyeti ilkelerini gazete nizamında net ve doğrulanabilir bir yapıda sunar.
        </p>
      </div>

      {/* Shimmering B2B Trust Standards Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-lg sm:text-xl font-extrabold text-white">
            Sertifikalı Altyapı Bileşenleri ve Güvenlik Katmanları
          </h2>
          <span className="text-xs font-mono text-[#25D366] font-bold">
            Doğrulanmış Kurumsal Standartlar
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustStandards.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="group relative bg-zinc-900 border border-zinc-800 hover:border-[#25D366] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(37,211,102,0.16)] flex flex-col justify-between space-y-5 overflow-hidden"
              >
                {/* Subtle Top Corner Glow */}
                <div
                  className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#25D366]/10 blur-2xl group-hover:bg-[#25D366]/25 transition-all"
                  aria-hidden="true"
                />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.25)] group-hover:scale-105 transition-transform">
                      <IconComponent className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#25D366]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white tracking-tight group-hover:text-[#25D366] transition-colors">
                    {item.title}
                  </h3>

                  <p
                    className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify"
                    style={{ textAlign: 'justify' }}
                  >
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/90 flex items-center justify-between text-xs text-zinc-400 relative z-10">
                  <span className="inline-flex items-center gap-1.5 text-[#25D366] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Denetim Uyumlu Mimari</span>
                  </span>
                  <span className="font-mono">Aktif</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Newspaper-Style Justified Legal & Licensing Columns */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-zinc-800 pb-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-white">
            Yazılım Lisanslama İlkeleri, Sorumluluk Sınırları ve Yasal Taahhütname
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Gazete nizamında iki yana yaslanmış kurumsal şeffaflık ve fikri mülkiyet bildirimi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-[#25D366] uppercase tracking-wider">
              1. Fikri Mülkiyet ve Kaynak Kod Devir Esasları
            </h3>
            <p
              className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify"
              style={{ textAlign: 'justify' }}
            >
              Kurumsal e-ticaret yatırımlarında işletmelerin en büyük sorunu, her yıl katlanarak artan zorunlu kiralama bedelleri ve satıcıya bağımlı kapalı kutu sistemlerdir. <strong className="font-bold text-white">VanGuard Studio Digital</strong> tarafından geliştirilen PRO Paket ve Nexus AI kapsamındaki projelerde, geliştirilen arayüz ve özel otomasyon modüllerinin tüm kaynak kod mülkiyeti resmi devir sözleşmesi ile doğrudan müşteri şirkete devredilir. Hızlı başlangıç amacıyla sunulan standart EKO Paket kapsamında ise hazır bileşen kütüphaneleri kullanıldığından kaynak kod mülkiyeti devri yapılmaz; yalnızca süresiz kullanım hakkı tanımlanır.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-[#25D366] uppercase tracking-wider">
              2. Veri Gizliliği, KVKK ve Sıfır Veri Saklama Taahhüdü
            </h3>
            <p
              className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justify"
              style={{ textAlign: 'justify' }}
            >
              Platform üzerindeki tüm başvuru, teklif ve iletişim formları 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) hükümlerine uygun olarak uçtan uca şifrelenmiş katmanlar üzerinden iletilir. Tarayıcı önbelleğinde veya harici izleme çerezlerinde hiçbir hassas ticari veri depolanmaz. Ödeme ağ geçidi simülasyonları ve kargo entegrasyon modülleri, işletmenizin kendi resmi banka POS hesapları ve anlaşmalı lojistik cari kodları üzerinden doğrudan çalışacak biçimde izole edilmiştir.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p
            className="text-xs text-zinc-400 text-justify"
            style={{ textAlign: 'justify' }}
          >
            Altyapımıza entegre edebileceğiniz hazır otomasyon eklentilerini ve lisans baremlerini Ürünler kataloğumuzdan hemen inceleyebilirsiniz.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('urunler')}
            aria-label="Gelişmiş Varyasyon Ürün Kataloğu sayfasına geç"
            className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-zinc-950 text-xs font-extrabold transition-all inline-flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-auto"
          >
            <span>Ürün Kataloğuna Geç</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
