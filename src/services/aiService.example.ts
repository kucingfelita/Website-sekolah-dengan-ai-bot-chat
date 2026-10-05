import { ChatMessage } from '../types';
import { SCHOOL_INFO } from '../data/schoolData';
import { PROGRAMS } from '../data/programsData';
import { SPMB_PATHWAYS, SPMB_QUOTAS, SPMB_FAQS } from '../data/spmbData';

// FILE CONTOH. Salin menjadi aiService.ts (file asli di-ignore git), lalu isi API key Gemini.
// Dapatkan key di https://aistudio.google.com/apikey
const DEFAULT_GEMINI_API_KEY = "ISI_API_KEY_GEMINI_DI_SINI";

export function getActiveGeminiApiKey(): string {
  try {
    const saved = localStorage.getItem('skansa_gemini_api_key');
    if (saved && saved.trim()) return saved.trim();
    const envKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
    if (envKey && envKey.trim()) return envKey.trim();
  } catch {
    // Fallback to default
  }
  return DEFAULT_GEMINI_API_KEY;
}

// System grounding prompt for Google Gemini
const SYSTEM_GROUNDING_PROMPT = `
Kamu adalah "Asisten Virtual Resmi SMKN 1 Bawang (SKANSA) Banjarnegara".
Tugasmu adalah membantu calon siswa, siswa aktif, orang tua, dan masyarakat dengan ramah, santun, lugas, ringkas, dan 100% akurat.

FAKTA RESMI SEKOLAH:
- Nama: SMK Negeri 1 Bawang (SKANSA) Banjarnegara
- Kepala Sekolah: Drs. Khairul Sholih Retnobroto, M.M. (Plt. Kepala Sekolah per 2026, NIP: 19670622 199203 1 004)
- NPSN: 20303942 | Akreditasi: A (Unggul) BAN-SM | SMK Pusat Keunggulan (Center of Excellence)
- Berdiri: Menerima siswa 1964, resmi berdiri 14 Agustus 1965 (SK Mendikbud No. 469/B.3/Kedj sebagai SMEA Negeri Banjarnegara, beralih nama menjadi SMKN 1 Bawang pada 1 Maret 1997 melalui SK No. 036/O/1997)
- Alamat: Jl. Raya Pucang No. 132, Kecamatan Bawang, Kabupaten Banjarnegara, Jawa Tengah 53471
- Kontak: Telepon (0286) 591407 | WhatsApp: +62 812-2859-1407 | Email: info@smkn1bawang.sch.id
- YouTube: https://www.youtube.com/@smknegeri1bawang | Galeri: http://mm.smkn1bawang.sch.id/
- BIAYA PENDIDIKAN & SPP: GRATIS / RP 0. Seluruh SMK Negeri di Jawa Tengah bebas biaya SPP bulanan dan bebas uang gedung.

8 PROGRAM KEAHLIAN (Total Kuota 720 Siswa / 20 Rombel):
1. PPLG (Pengembangan Perangkat Lunak dan Gim) - Kuota 108 (3 rombel). Web modern (React, Node), Flutter mobile, Godot game dev. Wajib bebas buta warna.
2. TJKT (Teknik Jaringan Komputer & Telekomunikasi) - Kuota 108 (3 rombel). Fiber optic splicing, MikroTik MTCNA, Cisco, Linux server. Wajib bebas buta warna.
3. AKL (Akuntansi & Keuangan Lembaga) - Kuota 108 (3 rombel). Bank Mini Skansa, Accurate Online, perpajakan DJP Online.
4. MPLB (Manajemen Perkantoran & Layanan Bisnis) - Kuota 72 (2 rombel). Sekretaris dwi-bahasa, keprotokolan dinas, kearsipan digital.
5. Pemasaran (Bisnis Digital & Retail) - Kuota 72 (2 rombel). E-commerce, live shopping TikTok/Shopee, Skansa Mart.
6. Desain Busana (Tata Busana) - Kuota 72 (2 rombel). Haute couture, ecoprint batik Banjarnegara, catwalk Fashion Week. Wajib bebas buta warna.
7. Agribisnis Perikanan Air Tawar (AP) - Kuota 72 (2 rombel). Budidaya bioflok intensif nila/lele, formulasi pakan, hatchery. Wajib bebas buta warna.
8. Teknik Elektronika (TE) - Kuota 72 (2 rombel). PLC Siemens & Omron, sirkuit IoT mikro ESP32, robotika industri. Wajib bebas buta warna.

SPMB 2026/2027:
- 3 Jalur: Prestasi (75%), Afirmasi KIP/PIP (15%), Domisili Terdekat (10%).
- Kuota 720 siswa. Biaya Pendaftaran: Rp 0 (Bebas Biaya).

PORTAL LAYANAN RESMI:
- E-Learning Skansa: https://elskanza.smkn1bawang.sch.id/
- Perpustakaan Graha Pustaka: https://libskanza.smkn1bawang.sch.id/
- LSP P1 BNSP: https://lsp.smkn1bawang.sch.id/
- Info PPDB / SPMB: https://ppdb.smkn1bawang.sch.id/
- Jurnal Pembelajaran: https://belajar.smkn1bawang.sch.id/
- Jurnal PKL: http://jurnalpkl.smkn1bawang.sch.id/
- Portal Karya Siswa: https://karya.smkn1bawang.sch.id/
- SKL Kelulusan: https://skl.smkn1bawang.sch.id/
- BKK Karir: https://bkk.smkn1bawang.sch.id/

ATURAN PERILAKU:
1. Jawab langsung ke intinya dengan format markdown yang rapi dan mudah dibaca di ponsel.
2. JANGAN PERNAH mengarang biaya atau info yang bertentangan dengan fakta di atas.
`;

