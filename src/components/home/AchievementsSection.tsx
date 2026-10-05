import React, { useRef, useEffect } from 'react';
import { Trophy, ArrowRight, Medal } from 'lucide-react';
import { ACHIEVEMENTS } from '../../data/newsAndAchievementsData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AchievementsSectionProps {
  onNavigate: (path: string) => void;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const topAchievements = ACHIEVEMENTS.slice(0, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.from(sectionRef.current.querySelectorAll('.achieve-anim-card'), {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 28,
          opacity: 0,
          duration: 0.7,
          stagger: 0.11,
          ease: 'power2.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200/70 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Trio with generous bottom margin */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 pb-4 border-b border-slate-200/80 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-2 font-sans">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>PRESTASI & KEJUARAAN VOKASI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight font-sans">
              Kiprah Juara Siswa SKANSA
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-1.5 font-sans leading-relaxed">
              Tradisi medali emas Lomba Kompetensi Siswa (LKS) Tingkat Provinsi Jawa Tengah dan Nasional di bidang teknologi rekayasa, seni busana, dan akuntansi bisnis.
            </p>
          </div>

          <button
            onClick={() => onNavigate('#/prestasi')}
            className="text-xs sm:text-sm font-bold text-blue-800 hover:text-blue-950 transition-colors inline-flex items-center shrink-0 bg-white border border-slate-200 hover:border-blue-400 px-4 py-2.5 rounded-xl font-sans cursor-pointer shadow-xs"
          >
            <span>Seluruh Arsip Prestasi</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </button>
        </div>

        {/* 4 Clean, Prestigious Achievement Cards (Spacious gap-8 & p-7) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {topAchievements.map((ach) => (
            <div
              key={ach.id}
              className="achieve-anim-card bg-white hover:border-blue-600 rounded-2xl border border-slate-200/90 p-7 sm:p-8 transition-[border-color,background-color] duration-150 ease-out space-y-5 flex flex-col justify-between group cursor-pointer shadow-xs"
              onClick={() => onNavigate('#/prestasi')}
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md border border-amber-200">
                    {ach.level} • {ach.year}
                  </span>
                  <Medal className="w-5 h-5 text-amber-500" />
                </div>

                <span className="text-xs font-bold text-blue-800 block">
                  {ach.rank}
                </span>

                <h4 className="text-base sm:text-lg font-bold text-slate-950 leading-snug group-hover:text-blue-800 transition-colors font-sans">
                  {ach.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {ach.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs">
                <span className="font-bold text-slate-900 block truncate">{ach.studentName}</span>
                <span className="text-[11px] text-slate-500 block truncate mt-0.5">{ach.major}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
