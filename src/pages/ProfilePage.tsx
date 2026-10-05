import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  History, 
  Target, 
  Wrench, 
  Award, 
  Users, 
  CheckCircle2, 
  GraduationCap, 
  Compass, 
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  BookOpen,
  Calendar,
  Layers,
  MapPin,
  Check
} from 'lucide-react';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { ProgressiveImage } from '../components/common/ProgressiveImage';
import { GovernanceTreeChart } from '../components/profile/GovernanceTreeChart';
import { SCHOOL_INFO } from '../data/schoolData';
import { VOCATIONAL_PHOTOS } from '../data/imagery';
import { scrollToElement } from '../utils/smoothScroll';

interface ProfilePageProps {
  onNavigate: (path: string) => void;
}

const PROFILE_SUBNAV = [
  { id: 'sambutan', label: 'Prakata Pimpinan' },
  { id: 'sejarah', label: 'Sejarah & 60 Tahun' },
  { id: 'visi-misi', label: 'Visi, Misi & Sasaran' },
  { id: 'fasilitas', label: 'Sarana & Fasilitas' },
  { id: 'ekstrakurikuler', label: 'Ekstrakurikuler' },
  { id: 'prestasi', label: 'Prestasi' },
  { id: 'guru', label: 'Guru & Pendidik' },
  { id: 'struktur-organisasi', label: 'Tata Kelola' }
];