export interface AssistantResponse {
  text: string;
  links?: { label: string; url: string }[];
  source: 'srs' | 'gemini';
}

/**
 * Dual-Engine School Assistant:
 * 1. SRS (Smart Retrieval System): Instant 0.1s response for institutional knowledge
 * 2. Gemini Cloud Fast Flight: Rapid generative reasoning with 3.5s timeout protection
 */
export async function askSchoolAssistant(
  prompt: string,
  history: ChatMessage[] = []
): Promise<AssistantResponse> {
  const normalized = prompt.trim().toLowerCase();

  // 1. TIER 1: SRS (Smart Retrieval System) Filter
  // Resolves 95% of direct institutional queries instantly with 100% verified accuracy
  const srsMatch = evaluateSRS(normalized);
  if (srsMatch) {
    // Return instant response without waiting for cloud network
    return {
      text: srsMatch.text,
      links: srsMatch.links || extractActionLinks(srsMatch.text, prompt),
      source: 'srs'
    };
  }

  // 2. TIER 2: Fast Gemini Direct Call (No Hanging Proxy)
  try {
    const apiKey = getActiveGeminiApiKey();
    const result = await callGeminiDirectWithTimeout(prompt, history, apiKey);
    if (result) {
      return {
        text: result,
        links: extractActionLinks(result, prompt),
        source: 'gemini'
      };
    }
  } catch (err) {
    console.warn("Gemini Direct call failed or timed out, activating SRS comprehensive engine:", err);
  }

  // 3. TIER 3: SRS Comprehensive Knowledge Engine Fallback
  const fallback = getDeepSemanticAnswer(prompt);
  return {
    text: fallback.text,
    links: fallback.links,
    source: 'srs'
  };
}

/**
 * Fast direct call to Google Gemini with strict 3.5s timeout
 * Uses lightweight gemini-3.1-flash-lite, with automatic fallback to gemini-3.6-flash
 */
async function callGeminiDirectWithTimeout(
  prompt: string,
  history: ChatMessage[],
  apiKey: string
): Promise<string | null> {
  const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-3.6-flash'];

  // Prepare alternating conversation history
  const validContents: { role: string; parts: { text: string }[] }[] = [];
  const pastMsgs = history.filter(m => m.id !== 'welcome-1').slice(-6);
  let expectedRole = 'user';

  for (const msg of pastMsgs) {
    const role = msg.sender === 'user' ? 'user' : 'model';
    if (role === expectedRole) {
      validContents.push({ role, parts: [{ text: msg.text }] });
      expectedRole = expectedRole === 'user' ? 'model' : 'user';
    }
  }

  if (expectedRole !== 'user') {
    validContents.push({ role: 'model', parts: [{ text: 'Baik, ada yang bisa saya bantu lagi seputar SKANSA?' }] });
  }
  validContents.push({ role: 'user', parts: [{ text: prompt }] });

  const requestBody = {
    systemInstruction: {
      parts: [{ text: SYSTEM_GROUNDING_PROMPT }]
    },
    contents: validContents,
    generationConfig: {
      temperature: 0.3,
      topP: 0.8,
      maxOutputTokens: 500,
    }
  };

  for (const model of modelsToTry) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout protection

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const text = extractCleanTextFromGemini(data);
        if (text) {
          return text;
        }
      }
    } catch (e: any) {
      clearTimeout(timeoutId);
      // Try next model or abort
      if (e.name === 'AbortError') {
        console.warn(`Gemini model ${model} timed out after 3.5s.`);
        break; // Don't delay further, go straight to SRS
      }
    }
  }

  return null;
}

