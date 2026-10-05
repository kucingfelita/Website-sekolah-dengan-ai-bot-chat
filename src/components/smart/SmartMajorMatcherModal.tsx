import React, { useState, useEffect } from 'react';
import { 
  Award,
  MessageSquareText, 
  X, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Laptop, 
  Network, 
  Calculator, 
  Building2, 
  ShoppingBag, 
  Scissors, 
  Fish, 
  Cpu, 
  Eye, 
  Compass,
  Check
} from 'lucide-react';
import { PROGRAMS } from '../../data/programsData';

interface SmartMajorMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMajor: (slug: string) => void;
  onAskAI: (question: string) => void;
}

export const SmartMajorMatcherModal: React.FC<SmartMajorMatcherModalProps> = ({
  isOpen,
  onClose,
  onSelectMajor,
  onAskAI
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 'result'>(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [workStyle, setWorkStyle] = useState<string>('');
  const [visionCondition, setVisionCondition] = useState<'normal' | 'colorblind_partial' | 'not_sure'>('normal');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const interestsList = [
    { id: 'coding', label: 'Membuat Aplikasi, Website, dan Game', icon: Laptop, major: 'PPLG' },
    { id: 'network', label: 'Mengutak-atik Kabel Jaringan, Server & WiFi', icon: Network, major: 'TJKT' },
    { id: 'finance', label: 'Menghitung Keuangan, Pembukuan & Pajak', icon: Calculator, major: 'AKL' },
    { id: 'admin', label: 'Mengatur Jadwal, Arsip Surat & Keprotokolan', icon: Building2, major: 'MPLB' },
    { id: 'retail', label: 'Jualan Online, Live Streaming & Bisnis Ritel', icon: ShoppingBag, major: 'PM' },
    { id: 'fashion', label: 'Mendesain Pakaian, Menjahit & Pola Kain', icon: Scissors, major: 'BUSANA' },
    { id: 'fish', label: 'Budi Daya Ikan, Kolam Bioflok & Sains Perairan', icon: Fish, major: 'AP' },
    { id: 'electronics', label: 'Merakit Komponen Elektronika, Sensor & Robotika', icon: Cpu, major: 'TE' }
  ];

  const workStylesList = [
    { id: 'digital_screen', label: 'Bekerja intensif di depan layar komputer di ruang ber-AC' },
    { id: 'workshop_hands', label: 'Bekerja praktik fisik dengan tangan, mesin, dan peralatan presisi' },
    { id: 'people_communication', label: 'Banyak berinteraksi, presentasi, dan melayani pelanggan' },
    { id: 'outdoor_nature', label: 'Bekerja di lingkungan terbuka, tambak/kolam alami, atau laboratorium sains' }
  ];

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(item => item !== id));
    } else {
      if (selectedInterests.length < 3) {
        setSelectedInterests([...selectedInterests, id]);
      }
    }
  };

  // Smart Compatibility Calculator Algorithm
  const calculateMatches = () => {
    const scores: Record<string, number> = {
      pplg: 30,
      tjkt: 30,
      akl: 30,
      mplb: 30,
      pemasaran: 30,
      busana: 30,
      perikanan: 30,
      elektronika: 30
    };

    // Factor 1: Interests (weight: +40 points each)
    selectedInterests.forEach(item => {
      if (item === 'coding') scores.pplg += 55;
      if (item === 'network') scores.tjkt += 55;
      if (item === 'finance') scores.akl += 55;
      if (item === 'admin') scores.mplb += 55;
      if (item === 'retail') scores.pemasaran += 55;
      if (item === 'fashion') scores.busana += 55;
      if (item === 'fish') scores.perikanan += 55;
      if (item === 'electronics') scores.elektronika += 55;
    });

    // Factor 2: Work style (+20 points)
    if (workStyle === 'digital_screen') {
      scores.pplg += 20;
      scores.akl += 15;
      scores.tjkt += 15;
    } else if (workStyle === 'workshop_hands') {
      scores.elektronika += 25;
      scores.busana += 25;
      scores.tjkt += 15;
    } else if (workStyle === 'people_communication') {
      scores.pemasaran += 25;
      scores.mplb += 25;
    } else if (workStyle === 'outdoor_nature') {
      scores.perikanan += 35;
    }

    // Factor 3: Color blind constraint penalty (safety alert for majors requiring normal vision)
    const requiresNormalVision = ['pplg', 'tjkt', 'busana', 'perikanan', 'elektronika'];
    if (visionCondition === 'colorblind_partial') {
      requiresNormalVision.forEach(m => {
        scores[m] = Math.max(10, scores[m] - 50);
      });
      // Boost non-colorblind majors
      scores.akl += 20;
      scores.mplb += 20;
      scores.pemasaran += 20;
    }

    // Sort by score
    const sorted = Object.entries(scores)
      .map(([code, score]) => {
        const prog = PROGRAMS.find(p => p.id === code);
        const percent = Math.min(98, Math.max(45, Math.round((score / 110) * 100)));
        return {
          id: code,
          program: prog!,
          percentage: percent,
          colorBlindRestricted: requiresNormalVision.includes(code) && visionCondition === 'colorblind_partial'
        };
      })
      .sort((a, b) => b.percentage - a.percentage);

    return sorted;
  };

  const results = step === 'result' ? calculateMatches() : [];
  const topMatch = results[0];
  const runnerUp = results[1];

  const handleReset = () => {
    setSelectedInterests([]);
    setWorkStyle('');
    setVisionCondition('normal');
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto font-sans">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-slate-100 relative my-8">
        
        {/* Top Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider bg-blue-950 px-2 py-0.5 rounded border border-blue-900">
                  Fitur Pintar SKANSA
                </span>
                <span className="text-xs text-slate-400">
                  {step === 'result' ? 'Hasil Analisis' : `Langkah ${step} dari 3`}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mt-0.5">
                Kuis Rekomendasi Minat & Bakat Jurusan
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

        {/* STEP 1: INTERESTS */}
        {step === 1 && (
          <div className="py-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">
                1. Aktivitas apa saja yang paling kamu sukai?
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Pilih 1 hingga 3 aktivitas yang paling sesuai dengan passion atau hobimu sehari-hari.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {interestsList.map((item) => {
                const isSelected = selectedInterests.includes(item.id);
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleInterest(item.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-start space-x-3 ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                      isSelected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-semibold block leading-snug">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-blue-400 font-bold uppercase mt-1 block">
                        Rumpun {item.major}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Terpilih: <strong className="text-white">{selectedInterests.length}</strong>/3 aktivitas
              </span>
              <button
                disabled={selectedInterests.length === 0}
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-bold transition-colors flex items-center space-x-1.5"
              >
                <span>Lanjut ke Langkah 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: WORK STYLE */}
        {step === 2 && (
          <div className="py-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">
                2. Lingkungan kerja seperti apa yang paling kamu impikan?
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Pilih 1 suasana lingkungan belajar dan praktek kerja yang paling membuatmu nyaman.
              </p>
            </div>

            <div className="space-y-3">
              {workStylesList.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setWorkStyle(item.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    workStyle === item.id
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-medium pr-4">
                    {item.label}
                  </span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                    workStyle === item.id ? 'border-blue-500 bg-blue-500 text-white' : 'border-slate-700'
                  }`}>
                    {workStyle === item.id && <Check className="w-3 h-3" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-semibold"
              >
                Kembali
              </button>
              <button
                disabled={!workStyle}
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-bold transition-colors flex items-center space-x-1.5"
              >
                <span>Lanjut ke Langkah 3</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: COLOR BLIND HEALTH SAFETY CHECK */}
        {step === 3 && (
          <div className="py-6 space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span>Pemeriksaan Persyaratan Industri Vokasi</span>
              </div>
              <h3 className="text-base font-bold text-white">
                3. Apakah kamu memiliki kondisi buta warna?
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Beberapa jurusan keteknikan & estetika di SKANSA (seperti PPLG, TJKT, Busana, TE, dan Perikanan) mewajibkan <strong>bebas buta warna</strong> sesuai regulasi industri mitra. Sistem kami akan menyesuaikan rekomendasi secara aman.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setVisionCondition('normal')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  visionCondition === 'normal'
                    ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <span className="text-xs sm:text-sm font-bold block text-white">
                    Normal (Dapat membedakan seluruh warna dengan jelas)
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Memenuhi syarat untuk seluruh 8 Program Keahlian di SKANSA.
                  </span>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  visionCondition === 'normal' ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-700'
                }`}>
                  {visionCondition === 'normal' && <Check className="w-3 h-3" />}
                </div>
              </button>

              <button
                onClick={() => setVisionCondition('colorblind_partial')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  visionCondition === 'colorblind_partial'
                    ? 'bg-amber-950/40 border-amber-500 text-white shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <span className="text-xs sm:text-sm font-bold block text-amber-200">
                    Buta Warna Parsial / Total
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Sistem pintar kami akan memprioritaskan jurusan AKL, MPLB, dan Pemasaran yang ramah kondisi ini.
                  </span>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  visionCondition === 'colorblind_partial' ? 'border-amber-500 bg-amber-500 text-white' : 'border-slate-700'
                }`}>
                  {visionCondition === 'colorblind_partial' && <Check className="w-3 h-3" />}
                </div>
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-semibold"
              >
                Kembali
              </button>
              <button
                onClick={() => setStep('result')}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors flex items-center space-x-2 shadow-lg shadow-blue-600/30"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>Lihat Hasil Analisis Kecocokan</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP RESULT */}
        {step === 'result' && topMatch && (
          <div className="py-4 space-y-6">
            
            {/* Top Match Hero Card */}
            <div className="bg-gradient-to-br from-blue-900/60 to-slate-950 border border-blue-500/50 rounded-3xl p-6 relative overflow-hidden shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold tracking-wider uppercase">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>Rekomendasi Utama: {topMatch.percentage}% Cocok</span>
                </span>
                <span className="text-xs font-bold text-slate-300">
                  Kuota: {topMatch.program.quotaPerYear} Siswa
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">
                  {topMatch.program.name} ({topMatch.program.code})
                </h3>
                <p className="text-xs sm:text-sm text-blue-200 mt-1 leading-relaxed">
                  {topMatch.program.tagline}
                </p>
              </div>

              {/* Rationale explanation */}
              <div className="bg-slate-950/70 border border-blue-800/40 rounded-2xl p-3.5 text-xs text-slate-300 leading-relaxed">
                <strong className="text-blue-300 block mb-1">Mengapa jurusan ini cocok untukmu?</strong>
                Berdasarkan kombinasi minat aktivitas dan preferensi lingkungan kerjamu, kurikulum jurusan ini dirancang dengan materi praktik nyata yang paling selaras dengan potensimu untuk langsung terserap di industri modern.
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onSelectMajor(topMatch.program.slug);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors flex items-center"
                >
                  <span>Pelajari Kurikulum & Bengkel {topMatch.program.code}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onAskAI(`Bisa jelaskan lebih detail tentang prospek kerja dan peluang magang di jurusan ${topMatch.program.name} SMKN 1 Bawang?`);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center space-x-1.5 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
                >
                  <MessageSquareText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tanya AI tentang Jurusan Ini</span>
                </button>
              </div>
            </div>

            {/* Runner-up Alternative */}
            {runnerUp && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Pilihan Alternatif Terbaik ({runnerUp.percentage}% Cocok)
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5">
                    {runnerUp.program.name} ({runnerUp.program.code})
                  </h4>
                  <span className="text-xs text-slate-400">
                    Sangat bagus dijadikan pilihan kedua pada pendaftaran SPMB.
                  </span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onSelectMajor(runnerUp.program.slug);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold shrink-0 transition-colors"
                >
                  Lihat Info Jurusan
                </button>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                onClick={handleReset}
                className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Kuis dari Awal</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
              >
                Tutup
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
