export interface IndustryPartnerItem {
  id: string;
  majorName: string; // Kompetensi Keahlian
  majorCode: string; // Short code
  concentrationName: string; // Konsentrasi Keahlian
  companyName: string; // Mitra Industri
  location: string;
  scope: string[]; // e.g. Kelas Industri, PKL/Magang, Uji Sertifikasi
  description: string;
  batchYear: string;
  mouStatus: 'Aktif' | 'Mitra Utama' | 'Prioritas';
  logoUrl?: string;
}

export const INDUSTRY_PARTNERS_CHARTER = {
  title: "Mitra Industri SMK Negeri 1 Bawang",
  description: 
    "Mitra Industri SMK Negeri 1 Bawang adalah sebuah kemitraan antara sekolah dan industri untuk meningkatkan kualitas pendidikan vokasi dan kesiapan kerja siswa. Melalui kerjasama ini, siswa mendapatkan kesempatan untuk berlatih langsung di dunia kerja, memahami kebutuhan industri, dan mempersiapkan diri dengan keterampilan yang relevan. Program ini juga melibatkan berbagai pelatihan, magang, dan workshop yang disesuaikan dengan perkembangan industri terkini, guna menciptakan lulusan yang kompeten dan siap pakai di pasar tenaga kerja.",
  totalPartnersCount: "160+",
  activeMOUPercentage: "100%",
  internshipCost: "Rp 0 (Didanai Penuh)",
};

