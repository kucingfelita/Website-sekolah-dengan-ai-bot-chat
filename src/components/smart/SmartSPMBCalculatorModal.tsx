import React, { useState } from 'react';
import { 
  Calculator, 
  X, 
  MessageSquareText, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  HelpCircle,
  Award,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { PROGRAMS } from '../../data/programsData';

interface SmartSPMBCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  onAskAI: (question: string) => void;
}

export const SmartSPMBCalculatorModal: React.FC<SmartSPMBCalculatorModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onAskAI
}) => {
  const [targetMajor, setTargetMajor] = useState<string>('PPLG');
  const [pathway, setPathway] = useState<'Prestasi' | 'Afirmasi' | 'Domisili'>('Prestasi');
  const [raporScore, setRaporScore] = useState<number>(88.5);
  const [certificateLevel, setCertificateLevel] = useState<string>('none');
  const [distanceKm, setDistanceKm] = useState<number>(2.5);

  if (!isOpen) return null;

  // Smart Chance Calculation Engine
  const calculateChance = () => {
    let finalScore = raporScore;

    // Certificate addition based on official Jateng Juknis SPMB
    let certificatePoints = 0;
    if (certificateLevel === 'national_1') certificatePoints = 15;
    else if (certificateLevel === 'national_23') certificatePoints = 12;
    else if (certificateLevel === 'prov_1') certificatePoints = 9;
    else if (certificateLevel === 'prov_23') certificatePoints = 6;
    else if (certificateLevel === 'kab_123') certificatePoints = 3;

    finalScore += certificatePoints;

    // Major cutoffs simulation based on historical popularity
    const majorCutoffs: Record<string, number> = {
      PPLG: 89.0,
      TJKT: 87.5,
      AKL: 86.0,
      MPLB: 84.5,
      PM: 83.5,
      BUSANA: 83.0,
      AP: 82.0,
      TE: 85.0
    };

    const targetCutoff = majorCutoffs[targetMajor] || 85.0;
    const diff = finalScore - targetCutoff;

    let status: 'high' | 'competitive' | 'tight' = 'competitive';
    let probabilityText = 'Peluang Sedang (Kompetitif)';
    let colorClass = 'text-amber-400 bg-amber-950/80 border-amber-800';
    let progressPercent = 65;
    let recommendation = '';

    if (pathway === 'Afirmasi') {
      status = 'high';
      probabilityText = 'Peluang Sangat Tinggi (Prioritas Kuota Afirmasi 15%)';
      colorClass = 'text-emerald-400 bg-emerald-950/80 border-emerald-800';
      progressPercent = 95;
      recommendation = 'Pastikan data KIP/PIP atau DTKS terverifikasi aktif di Dinas Sosial sebelum datang ke posko verifikasi.';
    } else if (pathway === 'Domisili') {
      if (distanceKm <= 3.0) {
        status = 'high';
        probabilityText = 'Peluang Sangat Tinggi (Jarak Dekat < 3 Km)';
        colorClass = 'text-emerald-400 bg-emerald-950/80 border-emerald-800';
        progressPercent = 90;
        recommendation = 'Kartu Keluarga (KK) wajib terbit minimal 1 tahun sebelum pendaftaran di wilayah Kecamatan Bawang.';
      } else {
        status = 'tight';
        probabilityText = 'Peluang Ketat (Jarak Cukup Jauh)';
        colorClass = 'text-orange-400 bg-orange-950/80 border-orange-800';
        progressPercent = 45;
        recommendation = 'Karena jarak di atas 3 km, sangat disarankan mendaftar melalui Jalur Prestasi Nilai Rapor.';
      }
    } else {
      // Jalur Prestasi
      if (diff >= 3.0) {
        status = 'high';
        probabilityText = 'Peluang Sangat Tinggi (Aman)';
        colorClass = 'text-emerald-400 bg-emerald-950/80 border-emerald-800';
        progressPercent = 92;
        recommendation = `Akumulasi nilai ${finalScore.toFixed(2)} berada di atas estimasi batas passing grade jurusan ${targetMajor}. Tetap siapkan berkas fisik rapor asli.`;
      } else if (diff >= -1.0) {
        status = 'competitive';
        probabilityText = 'Peluang Kompetitif (Bersaing)';
        colorClass = 'text-amber-400 bg-amber-950/80 border-amber-800';
        progressPercent = 70;
        recommendation = `Nilai ${finalScore.toFixed(2)} berada di zona bersaing ketat untuk ${targetMajor}. Disarankan memilih pilihan kedua jurusan seperti AKL atau MPLB untuk mengamankan kuota.`;
      } else {
        status = 'tight';
        probabilityText = 'Peluang Ketat (Perlu Strategi)';
        colorClass = 'text-orange-400 bg-orange-950/80 border-orange-800';
        progressPercent = 40;
        recommendation = `Nilai ${finalScore.toFixed(2)} berada di bawah proyeksi nilai teratas ${targetMajor}. Kami sarankan mempertimbangkan jurusan alternatif dengan kuota sebanding.`;
      }
    }

    return {
      finalScore,
      targetCutoff,
      certificatePoints,
      status,
      probabilityText,
      colorClass,
      progressPercent,
      recommendation
    };
  };

  const result = calculateChance();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto font-sans">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl text-slate-100 relative my-8 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">
                  Simulasi Cerdas SPMB 2026
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mt-0.5">
                Kalkulator Peluang Lolos SPMB
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4 text-xs">
          
          {/* Target Major Selection */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">
              Jurusan Pilihan Utama (Pilihan 1)
            </label>
            <select
              value={targetMajor}
              onChange={(e) => setTargetMajor(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-blue-500"
            >
              {PROGRAMS.map((prog) => (
                <option key={prog.id} value={prog.code}>
                  {prog.code}: {prog.name} (Pagu {prog.quotaPerYear} Siswa)
                </option>
              ))}
            </select>
          </div>

          {/* Pathway Selection */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">
              Jalur Pendaftaran yang Dipilih
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Prestasi', 'Afirmasi', 'Domisili'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPathway(p)}
                  className={`py-2 px-3 rounded-xl border text-center font-bold transition-all ${
                    pathway === p
                      ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  Jalur {p}
                </button>
              ))}
            </div>
          </div>

          {/* Rapor Score Input */}
          {pathway === 'Prestasi' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-semibold">
                  Rata-rata Nilai Rapor Semester 1 s.d 5
                </label>
                <span className="text-base font-bold text-blue-400 font-mono">
                  {raporScore.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="70"
                max="100"
                step="0.1"
                value={raporScore}
                onChange={(e) => setRaporScore(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Skala 70.0</span>
                <span>Rata-rata 85.0</span>
                <span>Maks 100.0</span>
              </div>
            </div>
          )}

          {/* Certificate Level */}
          {pathway === 'Prestasi' && (
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                Piagam Kejuaraan Berjenjang Resmi (Opsional Nilai Tambah)
              </label>
              <select
                value={certificateLevel}
                onChange={(e) => setCertificateLevel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="none">Tidak Ada Piagam / Sertifikat Kejuaraan</option>
                <option value="kab_123">Juara 1-3 Tingkat Kabupaten (+3.0 Poin)</option>
                <option value="prov_23">Juara 2-3 Tingkat Provinsi (+6.0 Poin)</option>
                <option value="prov_1">Juara 1 Tingkat Provinsi (+9.0 Poin)</option>
                <option value="national_23">Juara 2-3 Tingkat Nasional (+12.0 Poin)</option>
                <option value="national_1">Juara 1 Tingkat Nasional (+15.0 Poin)</option>
              </select>
            </div>
          )}

          {/* Distance Input for Domisili */}
          {pathway === 'Domisili' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-semibold">
                  Jarak Rumah ke Gerbang Sekolah (Berdasarkan KK)
                </label>
                <span className="text-base font-bold text-blue-400 font-mono">
                  {distanceKm.toFixed(1)} km
                </span>
              </div>
              <input
                type="range"
                min="0.2"
                max="10.0"
                step="0.1"
                value={distanceKm}
                onChange={(e) => setDistanceKm(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0.2 km (Sangat Dekat)</span>
                <span>3.0 km</span>
                <span>10.0 km</span>
              </div>
            </div>
          )}

        </div>

        {/* Prediction Output Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">
              Hasil Estimasi Peluang:
            </span>
            <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${result.colorClass}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{result.probabilityText}</span>
            </span>
          </div>

          {/* Gauge Meter Bar */}
          <div className="space-y-1">
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  result.status === 'high' ? 'bg-emerald-500' :
                  result.status === 'competitive' ? 'bg-amber-500' : 'bg-orange-500'
                }`}
                style={{ width: `${result.progressPercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Rendah</span>
              <span>Skor Bobot: {result.finalScore.toFixed(2)}</span>
              <span>Peluang Tinggi</span>
            </div>
          </div>

          {/* Tactical Recommendation */}
          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            <strong>Saran Strategis:</strong> {result.recommendation}
          </p>

        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-slate-800">
          <button
            onClick={() => {
              onClose();
              onAskAI(`Berapa passing grade rata-rata rapor untuk jurusan ${targetMajor} di SMKN 1 Bawang jalur ${pathway}?`);
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center space-x-1.5 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
          >
            <MessageSquareText className="w-3.5 h-3.5 text-amber-400" />
            <span>Tanya AI Strategi Lolos</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onNavigate('#/spmb');
            }}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors flex items-center"
          >
            <span>Buka Dokumen Checklist SPMB</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
