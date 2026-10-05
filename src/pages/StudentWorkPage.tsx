import React, { useState } from 'react';
import { Palette, Code2, Cpu, Utensils, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { STUDENT_WORKS } from '../data/newsAndAchievementsData';

interface StudentWorkPageProps {
  onNavigate: (path: string) => void;
}

export const StudentWorkPage: React.FC<StudentWorkPageProps> = ({ onNavigate }) => {
  const [selectedCat, setSelectedCat] = useState<string>('Semua');

  const categories = [
    'Semua', 
    'Aplikasi & Software', 
    'Desain Busana', 
    'IoT & Elektronika', 
    'Produk Olahan', 
    'Karya Bisnis'
  ];

  const filtered = selectedCat === 'Semua'
    ? STUDENT_WORKS
    : STUDENT_WORKS.filter(w => w.category === selectedCat);

  return (
    <div className="bg-white">
      <Breadcrumb 
        items={[{ label: "Karya Siswa & Portofolio" }]} 
        onNavigate={onNavigate} 
      />

      {/* Hero Banner */}
      <section className="bg-institution-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-institution-900">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-institution-300 bg-institution-900 px-3 py-1 rounded-full border border-institution-800">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>Showcase & Inovasi Tugas Akhir Vokasi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Galeri Karya Siswa SKANSA
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Kumpulan inovasi terapan karya peserta didik SMK Negeri 1 Bawang: mulai dari sistem aplikasi perangkat lunak skala produksi, busana adi karya wastra daerah, perangkat keras otomasi IoT, hingga produk pangan olahan bernilai jual.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pb-4 border-b border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCat === cat
                  ? 'bg-institution-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((work) => (
            <div
              key={work.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-600 hover:bg-slate-50/40 p-6 transition-colors duration-150 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-institution-700 bg-institution-50 px-2.5 py-0.5 rounded border border-institution-100">
                    {work.majorCode} • {work.category}
                  </span>
                  <span className="font-mono text-slate-400">
                    Tahun {work.year}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-institution-950">
                  {work.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {work.description}
                </p>

                <div className="pt-2 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Teknologi / Bahan Utama:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {work.technologiesOrMaterials.map((t, idx) => (
                      <span key={idx} className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="text-xs flex justify-between">
                  <span className="text-slate-600 font-medium">Kreator / Tim:</span>
                  <strong className="text-slate-800">{work.creators}</strong>
                </div>
                <div className="p-2.5 bg-emerald-50 rounded-xl text-xs text-emerald-800 border border-emerald-100">
                  <strong>Status & Manfaat: </strong>{work.impactOrStatus}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