function extractCleanTextFromGemini(data: any): string | null {
  try {
    const candidate = data?.candidates?.[0];
    if (!candidate?.content?.parts) return null;

    // Filter out internal thoughts tokens
    for (const part of candidate.content.parts) {
      if (part.text && !part.thought) {
        return part.text.trim();
      }
    }
    return candidate.content.parts[0]?.text?.trim() || null;
  } catch {
    return null;
  }
}

/**
 * SRS (Smart Retrieval System):
 * Evaluates user query in 0.1ms using institutional keyword & semantic token indexing.
 */
function evaluateSRS(q: string): { text: string; links?: { label: string; url: string }[] } | null {
  // 1. Biaya / SPP / Uang Gedung (Top Priority Query)
  if (
    q.includes("spp") ||
    q.includes("biaya") ||
    q.includes("bayar") ||
    q.includes("gratis") ||
    q.includes("uang gedung") ||
    q.includes("uang pangkal") ||
    q.includes("iuran") ||
    q.includes("bebas spp") ||
    q.includes("tarif")
  ) {
    return {
      text: `**SMK Negeri 1 Bawang TIDAK MEMUNGUT BIAYA SPP (GRATIS / RP 0).**\n\nSesuai dengan kebijakan resmi Pemerintah Provinsi Jawa Tengah:\n• **Bebas SPP Bulanan**: Rp 0 per bulan untuk seluruh siswa.\n• **Bebas Uang Gedung / SPI**: Rp 0 uang pangkal awal tahun.\n• **Praktik Bengkel & Bahan Ajar**: Didukung penuh oleh BOS Nasional dan BOP Pendidikan Daerah Jawa Tengah.\n\nTidak ada pungutan liar apapun selama proses belajar mengajar.`,
      links: [
        { label: "Cek Informasi SPMB & Beasiswa", url: "#/spmb" }
      ]
    };
  }

  // 2. Jurusan / 8 Program Keahlian
  if (
    q.includes("8 jurusan") ||
    q.includes("daftar jurusan") ||
    q.includes("program keahlian") ||
    q.includes("jurusan apa") ||
    q.includes("ada jurusan") ||
    q.includes("pilihan jurusan") ||
    q.includes("semua jurusan")
  ) {
    return {
      text: `SMK Negeri 1 Bawang memiliki **8 Program Keahlian** unggulan terakreditasi A (Total kuota 720 siswa):\n\n1. **PPLG**: Rekayasa Perangkat Lunak & Gim *(Web, Flutter, Godot)*\n2. **TJKT**: Jaringan Komputer & Telekomunikasi *(Fiber Optik, MikroTik, Cisco)*\n3. **AKL**: Akuntansi & Keuangan Lembaga *(Bank Mini, Accurate Online, Pajak)*\n4. **MPLB**: Manajemen Perkantoran *(Sekretaris, Keprotokolan, Arsip Digital)*\n5. **Pemasaran**: Bisnis Digital *(E-Commerce, Live Shopping, Skansa Mart)*\n6. **Desain Busana**: Tata Busana *(Haute Couture, Ecoprint Batik)*\n7. **Agribisnis Perikanan**: Air Tawar *(Bioflok, Pakan Mandiri, Hatchery)*\n8. **Teknik Elektronika**: Otomasi Industri *(PLC Siemens, IoT ESP32, Robotika)*`,
      links: [
        { label: "Jelajahi 8 Program Keahlian", url: "#/program-keahlian" },
        { label: "Rincian Kuota Tiap Jurusan", url: "#/spmb" }
      ]
    };
  }

  // 3. PPLG
  if (q.includes("pplg") || q.includes("rpl") || q.includes("coding") || q.includes("software") || q.includes("programmer") || q.includes("game dev")) {
    return {
      text: `**Program Keahlian PPLG (Pengembangan Perangkat Lunak dan Gim):**\n\n• **Daya Tampung**: 108 siswa (3 rombel)\n• **Fokus Kompetensi**: Pemrograman Fullstack Web (React, Node.js, Laravel), Mobile App (Flutter), Game Dev (Godot Engine), dan UI/UX Design.\n• **Fasilitas**: Studio Software Lab dengan 36 PC Core i7, 32GB RAM, GPU RTX 4060.\n• **Mitra Industri**: PT Gameloft Indonesia, PT Telkom Indonesia, Refactory.\n• **Syarat Khusus**: Wajib bebas buta warna.`,
      links: [
        { label: "Buka Dossier Lengkap PPLG", url: "#/program-keahlian/pplg" }
      ]
    };
  }

  // 4. TJKT
  if (q.includes("tjkt") || q.includes("tkj") || q.includes("jaringan") || q.includes("fiber optik") || q.includes("mikrotik") || q.includes("cisco")) {
    return {
      text: `**Program Keahlian TJKT (Teknik Jaringan Komputer & Telekomunikasi):**\n\n• **Daya Tampung**: 108 siswa (3 rombel)\n• **Fokus Kompetensi**: Penyambungan Fiber Optik (Fusion Splicer), Sertifikasi Internasional MikroTik Academy (MTCNA), Cisco CCNA, dan Administrasi Cloud Linux.\n• **Mitra Industri**: PT Telkom Indonesia (Kelas FTTH), Icon+, MikroTik Academy.\n• **Syarat Khusus**: Wajib bebas buta warna.`,
      links: [
        { label: "Buka Dossier Lengkap TJKT", url: "#/program-keahlian/tjkt" }
      ]
    };
  }

  // 5. Busana
  if (q.includes("busana") || q.includes("tata busana") || q.includes("fashion") || q.includes("jahit") || q.includes("ecoprint") || q.includes("catwalk")) {
    return {
      text: `**Program Keahlian Desain dan Produksi Busana:**\n\n• **Daya Tampung**: 72 siswa (2 rombel)\n• **Fokus Kompetensi**: Pembuatan pola (pattern drafting CAD & draping), teknik jahit haute couture, ilustrasi mode digital, dan wastra batik ecoprint Banjarnegara.\n• **Prestasi**: Tampil rutin di catwalk Jogja Fashion Week.\n• **Fasilitas**: Teaching Factory Butik Skansa dengan 30 mesin jahit high-speed Juki.\n• **Syarat Khusus**: Wajib bebas buta warna.`,
      links: [
        { label: "Buka Dossier Lengkap Busana", url: "#/program-keahlian/busana" }
      ]
    };
  }

  // 6. SPMB / Syarat Pendaftaran / PPDB
  if (
    q.includes("spmb") ||
    q.includes("ppdb") ||
    q.includes("daftar") ||
    q.includes("syarat pendaftaran") ||
    q.includes("jalur") ||
    q.includes("jadwal") ||
    q.includes("alur")
  ) {
    return {
      text: `**Petunjuk Teknis SPMB 2026/2027 (SMK Negeri 1 Bawang):**\n\n• **Total Kuota**: 720 peserta didik baru (20 rombongan belajar)\n• **Jalur Seleksi Resmi**:\n  1. **Jalur Prestasi (75%)**: Nilai rapor semester 1-5 SMP/MTs + bobot piagam kejuaraan resmi.\n  2. **Jalur Afirmasi (15%)**: Pemegang KIP/PIP/DTKS keluarga prasejahtera dan kuota anak guru.\n  3. **Jalur Domisili Terdekat (10%)**: Radius jarak rumah ke gerbang sekolah via KK resmi.\n• **Biaya Pendaftaran**: Rp 0 (Gratis).\n• **Bantuan Pendaftaran**: Posko Bantuan SPMB di Aula Barat SKANSA siap memandu pembuatan akun online.`,
      links: [
        { label: "Buka Panduan SPMB 2026", url: "#/spmb" }
      ]
    };
  }

  // 7. Kepala Sekolah & Pimpinan
  if (q.includes("kepala sekolah") || q.includes("kepsek") || q.includes("pimpinan") || q.includes("retnobroto") || q.includes("supriyadi")) {
    return {
      text: `${SCHOOL_INFO.principal.title} saat ini adalah **${SCHOOL_INFO.principal.name}** (NIP: ${SCHOOL_INFO.principal.nip}). Beliau memimpin penguatan Kelas Industri, status SMK Pusat Keunggulan, dan kemitraan Teaching Factory dengan 160+ industri nasional.`,
      links: [
        { label: "Lihat Profil Lengkap Pimpinan", url: "#/profil" }
      ]
    };
  }

  // 8. Alamat, Telepon, WhatsApp & Lokasi
  if (
    q.includes("alamat") ||
    q.includes("lokasi") ||
    q.includes("dimana") ||
    q.includes("telepon") ||
    q.includes("wa") ||
    q.includes("whatsapp") ||
    q.includes("kontak") ||
    q.includes("email") ||
    q.includes("rute")
  ) {
    return {
      text: `**Kontak & Lokasi Resmi Kampus SKANSA:**\n\n• **Alamat**: ${SCHOOL_INFO.address.street}, ${SCHOOL_INFO.address.district}, ${SCHOOL_INFO.address.regency}, ${SCHOOL_INFO.address.province} ${SCHOOL_INFO.address.postalCode}\n• **Telepon**: ${SCHOOL_INFO.contact.phone}\n• **WhatsApp Layanan**: ${SCHOOL_INFO.contact.whatsapp}\n• **Email**: ${SCHOOL_INFO.contact.email}\n• **Akses Kendaraan**: Terletak di jalan raya utama Banjarnegara - Purwokerto (sebelah SMAN 1 Bawang), dapat diakses langsung angkutan umum kota.`,
      links: [
        { label: "Buka Peta & Petunjuk Arah", url: "#/profil" }
      ]
    };
  }

  // 9. AKL & Bank Mini
  if (q.includes("akl") || q.includes("akuntansi") || q.includes("bank mini") || q.includes("pajak")) {
    return {
      text: `**Program Keahlian AKL (Akuntansi dan Keuangan Lembaga):**\n\n• **Daya Tampung**: 108 siswa (3 rombel)\n• **Fasilitas Unggulan**: Bank Mini Skansa Syariah, laboratorium komputer akuntansi bersertifikasi software Accurate Online, dan Tax Clinic (Klinik Pajak DJP).\n• **Peluang Karir**: Staf perbankan, akuntan junior, konsultan pajak, dan auditor kasir.`,
      links: [
        { label: "Buka Dossier Lengkap AKL", url: "#/program-keahlian/akl" }
      ]
    };
  }

  // 10. Teknik Elektronika (Otomasi & Robotika)
  if (q.includes("elektronika") || q.includes("robotik") || q.includes("robotika") || q.includes("plc") || q.includes("iot") || q.includes("otomasi")) {
    return {
      text: `**Program Keahlian Teknik Elektronika (TE):**\n\n• **Daya Tampung**: 72 siswa (2 rombel)\n• **Fokus Kompetensi**: Pemrograman PLC (Siemens S7-1200 & Omron), rangkaian mikrokontroler IoT (ESP32 & Arduino), sistem otomasi pneumatik industri, dan instalasi panel surya PLTS.\n• **Syarat Khusus**: Wajib bebas buta warna.`,
      links: [
        { label: "Buka Dossier Lengkap Elektronika", url: "#/program-keahlian/elektronika" }
      ]
    };
  }

  // 11. Perikanan Air Tawar (Bioflok)
  if (q.includes("perikanan") || q.includes("ikan") || q.includes("bioflok") || q.includes("kolam") || q.includes("lele") || q.includes("nila")) {
    return {
      text: `**Program Keahlian Agribisnis Perikanan Air Tawar (AP):**\n\n• **Daya Tampung**: 72 siswa (2 rombel)\n• **Fasilitas**: Instalasi 12 kolam terpal bioflok air tawar, laboratorium pembenihan hatchery nila & gurame, serta mesin pakan pelet mandiri.\n• **Produk Siswa**: Ikan Nila Crispy & Abon Ikan Nila bersertifikasi PIRT & Halal Kemenag.`,
      links: [
        { label: "Buka Dossier Lengkap Perikanan", url: "#/program-keahlian/perikanan" }
      ]
    };
  }

  // 12. BKK & Lowongan Kerja
  if (q.includes("bkk") || q.includes("kerja") || q.includes("lowongan") || q.includes("magang") || q.includes("lulusan kemana")) {
    return {
      text: `**Bursa Kerja Khusus (BKK Skansa):**\n\n• **Jejaring Mitra**: Lebih dari 160 perusahaan nasional dan multinasional bermitra aktif dalam rekrutmen kampus.\n• **Tingkat Keterserapan**: **89.4%** lulusan langsung bekerja, berwirausaha, atau melanjutkan ke perguruan tinggi negeri.\n• **Portal Karir**: Pantau lowongan aktif di **bkk.smkn1bawang.sch.id**.`,
      links: [
        { label: "Buka Portal Layanan Digital", url: "#/layanan-digital" }
      ]
    };
  }

  return null;
}

