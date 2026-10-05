import React, { useRef, useEffect } from 'react';
import { Calendar, ArrowRight, BellRing } from 'lucide-react';
import { NEWS_ITEMS } from '../../data/newsAndAchievementsData';
import { VOCATIONAL_PHOTOS } from '../../data/imagery';
import { ProgressiveImage } from '../common/ProgressiveImage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface NewsEditorialSectionProps {
  onNavigate: (path: string) => void;
}

export const NewsEditorialSection: React.FC<NewsEditorialSectionProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leadArticle = NEWS_ITEMS[0];
  const sideArticles = NEWS_ITEMS.slice(1, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.from(sectionRef.current.querySelectorAll('.news-anim-item'), {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 28,
          opacity: 0,
          duration: 0.75,
          stagger: 0.14,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-white border-b border-slate-200/70 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Trio with generous bottom margin */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 pb-4 border-b border-slate-200/80 gap-4">
          <div>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-700 block mb-2 font-sans">
              WARTA & PENGUMUMAN RESMI
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight font-sans">
              Kabar Terkini SMKN 1 Bawang
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Informasi kegiatan sekolah, pengumuman kedinasan, dan rilis prestasi siswa.
            </p>
          </div>

          <button
            onClick={() => onNavigate('#/informasi')}
            className="text-xs sm:text-sm font-bold text-blue-800 hover:text-blue-950 transition-colors inline-flex items-center group shrink-0 cursor-pointer bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl"
          >
            <span>Semua Berita & Pengumuman</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Asymmetrical Editorial Grid (Spacious gap-8 to gap-10) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left: Lead Featured Article (7 cols) */}
          {leadArticle && (
            <div 
              onClick={() => onNavigate('#/informasi')}
              className="news-anim-item lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 hover:border-blue-600 overflow-hidden transition-[border-color,background-color] duration-150 ease-out cursor-pointer group flex flex-col justify-between shadow-xs"
            >
              <div>
                {/* Media Thumbnail with Skeleton Loader */}
                <div className="h-60 sm:h-72 w-full overflow-hidden bg-slate-100 relative">
                  <ProgressiveImage 
                    src={leadArticle.coverImage || VOCATIONAL_PHOTOS.campus.hero} 
                    alt={leadArticle.title}
                    className="w-full h-full"
                    imgClassName="transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white text-xs">
                    <span className="inline-flex items-center gap-1.5 bg-blue-800 font-bold px-3 py-1 rounded-md text-xs">
                      <BellRing className="w-3.5 h-3.5 text-amber-300" />
                      {leadArticle.category}
                    </span>
                    <span className="text-xs font-medium opacity-90">
                      {leadArticle.date}
                    </span>
                  </div>
                </div>

                {/* Text Body */}
                <div className="p-7 sm:p-8 space-y-3">
                  <h3 className="text-lg sm:text-2xl font-bold text-slate-950 group-hover:text-blue-800 transition-colors leading-snug font-sans">
                    {leadArticle.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 line-clamp-3 leading-relaxed">
                    {leadArticle.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-7 sm:px-8 pb-7 pt-0">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm font-bold text-blue-800 group-hover:text-blue-950">
                  <span>Baca Pengumuman Lengkap</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          )}

          {/* Right: 2 Compact Side Bulletins (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {sideArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => onNavigate('#/informasi')}
                className="news-anim-item flex-1 bg-white rounded-2xl border border-slate-200/90 hover:border-blue-600 hover:bg-slate-50/40 p-6 sm:p-7 transition-[border-color,background-color] duration-150 ease-out cursor-pointer group flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded ${
                      article.category === 'Prestasi' 
                        ? 'bg-amber-100 text-amber-900 border border-amber-200/80' 
                        : 'bg-blue-50 text-blue-800 border border-blue-100'
                    }`}>
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-slate-950 group-hover:text-blue-800 transition-colors leading-snug font-sans">
                    {article.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-800 group-hover:text-blue-950">
                  <span>Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
