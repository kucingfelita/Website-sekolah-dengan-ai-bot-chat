import React, { useRef, useEffect } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  HelpCircle, 
  Briefcase, 
  CheckCircle, 
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { DIGITAL_SERVICES } from '../../data/servicesData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DigitalServicesGridProps {
  onNavigate: (path: string) => void;
}

export const DigitalServicesGrid: React.FC<DigitalServicesGridProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-institution-700" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-institution-700" />;
      case 'Award': return <Award className="w-5 h-5 text-institution-700" />;
      case 'HelpCircle': return <HelpCircle className="w-5 h-5 text-institution-700" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-institution-700" />;
      case 'CheckCircle': return <CheckCircle className="w-5 h-5 text-institution-700" />;
      default: return <GraduationCap className="w-5 h-5 text-institution-700" />;
    }
  };

  const services = DIGITAL_SERVICES.slice(0, 6);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.from(sectionRef.current.querySelectorAll('.service-anim-tile'), {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 24,
          opacity: 0,
          duration: 0.65,
          stagger: 0.08,
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
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-700 block mb-2 font-sans">
              EKOSISTEM DIGITAL SEKOLAH
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight font-sans">
              Layanan & Portal Digital Terpadu
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Akses cepat satu pintu ke sistem pembelajaran, perpustakaan daring, kelulusan, dan bursa kerja khusus.
            </p>
          </div>

          <button
            onClick={() => onNavigate('#/layanan-digital')}
            className="text-xs sm:text-sm font-bold text-blue-800 hover:text-blue-950 transition-colors inline-flex items-center group shrink-0 cursor-pointer bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-xs"
          >
            <span>Semua Layanan & Panduan</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Spacious Quick-Launch Tiles (Dicoding Style Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((svc) => (
            <a
              key={svc.id}
              href={svc.url}
              target="_blank"
              rel="noreferrer"
              className="service-anim-tile bg-white rounded-2xl border border-slate-200/90 hover:border-blue-600 hover:bg-slate-50/40 p-5 sm:p-6 transition-[border-color,background-color] duration-150 ease-out group flex items-center justify-between gap-4 cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* Generous Icon Box */}
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  {getIcon(svc.iconName)}
                </div>

                {/* Service Name & Status */}
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-800 transition-colors truncate font-sans">
                    {svc.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                    <span className="truncate">{svc.category}</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-semibold text-emerald-700 shrink-0">{svc.statusText}</span>
                  </div>
                </div>
              </div>

              {/* Direct Launch Arrow */}
              <div className="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-blue-100 flex items-center justify-center shrink-0 text-slate-400 group-hover:text-blue-800 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
