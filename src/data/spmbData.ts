import { SPMBPathway } from '../types';

export const SPMB_PATHWAYS: SPMBPathway[] = [
  {
    id: "domisili",
    name: "Jalur Domisili Terdekat",
    quotaPercent: 10,
    targetAudience: "Calon peserta didik yang berdomisili paling dekat dengan kampus SMKN 1 Bawang.",
    description: "Jalur penerimaan yang memprioritaskan jarak tempat tinggal (berdasarkan Kartu Keluarga resmi yang diterbitkan minimal 1 tahun sebelum pendaftaran) ke titik koordinat gerbang utama SMKN 1 Bawang.",
    mainCriteria: [
      "Jarak domisili terukur via sistem geolokasi resmi",
      "Kartu Keluarga (KK) sah terdaftar minimal 1 tahun di Kecamatan Bawang / sekitar",
      "Surat Keterangan Bebas Buta Warna (khusus jurusan keteknikan dan busana)"
    ],
    documentsRequired: [
      "Buku Rapor SMP/MTs (Semester 1 s.d 5)",
      "Surat Keterangan Nilai Rapor dari Kepala Sekolah asal",
      "Kartu Keluarga (KK) asli dan fotokopi legalisir",
      "Akta Kelahiran calon peserta didik",
      "Surat Pernyataan Kebenaran Dokumen (Fakta Integritas)"
    ]
  },
  {
    id: "prestasi",
    name: "Jalur Prestasi",
    quotaPercent: 75,
    targetAudience: "Lulusan SMP/MTs dengan prestasi akademik nilai rapor unggul dan/atau kejuaraan kompetisi.",
    description: "Jalur seleksi utama dengan porsi kuota terbesar. Penilaian dihitung dari akumulasi rata-rata nilai rapor semester 1 s.d 5 ditambah bobot nilai piagam kejuaraan berjenjang (LKS, OSN, O2SN, FLS2N, Pramuka, Hafidz Quran, atau kejuaraan olahraga/seni resmi).",
    mainCriteria: [
      "Nilai Rapor Akumulatif Semester 1-5 mata pelajaran utama",
      "Bobot tambahan Piagam Kejuaraan Minimal Tingkat Kabupaten (Juara 1, 2, 3)",
      "Kejuaraan resmi diselenggarakan oleh Kemendikbudristek, Kemenag, atau KONI"
    ],
    documentsRequired: [
      "Surat Keterangan Nilai Rapor Semester 1-5 dari SMP/MTs asal",
      "Sertifikat / Piagam Penghargaan Kejuaraan Asli & Legalisir",
      "Kartu Keluarga & Akta Kelahiran",
      "Surat Keterangan Sehat Jasmani & Rohani",
      "Surat Pernyataan Bebas Buta Warna (PPLG, TJKT, Busana, TE, Perikanan)"
    ]
  },
  {
    id: "afirmasi",
    name: "Jalur Afirmasi & Anak Guru",
    quotaPercent: 15,
    targetAudience: "Peserta didik dari keluarga ekonomi prasejahtera, pemegang KIP/PIP, dan anak guru.",
    description: "Bentuk komitmen keadilan sosial pendidikan vokasi untuk menjamin putra-putri daerah berpotensi tetap mendapatkan pendidikan berkualitas tanpa kendala latar belakang ekonomi.",
    mainCriteria: [
      "Terdaftar dalam Data Terpadu Kesejahteraan Sosial (DTKS) Kemensos",
      "Pemegang Kartu Indonesia Pintar (KIP) / Program Indonesia Pintar (PIP)",
      "Atau anak kandung guru/tenaga kependidikan yang bertugas di SMKN 1 Bawang"
    ],
    documentsRequired: [
      "Kartu Indonesia Pintar (KIP) / Kartu Program Keluarga Harapan (PKH) asli",
      "Bukti Terdaftar pada Database DTKS Dinas Sosial",
      "Surat Keterangan Nilai Rapor SMP/MTs Semester 1-5",
      "Kartu Keluarga dan Akta Kelahiran",
      "SK Penugasan Orang Tua (khusus kuota anak pendidik)"
    ]
  }
];

