import React, { useState } from 'react';
import { RoutePath } from '../types';
import { HelpCircle, ArrowLeft, ChevronDown, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FaqPageProps {
  onNavigate: (route: RoutePath) => void;
}

interface FaqItem {
  id: number;
  question: string;
  answer: React.ReactNode;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleItem = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const faqItems: FaqItem[] = [
    {
      id: 1,
      question: 'Hızlı Web / EKO paketinde teslim süresi gerçekten 5 iş günü mü?',
      answer: (
        <>
          Evet. Ancak 5 iş günlük yasal teslim süremiz; resmi sözleşme onaylandığında, ilk ödeme tamamlandığında ve işletmeniz tarafından siteye konulacak tüm kurumsal metin, logo ve ürün görselleri tarafımıza eksiksiz teslim edildiğinde başlar. İçeriklerin işletmeniz tarafından geciktirilmesi durumunda takvim yazılı bildirimle güncellenir.
        </>
      ),
    },
    {
      id: 2,
      question: 'EKO paketi satın aldıktan sonra daha sonra yönetim paneli (CMS) ekletebilir miyim?',
      answer: (
        <>
          EKO paketi hızlı ve maliyet kontrollü olması adına önceden tanımlanmış bileşenlerle kurulur ve harici bir panel içermez. İşletmeniz ilerleyen süreçte dinamik içerik yönetimine ihtiyaç duyarsa, aradaki fark bütçelendirilerek projeniz <strong className="font-bold text-slate-950">Kurumsal Web / PRO</strong> modeline pürüzsüzce yükseltilebilir.
        </>
      ),
    },
    {
      id: 3,
      question: 'Web sitelerimizde neden LocalStorage veya tarayıcı lokal hafızası kullanmıyorsunuz?',
      answer: (
        <>
          <strong className="font-bold text-slate-950">VanGuard Studio Digital</strong> olarak siber güvenliği en üst düzeyde tutmayı taahhüt ediyoruz. Tarayıcı lokal hafızaları (LocalStorage) kötü niyetli yazılımların (XSS saldırıları) ilk hedefidir. Bu nedenle kullanıcılarımızın veri güvenliğini korumak adına tüm oturum ve form süreçlerini sunucu tarafında (<strong className="font-bold text-slate-950">Server-side</strong>) şifreli <strong className="font-bold text-slate-950">Cloudflare</strong> katmanları ile yönetiyoruz.
        </>
      ),
    },
    {
      id: 4,
      question: 'nexus AI Fizibilite hizmeti tam olarak nedir, bir yazılım mı satın alıyoruz?',
      answer: (
        <>
          Hayır. nexus hazır bir yazılım, eklenti veya yapay zekâ robotu değildir. İşletmenizin operasyonel süreçlerini, veri kalitesini ve maliyet risklerini inceleyen <strong className="font-bold text-slate-950">bağımsız bir ücretli analiz ve karar hizmetidir</strong>. Raporun amacı, işletmenizin gerçekten yapay zekâ yatırımına ihtiyacı olup olmadığını dürüstçe ortaya koymaktır.
        </>
      ),
    },
    {
      id: 5,
      question: 'nexus AI Fizibilite raporunun sonucunda "Yapay zekâ yatırımı yapmayın" kararı çıkabilir mi?',
      answer: (
        <>
          Evet, çıkabilir ve bu bizim en değerli çıktılarımızdan biridir. Eğer verileriniz yetersizse, API kullanım maliyetleri sağlayacağı verimlilikten yüksekse veya operasyonunuz buna hazır değilse, raporda dürüstçe &quot;Yatırımı şu aşamada erteleyin&quot; yazarız. Doğru verilmiş bir erteleme kararı, işletmenizi binlerce dolarlık hatalı yazılım yatırımından korur.
        </>
      ),
    },
    {
      id: 6,
      question: 'Sitenizdeki formlarda neden dosya yükleme (File Upload) alanı bulunmuyor?',
      answer: (
        <>
          Siber micro-güvenlik standartlarımız ve veri minimizasyonu ilkelerimiz gereği, web sitemiz üzerinden doğrudan şirket içi gizli döküman veya veri seti kabul etmiyoruz. Ön değerlendirme formlarımız sadece metin tabanlı kurumsal darboğazları toplar. Kapsamlı analiz aşamasına geçildiğinde veri transferleri şifreli harici güvenli kanallardan yürütülür.
        </>
      ),
    },
    {
      id: 7,
      question: 'Restoran dijital menü çözümünde masadan sipariş veya POS entegrasyonu neden kapsam dışı?',
      answer: (
        <>
          Sektörel çözümlerimizde sınırları şeffafça çiziyoruz. Sunduğumuz menü altyapısı, misafirlerinizin fiyatları ve ürünleri telefonlarında uygulama hızında, güncelce görmesini sağlayan bir dijital vitrindir. Fiziki POS cihazı ve adisyon entegrasyonları her işletmenin yazılım altyapısına göre değişen, çok ciddi teknik borçlar yaratan ayrı süreçlerdir ve sadece <strong className="font-bold text-slate-950">Özel Mimari</strong> kapsamında bütçelendirilebilir.
        </>
      ),
    },
    {
      id: 8,
      question: 'Projeler için esnek veya sonradan değişen fiyatlandırma yapıyor musunuz?',
      answer: (
        <>
          Hayır. Fiyatlandırma sayfamızda yer alan <strong className="font-bold text-slate-950">Tahmini Emek ve Süreç Bütçesi</strong> tablosuna harfiyen sadık kalıyoruz. Proje başında teslim edilecek tüm ekran sınırları ve modüller yazılı şartnameyle imza altına alınır. Süreç esnasında gelecek ek talepler teslim takvimini bozmamak adına Değişiklik Yönetimi prosedürü ile ayrıca bütçelenir; sürpriz maliyet çıkarılmaz.
        </>
      ),
    },
    {
      id: 9,
      question: 'Herhangi bir sebeple sizden aldığımız bakım veya web hizmetini sonlandırırsak verilerimize ne olur?',
      answer: (
        <>
          Ticari dürüstlük ilkemiz gereği, hizmet ortaklığının sonlandırılması durumunda işletmenize ait mülkiyet hakları paket kapsamına göre işletilir. <strong className="font-bold text-slate-950">Kurumsal Web / PRO</strong> ve <strong className="font-bold text-slate-950">Özel Mimari</strong> projelerinde tüm kaynak kodlar, sistem logları ve içerikler tarafınıza eksiksiz devredilir. Hazır şablon altyapısı kullanan <strong className="font-bold text-slate-950">Hızlı Web / EKO</strong> paketinde ise kaynak kod devri yapılmaz; işletmenize ait ham kurumsal metin verileri ve görseller dijital bir paket olarak sorunsuz teslim edilir.
        </>
      ),
    },
    {
      id: 10,
      question: 'Uluslararası ofis ağınız üzerinden faturalandırma ve yasal süreçler nasıl işliyor?',
      answer: (
        <>
          Projenizin operasyonel coğrafyasına göre <strong className="font-bold text-slate-950">Antalya Genel Merkezimiz (HQ)</strong>, <strong className="font-bold text-slate-950">Rusya Stratejik İşbirliği Ofisimiz</strong> veya <strong className="font-bold text-slate-950">Kosova Bölge Ofisimiz</strong> üzerinden yerel mevzuatlara, KVKK ve GDPR kurallarına tam uyumlu olarak resmi sözleşme ve faturalandırma süreçleri yürütülmektedir.
        </>
      ),
    },
    {
      id: 11,
      question: 'Sitenizde gizli veya ekstra masraf yok diyorsunuz, o halde aylık bakım ücretleri nereden çıkıyor?',
      answer: (
        <>
          Yazılım teslimatlarımız tek seferlik bütçelerdir ve ömür boyu süren zorunlu bir gizli lisans bedeli içermez. Aylık teknik bakım paketlerimiz ise tamamen <strong className="font-bold text-slate-950">isteğe bağlı bir siber sigorta ve teknik asistanlık hizmetidir</strong>. Satın alınması zorunlu değildir; ancak dijital varlığınızın 7/24 siber saldırılardan korunması, tarayıcı güncellemelerine tam uyumlu kalması ve form gönderimlerinizin güncel bir şekilde çalışmaya devam etmesi adına operasyonel olarak işletmenize büyük bir teknik güvence sağlar.
        </>
      ),
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Top Breadcrumb / Back Action */}
        <div className="mb-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            aria-label="Ana Sayfaya Dön"
            className="inline-flex items-center space-x-2 text-sm font-bold text-slate-800 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Ana Sayfaya Dön</span>
          </button>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 bg-white px-3 py-1.5 rounded-full border border-slate-300 shadow-2xs">
            /tr/destek/sss/
          </span>
        </div>

        {/* Main Document Card */}
        <article className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Document Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 px-8 py-12 text-white">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-100 text-xs font-bold mb-4">
              <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Kurumsal Destek &amp; Şeffaf Süreç Rehberi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug">
              <strong className="font-bold text-white">VanGuard Studio Digital</strong> — SIKÇA SORULAN SORULAR (SSS)
            </h1>
            <p className="mt-4 text-slate-200 text-sm sm:text-base leading-relaxed text-justify" style={{ textAlign: 'justify' }}>
              <strong className="font-bold text-white">VanGuard Studio Digital</strong> bünyesinde sunduğumuz yazılım mimarisi, teslim takvimleri, siber güvenlik standartları ve <strong className="font-bold text-white">nexus</strong> analiz süreçleri hakkında en sık yöneltilen soruların şeffaf yanıtlarını aşağıda inceleyebilirsiniz.
            </p>
          </div>

          {/* Info Bar */}
          <div className="px-8 py-4 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <h2 className="flex items-center space-x-2 text-xs font-bold text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-blue-700" aria-hidden="true" />
              <span>Toplam 11 Kurumsal Soru ve Yanıt</span>
            </h2>
            <span className="text-xs font-semibold text-slate-700">
              Yanıtını incelemek istediğiniz sorunun üzerine tıklayınız
            </span>
          </div>

          {/* Single-Open Accordion List */}
          <div className="p-6 sm:p-10 space-y-4">
            {faqItems.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-200 ${
                    isOpen
                      ? 'border-blue-600/50 bg-blue-50/30 shadow-xs'
                      : 'border-slate-300 bg-white hover:border-slate-400'
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      aria-label={`Soru ${item.id}: ${item.question}`}
                      className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer select-none"
                    >
                      <div className="flex items-start sm:items-center gap-3.5">
                        <span
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 transition-colors duration-200 ${
                            isOpen
                              ? 'bg-blue-700 text-white shadow-xs'
                              : 'bg-blue-50 border border-blue-300 text-blue-800'
                          }`}
                          aria-hidden="true"
                        >
                          {item.id}
                        </span>
                        <span className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                          {item.question}
                        </span>
                      </div>
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen
                            ? 'bg-blue-700 text-white rotate-180'
                            : 'bg-slate-200 text-slate-800'
                        }`}
                        aria-hidden="true"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>
                  </h3>

                  {/* Smooth Single Accordion Content Panel */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-6 pb-6 pt-1 sm:pl-[4.25rem]">
                        <div className="pt-3 border-t border-slate-200">
                          <p
                            className="text-slate-800 text-sm sm:text-base leading-relaxed text-justify"
                            style={{ textAlign: 'justify' }}
                          >
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Support Callout */}
          <div className="px-8 py-8 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Farklı bir teknik veya operasyonel sorunuz mu var?
              </h2>
              <p className="text-xs sm:text-sm text-slate-800 mt-1 text-justify" style={{ textAlign: 'justify' }}>
                <strong className="font-bold text-slate-950">VanGuard Studio Digital</strong> uzman ekibiyle doğrudan iletişime geçebilir veya projenizi başlatabilirsiniz.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:info@vanguardstudio.digital"
                aria-label="VanGuard Studio Digital destek ekibine e-posta gönderin: info@vanguardstudio.digital"
                className="inline-flex items-center space-x-2 text-xs font-bold text-slate-900 hover:text-blue-700 bg-white px-4 py-2.5 rounded-lg border border-slate-300 shadow-2xs transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-700" aria-hidden="true" />
                <span>info@vanguardstudio.digital</span>
              </a>
              <button
                type="button"
                onClick={() => onNavigate('/proje-basvurusu/')}
                aria-label="Proje Başvurusu sayfasına git"
                className="inline-flex items-center space-x-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 px-4 py-2.5 rounded-lg shadow-2xs transition-colors cursor-pointer"
              >
                <span>Proje Başvurusu</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