export const INDUSTRY_PARTNERS_LIST: IndustryPartnerItem[] = [
  {
    id: "dudika-01",
    majorName: "Teknik Elektronika",
    majorCode: "TE",
    concentrationName: "Teknik Mekatronika",
    companyName: "CV. MATARAM KARYA",
    location: "Yogyakarta / Jawa Tengah",
    scope: ["Kelas Industri Mekatronika", "Magang & PKL 6 Bulan", "Sinkronisasi Modul PLC & Otomasi Pabrik"],
    description: "Kemitraan strategis perakitan sistem otomasi industri, pemrograman PLC (Programmable Logic Controller), dan pemeliharaan mesin manufaktur mekatronika modern.",
    batchYear: "2026/2027",
    mouStatus: "Mitra Utama"
  },
  {
    id: "dudika-02",
    majorName: "Pengembangan Perangkat Lunak dan Gim",
    majorCode: "PPLG",
    concentrationName: "Rekayasa Perangkat Lunak",
    companyName: "PT. TRASPAC MAKMUR SEJAHTERA JAKARTA",
    location: "Jakarta",
    scope: ["Guru Tamu Traspac Mengajar", "Magang Software Engineer", "Inkubasi Kurikulum React & Flutter", "Simulasi USK"],
    description: "Perusahaan solusi perangkat lunak enterprise nasional. Memfasilitasi program guru tamu reguler, magang remote dan on-site untuk pengembangan web dan mobile, serta sertifikasi USK.",
    batchYear: "2026/2027",
    mouStatus: "Mitra Utama",
    logoUrl: "/images/partners/pt_traspac_makmur_sejahtera_logo.png"
  },
  {
    id: "dudika-03",
    majorName: "Pengembangan Perangkat Lunak dan Gim",
    majorCode: "PPLG",
    concentrationName: "Pengembangan Gim",
    companyName: "PT. CIKARA BAKTI NUSANTARA TASIKMALAYA",
    location: "Tasikmalaya, Jawa Barat",
    scope: ["Produksi Gim Edukatif", "Mentoring Unity & Unreal Engine", "Sertifikasi Asesor Industri"],
    description: "Studio pengembangan konten kreatif dan game studio terkemuka. Terlibat dalam pendampingan pembuatan prototype gim edukasi dan aset interaktif 2D/3D siswa.",
    batchYear: "2026/2027",
    mouStatus: "Aktif"
  },
  {
    id: "dudika-04",
    majorName: "Teknik Jaringan Komputer dan Telekomunikasi",
    majorCode: "TJKT",
    concentrationName: "Teknik Komputer dan Jaringan",
    companyName: "PT Indonesia Comnets Plus Region Jateng & DIY",
    location: "Semarang & DIY (PLN Icon+)",
    scope: ["Infrastruktur Fiber Optic", "Sertifikasi Teknisi Jaringan", "Praktik Splicing Lapangan"],
    description: "Anak perusahaan PT PLN (Persero) di bidang telekomunikasi dan jaringan kabel serat optik berkecepatan tinggi di regional Jawa Tengah & DIY.",
    batchYear: "2026/2027",
    mouStatus: "Mitra Utama",
    logoUrl: "/images/partners/icon_plus_regional_jateng.jpg"
  },
  {
    id: "dudika-pasi",
    majorName: "Agribisnis Perikanan",
    majorCode: "AP",
    concentrationName: "Agribisnis Perikanan Air Tawar",
    companyName: "Perhimpunan Akuakultur Seluruh Indonesia (PASI)",
    location: "Jawa Tengah & Nasional",
    scope: ["Standardisasi Budidaya Bioflok", "Sertifikasi Cara Budidaya Ikan yang Baik (CBIB)", "Penyaluran Hasil Panen"],
    description: "Asosiasi praktisi dan industri akuakultur terkemuka yang mendampingi penerapan teknologi bioflok modern ramah lingkungan di kolam praktik sekolah.",
    batchYear: "2026/2027",
    mouStatus: "Mitra Utama",
    logoUrl: "/images/partners/pasi_logo.png"
  },
  {
    id: "dudika-05",
    majorName: "Agribisnis Perikanan",
    majorCode: "AP",
    concentrationName: "Agribisnis Perikanan Payau dan Laut",
    companyName: "PT. Maju Tambak Sumur Lampung",
    location: "Lampung, Sumatera",
    scope: ["Budidaya Tambak Udang Modern", "Manajemen Kualitas Air", "Penyaluran Kerja Langsung"],
    description: "Sentra akuakultur tambak udang vaname dan biota payau modern berskala industri ekspor dengan fasilitas riset kualitas air mutakhir.",
    batchYear: "2026/2027",
    mouStatus: "Prioritas"
  },
  {
    id: "dudika-06",
    majorName: "Agribisnis Perikanan",
    majorCode: "AP",
    concentrationName: "Agribisnis Perikanan Air Tawar",
    companyName: "PT. Central Pangan Pertiwi",
    location: "Sidoarjo / Jawa Tengah (CP Prima)",
    scope: ["Pakan Nutrisi Perikanan", "Teknologi Bioflok Presisi", "Beasiswa & Bimbingan Industri"],
    description: "Produsen pakan ikan dan benih budidaya perikanan air tawar terbesar di Indonesia. Mitra utama teaching factory bioflok SMKN 1 Bawang.",
    batchYear: "2026/2027",
    mouStatus: "Mitra Utama"
  },
  {
    id: "dudika-07",
    majorName: "Pemasaran",
    majorCode: "PM",
    concentrationName: "Bisnis Digital",
    companyName: "PT Kombas Digital Kreatifa",
    location: "Purwokerto / Banjarnegara",
    scope: ["Digital Marketing Agency", "Live Commerce & SEO", "Prakerin Digital Marketer"],
    description: "Agensi pemasaran digital dan inkubator bisnis online terdepan di Jawa Tengah. Mendukung kurikulum live selling dan optimasi marketplace siswa.",
    batchYear: "2026/2027",
    mouStatus: "Aktif"
  },
  {
    id: "dudika-08",
    majorName: "Pemasaran",
    majorCode: "PM",
    concentrationName: "Bisnis Retail",
    companyName: "PT Sumber Alfaria Trijaya, Tbk",
    location: "Cilacap / Seluruh Indonesia (Alfamart)",
    scope: ["Kelas Industri Alfamart Class", "Laboratorium Business Center", "Jaminan Kerja Lulusan"],
    description: "Jaringan minimarket ritel terbesar nasional dengan program 'Alfamart Class' resmi di SKANSA, menjamin lulusan langsung diangkat sebagai Store Supervisor.",
    batchYear: "2026/2027",
    mouStatus: "Mitra Utama"
  },
  {
    id: "dudika-09",
    majorName: "Manajemen Perkantoran dan Layanan Bisnis",
    majorCode: "MPLB",
    concentrationName: "Manajemen Perkantoran",
    companyName: "PT Pikas Kreata Nusantara",
    location: "Banjarnegara",
    scope: ["Public Relations & Protokoler", "Kearsipan Digital", "Event Management"],
    description: "Badan usaha manajemen hospitality, pariwisata, dan korporat ternama di Banjarnegara yang mengasah keahlian administrasi dan layanan front-office siswa.",
    batchYear: "2026/2027",
    mouStatus: "Aktif"
  },
  {
    id: "dudika-10",
    majorName: "Manajemen Perkantoran dan Layanan Bisnis",
    majorCode: "MPLB",
    concentrationName: "Manajemen Logistik",
    companyName: "PT POS Indonesia Banjarnegara",
    location: "Banjarnegara (Kantor Pos Persero)",
    scope: ["Manajemen Rantai Pasok", "Layanan Paket & Logistik", "Pengelolaan Dokumen Resmi"],
    description: "BUMN penyedia jasa kurir, logistik, dan transaksi keuangan nasional. Memfasilitasi praktik operasional rantai pasok dan administrasi surat kedinasan.",
    batchYear: "2026/2027",
    mouStatus: "Mitra Utama"
  },
  {
    id: "dudika-11",
    majorName: "Akuntansi dan Keuangan Lembaga",
    majorCode: "AKL",
    concentrationName: "Layanan Perbankan",
    companyName: "PT. BPR Surya Yudha Kencana",
    location: "Banjarnegara & Eks-Karesidenan Banyumas",
    scope: ["Kelas Industri Perbankan", "Laboratorium Bank Mini", "Rekrutmen Customer Service & Teller"],
    description: "Bank Perekonomian Rakyat terbesar di regional Jawa Tengah. Mendampingi operasional Bank Mini SKANSA dan modul transaksi perbankan mikro.",
    batchYear: "2026/2027",
    mouStatus: "Mitra Utama"
  },
  {
    id: "dudika-12",
    majorName: "Akuntansi dan Keuangan Lembaga",
    majorCode: "AKL",
    concentrationName: "Akuntansi",
    companyName: "Bumdesma UPK Bawang Delapan Belas Satu, Lkd",
    location: "Kecamatan Bawang, Banjarnegara",
    scope: ["Audit Keuangan Badan Usaha", "Perpajakan UMKM", "Praktik Software Akuntansi"],
    description: "Lembaga keuangan komunitas dan pengelola dana bergulir ekonomi desa terkemuka di Kecamatan Bawang untuk praktik pembukuan akuntansi riil.",
    batchYear: "2026/2027",
    mouStatus: "Aktif"
  },
  {
    id: "dudika-13",
    majorName: "Busana",
    majorCode: "BS",
    concentrationName: "Desain dan Produksi Busana",
    companyName: "Jaka Febriant House Of Chang & PT. Pasifik Indo Garment",
    location: "Semarang & Pekalongan",
    scope: ["Haute Couture & Atelier Mode", "Garmen Ekspor Skala Industri", "Pentas Peragaan Catwalk"],
    description: "Kemitraan rumah mode perancang busana ternama dan pabrik garmen ekspor, membimbing siswa dalam pembuatan busana adibusana hingga produksi massal garmen.",
    batchYear: "2026/2027",
    mouStatus: "Mitra Utama"
  }
];

