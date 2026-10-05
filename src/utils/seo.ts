/**
 * SEO Manager for SMK Negeri 1 Bawang
 * Manages dynamic document title, description, canonical links, and search engine robots directives.
 */

interface SEOMetadata {
  title: string;
  description: string;
  noIndex?: boolean;
}

const ROUTE_SEO_MAP: Record<string, SEOMetadata> = {
  '#/': {
    title: 'SMK Negeri 1 Bawang Banjarnegara | SMK Pusat Keunggulan Resmi',
    description: 'Portal Resmi SMK Negeri 1 Bawang (SKANSA) Banjarnegara, Jawa Tengah. Lembaga vokasi unggul terakreditasi A dengan 8 Program Keahlian, fasilitas Teaching Factory modern, dan SPP bulanan gratis.'
  },
  '#/profil': {
    title: 'Profil Sekolah, Visi Misi & Sejarah | SMKN 1 Bawang',
    description: 'Kenali sejarah SMK Negeri 1 Bawang sejak 1964, visi terwujudnya insan bertakwa dan berdaya saing global, sambutan kepala sekolah, serta akreditasi A BAN-SM.'
  },
  '#/program-keahlian': {
    title: '8 Program Keahlian Unggulan | SMKN 1 Bawang Banjarnegara',
    description: 'Eksplorasi 8 jurusan vokasi SMK Negeri 1 Bawang: PPLG, TJKT, AKL, MPLB, Pemasaran, Busana, Perikanan, dan Teknik Elektronika berstandar kurikulum industri nasional.'
  },
  '#/spmb': {
    title: 'SPMB 2026/2027 (Bebas SPP) | SMKN 1 Bawang Banjarnegara',
    description: 'Penerimaan Peserta Didik Baru (SPMB) SMKN 1 Bawang 2026/2027. Kuota 720 siswa, 3 jalur seleksi (Prestasi, Afirmasi, Domisili), bebas biaya SPP bulanan Rp 0.'
  },
  '#/layanan-digital': {
    title: 'Pusat Layanan Digital & Aplikasi | SMKN 1 Bawang',
    description: 'Akses terpadu seluruh layanan digital SKANSA: LMS Pembelajaran, E-Library Graha Pustaka, Sistem Kelulusan (SKL), BKK Karir, dan Tanya Skansa.'
  },
  '#/informasi': {
    title: 'Warta, Berita & Pengumuman Resmi | SMKN 1 Bawang',
    description: 'Kumpulan berita resmi kegiatan sekolah, surat edaran kedinasan, agenda akademik, dan pengumuman administratif terkini dari SMK Negeri 1 Bawang.'
  },
  '#/prestasi': {
    title: 'Prestasi Juara LKS & Kejuaraan Vokasi | SMKN 1 Bawang',
    description: 'Daftar torehan medali emas Lomba Kompetensi Siswa (LKS) tingkat Provinsi Jawa Tengah dan Nasional yang diraih oleh siswa-siswi berprestasi SKANSA.'
  },
  '#/karya-siswa': {
    title: 'Galeri Inovasi & Portofolio Karya Siswa | SMKN 1 Bawang',
    description: 'Pameran karya nyata siswa dari 8 jurusan: aplikasi digital, perangkat IoT, fashion busana wastra Banjarnegara, produk bioflok, hingga unit usaha ritel.'
  },
  '#/admin': {
    title: 'SIM SKANSA | Portal Administrasi & Verifikasi Sekolah',
    description: 'Sistem Informasi Manajemen Sekolah SMK Negeri 1 Bawang untuk pengelolaan verifikasi SPMB dan warta resmi.',
    noIndex: true
  },
  '#/mods': {
    title: 'SIM SKANSA | Panel Moderator & Verifikator',
    description: 'Sistem Informasi Manajemen Sekolah SMK Negeri 1 Bawang untuk pengelolaan verifikasi SPMB dan warta resmi.',
    noIndex: true
  },
  '#/kelola': {
    title: 'SIM SKANSA | Panel Pengelola Sekolah',
    description: 'Sistem Informasi Manajemen Sekolah SMK Negeri 1 Bawang.',
    noIndex: true
  }
};

export function updatePageSEO(hashRoute: string) {
  let matchedSEO = ROUTE_SEO_MAP[hashRoute];

  // Check for dynamic major route e.g. #/program-keahlian/pplg
  if (!matchedSEO && hashRoute.startsWith('#/program-keahlian/')) {
    const slug = hashRoute.replace('#/program-keahlian/', '').toUpperCase();
    matchedSEO = {
      title: `${slug} - Program Keahlian | SMKN 1 Bawang Banjarnegara`,
      description: `Informasi lengkap kurikulum, fasilitas bengkel, sertifikasi, kemitraan DUDI, dan prospek karir kompetensi keahlian ${slug} di SMKN 1 Bawang.`
    };
  }

  // Fallback
  if (!matchedSEO) {
    if (hashRoute.startsWith('#/admin') || hashRoute.startsWith('#/mods') || hashRoute.startsWith('#/kelola')) {
      matchedSEO = {
        title: 'SIM SKANSA | Panel Administrasi',
        description: 'Sistem Informasi Administrasi SMKN 1 Bawang',
        noIndex: true
      };
    } else {
      matchedSEO = ROUTE_SEO_MAP['#/'];
    }
  }

  // 1. Update Title
  document.title = matchedSEO.title;

  // 2. Update Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', matchedSEO.description);

  // 3. Update Robots Meta (Protect secret admin URLs from search engine indexing)
  let metaRobots = document.querySelector('meta[name="robots"]');
  if (!metaRobots) {
    metaRobots = document.createElement('meta');
    metaRobots.setAttribute('name', 'robots');
    document.head.appendChild(metaRobots);
  }

  if (matchedSEO.noIndex) {
    metaRobots.setAttribute('content', 'noindex, nofollow, noarchive, nosnippet');
  } else {
    metaRobots.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  }

  // 4. Update OpenGraph Title & Description
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', matchedSEO.title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', matchedSEO.description);
}