type EkskulFilter = 'all' | 'kepemimpinan' | 'olahraga' | 'seni' | 'kreatif' | 'keagamaan';

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const [activeSubNav, setActiveSubNav] = useState<string>('sambutan');
  const [ekskulFilter, setEkskulFilter] = useState<EkskulFilter>('all');

  // Handle hash navigation on mount or change
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      const parts = hash.split('#');
      const subHash = parts[2]; // e.g. #/profil#fasilitas
      if (subHash) {
        setActiveSubNav(subHash);
        setTimeout(() => {
          scrollToElement(`#${subHash}`, { offset: -95 });
        }, 100);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSubNav(id);
    window.history.replaceState(null, '', `#/profil#${id}`);
    scrollToElement(`#${id}`, { offset: -95 });
  };

  // Filtered extracurriculars
  const filteredExtracurriculars = useMemo(() => {
    if (ekskulFilter === 'all') return SCHOOL_INFO.extracurriculars;
    if (ekskulFilter === 'kepemimpinan') {
      return SCHOOL_INFO.extracurriculars.filter(e => 
        ['paskibra', 'pramuka', 'pmr'].includes(e.id)
      );
    }
    if (ekskulFilter === 'olahraga') {
      return SCHOOL_INFO.extracurriculars.filter(e => 
        ['futsal', 'silat'].includes(e.id)
      );
    }
    if (ekskulFilter === 'seni') {
      return SCHOOL_INFO.extracurriculars.filter(e => 
        ['karawitan', 'teater'].includes(e.id)
      );
    }
    if (ekskulFilter === 'kreatif') {
      return SCHOOL_INFO.extracurriculars.filter(e => 
        ['english', 'multimedia'].includes(e.id)
      );
    }
    if (ekskulFilter === 'keagamaan') {
      return SCHOOL_INFO.extracurriculars.filter(e => 
        ['rohis'].includes(e.id)
      );
    }
    return SCHOOL_INFO.extracurriculars;
  }, [ekskulFilter]);

  return (
    <div className="bg-[#F8FAFD] min-h-screen text-slate-900">
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[{ label: "Profil Sekolah" }]} 
        onNavigate={onNavigate} 
      />

      {/* Page Hero Banner: Institutional Authority with Real Campus Backdrop */}
      <section className="relative bg-institution-950 text-white py-16 sm:py-24 border-b border-institution-800 overflow-hidden">
        {/* Authentic Campus Backdrop with Deep Navy Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={VOCATIONAL_PHOTOS.campus.hero} 
            alt="Kampus SMK Negeri 1 Bawang" 
            className="w-full h-full object-cover object-center opacity-25 filter saturate-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-institution-950 via-institution-950/90 to-institution-900/80" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {/* Institutional Credentials Pill */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-slate-300">
            <span className="inline-flex items-center gap-1.5 bg-institution-850/90 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>BERDIRI SEJAK 1964</span>
            </span>
            <span className="text-slate-400">•</span>
            <span className="bg-slate-800/80 px-2.5 py-0.5 rounded text-slate-200">
              Akreditasi A (Unggul) BAN-SM
            </span>
            <span className="text-slate-400">•</span>
            <span className="bg-blue-900/60 text-blue-200 border border-blue-400/30 px-2.5 py-0.5 rounded">
              SMK Pusat Keunggulan
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans">
            SMK Negeri 1 Bawang
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl font-normal">
            Pusat keunggulan pendidikan vokasi negeri di Kabupaten Banjarnegara dengan tradisi pengabdian lebih dari 60 tahun. Mengembangkan 8 Program Keahlian, unit Teaching Factory mandiri, dan kemitraan 160+ industri skala nasional di atas kampus seluas 3,2 hektar.
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300 border-t border-slate-700/60">
            <div>
              <span className="text-slate-400 block">NPSN Resmi</span>
              <strong className="text-white font-mono text-sm">{SCHOOL_INFO.npsn}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Status Kelembagaan</span>
              <strong className="text-white text-sm">Negeri (Pusat Keunggulan)</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Lokasi Kampus</span>
              <strong className="text-white text-sm">Bawang, Banjarnegara, Jawa Tengah</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Editorial Sub-Navigation Bar */}
      <nav aria-label="Sub-navigasi Profil" className="sticky top-[69px] z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          {PROFILE_SUBNAV.map((nav) => (
            <button
              key={nav.id}
              onClick={() => scrollToSection(nav.id)}
              className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
                activeSubNav === nav.id
                  ? 'bg-institution-900 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {nav.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Body */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20">

        {/* 0. Sambutan Plt. Kepala Sekolah (Editorial Two-Column Spread) */}
        <section id="sambutan" className="scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Dignified Leader Profile */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-subtle space-y-4">
              <div className="w-20 h-20 rounded-2xl bg-institution-900 text-amber-300 font-serif font-bold text-2xl flex items-center justify-center border border-institution-700 shadow-inner">
                SK
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 font-sans block mb-1">
                  Pimpinan Institusi
                </span>
                <h3 className="text-lg font-bold text-slate-950 font-sans leading-snug">
                  {SCHOOL_INFO.principal.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {SCHOOL_INFO.principal.title}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600 font-sans">
                <div className="flex justify-between">
                  <span className="text-slate-500">NIP:</span>
                  <span className="font-mono text-slate-800 font-medium">{SCHOOL_INFO.principal.nip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Masa Bakti:</span>
                  <span className="text-slate-800 font-medium">2026 – Sekarang</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kualifikasi:</span>
                  <span className="text-slate-800 font-medium">Magister Manajemen (M.M.)</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md w-full justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Kepala Sekolah Penyelenggara TeFa
                </span>
              </div>
            </div>

            {/* Right Column: Editorial Letter & Quote */}
            <div className="lg:col-span-8 space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800 block mb-1 font-sans">
                  PRAKATA PIMPINAN
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-sans">
                  Menyiapkan Insan Vokasi yang Tangguh, Adaptif, dan Berintegritas
                </h2>
              </div>

              {/* Editorial Quote in Newsreader Serif */}
              <blockquote className="my-4 font-serif italic text-lg sm:text-xl text-slate-900 border-l-4 border-amber-500 pl-5 py-2 leading-relaxed bg-amber-50/40 rounded-r-xl">
                "{SCHOOL_INFO.principal.quote}"
              </blockquote>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
                <p>
                  <strong>Assalamu’alaikum Warahmatullahi Wabarakatuh, Salam Sejahtera untuk kita semua.</strong>
                </p>
                <p>
                  Selamat datang di portal informasi resmi SMK Negeri 1 Bawang, Banjarnegara. Sejak bertransformasi dari SMEA Negeri Banjarnegara pada tahun 1964 hingga menyandang status sebagai SMK Pusat Keunggulan saat ini, institusi kami senantiasa adaptif dan berakar kuat pada kebutuhan dunia industri serta kemajuan teknologi.
                </p>
                <p>
                  Dengan 8 Program Keahlian, kurikulum kelas industri bersama mitra DUDIKA nasional, serta unit produksi Teaching Factory modern, kami memastikan setiap peserta didik siap berkarir profesional, berwirausaha mandiri, maupun melanjutkan studi ke jenjang perguruan tinggi dengan bekal kompetensi dan integritas moral yang kokoh.
                </p>
                <p className="font-semibold text-slate-950 pt-2 border-t border-slate-200">
                  Wassalamu’alaikum Warahmatullahi Wabarakatuh.<br />
                  <span className="text-xs sm:text-sm text-slate-500 font-normal">
                    {SCHOOL_INFO.principal.name}, {SCHOOL_INFO.principal.title}
                  </span>
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 1. SEJARAH & 60 TAHUN PENGABDIAN */}
        <section id="sejarah" className="scroll-mt-28 pt-8 border-t border-slate-200/90 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 block font-sans">
              REKAM JEJAK 60 TAHUN (1964 – SEKARANG)
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight font-sans">
              Sejarah Pendirian & Transformasi Vokasi SKANSA
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {SCHOOL_INFO.historySummary}
            </p>
          </div>

          {/* 3 Key Eras (Chronological Horizontal Rail, Not Heavy Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="relative pl-6 border-l-2 border-amber-500 space-y-2">
              <span className="text-xs font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded font-sans">
                1 Agustus 1964
              </span>
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Pendirian SMEA Negeri Banjarnegara
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dirintis oleh Pamoedji, B.A. untuk memenuhi kebutuhan mendesak tenaga tata usaha dan tata niaga di Karesidenan Banyumas dengan 3 jurusan awal: Tata Niaga, Tata Buku, dan Tata Usaha.
              </p>
            </div>

            <div className="relative pl-6 border-l-2 border-blue-600 space-y-2">
              <span className="text-xs font-bold text-blue-800 bg-blue-100/80 px-2 py-0.5 rounded font-sans">
                1 Maret 1997
              </span>
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Alih Nomenklatur & Relokasi Kampus 3,2 Ha
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Penataan sistem kejuruan nasional menetapkan alih nama menjadi SMK Negeri 1 Bawang dan kepindahan ke kampus terpadu Jl. Raya Pucang No. 132 seluas 3,2 hektar serta pembukaan jurusan teknik.
              </p>
            </div>

            <div className="relative pl-6 border-l-2 border-emerald-600 space-y-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded font-sans">
                2021 – 2026
              </span>
              <h3 className="text-base font-bold text-slate-900 font-sans">
                SMK Pusat Keunggulan (Center of Excellence)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ditetapkan Kemendikbudristek sebagai SMK Pusat Keunggulan dengan penguatan Teaching Factory mandiri, 8 bengkel standar industri, dan 160+ mitra DUDIKA nasional.
              </p>
            </div>
          </div>

          {/* Riwayat Kepemimpinan Kepala Sekolah: Clean Archival Table */}
          <div className="pt-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-950 font-sans">
                  Riwayat Kepemimpinan Kepala Sekolah (1964 – Sekarang)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Catatan estafet 11 periode kepemimpinan yang membangun fondasi dan keunggulan institusi.
                </p>
              </div>
              <span className="text-xs font-mono text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 shrink-0 self-start sm:self-auto">
                11 Periode Kepemimpinan
              </span>
            </div>

            {/* Accessible Tabular Layout */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-subtle">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50/90 text-slate-700 border-b border-slate-200 text-xs font-bold font-sans">
                    <th scope="col" className="py-3 px-4 w-12 text-center">No</th>
                    <th scope="col" className="py-3 px-4 w-36">Periode</th>
                    <th scope="col" className="py-3 px-4">Nama Kepala Sekolah</th>
                    <th scope="col" className="py-3 px-4">Catatan Dedikasi & Tonggak Sejarah</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {SCHOOL_INFO.principalsHistory.map((item) => {
                    const isCurrent = item.number === 11;
                    return (
                      <tr 
                        key={item.number} 
                        className={`transition-colors ${
                          isCurrent 
                            ? 'bg-amber-50/60 font-medium' 
                            : 'hover:bg-slate-50/70'
                        }`}
                      >
                        <td className="py-3 px-4 text-center font-mono text-xs text-slate-500">
                          {item.number}
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-slate-700 whitespace-nowrap">
                          {item.period}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-900">
                          <div className="flex items-center gap-2">
                            <span>{item.name}</span>
                            {isCurrent && (
                              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full shrink-0">
                                Aktif
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-600 text-xs sm:text-sm">
                          {item.notes}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 2. VISI, MISI DAN 7 TUJUAN STRATEGIS */}
        <section id="visi-misi" className="scroll-mt-28 pt-8 border-t border-slate-200/90 space-y-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 block mb-1 font-sans">
              HALUAN & KOMITMEN MUTU
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight font-sans">
              Visi, Misi & 7 Sasaran Mutu SKANSA 2024–2030
            </h2>
          </div>

          {/* Visi Panel: High-Craftsmanship Manifesto */}
          <div className="bg-white rounded-2xl border border-institution-200/80 p-6 sm:p-10 shadow-subtle space-y-3">
            <span className="text-xs font-bold text-institution-800 uppercase tracking-wider font-sans block">
              VISI RESMI INSTITUSI (TAHUN 2024 – 2030)
            </span>
            <p className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-institution-950 leading-relaxed font-bold">
              "{SCHOOL_INFO.vision}"
            </p>
          </div>

          {/* 5 Misi Strategis (Typographic List, No Box Slop) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 font-sans border-b border-slate-200 pb-2">
              5 Misi Strategis Institusi
            </h3>

            <div className="space-y-3">
              {SCHOOL_INFO.missions.map((misi, idx) => (
                <div key={idx} className="flex items-start gap-4 py-2 border-b border-slate-100 last:border-none">
                  <span className="font-serif font-bold text-xl sm:text-2xl text-institution-900 shrink-0 w-8">
                    0{idx + 1}
                  </span>
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed pt-0.5">
                    {misi}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 7 Tujuan Institusi dalam 3 Pilar Vokasi */}
          <div className="space-y-4 pt-2">
            <div className="border-b border-slate-200 pb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 font-sans">
                7 Sasaran Mutu & Tujuan Kelembagaan
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Sasaran kinerja terukur yang memandu seluruh program pembelajaran dan tata kelola unit kejuruan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Pilar 1 */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-3 shadow-subtle">
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wider font-sans block">
                  PILAR I // MUTU & TEFA
                </span>
                <h4 className="text-base font-bold text-slate-900 font-sans">
                  Pembelajaran Berbasis Industri
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{SCHOOL_INFO.objectives[0]}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{SCHOOL_INFO.objectives[1]}</span>
                  </li>
                </ul>
              </div>

              {/* Pilar 2 */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-3 shadow-subtle">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider font-sans block">
                  PILAR II // KELULUSAN & KARIR
                </span>
                <h4 className="text-base font-bold text-slate-900 font-sans">
                  Sertifikasi & Keterserapan DUDIKA
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{SCHOOL_INFO.objectives[2]}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{SCHOOL_INFO.objectives[3]}</span>
                  </li>
                </ul>
              </div>

              {/* Pilar 3 */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-3 shadow-subtle">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-sans block">
                  PILAR III // TATA KELOLA & EKOSISTEM
                </span>
                <h4 className="text-base font-bold text-slate-900 font-sans">
                  Smart Campus & Adiwiyata
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{SCHOOL_INFO.objectives[4]}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{SCHOOL_INFO.objectives[5]}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{SCHOOL_INFO.objectives[6]}</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* 3. FASILITAS & SARANA PRAKTIK BERSTANDAR INDUSTRI */}
        <section id="fasilitas" className="scroll-mt-28 pt-8 border-t border-slate-200/90 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 block font-sans">
              INFRASTRUKTUR PEMBELAJARAN
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight font-sans">
              Laboratorium, Studio & Bengkel Kejuruan
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              Sarana pembelajaran dirancang menyerupai pabrik dan studio komersial guna mendukung Teaching Factory terintegrasi.
            </p>
          </div>

          {/* Photographic Editorial Showcase: Real Photos of Key Campus Facilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Feature 1: Graha Wiyata Hall / Indoor Auditorium */}
            <div className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-subtle hover:border-blue-500 transition-colors">
              <div className="h-56 sm:h-64 w-full bg-slate-100 overflow-hidden relative">
                <ProgressiveImage 
                  src={VOCATIONAL_PHOTOS.facilities.auditorium}
                  alt="Graha Wiyata Hall & Auditorium Terpadu SMKN 1 Bawang"
                  className="w-full h-full"
                  imgClassName="transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute bottom-3 left-3 bg-institution-950/80 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-md">
                  Kapasitas 1.500 Orang
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-bold text-slate-950 font-sans">
                  Graha Wiyata & Auditorium Terpadu (GOR)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Gedung serbaguna berstandar nasional untuk wisuda, pameran inovasi kejuruan, dan gelanggang olahraga (futsal, bulutangkis, bola voli) berfasilitas sound system line-array modern.
                </p>
              </div>
            </div>

            {/* Feature 2: Teaching Factory & Lab Komputer */}
            <div className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-subtle hover:border-blue-500 transition-colors">
              <div className="h-56 sm:h-64 w-full bg-slate-100 overflow-hidden relative">
                <ProgressiveImage 
                  src={VOCATIONAL_PHOTOS.facilities.tefa}
                  alt="Laboratorium dan Bengkel Praktik Industri SMKN 1 Bawang"
                  className="w-full h-full"
                  imgClassName="transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute bottom-3 left-3 bg-institution-950/80 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-md">
                  8 Lab (320 PC Workstation)
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-bold text-slate-950 font-sans">
                  Laboratorium Komputasi & Teaching Factory
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Ruang praktik rekayasa perangkat lunak, jaringan fiber optik CISCO, dan studio multimedia berspesifikasi workstation Intel i7/Ryzen 7 GPU RTX 4060 dengan koneksi gigabit fiber backbone.
                </p>
              </div>
            </div>

          </div>

          {/* Categorized Technical Facilities Directory */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 font-sans border-b border-slate-200 pb-2">
              Spesifikasi Lengkap Bengkel & Laboratorium Kejuruan
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SCHOOL_INFO.facilities.map((fac, idx) => (
                <div 
                  key={idx} 
                  className="p-5 rounded-xl bg-white border border-slate-200/90 space-y-2 hover:border-blue-400 transition-colors shadow-subtle"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm sm:text-base font-bold text-slate-950 font-sans">
                      {fac.name}
                    </h4>
                    <span className="text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded shrink-0">
                      {fac.capacity}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <strong className="text-slate-800 font-medium">Peralatan: </strong>
                    {fac.specs}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. EKSTRAKURIKULER & PEMBINAAN KARAKTER */}
        <section id="ekstrakurikuler" className="scroll-mt-28 pt-8 border-t border-slate-200/90 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800 block font-sans">
                PENGEMBANGAN KARAKTER & BAKAT
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight font-sans">
                10 Organisasi & Ekstrakurikuler Siswa
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Wadah pembinaan kepemimpinan, bakat seni budaya, olahraga prestasi, keagamaan, dan teknologi kreatif.
              </p>
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {[
              { id: 'all', label: 'Semua (10)' },
              { id: 'kepemimpinan', label: 'Kepemimpinan & Bela Negara' },
              { id: 'olahraga', label: 'Olahraga Prestasi' },
              { id: 'seni', label: 'Seni & Budaya' },
              { id: 'kreatif', label: 'Bahasa & Media Kreatif' },
              { id: 'keagamaan', label: 'Kerohanian' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setEkskulFilter(tab.id as EkskulFilter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
                  ekskulFilter === tab.id
                    ? 'bg-institution-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Extracurricular Cards with Comfortable Breathing Room */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {filteredExtracurriculars.map((ekskul) => (
              <div 
                key={ekskul.id} 
                className="p-5 rounded-xl bg-white border border-slate-200/90 space-y-3 hover:border-blue-400 transition-colors shadow-subtle flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                      {ekskul.category}
                    </span>
                    <span className="text-slate-500 font-mono text-[11px]">
                      {ekskul.schedule}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-950 font-sans">
                    {ekskul.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {ekskul.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-100 text-xs text-amber-900 font-medium">
                  Capaian: {ekskul.achievements}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. PRESTASI SEKOLAH */}
        <section id="prestasi" className="scroll-mt-28 pt-8 border-t border-slate-200/90 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800 block font-sans">
                REKAM JEJAK KEJUARAAN
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight font-sans">
                Kiprah Prestasi Siswa SKANSA
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Tradisi medali emas Lomba Kompetensi Siswa (LKS) Jawa Tengah, Nasional, FLS2N, dan Krenova.
              </p>
            </div>

            <button
              onClick={() => onNavigate('#/prestasi')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-institution-900 hover:bg-institution-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span>Buka Arsip Prestasi</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Highlight Achievement Card */}
          <div className="p-6 sm:p-8 bg-amber-50/70 rounded-2xl border border-amber-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider font-sans block">
                PENCAPAIAN TERAKHIR (TAHUN AJARAN 2025/2026)
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-950 font-sans">
                4 Medali Emas LKS Tingkat Provinsi Jawa Tengah
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Juara 1 di bidang Fashion Technology, Web Technologies, Electronics, dan Accounting Business Service, mengantarkan kontingen SKANSA mewakili Jawa Tengah ke LKS Tingkat Nasional.
              </p>
            </div>

            <button
              onClick={() => onNavigate('#/prestasi')}
              className="px-4 py-2 bg-white text-amber-950 border border-amber-300 rounded-xl text-xs font-bold hover:bg-amber-100 transition-colors shrink-0 cursor-pointer"
            >
              Lihat 34+ Gelar Juara
            </button>
          </div>
        </section>

        {/* 6. GURU & TENAGA PENDIDIK */}
        <section id="guru" className="scroll-mt-28 pt-8 border-t border-slate-200/90 space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 block font-sans">
              SUMBER DAYA MANUSIA
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight font-sans">
              Profil Pendidik & Asesor BNSP
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Dididik oleh 142 guru profesional tersertifikasi pendidik dan asesor penguji kompetensi industri berlisensi resmi.
            </p>
          </div>

          {/* Integrated Statistics Bar (Not Floating Disconnected Cards) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="text-center p-2">
              <span className="text-3xl font-black text-institution-900 font-mono block">142</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 block mt-1">Total Guru</span>
              <span className="text-xs text-slate-500">PNS, PPPK & GTT</span>
            </div>

            <div className="text-center p-2 pt-4 md:pt-2">
              <span className="text-3xl font-black text-institution-900 font-mono block">138</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 block mt-1">Sertifikasi Pendidik</span>
              <span className="text-xs text-slate-500">Kementerian Pendidikan</span>
            </div>

            <div className="text-center p-2 pt-4 md:pt-2">
              <span className="text-3xl font-black text-emerald-700 font-mono block">46</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 block mt-1">Asesor BNSP</span>
              <span className="text-xs text-slate-500">Lisensi LSP-P1 SKANSA</span>
            </div>

            <div className="text-center p-2 pt-4 md:pt-2">
              <span className="text-3xl font-black text-amber-700 font-mono block">38</span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 block mt-1">Magister (S2)</span>
              <span className="text-xs text-slate-500">Pendidikan & Teknik Kejuruan</span>
            </div>
          </div>

          {/* Leadership Team Directory */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 font-sans border-b border-slate-200 pb-2">
              Pimpinan & Tim Manajemen Mutu Sekolah
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {SCHOOL_INFO.facultyStaff.keyLeaders.map((leader, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl bg-white border border-slate-200/90 space-y-1 shadow-subtle hover:border-slate-300 transition-colors"
                >
                  <span className="text-[11px] font-bold text-blue-800 uppercase block font-sans">
                    {leader.role}
                  </span>
                  <h4 className="text-sm font-bold text-slate-950 font-sans">
                    {leader.name}
                  </h4>
                  {leader.nip && (
                    <span className="text-xs font-mono text-slate-500 block">
                      NIP: {leader.nip}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. STRUKTUR ORGANISASI & TATA KELOLA */}
        <section id="struktur-organisasi" className="scroll-mt-28 pt-8 border-t border-slate-200/90 space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 block font-sans">
              TATA KELOLA LEMBAGA
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight font-sans">
              Bagan Struktur Organisasi SKANSA
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Tata kelola kelembagaan SMK Negeri 1 Bawang berdasarkan regulasi Dinas Pendidikan dan Kebudayaan Provinsi Jawa Tengah.
            </p>
          </div>

          {/* Bagan Pohon Struktur Organisasi Interaktif dengan Garis Cabang Komando & Koordinasi */}
          <GovernanceTreeChart />
        </section>

      </main>

    </div>
  );
};

export default ProfilePage;