export interface BKKJobVacancy {
  id: string;
  companyName: string;
  position: string;
  majorCode: string;
  majorName: string;
  location: string;
  qualification: string;
  quota: string;
  deadline: string;
  status: 'Pendaftaran Dibuka' | 'Segera Ditutup' | 'Proses Seleksi';
}

export const BKK_STATS = {
  bmwRate: {
    work: 76,
    study: 14,
    entrepreneur: 10
  },
  registeredAlumniCount: "12.400+",
  activePartnerHiringCount: "48 Perusahaan",
  averageHiringTime: "Sebelum Wisuda / Kelulusan"
};

export const BKK_JOB_VACANCIES: BKKJobVacancy[] = [
  {
    id: "job-01",
    companyName: "PT. TRASPAC MAKMUR SEJAHTERA (Jakarta)",
    position: "Junior Frontend Developer & QA Tester",
    majorCode: "PPLG",
    majorName: "Pengembangan Perangkat Lunak dan Gim",
    location: "Jakarta (Hybrid / Remote)",
    qualification: "Lulusan PPLG/RPL, menguasai dasar React/JavaScript/Git, portofolio proyek terverifikasi.",
    quota: "8 Orang",
    deadline: "15 Oktober 2026",
    status: "Pendaftaran Dibuka"
  },
  {
    id: "job-02",
    companyName: "PT Indonesia Comnets Plus (PLN Icon+)",
    position: "Teknisi Jaringan & Splicer Fiber Optik",
    majorCode: "TJKT",
    majorName: "Teknik Jaringan Komputer dan Telekomunikasi",
    location: "Semarang & Eks-Karesidenan Banyumas",
    qualification: "Lulusan TJKT, memiliki sertifikat kompetensi LSP/BNSP Jaringan, tidak buta warna.",
    quota: "12 Orang",
    deadline: "20 Oktober 2026",
    status: "Pendaftaran Dibuka"
  },
  {
    id: "job-03",
    companyName: "PT. BPR Surya Yudha Kencana",
    position: "Customer Service & Staf Operasional Kas",
    majorCode: "AKL",
    majorName: "Akuntansi dan Keuangan Lembaga",
    location: "Banjarnegara & Purwokerto",
    qualification: "Lulusan AKL/MPLB, teliti, menguasai pembukuan dasar dan perbankan komputer.",
    quota: "6 Orang",
    deadline: "10 Oktober 2026",
    status: "Segera Ditutup"
  },
  {
    id: "job-04",
    companyName: "Program Pemagangan Industri Jepang (IM Japan / Kemnaker)",
    position: "Peserta Magang Manufaktur & Tekstil Busana",
    majorCode: "TE / BUSANA",
    majorName: "Teknik Elektronika & Desain Busana",
    location: "Prefektur Aichi & Osaka, Jepang",
    qualification: "Lulusan SMK, fisik prima, lulus tes kesamaptaan & pembinaan bahasa Jepang dasar.",
    quota: "15 Orang",
    deadline: "30 Oktober 2026",
    status: "Pendaftaran Dibuka"
  },
  {
    id: "job-05",
    companyName: "CV. Mataram Karya Otomasi",
    position: "Teknisi Pemeliharaan Mesin & PLC",
    majorCode: "TE",
    majorName: "Teknik Elektronika",
    location: "Yogyakarta",
    qualification: "Lulusan TE/Mekatronika, memahami wiring diagram industri dan logika PLC dasar.",
    quota: "5 Orang",
    deadline: "25 Oktober 2026",
    status: "Pendaftaran Dibuka"
  }
];