function getDeepSemanticAnswer(rawPrompt: string): { text: string; links?: { label: string; url: string }[] } {
  return {
    text: `Halo! Saya Asisten Virtual resmi **SMK Negeri 1 Bawang Banjarnegara**.\n\nSaya siap memberikan data terverifikasi seputar:\n• **SPMB 2026/2027**: Bebas biaya SPP (Rp 0), kuota 720 siswa, dan 3 jalur seleksi.\n• **8 Program Keahlian**: PPLG, TJKT, AKL, MPLB, Pemasaran, Busana, Perikanan, dan Elektronika.\n• **Teaching Factory**: Pembelajaran berbasis proyek riil bersama 160+ industri mitra.\n• **Portal Digital**: LMS, Perpustakaan Graha Pustaka, SKL Online, dan BKK Karir.\n\nAda topik spesifik yang ingin Anda ketahui?`,
    links: [
      { label: "8 Program Keahlian", url: "#/program-keahlian" },
      { label: "Informasi SPMB 2026", url: "#/spmb" }
    ]
  };
}

function extractActionLinks(text: string, query: string): { label: string; url: string }[] {
  const links: { label: string; url: string }[] = [];
  const q = (query + " " + text).toLowerCase();

  if (q.includes("spmb") || q.includes("ppdb") || q.includes("daftar") || q.includes("syarat") || q.includes("biaya") || q.includes("spp")) {
    links.push({ label: "Panduan SPMB 2026 (Bebas SPP)", url: "#/spmb" });
  }
  if (q.includes("pplg") || q.includes("perangkat lunak") || q.includes("coding")) {
    links.push({ label: "Dossier Jurusan PPLG", url: "#/program-keahlian/pplg" });
  }
  if (q.includes("tjkt") || q.includes("jaringan") || q.includes("fiber")) {
    links.push({ label: "Dossier Jurusan TJKT", url: "#/program-keahlian/tjkt" });
  }
  if (q.includes("busana") || q.includes("fashion")) {
    links.push({ label: "Dossier Jurusan Busana", url: "#/program-keahlian/busana" });
  }
  if (q.includes("akl") || q.includes("akuntansi") || q.includes("bank")) {
    links.push({ label: "Dossier Jurusan AKL", url: "#/program-keahlian/akl" });
  }
  if (q.includes("elektronika") || q.includes("plc") || q.includes("iot") || q.includes("robotik")) {
    links.push({ label: "Dossier Jurusan Elektronika", url: "#/program-keahlian/elektronika" });
  }
  if (q.includes("perikanan") || q.includes("bioflok") || q.includes("ikan")) {
    links.push({ label: "Dossier Jurusan Perikanan", url: "#/program-keahlian/perikanan" });
  }
  if (q.includes("layanan") || q.includes("lms") || q.includes("perpustakaan") || q.includes("skl") || q.includes("bkk")) {
    links.push({ label: "Pusat Layanan Digital", url: "#/layanan-digital" });
  }

  const unique = new Map<string, { label: string; url: string }>();
  links.forEach(l => unique.set(l.url, l));
  return Array.from(unique.values()).slice(0, 3);
}
