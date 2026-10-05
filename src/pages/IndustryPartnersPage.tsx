import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Briefcase, 
  Search, 
  CheckCircle2, 
  Building2, 
  MapPin, 
  FileText, 
  ExternalLink, 
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Users,
  Clock,
  Send,
  Building,
  Award
} from 'lucide-react';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { 
  INDUSTRY_PARTNERS_CHARTER, 
  INDUSTRY_PARTNERS_LIST, 
  IndustryPartnerItem,
  BKK_STATS,
  BKK_JOB_VACANCIES,
  BKKJobVacancy
} from '../data/industryPartnersData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface IndustryPartnersPageProps {
  onNavigate: (path: string) => void;
}

export const IndustryPartnersPage: React.FC<IndustryPartnersPageProps> = ({ onNavigate }) => {
  const [activeMainTab, setActiveMainTab] = useState<'partners' | 'bkk'>('partners');
  const [selectedMajor, setSelectedMajor] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPartner, setSelectedPartner] = useState<IndustryPartnerItem | null>(null);
  const [selectedJob, setSelectedJob] = useState<BKKJobVacancy | null>(null);

  // Tracer Study Form State
  const [tracerName, setTracerName] = useState('');
  const [tracerYear, setTracerYear] = useState('2025');
  const [tracerMajor, setTracerMajor] = useState('PPLG');
  const [tracerStatus, setTracerStatus] = useState('Bekerja');
  const [tracerCompany, setTracerCompany] = useState('');
  const [tracerSuccess, setTracerSuccess] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  // Unique list of Majors for filter pills
  const majors = useMemo(() => {
    const list = Array.from(new Set(INDUSTRY_PARTNERS_LIST.map(p => p.majorName)));
    return ['Semua', ...list];
  }, []);

  // Filtered partners
  const filteredPartners = useMemo(() => {
    return INDUSTRY_PARTNERS_LIST.filter((partner) => {
      const matchMajor = selectedMajor === 'Semua' || partner.majorName === selectedMajor;
      const matchQuery = 
        searchQuery.trim() === '' ||
        partner.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.concentrationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.majorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchMajor && matchQuery;
    });
  }, [selectedMajor, searchQuery]);

  // GSAP Entrance Animations
  useEffect(() => {
    if (!cardsGridRef.current || activeMainTab !== 'partners') return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsGridRef.current?.querySelectorAll('.partner-bento-card') || [],
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsGridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, cardsGridRef);

    return () => ctx.revert();
  }, [selectedMajor, searchQuery, activeMainTab]);

  const handleTracerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tracerName.trim() || !tracerCompany.trim()) return;
    setTracerSuccess(true);
    setTimeout(() => {
      setTracerSuccess(false);
      setTracerName('');
      setTracerCompany('');
    }, 4000);
  };

  return (
    <div ref={containerRef} className="bg-white min-h-screen select-none">
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[{ label: "Mitra Industri & Bursa Kerja Khusus (BKK)" }]} 
        onNavigate={onNavigate} 
      />

      {/* 1. High-End Editorial Hero Header */}
      <section className="relative bg-institution-950 text-white py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-institution-900 overflow-hidden">
        
        {/* Subtle Architectural Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-amber-300 bg-amber-950/80 px-3.5 py-1 rounded-full border border-amber-500/40">
              <Briefcase className="w-3.5 h-3.5" />
              <span>DUDIKA KELAS INDUSTRI & BURSA KERJA KHUSUS (BKK)</span>
            </span>
            <span className="text-xs font-mono text-slate-400">
              // REKOR KEMITRAAN RESMI PEMPROV JATENG
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans leading-[1.1]">
            Mitra Industri & Karir Vokasi
          </h1>

          {/* User's Exact Charter Paragraph in High-Contrast Editorial Style */}
          <div className="max-w-4xl bg-institution-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-4">
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-sans">
              {INDUSTRY_PARTNERS_CHARTER.description}
            </p>

            <div className="pt-3 border-t border-institution-800 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300 font-mono">
              <span className="flex items-center text-emerald-400">
                <CheckCircle2 className="w-4 h-4 mr-1.5" />
                Sinkronisasi Kurikulum Industri
              </span>
              <span className="flex items-center text-blue-400">
                <CheckCircle2 className="w-4 h-4 mr-1.5" />
                Magang Bersertifikat Industri (PKL 6 Bulan)
              </span>
              <span className="flex items-center text-amber-400">
                <CheckCircle2 className="w-4 h-4 mr-1.5" />
                Penyaluran Kerja BKK SKANSA
              </span>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center space-x-2 pt-2">
            <button
              onClick={() => setActiveMainTab('partners')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeMainTab === 'partners'
                  ? 'bg-amber-500 text-institution-950 shadow-sm'
                  : 'bg-institution-900 text-white hover:bg-institution-850 border border-institution-800'
              }`}
            >
              Direktori 160+ Mitra Industri (DUDIKA)
            </button>
            <button
              onClick={() => setActiveMainTab('bkk')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeMainTab === 'bkk'
                  ? 'bg-amber-500 text-institution-950 shadow-sm'
                  : 'bg-institution-900 text-white hover:bg-institution-850 border border-institution-800'
              }`}
            >
              Bursa Kerja Khusus (BKK) & Info Lowongan Kerja
            </button>
          </div>

        </div>

      </section>

      {/* 2. Quick Key Metrics Strip */}
      <section className="bg-slate-50 border-b border-slate-200 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          
          <div className="pt-2 md:pt-0 md:pr-4">
            <span className="text-2xl sm:text-3xl font-black text-institution-900 font-sans block">160+</span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 block">Mitra DUDIKA Aktif</span>
            <span className="text-[11px] text-slate-500 font-mono">Kerjasama Nasional & Regional</span>
          </div>

          <div className="pt-4 md:pt-0 md:pl-6 md:pr-4">
            <span className="text-2xl sm:text-3xl font-black text-institution-900 font-sans block">13</span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 block">Konsentrasi Keahlian</span>
            <span className="text-[11px] text-slate-500 font-mono">Tersambung Link & Match</span>
          </div>

          <div className="pt-4 md:pt-0 md:pl-6 md:pr-4">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700 font-sans block">100%</span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 block">Bebas Pungutan Magang</span>
            <span className="text-[11px] text-slate-500 font-mono">Bantuan BOS & BOP Jateng</span>
          </div>

          <div className="pt-4 md:pt-0 md:pl-6">
            <span className="text-2xl sm:text-3xl font-black text-amber-600 font-sans block">76% / 14% / 10%</span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 block">Keterserapan BMW</span>
            <span className="text-[11px] text-slate-500 font-mono">Bekerja, Melanjutkan, Wirausaha</span>
          </div>

        </div>
      </section>

      {/* TAB 1: DIREKTORI MITRA DUDIKA */}
      {activeMainTab === 'partners' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          
          {/* Controls Bar: Filter Pills & Search Input */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
              {majors.map((major) => (
                <button
                  key={major}
                  onClick={() => setSelectedMajor(major)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    selectedMajor === major
                      ? 'bg-institution-900 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-950'
                  }`}
                >
                  {major}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full lg:w-80 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama perusahaan atau kota..."
                className="w-full bg-slate-50 focus:bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-institution-600 focus:ring-1 focus:ring-institution-600"
              />
            </div>

          </div>

          {/* Bento Grid Dossier */}
          <div ref={cardsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.length === 0 ? (
              <div className="col-span-full py-16 text-center text-slate-500">
                Tidak ada data mitra industri yang sesuai kriteria pencarian.
              </div>
            ) : (
              filteredPartners.map((partner) => (
                <div 
                  key={partner.id}
                  onClick={() => setSelectedPartner(partner)}
                  className="partner-bento-card group bg-white border border-slate-200 rounded-2xl p-6 hover:border-institution-600 hover:shadow-institutional transition-all duration-200 flex flex-col justify-between cursor-pointer relative"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-institution-700 bg-institution-50 px-2 py-0.5 rounded border border-institution-200">
                          {partner.majorCode} // {partner.concentrationName}
                        </span>
                        <h3 className="text-base font-bold text-slate-950 font-sans group-hover:text-institution-700 transition-colors leading-snug">
                          {partner.companyName}
                        </h3>
                      </div>

                      {partner.logoUrl && (
                        <div className="w-12 h-12 rounded-xl border border-slate-200 bg-white p-1 shrink-0 flex items-center justify-center overflow-hidden shadow-2xs">
                          <img
                            src={partner.logoUrl}
                            alt={partner.companyName}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {partner.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                      <div className="flex items-center text-slate-700">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                        <span className="truncate">{partner.location}</span>
                      </div>
                      <div className="flex items-center text-institution-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600 shrink-0" />
                        <span>MOU {partner.mouStatus} ({partner.batchYear})</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-institution-900 group-hover:text-institution-600">
                    <span>Lihat Ruang Lingkup MoU</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))
            )}
          </div>

        </section>
      )}

      {/* TAB 2: BURSA KERJA KHUSUS (BKK SKANSA) */}
      {activeMainTab === 'bkk' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          
          {/* Executive Summary Card */}
          <div className="bg-institution-50 border border-institution-200 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-institution-700 uppercase tracking-wider block">
                  UNIT KERJA KHUSUS KESISWAAN & ALUMNI
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-institution-950 font-sans mt-0.5">
                  Bursa Kerja Khusus (BKK) SMK Negeri 1 Bawang
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
                  BKK SKANSA adalah lembaga penempatan tenaga kerja resmi yang berizin dinas ketenagakerjaan untuk menjembatani alumni dengan dunia usaha dan industri nasional maupun internasional.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-institution-200 shrink-0 text-center">
                <span className="text-2xl font-black text-institution-950 block">{BKK_STATS.registeredAlumniCount}</span>
                <span className="text-[11px] text-slate-500 font-medium">Alumni Terdata BKK</span>
              </div>
            </div>

            {/* BMW Rate Progress Bars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-institution-200">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">1. Bekerja (Industri)</span>
                  <span className="font-mono font-black text-institution-900">{BKK_STATS.bmwRate.work}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-institution-600 h-full rounded-full" style={{ width: `${BKK_STATS.bmwRate.work}%` }}></div>
                </div>
                <span className="text-[10px] text-slate-500">Terserap di 160+ industri mitra</span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">2. Melanjutkan (Kuliah)</span>
                  <span className="font-mono font-black text-blue-700">{BKK_STATS.bmwRate.study}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${BKK_STATS.bmwRate.study}%` }}></div>
                </div>
                <span className="text-[10px] text-slate-500">D3/D4/S1 Polines, UNS, Unsoed, dll</span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">3. Wirausaha Mandiri</span>
                  <span className="font-mono font-black text-amber-700">{BKK_STATS.bmwRate.entrepreneur}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: `${BKK_STATS.bmwRate.entrepreneur}%` }}></div>
                </div>
                <span className="text-[10px] text-slate-500">Inkubasi TeFa mandiri & agribisnis</span>
              </div>
            </div>
          </div>

          {/* Active Job Openings from Partners */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-bold text-institution-950 font-sans">
                  Lowongan Kerja & Rekrutmen Kampus Aktif
                </h3>
                <p className="text-xs text-slate-500">
                  Daftar rekrutmen resmi yang diselenggarakan langsung di kampus SMK Negeri 1 Bawang bagi alumni.
                </p>
              </div>
              <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full">
                {BKK_JOB_VACANCIES.length} Lowongan Terbuka
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BKK_JOB_VACANCIES.map((job) => (
                <div 
                  key={job.id} 
                  className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 hover:border-institution-600 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-institution-700 bg-institution-50 px-2.5 py-0.5 rounded border border-institution-200 text-[11px]">
                        {job.majorCode}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        job.status === 'Segera Ditutup'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {job.status}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 leading-snug">
                      {job.position}
                    </h4>

                    <span className="text-xs font-semibold text-slate-700 block">
                      {job.companyName}
                    </span>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {job.qualification}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>Penempatan: {job.location}</span>
                      <span>Kuota: {job.quota}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-mono">
                      Batas: {job.deadline}
                    </span>
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-3.5 py-1.5 rounded-xl bg-institution-900 hover:bg-institution-800 text-white text-xs font-bold transition-colors"
                    >
                      Syarat & Pendaftaran
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tracer Study Form for Alumni */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-institution-700 uppercase tracking-wider block">
                PENELUSURAN ALUMNI SKANSA
              </span>
              <h3 className="text-xl font-bold text-institution-950 font-sans mt-0.5">
                Formulir Tracer Study Alumni Daring
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Bantu almamater memantau keterserapan kerja dan menyelaraskan kurikulum dengan memperbarui data karir Anda.
              </p>
            </div>

            {tracerSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Terima kasih! Data tracer study Anda berhasil diperbarui ke sistem BKK SMK Negeri 1 Bawang.</span>
              </div>
            ) : (
              <form onSubmit={handleTracerSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Nama Lengkap Alumni</label>
                  <input
                    type="text"
                    value={tracerName}
                    onChange={(e) => setTracerName(e.target.value)}
                    placeholder="Nama sesuai ijazah..."
                    required
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-institution-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Tahun Kelulusan</label>
                  <select
                    value={tracerYear}
                    onChange={(e) => setTracerYear(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-institution-600"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Jurusan</label>
                  <select
                    value={tracerMajor}
                    onChange={(e) => setTracerMajor(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-institution-600"
                  >
                    <option value="PPLG">PPLG (Software & Gim)</option>
                    <option value="TJKT">TJKT (Jaringan Komputer)</option>
                    <option value="AKL">AKL (Akuntansi)</option>
                    <option value="MPLB">MPLB (Manajemen Perkantoran)</option>
                    <option value="PM">PM (Pemasaran)</option>
                    <option value="BUSANA">Busana</option>
                    <option value="AP">Agribisnis Perikanan</option>
                    <option value="TE">Teknik Elektronika</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Status Saat Ini</label>
                  <select
                    value={tracerStatus}
                    onChange={(e) => setTracerStatus(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-institution-600"
                  >
                    <option value="Bekerja">Bekerja di Perusahaan / Industri</option>
                    <option value="Kuliah">Melanjutkan Kuliah / Vokasi</option>
                    <option value="Wirausaha">Membuka Usaha Mandiri</option>
                    <option value="Mencari Kerja">Sedang Mencari Kerja</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-slate-700 font-semibold mb-1">Nama Perusahaan / Kampus / Bidang Usaha</label>
                  <input
                    type="text"
                    value={tracerCompany}
                    onChange={(e) => setTracerCompany(e.target.value)}
                    placeholder="Contoh: PT Traspac Makmur Sejahtera atau Universitas Diponegoro..."
                    required
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-institution-600"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-institution-900 hover:bg-institution-800 text-white font-bold transition-colors shadow-sm"
                  >
                    Simpan Data Tracer
                  </button>
                </div>
              </form>
            )}
          </div>

        </section>
      )}

      {/* Modal Detail Rekrutmen Lowongan Kerja BKK */}
      {selectedJob && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-institution-950/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedJob(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 border border-slate-200 text-slate-900 relative shadow-institutional"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[11px] font-mono font-bold text-institution-700 uppercase block">
                  REKRUTMEN KAMPUS BKK SKANSA
                </span>
                <h3 className="text-xl font-bold text-institution-950 font-sans mt-0.5">
                  {selectedJob.position}
                </h3>
                <span className="text-xs font-semibold text-slate-700 block">
                  {selectedJob.companyName}
                </span>
              </div>
              <button onClick={() => setSelectedJob(null)} className="text-slate-400 hover:text-slate-700 p-1">✕</button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <strong className="text-slate-900 block font-bold">Kualifikasi Persyaratan:</strong>
                <p className="text-slate-600">{selectedJob.qualification}</p>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-slate-700 font-mono text-[11px]">
                  <span>Lokasi: {selectedJob.location}</span>
                  <span>Alokasi: {selectedJob.quota}</span>
                </div>
              </div>

              <div className="space-y-1">
                <strong className="text-slate-900 block font-bold">Alur Pendaftaran BKK SKANSA:</strong>
                <ol className="list-decimal pl-5 space-y-1 text-slate-600">
                  <li>Mengisi formulir pendaftaran daring di loket BKK sekolah.</li>
                  <li>Membawa pas foto, CV, fotokopi ijazah/SKL, dan sertifikat kompetensi ke Ruang BKK Gedung Graha Wiyata.</li>
                  <li>Pelaksanaan tes tertulis, psikotes, dan wawancara langsung bersama tim HRD industri di kampus SKANSA.</li>
                </ol>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">Batas: {selectedJob.deadline}</span>
              <button
                onClick={() => setSelectedJob(null)}
                className="px-5 py-2.5 rounded-xl bg-institution-900 hover:bg-institution-800 text-white text-xs font-bold transition-colors"
              >
                Tutup Informasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail Mitra Industri (DUDIKA) */}
      {selectedPartner && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-institution-950/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedPartner(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-slate-200 relative shadow-institutional"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div className="flex items-start gap-4">
                {selectedPartner.logoUrl && (
                  <div className="w-16 h-16 rounded-2xl border border-slate-200 bg-white p-2 shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={selectedPartner.logoUrl}
                      alt={selectedPartner.companyName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div>
                  <span className="text-[11px] font-mono font-bold text-institution-700 uppercase block mb-1">
                    KEMITRAAN DUDIKA TERVERIFIKASI // {selectedPartner.batchYear}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-sans">
                    {selectedPartner.companyName}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-600">
                    <span className="font-semibold">{selectedPartner.majorName}</span>
                    <span>•</span>
                    <span className="text-institution-700 font-bold">{selectedPartner.concentrationName}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedPartner(null)}
                className="text-slate-600 hover:text-slate-950 text-sm font-bold p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
                aria-label="Tutup rincian mitra industri"
              >
                ✕ Tutup
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div>
                <strong className="text-slate-900 block font-bold mb-1">Profil Kerjasama Industri:</strong>
                <p>{selectedPartner.description}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <strong className="text-slate-900 block font-bold">Ruang Lingkup Nota Kesepahaman (MoU):</strong>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  {selectedPartner.scope.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-institution-50 border border-institution-100">
                  <span className="text-slate-500 font-mono block text-[10px]">LOKASI KANTOR / PABRIK</span>
                  <strong className="text-slate-900">{selectedPartner.location}</strong>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                  <span className="text-slate-500 font-mono block text-[10px]">STATUS KEMITRAAN</span>
                  <strong className="text-emerald-900">{selectedPartner.mouStatus} Resmi</strong>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Penyaluran via BKK SMK Negeri 1 Bawang
              </span>

              <button
                onClick={() => setSelectedPartner(null)}
                className="px-5 py-2.5 rounded-xl bg-institution-900 hover:bg-institution-800 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Selesai Membaca
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default IndustryPartnersPage;
