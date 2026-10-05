import { NewsItem, AchievementItem, StudentWorkItem } from '../types';

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "traspac-mengajar-30",
    title: "TRASPAC MENGAJAR #30: Perkuat Sinergi Industri dan Persiapkan Siswa PPLG Hadapi USK",
    slug: "traspac-mengajar-30-perkuat-sinergi-industri-pplg-usk",
    excerpt: "Program Guru Tamu menghadirkan praktisi software engineering PT. Traspac Makmur Sejahtera Jakarta untuk membekali siswa konsentrasi PPLG menghadapi Uji Sertifikasi Keahlian.",
    date: "26 September 2026",
    author: "Admin SMKN 1 Bawang",
    category: "Berita Resmi",
    readTime: "3 menit baca",
    coverImage: "/images/news/traspac-mengajar-2026.jpg",
    tags: ["Guru Tamu", "PPLG", "PT TRASPAC MAKMUR SEJAHTERA", "USK", "SMK Bisa"],
    content: [
      "SMK Negeri 1 Bawang kembali menyelenggarakan program guru tamu industri 'TRASPAC MENGAJAR #30' yang bekerja sama dengan PT. Traspac Makmur Sejahtera Jakarta, mitra industri utama kompetensi Pengembangan Perangkat Lunak dan Gim (PPLG).",
      "Kegiatan ini berfokus pada pendalaman materi standar industri, review arsitektur aplikasi riil, serta simulasi langsung instrumen Uji Sertifikasi Keahlian (USK) agar lulusan siap memenuhi kualifikasi rekrutmen kerja nasional.",
      "Para siswa antusias mempraktikkan standarisasi penulisan kode bersih, manajemen repositori Git berbasis tim, serta pengujian perangkat lunak terotomatisasi di bawah bimbingan langsung para software engineer profesional."
    ]
  },
  {
    id: "sosialisasi-pkl-wali-murid-pplg",
    title: "SMKN 1 Bawang Gelar Sosialisasi PKL bagi Wali Murid Kelas XII PPLG",
    slug: "smkn-1-bawang-gelar-sosialisasi-pkl-wali-murid-kelas-xii-pplg",
    excerpt: "Pertemuan sosialisasi bersama wali murid kelas XII PPLG membahas kesiapan mental, administrasi kemitraan, serta penempatan magang 6 bulan di perusahaan mitra.",
    date: "17 September 2026",
    author: "Admin SMKN 1 Bawang",
    category: "Berita Resmi",
    readTime: "3 menit baca",
    coverImage: "/images/news/sosialisasi-pkl-pplg.jpg",
    tags: ["PKL", "PPLG", "Wali Murid", "DUDIKA", "Prakerin"],
    content: [
      "Bertempat di ruang aula sekolah, jajaran manajemen SMKN 1 Bawang bersama tim Pokja PKL menyelenggarakan sosialisasi Praktik Kerja Lapangan (PKL) semester ganjil bagi seluruh wali murid kelas XII konsentrasi keahlian PPLG.",
      "Pihak sekolah memaparkan protokol pelaksanaan magang industri selama 6 bulan, asuransi keselamatan kerja peserta didik, pola monitoring pembimbing via aplikasi Jurnal PKL daring, serta pentingnya dukungan keluarga dalam menjaga integritas kerja siswa.",
      "Sinergi antara pihak sekolah dan orang tua murid menjadi kunci keberhasilan pembentukan karakter disiplin dan etos kerja profesional siswa di lingkungan industri."
    ]
  },
  {
    id: "realisasi-dana-bosp-2026",
    title: "Laporan Rekapitulasi Realisasi Penggunaan Dana BOSP Reguler Tahap 1 Tahun 2026",
    slug: "laporan-rekapitulasi-realisasi-dana-bosp-reguler-tahap-1-2026",
    excerpt: "Sebagai wujud akuntabilitas dan transparansi tata kelola anggaran publik, SMKN 1 Bawang mempublikasikan rekapitulasi realisasi belanja dana BOSP Reguler Tahap 1 Tahun 2026.",
    date: "10 September 2026",
    author: "Admin SMKN 1 Bawang",
    category: "Pengumuman",
    isAnnouncement: true,
    circularNumber: "421.5 / 248 / BOSP / 2026",
    readTime: "2 menit baca",
    tags: ["BOSP", "Transparansi", "Akuntabilitas", "Keuangan"],
    content: [
      "Sesuai petunjuk teknis pengelolaan Bantuan Operasional Satuan Pendidikan (BOSP) Kemendikdasmen dan Dinas Pendidikan Jawa Tengah, SMK Negeri 1 Bawang merilis laporan realisasi penerimaan dan penggunaan dana BOSP Reguler Tahap 1.",
      "Alokasi dana difokuskan untuk pemeliharaan sarana prasarana bengkel kejuruan, penyediaan bahan praktik habis pakai 8 jurusan, langganan bandwidth internet pembelajaran, serta asesmen kompetensi siswa.",
      "Masyarakat dan seluruh pemangku kepentingan dapat mengakses rincian laporan keuangan secara terbuka melalui papan informasi sekolah dan layanan publik portal resmi."
    ]
  },
  {
    id: "sosialisasi-donor-darah-pmi",
    title: "Siswa Skansa Ikuti Sosialisasi Donor Darah PMI, Diharapkan jadi Relawan Masa Depan",
    slug: "siswa-skansa-ikuti-sosialisasi-donor-darah-pmi",
    excerpt: "Edukasi kesehatan remaja dan penanaman jiwa kemanusiaan sukarela melalui sosialisasi donor darah bekerja sama dengan PMI Kabupaten Banjarnegara.",
    date: "11 Agustus 2026",
    author: "Admin SMKN 1 Bawang",
    category: "Kegiatan",
    readTime: "3 menit baca",
    coverImage: "/images/news/donor-darah-pmi.jpg",
    tags: ["PMI Banjarnegara", "PMR Wira", "Donor Darah", "Kemanusiaan"],
    content: [
      "SMK Negeri 1 Bawang bekerja sama dengan Palang Merah Indonesia (PMI) Kabupaten Banjarnegara mengadakan kegiatan sosialisasi pentingnya donor darah bagi peserta didik tingkat menengah kejuruan.",
      "Narasumber dari Unit Donor Darah (UDD) PMI memberikan pemahaman mengenai manfaat medis donor darah rutin, syarat kelaikan donor, serta menepis mitos yang berkembang di kalangan remaja.",
      "Diharapkan kegiatan ini menumbuhkan kesadaran kepedulian sosial sejak dini sehingga siswa Skansa tumbuh menjadi relawan donor darah aktif yang bermanfaat bagi masyarakat."
    ]
  },
  {
    id: "pmr-wira-juara-1-invitasi-pmi",
    title: "PMR Wira SMKN 1 Bawang Tampil Gemilang, Sabet Juara 1 Invitasi PMI 2026",
    slug: "pmr-wira-smkn-1-bawang-tampil-gemilang-sabet-juara-1-invitasi-pmi-2026",
    excerpt: "Kontingen Palang Merah Remaja Wira SKANSA sukses menorehkan prestasi gemilang dengan merebut gelar Juara 1 dalam ajang Invitasi PMI Kabupaten Banjarnegara 2026.",
    date: "05 Agustus 2026",
    author: "Admin SMKN 1 Bawang",
    category: "Prestasi",
    readTime: "3 menit baca",
    coverImage: "/images/news/pmr-wira-juara-1.jpg",
    tags: ["PMR Wira", "Juara 1", "Invitasi PMI", "Banjarnegara"],
    content: [
      "Prestasi membanggakan kembali dipersembahkan oleh ekstrakurikuler PMR Wira SMKN 1 Bawang dalam ajang bergengsi Invitasi PMI Kabupaten Banjarnegara Tahun 2026.",
      "Tim PMR Skansa menunjukkan performa terbaik pada uji keterampilan pertolongan pertama di lapangan, evakuasi tandu darurat, cerdas cermat kepalangmerahan, dan komunikasi kepemimpinan sebaya.",
      "Kepala Sekolah menyampaikan rasa bangga dan apresiasi atas dedikasi pembina serta seluruh anggota PMR Wira yang senantiasa menjunjung tinggi nilai kemanusiaan dan sportivitas."
    ]
  },
  {
    id: "spmb-2026-sosialisasi",
    title: "Petunjuk Teknis dan Alur SPMB SMKN 1 Bawang Tahun Ajaran 2026/2027",
    slug: "petunjuk-teknis-spmb-2026-2027",
    excerpt: "Pedoman resmi pendaftaran peserta didik baru SMKN 1 Bawang secara transparan, akuntabel, dan bebas pungutan biaya pendaftaran.",
    date: "28 Mei 2026",
    author: "Panitia SPMB SKANSA",
    category: "Pengumuman",
    isAnnouncement: true,
    circularNumber: "421.5 / 318 / 2026",
    readTime: "4 menit baca",
    tags: ["SPMB", "PPDB", "Jawa Tengah", "Bebas SPP"],
    content: [
      "Berdasarkan Keputusan Kepala Dinas Pendidikan dan Kebudayaan Provinsi Jawa Tengah tentang Petunjuk Teknis Penerimaan Peserta Didik Baru pada Sekolah Menengah Kejuruan Negeri, SMK Negeri 1 Bawang menyelenggarakan proses SPMB Tahun Ajaran 2026/2027 secara transparan dan bebas biaya.",
      "Terdapat 3 jalur seleksi yang dibuka: Jalur Domisili Terdekat (10%), Jalur Afirmasi bagi keluarga prasejahtera dan pemegang KIP/PIP (15%), serta Jalur Prestasi Nilai Rapor dan Kejuaraan (75%) untuk total kuota 720 peserta didik pada 8 Program Keahlian.",
      "Seluruh calon pendaftar diimbau memantau linimasa resmi di portal ppdb.smkn1bawang.sch.id dan dapat memanfaatkan Posko Bantuan di kampus jika memerlukan asistensi teknis."
    ]
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "ach-pmr-2026",
    title: "Juara 1 Invitasi PMR Wira PMI Kabupaten Banjarnegara 2026",
    category: "Inovasi Vokasi",
    year: 2026,
    rank: "Juara 1",
    level: "Kabupaten",
    studentName: "Tim PMR Wira Skansa",
    major: "Palang Merah Remaja (PMR Wira)",
    organizer: "Palang Merah Indonesia (PMI) Kabupaten Banjarnegara",
    description: "Unggul dalam pengujian simulasi pertolongan pertama kedaruratan, evakuasi tandu, dan edukasi kesehatan reproduksi remaja."
  },
  {
    id: "ach-1",
    title: "Medali Emas Information Network Cabling",
    category: "LKS",
    year: 2024,
    rank: "Juara 1 (Medali Emas)",
    level: "Provinsi",
    studentName: "Dicky Pratama Putra",
    major: "Teknik Jaringan Komputer & Telekomunikasi (TJKT)",
    organizer: "Dinas Pendidikan dan Kebudayaan Provinsi Jawa Tengah",
    description: "Meraih skor tertinggi dalam instalasi kabel serat optik berkecepatan tinggi, termination ODF presisi, dan troubleshooting redaman fiber optik."
  },
  {
    id: "ach-2",
    title: "Medali Emas Fashion Technology",
    category: "LKS",
    year: 2024,
    rank: "Juara 1 (Medali Emas)",
    level: "Provinsi",
    studentName: "Dewi Sekar Arum",
    major: "Desain dan Produksi Busana",
    organizer: "Dinas Pendidikan dan Kebudayaan Provinsi Jawa Tengah",
    description: "Kecepatan dan ketelitian sempurna dalam pembuatan pola draping gaun malam serta penjahitan haute couture berstandar internasional."
  },
  {
    id: "ach-3",
    title: "Medali Emas Industrial Automation & Control",
    category: "LKS",
    year: 2024,
    rank: "Juara 1 (Medali Emas)",
    level: "Provinsi",
    studentName: "Aditia Kurniawan & M. Ridho",
    major: "Teknik Elektronika",
    organizer: "Dinas Pendidikan dan Kebudayaan Provinsi Jawa Tengah",
    description: "Perancangan program PLC Siemens S7-1200 dan sistem elektro-pneumatik pemilah objek otomatis bebas eror."
  },
  {
    id: "ach-4",
    title: "Medali Perak Tingkat Nasional - IT Software Solutions",
    category: "LKS",
    year: 2023,
    rank: "Juara 2 (Medali Perak)",
    level: "Nasional",
    studentName: "Muhammad Farhan Al-Ghifari",
    major: "Pengembangan Perangkat Lunak dan Gim (PPLG)",
    organizer: "Puspresnas Kemendikbudristek RI",
    description: "Membangun arsitektur perangkat lunak enterprise lengkap dengan modul analitik dan database relasional dalam durasi 16 jam."
  },
  {
    id: "ach-6",
    title: "Juara 1 LKS Tingkat Provinsi Jawa Tengah - Fishery",
    category: "LKS",
    year: 2024,
    rank: "Juara 1 (Medali Emas)",
    level: "Provinsi",
    studentName: "Wahyu Hidayat Santoso",
    major: "Agribisnis Perikanan Air Tawar (AP)",
    organizer: "Dinas Pendidikan dan Kebudayaan Provinsi Jawa Tengah",
    description: "Ketepatan teknik seleksi indukan, injeksi hormon buatan, serta uji mutu kimia dan biologi kualitas air budidaya."
  },
  {
    id: "ach-7",
    title: "Juara 1 Accounting Skill Competition Jawa Tengah",
    category: "Akademik",
    year: 2024,
    rank: "Juara 1",
    level: "Provinsi",
    studentName: "Dina Tri Utami",
    major: "Akuntansi dan Keuangan Lembaga (AKL)",
    organizer: "Ikatan Akuntan Indonesia (IAI) & Universitas Negeri",
    description: "Akurasi 100% dalam penyelesaian siklus pembukuan akuntansi komprehensif berbasis software Accurate Online."
  }
];

