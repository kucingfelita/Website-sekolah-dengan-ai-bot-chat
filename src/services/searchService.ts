import { SearchResult } from '../types';
import { PROGRAMS } from '../data/programsData';
import { NEWS_ITEMS, ACHIEVEMENTS, STUDENT_WORKS } from '../data/newsAndAchievementsData';
import { DIGITAL_SERVICES } from '../data/servicesData';
import { SPMB_FAQS, SPMB_PATHWAYS } from '../data/spmbData';
import { INDUSTRY_PARTNERS_LIST } from '../data/industryPartnersData';
import { SCHOOL_INFO } from '../data/schoolData';

export function performGlobalSearch(rawQuery: string): SearchResult[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return [];

  const results: SearchResult[] = [];

  // 1. Search in Industry Partners (DUDIKA)
  INDUSTRY_PARTNERS_LIST.forEach(partner => {
    const matchText = `${partner.companyName} ${partner.majorName} ${partner.concentrationName} ${partner.location} ${partner.scope.join(' ')} ${partner.description}`.toLowerCase();
    if (matchText.includes(query)) {
      results.push({
        id: `partner-${partner.id}`,
        title: partner.companyName,
        subtitle: `Mitra Industri • ${partner.concentrationName} (${partner.majorName})`,
        category: 'Mitra Industri',
        url: `#/mitra-industri`,
        snippet: partner.description
      });
    }
  });

  // 2. Search in Profile Sections
  const profileSections = [
    { title: 'Sejarah SMKN 1 Bawang', sub: 'Perjalanan 1964 hingga Pusat Keunggulan', anchor: '#sejarah', keywords: 'sejarah smea pendirian 1964 transformasi pucang' },
    { title: 'Visi, Misi & 7 Tujuan Strategis', sub: 'Arah Pendidikan Vokasi 2030', anchor: '#visi-misi', keywords: 'visi misi tujuan sasaran target mutu' },
    { title: 'Fasilitas & Bengkel Praktik', sub: '8 Lab Komputer, Bengkel Mekatronika, Busana, Bioflok', anchor: '#fasilitas', keywords: 'fasilitas bengkel lab studio gedung gor perpustakaan peralatan' },
    { title: 'Ekstrakurikuler & Organisasi Siswa', sub: '10 Klub Bakat Minat Siswa', anchor: '#ekstrakurikuler', keywords: 'ekskul ekstrakurikuler pramuka paskibra pmr rohis english futsal tari teater silat multimedia' },
    { title: 'Guru & Tenaga Pendidik', sub: '142 Guru & Asesor Lisensi BNSP', anchor: '#guru', keywords: 'guru pendidik pengajar kepala sekolah wakasek nip asesor staff tenaga' },
    { title: 'Struktur Organisasi Sekolah', sub: 'Bagan Tata Kelola & Kepemimpinan', anchor: '#struktur-organisasi', keywords: 'struktur organisasi tata kelola bagan pimpinan manajemen kaprog komite' }
  ];

  profileSections.forEach((sec, idx) => {
    const matchText = `${sec.title} ${sec.sub} ${sec.keywords}`.toLowerCase();
    if (matchText.includes(query)) {
      results.push({
        id: `profil-${idx}`,
        title: sec.title,
        subtitle: sec.sub,
        category: 'Profil',
        url: `#/profil${sec.anchor}`,
        snippet: sec.sub
      });
    }
  });

  // 3. Search in Extracurriculars
  SCHOOL_INFO.extracurriculars.forEach(ekskul => {
    const matchText = `${ekskul.name} ${ekskul.category} ${ekskul.description} ${ekskul.achievements}`.toLowerCase();
    if (matchText.includes(query)) {
      results.push({
        id: `ekskul-${ekskul.id}`,
        title: ekskul.name,
        subtitle: `Ekstrakurikuler • ${ekskul.category}`,
        category: 'Profil',
        url: `#/profil#ekstrakurikuler`,
        snippet: ekskul.description
      });
    }
  });

  // 4. Search in Programs
  PROGRAMS.forEach(prog => {
    const matchText = `${prog.name} ${prog.shortName} ${prog.code} ${prog.tagline} ${prog.description} ${prog.category} ${prog.softwareAndTools.join(' ')}`.toLowerCase();
    if (matchText.includes(query)) {
      results.push({
        id: `prog-${prog.id}`,
        title: `${prog.code}: ${prog.name}`,
        subtitle: `Program Keahlian • ${prog.category}`,
        category: 'Jurusan',
        url: `#/program-keahlian/${prog.slug}`,
        snippet: prog.tagline
      });
    }
  });

  // 5. Search in News & Announcements
  NEWS_ITEMS.forEach(news => {
    const matchText = `${news.title} ${news.excerpt} ${news.category} ${news.tags.join(' ')}`.toLowerCase();
    if (matchText.includes(query)) {
      results.push({
        id: `news-${news.id}`,
        title: news.title,
        subtitle: `${news.category} • ${news.date}`,
        category: news.isAnnouncement ? 'Pengumuman' : 'Berita',
        url: `#/informasi`,
        snippet: news.excerpt
      });
    }
  });

  // 6. Search in Digital Services
  DIGITAL_SERVICES.forEach(svc => {
    const matchText = `${svc.name} ${svc.code} ${svc.description} ${svc.category}`.toLowerCase();
    if (matchText.includes(query)) {
      results.push({
        id: `svc-${svc.id}`,
        title: svc.name,
        subtitle: `Layanan Digital • ${svc.category}`,
        category: 'Layanan',
        url: `#/layanan-digital`,
        snippet: svc.description
      });
    }
  });

  // 7. Search in SPMB Pathways & FAQs
  SPMB_PATHWAYS.forEach(p => {
    const matchText = `${p.name} ${p.description} ${p.targetAudience} ${p.mainCriteria.join(' ')}`.toLowerCase();
    if (matchText.includes(query)) {
      results.push({
        id: `spmb-${p.id}`,
        title: `SPMB: ${p.name}`,
        subtitle: `Jalur Masuk Siswa Baru (Kuota ${p.quotaPercent}%)`,
        category: 'SPMB',
        url: `#/spmb`,
        snippet: p.description
      });
    }
  });

  SPMB_FAQS.forEach((faq, idx) => {
    const matchText = `${faq.question} ${faq.answer}`.toLowerCase();
    if (matchText.includes(query)) {
      results.push({
        id: `faq-${idx}`,
        title: faq.question,
        subtitle: `Tanya Jawab SPMB Resmi`,
        category: 'SPMB',
        url: `#/spmb`,
        snippet: faq.answer
      });
    }
  });

  // 8. Search in Achievements
  ACHIEVEMENTS.forEach(ach => {
    const matchText = `${ach.title} ${ach.rank} ${ach.studentName} ${ach.major} ${ach.description}`.toLowerCase();
    if (matchText.includes(query)) {
      results.push({
        id: `ach-${ach.id}`,
        title: `${ach.rank}: ${ach.title}`,
        subtitle: `Prestasi Siswa • ${ach.major}`,
        category: 'Prestasi',
        url: `#/prestasi`,
        snippet: ach.description
      });
    }
  });

  // 9. Search in Student Works
  STUDENT_WORKS.forEach(work => {
    const matchText = `${work.title} ${work.majorName} ${work.description} ${work.category} ${work.technologiesOrMaterials.join(' ')}`.toLowerCase();
    if (matchText.includes(query)) {
      results.push({
        id: `work-${work.id}`,
        title: work.title,
        subtitle: `Karya Siswa • ${work.majorName}`,
        category: 'Jurusan',
        url: `#/karya-siswa`,
        snippet: work.description
      });
    }
  });

  return results.slice(0, 12);
}
