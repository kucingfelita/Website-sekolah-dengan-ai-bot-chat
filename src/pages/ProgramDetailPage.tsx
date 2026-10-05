import React, { useState } from 'react';
import { 
  Laptop, 
  Network, 
  Calculator, 
  Building2, 
  ShoppingBag, 
  Scissors, 
  Fish, 
  Cpu, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Wrench, 
  Briefcase, 
  Building, 
  Award, 
  HelpCircle, 
  FolderGit2, 
  Layers,
  ChevronDown
} from 'lucide-react';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { PROGRAMS } from '../data/programsData';
import { ProgramKeahlian } from '../types';

interface ProgramDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onAskAI?: (question: string) => void;
}

export const ProgramDetailPage: React.FC<ProgramDetailPageProps> = ({ slug, onNavigate, onAskAI }) => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const program: ProgramKeahlian = PROGRAMS.find(p => p.slug === slug) || PROGRAMS[0];

  const getMajorIcon = (code: string) => {
    switch (code) {
      case 'PPLG': return <Laptop className="w-7 h-7 text-institution-400" />;
      case 'TJKT': return <Network className="w-7 h-7 text-institution-400" />;
      case 'AKL': return <Calculator className="w-7 h-7 text-institution-400" />;
      case 'MPLB': return <Building2 className="w-7 h-7 text-institution-400" />;
      case 'PM': return <ShoppingBag className="w-7 h-7 text-institution-400" />;
      case 'BUSANA': return <Scissors className="w-7 h-7 text-institution-400" />;
      case 'AP': return <Fish className="w-7 h-7 text-institution-400" />;
      case 'TE': return <Cpu className="w-7 h-7 text-institution-400" />;
      default: return <Layers className="w-7 h-7 text-institution-400" />;
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div className="bg-white">
      <Breadcrumb 
        items={[
          { label: "Program Keahlian", path: "#/program-keahlian" },
          { label: `${program.code} (${program.name})` }
        ]} 
        onNavigate={onNavigate} 
      />

      {/* Program Dossier Hero */}
      <section className="bg-institution-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-institution-900">
        <div className="max-w-5xl mx-auto space-y-6">
          
          <button
            onClick={() => onNavigate('#/program-keahlian')}
            className="inline-flex items-center text-xs font-semibold text-institution-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Kembali ke Daftar 8 Jurusan
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold font-mono bg-institution-800 text-institution-200 px-3 py-1 rounded-full border border-institution-700">
              KODE: {program.code}
            </span>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40">
              Akreditasi {program.accredited} BAN-SM
            </span>
            <span className="text-xs text-slate-300 bg-institution-900 px-3 py-1 rounded-full border border-institution-800">
              Bidang: {program.category}
            </span>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-3.5 rounded-2xl bg-institution-900 border border-institution-800 shrink-0 mt-1">
              {getMajorIcon(program.code)}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {program.name}
              </h1>
              <p className="text-base sm:text-lg font-serif italic text-institution-200 mt-2">
                "{program.tagline}"
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-institution-900">
            <div className="p-3 bg-institution-900/60 rounded-xl border border-institution-800">
              <span className="text-xs text-slate-400 block">Kuota SPMB</span>
              <span className="text-lg font-bold text-white font-mono">{program.quotaPerYear} Siswa</span>
            </div>
            <div className="p-3 bg-institution-900/60 rounded-xl border border-institution-800">
              <span className="text-xs text-slate-400 block">Rombongan Belajar</span>
              <span className="text-lg font-bold text-white font-mono">{program.classesCount} Kelas</span>
            </div>
            <div className="p-3 bg-institution-900/60 rounded-xl border border-institution-800">
              <span className="text-xs text-slate-400 block">Mitra Industri DUDI</span>
              <span className="text-lg font-bold text-white font-mono">{program.industryPartners.length} Korporat</span>
            </div>
            <div className="p-3 bg-institution-900/60 rounded-xl border border-institution-800">
              <span className="text-xs text-slate-400 block">Biaya SPP</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">Rp 0 (Gratis)</span>
            </div>
          </div>

          {/* Smart Contextual AI Prompt */}
          {onAskAI && (
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <button
                onClick={() => onAskAI(`Bagaimana prospek kerja, peluang gaji, dan sertifikasi industri untuk lulusan jurusan ${program.name} di SMKN 1 Bawang?`)}
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-blue-950/80 hover:bg-blue-900 border border-blue-700/60 text-xs font-semibold text-blue-200 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
                <span>Tanya AI: Prospek Karir & Magang {program.code}?</span>
              </button>
              <button
                onClick={() => onAskAI(`Fasilitas bengkel dan software apa saja yang digunakan siswa ${program.code} saat praktik Teaching Factory?`)}
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
                <span>Tanya AI: Fasilitas Bengkel TeFa?</span>
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Main Dossier Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        
        {/* 1. Gambaran Umum Program */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-institution-950 tracking-tight flex items-center">
            <Layers className="w-5 h-5 text-institution-600 mr-2" />
            Gambaran Umum & Filosofi Pembelajaran
          </h2>
          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 space-y-3">
            <p>{program.description}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <strong>Ketua Konsentrasi Keahlian: </strong>
            <span className="font-semibold text-institution-950">{program.headOfProgram.name}</span> ({program.headOfProgram.title})
          </div>
        </section>

        {/* 2. Kompetensi Keahlian yang Dipelajari */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-institution-950 tracking-tight flex items-center">
              <CheckCircle2 className="w-5 h-5 text-institution-600 mr-2" />
              Kompetensi yang Dipelajari (Kurikulum Merdeka)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Setiap mata pelajaran kejuruan disusun berbasis proyek nyata (Project-Based Learning) standar industri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {program.competencies.map((comp, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <h3 className="text-sm font-bold text-institution-950">
                  {comp.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {comp.description}
                </p>
                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                  {comp.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="text-[10px] font-medium bg-institution-50 text-institution-700 px-2 py-0.5 rounded">
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Fasilitas & Laboratorium Praktik */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-institution-950 tracking-tight flex items-center">
              <Wrench className="w-5 h-5 text-institution-600 mr-2" />
              Laboratorium, Studio & Spesifikasi Peralatan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Peralatan praktik resmi berstandar operasional industri untuk menjamin kesiapan kerja siswa.
            </p>
          </div>

          <div className="space-y-4">
            {program.labsAndFacilities.map((lab, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-sm font-bold text-institution-950">
                  {lab.name}
                </h3>
                <p className="text-xs text-slate-600">
                  {lab.description}
                </p>
                <div className="space-y-1 pt-1">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Daftar Perangkat Utama:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {lab.equipment.map((eq, eIdx) => (
                      <div key={eIdx} className="text-xs text-slate-700 flex items-start space-x-1.5">
                        <span className="text-institution-500 font-bold">•</span>
                        <span>{eq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Software & Tools yang Dikuasai */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-institution-950 tracking-tight flex items-center">
            <FolderGit2 className="w-5 h-5 text-institution-600 mr-2" />
            Perangkat Lunak & Instrumen Standar Industri
          </h2>
          <div className="flex flex-wrap gap-2">
            {program.softwareAndTools.map((tool, idx) => (
              <span key={idx} className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs">
                {tool}
              </span>
            ))}
          </div>
        </section>

        {/* 5. Peluang Karir Lulusan */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-institution-950 tracking-tight flex items-center">
              <Briefcase className="w-5 h-5 text-institution-600 mr-2" />
              Prospek Karir & Lapangan Kerja Lulusan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Lulusan {program.code} dibekali kompetensi untuk langsung bekerja (B), melanjutkan kuliah (M), atau berwirausaha mandiri (W).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {program.careerPaths.map((career, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <h3 className="text-sm font-bold text-institution-950">
                  {career.role}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {career.description}
                </p>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-institution-700">
                  <strong className="text-slate-500">Sektor: </strong>{career.industrySector}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Kemitraan Industri (Kelas Industri & PKL) */}
        <section className="bg-institution-50/60 rounded-3xl p-6 sm:p-8 border border-institution-100 space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-institution-950 tracking-tight flex items-center">
              <Building className="w-5 h-5 text-institution-600 mr-2" />
              Kemitraan Dunia Usaha & Industri (DUDIKA)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Perusahaan mitra yang menyelenggarakan sinkronisasi kurikulum, magang 6 bulan, dan rekrutmen kerja.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {program.industryPartners.map((partner, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1">
                <h4 className="text-xs font-bold text-institution-950">
                  {partner.name}
                </h4>
                <p className="text-[11px] text-slate-500">
                  Bentuk Kerjasama: {partner.partnershipType}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Proyek Unggulan & Prestasi Siswa */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-institution-950 tracking-tight flex items-center">
              <Award className="w-5 h-5 text-amber-500 mr-2" />
              Karya Unggulan & Prestasi Kompetisi Jurusan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {program.featuredProjects.map((proj, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-institution-700 bg-institution-50 px-2 py-0.5 rounded">
                    Tahun {proj.year}
                  </span>
                  <span>Karya: {proj.studentName}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {proj.description}
                </p>
                <p className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded-lg font-medium">
                  <strong>Dampak: </strong>{proj.result}
                </p>
              </div>
            ))}
          </div>

          {/* List of LKS Wins */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Prestasi Lomba Kompetensi Siswa (LKS) Terkini:
            </span>
            <ul className="text-xs text-slate-600 space-y-1.5">
              {program.achievements.map((ach, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-amber-500 shrink-0" />
                  <span><strong>{ach.title}</strong>: Tingkat {ach.level} ({ach.year})</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 8. FAQ Khusus Jurusan */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-institution-950 tracking-tight flex items-center">
            <HelpCircle className="w-5 h-5 text-institution-600 mr-2" />
            Tanya Jawab Seputar {program.code}
          </h2>

          <div className="space-y-3">
            {program.faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-50"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA for SPMB */}
        <div className="bg-institution-950 rounded-3xl p-8 text-white border border-institution-900 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold">
              Tertarik Mendaftar di Jurusan {program.name}?
            </h3>
            <p className="text-xs text-slate-300">
              Pelajari persyaratan dokumen rapor, timeline seleksi, dan kuota SPMB 2026/2027.
            </p>
          </div>
          <button
            onClick={() => onNavigate('#/spmb')}
            className="px-6 py-3 rounded-xl bg-institution-500 hover:bg-institution-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md shrink-0 flex items-center"
          >
            <span>Daftar Lewat SPMB 2026</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

      </div>
    </div>
  );
};
