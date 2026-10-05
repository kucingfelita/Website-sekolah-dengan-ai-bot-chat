export interface ProgramKeahlian {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  code: string;
  category: 'Teknologi & Rekayasa' | 'Teknologi Informasi' | 'Bisnis & Manajemen' | 'Seni & Ekonomi Kreatif' | 'Agribisnis';
  tagline: string;
  description: string;
  accredited: string;
  quotaPerYear: number;
  classesCount: number;
  headOfProgram: {
    name: string;
    title: string;
  };
  competencies: {
    title: string;
    description: string;
    skills: string[];
  }[];
  labsAndFacilities: {
    name: string;
    description: string;
    equipment: string[];
  }[];
  softwareAndTools: string[];
  careerPaths: {
    role: string;
    description: string;
    industrySector: string;
  }[];
  industryPartners: {
    name: string;
    partnershipType: string;
  }[];
  featuredProjects: {
    title: string;
    studentName: string;
    year: string;
    description: string;
    result: string;
  }[];
  achievements: {
    title: string;
    level: string;
    year: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  category: 'Berita Resmi' | 'Pengumuman' | 'Prestasi' | 'Kegiatan' | 'SPMB';
  isAnnouncement?: boolean;
  circularNumber?: string;
  readTime: string;
  coverImage?: string;
  tags: string[];
  content: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  category: 'LKS' | 'FLS2N' | 'O2SN' | 'Inovasi Vokasi' | 'Akademik' | 'Kewirausahaan';
  year: number;
  rank: string;
  level: 'Nasional' | 'Provinsi' | 'Karesidenan' | 'Kabupaten';
  studentName: string;
  major: string;
  organizer: string;
  description: string;
}

export interface StudentWorkItem {
  id: string;
  title: string;
  majorCode: string;
  majorName: string;
  category: 'Aplikasi & Software' | 'Desain Busana' | 'IoT & Elektronika' | 'Produk Olahan' | 'Karya Bisnis';
  year: number;
  creators: string;
  description: string;
  technologiesOrMaterials: string[];
  impactOrStatus: string;
}

export interface SPMBPathway {
  id: string;
  name: string;
  quotaPercent: number;
  targetAudience: string;
  description: string;
  mainCriteria: string[];
  documentsRequired: string[];
}

export interface DigitalService {
  id: string;
  name: string;
  code: string;
  category: 'Akademik & Pembelajaran' | 'Administrasi & Data' | 'Layanan Publik & Bantuan' | 'Karir & Alumni';
  description: string;
  targetUsers: ('Siswa' | 'Guru' | 'Orang Tua' | 'Alumni' | 'Masyarakat')[];
  url: string;
  statusText: string;
  isInternal: boolean;
  iconName: string;
}

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: 'Jurusan' | 'Berita' | 'Pengumuman' | 'Layanan' | 'Prestasi' | 'SPMB' | 'Profil' | 'Mitra Industri';
  url: string;
  snippet: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedLinks?: { label: string; url: string }[];
  isThinking?: boolean;
  engineSource?: 'srs' | 'gemini';
}
