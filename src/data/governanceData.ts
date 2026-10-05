/**
 * Data Struktur Organisasi & Tata Kelola Kelembagaan SMK Negeri 1 Bawang (SKANSA)
 * Berdasarkan Regulasi Dinas Pendidikan dan Kebudayaan Provinsi Jawa Tengah
 * Satuan Pendidikan: Cabang Dinas Pendidikan Wilayah X
 */

export interface GovernanceNode {
  id: string;
  role: string;
  title: string;
  person: string;
  nip?: string;
  category: 'regulator' | 'leadership' | 'advisory' | 'administration' | 'management' | 'vocational' | 'special_unit';
  lineType: 'solid' | 'dashed';
  department?: string;
  badge?: string;
  tupoksi: string[];
  parentId?: string;
  subordinates?: string[];
  reportsToText?: string;
  iconName?: string;
  cluster?: 'rekayasa_teknologi' | 'bisnis_kreatif' | 'agribisnis' | 'layanan_khusus';
}

export const DISDIKBUD_REGULATION_INFO = {
  province: "Pemerintah Provinsi Jawa Tengah",
  office: "Dinas Pendidikan dan Kebudayaan Provinsi Jawa Tengah",
  branch: "Cabang Dinas Pendidikan Wilayah X (Banjarnegara, Purbalingga, Banyumas)",
  legalBasis: "Peraturan Gubernur Jawa Tengah Nomor 27 Tahun 2018 tentang Organisasi dan Tata Kerja Satuan Pendidikan SMK Negeri pada Dinas Pendidikan dan Kebudayaan Provinsi Jawa Tengah serta Pedoman Implementasi SMK Pusat Keunggulan.",
  status: "SMK Pusat Keunggulan (Center of Excellence), SPP Bebas Biaya Rp 0 Didanai APBD Pemprov Jateng"
};

export const VOCATIONAL_CLUSTERS = {
  rekayasa_teknologi: {
    title: "Rumpun Teknologi & Komputasi",
    description: "Pengembangan software, jaringan fiber optik, dan rekayasa elektronika industri."
  },
  bisnis_kreatif: {
    title: "Rumpun Bisnis, Manajemen & Busana",
    description: "Akuntansi keuangan digital, tata kelola kantor modern, ritel, dan desain adibusana."
  },
  agribisnis: {
    title: "Rumpun Agribisnis Perikanan",
    description: "Pembenihan, budidaya air tawar bioflok, dan pasokan hasil perikanan mandiri."
  }
};

