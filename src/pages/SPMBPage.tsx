import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  AlertCircle, 
  Phone, 
  HelpCircle, 
  ChevronDown, 
  Users, 
  MapPin, 
  ExternalLink,
  Percent,
  ArrowRight
} from 'lucide-react';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { SPMB_PATHWAYS, SPMB_TIMELINE, SPMB_QUOTAS, SPMB_FAQS } from '../data/spmbData';
import { SCHOOL_INFO } from '../data/schoolData';

interface SPMBPageProps {
  onNavigate: (path: string) => void;
  onOpenCalculator?: () => void;
  onAskAI?: (question: string) => void;
}

export const SPMBPage: React.FC<SPMBPageProps> = ({ onNavigate, onOpenCalculator, onAskAI }) => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [selectedMajorForChecklist, setSelectedMajorForChecklist] = useState<string>('PPLG');

  // Interactive Document Checklist State
  const [checkedDocs, setCheckedDocs] = useState<{ [key: string]: boolean }>({
    rapor: true,
    sk_rapor: true,
    kk: true,
    akta: false,
    buta_warna: false,
    fakta_integritas: false,
    piagam: false,
    kip: false
  });

  const toggleDoc = (key: string) => {
    setCheckedDocs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const coreDocKeys = ['rapor', 'sk_rapor', 'kk', 'akta', 'buta_warna', 'fakta_integritas'];
  const completedCount = coreDocKeys.filter(k => checkedDocs[k]).length;
  const progressPercent = Math.round((completedCount / coreDocKeys.length) * 100);

  return (
    <div className="bg-white">
      <Breadcrumb 
        items={[{ label: "SPMB 2026/2027" }]} 
        onNavigate={onNavigate} 
      />

      {/* Hero Banner */}
      <section className="bg-institution-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-institution-900">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-2 text-xs font-semibold text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/40">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
              <span>Sistem Penerimaan Murid Baru 2026/2027</span>
            </span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40">
              Bebas SPP Bulanan (Pemprov Jawa Tengah)
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Penerimaan Peserta Didik Baru (SPMB)
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Selamat datang calon peserta didik dan bapak/ibu orang tua/wali. Seluruh informasi persyaratan, kuota 8 jurusan, jadwal pendaftaran, dan verifikasi berkas diatur transparan dan bebas biaya pendidikan.
          </p>
        </div>
      </section>

      {/* Official Free SPP Guarantee Box */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 shadow-sm flex items-start space-x-3.5">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm text-emerald-950">
            <strong className="font-bold text-emerald-900 block text-sm">
              Maklumat Bebas Pungutan Biaya Pendidikan (SPP Gratis):
            </strong>
            <p className="leading-relaxed">
              Berdasarkan kebijakan Pemerintah Provinsi Jawa Tengah dan Dinas Pendidikan dan Kebudayaan, SMK Negeri 1 Bawang <strong>TIDAK MEMUNGUT BIAYA SPP BULANAN</strong> maupun uang pangkal gedung. Segala operasional sekolah dibiayai oleh dana BOS dan BOP Pendidikan. Waspada terhadap pihak yang menjanjikan kelulusan berbayar.
            </p>
          </div>
        </div>

        {/* Smart SPMB Tools Bar */}
        <div className="mt-4 bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-800 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-white block">
                Simulasi Peluang Lolos SPMB 2026/2027
              </span>
              <span className="text-xs text-slate-300">
                Hitung peluang kelulusanmu berdasarkan nilai rapor semester 1-5 dan piagam kejuaraan.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {onOpenCalculator && (
              <button
                onClick={onOpenCalculator}
                className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2 shrink-0"
              >
                <span>Buka Kalkulator Pintar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {onAskAI && (
              <button
                onClick={() => onAskAI("Apakah ada biaya seragam, buku, atau uang pangkal di SMKN 1 Bawang?")}
                className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center space-x-1.5 shrink-0"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Tanya AI: Biaya Seragam?</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* 1. Jalur Pendaftaran (3 Jalur) */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-institution-700 block">
              Skema Seleksi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-institution-950 tracking-tight mt-0.5">
              3 Jalur Penerimaan Siswa Baru
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Pilihlah jalur seleksi yang paling menguntungkan sesuai dengan nilai rapor, dokumen afirmasi, atau jarak domisili.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SPMB_PATHWAYS.map((pathway) => (
              <div
                key={pathway.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-institution-900 font-mono">
                      {pathway.quotaPercent}%
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                      Porsi Kuota
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-institution-950">
                    {pathway.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pathway.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
                      Kriteria Seleksi:
                    </span>
                    {pathway.mainCriteria.map((crit, cIdx) => (
                      <div key={cIdx} className="text-xs text-slate-600 flex items-start space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-institution-600 shrink-0 mt-0.5" />
                        <span>{crit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] text-institution-700 font-medium">
                  Sasaran: {pathway.targetAudience}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Rincian Kuota Kursi 8 Program Keahlian (Tabel Interaktif) */}
        <section className="space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-institution-700 block">
              Daya Tampung Sekolah
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-institution-950 tracking-tight mt-0.5">
              Rincian Kuota per Program Keahlian (Total 720 Kursi)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Pembagian daya tampung kursi siswa baru berdasarkan Keputusan Dinas Pendidikan Provinsi Jawa Tengah.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-institution-950 text-white font-bold text-[11px] uppercase tracking-wider">
                  <th className="p-3.5">Program Keahlian</th>
                  <th className="p-3.5 text-center">Rombel</th>
                  <th className="p-3.5 text-center">Total Kuota</th>
                  <th className="p-3.5 text-center bg-institution-900">Prestasi (75%)</th>
                  <th className="p-3.5 text-center">Afirmasi (15%)</th>
                  <th className="p-3.5 text-center">Domisili (10%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {SPMB_QUOTAS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">
                      <span className="text-institution-600 mr-1.5">[{row.code}]</span>
                      {row.major}
                    </td>
                    <td className="p-3.5 text-center font-mono text-slate-600">{row.classes} Rombel</td>
                    <td className="p-3.5 text-center font-bold font-mono text-institution-950">{row.totalQuota}</td>
                    <td className="p-3.5 text-center font-bold font-mono text-institution-700 bg-institution-50/50">{row.prestasi}</td>
                    <td className="p-3.5 text-center font-mono text-slate-600">{row.afirmasi}</td>
                    <td className="p-3.5 text-center font-mono text-slate-600">{row.domisili}</td>
                  </tr>
                ))}
                <tr className="bg-slate-100/80 font-bold text-slate-900">
                  <td className="p-3.5">TOTAL KESELURUHAN</td>
                  <td className="p-3.5 text-center font-mono">20 Rombel</td>
                  <td className="p-3.5 text-center font-mono text-institution-700">720 Siswa</td>
                  <td className="p-3.5 text-center font-mono text-institution-700 bg-institution-100/50">540</td>
                  <td className="p-3.5 text-center font-mono">108</td>
                  <td className="p-3.5 text-center font-mono">72</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Alur & Jadwal Linimasa Pendaftaran */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-institution-700 block">
              Linimasa Resmi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-institution-950 tracking-tight mt-0.5">
              Jadwal & Alur Seleksi Step-by-Step
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Catat setiap tahapan penting agar berkas terverifikasi tepat waktu.
            </p>
          </div>

          <div className="space-y-4">
            {SPMB_TIMELINE.map((step, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-institution-900 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-institution-600 uppercase">
                        {step.phase}
                      </span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.2 rounded font-medium">
                        {step.status}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                      {step.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="sm:text-right shrink-0 pl-14 sm:pl-0">
                  <span className="inline-flex items-center text-xs font-bold text-institution-900 bg-institution-50 px-3 py-1.5 rounded-lg border border-institution-200">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-institution-600" />
                    {step.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Kalkulator / Checklist Persyaratan Berkas Interaktif */}
        <section className="bg-institution-50/70 rounded-3xl p-6 sm:p-10 border border-institution-100 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-institution-700 block">
                Alat Bantu Mandiri
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-institution-950 mt-0.5">
                Checklist Dokumen Kelengkapan Berkas
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Centang dokumen yang sudah Anda siapkan sebelum datang ke loket verifikasi fisik di kampus.
              </p>
            </div>

            {/* Readiness Meter */}
            <div className="bg-white p-3 rounded-xl border border-institution-200 shadow-2xs text-right shrink-0">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Kesiapan Berkas Inti:
              </span>
              <span className="text-xl font-black text-institution-700 font-mono">
                {progressPercent}%
              </span>
              <div className="w-32 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-institution-600 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              { key: 'rapor', title: 'Buku Rapor Asli SMP/MTs (Semester 1-5)', desc: 'Wajib dibawa untuk pencocokan nilai fisik' },
              { key: 'sk_rapor', title: 'Surat Keterangan Nilai Rapor Legalisir', desc: 'Diterbitkan dan ditandatangani Kepala Sekolah asal' },
              { key: 'kk', title: 'Kartu Keluarga (KK) Asli & Fotokopi', desc: 'Diterbitkan minimal 1 tahun sebelum pendaftaran' },
              { key: 'akta', title: 'Akta Kelahiran Asli & Fotokopi', desc: 'Batas usia maksimal 21 tahun pada 1 Juli 2026' },
              { key: 'buta_warna', title: 'Surat Keterangan Tidak Buta Warna', desc: 'Dari Dokter / Puskesmas (Wajib: PPLG, TJKT, TE, Busana, AP)' },
              { key: 'fakta_integritas', title: 'Surat Pernyataan Fakta Integritas Bermeterai', desc: 'Format formulir dapat diunduh di posko' },
              { key: 'piagam', title: 'Piagam / Sertifikat Kejuaraan Asli', desc: 'Khusus Jalur Prestasi (Minimal Juara Kabupaten)' },
              { key: 'kip', title: 'Kartu Indonesia Pintar (KIP / PKH / DTKS)', desc: 'Khusus pendaftar Jalur Afirmasi' },
            ].map((doc) => {
              const isChecked = checkedDocs[doc.key];
              return (
                <div
                  key={doc.key}
                  onClick={() => toggleDoc(doc.key)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border flex items-start space-x-3 ${
                    isChecked
                      ? 'bg-white border-institution-500 shadow-2xs'
                      : 'bg-white/60 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-1 h-4 w-4 rounded text-institution-600 border-slate-300 focus:ring-institution-500"
                  />
                  <div>
                    <h4 className={`text-xs sm:text-sm font-bold ${isChecked ? 'text-institution-950' : 'text-slate-700'}`}>
                      {doc.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {doc.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Tanya Jawab Resmi SPMB */}
        <section className="space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-institution-700 block">
              Konsultasi & FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-institution-950 tracking-tight mt-0.5">
              Pertanyaan yang Sering Diajukan Orang Tua & Siswa
            </h2>
          </div>

          <div className="space-y-3">
            {SPMB_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-50"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Posko Bantuan Kampus Contact */}
        <section className="bg-institution-950 text-white rounded-3xl p-6 sm:p-10 border border-institution-900 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-institution-900">
            <div>
              <h3 className="text-lg sm:text-xl font-bold">
                Mengalami Kendala Pembuatan Akun Online?
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Kunjungi Posko Bantuan SPMB SMKN 1 Bawang di Aula Barat sekolah atau hubungi hotline panitia.
              </p>
            </div>
            <a
              href={`tel:${SCHOOL_INFO.contact.phone.replace(/[^0-9]/g, '')}`}
              className="px-5 py-2.5 rounded-xl bg-institution-500 hover:bg-institution-600 text-white font-bold text-xs transition-colors shrink-0 flex items-center self-start sm:self-center"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5" />
              <span>Telepon: {SCHOOL_INFO.contact.phone}</span>
            </a>
          </div>
          <div className="text-xs text-slate-600 font-medium flex flex-wrap items-center gap-y-2 gap-x-6">
            <span>• Lokasi: Kampus SMKN 1 Bawang, Jl. Raya Pucang No. 132</span>
            <span>• Layanan: Gratis tanpa dipungut biaya apapun</span>
            <span>• Waktu: Senin - Jumat 08.00 - 15.00 WIB</span>
          </div>
        </section>

      </div>
    </div>
  );
};
