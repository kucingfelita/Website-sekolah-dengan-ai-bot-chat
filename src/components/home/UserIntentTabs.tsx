import React, { useState, useRef, useEffect } from 'react';
import { UserPlus, GraduationCap, Users2, Briefcase, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UserIntentTabsProps {
  onNavigate: (path: string) => void;
  onOpenAI: () => void;
}

export const UserIntentTabs: React.FC<UserIntentTabsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'prospective' | 'current' | 'parents' | 'industry'>('prospective');
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200/70 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Trio (Dicoding Style Spacing) */}
        <div className="mb-10 sm:mb-12">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-700 block mb-2 font-sans">
            PANDUAN SESUAI KEBUTUHAN
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight mb-3 font-sans">
            Akses Cepat Berdasarkan Peran Anda
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Pilih kategori Anda untuk menemukan informasi pendaftaran siswa baru (SPMB), portal akademik siswa aktif, kepastian bebas SPP orang tua, atau kemitraan industri DUDIKA.
          </p>
        </div>

        <div ref={cardRef} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          
          {/* Tab Headers: Clean Institutional Tabs with generous padding */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-200 bg-slate-50/80">
            <button
              onClick={() => setActiveTab('prospective')}
              className={`p-5 sm:p-6 text-left transition-colors flex items-center space-x-4 border-b-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                activeTab === 'prospective'
                  ? 'bg-white border-blue-700 text-blue-900 font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 font-semibold'
              }`}
            >
              <UserPlus className={`w-5 h-5 shrink-0 ${activeTab === 'prospective' ? 'text-blue-700' : 'text-slate-400'}`} />
              <div>
                <span className="text-sm sm:text-base font-bold block font-sans">
                  Calon Siswa
                </span>
                <span className="text-xs text-slate-500 font-normal hidden sm:block mt-0.5">
                  SPMB & Pilihan Jurusan
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('current')}
              className={`p-5 sm:p-6 text-left transition-colors flex items-center space-x-4 border-b-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                activeTab === 'current'
                  ? 'bg-white border-blue-700 text-blue-900 font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 font-semibold'
              }`}
            >
              <GraduationCap className={`w-5 h-5 shrink-0 ${activeTab === 'current' ? 'text-blue-700' : 'text-slate-400'}`} />
              <div>
                <span className="text-sm sm:text-base font-bold block font-sans">
                  Siswa Aktif
                </span>
                <span className="text-xs text-slate-500 font-normal hidden sm:block mt-0.5">
                  LMS, Perpus & Jadwal Ujian
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('parents')}
              className={`p-5 sm:p-6 text-left transition-colors flex items-center space-x-4 border-b-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                activeTab === 'parents'
                  ? 'bg-white border-blue-700 text-blue-900 font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 font-semibold'
              }`}
            >
              <Users2 className={`w-5 h-5 shrink-0 ${activeTab === 'parents' ? 'text-blue-700' : 'text-slate-400'}`} />
              <div>
                <span className="text-sm sm:text-base font-bold block font-sans">
                  Orang Tua / Wali
                </span>
                <span className="text-xs text-slate-500 font-normal hidden sm:block mt-0.5">
                  Bebas SPP & Konsultasi BK
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('industry')}
              className={`p-5 sm:p-6 text-left transition-colors flex items-center space-x-4 border-b-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                activeTab === 'industry'
                  ? 'bg-white border-blue-700 text-blue-900 font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 font-semibold'
              }`}
            >
              <Briefcase className={`w-5 h-5 shrink-0 ${activeTab === 'industry' ? 'text-blue-700' : 'text-slate-400'}`} />
              <div>
                <span className="text-sm sm:text-base font-bold block font-sans">
                  Mitra Industri & Alumni
                </span>
                <span className="text-xs text-slate-500 font-normal hidden sm:block mt-0.5">
                  Magang & Rekrutmen Kerja
                </span>
              </div>
            </button>
          </div>

          {/* Tab Body: Spacious Interior Padding */}
          <div className="p-8 sm:p-12">
          {activeTab === 'prospective' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
                  Penerimaan Murid Baru (SPMB) 2026/2027
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
                  Temukan Program Keahlian Terbaik Sesuai Minat & Bakatmu
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Pendidikan di SMKN 1 Bawang bebas biaya SPP bulanan. Pelajari syarat berkas rapor, kuota jurusan, kriteria tidak buta warna, dan jadwal seleksi online.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => onNavigate('#/spmb')}
                    className="px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm transition-colors flex items-center"
                  >
                    <span>Cek Syarat & Kuota SPMB</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </button>
                  <button
                    onClick={() => onNavigate('#/program-keahlian')}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors"
                  >
                    Lihat 8 Jurusan
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 space-y-3 text-xs sm:text-sm">
                <strong className="text-blue-950 block text-sm">3 Jalur Pendaftaran:</strong>
                <div className="flex justify-between items-center text-slate-700 pb-2 border-b border-blue-200">
                  <span>Jalur Prestasi (Nilai Rapor + Lomba)</span>
                  <strong className="text-blue-900 font-mono">75%</strong>
                </div>
                <div className="flex justify-between items-center text-slate-700 pb-2 border-b border-blue-200">
                  <span>Jalur Afirmasi (KIP / PIP / Prasejahtera)</span>
                  <strong className="text-blue-900 font-mono">15%</strong>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span>Jalur Domisili Terdekat (Radius)</span>
                  <strong className="text-blue-900 font-mono">10%</strong>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'current' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
                  Layanan Siswa Aktif
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
                  Akses Modul Pembelajaran, Perpustakaan, dan Kalender Akademik
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Gunakan akun sekolah resmi (@smkn1bawang.sch.id) untuk mengakses modul ajar di LMS, meminjam buku di Graha Pustaka, atau memantau jadwal UKK.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="https://elskanza.smkn1bawang.sch.id"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm transition-colors flex items-center"
                  >
                    <span>Buka LMS Elskanza</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </a>
                  <button
                    onClick={() => onNavigate('#/layanan-digital')}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors"
                  >
                    Semua Portal Digital
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 text-xs sm:text-sm">
                <strong className="text-slate-900 block text-sm">Agenda Pekan Ini:</strong>
                <p className="text-slate-600">• Uji Sertifikasi Kompetensi (UKK) LSP-P1</p>
                <p className="text-slate-600">• Pengembalian Buku Perpustakaan Semester Genap</p>
                <p className="text-slate-600">• Pembekalan Prakerin / Magang Industri Kelas XI</p>
              </div>
            </div>
          )}

          {activeTab === 'parents' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                  Keterbukaan Informasi Orang Tua
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
                  Kepastian Bebas SPP Bulanan & Saluran Komunikasi Sekolah
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Pemerintah Provinsi Jawa Tengah menjamin operasional SMK Negeri 1 Bawang bebas biaya SPP dan uang gedung. Orang tua dapat memantau presensi siswa dan berkonsultasi dengan guru BK secara berkala.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => onNavigate('#/informasi')}
                    className="px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm transition-colors flex items-center"
                  >
                    <span>Surat Edaran & Pengumuman</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </button>
                  <a
                    href="https://tanya.smkn1bawang.sch.id"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors"
                  >
                    Layanan Tanya Skansa
                  </a>
                </div>
              </div>

              <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 space-y-2 text-xs sm:text-sm text-emerald-950">
                <strong className="block text-sm font-bold">Jaminan Bebas Biaya:</strong>
                <p>• SPP Bulanan: <strong>Rp 0 (Gratis)</strong></p>
                <p>• Uang Gedung: <strong>Rp 0 (Gratis)</strong></p>
                <p>• Praktik Bengkel TeFa: Didanai BOS & BOP</p>
              </div>
            </div>
          )}

          {activeTab === 'industry' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
                  Kemitraan DUDIKA & Alumni
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
                  Perekrutan Talenta Vokasi & Kemitraan Teaching Factory
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Bekerjasama dengan lebih dari 160 perusahaan nasional. Bursa Kerja Khusus (BKK Skansa) memfasilitasi seleksi on-campus, magang industri bersertifikat, dan penyelarasan kurikulum kejuruan.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="https://bkk.smkn1bawang.sch.id"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm transition-colors flex items-center"
                  >
                    <span>Portal Karir BKK Skansa</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </a>
                  <button
                    onClick={() => onNavigate('#/mitra-industri')}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors cursor-pointer"
                  >
                    Daftar 160+ Mitra Industri Resmi
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 text-xs sm:text-sm">
                <strong className="text-slate-900 block text-sm">Fasilitas Industri:</strong>
                <p className="text-slate-600">• Rekrutmen Kampus (Walk-in Interview)</p>
                <p className="text-slate-600">• Kelas Industri (Sinkronisasi Silabus)</p>
                <p className="text-slate-600">• Praktik Kerja Lapangan (PKL) 6 Bulan</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  </section>
);
};

