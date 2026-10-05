import React, { useRef, useEffect } from 'react';
import { ArrowRight, Calculator, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { SCHOOL_INFO } from '../../data/schoolData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SPMBBannerProps {
  onNavigate: (path: string) => void;
  onOpenCalculator?: () => void;
}

export const SPMBBanner: React.FC<SPMBBannerProps> = ({ onNavigate, onOpenCalculator }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-white border-b border-slate-200/70 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={cardRef} className="bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-950 rounded-3xl p-10 sm:p-14 lg:p-16 text-white border border-blue-700/60 relative overflow-hidden shadow-sm">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            {/* Left Column: Heading & Key Info */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/40">
                  PENERIMAAN PESERTA DIDIK BARU 2026/2027
                </span>
                <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40">
                  BEBAS BIAYA SPP (RP 0)
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-sans">
                Penerimaan Murid Baru SMKN 1 Bawang: Transparan & Bebas Pungutan
              </h2>

              <p className="text-sm sm:text-base text-blue-100 max-w-2xl leading-relaxed">
                Tersedia <strong>720 kuota kursi</strong> untuk 8 Program Keahlian. Sesuai regulasi Pemerintah Provinsi Jawa Tengah, seluruh biaya operasional pendidikan didanai penuh oleh APBD, bebas biaya SPP bulanan maupun uang gedung.
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => onNavigate('#/spmb')}
                  className="px-7 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm sm:text-base transition-colors border border-amber-400 flex items-center group cursor-pointer"
                >
                  <span>Panduan Syarat & Jadwal SPMB</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </button>

                {onOpenCalculator && (
                  <button
                    onClick={onOpenCalculator}
                    className="px-6 py-4 rounded-xl bg-blue-800 hover:bg-blue-700 text-white font-bold text-sm transition-colors flex items-center space-x-2 border border-blue-600/50 cursor-pointer"
                  >
                    <Calculator className="w-4 h-4 text-amber-300" />
                    <span>Kalkulator Peluang Lolos</span>
                  </button>
                )}

                <a
                  href={`tel:${SCHOOL_INFO.contact.phone.replace(/[^0-9]/g, '')}`}
                  className="px-5 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-colors flex items-center border border-white/20 cursor-pointer"
                >
                  <Phone className="w-4 h-4 mr-2 text-blue-300" />
                  <span>Posko: {SCHOOL_INFO.contact.phone}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Posko Bantuan Card */}
            <div className="lg:col-span-4 bg-[#0F172A]/90 rounded-2xl p-7 sm:p-8 border border-slate-700/80 space-y-4 backdrop-blur-sm shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300 block">
                POSKO PELAYANAN SPMB
              </span>
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-md">
                Layanan Aktif
              </span>
            </div>
            
            <div className="text-xs text-slate-300 space-y-2.5">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Gedung Kampus SMKN 1 Bawang, Jl. Raya Pucang No. 132</span>
              </p>
              <p className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pemeriksaan Buta Warna Bebas Biaya</span>
              </p>
              <p className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pendampingan Pembuatan Akun PPDB Online</span>
              </p>
            </div>
            
            <div className="pt-2.5 border-t border-slate-800 text-xs text-slate-400">
              Pelayanan Posko: Senin - Jumat, 08.00 - 15.00 WIB
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};
