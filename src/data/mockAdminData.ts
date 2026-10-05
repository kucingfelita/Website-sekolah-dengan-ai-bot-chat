import { SPMBApplicant, AdminAuditLog, AIQueryLogItem } from '../types/adminTypes';

export const INITIAL_APPLICANTS: SPMBApplicant[] = [
  {
    id: "app-2026-001",
    registrationNumber: "SPMB-26-PPLG-001",
    nisn: "0082194821",
    fullName: "Muhammad Rizky Pratama",
    gender: "L",
    originSchool: "SMP Negeri 1 Bawang",
    firstChoiceMajor: "PPLG",
    secondChoiceMajor: "TJKT",
    pathway: "Prestasi",
    averageScore: 91.45,
    colorBlindStatus: "Normal",
    submittedAt: "2026-06-01 08:30",
    status: "verified",
    verifierNotes: "Berkas rapor semester 1-5 dan surat dokter lengkap dan valid.",
    documents: {
      rapor: true,
      skRapor: true,
      kk: true,
      akta: true,
      suratBebasButaWarna: true,
      faktaIntegritas: true,
      piagamKejuaraan: true
    }
  },
  {
    id: "app-2026-002",
    registrationNumber: "SPMB-26-TJKT-002",
    nisn: "0084519203",
    fullName: "Annisa Rahmawati Putri",
    gender: "P",
    originSchool: "SMP Negeri 2 Banjarnegara",
    firstChoiceMajor: "TJKT",
    secondChoiceMajor: "PPLG",
    pathway: "Prestasi",
    averageScore: 89.20,
    colorBlindStatus: "Normal",
    submittedAt: "2026-06-01 09:15",
    status: "verified",
    verifierNotes: "Semua berkas sah. Juara 2 OSN IPA tingkat Kabupaten.",
    documents: {
      rapor: true,
      skRapor: true,
      kk: true,
      akta: true,
      suratBebasButaWarna: true,
      faktaIntegritas: true,
      piagamKejuaraan: true
    }
  },
  {
    id: "app-2026-003",
    registrationNumber: "SPMB-26-BUS-003",
    nisn: "0087123910",
    fullName: "Siti Nurhaliza Zahra",
    gender: "P",
    originSchool: "SMP Negeri 3 Bawang",
    firstChoiceMajor: "BUSANA",
    secondChoiceMajor: "MPLB",
    pathway: "Domisili",
    averageScore: 86.75,
    colorBlindStatus: "Normal",
    submittedAt: "2026-06-01 10:04",
    status: "pending",
    verifierNotes: "Menunggu verifikasi fisik keabsahan KK di loket 2.",
    documents: {
      rapor: true,
      skRapor: true,
      kk: true,
      akta: true,
      suratBebasButaWarna: true,
      faktaIntegritas: true
    }
  },
  {
    id: "app-2026-004",
    registrationNumber: "SPMB-26-AKL-004",
    nisn: "0081290381",
    fullName: "Dimas Bagus Saputra",
    gender: "L",
    originSchool: "MTs Negeri 1 Banjarnegara",
    firstChoiceMajor: "AKL",
    secondChoiceMajor: "PM",
    pathway: "Afirmasi",
    averageScore: 87.50,
    colorBlindStatus: "Normal",
    submittedAt: "2026-06-01 11:20",
    status: "verified",
    verifierNotes: "Terdaftar aktif di DTKS Kemensos. KIP valid.",
    documents: {
      rapor: true,
      skRapor: true,
      kk: true,
      akta: true,
      suratBebasButaWarna: true,
      faktaIntegritas: true,
      kipPip: true
    }
  },
  {
    id: "app-2026-005",
    registrationNumber: "SPMB-26-TE-005",
    nisn: "0089012384",
    fullName: "Bagus Aditya Wardana",
    gender: "L",
    originSchool: "SMP Negeri 1 Wanadadi",
    firstChoiceMajor: "TE",
    secondChoiceMajor: "TJKT",
    pathway: "Prestasi",
    averageScore: 88.90,
    colorBlindStatus: "Normal",
    submittedAt: "2026-06-01 13:45",
    status: "pending",
    verifierNotes: "Menunggu pengecekan piagam kejuaraan robotik.",
    documents: {
      rapor: true,
      skRapor: true,
      kk: true,
      akta: true,
      suratBebasButaWarna: true,
      faktaIntegritas: true,
      piagamKejuaraan: true
    }
  },
  {
    id: "app-2026-006",
    registrationNumber: "SPMB-26-AP-006",
    nisn: "0083491029",
    fullName: "Fajar Maulana Sidik",
    gender: "L",
    originSchool: "SMP Negeri 1 Purwareja Klampok",
    firstChoiceMajor: "AP",
    secondChoiceMajor: "TE",
    pathway: "Prestasi",
    averageScore: 84.15,
    colorBlindStatus: "Normal",
    submittedAt: "2026-06-02 08:10",
    status: "revision_needed",
    verifierNotes: "Scan SK Rapor buram dan belum ada cap basah dari SMP asal. Harap unggah ulang.",
    documents: {
      rapor: true,
      skRapor: false,
      kk: true,
      akta: true,
      suratBebasButaWarna: true,
      faktaIntegritas: true
    }
  },
  {
    id: "app-2026-007",
    registrationNumber: "SPMB-26-MPLB-007",
    nisn: "0086712940",
    fullName: "Nabila Aulia Rahmi",
    gender: "P",
    originSchool: "SMP Negeri 1 Mandiraja",
    firstChoiceMajor: "MPLB",
    secondChoiceMajor: "AKL",
    pathway: "Prestasi",
    averageScore: 92.10,
    colorBlindStatus: "Normal",
    submittedAt: "2026-06-02 09:30",
    status: "verified",
    verifierNotes: "Berkas sangat lengkap. Nilai rapor bahasa Inggris dan matematika istimewa.",
    documents: {
      rapor: true,
      skRapor: true,
      kk: true,
      akta: true,
      suratBebasButaWarna: true,
      faktaIntegritas: true
    }
  },
  {
    id: "app-2026-008",
    registrationNumber: "SPMB-26-PM-008",
    nisn: "0085123901",
    fullName: "Galih Arya Wicaksana",
    gender: "L",
    originSchool: "SMP Negeri 4 Bawang",
    firstChoiceMajor: "PM",
    secondChoiceMajor: "MPLB",
    pathway: "Domisili",
    averageScore: 85.30,
    colorBlindStatus: "Normal",
    submittedAt: "2026-06-02 10:45",
    status: "verified",
    verifierNotes: "Jarak koordinat rumah 420m dari gerbang sekolah.",
    documents: {
      rapor: true,
      skRapor: true,
      kk: true,
      akta: true,
      suratBebasButaWarna: true,
      faktaIntegritas: true
    }
  },
  {
    id: "app-2026-009",
    registrationNumber: "SPMB-26-PPLG-009",
    nisn: "0089912450",
    fullName: "Kevin Christian Jonathan",
    gender: "L",
    originSchool: "SMP Negeri 1 Banjarnegara",
    firstChoiceMajor: "PPLG",
    secondChoiceMajor: "TE",
    pathway: "Prestasi",
    averageScore: 93.80,
    colorBlindStatus: "Normal",
    submittedAt: "2026-06-02 11:15",
    status: "verified",
    verifierNotes: "Juara 1 Lomba Coding Tingkat Karesidenan Banyumas.",
    documents: {
      rapor: true,
      skRapor: true,
      kk: true,
      akta: true,
      suratBebasButaWarna: true,
      faktaIntegritas: true,
      piagamKejuaraan: true
    }
  },
  {
    id: "app-2026-010",
    registrationNumber: "SPMB-26-TJKT-010",
    nisn: "0083210984",
    fullName: "Rendra Dwi Pangestu",
    gender: "L",
    originSchool: "SMP Negeri 2 Bawang",
    firstChoiceMajor: "TJKT",
    secondChoiceMajor: "TE",
    pathway: "Prestasi",
    averageScore: 83.20,
    colorBlindStatus: "Buta Warna Parsial",
    submittedAt: "2026-06-02 14:00",
    status: "rejected",
    verifierNotes: "Sesuai regulasi DUDI, jurusan TJKT wajib bebas buta warna. Disarankan konsultasi pindah pilihan jurusan ke AKL/MPLB.",
    documents: {
      rapor: true,
      skRapor: true,
      kk: true,
      akta: true,
      suratBebasButaWarna: false,
      faktaIntegritas: true
    }
  }
];

