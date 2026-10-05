import React, { useRef, useEffect } from 'react';
import { Bell, ArrowRight, Calendar } from 'lucide-react';
import { NEWS_ITEMS } from '../../data/newsAndAchievementsData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnnouncementBannerProps {
  onNavigate: (path: string) => void;
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ onNavigate }) => {
  const bannerRef = useRef<HTMLElement>(null);
  const latestAnnouncement = NEWS_ITEMS.find(n => n.isAnnouncement) || NEWS_ITEMS[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bannerRef.current) {
        gsap.from(bannerRef.current, {
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
      }
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={bannerRef} className="py-8 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-amber-100 text-amber-800 rounded-xl shrink-0 mt-0.5 border border-amber-200">
            <Bell className="w-6 h-6" />
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-200/80 text-amber-900 px-2.5 py-0.5 rounded">
                Pengumuman Resmi
              </span>
              {latestAnnouncement.circularNumber && (
                <span className="text-xs font-mono font-medium text-slate-500">
                  No. {latestAnnouncement.circularNumber}
                </span>
              )}
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-xs text-slate-500 flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                {latestAnnouncement.date}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug font-sans">
              {latestAnnouncement.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 line-clamp-1 max-w-3xl leading-relaxed">
              {latestAnnouncement.excerpt}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('#/informasi')}
          className="px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-white text-xs sm:text-sm font-bold transition-colors shrink-0 flex items-center self-end md:self-center cursor-pointer"
        >
          <span>Baca Surat Edaran</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>

      </div>
    </section>
  );
};
