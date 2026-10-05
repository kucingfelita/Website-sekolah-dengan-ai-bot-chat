export interface AdminUser {
  id: string;
  username: string;
  name: string;
  nip?: string;
  role: 'Super Admin' | 'Verifikator SPMB' | 'Humas Sekolah' | 'Kepala Tata Usaha';
  department: string;
  lastLogin: string;
}

export type ApplicantStatus = 'pending' | 'verified' | 'revision_needed' | 'rejected';

export interface ApplicantDocument {
  id: string;
  name: string;
  fileUrl: string;
  status: 'valid' | 'invalid' | 'unchecked';
  notes?: string;
}

export interface SPMBApplicant {
  id: string;
  registrationNumber: string;
  nisn: string;
  fullName: string;
  gender: 'L' | 'P';
  originSchool: string;
  firstChoiceMajor: string; // e.g. PPLG, TJKT
  secondChoiceMajor: string;
  pathway: 'Prestasi' | 'Afirmasi' | 'Domisili';
  averageScore: number;
  colorBlindStatus: 'Normal' | 'Buta Warna Parsial' | 'Belum Tes';
  submittedAt: string;
  status: ApplicantStatus;
  verifierNotes?: string;
  documents: {
    rapor: boolean;
    skRapor: boolean;
    kk: boolean;
    akta: boolean;
    suratBebasButaWarna: boolean;
    faktaIntegritas: boolean;
    piagamKejuaraan?: boolean;
    kipPip?: boolean;
  };
}

export interface AIQueryLogItem {
  id: string;
  timestamp: string;
  userQuery: string;
  matchedCategory: 'SPMB & SPP' | 'Program Keahlian' | 'Fasilitas & TeFa' | 'Layanan Siswa' | 'Kontak & Lokasi';
  resolvedBy: 'Gemini 3.6 Flash' | 'Deep Semantic Engine';
  status: 'success' | 'clarification_needed';
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  adminName: string;
  action: string;
  target: string;
  badgeType: 'success' | 'warning' | 'info';
}