export const INITIAL_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: "log-1",
    timestamp: "10 menit yang lalu",
    adminName: "Drs. H. Mulyono",
    action: "Memverifikasi berkas pendaftar",
    target: "SPMB-26-PPLG-001 (M. Rizky Pratama)",
    badgeType: "success"
  },
  {
    id: "log-2",
    timestamp: "25 menit yang lalu",
    adminName: "Siti Rahayu, S.Kom",
    action: "Meminta revisi dokumen",
    target: "SPMB-26-AP-006 (Fajar Maulana Sidik)",
    badgeType: "warning"
  },
  {
    id: "log-3",
    timestamp: "1 jam yang lalu",
    adminName: "Bambang Trihatmodjo, M.Pd",
    action: "Menerbitkan Surat Edaran",
    target: "No. 421.5 / 318 / 2026 (Juknis SPMB)",
    badgeType: "info"
  },
  {
    id: "log-4",
    timestamp: "3 jam yang lalu",
    adminName: "Drs. H. Mulyono",
    action: "Sinkronisasi Kuota Dapodik",
    target: "720 Kuota - 8 Rombel Terkonfirmasi",
    badgeType: "info"
  }
];

export const POPULAR_AI_QUERIES: AIQueryLogItem[] = [
  {
    id: "ai-q1",
    timestamp: "Hari ini, 14:22",
    userQuery: "Apakah sekolah di SMKN 1 Bawang bayar uang gedung atau SPP bulanan?",
    matchedCategory: "SPMB & SPP",
    resolvedBy: "Gemini 3.6 Flash",
    status: "success"
  },
  {
    id: "ai-q2",
    timestamp: "Hari ini, 13:40",
    userQuery: "Jurusan apa saja yang mensyaratkan tidak boleh buta warna?",
    matchedCategory: "Program Keahlian",
    resolvedBy: "Gemini 3.6 Flash",
    status: "success"
  },
  {
    id: "ai-q3",
    timestamp: "Hari ini, 11:15",
    userQuery: "Berapa kuota penerimaan untuk jurusan Rekayasa Perangkat Lunak (PPLG)?",
    matchedCategory: "SPMB & SPP",
    resolvedBy: "Gemini 3.6 Flash",
    status: "success"
  },
  {
    id: "ai-q4",
    timestamp: "Hari ini, 10:02",
    userQuery: "Bagaimana cara pinjam buku di E-Library Graha Pustaka secara online?",
    matchedCategory: "Layanan Siswa",
    resolvedBy: "Gemini 3.6 Flash",
    status: "success"
  },
  {
    id: "ai-q5",
    timestamp: "Kemarin, 16:50",
    userQuery: "Apakah lulusan jurusan Busana bisa langsung disalurkan kerja ke industri?",
    matchedCategory: "Program Keahlian",
    resolvedBy: "Deep Semantic Engine",
    status: "success"
  }
];

export const MAJOR_QUOTA_STATS = [
  { code: 'PPLG', name: 'PPLG (Rekayasa Perangkat Lunak & Gim)', quota: 108, verified: 96, pending: 18 },
  { code: 'TJKT', name: 'TJKT (Teknik Jaringan & Telekomunikasi)', quota: 108, verified: 92, pending: 14 },
  { code: 'AKL', name: 'AKL (Akuntansi & Keuangan Lembaga)', quota: 108, verified: 88, pending: 12 },
  { code: 'MPLB', name: 'MPLB (Manajemen Perkantoran & Bisnis)', quota: 72, verified: 61, pending: 9 },
  { code: 'PM', name: 'Pemasaran (Bisnis Digital & Retail)', quota: 72, verified: 58, pending: 8 },
  { code: 'BUSANA', name: 'Desain & Produksi Busana', quota: 72, verified: 64, pending: 7 },
  { code: 'AP', name: 'Agribisnis Perikanan Air Tawar', quota: 72, verified: 52, pending: 11 },
  { code: 'TE', name: 'Teknik Elektronika & Otomasi', quota: 72, verified: 62, pending: 9 },
];