export const STUDENT_WORKS: StudentWorkItem[] = [
  {
    id: "work-poster-sungai",
    title: "Poster Komunikasi Visual: 'Jaga Bersama Sungai Kita'",
    majorCode: "PPLG",
    majorName: "Pengembangan Perangkat Lunak & Gim",
    category: "Aplikasi & Software",
    year: 2026,
    creators: "Lionel Revta Princesa",
    description: "Karya poster komunikasi visual yang dirancang untuk mengkampanyekan pentingnya konservasi ekosistem sungai dan kesadaran lingkungan hidup warga Banjarnegara.",
    technologiesOrMaterials: ["Digital Illustration", "Graphic Design", "Visual Storytelling"],
    impactOrStatus: "Dipublikasikan resmi pada portal etalase karya siswa karya.smkn1bawang.sch.id."
  },
  {
    id: "work-1",
    title: "SIM-Perpus Skansa (Digital Library QR Barcode System)",
    majorCode: "PPLG",
    majorName: "Pengembangan Perangkat Lunak & Gim",
    category: "Aplikasi & Software",
    year: 2025,
    creators: "M. Farhan, Fajar Rizky & Tim Studio PPLG",
    description: "Platform otomasi perpustakaan terpadu yang menggabungkan kartu pelajar QR Code untuk peminjaman mandiri, pencarian katalog OPAC instan, dan kalkulasi otomatis masa peminjaman buku.",
    technologiesOrMaterials: ["React.js", "TypeScript", "Node.js", "PostgreSQL", "QR Code Engine"],
    impactOrStatus: "Diimplementasikan aktif di Perpustakaan Graha Pustaka SMKN 1 Bawang untuk 2.100 siswa."
  },
  {
    id: "work-2",
    title: "Koleksi Busana 'Pesona Dieng' (Ecoprint Kontemporer)",
    majorCode: "BUSANA",
    majorName: "Desain dan Produksi Busana",
    category: "Desain Busana",
    year: 2024,
    creators: "Dewi Sekar Arum, Siti Maesaroh & Tim Butik Skansa",
    description: "Rancangan 8 set busana ready-to-wear yang memadukan teknik ecoprint daun jati pegunungan Banjarnegara dengan siluet blazer tailoring modern yang elegan.",
    technologiesOrMaterials: ["Kain Sutra & Katun Prima", "Pewarna Alam Daun Jati & Mahoni", "Teknik Tailoring Halus"],
    impactOrStatus: "Dipentaskan di catwalk Jogja Fashion Week dan dipesan oleh pejabat daerah sebagai seragam kenegaraan."
  },
  {
    id: "work-3",
    title: "Smart Greenhouse & Otomasi Nutrisi Tanaman IoT",
    majorCode: "TE",
    majorName: "Teknik Elektronika",
    category: "IoT & Elektronika",
    year: 2024,
    creators: "Aditia Kurniawan, Suwarno & Tim Otomasi",
    description: "Perangkat pengendali iklim mikro pertanian hortikultura berbasis mikrokontroler ESP32, katup selenoid irigasi tetes otomatis, dan panel surya mandiri energi 100Wp.",
    technologiesOrMaterials: ["ESP32 Microcontroller", "Soil Moisture & Temp Sensor", "Blynk IoT Cloud", "Solar PV System"],
    impactOrStatus: "Digunakan di kebun percontohan hidroponik sekolah dan kelompok tani Bawang."
  },
  {
    id: "work-4",
    title: "Nila Crispy & Abon Ikan Nila Bioflok 'Skansa Fish'",
    majorCode: "AP",
    majorName: "Agribisnis Perikanan Air Tawar",
    category: "Produk Olahan",
    year: 2024,
    creators: "Wahyu Hidayat & Siswa Praktik Pasca Panen AP",
    description: "Diversifikasi hasil panen bioflok kolam sekolah menjadi olahan pangan higienis bernutrisi tinggi dengan kemasan vacuum foil tahan simpan hingga 6 bulan tanpa pengawet kimia.",
    technologiesOrMaterials: ["Daging Nila Segar Kolam Bioflok", "Rempah Alami Nusantara", "Mesin Spinner Peniris Minyak"],
    impactOrStatus: "Mendapat sertifikasi PIRT & Halal Kemenag, dipasarkan melalui Skansa Mart."
  },
  {
    id: "work-5",
    title: "Dawet Ayu Quest: 2D Cultural Adventure Game",
    majorCode: "PPLG",
    majorName: "Pengembangan Perangkat Lunak & Gim",
    category: "Aplikasi & Software",
    year: 2024,
    creators: "Annisa Rahmawati, Bagas Satria & Tim Game",
    description: "Gim platformer edukatif bernuansa lokal di mana pemain memecahkan teka-teki sejarah Banjarnegara, mengumpulkan bahan pembuatan minuman khas Dawet Ayu, dan menjelajahi Candi Arjuna.",
    technologiesOrMaterials: ["Godot Game Engine", "GDScript", "Aseprite Pixel Art", "Chiptune Audio"],
    impactOrStatus: "Juara 1 Gelar Karya Teknologi Inovasi Pelajar Jawa Tengah."
  },
  {
    id: "work-6",
    title: "Layanan Asistensi Pelaporan SPT Tahunan UMKM (Tax Clinic)",
    majorCode: "AKL",
    majorName: "Akuntansi dan Keuangan Lembaga",
    category: "Karya Bisnis",
    year: 2025,
    creators: "Dina Tri Utami & Mahasiswa Asosiasi AKL",
    description: "Pelayanan konsultasi pembukuan sederhana dan pengisian laporan SPT Tahunan PPh Orang Pribadi & UMKM bagi warga sekitar sekolah.",
    technologiesOrMaterials: ["DJP Online System", "Excel Accounting Model", "Buku Kas Sederhana"],
    impactOrStatus: "Telah melayani lebih dari 450 pelaku usaha mikro dan guru secara cuma-cuma."
  }
];
