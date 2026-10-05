import React, { useState } from 'react';
import { Award, Trophy, Medal, Search, Filter, ShieldCheck } from 'lucide-react';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { ACHIEVEMENTS } from '../data/newsAndAchievementsData';

interface AchievementsPageProps {
  onNavigate: (path: string) => void;
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({ onNavigate }) => {
  const [levelFilter, setLevelFilter] = useState<string>('Semua');

  const levels = ['Semua', 'Nasional', 'Provinsi', 'Karesidenan'];

  const filtered = levelFilter === 'Semua'
    ? ACHIEVEMENTS
    : ACHIEVEMENTS.filter(a => a.level === levelFilter);

  return (
    <div className="bg-white">
      <Breadcrumb 
        items={[{ label: "Prestasi Siswa" }]} 
        onNavigate={onNavigate} 
      />

      {/* Hero Banner */}
      <section className="bg-institution-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-institution-900">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-institution-300 bg-institution-900 px-3 py-1 rounded-full border border-institution-800">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Hall of Fame & Penghargaan Vokasi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Rekam Jejak Prestasi SKANSA
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Bukti nyata dedikasi, kedisiplinan, dan kompetensi siswa-siswi SMK Negeri 1 Bawang dalam ajang Lomba Kompetensi Siswa (LKS) tingkat regional hingga kancah nasional.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Filter Pills */}
        <div className="flex items-center space-x-2 pb-4 border-b border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">
            Tingkat Lomba:
          </span>
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                levelFilter === lvl
                  ? 'bg-institution-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Achievements Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((ach) => (
            <div
              key={ach.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-600 hover:bg-slate-50/40 p-6 transition-colors duration-150 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                    {ach.category} • Tingkat {ach.level}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Tahun {ach.year}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-black text-institution-700 block uppercase tracking-wide">
                    {ach.rank}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-institution-950 mt-0.5">
                    {ach.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Peraih Medali:</span>
                  <strong className="text-slate-900">{ach.studentName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Konsentrasi:</span>
                  <span className="text-institution-700 font-medium">{ach.major}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                  <span>Penyelenggara:</span>
                  <span className="text-right truncate max-w-[260px]">{ach.organizer}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
