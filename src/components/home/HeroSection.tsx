import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, Pause, Play } from 'lucide-react';
import { VOCATIONAL_PHOTOS } from '../../data/imagery';
import { gsap } from 'gsap';

interface HeroSectionProps {
  onNavigate: (path: string) => void;
  onOpenAI: () => void;
}

const HERO_SLIDES = [
  {
    id: 'campus',
    image: VOCATIONAL_PHOTOS.campus.hero,
    tag: 'KAMPUS UTAMA',
    title: 'Gedung Utama & Lingkungan Belajar SKANSA',
    desc: 'Kampus 3.2 hektar dengan 8 bengkel kejuruan mandiri berakreditasi A BAN-SM.'
  },
  {
    id: 'pplg',
    image: VOCATIONAL_PHOTOS.majors.pplg,
    tag: 'REKAYASA PERANGKAT LUNAK',
    title: 'Studio Komputasi & Coding Software',
    desc: '320 workstation berkecepatan tinggi, kurikulum React, Flutter & inkubasi industri digital.'
  },
  {
    id: 'elektronika',
    image: VOCATIONAL_PHOTOS.majors.elektronika,
    tag: 'TEKNIK ELEKTRONIKA',
    title: 'Bengkel Mekatronika, PLC & Robotika Industri',
    desc: 'Praktik sistem otomasi pabrik, kontrol pneumatik, dan teknologi sensor modern.'
  },
  {
    id: 'busana',
    image: VOCATIONAL_PHOTOS.majors.busana,
    tag: 'DESAIN & PRODUKSI BUSANA',
    title: 'Atelier Mode, Tekstil & Panggung Catwalk',
    desc: 'Unit produksi garmen mandiri yang memproduksi busana etnik dan tampil di panggung nasional.'
  },
  {
    id: 'tjkt',
    image: VOCATIONAL_PHOTOS.majors.tjkt,
    tag: 'JARINGAN TELEKOMUNIKASI',
    title: 'Laboratorium Fiber Optic & Server Mikrotik',
    desc: 'Pelatihan sertifikasi internasional MTCNA dan konfigurasi jaringan internet kabel serat optik.'
  },
  {
    id: 'perikanan',
    image: VOCATIONAL_PHOTOS.majors.perikanan,
    tag: 'PERIKANAN AIR TAWAR',
    title: 'Instalasi Kolam Bioflok & Pembenihan Modern',
    desc: 'Budidaya perikanan presisi ramah lingkungan dengan kemitraan pasar regional.'
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const heroContainerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);

  // Auto-Cycling Photographic Engine (Interval 4.5s)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Smooth Direct GSAP Staggered Entrance Animations on Mount
  useEffect(() => {
    if (!heroContainerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.65, delay: 0.05 }
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.35'
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.45'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65 },
        '-=0.35'
      )
      .fromTo(
        pointsRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.55 },
        '-=0.25'
      )
      .fromTo(
        telemetryRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.3'
      );

      // Staggered entrance for the 4 core metric boxes inside the bottom telemetry bar
      const metricBoxes = heroContainerRef.current?.querySelectorAll('.metric-box-anim');
      if (metricBoxes && metricBoxes.length > 0) {
        tl.fromTo(
          metricBoxes,
          { opacity: 0, y: 18, scale: 0.96 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.55, 
            stagger: 0.09, 
            ease: 'back.out(1.4)' 
          },
          '-=0.4'
        );
      }
    }, heroContainerRef);

    return () => ctx.revert();
  }, []);

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section ref={heroContainerRef} className="relative min-h-[660px] lg:min-h-[740px] flex flex-col justify-between text-white overflow-hidden select-none border-b border-slate-200">
      
      {/* 1. Full-Bleed Background Images (100% full screen backdrop, not a small box!) */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover filter brightness-90 contrast-105 scale-100 transition-transform duration-10000 ease-out"
            />
          </div>
        ))}

        {/* High-Contrast Directional Overlay (Balanced Rich Royal Sapphire Blue - Not Pitch Black) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#172554]/95 via-[#1E3A8A]/85 to-[#1D4ED8]/30 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-[#1E3A8A]/50" />
      </div>

      {/* 2. Main Hero Content (Spacious, Clear, Not Cramped) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-16 sm:pb-20 w-full my-auto">
        
        <div className="max-w-3xl lg:max-w-4xl space-y-7 sm:space-y-8">
          
          {/* Prominent Accreditation Badge */}
          <div ref={badgeRef} className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold border border-amber-300">
            <span>★</span>
            <span className="tracking-wide">SMK PUSAT KEUNGGULAN • TERAKREDITASI A BAN-SM</span>
          </div>

          {/* Big Bold Headline with generous line-height */}
          <h1 ref={titleRef} className="text-4xl sm:text-6xl lg:text-[4.25rem] font-extrabold text-white tracking-tight leading-[1.15]">
            Mencetak Generasi Vokasi Siap Kerja & Berkarakter.
          </h1>

          {/* Short, Punchy Description with comfortable leading */}
          <p ref={descRef} className="text-lg sm:text-2xl text-slate-200 font-normal leading-relaxed max-w-3xl">
            8 Program Keahlian unggulan di Banjarnegara. Jaminan resmi <span className="text-amber-300 font-bold underline decoration-amber-400 decoration-2">Bebas Biaya SPP Bulanan (Gratis Rp 0)</span> didanai penuh oleh Pemerintah Provinsi Jawa Tengah.
          </p>

          {/* Big Prominent Action Buttons */}
          <div ref={ctaRef} className="pt-3 flex flex-wrap items-center gap-4 sm:gap-5">
            <button
              onClick={() => onNavigate('#/program-keahlian')}
              className="px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-base sm:text-lg border border-amber-400 transition-colors active:scale-95 flex items-center group cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            >
              <span>Lihat 8 Jurusan Keahlian</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onNavigate('#/spmb')}
              className="px-8 py-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-base sm:text-lg border border-white/30 backdrop-blur-md transition-colors active:scale-95 flex items-center group cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            >
              <span>Informasi SPMB 2026/2027</span>
              <span className="ml-2.5 text-xs font-bold text-amber-300 bg-slate-950/80 px-2.5 py-1 rounded-full border border-amber-400/40">
                Bebas SPP
              </span>
            </button>
          </div>

          {/* 3 Reassuring Points (Big & Clear with comfortable margins) */}
          <div ref={pointsRef} className="pt-4 flex flex-wrap items-center gap-y-3.5 gap-x-8 text-sm sm:text-base text-slate-200 font-semibold">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>SPP Bulanan Rp 0 (Gratis)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Sertifikasi Profesi BNSP Resmi</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>160+ Mitra Industri Kerja Sama</span>
            </div>
          </div>

        </div>

      </div>

      {/* 3. Bottom Bar: Floating Slide Telemetry + Quick Metrics Ribbon */}
      <div ref={telemetryRef} className="relative z-10 border-t border-white/15 bg-slate-950/85 backdrop-blur-md py-5 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: 4 Big Core Metrics (Staggered Entrance Kotak-Kotak) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 divide-x divide-white/10 w-full md:w-auto text-left">
            <div className="pr-4 metric-box-anim">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-sans block">8</span>
              <span className="text-xs sm:text-sm font-bold text-white block">Program Keahlian</span>
              <span className="text-[11px] text-slate-400 block">Akreditasi A BAN-SM</span>
            </div>
            <div className="pl-4 pr-4 metric-box-anim">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-sans block">2.100+</span>
              <span className="text-xs sm:text-sm font-bold text-white block">Siswa Aktif</span>
              <span className="text-[11px] text-slate-400 block">Dididik 140+ Guru</span>
            </div>
            <div className="pl-4 pr-4 metric-box-anim">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-sans block">160+</span>
              <span className="text-xs sm:text-sm font-bold text-white block">Mitra Industri</span>
              <span className="text-[11px] text-slate-400 block">Penyaluran Kerja</span>
            </div>
            <div className="pl-4 metric-box-anim">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-sans block">89.4%</span>
              <span className="text-xs sm:text-sm font-bold text-white block">Keterserapan</span>
              <span className="text-[11px] text-slate-400 block">Kerja & Wirausaha</span>
            </div>
          </div>

          {/* Right: Active Slide Indicator & Controls */}
          <div className="flex items-center space-x-3 bg-white/10 px-4 py-2 rounded-xl border border-white/15 text-xs text-slate-200 shrink-0">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                {activeSlide.tag}
              </span>
              <span className="text-xs font-semibold text-white block">
                {activeSlide.title}
              </span>
            </div>

            {/* Slide Dots */}
            <div className="flex items-center space-x-1.5 pl-2">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setCurrentSlide(idx);
                    setIsPlaying(false);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide
                      ? 'bg-amber-400 w-5'
                      : 'bg-white/40 hover:bg-white/70 w-2'
                  }`}
                  title={slide.title}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 rounded-full text-slate-300 hover:text-white"
              title={isPlaying ? "Jeda slideshow" : "Putar slideshow"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};

