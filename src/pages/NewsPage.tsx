import React, { useState } from 'react';
import { 
  Calendar, 
  User, 
  Clock, 
  FileText, 
  Search, 
  Tag, 
  Bell, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { NEWS_ITEMS } from '../data/newsAndAchievementsData';
import { NewsItem } from '../types';

interface NewsPageProps {
  onNavigate: (path: string) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onNavigate }) => {
  const [newsList] = useState<NewsItem[]>(() => {
    try {
      const saved = localStorage.getItem('skansa_admin_news');
      return saved ? JSON.parse(saved) : NEWS_ITEMS;
    } catch {
      return NEWS_ITEMS;
    }
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticleModal, setActiveArticleModal] = useState<NewsItem | null>(null);

  const categories = ['Semua', 'Pengumuman', 'Berita Resmi', 'Prestasi', 'Kegiatan'];

  const filteredNews = newsList.filter(item => {
    const matchesCat = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-white">
      <Breadcrumb 
        items={[{ label: "Informasi & Pengumuman" }]} 
        onNavigate={onNavigate} 
      />

      {/* Hero Banner */}
      <section className="bg-institution-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-institution-900">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-institution-300 bg-institution-900 px-3 py-1 rounded-full border border-institution-800">
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>Pusat Publikasi & Surat Edaran Resmi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Warta, Pengumuman & Agenda
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Arsip rilis berita kegiatan pembelajaran, surat edaran resmi kedinasan, agenda asesmen kejuruan, dan dokumentasi program kemitraan industri SMKN 1 Bawang.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-institution-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berita atau pengumuman..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-institution-500"
            />
          </div>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNews.map((news) => (
            <div
              key={news.id}
              onClick={() => setActiveArticleModal(news)}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-600 hover:bg-slate-50/40 p-6 transition-colors duration-150 cursor-pointer space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className={`font-bold px-2.5 py-0.5 rounded text-[11px] border ${
                    news.isAnnouncement
                      ? 'bg-amber-50 text-amber-900 border-amber-200'
                      : 'bg-institution-50 text-institution-700 border-institution-100'
                  }`}>
                    {news.category}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    {news.date}
                  </span>
                </div>

                {news.circularNumber && (
                  <div className="text-xs font-mono text-slate-500">
                    No. Surat: {news.circularNumber}
                  </div>
                )}

                {news.coverImage && (
                  <div className="h-44 w-full rounded-xl overflow-hidden bg-slate-100 relative -mt-1 mb-2">
                    <img
                      src={news.coverImage}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}

                <h3 className="text-base sm:text-lg font-bold text-institution-950 hover:text-institution-600 transition-colors leading-snug">
                  {news.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {news.excerpt}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {news.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Oleh: {news.author}</span>
                <span className="font-bold text-institution-600 flex items-center">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {activeArticleModal && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveArticleModal(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto border-2 border-slate-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <span className="text-xs font-bold text-institution-700 bg-institution-50 px-2.5 py-1 rounded border border-institution-200">
                {activeArticleModal.category}
              </span>
              <button
                onClick={() => setActiveArticleModal(null)}
                className="text-slate-600 hover:text-slate-950 text-sm font-semibold p-1 rounded-lg focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
                aria-label="Tutup jendela artikel"
              >
                ✕ Tutup
              </button>
            </div>

            <div className="space-y-2">
              {activeArticleModal.circularNumber && (
                <span className="text-xs font-mono text-slate-500 block">
                  Nomor Edaran: {activeArticleModal.circularNumber}
                </span>
              )}
              <h2 className="text-xl sm:text-2xl font-bold text-institution-950 leading-tight">
                {activeArticleModal.title}
              </h2>
              <div className="flex items-center space-x-4 text-xs text-slate-500 pt-1">
                <span>{activeArticleModal.date}</span>
                <span>•</span>
                <span>Penulis: {activeArticleModal.author}</span>
                <span>•</span>
                <span>{activeArticleModal.readTime}</span>
              </div>
            </div>

            {activeArticleModal.coverImage && (
              <div className="h-60 sm:h-72 w-full rounded-2xl overflow-hidden bg-slate-100 relative">
                <img
                  src={activeArticleModal.coverImage}
                  alt={activeArticleModal.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 border-t border-slate-100 pt-4">
              {activeArticleModal.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveArticleModal(null)}
                className="px-5 py-2 rounded-xl bg-institution-900 hover:bg-institution-800 text-white text-xs font-bold transition-colors"
              >
                Tutup Dokumen
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
