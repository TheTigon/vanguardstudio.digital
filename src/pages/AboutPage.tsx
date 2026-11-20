import React from 'react';
import { RoutePath } from '../types';
import { ArrowLeft, Building2, Mail, Calendar } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: RoutePath) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button & Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            aria-label="Ana Sayfaya Dön"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Ana Sayfaya Dön</span>
          </button>
          <span className="text-xs font-mono font-bold text-slate-800 bg-white px-3 py-1.5 rounded-lg border border-slate-300 shadow-2xs">
            /tr/kurumsal/hakkimizda/
          </span>
        </div>

        {/* Main Corporate Document Card */}
        <article className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Document Header */}
          <div className="bg-gradient-to-b from-slate-50 to-white px-8 sm:px-12 pt-10 pb-8 border-b border-slate-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100 text-blue-900 text-xs font-bold tracking-wide uppercase mb-4 border border-blue-300">
              <Building2 className="w-4 h-4 text-blue-700" aria-hidden="true" />
              <span>Kurumsal Kimlik, Vizyon &amp; Misyon</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              <strong className="font-extrabold text-slate-900">VanGuard Studio Digital</strong> — KURUMSAL HAKKIMIZDA
            </h1>
          </div>

          {/* Document Body */}
          <div
            className="px-8 sm:px-12 py-10 space-y-10 text-slate-800 leading-relaxed text-[15px] sm:text-base text-justify"
            style={{ textAlign: 'justify' }}
          >
            {/* Kurumsal Vizyon & Mühendislik Gücü */}
            <section className="space-y-4 bg-slate-50/90 rounded-2xl p-6 sm:p-7 border border-slate-200">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 text-left">
                <span>🛡️ KURUMSAL VİZYON VE MÜHENDİSLİK GÜCÜ</span>
              </h2>
              <p className="text-justify leading-relaxed text-slate-800 text-[15px] sm:text-base font-normal" style={{ textAlign: 'justify' }}>
                <strong className="font-bold text-slate-950">VanGuard Studio Digital</strong>, küresel pazarda işletmelerin dijital altyapılarını siber sahada sarsılmaz kılmak amacıyla kurulmuş kurşun geçirmez bir B2B teknoloji markasıdır. <strong className="font-bold text-slate-950">Antalya Genel Merkezi (HQ)</strong>, <strong className="font-bold text-slate-950">Rusya Stratejik İşbirliği Ofisi</strong> ve <strong className="font-bold text-slate-950">Kosova Bölge Ofisi</strong> ağından oluşan çok uluslu yapısıyla, şirketlerin operasyonel yüklerini sunucusuz (<strong className="font-bold text-slate-950">Stateless</strong>) ve veritabanısız (<strong className="font-bold text-slate-950">Zero-DB</strong>) akıllı motorlarla geleceğe taşımaktadır. Mali ve yasal altyapısını Türkiye’nin köklü bilişim vizyonunu temsil eden <strong className="font-semibold text-slate-950">İsmail Kaplan - <strong className="text-amber-600 font-bold">Web</strong>nolojik Dijital Teknolojiler</strong> güvencesiyle birleştiren <strong className="font-bold text-slate-950">VanGuard Studio Digital</strong>, şeffaflık ilkelerinden ödün vermeden kurumsal yapılara yüksek mühendislik çözümleri sunar. Sadece kod üretmeye değil; <strong className="font-bold text-slate-950">PageSpeed 100</strong> tam puan zaferleriyle hızda çağ atlatmaya, siber güvenlik devreleriyle veri sızıntılarını sıfırlamaya ve işletmelere tüm kaynak kod mülkiyetini resmi olarak devrederek tam bağımsızlık kazandırmaya odaklanır.
              </p>
            </section>

            {/* Section 1: BİZ KİMİZ? */}
            <section className="space-y-4 pt-6 border-t border-slate-200">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 text-left">
                <span>🏢 BİZ KİMİZ?</span>
              </h2>
              <p className="text-justify leading-relaxed text-slate-800" style={{ textAlign: 'justify' }}>
                <strong className="font-bold text-slate-950">VanGuard Studio Digital</strong>; geleneksel yazılım süreçlerinin getirdiği hantal bürokrasiyi, ucu açık teslimat takvimlerini ve şeffaf olmayan bütçelendirmeleri reddeden, <strong className="font-bold text-slate-950">mühendislik ve süreç odaklı</strong> yeni nesil bir dijital tasarım stüdyosudur. Türkiye, Rusya Federasyonu ve Kosova eksenindeki çok uluslu operasyon ağımızla, küresel pazarda varlık gösteren B2B işletmeler, ihracatçılar ve nitelikli KOBİ&apos;ler için yüksek performanslı ve siber güvenlik standartları kilitlenmiş dijital varlıklar inşa ediyoruz. Afaki vaatler veya sektörel jenerik sıfatlar yerine; kapsamı, takvimi ve emek bütçesi net olarak tanımlanmış teknik çözümler üretiyoruz.
              </p>
            </section>

            {/* Section 2: OPERASYONEL DURUŞUMUZ VE SÜREÇ İLKELERİMİZ */}
            <section className="space-y-4 pt-6 border-t border-slate-200">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 text-left">
                <span>📐 OPERASYONEL DURUŞUMUZ VE SÜREÇ İLKELERİMİZ</span>
              </h2>
              <p className="text-justify leading-relaxed text-slate-800" style={{ textAlign: 'justify' }}>
                Dijital dünyada güvenin ancak şeffaflıkla kurulabileceğine inanıyoruz. Bu nedenle stüdyomuzun tüm üretim süreçlerini şu katı kurallarla sınırlandırıyoruz:
              </p>
              <ul className="space-y-4 pl-5 list-disc marker:text-blue-700 text-slate-800 text-justify" style={{ textAlign: 'justify' }}>
                <li className="text-justify leading-relaxed" style={{ textAlign: 'justify' }}>
                  <strong className="font-bold text-slate-950">Net Kapsam ve Tahmini Emek Bütçesi:</strong> Projelerimizin değerlemesi, ucu açık paket tanımlarına değil; arkasında harcanacak gerçek mühendislik ve operasyon saatlerine dayanır. Her projenin başında teslim edilecek ekran sınırları yazılı şartnameyle imza altına alınır.
                </li>
                <li className="text-justify leading-relaxed" style={{ textAlign: 'justify' }}>
                  <strong className="font-bold text-slate-950">5 İş Gününde Kurulum Güvencesi:</strong> Giriş seviyesi kurumsal çözümlerimizde, işletmenize ait kurumsal içerikler, metinler ve gerekli erişim izinleri ekibimize eksiksiz teslim edildiği an <strong className="font-bold text-slate-950">5 iş günlük</strong> kurulum sayacımız resmi olarak başlar. Taahhüt edilen sürede projeyi anahtar teslim olarak canlıya alıyoruz.
                </li>
                <li className="text-justify leading-relaxed" style={{ textAlign: 'justify' }}>
                  <strong className="font-bold text-slate-950">Kritik Siber Güvenlik Mührü:</strong> Kullanıcılarımızın ve işletmenizin veri güvenliğini korumak adına, tarayıcı yerel hafızasında (<strong className="font-bold text-slate-950">LocalStorage</strong> veya <strong className="font-bold text-slate-950">SessionStorage</strong>) kesinlikle hiçbir kurumsal veriyi veya form girdisini kalıcı olarak saklamıyoruz. Tüm form ve veri akış süreçlerini sunucu tarafında (<strong className="font-bold text-slate-950">Server-side</strong>) şifreli <strong className="font-bold text-slate-950">Cloudflare</strong> katmanları ve <strong className="font-bold text-slate-950">Resend API</strong> e-posta motoru altyapısıyla yönetiyor, formlarımızda siber sızıntı risklerini sıfırlamak adına kesinlikle dosya yükleme alanı barındırmıyoruz.
                </li>
              </ul>
            </section>

            {/* Section 3: VİZYONUMUZ */}
            <section className="space-y-4 pt-6 border-t border-slate-200">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 text-left">
                <span>👁️ VİZYONUMUZ</span>
              </h2>
              <p className="text-justify leading-relaxed text-slate-800" style={{ textAlign: 'justify' }}>
                Dijital mühendislik ve yazılım süreçlerinde abartılı pazarlama vaatlerini ortadan kaldırarak; hız, dürüstlük ve siber güvenliği uluslararası bir standart haline getiren küresel ölçekte güvenilir bir teknoloji stüdyosu olmak. <strong className="font-bold text-slate-950">VanGuard Studio Digital</strong> imzası taşıyan her projenin, küresel dijital ekosistemde bir şeffaflık, piko hız ve stabilite referansı olarak kabul edilmesini sağlamaktır.
              </p>
            </section>

            {/* Section 4: MİSYONUMUZ */}
            <section className="space-y-4 pt-6 border-t border-slate-200">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 text-left">
                <span>🚀 MİSYONUMUZ</span>
              </h2>
              <p className="text-justify leading-relaxed text-slate-800" style={{ textAlign: 'justify' }}>
                İşletmelerin dijital dönüşüm ve yapay zekâ entegrasyon süreçlerindeki zaman, bütçe ve yasal risk karmaşasını ortadan kaldırarak; onlara kurşun geçirmez, dürüst ve net sınırlandırılmış mühendislik çözümleri sunmaktır. Çevrimiçi dünyada profesyonel var olmayı afaki bir süreç olmaktan çıkarıp şeffaf bir standarda dönüştürmek; <strong className="font-bold text-slate-950">Hızlı Web / EKO</strong> çözümlerinden <strong className="font-bold text-slate-950">nexus AI Fizibilite</strong> analiz süreçlerine kadar her ölçekteki projeyi veri güvenliği ve yasal mevzuata (KVKK / GDPR) tam uyumlu olarak inşa etmektir.
              </p>
            </section>
          </div>

          {/* Document Footer Metadata */}
          <div className="bg-slate-50 px-8 sm:px-12 py-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-slate-800">
            <div className="flex items-center gap-2 font-medium">
              <Mail className="w-4 h-4 text-blue-700" aria-hidden="true" />
              <span className="font-bold text-slate-900">Kurumsal İletişim:</span>
              <a
                href="mailto:info@vanguardstudio.digital"
                aria-label="VanGuard Studio Digital Resmi E-posta Adresi: info@vanguardstudio.digital"
                className="text-blue-700 font-bold hover:underline"
              >
                info@vanguardstudio.digital
              </a>
            </div>
            <div className="flex items-center gap-2 font-medium text-slate-800">
              <Calendar className="w-4 h-4 text-slate-700" aria-hidden="true" />
              <span><strong className="font-bold text-slate-900">Kurumsal Döküman:</strong> 2026</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