export const GOVERNANCE_NODES: GovernanceNode[] = [
  // 1. Instansi Pembina / Regulator Atas
  {
    id: "disdikbud",
    role: "Instansi Pembina & Regulator",
    title: "Dinas Pendidikan dan Kebudayaan Provinsi Jawa Tengah",
    person: "Cabang Dinas Pendidikan Wilayah X",
    category: "regulator",
    lineType: "solid",
    department: "Pemerintah Provinsi Jawa Tengah",
    badge: "Instansi Pembina",
    tupoksi: [
      "Penetapan kebijakan teknis operasional dan regulasi kelembagaan SMK Negeri di Jawa Tengah.",
      "Penyaluran dan supervisi program Bantuan Operasional Pendidikan (BOP) serta jaminan bebas SPP Rp 0.",
      "Pengawasan standardisasi mutu pendidikan, akreditasi, dan kenaikan jenjang pendidik/tenaga kependidikan.",
      "Fasilitasi penugasan Kepala Sekolah dan pengawas pembina kejuruan tingkat provinsi."
    ],
    subordinates: ["kepsek"],
    reportsToText: "Gubernur Jawa Tengah"
  },

  // 2. Pimpinan Tertinggi Sekolah (Kepala Sekolah)
  {
    id: "kepsek",
    role: "Pimpinan Satuan Pendidikan",
    title: "Plt. Kepala SMK Negeri 1 Bawang",
    person: "Drs. Khairul Sholih Retnobroto, M.M.",
    nip: "19670622 199203 1 004",
    category: "leadership",
    lineType: "solid",
    department: "Pimpinan Lembaga",
    badge: "Plt. Kepala Sekolah",
    parentId: "disdikbud",
    reportsToText: "Kepala Dinas Pendidikan dan Kebudayaan Provinsi Jawa Tengah",
    tupoksi: [
      "Memimpin penyelenggaraan fungsi manajerial, pengembangan kewirausahaan, dan supervisi pendidik/tenaga kependidikan.",
      "Menetapkan Rencana Kerja Jangka Menengah (RKJM), Rencana Kerja Tahunan (RKT), serta Rencana Kegiatan dan Anggaran Sekolah (RKAS).",
      "Mengambil kebijakan strategis pelaksanaan Kurikulum Merdeka Vokasi dan kemitraan 160+ industri mitra (DUDIKA).",
      "Bertindak sebagai Kuasa Pengguna Anggaran (KPA) untuk dana BOS Nasional dan BOP Provinsi Jawa Tengah.",
      "Menandatangani ijazah kelulusan, sertifikat kompetensi keahlian, dan dokumen akreditasi resmi negara."
    ],
    subordinates: ["komite", "spmi", "tu", "waka-kurikulum", "waka-kesiswaan", "waka-hubin", "waka-sarpras"]
  },

  // 3. Unsur Pertimbangan & Kemitraan Masyarakat (Garis Koordinasi / Dashed)
  {
    id: "komite",
    role: "Badan Pertimbangan & Pengawasan",
    title: "Komite Sekolah",
    person: "H. Ahmad Fauzi, S.H.",
    category: "advisory",
    lineType: "dashed",
    department: "Kemitraan Masyarakat & Dunia Usaha",
    badge: "Mitra Konsultatif",
    parentId: "kepsek",
    reportsToText: "Mitra Pertimbangan Sejajar Kepala Sekolah",
    tupoksi: [
      "Memberikan pertimbangan dalam penentuan dan pelaksanaan kebijakan pendidikan di SMK Negeri 1 Bawang.",
      "Menggalang partisipasi masyarakat, tokoh industri, dan alumni untuk percepatan sarana prasarana sekolah.",
      "Melakukan pengawasan transparansi dan akuntabilitas penyelenggaraan serta keluaran pendidikan.",
      "Menampung dan menganalisis aspirasi, ide, tuntutan, serta berbagai kebutuhan pendidikan yang diajukan oleh masyarakat."
    ]
  },

  // 4. Penjaminan Mutu Internal (Garis Koordinasi / Dashed)
  {
    id: "spmi",
    role: "Tim Penjaminan Mutu",
    title: "Tim Penjaminan Mutu Pendidikan Sekolah (TPMPS)",
    person: "Koordinator & Tim SPMI Skansa",
    category: "advisory",
    lineType: "dashed",
    department: "Manajemen Mutu Internal",
    badge: "Standar Penjaminan Mutu",
    parentId: "kepsek",
    reportsToText: "Bertanggung Jawab kepada Kepala Sekolah",
    tupoksi: [
      "Mengembangkan Sistem Penjaminan Mutu Internal (SPMI) berbasis 8 Standar Nasional Pendidikan (SNP).",
      "Melakukan audit kepatuhan mutu proses belajar-mengajar, bengkel kejuruan, dan sistem administrasi berkala.",
      "Menyusun rekomendasi perbaikan mutu berkelanjutan (Kaizen) bagi seluruh unit kerja di lingkungan SKANSA.",
      "Menyiapkan instrumen evaluasi diri sekolah (EDS) untuk akreditasi BAN-SM dan pemantauan SMK Pusat Keunggulan."
    ]
  },

  // 5. Unsur Pelaksana Administrasi (Tata Usaha)
  {
    id: "tu",
    role: "Kepala Pelaksana Administrasi",
    title: "Kepala Sub Bagian Tata Usaha (Kasubbag TU)",
    person: "Umi Baroroh, S.E., M.M.",
    nip: "19740510 199802 2 001",
    category: "administration",
    lineType: "solid",
    department: "Subbagian Tata Usaha",
    badge: "Administrasi & Kepegawaian",
    parentId: "kepsek",
    reportsToText: "Kepala Sekolah & Cabang Dinas Wilayah X",
    tupoksi: [
      "Mengelola administrasi kepegawaian 142 guru dan 26 tenaga kependidikan (kenaikan pangkat, KGB, sertifikasi, presensi).",
      "Menyelenggarakan pembukuan, perbendaharaan, serta SPJ akuntansi dana BOS reguler dan BOP Provinsi Jawa Tengah.",
      "Mengelola persuratan kedinasan, kearsipan persuratan digital, dan dokumen hukum sekolah.",
      "Mengoordinasikan urusan kerumahtanggaan, keamanan kampus 24 jam, dan kebersihan lingkungan sekolah seluas 3+ hektar."
    ],
    subordinates: ["tu-keuangan", "tu-kepegawaian", "tu-persuratan"]
  },

  // 6. Wakil Kepala Sekolah Bidang Kurikulum
  {
    id: "waka-kurikulum",
    role: "Manajemen Akademik & Pembelajaran",
    title: "Waka Bidang Kurikulum",
    person: "Istina Pujiyanti, S.Kom",
    nip: "19780812 200501 2 011",
    category: "management",
    lineType: "solid",
    department: "Bidang Akademik",
    badge: "Wakil Kepala Sekolah",
    parentId: "kepsek",
    reportsToText: "Kepala Sekolah",
    tupoksi: [
      "Menyusun Kurikulum Operasional Satuan Pendidikan (KOSP) terintegrasi kurikulum industri dan profil pelajar Pancasila.",
      "Menyusun jadwal pembelajaran, pembagian jam mengajar guru, dan kalender akademik tahunan.",
      "Mengoordinasikan pelaksanaan Penilaian Sumatif, Asesmen Nasional (ANBK), dan Uji Kompetensi Keahlian (UKK).",
      "Membina Musyawarah Guru Mata Pelajaran (MGMP) internal dan peningkatan kompetensi pedagogik guru kejuruan."
    ],
    subordinates: [
      "kaprog-pplg", 
      "kaprog-tjkt", 
      "kaprog-elka", 
      "kaprog-busana", 
      "kaprog-akl", 
      "kaprog-pemasaran", 
      "kaprog-mplb", 
      "kaprog-perikanan"
    ]
  },

  // 7. Wakil Kepala Sekolah Bidang Kesiswaan
  {
    id: "waka-kesiswaan",
    role: "Pembinaan Karakter & Siswa",
    title: "Waka Bidang Kesiswaan",
    person: "Dra. Sri Mulyani, M.Si.",
    nip: "19690315 199412 2 002",
    category: "management",
    lineType: "solid",
    department: "Bidang Kesiswaan",
    badge: "Wakil Kepala Sekolah",
    parentId: "kepsek",
    reportsToText: "Kepala Sekolah",
    tupoksi: [
      "Menyelenggarakan Masa Pengenalan Lingkungan Sekolah (MPLS) dan pembinaan kedisiplinan berkarakter vokasi.",
      "Membimbing kepengurusan Organisasi Siswa Intra Sekolah (OSIS) dan Majelis Perwakilan Kelas (MPK).",
      "Mengoordinasikan 10 cabang ekstrakurikuler serta persiapan kontingen LKS, POPDA, dan FLS2N.",
      "Mengelola beasiswa Program Indonesia Pintar (PIP), beasiswa prestasi, dan layanan kesejahteraan siswa."
    ],
    subordinates: ["bk", "osis"]
  },

  // 8. Wakil Kepala Sekolah Bidang Hubungan Industri & Humas
  {
    id: "waka-hubin",
    role: "Kemitraan DUDIKA & Keterserapan",
    title: "Waka Bidang Hubungan Masyarakat & Hubungan Industri",
    person: "Ir. Joko Susilo, S.T., M.Eng.",
    nip: "19730421 200003 1 003",
    category: "management",
    lineType: "solid",
    department: "Kemitraan Industri (DUDIKA)",
    badge: "Wakil Kepala Sekolah",
    parentId: "kepsek",
    reportsToText: "Kepala Sekolah",
    tupoksi: [
      "Menjalin dan memperluas kerjasama strategis (MoU) dengan 160+ industri skala nasional maupun multinasional.",
      "Mengatur penempatan, monitoring, dan evaluasi Praktik Kerja Lapangan (PKL) / magang industri siswa selama 6 bulan.",
      "Mengoordinasikan operasional Bursa Kerja Khusus (BKK) untuk rekrutmen kerja dan penyaluran tamatan (target keterserapan > 85%).",
      "Memfasilitasi guru tamu praktisi industri dan program magang guru bersertifikat industri."
    ],
    subordinates: ["bkk", "lsp", "tefa-center"]
  },

  // 9. Wakil Kepala Sekolah Bidang Sarana & Prasarana
  {
    id: "waka-sarpras",
    role: "Fasilitas & Infrastruktur Kampus",
    title: "Waka Bidang Sarana & Prasarana",
    person: "Heru Prasetyo, S.Pd., M.T.",
    nip: "19760918 200604 1 009",
    category: "management",
    lineType: "solid",
    department: "Infrastruktur & Aset",
    badge: "Wakil Kepala Sekolah",
    parentId: "kepsek",
    reportsToText: "Kepala Sekolah",
    tupoksi: [
      "Menginventarisasi dan mengelola sarana 8 laboratorium komputer, workshop busana, bengkel elektronika, dan kolam bioflok.",
      "Menyusun program pemeliharaan preventif, perbaikan gedung, utilitas listrik industri, dan jaringan internet kampus.",
      "Menerapkan protokol Keselamatan dan Kesehatan Kerja (K3) serta manajemen fasilitas ramah lingkungan (Adiwiyata).",
      "Merencanakan pengadaan peralatan praktik teknologi tinggi standar industri sesuai alokasi DAK/BOS."
    ]
  },

  // 10-17. 8 Kepala Program Keahlian (Kaprog)
  {
    id: "kaprog-pplg",
    role: "Kepala Program Keahlian",
    title: "Pengembangan Perangkat Lunak dan Gim (PPLG)",
    person: "Budi Santoso, S.Kom.",
    category: "vocational",
    cluster: "rekayasa_teknologi",
    lineType: "solid",
    department: "Jurusan Rekayasa Perangkat Lunak",
    badge: "Kaprog Kejuruan",
    parentId: "waka-kurikulum",
    reportsToText: "Waka Kurikulum & Waka Hubin",
    tupoksi: [
      "Memimpin kurikulum kejuruan coding web modern, mobile development, dan media gim interaktif.",
      "Mengelola 8 Lab Komputer High-Spec RTX dan unit TeFa Skansa Software House.",
      "Menyelenggarakan sinkronisasi materi bersama industri teknologi dan pengujian sertifikasi LSP-P1."
    ],
    subordinates: []
  },
  {
    id: "kaprog-tjkt",
    role: "Kepala Program Keahlian",
    title: "Teknik Jaringan Komputer dan Telekomunikasi (TJKT)",
    person: "Agus Triyono, S.T.",
    category: "vocational",
    cluster: "rekayasa_teknologi",
    lineType: "solid",
    department: "Jurusan Komputer & Jaringan",
    badge: "Kaprog Kejuruan",
    parentId: "waka-kurikulum",
    reportsToText: "Waka Kurikulum & Waka Hubin",
    tupoksi: [
      "Memimpin kompetensi instalasi serat optik (fiber optic), Cisco network, administrasi server Linux, dan cloud computing.",
      "Mengelola Lab Fiber Optik, perangkat fusion splicer, dan server rack 42U.",
      "Mengarahkan sertifikasi internasional Mikrotik/Cisco dan unit usaha pemasangan jaringan internet."
    ],
    subordinates: []
  },
  {
    id: "kaprog-elka",
    role: "Kepala Program Keahlian",
    title: "Teknik Elektronika",
    person: "Endro Wibowo, S.Pd.",
    category: "vocational",
    cluster: "rekayasa_teknologi",
    lineType: "solid",
    department: "Jurusan Mekatronika & IoT",
    badge: "Kaprog Kejuruan",
    parentId: "waka-kurikulum",
    reportsToText: "Waka Kurikulum & Waka Hubin",
    tupoksi: [
      "Mengembangkan pembelajaran mikrokontroler, Programmable Logic Controller (PLC), sensor IoT, dan otomasi industri.",
      "Mengelola bengkel elektronika, mesin 3D printing, dan alat uji osiloskop digital.",
      "Membina perakitan piranti cerdas pemantau pertanian dan kendali hidroponik cerdas."
    ],
    subordinates: []
  },
  {
    id: "kaprog-busana",
    role: "Kepala Program Keahlian",
    title: "Desain dan Produksi Busana (Tata Busana)",
    person: "Tri Wahyuni, S.Pd.",
    category: "vocational",
    cluster: "bisnis_kreatif",
    lineType: "solid",
    department: "Jurusan Tata Busana",
    badge: "Kaprog Kejuruan",
    parentId: "waka-kurikulum",
    reportsToText: "Waka Kurikulum & Waka Hubin",
    tupoksi: [
      "Memimpin desain busana adibusana, pembuatan pola digital CAD, teknik jahit garmen industri, dan eksplorasi batik motif Banjarnegara.",
      "Mengelola workshop garmen high-speed Juki/Brother dan butik Skansa Fashion Studio.",
      "Menjalankan pesanan produksi seragam institusi dan peragaan busana (Fashion Show) berkala."
    ],
    subordinates: []
  },
  {
    id: "kaprog-akl",
    role: "Kepala Program Keahlian",
    title: "Akuntansi dan Keuangan Lembaga (AKL)",
    person: "Dewi Lestari, S.E., M.Akt.",
    category: "vocational",
    cluster: "bisnis_kreatif",
    lineType: "solid",
    department: "Jurusan Keuangan & Akuntansi",
    badge: "Kaprog Kejuruan",
    parentId: "waka-kurikulum",
    reportsToText: "Waka Kurikulum & Waka Hubin",
    tupoksi: [
      "Memimpin kompetensi akuntansi keuangan, perpajakan digital, perbankan syariah, dan software komputer akuntansi (MYOB/Accurate).",
      "Mengoperasikan laboratorium Bank Mini Syariah Skansa sebagai sentra transaksi tunai siswa.",
      "Membuka Tax Center asistensi pelaporan SPT tahunan bekerjasama dengan Kantor Pelayanan Pajak (KPP)."
    ],
    subordinates: []
  },
  {
    id: "kaprog-pemasaran",
    role: "Kepala Program Keahlian",
    title: "Pemasaran (Bisnis Digital & Retail)",
    person: "Rahmat Hidayat, S.Pd.",
    category: "vocational",
    cluster: "bisnis_kreatif",
    lineType: "solid",
    department: "Jurusan Bisnis Daring & Retail",
    badge: "Kaprog Kejuruan",
    parentId: "waka-kurikulum",
    reportsToText: "Waka Kurikulum & Waka Hubin",
    tupoksi: [
      "Memimpin pembelajaran strategi digital marketing, SEO, social commerce live streaming, dan operasional ritel modern.",
      "Mengelola minimarket Skansa Mart dan platform penjualan produk Teaching Factory siswa.",
      "Menyelenggarakan inkubasi kewirausahaan muda dan kerjasama jaringan ritel Alfamart/Indomaret Class."
    ],
    subordinates: []
  },
  {
    id: "kaprog-mplb",
    role: "Kepala Program Keahlian",
    title: "Manajemen Perkantoran dan Layanan Bisnis (MPLB)",
    person: "Ratna Sari, S.Sos.",
    category: "vocational",
    cluster: "bisnis_kreatif",
    lineType: "solid",
    department: "Jurusan Administrasi Perkantoran",
    badge: "Kaprog Kejuruan",
    parentId: "waka-kurikulum",
    reportsToText: "Waka Kurikulum & Waka Hubin",
    tupoksi: [
      "Memimpin penguasaan korespondensi bisnis digital, kearsipan elektronik, protokoler, public relations, dan event organizing.",
      "Mengoperasikan laboratorium simulasi kantor modern dan biro layanan administrasi kearsipan digital.",
      "Menyiapkan lulusan staf sekretaris eksekutif, data entry specialist, dan customer care profesional."
    ],
    subordinates: []
  },
  {
    id: "kaprog-perikanan",
    role: "Kepala Program Keahlian",
    title: "Agribisnis Perikanan Air Tawar (APAT)",
    person: "Ir. Hendra Gunawan",
    category: "vocational",
    cluster: "agribisnis",
    lineType: "solid",
    department: "Jurusan Perikanan & Agribisnis",
    badge: "Kaprog Kejuruan",
    parentId: "waka-kurikulum",
    reportsToText: "Waka Kurikulum & Waka Hubin",
    tupoksi: [
      "Memimpin teknik pembenihan, pembesaran ikan air tawar konsumsi (nila, lele, gurame) dengan teknologi sistem bioflok.",
      "Mengelola instalasi 16 kolam bioflok, kolam tanah 1.200 m², lab pengujian kualitas air, dan pabrik pelet pakan mandiri.",
      "Membangun rantai pasok pemasaran hasil panen perikanan ke pasar lokal Banjarnegara dan sekitarnya."
    ],
    subordinates: []
  },

  // 18. Unit Pelaksana Khusus: LSP-P1 SKANSA
  {
    id: "lsp",
    role: "Lembaga Sertifikasi Profesi Pihak Pertama",
    title: "LSP-P1 SMK Negeri 1 Bawang (Lisensi BNSP)",
    person: "Tim Asesor Berlisensi BNSP",
    category: "special_unit",
    cluster: "layanan_khusus",
    lineType: "solid",
    department: "Lembaga Sertifikasi Profesi",
    badge: "Lisensi Resmi BNSP",
    parentId: "waka-hubin",
    reportsToText: "Badan Nasional Sertifikasi Profesi (BNSP) & Kepala Sekolah",
    tupoksi: [
      "Menyelenggarakan uji sertifikasi kompetensi profesi standar nasional berlogo burung Garuda bagi 100% siswa kelas XII.",
      "Memelihara 46 skema sertifikasi kompetensi keahlian dan mengawasi mutu Tempat Uji Kompetensi (TUK).",
      "Melaksanakan verifikasi dan surveilans integritas pengujian oleh asesor bersertifikat BNSP."
    ]
  },

  // 19. Unit Pelaksana Khusus: BKK
  {
    id: "bkk",
    role: "Bursa Kerja Khusus",
    title: "BKK Mitra Karya SKANSA",
    person: "Tim Karir, Penyaluran & Kemitraan Industri",
    category: "special_unit",
    cluster: "layanan_khusus",
    lineType: "solid",
    department: "Bursa Kerja Khusus (BKK)",
    badge: "Penyaluran Kerja",
    parentId: "waka-hubin",
    reportsToText: "Dinas Tenaga Kerja & Kepala Sekolah",
    tupoksi: [
      "Menjembatani rekruitmen langsung industri mitra ke kampus SKANSA bagi calon wisudawan dan alumni.",
      "Menyelenggarakan bimbingan karir, pelatihan psikotes, persiapan wawancara kerja, dan job fair kejuruan.",
      "Melacak rekam jejak lulusan (Tracer Study) untuk mengukur tingkat keterserapan kerja, wirausaha, dan kuliah."
    ]
  },

  // 20. Unit Penunjang: Perpustakaan Digital Graha Pustaka
  {
    id: "perpustakaan",
    role: "Pusat Sumber Belajar & Literasi",
    title: "Perpustakaan Digital Graha Pustaka",
    person: "Dra. Eni Purwanti",
    category: "special_unit",
    cluster: "layanan_khusus",
    lineType: "solid",
    department: "Graha Pustaka",
    badge: "Pusat Literasi Digital",
    parentId: "waka-kurikulum",
    reportsToText: "Waka Kurikulum & Kepala Sekolah",
    tupoksi: [
      "Mengelola sirkulasi 15.000+ eksemplar buku pelajaran, modul vokasi, jurnal kejuruan, dan e-book OPAC Senayan (SLiMS).",
      "Menyediakan fasilitas 40 workstation komputer e-library dan ruang riset referensi siswa.",
      "Mengembangkan gerakan literasi sekolah dan pojok baca di tiap konsentrasi keahlian."
    ]
  },

  // 21. Unit Penunjang: Bimbingan & Konseling
  {
    id: "bk",
    role: "Layanan Konseling & Pengembangan Diri",
    title: "Bimbingan dan Konseling (BK)",
    person: "Drs. Sugeng Waluyo",
    category: "special_unit",
    cluster: "layanan_khusus",
    lineType: "solid",
    department: "Layanan BK",
    badge: "Konseling & Asistensi Karir",
    parentId: "waka-kesiswaan",
    reportsToText: "Waka Kesiswaan & Kepala Sekolah",
    tupoksi: [
      "Memberikan layanan konseling individual, bimbingan kelompok, dan konsultasi minat bakat karir vokasi.",
      "Melakukan pemetaan potensi psikologis dan membantu adaptasi belajar siswa di lingkungan sekolah.",
      "Menangani mediasi kedisiplinan dan bekerjasama dengan orang tua/wali siswa secara humanis."
    ]
  },

  // 22. Unit Penunjang: Teaching Factory Center
  {
    id: "tefa-center",
    role: "Sentra Pembelajaran Berbasis Industri",
    title: "Teaching Factory (TeFa) Center",
    person: "Koordinator TeFa 8 Jurusan",
    category: "special_unit",
    cluster: "layanan_khusus",
    lineType: "solid",
    department: "Teaching Factory SKANSA",
    badge: "SMK Pusat Keunggulan",
    parentId: "waka-hubin",
    reportsToText: "Waka Hubin & Kepala Sekolah",
    tupoksi: [
      "Mengintegrasikan pesanan nyata produk/jasa dari masyarakat dan industri ke dalam kegiatan pembelajaran harian.",
      "Menjaga standar kualitas kontrol (Quality Control) dan ketepatan waktu pengiriman produk pesanan.",
      "Mengelola siklus pendapatan unit produksi kejuruan untuk reinvestasi fasilitas laboratorium siswa."
    ]
  }
];

