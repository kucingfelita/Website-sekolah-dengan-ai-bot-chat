import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Send, 
  Search, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  UserCheck, 
  EyeOff, 
  PhoneCall, 
  HelpCircle,
  Building,
  School,
  Sparkles
} from 'lucide-react';
import { Breadcrumb } from '../components/layout/Breadcrumb';

interface ComplaintServicePageProps {
  onNavigate: (path: string) => void;
}

interface ComplaintRecord {
  ticketNumber: string;
  category: string;
  title: string;
  date: string;
  status: 'Diproses' | 'Ditindaklanjuti' | 'Selesai';
  response: string;
}

const SAMPLE_TRACKING: Record<string, ComplaintRecord> = {
  'WBS-2026-081': {
    ticketNumber: 'WBS-2026-081',
    category: 'Sarana & Prasarana',
    title: 'Perbaikan Lampu Penerangan & Switch Hub di Lab Jaringan Komputer 2',
    date: '22 September 2026',
    status: 'Selesai',
    response: 'Unit Sarpras dan tim teknisi TJKT telah mengganti lampu LED 36W dan merapikan kabel switch rack. Lab telah siap digunakan normal kembali.'
  },
  'WBS-2026-094': {
    ticketNumber: 'WBS-2026-094',
    category: 'Usulan Sarana Belajar',
    title: 'Penambahan Exhaust Fan di Bengkel Praktik Elektronika Industri',
    date: '25 September 2026',
    status: 'Ditindaklanjuti',
    response: 'Laporan telah diverifikasi oleh Ketua Program Keahlian TE dan diajukan pengadaan 2 unit exhaust fan pada anggaran pemeliharaan pekan ini.'
  }
};

