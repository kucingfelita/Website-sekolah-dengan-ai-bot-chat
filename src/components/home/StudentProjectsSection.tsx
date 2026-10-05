import React, { useRef, useEffect } from 'react';
import { ArrowRight, Lightbulb, CheckCircle2 } from 'lucide-react';
import { STUDENT_WORKS } from '../../data/newsAndAchievementsData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StudentProjectsSectionProps {
  onNavigate: (path: string) => void;
}

export const StudentProjectsSection: React.FC<StudentProjectsSectionProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Curate 3 iconic student innovations representing distinct vocational disciplines
  const spotlightWorks = [
    STUDENT_WORKS[0], // SIM-Perpus (PPLG - Software)
    STUDENT_WORKS[1], // Pesona Dieng (Busana - Fashion Atelier)
    STUDENT_WORKS[2], // Smart Greenhouse (Elektronika - IoT & Automation)
  ].filter(Boolean);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.from(sectionRef.current.querySelectorAll('.project-anim-card'), {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 28,
          opacity: 0,
          duration: 0.75,
          stagger: 0.12,
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
            <div className="flex items-center space-x-2 text-blue-700 font-bold text-xs uppercase tracking-wider mb-2 font-sans">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>KARYA INOVASI & PRODUK SISWA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight font-sans">
              Karya Cipta Siswa SKANSA
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Produk perangkat lunak terapan, busana panggung catwalk, dan otomasi pertanian cerdas buatan siswa.
            </p>
          </div>

          <button
            onClick={() => onNavigate('#/karya-siswa')}
            className="text-xs sm:text-sm font-bold text-blue-800 hover:text-blue-950 transition-colors inline-flex items-center group shrink-0 cursor-pointer bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl"
          >
            <span>Lihat Seluruh Pameran</span>
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3 Streamlined Innovation Cards (Spacious gap-8 & p-7) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {spotlightWorks.map((work) => (
            <div
              key={work.id}
              onClick={() => onNavigate('#/karya-siswa')}
              className="project-anim-card bg-white rounded-2xl border border-slate-200/90 hover:border-blue-600 hover:bg-slate-50/40 p-7 sm:p-8 transition-[border-color,background-color] duration-150 ease-out cursor-pointer group flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-800 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded text-[11px]">
                    {work.majorCode} • {work.category}
                  </span>
                  <span className="font-mono text-slate-400 text-[11px]">
                    Tahun {work.year}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-950 group-hover:text-blue-800 transition-colors leading-snug font-sans">
                  {work.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {work.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="inline-flex items-center text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-100/80 px-2.5 py-0.5 rounded truncate max-w-[210px]">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600 shrink-0" />
                  <span className="truncate">{work.impactOrStatus}</span>
                </span>
                <span className="font-bold text-blue-800 group-hover:text-blue-950 flex items-center shrink-0 ml-2">
                  <span>Detail</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