export const CATEGORY_STYLES = {
  regulator: {
    bg: "bg-institution-950",
    text: "text-white",
    border: "border-institution-800",
    badgeBg: "bg-institution-900 border border-institution-700",
    badgeText: "text-slate-200",
    lineColor: "#0F172A",
    accent: "text-blue-400"
  },
  leadership: {
    bg: "bg-institution-950",
    text: "text-white",
    border: "border-amber-500/80 ring-1 ring-amber-400/30",
    badgeBg: "bg-amber-500/20 border border-amber-400/50",
    badgeText: "text-amber-300 font-semibold",
    lineColor: "#D97706",
    accent: "text-amber-400"
  },
  advisory: {
    bg: "bg-white",
    text: "text-slate-900",
    border: "border-amber-400 border-dashed",
    badgeBg: "bg-amber-50 border border-amber-200",
    badgeText: "text-amber-900 font-medium",
    lineColor: "#D97706",
    accent: "text-amber-700"
  },
  administration: {
    bg: "bg-white",
    text: "text-slate-900",
    border: "border-slate-300",
    badgeBg: "bg-slate-100 border border-slate-200",
    badgeText: "text-slate-700",
    lineColor: "#334155",
    accent: "text-slate-700"
  },
  management: {
    bg: "bg-white",
    text: "text-slate-900",
    border: "border-slate-300 hover:border-blue-600",
    badgeBg: "bg-blue-50 border border-blue-200",
    badgeText: "text-blue-900 font-semibold",
    lineColor: "#1D4ED8",
    accent: "text-blue-700"
  },
  vocational: {
    bg: "bg-white",
    text: "text-slate-900",
    border: "border-slate-200 hover:border-blue-500",
    badgeBg: "bg-slate-50 border border-slate-200",
    badgeText: "text-slate-800 font-medium",
    lineColor: "#1D4ED8",
    accent: "text-blue-700"
  },
  special_unit: {
    bg: "bg-white",
    text: "text-slate-900",
    border: "border-slate-200 hover:border-institution-700",
    badgeBg: "bg-slate-50 border border-slate-200",
    badgeText: "text-institution-900 font-medium",
    lineColor: "#0F172A",
    accent: "text-institution-900"
  }
};