export const ComplaintServicePage: React.FC<ComplaintServicePageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'form' | 'tracking'>('form');
  
  // Form State
  const [category, setCategory] = useState('Sarana & Prasarana');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  // Tracking State
  const [searchTicket, setSearchTicket] = useState('');
  const [trackedRecord, setTrackedRecord] = useState<ComplaintRecord | null>(null);
  const [trackingError, setTrackingError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    // Generate random realistic ticket number
    const randomNum = Math.floor(100 + Math.random() * 900);
    const newTicket = `WBS-2026-${randomNum}`;
    setSubmittedTicket(newTicket);
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchTicket.trim().toUpperCase();
    if (SAMPLE_TRACKING[query]) {
      setTrackedRecord(SAMPLE_TRACKING[query]);
      setTrackingError(false);
    } else {
      setTrackedRecord(null);
      setTrackingError(true);
    }
  };

  return (
    <div className="bg-white min-h-screen select-none">
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: "Layanan", path: "#/layanan-digital" },
          { label: "Layanan Pengaduan & Aspirasi (WBS)" }
        ]} 
        onNavigate={onNavigate} 
      />

      {/* Hero Banner */}
      <section className="bg-institution-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-institution-900 relative overflow-hidden">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-institution-300 bg-institution-900 px-3 py-1 rounded-full border border-institution-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Kanal Integritas, Transparansi & Bebas Perundungan</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
            Layanan Pengaduan & Aspirasi Sekolah
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Laporkan segala bentuk ketidaknyamanan, kerusakan sarana, pelanggaran integritas, atau sampaikan aspirasi konstruktif untuk SMK Negeri 1 Bawang. Identitas Anda dijamin aman dan terlindungi.
          </p>

          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={() => { setActiveTab('form'); setSubmittedTicket(null); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'form'
                  ? 'bg-amber-500 text-institution-950 shadow-sm'
                  : 'bg-institution-900 text-white hover:bg-institution-850 border border-institution-800'
              }`}
            >
              Buat Pengaduan / Aspirasi Baru
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'tracking'
                  ? 'bg-amber-500 text-institution-950 shadow-sm'
                  : 'bg-institution-900 text-white hover:bg-institution-850 border border-institution-800'
              }`}
            >
              Lacak Status Tiket Pengaduan
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {activeTab === 'form' ? (
          <div>
            {submittedTicket ? (
              /* Success Submission Card */
              <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center space-y-6 max-w-2xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
                    Pengaduan Berhasil Terkirim
                  </span>
                  <h2 className="text-2xl font-bold text-institution-950">
                    Tiket Pengaduan Anda : {submittedTicket}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                    Terima kasih atas kepedulian Anda dalam menjaga kenyamanan dan integritas SMK Negeri 1 Bawang. Tim Verifikasi Layanan Pengaduan akan meninjau laporan ini dalam waktu maksimal 2x24 jam kerja.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-emerald-200 text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Kategori:</span>
                    <strong className="text-slate-900">{category}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Judul Laporan:</span>
                    <strong className="text-slate-900">{title}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sifat Identitas:</span>
                    <span className="font-semibold text-emerald-700">
                      {isAnonymous ? 'Anonim (Identitas Dirahasiakan)' : reporterName}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSearchTicket(submittedTicket);
                      setActiveTab('tracking');
                      setTrackedRecord({
                        ticketNumber: submittedTicket,
                        category: category,
                        title: title,
                        date: 'Hari ini',
                        status: 'Diproses',
                        response: 'Laporan baru saja masuk ke sistem antrean verifikasi petugas sekolah.'
                      });
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 bg-institution-900 hover:bg-institution-800 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                  >
                    Pantau Status Tiket Ini
                  </button>
                  <button
                    onClick={() => {
                      setSubmittedTicket(null);
                      setTitle('');
                      setDescription('');
                      setLocation('');
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold rounded-xl transition-colors"
                  >
                    Kirim Aduan Lainnya
                  </button>
                </div>
              </div>
            ) : (
              /* Complaint Input Form */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Form Inputs (2 Columns) */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-institution-950">
                        Formulir Penyampaian Pengaduan & Aspirasi
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Sampaikan laporan Anda secara objektif dan bertanggung jawab. Seluruh data dilindungi kerahasiaannya.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                      
                      {/* Category Selection */}
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1.5">
                          Kategori Pengaduan atau Usulan
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full bg-slate-50 focus:bg-white border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-institution-600 focus:ring-1 focus:ring-institution-600"
                        >
                          <option value="Sarana & Prasarana">Sarana & Prasarana (Kerusakan Ruang, Lab, Alat Praktik)</option>
                          <option value="Akademik & Praktik Kejuruan">Akademik & Praktik Kejuruan (KBM, Guru Tamu, Modul)</option>
                          <option value="Pencegahan Kekerasan & Perundungan">Pencegahan Kekerasan, Perundungan (Bullying) & Tata Tertib</option>
                          <option value="Layanan Tata Usaha & Siswa">Layanan Tata Usaha, Administrasi & Perpustakaan</option>
                          <option value="Usul, Aspirasi & Saran">Usul, Aspirasi & Saran Pengembangan Sekolah</option>
                        </select>
                      </div>

                      {/* Anonymity Toggle */}
                      <div className="p-4 bg-institution-50 border border-institution-200 rounded-2xl space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Lock className="w-4 h-4 text-institution-700" />
                            <span className="font-bold text-slate-900">Kirim Secara Anonim (Rahasia)</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsAnonymous(!isAnonymous)}
                            className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-colors ${
                              isAnonymous
                                ? 'bg-institution-900 text-white'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {isAnonymous ? 'Anonim Aktif' : 'Terbuka'}
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {isAnonymous 
                            ? 'Nama dan nomor kontak Anda tidak akan tercatat dalam sistem laporan publik. Petugas hanya akan membaca isi laporan Anda.'
                            : 'Identitas Anda akan dicantumkan agar petugas dapat menghubungi Anda untuk klarifikasi lebih lanjut.'}
                        </p>

                        {!isAnonymous && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <div>
                              <label className="block text-slate-700 font-semibold mb-1">Nama Lengkap</label>
                              <input
                                type="text"
                                value={reporterName}
                                onChange={(e) => setReporterName(e.target.value)}
                                placeholder="Tuliskan nama Anda..."
                                required={!isAnonymous}
                                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-institution-600"
                              />
                            </div>
                            <div>
                              <label className="block text-slate-700 font-semibold mb-1">Nomor WhatsApp / HP</label>
                              <input
                                type="text"
                                value={reporterPhone}
                                onChange={(e) => setReporterPhone(e.target.value)}
                                placeholder="08xxxxxxxxxx"
                                required={!isAnonymous}
                                className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-institution-600"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Title & Location */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-slate-700 font-semibold mb-1">Judul Pokok Aduan / Usulan</label>
                          <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Contoh: Kerusakan Lampu di Lab Komputer 3..."
                            required
                            className="w-full bg-slate-50 focus:bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-institution-600 focus:ring-1 focus:ring-institution-600"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Lokasi / Ruang Terkait</label>
                          <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Contoh: Gedung B Lantai 2"
                            className="w-full bg-slate-50 focus:bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-institution-600 focus:ring-1 focus:ring-institution-600"
                          />
                        </div>
                      </div>

                      {/* Detail Description */}
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">
                          Uraian Lengkap Kejadian atau Aspirasi
                        </label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={4}
                          placeholder="Jelaskan secara rinci kronologi kejadian, letak kerusakan, atau usulan perbaikan yang ingin disampaikan..."
                          required
                          className="w-full bg-slate-50 focus:bg-white border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-institution-600 focus:ring-1 focus:ring-institution-600 leading-relaxed"
                        />
                      </div>

                      {/* Submit CTA */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full py-3 px-4 rounded-xl bg-institution-900 hover:bg-institution-800 text-white font-bold text-xs shadow-sm hover:shadow transition-all flex items-center justify-center space-x-2"
                        >
                          <Send className="w-4 h-4 text-amber-400" />
                          <span>Kirimkan Pengaduan Resmi ke Sekolah</span>
                        </button>
                      </div>

                    </form>
                  </div>
                </div>

                {/* Sidebar Guidelines (1 Column) */}
                <div className="space-y-4">
                  
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 text-xs">
                    <div className="flex items-center space-x-2 text-institution-900 font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Jaminan Perlindungan Pelapor</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Sesuai Permendikbudristek No. 46 Tahun 2023, seluruh laporan perundungan, kekerasan, dan ketidaknyamanan mendapatkan perlindungan hak privasi dan penanganan segera oleh Tim Pencegahan dan Penanganan Kekerasan (TPPK) SKANSA.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 text-xs shadow-xs">
                    <h3 className="font-bold text-slate-900">Saluran Konseling Langsung</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Bagi siswa yang membutuhkan bimbingan konseling pribadi, silakan hubungi tim Guru BK SKANSA atau Posko Pengaduan:
                    </p>
                    <div className="space-y-1.5 pt-1 text-[11px] font-mono text-slate-700">
                      <div>Posko SKANSA: (0286) 591407</div>
                      <div>Email: info@smkn1bawang.sch.id</div>
                      <div>Ruang Konseling: Gedung BK Lt. 1</div>
                    </div>
                  </div>

                </div>

              </div>
            )}
          </div>
        ) : (
          /* Tracking Status Screen */
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-bold text-institution-950">
                  Cek Tindak Lanjut Pengaduan Anda
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Masukkan nomor tiket yang Anda dapatkan saat mengirimkan laporan (contoh: WBS-2026-081).
                </p>
              </div>

              <form onSubmit={handleTrack} className="flex gap-2 text-xs">
                <input
                  type="text"
                  value={searchTicket}
                  onChange={(e) => setSearchTicket(e.target.value)}
                  placeholder="Ketik nomor tiket WBS..."
                  required
                  className="flex-1 bg-slate-50 focus:bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-mono focus:outline-none focus:border-institution-600 focus:ring-1 focus:ring-institution-600"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-institution-900 hover:bg-institution-800 text-white font-bold rounded-xl transition-colors shrink-0 flex items-center space-x-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Lacak</span>
                </button>
              </form>

              {trackingError && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Tiket Tidak Ditemukan</span>
                    <span>Pastikan kode tiket sesuai dengan tanda bukti pengaduan Anda. Anda dapat mencoba tiket contoh: <strong>WBS-2026-081</strong> atau <strong>WBS-2026-094</strong>.</span>
                  </div>
                </div>
              )}

              {trackedRecord && (
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <span className="font-mono font-bold text-institution-700 block">
                        {trackedRecord.ticketNumber}
                      </span>
                      <span className="text-[11px] text-slate-500">Tanggal: {trackedRecord.date}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      trackedRecord.status === 'Selesai'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      Status: {trackedRecord.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-500 font-semibold block uppercase">Judul Pengaduan:</span>
                    <strong className="text-slate-900 text-sm block">{trackedRecord.title}</strong>
                    <span className="text-slate-600 block">Kategori: {trackedRecord.category}</span>
                  </div>

                  <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
                    <span className="font-bold text-institution-900 block">Tanggapan Resmi Petugas:</span>
                    <p className="text-slate-700 leading-relaxed">
                      {trackedRecord.response}
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
