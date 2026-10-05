# DESIGN.md — Panduan Arah Desain & Identitas Visual SKANSA

Dokumen ini adalah sumber arah estetika dan jiwa (*soul*) antarmuka SMK Negeri 1 Bawang (SKANSA) Banjarnegara, digunakan bersama filter `antislop`.

---

## 1. Identitas & Karakter (Identity & Personality)
- **Nama Entitas**: SMK Negeri 1 Bawang (SKANSA) Banjarnegara
- **Posisi Institusi**: SMK Pusat Keunggulan (Center of Excellence), Pelaksana Teaching Factory Mandiri, Berdiri sejak 1964.
- **Karakter Desain**:
  - *Institutional & Authoritative*: Berwibawa, solid, dapat dipercaya oleh orang tua, siswa, dan industri mitra.
  - *Vocational Craftsmanship*: Menampilkan kecakapan teknis riil 8 jurusan kejuruan, bukan sekadar janji pemasaran digital.
  - *Warm Educational Tone*: Mengayomi, menjamin pendidikan berkualitas inklusif (Bebas Biaya SPP Bulanan Rp 0 didanai Pemprov Jateng).
  - *Editorial & Structured*: Layout asimetris ala jurnal atau majalah arsitektur vokasi terkemuka, bukan template kartu AI yang seragam.

---

## 2. Setelan Liveliness (Three Dials)
```text
Dial: ENERGY 2 / RHYTHM 3 / MOTION 2
```
- **ENERGY: 2 (Balanced Institutional)**
  - Tampilan percaya diri dan mantap. Bukan gaya kripto/SaaS murahan dengan gradien ungu neon, dan bukan pula situs dinas kaku kuno era 2000-an.
- **RHYTHM: 3 (Editorial Asymmetric)**
  - Ritme antar-seksi bervariasi: perpaduan seksi data kuota, narasi foto bengkel kejuruan layar penuh (*full-bleed*), grid modular interaktif, dan linimasa vertikal SPMB. Menolak tata letak seragam berulang.
- **MOTION: 2 (Contextual Smooth)**
  - Menggunakan akselerasi GSAP terukur dan smooth-scroll Lenis. Gerakan memiliki fungsi penuntun pandangan (*staggered entrance* dan hover feedback), tanpa efek animasi pusing/mengapung tanpa henti.

---

## 3. Palet Warna (Color Palette)
Mengikuti aturan R-29 (maksimal 2-3 warna utama + 1 warna aksen terukur):

1. **Primary Dominant**: Institutional Deep Navy (`#0B1E36`, `#0F172A`)
   - Memberikan bobot formal, legitimasi negara, dan ketegasan institusi pendidikan negeri.
2. **Supporting Blue**: Technical Royal Blue (`#1D4ED8`, `#2563EB`)
   - Mewakili kemajuan teknologi, jaringan fiber optik, dan rekayasa perangkat lunak.
3. **Accent Color**: High-Craftsmanship Warm Amber / Gold (`#F59E0B`, `#D97706`)
   - Digunakan secara selektif dan hemat untuk titik fokus: badge akreditasi unggul BAN-SM, kepastian SPP Rp 0, dan CTA primer.
4. **Neutrals & Surfaces**:
   - Clean Paper White (`#FFFFFF`)
   - Architectural Slate (`#F8FAFC`, `#F1F5F9`, `#E2E8F0`)
   - Charcoal Typography (`#0F172A`, `#1E293B`, `#334155`)

> **Larangan Estetika**:
> Dilarang menggunakan gradien ungu-pink neon, efek glow berlebihan di semua komponen, atau border radius pil pada semua elemen.

---

## 4. Tipografi Berkarakter (Typography)
1. **Antarmuka, Navigasi & Judul Utama**: `Plus Jakarta Sans`
   - Bobot tegas (Bold 700 / ExtraBold 800) untuk tajuk utama (*headlines*) dan label teknis.
   - Bobot terstruktur (Medium 500 / Regular 400) dengan *line-height* lapang untuk teks isi.
2. **Kutipan Pimpinan & Manifesto Kejuruan**: `Newsreader` (Serif Editorial)
   - Digunakan dengan gaya italic elegan untuk kutipan kepala sekolah dan falsafah nilai vokasi.

---

## 5. Kaidah Komposisi & Aksesibilitas (Craftsmanship & Levers)
- **Satu Titik Fokus per Layar**: Setiap seksi memiliki satu elemen terpenting yang mendominasi pandangan.
- **Kontras WCAG AA Mutlak**: Seluruh teks harus memiliki rasio kontras minimal 4.5:1 terhadap latar belakangnya.
- **Navigasi Keyboard Utuh**: Setiap tombol, tautan, dan bidang input wajib memiliki *ring focus* yang jelas (`focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none`).
- **Ikon Bertujuan**: Tidak ada ikon dekoratif kosong seperti `Sparkles` acak. Setiap ikon mewakili konsep riil (misal `GraduationCap` untuk jalur kelulusan, `Award` untuk akreditasi, `Compass` untuk eksplorasi jurusan).
