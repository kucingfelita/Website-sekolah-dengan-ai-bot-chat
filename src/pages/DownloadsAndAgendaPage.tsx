import React, { useState } from 'react';
import { 
  FileDown, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Download, 
  Search, 
  Clock, 
  MapPin, 
  Building2, 
  Tag,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { Breadcrumb } from '../components/layout/Breadcrumb';

interface DownloadsAndAgendaPageProps {
  onNavigate: (path: string) => void;
}

interface PublicDocument {
  id: string;
  title: string;
  category: 'Transparansi BOSP' | 'Formulir SPMB' | 'Pedoman PKL' | 'SOP & Regulasi';
  fileSize: string;
  releaseDate: string;
  circularNumber?: string;
  description: string;
}

interface SchoolAgenda {
  id: string;
  title: string;
  category: 'Uji Kompetensi' | 'PKL & Industri' | 'Akademik' | 'P5 & TeFa';
  dateRange: string;
  time: string;
  location: string;
  participant: string;
  status: 'Mendatang' | 'Berlangsung' | 'Selesai';
}

const OFFICIAL_DOCUMENTS: PublicDocument[] = [
  {
    id: "doc-01",
    title: "Laporan Rekapitulasi Realisasi Penggunaan Dana BOSP Reguler Tahap 1 Tahun 2026",
    category: "Transparansi BOSP",
    fileSize: "420 KB (PDF)",
    releaseDate: "10 September 2026",
    circularNumber: "421.5 / 412 / 2026",
    description: "Laporan pertanggungjawaban terbuka pemanfaatan dana BOSP reguler untuk sarana operasional sekolah, listrik, internet, dan bahan praktik kejuruan."
  },
  {
    id: "doc-02",
    title: "Petunjuk Teknis & Jalur Penerimaan Siswa Baru SPMB SKANSA 2026/2027",
    category: "Formulir SPMB",
    fileSize: "1.4 MB (PDF)",
    releaseDate: "01 Juni 2026",
    circularNumber: "421.5 / 319 / 2026",
    description: "Pedoman resmi pendaftaran daring, daya tampung 720 siswa, tata cara verifikasi rapor, dan jadwal seleksi jalur Prestasi, Domisili, dan Afirmasi."
  },
  {
    id: "doc-03",
    title: "Format Surat Pernyataan Pemeriksaan Kesehatan & Bebas Buta Warna",
    category: "Formulir SPMB",
    fileSize: "185 KB (PDF)",
    releaseDate: "01 Juni 2026",
    description: "Formulir standar yang wajib diisi dan ditandatangani oleh dokter faskes/puskesmas resmi bagi calon siswa jurusan berkeahlian khusus."
  },
  {
    id: "doc-04",
    title: "Fakta Integritas Peserta Didik Baru SMK Negeri 1 Bawang Bermeterai 10.000",
    category: "Formulir SPMB",
    fileSize: "210 KB (PDF)",
    releaseDate: "01 Juni 2026",
    description: "Surat kesanggupan menaati tata tertib sekolah, bebas narkoba, dan tidak terlibat tawuran serta perundungan (bullying)."
  },
  {
    id: "doc-05",
    title: "Buku Panduan & Logbook Praktik Kerja Lapangan (PKL) 6 Bulan",
    category: "Pedoman PKL",
    fileSize: "890 KB (PDF)",
    releaseDate: "15 Juli 2026",
    description: "Panduan teknis bagi siswa kelas XII dan guru pembimbing industri dalam pencatatan jurnal harian dan penilaian kompetensi lapangan."
  },
  {
    id: "doc-06",
    title: "Standar Operasional Prosedur (SOP) Pencegahan & Penanganan Kekerasan (TPPK)",
    category: "SOP & Regulasi",
    fileSize: "360 KB (PDF)",
    releaseDate: "12 Agustus 2026",
    circularNumber: "SOP / 08 / 2026",
    description: "Pedoman resmi penanganan tindak kekerasan, perundungan, dan layanan pengaduan ramah anak di lingkungan SMK Negeri 1 Bawang."
  },
  {
    id: "doc-07",
    title: "Kalender Pendidikan Resmi SMK Negeri 1 Bawang Tahun Ajaran 2026/2027",
    category: "SOP & Regulasi",
    fileSize: "530 KB (PDF)",
    releaseDate: "10 Juli 2026",
    description: "Jadwal resmi masuk sekolah, PTS, PAS, libur semester, uji sertifikasi kompetensi, dan kegiatan kejuruan selama satu tahun ajaran."
  }
];

const UPCOMING_AGENDAS: SchoolAgenda[] = [
  {
    id: "age-01",
    title: "Uji Sertifikasi Kompetensi (USK) PPLG bersama Asesor PT. Traspac",
    category: "Uji Kompetensi",
    dateRange: "15 - 18 Oktober 2026",
    time: "08.00 - 16.00 WIB",
    location: "Lab Komputer Rekayasa Perangkat Lunak Lt. 2",
    participant: "Siswa Kelas XII Konsentrasi PPLG / RPL",
    status: "Mendatang"
  },
  {
    id: "age-02",
    title: "Pembekalan & Pelepasan PKL Gelombang 2 (Jurusan TJKT & TE)",
    category: "PKL & Industri",
    dateRange: "28 Oktober 2026",
    time: "08.30 - 12.00 WIB",
    location: "Gedung Graha Wiyata SKANSA",
    participant: "Siswa Kelas XII TJKT & TE serta Orang Tua / Wali",
    status: "Mendatang"
  },
  {
    id: "age-03",
    title: "Gelar Karya Projek Penguatan Profil Pelajar Pancasila (P5) & Expo TeFa",
    category: "P5 & TeFa",
    dateRange: "10 - 12 November 2026",
    time: "08.00 - 15.00 WIB",
    location: "Halaman Utama & Gedung Olahraga Indoor SKANSA",
    participant: "Seluruh Siswa Kelas X, XI, XII & Umum",
    status: "Mendatang"
  },
  {
    id: "age-04",
    title: "Asesmen Sumatif Akhir Semester (SAS) Gasal Tahun Ajaran 2026/2027",
    category: "Akademik",
    dateRange: "01 - 09 Desember 2026",
    time: "07.30 - 13.00 WIB",
    location: "Ruang Kelas & Sistem Elskanza CBT",
    participant: "Seluruh Peserta Didik Tingkat X, XI, XII",
    status: "Mendatang"
  },
  {
    id: "age-05",
    title: "Sosialisasi SPMB Terpadu ke SMP/MTs Se-Kabupaten Banjarnegara",
    category: "Akademik",
    dateRange: "15 Januari 2027",
    time: "09.00 - 14.00 WIB",
    location: "Posko SPMB SKANSA & Daring",
    participant: "Calon Peserta Didik Baru & Guru BK SMP",
    status: "Mendatang"
  }
];

export const DownloadsAndAgendaPage: React.FC<DownloadsAndAgendaPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'downloads' | 'agenda'>('downloads');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchDoc, setSearchDoc] = useState<string>('');
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  const docCategories = ['Semua', 'Transparansi BOSP', 'Formulir SPMB', 'Pedoman PKL', 'SOP & Regulasi'];

  const filteredDocs = OFFICIAL_DOCUMENTS.filter((doc) => {
    const matchCat = selectedCategory === 'Semua' || doc.category === selectedCategory;
    const matchSearch = searchDoc === '' || 
      doc.title.toLowerCase().includes(searchDoc.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchDoc.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDownload = (doc: PublicDocument) => {
    setDownloadSuccessToast(`Mengunduh berkas: ${doc.title}`);
    setTimeout(() => setDownloadSuccessToast(null), 3500);
  };

  return (
    <div className="bg-white min-h-screen select-none">
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: "Layanan", path: "#/layanan-digital" },
          { label: "Pusat Unduhan Dokumen & Kalender Agenda" }
        ]} 
        onNavigate={onNavigate} 
      />

      {/* Hero Header */}
      <section className="bg-institution-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-institution-900 relative overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-institution-300 bg-institution-900 px-3 py-1 rounded-full border border-institution-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Keterbukaan Informasi Publik (UU KIP No. 14 Tahun 2008)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
            Pusat Unduhan & Kalender Agenda
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Satu pintu akses pengunduhan dokumen resmi sekolah, surat edaran, laporan transparansi dana BOSP, serta kalender agenda kegiatan akademik SMK Negeri 1 Bawang.
          </p>

          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={() => setActiveTab('downloads')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'downloads'
                  ? 'bg-amber-500 text-institution-950 shadow-sm'
                  : 'bg-institution-900 text-white hover:bg-institution-850 border border-institution-800'
              }`}
            >
              Unduhan Dokumen Resmi ({OFFICIAL_DOCUMENTS.length})
            </button>
            <button
              onClick={() => setActiveTab('agenda')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'agenda'
                  ? 'bg-amber-500 text-institution-950 shadow-sm'
                  : 'bg-institution-900 text-white hover:bg-institution-850 border border-institution-800'
              }`}
            >
              Kalender & Agenda Kegiatan ({UPCOMING_AGENDAS.length})
            </button>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      {downloadSuccessToast && (
        <div className="fixed top-20 right-6 z-50 bg-institution-900 text-white border border-amber-400 px-4 py-3 rounded-2xl shadow-institutional text-xs flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{downloadSuccessToast}</span>
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* TAB 1: DOKUMEN UNDUHAN RESMI */}
        {activeTab === 'downloads' && (
          <div className="space-y-8">
            
            {/* Controls Bar: Category Pills & Search */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex flex-wrap items-center gap-1.5">
                {docCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      selectedCategory === cat
                        ? 'bg-institution-900 text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64 shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchDoc}
                  onChange={(e) => setSearchDoc(e.target.value)}
                  placeholder="Cari berkas dokumen..."
                  className="w-full bg-slate-50 focus:bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-institution-600"
                />
              </div>
            </div>

            {/* Documents List */}
            <div className="space-y-3">
              {filteredDocs.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs">
                  Tidak ditemukan dokumen yang cocok dengan kata kunci pencarian.
                </div>
              ) : (
                filteredDocs.map((doc) => (
                  <div 
                    key={doc.id}
                    className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 hover:border-institution-600 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2 text-[11px]">
                        <span className="font-semibold text-institution-700 bg-institution-50 px-2 py-0.5 rounded border border-institution-200">
                          {doc.category}
                        </span>
                        <span className="text-slate-400 font-mono">Rilis: {doc.releaseDate}</span>
                        {doc.circularNumber && (
                          <span className="text-amber-700 font-mono font-medium">No: {doc.circularNumber}</span>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 leading-snug">
                        {doc.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {doc.description}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-slate-500">{doc.fileSize}</span>
                      <button
                        onClick={() => handleDownload(doc)}
                        className="px-4 py-2 bg-institution-900 hover:bg-institution-800 text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center space-x-1.5 shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5 text-amber-400" />
                        <span>Unduh Dokumen</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* TAB 2: KALENDER & AGENDA KEGIATAN */}
        {activeTab === 'agenda' && (
          <div className="space-y-6">
            
            <div className="p-4 bg-institution-50 border border-institution-200 rounded-2xl text-xs text-institution-950 flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-institution-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block">Kalender Akademik Tahun Ajaran 2026/2027</strong>
                <span className="text-slate-600 leading-relaxed">
                  Seluruh jadwal asesmen, uji kompetensi keahlian, gelar karya, dan pembekalan industri telah diselaraskan dengan kalender dinas pendidikan Provinsi Jawa Tengah.
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {UPCOMING_AGENDAS.map((item) => (
                <div 
                  key={item.id}
                  className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 hover:border-institution-600 transition-colors shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-institution-50 text-institution-700 border border-institution-200">
                        {item.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-600">
                        {item.dateRange}
                      </span>
                    </div>

                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 w-fit">
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-sans">
                    {item.title}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 pt-1">
                    <div className="flex items-center text-slate-700">
                      <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400 shrink-0" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center text-slate-700">
                      <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center text-slate-700">
                      <Building2 className="w-3.5 h-3.5 mr-1.5 text-slate-400 shrink-0" />
                      <span>{item.participant}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
