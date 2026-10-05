# Portal Resmi SMK Negeri 1 Bawang (SKANSA) Banjarnegara

> **Situs Web Institusional Tingkat Awwwards & SMK Pusat Keunggulan (Center of Excellence)**

Aplikasi web resmi untuk **SMK Negeri 1 Bawang**, Kabupaten Banjarnegara, Jawa Tengah. Dirancang dengan pendekatan editorial modern, tipografi berkarakter, palet warna *institutional deep blue*, navigasi multi-persona (Calon Siswa, Siswa Aktif, Orang Tua, Mitra Industri), dan integrasi **Asisten Virtual Berbasis Google Gemini 3.6 Flash**.

---

## 🏛️ Profil Institusi Terverifikasi

- **Nama Sekolah**: SMK Negeri 1 Bawang (SKANSA) Banjarnegara
- **NPSN**: 20303965
- **Akreditasi**: A (Unggul) oleh BAN-SM
- **Status**: Negeri — SMK Pusat Keunggulan (Center of Excellence) & Pelaksana Teaching Factory
- **Tahun Berdiri**: 1964 (berawal dari SMEA Negeri Banjarnegara, beralih nama menjadi SMK Negeri 1 Bawang pada tahun 1997)
- **Alamat Kampus**: Jl. Raya Pucang No. 132, Kecamatan Bawang, Kabupaten Banjarnegara, Jawa Tengah 53471
- **Kontak**: Telepon/Fax: (0286) 591407 | Email: <info@smkn1bawang.sch.id>
- **Jaminan Pendidikan**: Bebas Biaya SPP Bulanan (Program Pemerintah Provinsi Jawa Tengah)

---

## 🧭 8 Program Keahlian Unggulan

1. **PPLG** — Pengembangan Perangkat Lunak dan Gim *(Kuota: 108 siswa / 3 rombel)*
2. **TJKT** — Teknik Jaringan Komputer dan Telekomunikasi *(Kuota: 108 siswa / 3 rombel)*
3. **AKL** — Akuntansi dan Keuangan Lembaga *(Kuota: 108 siswa / 3 rombel)*
4. **MPLB** — Manajemen Perkantoran dan Layanan Bisnis *(Kuota: 72 siswa / 2 rombel)*
5. **PM** — Pemasaran (Bisnis Digital & Modern Retail) *(Kuota: 72 siswa / 2 rombel)*
6. **Busana** — Desain dan Produksi Busana *(Kuota: 72 siswa / 2 rombel)*
7. **AP** — Agribisnis Perikanan Air Tawar (Bioflok) *(Kuota: 72 siswa / 2 rombel)*
8. **TE** — Teknik Elektronika (Otomasi Industri & IoT) *(Kuota: 72 siswa / 2 rombel)*

---

## 🚀 Fitur Utama & Desain

### 1. Desain Editorial Bebas "AI-Slop"

- **Palet Biru Institusi**: Menggunakan gradasi solid *Deep Institutional Blue* (`#0B1E36`), *Medium Royal Blue* (`#2563EB`), dan *Soft Blue* (`#F0F6FF`). Bebas dari gradien ungu/pink neon murahan.
- **Tipografi Berkarakter**: Memakai font `Plus Jakarta Sans` berbobot tegas untuk judul institusi dan `Newsreader` (serif elegan) untuk kutipan pimpinan.
- **Rhythm & White Space**: Ritme halaman bervariasi dengan pembagian editorial asimetris, tabel kuota, linimasa berjenjang, dan kartu fungsional.

### 2. Multi-Persona Intent Switcher

Mengakomodasi 4 kelompok pengguna utama:

- **Calon Siswa**: Cek 8 jurusan, alur SPMB, dan konsultasi minat.
- **Siswa Aktif**: Akses cepat LMS, katalog E-Library Graha Pustaka, jadwal ujian, dan UKK.
- **Orang Tua**: Jaminan bebas SPP, agenda kalender akademik, dan saluran konsultasi BK.
- **Mitra Industri**: Rekrutmen lulusan via BKK Skansa, kelas industri, dan kemitraan Teaching Factory.

### 3. Portal SPMB 2026/2027 Terpadu

- Rincian 3 Jalur: **Prestasi (75%)**, **Afirmasi (15%)**, **Domisili Terdekat (10%)**.
- Tabel kuota 720 kursi per program keahlian.
- Linimasa 6 tahap pendaftaran.
- **Kalkulator & Checklist Berkas Interaktif**: Calon siswa dapat mencentang kelengkapan dokumen dan memantau persentase kesiapan berkas secara langsung.
- Tanya jawab (FAQ) resmi SPMB.

### 4. Asisten Virtual SKANSA (Gemini 3.6 Flash)

- Terintegrasi langsung dengan model **Google Gemini 3.6 Flash**.
- Dibatasi oleh *grounding prompt* ketat berbasis data resmi sekolah.
- **Kebijakan Anti-Halusinasi**: Tidak pernah mengarang biaya, jadwal, atau kebijakan yang belum disahkan. Mengarahkan pengguna langsung ke kontak resmi saat data tidak tersedia.
- Tombol aksi cerdas (*deep link*) yang dapat diklik langsung di dalam gelembung percakapan.

### 5. Pencarian Cepat Global (`Ctrl+K` / `Cmd+K`)

- Pencarian instan mencakup seluruh jurusan, berita, pengumuman, prestasi, karya siswa, layanan digital, dan FAQ.
- Navigasi penuh keyboard (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`).

---

## 🛠️ Menjalankan Aplikasi

### Kebutuhan Sistem

- Node.js versi 18+ (direkomendasikan v20+)
- npm atau pnpm

### Konfigurasi API Key (Wajib)

File `src/services/aiService.ts` berisi API key Gemini sehingga tidak ikut di-push ke GitHub. Salin file contohnya terlebih dahulu:

```bash
# Linux / macOS / Git Bash
cp src/services/aiService.example.ts src/services/aiService.ts

# Windows PowerShell
Copy-Item src/services/aiService.example.ts src/services/aiService.ts
```

Lalu buka `src/services/aiService.ts` dan ganti `ISI_API_KEY_GEMINI_DI_SINI` pada `DEFAULT_GEMINI_API_KEY` dengan key dari [Google AI Studio](https://aistudio.google.com/apikey). Tanpa langkah ini aplikasi tidak bisa di-build karena file tersebut diimpor oleh asisten virtual.

### Langkah Menjalankan Mode Development

```bash
npm install
npm run dev
```

Akses di browser pada: `http://localhost:3000`

### Build untuk Produksi & Preview

```bash
npm run build
npm run preview
```

Akses preview pada: `http://localhost:4173`
