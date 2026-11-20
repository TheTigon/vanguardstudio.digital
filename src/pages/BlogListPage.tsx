import React, { useState, useMemo } from 'react';
import { RoutePath } from '../types';
import { BLOG_ARTICLES, BLOG_CATEGORIES, BlogArticle } from '../data/blogArticles';
import { 
  BookOpen, 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Lock, 
  Layers, 
  Globe, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface BlogListPageProps {
  onNavigate: (route: RoutePath) => void;
}

export const BlogListPage: React.FC<BlogListPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'all' || article.categorySlug === selectedCategory;
      const cleanQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !cleanQuery ||
        article.title.toLowerCase().includes(cleanQuery) ||
        article.subtitle.toLowerCase().includes(cleanQuery) ||
        article.keywords.some((k) => k.toLowerCase().includes(cleanQuery)) ||
        article.executiveSummary.toLowerCase().includes(cleanQuery);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

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

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Schema.org Blog/Collection Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            '@id': 'https://vanguardstudio.digital/blog/#blog',
            name: 'VanGuard Studio Digital B2B Teknoloji & Mimari Blogu',
            description:
              'B2B şirketleri, ihracatçılar ve teknoloji liderleri için yapay zeka fizibilitesi, siber güvenlik, veri minimizasyonu ve kurumsal yazılım mimarisi makaleleri.',
            url: 'https://vanguardstudio.digital/blog/',
            publisher: {
              '@type': 'Organization',
              name: 'VanGuard Studio Digital',
              url: 'https://vanguardstudio.digital/tr/',
            },
            blogPost: BLOG_ARTICLES.map((art) => ({
              '@type': 'BlogPosting',
              headline: art.title,
              description: art.metaDescription,
              url: `https://vanguardstudio.digital/blog/${art.slug}/`,
              datePublished: art.isoDate,
              author: {
                '@type': 'Organization',
                name: art.author,
              },
            })),
          }),
        }}
      />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-400 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Ana Sayfa
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          <span className="text-slate-200 font-semibold" aria-current="page">
            B2B Teknoloji Blogu
          </span>
        </nav>

        {/* Hero Section */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 text-blue-300 border border-slate-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
            <span>Mühendislik &amp; Strateji Kütüphanesi</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            B2B Teknoloji, Siber Güvenlik &amp; AI Fizibilitesi
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed text-justify" style={{ textAlign: 'justify' }}>
            <strong className="font-bold text-white">VanGuard Studio Digital</strong> mühendislik ilkeleri doğrultusunda; kurumsal karar vericiler, teknoloji yöneticileri ve ihracatçılar için mütevazı, şeffaf ve bağımsız endüstri standartlarına dayalı teknik analizler.
          </p>
        </header>

        {/* Filter and Search Bar */}
        <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-6 border border-slate-700 shadow-md space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Konu, anahtar kelime veya metrik ara (örn: ROI, Zero-DB, GDPR, Rota)..."
              aria-label="Blog makalelerinde ara"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2" role="tablist" aria-label="Blog Kategori Filtresi">
            {BLOG_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer inline-flex items-center gap-2 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-500'
                      : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.slug}
                className="bg-slate-800/70 rounded-3xl border border-slate-700 hover:border-blue-500/60 transition-all p-6 sm:p-8 flex flex-col justify-between shadow-md hover:shadow-xl group"
              >
                <div className="space-y-4">
                  {/* Category & Read Time Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-slate-200 border border-slate-700 font-bold">
                      {getCategoryIcon(article.categorySlug)}
                      <span>{article.category}</span>
                    </span>
                    <div className="flex items-center gap-3 text-slate-400 font-medium">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{article.readTime}</span>
                      </span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{article.date}</span>
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                      <button
                        type="button"
                        onClick={() => onNavigate(`/blog/${article.slug}/`)}
                        className="text-left cursor-pointer hover:underline"
                        aria-label={`${article.title} makalesini oku`}
                      >
                        {article.title}
                      </button>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed text-justify" style={{ textAlign: 'justify' }}>
                      {article.subtitle}
                    </p>
                  </div>

                  {/* AEO Executive Brief Preview */}
                  <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-700/80 text-xs text-slate-300 leading-relaxed space-y-1.5">
                    <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Yönetici Özeti (AEO Kanıtlı Yanıt)</span>
                    </div>
                    <p className="text-justify font-normal text-slate-200" style={{ textAlign: 'justify' }}>
                      {article.executiveSummary}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-6 mt-6 border-t border-slate-700/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-semibold">
                    Yazar: <strong className="font-bold text-white">VanGuard Studio Digital</strong>
                  </span>

                  <button
                    type="button"
                    onClick={() => onNavigate(`/blog/${article.slug}/`)}
                    aria-label={`"${article.title}" başlıklı teknik makaleyi oku`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer group-hover:translate-x-1"
                  >
                    <span>Makaleyi Oku</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-slate-800/50 rounded-3xl p-12 text-center border border-slate-700 space-y-4">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto" aria-hidden="true" />
            <h3 className="text-lg font-bold text-white">Aramanızla Eşleşen Makale Bulunamadı</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto text-justify" style={{ textAlign: 'justify' }}>
              Belirttiğiniz kriterlere uygun içerik bulunamadı. Lütfen farklı bir anahtar kelime deneyin veya kategori filtresini temizleyin.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-500 transition-colors cursor-pointer"
            >
              Filtreleri Sıfırla
            </button>
          </div>
        )}

        {/* Veri Minimizasyonu ve Sıfır-Veritabanı Güvencesi */}
        <section className="bg-slate-800/40 rounded-3xl p-6 sm:p-8 border border-slate-700/60 text-xs text-slate-300 space-y-3">
          <div className="flex items-center gap-2 text-slate-100 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>Mühendislik &amp; Veri Minimizasyonu Mührü</span>
          </div>
          <p className="text-justify leading-relaxed" style={{ textAlign: 'justify' }}>
            <strong className="font-bold text-white">VanGuard Studio Digital</strong> blog platformu, katı siber güvenlik ve veri minimizasyonu ilkelerimiz gereği tamamen sunucusuz (Stateless) ve sıfır-veritabanı (Zero-DB) mimarisiyle çalışır. Bu sayfalarda kullanıcı çerezleri kaydedilmez, hiçbir yorum veya form verisi saklanmaz. Tüm analizler doğrulanmış akademik, sektörel ve regülasyon kaynaklarına (GDPR, OWASP, W3C, IEEE) dayanmaktadır.
          </p>
        </section>
      </div>
    </div>
  );
};
