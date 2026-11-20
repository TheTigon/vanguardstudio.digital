import React, { useEffect } from 'react';
import { RoutePath } from '../types';
import { BLOG_ARTICLES, BlogArticle } from '../data/blogArticles';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  BookOpen, 
  Cpu, 
  Lock, 
  Layers, 
  Globe, 
  ChevronRight,
  Share2,
  FileCheck2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface BlogDetailPageProps {
  slug: string;
  onNavigate: (route: RoutePath) => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ slug, onNavigate }) => {
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 py-16 px-4 flex items-center justify-center">
        <div className="bg-slate-800 rounded-3xl p-8 max-w-lg text-center border border-slate-700 space-y-4">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-white">Makale Bulunamadı</h1>
          <p className="text-sm text-slate-300 text-justify" style={{ textAlign: 'justify' }}>
            Aradığınız teknik makale mevcut değil veya yayından kaldırılmış olabilir. Diğer B2B kurumsal analizlerimizi incelemek için blog sayfasına dönebilirsiniz.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/blog/')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Blog Listesine Dön</span>
          </button>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (categorySlug: BlogArticle['categorySlug']) => {
    switch (categorySlug) {
      case 'ai-otomasyon':
        return <Cpu className="w-4 h-4 text-emerald-400" aria-hidden="true" />;
      case 'siber-guvenlik':
        return <Lock className="w-4 h-4 text-blue-400" aria-hidden="true" />;
      case 'dijital-donusum':
        return <Layers className="w-4 h-4 text-indigo-400" aria-hidden="true" />;
      case 'sektorel-analiz':
        return <Globe className="w-4 h-4 text-amber-400" aria-hidden="true" />;
      default:
        return <BookOpen className="w-4 h-4 text-blue-400" aria-hidden="true" />;
    }
  };

  // Find next and previous articles for clean pagination
  const currentIndex = BLOG_ARTICLES.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? BLOG_ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < BLOG_ARTICLES.length - 1 ? BLOG_ARTICLES[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Schema.org TechArticle & BreadcrumbList Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'TechArticle',
                '@id': `https://vanguardstudio.digital/blog/${article.slug}/#article`,
                headline: article.title,
                alternativeHeadline: article.subtitle,
                description: article.metaDescription,
                datePublished: article.isoDate,
                dateModified: article.isoDate,
                inLanguage: 'tr-TR',
                author: {
                  '@type': 'Organization',
                  name: article.author,
                  url: 'https://vanguardstudio.digital/tr/',
                },
                publisher: {
                  '@type': 'Organization',
                  name: 'VanGuard Studio Digital',
                  url: 'https://vanguardstudio.digital/tr/',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://vanguardstudio.digital/favicon.svg',
                  },
                },
                mainEntityOfPage: {
                  '@type': 'WebPage',
                  '@id': `https://vanguardstudio.digital/blog/${article.slug}/`,
                },
                keywords: article.keywords.join(', '),
              },
              {
                '@type': 'BreadcrumbList',
                '@id': `https://vanguardstudio.digital/blog/${article.slug}/#breadcrumb`,
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Ana Sayfa',
                    item: 'https://vanguardstudio.digital/tr/',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'B2B Blog',
                    item: 'https://vanguardstudio.digital/blog/',
                  },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: article.category,
                    item: 'https://vanguardstudio.digital/blog/',
                  },
                  {
                    '@type': 'ListItem',
                    position: 4,
                    name: article.title,
                    item: `https://vanguardstudio.digital/blog/${article.slug}/`,
                  },
                ],
              },
            ],
          }),
        }}
      />

      <div className="max-w-4xl mx-auto space-y-10">
        {/* Top Controls: Back to Blog and Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <button
            type="button"
            onClick={() => onNavigate('/blog/')}
            aria-label="Tüm blog makaleleri listesine geri dön"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs sm:text-sm font-bold text-slate-200 transition-colors border border-slate-700 cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Tüm Makaleler</span>
          </button>

          <nav aria-label="Breadcrumb" className="text-xs text-slate-400 flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Ana Sayfa
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            <button
              type="button"
              onClick={() => onNavigate('/blog/')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Blog
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            <span className="text-slate-300 font-semibold">{article.category}</span>
          </nav>
        </div>

        {/* Article Header */}
        <header className="space-y-6">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700 font-bold">
              {getCategoryIcon(article.categorySlug)}
              <span>{article.category}</span>
            </span>

            <span className="inline-flex items-center gap-1 text-slate-400 font-medium">
              <Clock className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
              <span>{article.readTime} Okuma Süresi</span>
            </span>

            <span className="text-slate-400">·</span>

            <span className="inline-flex items-center gap-1 text-slate-400 font-medium">
              <Calendar className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
              <span>{article.date}</span>
            </span>

            <span className="text-slate-400">·</span>

            <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Akademik &amp; Sektörel Kaynaklar</span>
            </span>
          </div>

          {/* Main H1 Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed text-justify" style={{ textAlign: 'justify' }}>
            {article.subtitle}
          </p>

          {/* Author Byline */}
          <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">
              V
            </div>
            <div>
              <div className="font-bold text-white">
                <strong className="font-bold text-white">VanGuard Studio Digital</strong> · {article.author}
              </div>
              <div className="text-[11px] text-slate-400">{article.authorRole}</div>
            </div>
          </div>
        </header>

        {/* AEO Executive Brief (Structured Direct Answer Box) */}
        <section className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>Yönetici Özeti &amp; Temel Bulgular</span>
          </div>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal text-justify" style={{ textAlign: 'justify' }}>
            {article.executiveSummary}
          </p>
        </section>

        {/* Main Article Content Sections */}
        <div className="space-y-12">
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight border-b border-slate-800 pb-3">
                {section.heading}
              </h2>

              {section.paragraphs.map((para, pIdx) => (
                <p
                  key={pIdx}
                  className="text-sm sm:text-base text-slate-300 leading-relaxed text-justify font-normal"
                  style={{ textAlign: 'justify' }}
                >
                  {/* Highlight VanGuard Studio Digital in bold consistently */}
                  {para.split('VanGuard Studio Digital').map((chunk, cIdx, arr) => (
                    <React.Fragment key={cIdx}>
                      {chunk}
                      {cIdx < arr.length - 1 && (
                        <strong className="font-bold text-white">VanGuard Studio Digital</strong>
                      )}
                    </React.Fragment>
                  ))}
                </p>
              ))}

              {/* Technical Callout Box if present */}
              {section.callout && (
                <aside className="my-6 rounded-2xl bg-slate-800/80 p-5 sm:p-6 border-l-4 border-blue-500 border-y border-r border-slate-700 space-y-2 shadow-sm">
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-wide flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{section.callout.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-mono leading-relaxed text-justify whitespace-pre-line" style={{ textAlign: 'justify' }}>
                    {section.callout.text}
                  </p>
                </aside>
              )}

              {/* Technical Data Table if present */}
              {section.table && (
                <div className="my-6 overflow-x-auto rounded-2xl border border-slate-700 bg-slate-950/60 shadow-sm">
                  <table className="w-full text-left text-xs sm:text-sm text-slate-200">
                    <thead className="bg-slate-800/90 text-white font-extrabold border-b border-slate-700">
                      <tr>
                        {section.table.headers.map((th, thIdx) => (
                          <th key={thIdx} className="px-4 py-3 sm:px-6">
                            {th}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {section.table.rows.map((row, rowIdx) => (
                        <tr key={rowIdx} className="hover:bg-slate-800/40 transition-colors">
                          {row.map((cell, cellIdx) => (
                            <td key={cellIdx} className={`px-4 py-3 sm:px-6 ${cellIdx === 0 ? 'font-bold text-white' : ''}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Verified Reference Sources (Doğrulanmış Kaynaklar & Literatür) */}
        <section className="bg-slate-800/80 rounded-3xl p-6 sm:p-8 border border-slate-700 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <FileCheck2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>Bağımsız Endüstri Standartları ve Akademik Kaynaklar</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed text-justify" style={{ textAlign: 'justify' }}>
            Bu teknik makalede ele alınan kavramsal modeller, siber güvenlik protokolleri ve mevzuat atıfları; <strong className="font-bold text-white">VanGuard Studio Digital</strong> mütevazı şeffaflık ilkesi gereği aşağıdaki bağımsız küresel kuruluşların kamuya açık araştırma ve teknik standartlarıyla desteklenmektedir:
          </p>

          <ul className="space-y-3 pt-2">
            {article.sources.map((src, sIdx) => (
              <li
                key={sIdx}
                className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>{src.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">{src.organization}</div>
                </div>

                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${src.title} resmi kaynak sayfasını yeni sekmede aç`}
                  className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors font-bold shrink-0 cursor-pointer"
                >
                  <span>Resmi Kaynağı İncele</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Veri Minimizasyonu Mührü & Sıfır Yorum Prensibi */}
        <aside className="bg-slate-800/40 rounded-2xl p-5 border border-slate-700/60 text-xs text-slate-400 space-y-2">
          <div className="flex items-center gap-2 text-slate-200 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>Sıfır-Veritabanı (Zero-DB) &amp; Veri Minimizasyonu Bildirimi</span>
          </div>
          <p className="text-justify leading-relaxed" style={{ textAlign: 'justify' }}>
            <strong className="font-bold text-white">VanGuard Studio Digital</strong> siber güvenlik ilkeleri doğrultusunda bu makale sayfasında hiçbir yorum alanı, kullanıcı veri toplama formu veya takip çerezi çalıştırılmamaktadır. Veri sızıntısı riskini sıfırlayan sunucusuz (Stateless) yapımız gereği, sayfa tamamen hafızasız (Zero-Storage) olarak servis edilmektedir.
          </p>
        </aside>

        {/* Bottom CTA Card */}
        <section className="bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900 rounded-3xl p-8 border border-blue-500/40 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
            <span>Mühendislik Projeniz İçin</span>
          </div>

          <h3 className="text-2xl font-bold text-white">
            İşletmeniz İçin Bağımsız AI ve Mimari Fizibilite Alın
          </h3>

          <p className="text-sm text-slate-300 max-w-2xl mx-auto text-justify leading-relaxed" style={{ textAlign: 'justify' }}>
            Körlemesine yazılım yatırımı yapmadan önce, <strong className="font-bold text-white">VanGuard Studio Digital</strong>’in nexus AI fizibilite motoruyla projenizin teknik bütçesini, teslim takvimini ve ROI projeksiyonunu saniyeler içinde simüle edebilirsiniz.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/nexus/')}
              aria-label="nexus AI Fizibilite Motorunu Başlat"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg cursor-pointer inline-flex items-center gap-2"
            >
              <span>nexus AI Fizibiliteyi Başlat</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/proje-basvurusu/')}
              aria-label="Kurumsal Proje Başvurusu Formuna Git"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              Kurumsal Proje Başvurusu
            </button>
          </div>
        </section>

        {/* Next / Previous Article Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
          {prevArticle ? (
            <button
              type="button"
              onClick={() => onNavigate(`/blog/${prevArticle.slug}/`)}
              className="text-left bg-slate-800/60 hover:bg-slate-800 p-4 rounded-2xl border border-slate-700 transition-all cursor-pointer group"
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                ← Önceki Makale
              </span>
              <span className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                {prevArticle.title}
              </span>
            </button>
          ) : (
            <div />
          )}

          {nextArticle && (
            <button
              type="button"
              onClick={() => onNavigate(`/blog/${nextArticle.slug}/`)}
              className="text-right bg-slate-800/60 hover:bg-slate-800 p-4 rounded-2xl border border-slate-700 transition-all cursor-pointer group"
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Sonraki Makale →
              </span>
              <span className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                {nextArticle.title}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
