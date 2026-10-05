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
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Briefcase,
  Layers,
  Search
} from 'lucide-react';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { PROGRAMS } from '../data/programsData';

interface ProgramsPageProps {
  onNavigate: (path: string) => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'Semua', 
    'Teknologi Informasi', 
    'Bisnis & Manajemen', 
    'Seni & Ekonomi Kreatif', 
    'Agribisnis', 
    'Teknologi & Rekayasa'
  ];

  const filteredPrograms = PROGRAMS.filter(p => {
    const matchesCat = selectedCategory === 'Semua' || p.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getMajorIcon = (code: string) => {
    switch (code) {
      case 'PPLG': return <Laptop className="w-6 h-6 text-institution-500" />;
      case 'TJKT': return <Network className="w-6 h-6 text-institution-500" />;
      case 'AKL': return <Calculator className="w-6 h-6 text-institution-500" />;
      case 'MPLB': return <Building2 className="w-6 h-6 text-institution-500" />;
      case 'PM': return <ShoppingBag className="w-6 h-6 text-institution-500" />;
      case 'BUSANA': return <Scissors className="w-6 h-6 text-institution-500" />;
      case 'AP': return <Fish className="w-6 h-6 text-institution-500" />;
      case 'TE': return <Cpu className="w-6 h-6 text-institution-500" />;
      default: return <Layers className="w-6 h-6 text-institution-500" />;
    }
  };

  return (
    <div className="bg-white">
      <Breadcrumb 
        items={[{ label: "Program Keahlian" }]} 
        onNavigate={onNavigate} 
      />

      {/* Hero Banner */}
      <section className="bg-institution-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-institution-900">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-institution-300 bg-institution-900 px-3 py-1 rounded-full border border-institution-800">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Kurikulum Vokasi SMK Pusat Keunggulan</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            8 Program Keahlian Unggulan
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Pendidikan vokasi yang dirancang bersama Dunia Usaha dan Dunia Industri (DUDI). Temukan kurikulum, fasilitas bengkel praktik, kemitraan industri, dan prospek karir masa depanmu.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-institution-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari program keahlian..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-institution-500"
            />
          </div>
        </div>

        {/* 8 Majors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-600 hover:bg-slate-50/40 p-6 transition-colors duration-150 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-xl bg-institution-50 border border-institution-100">
                      {getMajorIcon(prog.code)}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-institution-600">
                        {prog.code}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-institution-950">
                        {prog.name}
                      </h3>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                    Akreditasi {prog.accredited}
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-xs font-serif italic text-institution-800">
                  "{prog.tagline}"
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {prog.description}
                </p>

                {/* Key Skills */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Fokus Pembelajaran Utama:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {prog.competencies.map((comp, idx) => (
                      <span key={idx} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                        {comp.title}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Industry Partners Snippet */}
                <div className="text-xs text-slate-500 pt-1">
                  <span className="font-semibold text-slate-700">Mitra Kelas Industri: </span>
                  {prog.industryPartners.map(p => p.name).join(', ')}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Kuota SPMB: <strong className="text-institution-950 font-mono">{prog.quotaPerYear} Kursi</strong> ({prog.classesCount} Rombel)
                </div>

                <button
                  onClick={() => onNavigate(`#/program-keahlian/${prog.slug}`)}
                  className="px-4 py-2 rounded-xl bg-institution-900 hover:bg-institution-800 text-white text-xs font-bold transition-colors flex items-center group"
                >
                  <span>Lihat Kurikulum & Fasilitas</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Informative Note */}
        <div className="bg-institution-50/70 rounded-2xl p-6 border border-institution-100 text-xs sm:text-sm text-institution-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-bold">Butuh Bantuan Memilih Jurusan yang Tepat?</h4>
            <p className="text-xs text-slate-600">
              Gunakan Asisten Virtual SKANSA untuk mencocokkan hobi, cita-cita, dan ketertarikan Anda dengan 8 program keahlian kami.
            </p>
          </div>
          <button
            onClick={() => onNavigate('#/spmb')}
            className="px-5 py-2.5 rounded-xl bg-institution-600 hover:bg-institution-700 text-white font-bold text-xs transition-colors shrink-0"
          >
            Lihat Alur Pendaftaran SPMB
          </button>
        </div>

      </div>
    </div>
  );
};
