import React from 'react';
import { RoutePath } from '../types';
import { ShieldCheck, ArrowLeft, Mail, Calendar, Lock } from 'lucide-react';

interface CookiePolicyPageProps {
  onNavigate: (route: RoutePath) => void;
}

export const CookiePolicyPage: React.FC<CookiePolicyPageProps> = ({ onNavigate }) => {
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
            /tr/yasal/cerez-politikasi/
          </span>
        </div>

        {/* Main Document Card */}
        <article className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Document Header */}
          <div className="bg-gradient-to-b from-slate-50 to-white px-8 sm:px-12 pt-10 pb-8 border-b border-slate-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100 text-blue-900 text-xs font-bold tracking-wide uppercase mb-4 border border-blue-300">
              <ShieldCheck className="w-4 h-4 text-blue-700" aria-hidden="true" />
              <span>Yasal Uyumluluk &amp; KVKK / GDPR</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              <strong className="font-extrabold text-slate-900">VanGuard Studio Digital</strong> — ÇEREZ POLİTİKASI
            </h1>
          </div>

          {/* Document Body */}
          <div className="px-8 sm:px-12 py-10 space-y-8 text-slate-800 leading-relaxed text-[15px] sm:text-base text-justify" style={{ textAlign: 'justify' }}>
            {/* Intro Paragraphs (Clean, unboxed) */}
            <div className="space-y-4 text-slate-800 text-justify">
              <p className="text-justify" style={{ textAlign: 'justify' }}>
                <strong className="font-bold text-slate-950">VanGuard Studio Digital</strong> olarak dijital güvenliğinize önem veriyor ve bu Çerez Politikası ile siz ziyaretçilerimizi; web sitemizde hangi çerezleri, hangi amaçla kullandığımız ve çerez ayarlarınızı nasıl değiştireceğiniz konularında şeffafça bilgilendirmeyi hedefliyoruz.
              </p>
              <p className="text-justify" style={{ textAlign: 'justify' }}>
                Sizlere daha iyi hizmet verebilmek adına, çerezler vasıtasıyla ne tür kişisel verilerinizin hangi amaçla toplandığı ve nasıl işlendiği konularında bilgi sahibi olmak için lütfen bu Çerez Politikası metnini okuyunuz. Daha fazla bilgi için{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('/yasal/gizlilik-politikasi/')}
                  aria-label="Gizlilik Politikası sayfasına git"
                  className="text-blue-700 font-bold hover:underline cursor-pointer"
                >
                  Gizlilik Politikamıza
                </button>{' '}
                göz atabilir ya da bizlerle{' '}
                <a
                  href="mailto:info@vanguardstudio.digital"
                  aria-label="VanGuard Studio Digital Resmi E-posta Adresi: info@vanguardstudio.digital"
                  className="text-blue-700 font-bold hover:underline"
                >
                  <strong className="font-bold">info@vanguardstudio.digital</strong>
                </a>{' '}
                üzerinden iletişime geçebilirsiniz.
              </p>
            </div>

            {/* Section 1 */}
            <section className="space-y-4 pt-6 border-t border-slate-200">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-3 text-left">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs" aria-hidden="true">
                  1
                </span>
                <span>ÇEREZ (COOKIE) NEDİR?</span>
              </h2>
              <p className="text-justify" style={{ textAlign: 'justify' }}>
                Çerezler, kullanıcıların web sitelerini daha verimli bir şekilde kullanabilmeleri adına cihazlarına kaydedilen küçük dosyacıklardır. Çerezler vasıtasıyla kullanıcıların bilgilerinin işleniyor olması sebebiyle, Türkiye Cumhuriyeti <strong className="font-bold text-slate-950">6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)</strong> ve <strong className="font-bold text-slate-950">Avrupa Birliği Genel Veri Koruma Yönetmeliği (GDPR)</strong> gereğince kullanıcıların bilgilendirilmeleri ve onaylarının alınması gerekmektedir.
              </p>
              <p className="text-justify" style={{ textAlign: 'justify' }}>
                <strong className="font-bold text-slate-950">VanGuard Studio Digital</strong> olarak, web sitemizden en verimli şekilde yararlanabilmenizi ve kullanıcı deneyiminizin geliştirilebilmesini sağlamak adına teknik altyapımızda şu çerez tiplerini kullanmaktayız:
              </p>

              <ul className="space-y-3 pt-1 pl-1">
                <li className="text-justify" style={{ textAlign: 'justify' }}>
                  <strong className="font-bold text-slate-950">• Zorunlu Çerezler:</strong>{' '}
                  Web sitesine ilişkin temel işlevleri etkinleştirerek sitenin kullanılabilir hale gelmesini sağlayan teknik çerezlerdir. Web sitesi bu çerezler olmadan işlevlerini düzgün yürütemez.
                </li>
                <li className="text-justify" style={{ textAlign: 'justify' }}>
                  <strong className="font-bold text-slate-950">• Performans Çerezleri:</strong>{' '}
                  Ziyaretçilerin web sitesine ilişkin kullanım bilgilerini ve tercihlerini tamamen anonim (maskelenmiş) olarak toplayan ve bu sayede web sitesinin performansının geliştirilmesine olanak sağlayan analitik çerezlerdir.
                </li>
                <li className="text-justify" style={{ textAlign: 'justify' }}>
                  <strong className="font-bold text-slate-950">• Fonksiyonel Çerezler:</strong>{' '}
                  Kullanıcıların web sitesine ilişkin geçmiş kullanımlarından yola çıkılarak gelecekteki ziyaretlerinde tanınmalarını ve hatırlanmalarını sağlayan; dil, bölge vb. kişiselleştirilmiş bir hizmet sunulmasına olanak tanıyan çerezlerdir.
                </li>
                <li className="text-justify" style={{ textAlign: 'justify' }}>
                  <strong className="font-bold text-slate-950">• Reklam ve Üçüncü Taraf Çerezleri:</strong>{' '}
                  Üçüncü taraflara ait çerezlerdir ve web sitelerinde ziyaretçilerin davranışlarını izlemek, kullanıcıların ihtiyaçlarına yönelik ilgilerini çekecek alanları filtrelemek amacıyla kullanılan, sorumluluğu tamamen çerez sahibi üçüncü taraflara ait olan yapılardır.
                </li>
              </ul>
            </section>

            {/* Section 2 - Callout / Alert Box Kept Here */}
            <section className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-3 text-left">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs" aria-hidden="true">
                  2
                </span>
                <span>VERİ MİNİMİZASYONU VE GÜVENLİK KURALI</span>
              </h2>
              <div className="p-5 rounded-2xl bg-slate-50 border border-blue-300 flex items-start gap-3.5">
                <Lock className="w-5 h-5 text-blue-700 shrink-0 mt-1" aria-hidden="true" />
                <p className="text-slate-800 text-justify" style={{ textAlign: 'justify' }}>
                  <strong className="font-bold text-slate-950">VanGuard Studio Digital</strong>, tarayıcı güvenliğinizi korumak adına tarayıcı lokal hafızasında (<strong className="font-bold text-slate-950">LocalStorage</strong> veya <strong className="font-bold text-slate-950">SessionStorage</strong>) kesinlikle kalıcı kullanıcı verisi veya form girdisi saklamaz. Tüm oturum ve tercih süreçleri, sunucu tarafında (Server-side) şifrelenmiş kısa ömürlü <strong className="font-bold text-slate-950">HTTP-Only</strong> güvenli çerez mekanizmaları ile yürütülür.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-3 text-left">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs" aria-hidden="true">
                  3
                </span>
                <span>ÇEREZLER İLE İŞLENEN KİŞİSEL VERİLER NELERDİR?</span>
              </h2>
              <p className="text-justify" style={{ textAlign: 'justify' }}>
                <strong className="font-bold text-slate-950">IP adresiniz, konum verileriniz ve tarayıcı erişim loglarınız</strong>; analitik sağlayıcılar, reklam ağları ve teknoloji sağlayıcıları gibi üçüncü taraflardan elde edilerek, kaydedilerek ve güncellenerek, aramızdaki hizmet ve sözleşme ilişkisi çerçevesinde ve süresince, <strong className="font-bold text-slate-950">meşru menfaat işleme şartına</strong> dayanılarak yasal mevzuata uygun şekilde işlenecektir.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-3 text-left">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs" aria-hidden="true">
                  4
                </span>
                <span>ÇEREZLER HANGİ AMAÇLA KULLANILMAKTADIR?</span>
              </h2>
              <p className="text-justify" style={{ textAlign: 'justify' }}>
                Web sitemizde, şüpheli eylemlerin tespiti yoluyla <strong className="font-bold text-slate-950">siber güvenliğin sağlanması</strong>, kullanıcıların tercihleri doğrultusunda işlevsellik ve performansın artırılması, ürün ve hizmet süreçlerinin geliştirilmesi ile hukuki sorumlulukların yerine getirilmesi amaçlı çerezler kullanılmaktadır.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3 pt-6 border-t border-slate-200">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-3 text-left">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs" aria-hidden="true">
                  5
                </span>
                <span>ÇEREZLER NASIL YÖNETİLMEKTEDİR?</span>
              </h2>
              <p className="text-justify" style={{ textAlign: 'justify' }}>
                Hangi çerezlerin kullanılacağı konusu, tamamen kullanıcılarımızın özgür iradesine bırakılmıştır. Sitemize giriş yaptığınızda sol alt köşede sabit olarak beliren <strong className="font-bold text-slate-950">&quot;Çerez Ayarları&quot;</strong> ikonuna tıklayarak veya tarayıcınızın ayarlarından çerezleri silerek/engelleyerek tercihlerinizi istediğiniz zaman serbestçe değiştirebilirsiniz.
              </p>
            </section>
          </div>

          {/* Document Footer Metadata */}
          <div className="bg-slate-50 px-8 sm:px-12 py-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-slate-800">
            <div className="flex items-center gap-2 font-medium">
              <Mail className="w-4 h-4 text-blue-700" aria-hidden="true" />
              <span className="font-bold text-slate-900">Resmi Yazışma ve İletişim:</span>
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
              <span><strong className="font-bold text-slate-900">Son Güncellenme:</strong> 02/11/2026</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