export const SPMB_TIMELINE = [
  {
    phase: "Tahap 1",
    name: "Sosialisasi & Prapendaftaran Akun",
    period: "15 Mei - 05 Juni 2026",
    status: "Mendatang",
    description: "Pengenalan 8 Program Keahlian ke SMP/MTs mitra, pembuatan akun registrasi online pada portal jateng.siap-ppdb.com, dan pengunggahan berkas digital."
  },
  {
    phase: "Tahap 2",
    name: "Verifikasi Berkas Fisik & Cek Kesehatan",
    period: "10 Juni - 18 Juni 2026",
    status: "Mendatang",
    description: "Verifikasi dokumen fisik di loket Aula SMKN 1 Bawang, tes buta warna gratis oleh tim UKS/Puskesmas Bawang, dan aktivasi token pendaftaran."
  },
  {
    phase: "Tahap 3",
    name: "Pendaftaran Online & Pemilihan Jurusan",
    period: "22 Juni - 26 Juni 2026",
    status: "Mendatang",
    description: "Pemilihan 2 konsentrasi keahlian pilihan secara online. Calon peserta dapat memantau pergerakan jurnal peringkat secara langsung (real-time)."
  },
  {
    phase: "Tahap 4",
    name: "Pengumuman Hasil Seleksi Resmi",
    period: "30 Juni 2026 (Pukul 14.00 WIB)",
    status: "Mendatang",
    description: "Publikasi daftar peserta didik yang diterima di situs resmi sekolah dan papan pengumuman kampus SMKN 1 Bawang."
  },
  {
    phase: "Tahap 5",
    name: "Daftar Ulang & Pengukuran Seragam",
    period: "02 Juli - 07 Juli 2026",
    status: "Mendatang",
    description: "Registrasi administrasi ulang siswa baru dan pengenalan tata tertib sekolah."
  },
  {
    phase: "Tahap 6",
    name: "Masa Pengenalan Lingkungan Sekolah (MPLS)",
    period: "13 Juli - 16 Juli 2026",
    status: "Mendatang",
    description: "Pengenalan budaya sekolah vokasi, kedisiplinan industri, pembinaan karakter Profil Pelajar Pancasila, dan orientasi bengkel praktik."
  }
];

export const SPMB_QUOTAS = [
  { major: "PPLG (Pengembangan Perangkat Lunak & Gim)", code: "PPLG", classes: 3, totalQuota: 108, domisili: 11, prestasi: 81, afirmasi: 16 },
  { major: "TJKT (Teknik Jaringan Komputer & Telekomunikasi)", code: "TJKT", classes: 3, totalQuota: 108, domisili: 11, prestasi: 81, afirmasi: 16 },
  { major: "AKL (Akuntansi dan Keuangan Lembaga)", code: "AKL", classes: 3, totalQuota: 108, domisili: 11, prestasi: 81, afirmasi: 16 },
  { major: "MPLB (Manajemen Perkantoran & Layanan Bisnis)", code: "MPLB", classes: 2, totalQuota: 72, domisili: 7, prestasi: 54, afirmasi: 11 },
  { major: "PM (Pemasaran / Bisnis Digital)", code: "PM", classes: 2, totalQuota: 72, domisili: 7, prestasi: 54, afirmasi: 11 },
  { major: "Busana (Desain dan Produksi Busana)", code: "BUSANA", classes: 2, totalQuota: 72, domisili: 7, prestasi: 54, afirmasi: 11 },
  { major: "AP (Agribisnis Perikanan Air Tawar)", code: "AP", classes: 2, totalQuota: 72, domisili: 7, prestasi: 54, afirmasi: 11 },
  { major: "TE (Teknik Elektronika Industri)", code: "TE", classes: 2, totalQuota: 72, domisili: 7, prestasi: 54, afirmasi: 11 }
];

export const SPMB_FAQS = [
  {
    question: "Apakah bersekolah di SMKN 1 Bawang dikenakan biaya SPP bulanan?",
    answer: "TIDAK ADA BIAYA SPP (GRATIS). Sesuai kebijakan Pemerintah Provinsi Jawa Tengah, seluruh SMK Negeri di Jawa Tengah tidak memungut biaya SPP bulanan maupun uang gedung kepada peserta didik."
  },
  {
    question: "Berapa banyak pilihan jurusan yang boleh dipilih saat pendaftaran?",
    answer: "Calon peserta didik dapat memilih maksimal 2 pilihan Program Keahlian pada saat pendaftaran online. Pilihan kedua berfungsi sebagai cadangan apabila peringkat pada pilihan pertama tergeser."
  },
  {
    question: "Apakah syarat tidak buta warna berlaku untuk seluruh jurusan?",
    answer: "Syarat tidak buta warna (parsial maupun total) diwajibkan untuk program keteknikan dan visual: PPLG, TJKT, Teknik Elektronika, Desain Busana, dan Agribisnis Perikanan demi keselamatan kerja di bengkel industri. Untuk jurusan AKL dan MPLB diperbolehkan bagi yang memiliki kondisi khusus."
  },
  {
    question: "Bagaimana cara mendapatkan bantuan apabila mengalami kendala pendaftaran online?",
    answer: "SMKN 1 Bawang membuka 'Posko Bantuan & Pelayanan SPMB' bertempat di Aula Barat sekolah selama jam kerja (08.00-15.00 WIB). Petugas panitia siap membantu proses pembuatan akun dan pemindaian berkas secara gratis."
  }
];
