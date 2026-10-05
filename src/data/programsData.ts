import { ProgramKeahlian } from '../types';

export const PROGRAMS: ProgramKeahlian[] = [
  {
    id: "pplg",
    slug: "pplg",
    code: "PPLG",
    name: "Pengembangan Perangkat Lunak dan Gim",
    shortName: "PPLG (Rekayasa Perangkat Lunak)",
    category: "Teknologi Informasi",
    tagline: "Membangun Perangkat Lunak Skala Industri, Aplikasi Mobile, dan Media Gim Interaktif",
    accredited: "A (Unggul)",
    quotaPerYear: 108,
    classesCount: 3,
    headOfProgram: {
      name: "Bambang Wijayanto, S.Kom., M.T.",
      title: "Ketua Konsentrasi Keahlian PPLG"
    },
    description: "Program Keahlian PPLG menyiapkan tenaga profesional pengembang sistem aplikasi berbasis web, mobile (Android/iOS), dan gim. Siswa dilatih menulis kode bersih, arsitektur database relasional & NoSQL, integrasi API, UI/UX design modern, hingga penerapan kecerdasan buatan (AI) terapan pada solusi digital dunia nyata.",
    competencies: [
      {
        title: "Pemrograman Web & Backend Engineering",
        description: "Membangun sistem web modular menggunakan HTML5, Tailwind CSS, TypeScript/JavaScript, React/Vue, serta framework backend seperti Node.js, PHP Laravel, dan Python FastAPI.",
        skills: ["Frontend Modern (React, Tailwind)", "RESTful API & GraphQL", "Database MySQL & PostgreSQL", "Version Control Git & GitHub"]
      },
      {
        title: "Pengembangan Aplikasi Mobile",
        description: "Membuat aplikasi smartphone berbasis Flutter dan Kotlin yang terhubung dengan cloud server, autentikasi aman, dan offline-first synchronization.",
        skills: ["Flutter & Dart", "Kotlin Android SDK", "State Management (Bloc/Provider)", "App Store Deployment"]
      },
      {
        title: "Game Development & 2D/3D Assets",
        description: "Mengembangkan media gim interaktif dan simulasi edukasi memanfaatkan engine gim Godot dan Unity serta pembuatan aset grafis vektor dan sprite.",
        skills: ["Godot Engine (GDScript)", "Unity C# Fundamentals", "Game Mechanics & Physics", "Game Sound & UI Integration"]
      },
      {
        title: "UI/UX Design & DevOps Dasar",
        description: "Merancang wireframe dan prototipe interaktif berstandar industri dengan Figma serta automasi deployment cloud (Vercel, Docker dasar).",
        skills: ["Design System & Typography", "Figma Prototyping", "Docker Containers", "CI/CD Pipeline Dasar"]
      }
    ],
    labsAndFacilities: [
      {
        name: "Studio Software Development & AI Lab",
        description: "Laboratorium berstandar studio software dengan 36 PC workstation berkinerja tinggi, dual-monitor, dan jaringan gigabit privat.",
        equipment: ["36x PC Intel Core i7 13th Gen, 32GB RAM, RTX 4060", "Interactive Smart Board 75 Inch", "Dedicated Local Linux Server", "High-speed Fiber Optic 200 Mbps"]
      },
      {
        name: "Creative UI/UX & Game Testing Room",
        description: "Ruang pengujian usability aplikasi, perangkat tes mobile multi-resolusi, dan pengujian gameplay gim siswa.",
        equipment: ["10x Tablet Drawing & Android Test Devices", "Soundproof Audio Recording Booth", "Game Console Dev Kit"]
      }
    ],
    softwareAndTools: [
      "VS Code", "Git / GitHub", "Node.js", "Docker", "Postman", "Figma", "Android Studio", "Unity", "Godot Engine", "MySQL Workbench", "Tailwind CSS"
    ],
    careerPaths: [
      {
        role: "Junior Web Fullstack Developer",
        description: "Membangun dan memelihara aplikasi web korporat dan e-commerce dari sisi frontend hingga database.",
        industrySector: "Software House, Agensi Digital, BUMN & Swasta"
      },
      {
        role: "Mobile App Developer",
        description: "Mengembangkan aplikasi Android/iOS untuk startup dan layanan perbankan atau retail modern.",
        industrySector: "Fintech, Edutech, Healthtech"
      },
      {
        role: "UI/UX Designer",
        description: "Mendesain antarmuka produk digital yang ergonomis, intuitif, dan nyaman digunakan konsumen.",
        industrySector: "Agensi Desain, Studio Produk Digital"
      },
      {
        role: "Game Programmer / Junior Game Designer",
        description: "Mengimplementasikan mekanika permainan, sistem animasi, dan antarmuka pengguna pada gim.",
        industrySector: "Studio Gim Indie & Nasional"
      }
    ],
    industryPartners: [
      { name: "PT Gameloft Indonesia", partnershipType: "Kurikulum Industri & Magang Game Dev" },
      { name: "PT Telkom Indonesia (Witel Jateng)", partnershipType: "Sertifikasi Kompetensi & Beasiswa" },
      { name: "Refactory / Software Academy", partnershipType: "Bootcamp Kelas Industri Fullstack" },
      { name: "Dinas Kominfo Kab. Banjarnegara", partnershipType: "Teaching Factory Aplikasi Layanan Publik" }
    ],
    featuredProjects: [
      {
        title: "SIM-Perpus Skansa: Sistem Sirkulasi Digital Berbasis Barcode",
        studentName: "M. Farhan & Tim PPLG",
        year: "2025",
        description: "Aplikasi manajemen perpustakaan modern dengan fitur peminjaman mandiri via QR Code dan notifikasi otomatis WhatsApp.",
        result: "Digunakan aktif di Perpustakaan Graha Pustaka SMKN 1 Bawang melayani 2.000+ siswa."
      },
      {
        title: "Dawet Ayu Quest: Game Edukasi Budaya Banjarnegara",
        studentName: "Annisa Rahmawati & Tim",
        year: "2024",
        description: "Gim petualangan 2D platformer yang memperkenalkan sejarah kuliner dan landmark Kabupaten Banjarnegara.",
        result: "Meraih Juara 1 Gelar Karya Teknologi Inovasi Pelajar Jawa Tengah."
      }
    ],
    achievements: [
      { title: "Medali Emas LKS Wilayah Kerja III Jawa Tengah - Web Technologies", level: "Karesidenan / Wilker", year: "2024" },
      { title: "Juara 2 Lomba Kompetensi Siswa (LKS) Tingkat Nasional - IT Software Solutions for Business", level: "Nasional", year: "2023" },
      { title: "Finalis Nasional Gemastik / Kompetisi Inovasi Aplikasi Pelajar", level: "Nasional", year: "2024" }
    ],
    faqs: [
      {
        question: "Apakah harus punya laptop sendiri untuk masuk jurusan PPLG?",
        answer: "Tidak wajib. Sekolah menyediakan 8 laboratorium komputer berkinerja tinggi lengkap dengan spesifikasi mutakhir yang dapat digunakan siswa selama jam KBM maupun jam praktik mandiri."
      },
      {
        question: "Apakah yang dipelajari hanya game saja?",
        answer: "Tidak. Porsi pembelajaran mencakup web engineering, aplikasi mobile enterprise, basis data, dan UI/UX design. Game development merupakan salah satu sub-kompetensi pendalaman logika komputasi."
      }
    ]
  },
  {
    id: "tjkt",
    slug: "tjkt",
    code: "TJKT",
    name: "Teknik Jaringan Komputer dan Telekomunikasi",
    shortName: "TJKT (Teknik Komputer Jaringan)",
    category: "Teknologi Informasi",
    tagline: "Menguasai Infrastruktur Jaringan Cloud, Fiber Optik, Keamanan Siber, dan Server Skala Luas",
    accredited: "A (Unggul)",
    quotaPerYear: 108,
    classesCount: 3,
    headOfProgram: {
      name: "Agus Prasetyo, S.T., M.Kom.",
      title: "Ketua Konsentrasi Keahlian TJKT"
    },
    description: "TJKT SMKN 1 Bawang mendidik teknisi jaringan handal yang menguasai perancangan infrastruktur jaringan skala kecil hingga enterprise. Mengintegrasikan teknologi fiber optic splicing, konfigurasi perangkat Cisco & MikroTik, administrasi server Linux/Windows, cloud computing AWS/GCP, dan pertahanan siber dasar.",
    competencies: [
      {
        title: "Infrastruktur Jaringan & Routing Switching",
        description: "Konfigurasi VLAN, OSPF, BGP, VPN IPsec, dan manajemen bandwidth menggunakan perangkat MikroTik dan Cisco Router.",
        skills: ["Cisco CCNA Fundamentals", "MikroTik MTCNA / MTCRE", "Switching & Routing Skala Luas", "Troubleshooting Hardware Jaringan"]
      },
      {
        title: "Teknologi Fiber Optik (FTTH)",
        description: "Penyambungan kabel optik (fusion splicing), pengukuran redaman OPM dan identifikasi gangguan dengan OTDR standar Telkom.",
        skills: ["Fusion Splicing", "OTDR Testing & Analysis", "ODC & ODP Termination", "Instalasi FTTH Pelanggan"]
      },
      {
        title: "Sistem Administrasi Server & Cloud",
        description: "Pengelolaan server Linux Ubuntu/Debian, virtualization Proxmox, web server Nginx/Apache, DNS, mail server, dan keamanan firewall.",
        skills: ["Linux Server Administration", "Proxmox VE & Docker", "Cloud Virtual Private Server (VPS)", "Firewall iptables / UFW"]
      },
      {
        title: "Keamanan Siber (Cyber Security) Dasar",
        description: "Audit kerentanan jaringan, proteksi serangan DoS/DDoS, serta penerapan enkripsi SSL/TLS dan pengamanan credential.",
        skills: ["Network Auditing (Wireshark, Nmap)", "Penetration Testing Dasar", "Penerapan Best Practice Keamanan Data"]
      }
    ],
    labsAndFacilities: [
      {
        name: "MikroTik & Cisco Networking Academy Lab",
        description: "Laboratorium resmi MikroTik Academy dengan 36 unit RouterBoard RB750/RB951 dan Cisco 2960 Switch di setiap meja kerja siswa.",
        equipment: ["36x MikroTik RouterBoard", "12x Cisco Catalyst 2960 Series", "Rack Server 42U dengan patch panel", "Kabel Tester Fluke Networks"]
      },
      {
        name: "Fiber Optik & FTTH Workshop",
        description: "Tempat praktik penyambungan kabel fiber optik, tiang simulasi jaringan kabel udara, dan kotak distribusi ODP.",
        equipment: ["4x Optical Fusion Splicer Fujikura/Sumitomo", "2x Optical Time-Domain Reflectometer (OTDR)", "Cleaver presisi tinggi & OPM", "Simulasi Kabel Udara FTTH"]
      }
    ],
    softwareAndTools: [
      "MikroTik RouterOS / Winbox", "Cisco Packet Tracer", "GNS3 / EVE-NG", "Wireshark", "Proxmox VE", "Linux Debian/Ubuntu Server", "Nmap", "Putty / SSH Client"
    ],
    careerPaths: [
      {
        role: "Network Administrator / Engineer",
        description: "Mengelola, memantau, dan mengamankan jaringan komputer perusahaan agar berjalan 24/7 tanpa henti.",
        industrySector: "Internet Service Provider (ISP), Perbankan, Instansi Pemerintah"
      },
      {
        role: "Fiber Optic Technician",
        description: "Pemasangan kabel serat optik, splicing, dan perbaikan infrastruktur broadband telekomunikasi.",
        industrySector: "PT Telkom, Icon+, Moratelindo, Fiberstar"
      },
      {
        role: "System Administrator / Cloud Support",
        description: "Mengelola server korporat, backup data, dan infrastruktur cloud komputasi.",
        industrySector: "Data Center, Perusahaan TI, Startup"
      },
      {
        role: "Helpdesk & IT Support Specialist",
        description: "Menangani kendala teknis perangkat keras, sistem operasi, dan konektivitas pengguna akhir.",
        industrySector: "Seluruh Korporat & Lembaga"
      }
    ],
    industryPartners: [
      { name: "PT Telkom Indonesia Tbk", partnershipType: "Kelas Industri FTTH & Sertifikasi Fiber Optik" },
      { name: "MikroTik Certified Training Partner", partnershipType: "Akademi Resmi & Sertifikasi MTCNA untuk Siswa" },
      { name: "PT Citra Jelajah Informatika (Ciji)", partnershipType: "Magang ISP & Manajemen Data Center" }
    ],
    featuredProjects: [
      {
        title: "Implementasi Smart Campus Wi-Fi 6 Berbasis Captive Portal Terpusat",
        studentName: "Dicky Pratama & Tim TJKT",
        year: "2025",
        description: "Perancangan arsitektur jaringan nirkabel kampus SMKN 1 Bawang yang mampu melayani 2.000 user serentak dengan bandwidth management adil.",
        result: "Diterapkan di seluruh area sekolah sebagai infrastruktur jaringan utama."
      }
    ],
    achievements: [
      { title: "Juara 1 LKS Tingkat Provinsi Jawa Tengah - Information Network Cabling", level: "Provinsi", year: "2024" },
      { title: "Medali Perunggu LKS Nasional - Network Systems Administration", level: "Nasional", year: "2023" }
    ],
    faqs: [
      {
        question: "Apakah lulusan TJKT mendapatkan sertifikasi internasional?",
        answer: "Ya. Sebagai MikroTik Academy resmi, siswa TJKT SMKN 1 Bawang berhak mengikuti ujian sertifikasi internasional MTCNA (MikroTik Certified Network Associate) yang diakui di seluruh dunia."
      }
    ]
  },
  {
    id: "akl",
    slug: "akl",
    code: "AKL",
    name: "Akuntansi dan Keuangan Lembaga",
    shortName: "AKL (Akuntansi)",
    category: "Bisnis & Manajemen",
    tagline: "Ketepatan Analisis Finansial, Perbankan Modern, Perpajakan Digital, dan Audit Berstandar PSAK",
    accredited: "A (Unggul)",
    quotaPerYear: 108,
    classesCount: 3,
    headOfProgram: {
      name: "Siti Nurjanah, S.Pd., M.Ak.",
      title: "Ketua Konsentrasi Keahlian AKL"
    },
    description: "AKL merupakan jurusan tertua dan berakar kuat di SMKN 1 Bawang sejak era SMEA 1964. Mempersiapkan teknisi akuntansi madya yang menguasai siklus akuntansi perusahaan jasa, dagang, dan manufaktur, tata kelola keuangan perbankan syariah/konvensional, aplikasi akuntansi komputer (MYOB & Accurate), dan pelaporan perpajakan e-Faktur/e-Bupot.",
    competencies: [
      {
        title: "Akuntansi Keuangan & Siklus PSAK",
        description: "Pencatatan jurnal, buku besar, neraca lajur, laporan laba rugi, perubahan modal, neraca, dan arus kas berstandar akuntansi keuangan terbaru.",
        skills: ["Siklus Akuntansi Lengkap", "Analisis Laporan Keuangan", "Akuntansi Biaya Manufaktur", "Pemeriksaan Kas Kecil & Rekonsiliasi Bank"]
      },
      {
        title: "Komputer Akuntansi (MYOB & Accurate)",
        description: "Operasionalisasi software akuntansi berbasis desktop dan cloud untuk otomasi pembukuan dan inventarisasi stok perusahaan.",
        skills: ["MYOB Accounting v25+", "Accurate Online (Cloud Accounting)", "Advanced Spreadsheet Financial Modeling"]
      },
      {
        title: "Layanan Perbankan & Lembaga Keuangan Mikro",
        description: "Operasional customer service perbankan, administrasi teller, tabungan siswa, dan kredit mikro di Teaching Factory Bank Mini Skansa.",
        skills: ["Simulasi Core Banking System", "Standar Operasional Teller & CS", "Manajemen Kasir & Validasi Uang Asli"]
      },
      {
        title: "Administrasi Perpajakan Digital",
        description: "Penghitungan PPh Pasal 21, 22, 23, PPN, dan pengisian SPT Tahunan secara elektronik melalui aplikasi DJP Online.",
        skills: ["Perhitungan PPh & PPN", "Aplikasi e-Faktur & e-SPT", "Pelayanan Asistensi Pajak UMKM"]
      }
    ],
    labsAndFacilities: [
      {
        name: "Teaching Factory Bank Mini Skansa",
        description: "Gedung layanan perbankan mini nyata di area depan sekolah yang melayani transaksi tabungan seluruh siswa dan guru.",
        equipment: ["3 Loket Teller & CS Counter resmi", "Mesin Penghitung Uang Otomatis & UV Detector", "Sistem Software Tabungan Berbasis Barcode", "Mesin Antrian Elektronik"]
      },
      {
        name: "Laboratorium Komputer Akuntansi Terpadu",
        description: "Lab komputasi akuntansi berlisensi Accurate dan MYOB untuk simulasi pembukuan ribuan transaksi perusahaan.",
        equipment: ["72 Unit PC All-in-One", "Software Accurate Online Edukasi Resmi", "Printer Kasir & Formulir Transaksi"]
      }
    ],
    softwareAndTools: [
      "Accurate Online", "MYOB Accounting", "Microsoft Excel / Google Sheets Advanced", "DJP Online (e-Billing, e-Filing)", "Core Banking Mini App"
    ],
    careerPaths: [
      {
        role: "Staf Akuntansi & Pembukuan",
        description: "Menyusun jurnal harian, rekonsiliasi kas, dan laporan keuangan perusahaan.",
        industrySector: "Perusahaan Dagang, Manufaktur, Jasa, Korporat"
      },
      {
        role: "Teller & Customer Service Bank",
        description: "Melayani penerimaan setoran, penarikan, dan konsultasi produk keuangan nasabah.",
        industrySector: "Bank BRI, BNI, Bank Mandiri, BPR BKK Banjarnegara"
      },
      {
        role: "Staf Administrasi Perpajakan",
        description: "Mengelola bukti potong, menghitung kewajiban pajak, dan membuat laporan SPT masa/tahunan.",
        industrySector: "Kantor Konsultan Pajak, Kantor Akuntan Publik (KAP)"
      },
      {
        role: "Verifikator & Internal Auditor Junior",
        description: "Memeriksa kesesuaian dokumen bukti kas keluar dan kelengkapan administrasi pengadaan barang.",
        industrySector: "Instansi Pemerintah, BUMD, Korporat Swasta"
      }
    ],
    industryPartners: [
      { name: "PT BPR BKK Mandiraja (Perseroda)", partnershipType: "Kelas Industri Perbankan & Praktik Kerja Lapangan" },
      { name: "Kantor Pelayanan Pajak (KPP) Pratama Banjarnegara", partnershipType: "Relawan Pajak & Tax Center Asistensi SPT" },
      { name: "Ikatan Akuntan Indonesia (IAI) Wilayah Jawa Tengah", partnershipType: "Uji Sertifikasi Teknis Akuntansi Junior" }
    ],
    featuredProjects: [
      {
        title: "Posko Relawan Pajak: Asistensi 500+ Pelaporan SPT Tahunan Wajib Pajak",
        studentName: "Dina Tri Utami & Tim AKL",
        year: "2025",
        description: "Program pengabdian vokasi di mana siswa AKL membimbing para guru, warga Bawang, dan pelaku UMKM dalam melaporkan SPT Tahunan secara daring.",
        result: "Mendapat penghargaan dari Kepala KPP Pratama Banjarnegara atas kontribusi kepatuhan pajak daerah."
      }
    ],
    achievements: [
      { title: "Juara 1 LKS Tingkat Provinsi Jawa Tengah - Accounting", level: "Provinsi", year: "2024" },
      { title: "Juara 2 Olimpiade Akuntansi Nasional Tingkat Vokasi", level: "Nasional", year: "2023" }
    ],
    faqs: [
      {
        question: "Apakah lulusan AKL bisa langsung bekerja di perbankan?",
        answer: "Sangat bisa. Melalui pembekalan langsung di Teaching Factory Bank Mini Skansa dan sertifikasi BNSP teknisi akuntansi junior, lulusan AKL SMKN 1 Bawang terserap luas di bank pemerintah, BPR, koperasi simpan pinjam, dan lembaga pembiayaan."
      }
    ]
  },
  {
    id: "mplb",
    slug: "mplb",
    code: "MPLB",
    name: "Manajemen Perkantoran dan Layanan Bisnis",
    shortName: "MPLB (Otomatisasi Tata Kelola Perkantoran)",
    category: "Bisnis & Manajemen",
    tagline: "Keprotokolan Unggul, Kearsipan Digital Modern, Komunikasi Bisnis Profesional, dan Manajemen Event",
    accredited: "A (Unggul)",
    quotaPerYear: 72,
    classesCount: 2,
    headOfProgram: {
      name: "Dra. Sri Wahyuni, M.Pd.",
      title: "Ketua Konsentrasi Keahlian MPLB"
    },
    description: "MPLB melahirkan tenaga sekretaris eksekutif dan manajer kantor modern yang adaptif terhadap otomatisasi tempat kerja. Siswa menguasai korespondensi bisnis dwi-bahasa (Indonesia-Inggris), kearsipan elektronik berbasis cloud, etika keprotokolan dan public relations, manajemen rapat resmi, dan teknologi presentasi interaktif.",
    competencies: [
      {
        title: "Otomatisasi Perkantoran & Digital Filing",
        description: "Pengelolaan arsip dokumen secara elektronik, pemindaian OCR berkecepatan tinggi, dan klasifikasi sistem abjad, kronologis, dan desimal.",
        skills: ["E-Arsip & Cloud Storage", "Kecepatan Mengetik 250+ EPM", "Manajemen Surat Masuk & Keluar Digital", "Data Entry Akurasi Tinggi"]
      },
      {
        title: "Keprotokolan, Humas & Public Speaking",
        description: "Tata tempat, tata upacara, dan tata penghormatan pejabat tamu, master of ceremony (MC) resmi, serta press release institusi.",
        skills: ["Master of Ceremony (MC) Dwi-Bahasa", "Tata Protokoler Resmi", "Public Relations & Customer Care", "Service Excellence"]
      },
      {
        title: "Manajemen Event & Rapat Bisnis",
        description: "Perencanaan rundown acara, koordinasi logistik, penyusunan notulen rapat eksekutif, dan tindak lanjut keputusan manajemen.",
        skills: ["Event Organizing", "Notulensi Berstandar Eksekutif", "Reservasi & Perjalanan Dinas", "Presentasi Bisnis Interaktif"]
      }
    ],
    labsAndFacilities: [
      {
        name: "Laboratorium Simulasi Perkantoran Eksekutif",
        description: "Desain kantor terbuka (open-plan office) dengan bilik kerja manajerial, meja direksi, ruang rapat boardroom berlayar proyeksi, dan meja resepsionis.",
        equipment: ["Meja Resepsionis & Switchboard PABX", "Peralatan Scanner Dokumen Otomatis High-speed", "Boardroom Meeting Table dengan Konferensi Video", "Mesin Laminating & Penghancur Kertas (Paper Shredder)"]
      }
    ],
    softwareAndTools: [
      "Microsoft 365 / Google Workspace", "Aplikasi E-Office & Persuratan", "Canva Pro", "Zoom & Google Meet Enterprise", "Typing Master Pro"
    ],
    careerPaths: [
      {
        role: "Sekretaris / Executive Assistant",
        description: "Mendampingi pimpinan dalam mengatur agenda rapat, korespondensi penting, dan koordinasi divisi.",
        industrySector: "Korporat Multinasional, Lembaga Negara, BUMN"
      },
      {
        role: "Arsiparis Digital (Records Manager)",
        description: "Mengklasifikasikan, memelihara, dan menjamin keamanan dokumen legal dan operasional instansi.",
        industrySector: "Dinas Pemerintahan, Rumah Sakit, Kantor Notaris, Perbankan"
      },
      {
        role: "Public Relations Officer / Front Office Manager",
        description: "Menjadi wajah depan institusi dalam menerima tamu kehormatan dan melayani pertanyaan pelanggan.",
        industrySector: "Perhotelan, Rumah Sakit, Kantor Pemerintahan, Korporasi"
      }
    ],
    industryPartners: [
      { name: "Sekretariat Daerah (SETDA) Kab. Banjarnegara", partnershipType: "Praktik Protokoler & Kearsipan Kedinasan" },
      { name: "PT POS Indonesia (Persero)", partnershipType: "Logistik Dokumen & Layanan Pelanggan" },
      { name: "PT Surya Madistrindo", partnershipType: "Rekrutmen Administrasi Perkantoran Cabang" }
    ],
    featuredProjects: [
      {
        title: "Biro Jasa Layanan Persuratan & EO Siswa Skansa",
        studentName: "Devi Anggraini & Tim MPLB",
        year: "2024",
        description: "Penyelenggaraan event wisuda dan seminar karir sekolah secara profesional dengan sistem tiket digital dan registrasi barcode.",
        result: "Menangani lebih dari 1.200 peserta wisudawan dan tamu kehormatan dengan rating kepuasan 98%."
      }
    ],
    achievements: [
      { title: "Juara 1 LKS Tingkat Provinsi Jawa Tengah - Bilingual Secretary", level: "Provinsi", year: "2024" },
      { title: "Juara Harapan 1 LKS Tingkat Nasional - Bilingual Secretary", level: "Nasional", year: "2023" }
    ],
    faqs: [
      {
        question: "Apakah lulusan MPLB hanya belajar mengetik surat?",
        answer: "Sama sekali tidak. Kurikulum modern MPLB mencakup manajemen acara (event organizer), keprotokolan kedinasan, public speaking, kearsipan elektronik berbasis database, dan administrasi digital dwi-bahasa."
      }
    ]
  },
  {
    id: "pemasaran",
    slug: "pemasaran",
    code: "PM",
    name: "Pemasaran (Bisnis Digital)",
    shortName: "Pemasaran (Bisnis Daring & Ritel)",
    category: "Bisnis & Manajemen",
    tagline: "E-Commerce Growth, Live Streaming Commerce, Manajemen Ritel Modern, dan Optimasi Digital Ads",
    accredited: "A (Unggul)",
    quotaPerYear: 72,
    classesCount: 2,
    headOfProgram: {
      name: "Heri Santoso, S.E., M.M.",
      title: "Ketua Konsentrasi Keahlian Pemasaran"
    },
    description: "Program Keahlian Pemasaran membekali siswa dengan keahlian komprehensif mulai dari ritel modern fisik hingga lanskap digital commerce kontemporer. Siswa menguasai live streaming selling di TikTok/Shopee, pembuatan konten promosi video kreatif, copywriting persuasif, Facebook/Google Ads, serta pengelolaan visual merchandising di minimarket kampus.",
    competencies: [
      {
        title: "Bisnis Digital & E-Commerce Operations",
        description: "Mengelola toko online di marketplace (Shopee, Tokopedia, TikTok Shop), strategi customer retention, dan analisis analitik toko.",
        skills: ["Marketplace Store Management", "TikTok Shop & Shopee Live Selling", "Customer Relationship Management (CRM)", "Fulfillment & Logistik Pengiriman"]
      },
      {
        title: "Digital Marketing & Content Creation",
        description: "Produksi video konten viral untuk promosi produk, copywriting formula AIDA, strategi SEO dasar, dan manajemen iklan berbayar (Meta Ads).",
        skills: ["Copywriting Komersial", "Produksi Video Pendek Reels/TikTok", "Meta & TikTok Ads Campaign", "Analisis Metrik ROAS & CTR"]
      },
      {
        title: "Pengelolaan Bisnis Ritel Modern",
        description: "Penataan display barang (visual merchandising), sistem kasir POS, stok opname barcode, dan pelayanan pelanggan prima di Skansa Mart.",
        skills: ["Point of Sales (POS) Systems", "Visual Merchandising & Planogram", "Stock Opname & Inventory Control", "Teknik Negosiasi & Salesmanship"]
      }
    ],
    labsAndFacilities: [
      {
        name: "Teaching Factory Skansa Mart (Minimarket Modern)",
        description: "Minimarket ritel operasional di lingkungan sekolah yang menyediakan aneka kebutuhan harian siswa, guru, dan masyarakat sekitar.",
        equipment: ["2 Meja Kasir Barcode Scanner POS", "Rak Gondola Display Standar Alfamart/Indomaret", "Cold Showcase Chiller", "Sistem Monitoring CCTV & Inventory"]
      },
      {
        name: "Studio Live Streaming & Creative Commerce",
        description: "Studio kedap suara dengan ring light, smartphone broadcasting kamera ganda, dan green screen untuk siaran live commerce siswa.",
        equipment: ["3x Set Live Streaming Broadcast (Ringlight, Mic Wireless)", "Display Display Produk Estetik", "PC Studio Kontrol Siaran"]
      }
    ],
    softwareAndTools: [
      "TikTok Seller Center", "Shopee Merchant Portal", "Meta Business Suite", "Canva Pro", "CapCut Video Editor", "POS Olsera / Moka POS"
    ],
    careerPaths: [
      {
        role: "Digital Marketing Specialist / E-Commerce Specialist",
        description: "Merencanakan kampanye penjualan daring, mengatur stok toko online, dan mengoptimalkan performa iklan.",
        industrySector: "Agensi Pemasaran, Brand Fashion, FMCG, E-Commerce"
      },
      {
        role: "Professional Live Streamer / Host Penjualan",
        description: "Memandu siaran langsung promosi produk dengan teknik interaksi ramah dan persuasif untuk memicu konversi pembelian.",
        industrySector: "Agency MCN, Brand Retail, UMKM Ekspor"
      },
      {
        role: "Store Supervisor / Retail Merchandiser",
        description: "Mengawasi operasional gerai ritel modern, rotasi barang pajang, dan pencapaian target omzet toko.",
        industrySector: "Jaringan Minimarket Nasional, Swalayan, Butik"
      },
      {
        role: "Wirausahawan Mandiri (Entrepreneur)",
        description: "Mendirikan dan mengembangkan usaha rintisan mandiri dengan memanfaatkan kanal digital.",
        industrySector: "Sektor Mandiri UMKM"
      }
    ],
    industryPartners: [
      { name: "PT Sumber Alfaria Trijaya Tbk (Alfamart)", partnershipType: "Alfamart Class & Rekrutmen Langsung Asisten Kepala Toko" },
      { name: "Shopee Indonesia Regional Jateng", partnershipType: "Pelatihan Live Streaming Seller & Inkubator Siswa" },
      { name: "Asosiasi UMKM Banjarnegara", partnershipType: "Pemasaran Produk Lokal Melalui Kanal Digital Siswa" }
    ],
    featuredProjects: [
      {
        title: "Inkubator Live Commerce UMKM Banjarnegara",
        studentName: "Rizky Fauzi & Tim Pemasaran",
        year: "2024",
        description: "Siswa jurusan pemasaran memfasilitasi siaran langsung live selling produk kopi Banjarnegara dan keripik salak di TikTok Shop.",
        result: "Membukukan omzet puluhan juta rupiah dalam 1 bulan festival UMKM lokal."
      }
    ],
    achievements: [
      { title: "Juara 1 LKS Tingkat Provinsi Jawa Tengah - Marketing Online", level: "Provinsi", year: "2024" },
      { title: "Juara 3 Kompetisi Bisnis Digital Pelajar Tingkat Nasional", level: "Nasional", year: "2023" }
    ],
    faqs: [
      {
        question: "Apakah lulusan pemasaran hanya jadi pramuniaga toko?",
        answer: "Tentu tidak. Fokus pembelajaran saat ini didominasi oleh ekonomi digital: e-commerce specialist, digital ads advertiser, content creator, live streamer profesional, hingga supervisor ritel modern dengan jenjang karir manajerial."
      }
    ]
  },
  {
    id: "busana",
    slug: "busana",
    code: "BUSANA",
    name: "Desain dan Produksi Busana",
    shortName: "Desain & Tata Busana (Fesyen)",
    category: "Seni & Ekonomi Kreatif",
    tagline: "Eksplorasi Haute Couture, Busana Etnik Kontemporer, Pembuatan Pola Digital, dan Manajemen Butik Fesyen",
    accredited: "A (Unggul)",
    quotaPerYear: 72,
    classesCount: 2,
    headOfProgram: {
      name: "Tri Haryati, S.Pd.",
      title: "Ketua Konsentrasi Keahlian Busana"
    },
    description: "Konsentrasi Busana SMKN 1 Bawang memadukan kekayaan warisan wastra Nusantara dengan tren mode global modern. Siswa dilatih menggambar sketsa ilustrasi mode (fashion illustration), konstruksi pola datar maupun draping, teknik jahit adi busana (haute couture), pembordiran terkomputerisasi, hingga penyelenggaraan peragaan busana bergengsi (fashion show).",
    competencies: [
      {
        title: "Ilustrasi Mode & Konsep Desain Fesyen",
        description: "Mengembangkan moodboard rancangan, menggambar proporsi tubuh manusia (figurine), mewarnai tekstur kain, dan merancang koleksi tematik.",
        skills: ["Fashion Sketching & Moodboard", "Digital Fashion Illustration (CorelDRAW/Procreate)", "Analisis Tren Mode & Teori Warna", "Pemilihan Material Tekstil"]
      },
      {
        title: "Pembuatan Pola (Pattern Making) & Draping",
        description: "Membuat pola konstruksi busana wanita, pria, dan anak, grading ukuran (S, M, L, XL), serta teknik manipulasi kain langsung pada dummy (draping).",
        skills: ["Konstruksi Pola Busana Tingkat Lanjut", "Teknik Draping pada Mannequin", "Grading Pola Komputerisasi", "Pecah Pola Desain Asimetris"]
      },
      {
        title: "Teknik Menjahit Standar Butik & Haute Couture",
        description: "Menjahit gaun pesta, kebaya modern, jas pria (tailoring), busana ready-to-wear, dan teknik penyelesaian kelim/kampuh halus tanpa obras.",
        skills: ["Pengoperasian Mesin Jahit High-Speed", "Pemasangan Furing & Tulang Gaun", "Teknik Tailoring Jas & Blazer", "Penyelesaian Jahit Tangan Halus"]
      },
      {
        title: "Eksplorasi Wastra Batik & Eco-Fashion",
        description: "Pengembangan motif batik khas Banjarnegara (Gilar-gilar), teknik ecoprint daun alami, dan bordir aplikasi modern.",
        skills: ["Ecoprint Tekstil Ramah Lingkungan", "Pencantingan & Pewarnaan Batik", "Aplikasi Payet & Beading", "Styling & Photo Session Busana"]
      }
    ],
    labsAndFacilities: [
      {
        name: "Teaching Factory Butik Skansa Fashion Studio",
        description: "Studio produksi busana berstandar garmen ekspor dan butik pesanan kustom (made-to-order) gaun pesta dan seragam.",
        equipment: ["30x Mesin Jahit High-Speed Industri Juki", "4x Mesin Obras 5-Benang & Mesin Pasang Kancing", "Meja Potong Pola Elektrik Panjang 6 Meter", "20x Mannequin Draping Standar Internasional"]
      },
      {
        name: "Studio Desain & Cetak Pola Digital",
        description: "Ruang komputer desain khusus untuk membuat sketsa vektor mode dan plotter pencetak pola skala 1:1.",
        equipment: ["PC Grafis Khusus Fashion", "Drawing Tablet Monitor Huion", "Mesin Plotter Cetak Pola Lebar"]
      }
    ],
    softwareAndTools: [
      "CorelDRAW Fashion", "Adobe Illustrator", "Procreate", "Optitex Pattern Software", "Richpeace Garment CAD"
    ],
    careerPaths: [
      {
        role: "Fashion Designer / Perancang Busana",
        description: "Menciptakan koleksi busana untuk brand fashion, desainer independen, atau rumah mode.",
        industrySector: "Rumah Mode, Brand Clothing, Industri Garment"
      },
      {
        role: "Pattern Maker (Pembuat Pola Profesional)",
        description: "Mengubah sketsa visual perancang menjadi pola potongan kain presisi yang siap dipotong.",
        industrySector: "Pabrik Garmen Ekspor, Butik Bridal, Konveksi Modern"
      },
      {
        role: "Fashion Stylist & Wardrobe Consultant",
        description: "Menata busana model untuk sesi foto komersial, peragaan busana, atau produksi film/televisi.",
        industrySector: "Agensi Modeling, Rumah Produksi, Media Mode"
      },
      {
        role: "Pemilik Usaha Butik / Modiste Mandiri",
        description: "Menjalankan bisnis pembuatan busana kustom pesta, pernikahan, dan seragam resmi.",
        industrySector: "Wirausaha Kreatif Mandiri"
      }
    ],
    industryPartners: [
      { name: "PT Dan Liris Surakarta", partnershipType: "Magang Garmen Ekspor & Penempatan Kerja Lulusan" },
      { name: "Indonesian Fashion Chamber (IFC) Chapter Jateng", partnershipType: "Mentoring Desainer & Kurasi Panggung Catwalk" },
      { name: "Batik Canting Mas Banjarnegara", partnershipType: "Pengembangan Motif Warisan Daerah & Pewarnaan Alami" }
    ],
    featuredProjects: [
      {
        title: "Koleksi 'Pesona Dieng': Peragaan Busana di Jogja Fashion Week",
        studentName: "Dewi Sekar & Tim Tata Busana",
        year: "2024",
        description: "Rancangan 8 set busana ready-to-wear kontemporer mengangkat motif candi Dieng dan warna alam pegunungan Jawa Tengah.",
        result: "Dipuji oleh desainer nasional dan diliput media gaya hidup terkemuka."
      }
    ],
    achievements: [
      { title: "Medali Emas LKS Tingkat Provinsi Jawa Tengah - Fashion Technology", level: "Provinsi", year: "2024" },
      { title: "Juara Harapan 1 LKS Tingkat Nasional - Fashion Technology", level: "Nasional", year: "2023" },
      { title: "Best Collection pada Ajang Modest Fashion Fest Pelajar Jateng", level: "Provinsi", year: "2024" }
    ],
    faqs: [
      {
        question: "Apakah siswa laki-laki boleh memilih jurusan Busana?",
        answer: "Sangat boleh. Di dunia industri fesyen global, banyak perancang busana, pattern maker garmen ekspor, dan penjahit jas (tailor) profesional adalah laki-laki. Jurusan Busana terbuka untuk seluruh siswa bertalenta seni tinggi."
      }
    ]
  },
  {
    id: "perikanan",
    slug: "perikanan",
    code: "AP",
    name: "Agribisnis Perikanan Air Tawar",
    shortName: "Agribisnis Perikanan (Budidaya Ikan)",
    category: "Agribisnis",
    tagline: "Teknologi Bioflok Modern, Pembenihan Ikan Unggul, Formulasi Pakan Mandiri, dan Pengolahan Pascapanen",
    accredited: "A (Unggul)",
    quotaPerYear: 72,
    classesCount: 2,
    headOfProgram: {
      name: "Ir. Joko Susilo, M.Si.",
      title: "Ketua Konsentrasi Keahlian Agribisnis Perikanan"
    },
    description: "Memanfaatkan potensi geografis Banjarnegara yang kaya sumber air tawar jernih dari lereng pegunungan, program AP mendidik agropreneur perikanan modern. Siswa mendalami bioteknologi budidaya bioflok intensif, pemijahan buatan ikan nila, gurame, dan lele, uji kualitas air lab kimia/biologi, formulasi pelet pakan mandiri bernutrisi tinggi, hingga pengolahan diversifikasi produk pangan berbasis ikan.",
    competencies: [
      {
        title: "Teknologi Budidaya Sistem Bioflok & RAS",
        description: "Mengembangkan mikroorganisme flok untuk menjaga kualitas air dan efisiensi pakan pada kolam bundar terpal hemat lahan.",
        skills: ["Manajemen Probiotik & C:N Ratio", "Instalasi Aerasi High-Pressure Blower", "Pengoperasian Recirculating Aquaculture System (RAS)", "Pencegahan Hama Penyakit Ikan"]
      },
      {
        title: "Teknik Pembenihan & Pemijahan Ikan (Breeding)",
        description: "Seleksi indukan unggul, pemijahan alami dan buatan dengan induksi hormon, pemeliharaan larva, dan pendederan.",
        skills: ["Injeksi Hormon Ovaprim", "Manajemen Pakan Alami (Daphnia, Artemia)", "Sortir Ukuran Benih Berstandar SNI", "Pengemasan Benih Beroksigen Murni"]
      },
      {
        title: "Formulasi & Produksi Pakan Ikan Mandiri",
        description: "Menghitung kebutuhan protein, mencampur bahan baku lokal seperti dedak, tepung ikan, dan maggot BSF menjadi pelet apung berkualitas.",
        skills: ["Formulasi Nutrisi Pakan (Pearson Square)", "Pengoperasian Mesin Extruder Pelet Apung", "Uji Daya Apung & Ketahanan Air", "Kultur Maggot Black Soldier Fly (BSF)"]
      },
      {
        title: "Pengolahan Hasil Perikanan & Pemasaran",
        description: "Pengolahan daging ikan menjadi abon nila, nugget ikan, frozen food berlabel halal, dan pengemasan vacuum modern.",
        skills: ["Fillet Ikan Higienis", "Teknologi Pengalengan & Vacuum Packaging", "Sanitasi & Higiene Pangan HACCP Dasar", "Manajemen Rantai Pasok Ikan Segar"]
      }
    ],
    labsAndFacilities: [
      {
        name: "Sentra Bioflok & Kolam Praktik Kampus Skansa",
        description: "Lahan seluas 1.500 m² yang dilengkapi 16 unit kolam bundar diameter 3 meter dengan sistem aerasi terpusat dan sensor monitoring suhu/pH.",
        equipment: ["16 Kolam Terpal Bundar HDPE Bioflok", "Blower Aerasi Hiblow Continue 24 Jam", "DO Meter Digital, pH Meter, dan Refraktometer", "Mesin Cetak Pelet Apung Kapasitas 100 kg/jam"]
      },
      {
        name: "Laboratorium Kualitas Air & Pembenihan Indoor",
        description: "Laboratorium tertutup untuk penetasan telur ikan, kultur pakan alami mikroskopis, dan nekropsi diagnosis penyakit ikan.",
        equipment: ["Aquarium Hatchery Suhu Terkontrol", "Mikroskop Binokuler Optik dengan Monitor", "Centrifuge & Test Kit Kimia Air", "Tabung Oksigen Murni Pengemasan Benih"]
      }
    ],
    softwareAndTools: [
      "Aplikasi Smart Water Quality Monitor", "Software Formulasi Pakan FeedMixer", "DO Meter Digital", "Refraktometer Salinitas", "Autoclave Sterilisasi"
    ],
    careerPaths: [
      {
        role: "Aquaculture Farm Manager / Supervisor Tambak",
        description: "Mengelola operasional kolam pembesaran ikan komersial skala ratusan ton.",
        industrySector: "Perusahaan Budidaya Ikan, Sentra Bioflok Nasional"
      },
      {
        role: "Teknisi Pembenihan (Hatchery Specialist)",
        description: "Menghasilkan jutaan bibit ikan berkualitas untuk memasok petambak di seluruh pulau Jawa.",
        industrySector: "Balai Benih Ikan (BBI) Pemerintah & Swasta"
      },
      {
        role: "Wirausahawan Perikanan (Agropreneur)",
        description: "Memiliki usaha mandiri pembesaran ikan nila/lele atau pabrik pakan alternatif berbasis maggot.",
        industrySector: "Sektor Wirausaha Mandiri Mandiri"
      },
      {
        role: "Quality Control Pengolahan Pangan Ikan",
        description: "Memastikan keamanan mutu produk pangan olahan ikan di industri pengolahan frozen food.",
        industrySector: "Pabrik Pengolahan Hasil Laut & Perikanan"
      }
    ],
    industryPartners: [
      { name: "Balai Besar Perikanan Budidaya Air Tawar (BBPBAT) Sukabumi", partnershipType: "Penyediaan Induk Unggul & Uji Kompetensi" },
      { name: "PT Suri Tani Pemuka (JAPFA Group)", partnershipType: "Magang Budidaya Industri & Penyerapan Panen" },
      { name: "Dinas Perikanan dan Peternakan Kab. Banjarnegara", partnershipType: "Penyuluhan Petani Ikan & Bantuan Benih" }
    ],
    featuredProjects: [
      {
        title: "Nila Bioflok Zero-Waste: Panen 2 Ton dengan FCR 1.05",
        studentName: "Wahyu Hidayat & Tim Perikanan",
        year: "2024",
        description: "Penerapan probiotik lokal yang memangkas biaya pakan hingga 30% dan menghasilkan ikan nila tanpa bau lumpur.",
        result: "Produk panen habis terserap pasar swalayan dan restoran lokal Banjarnegara."
      }
    ],
    achievements: [
      { title: "Juara 1 LKS Tingkat Provinsi Jawa Tengah - Fishery / Agribisnis Perikanan", level: "Provinsi", year: "2024" },
      { title: "Medali Perak LKS Tingkat Nasional - Fishery", level: "Nasional", year: "2023" }
    ],
    faqs: [
      {
        question: "Apakah budidaya ikan di sekolah membutuhkan lahan luas?",
        answer: "Tidak selalu. Di SMKN 1 Bawang, siswa diajarkan teknologi bioflok modern kolam terpal bulat yang sangat hemat air dan lahan, serta sistem akuaponik perkotaan yang dapat diterapkan di pekarangan rumah sekalipun."
      }
    ]
  },
  {
    id: "elektronika",
    slug: "elektronika",
    code: "TE",
    name: "Teknik Elektronika (Elektronika Industri)",
    shortName: "Teknik Elektronika (Mekatronika & Otomasi)",
    category: "Teknologi & Rekayasa",
    tagline: "Otomasi Sistem Pabrik, Programmable Logic Controller (PLC), Internet of Things (IoT), dan Robotika Industri",
    accredited: "A (Unggul)",
    quotaPerYear: 72,
    classesCount: 2,
    headOfProgram: {
      name: "Suwandi, S.T., M.Eng.",
      title: "Ketua Konsentrasi Keahlian Teknik Elektronika"
    },
    description: "Konsentrasi Teknik Elektronika mengantarkan siswa menjadi teknisi otomasi industri generasi 4.0. Menggabungkan elektronika analog & digital presisi, perancangan sirkuit PCB berbantuan komputer, pemrograman mikrokontroler (Arduino, ESP32, STM32), otomasi industri berbasis PLC Siemens/Omron, sistem pneumatik/elektro-pneumatik, hingga instalasi energi terbarukan (panel surya).",
    competencies: [
      {
        title: "Sistem Otomasi Industri & PLC",
        description: "Memprogram Programmable Logic Controller (PLC) dengan bahasa Ladder Diagram untuk mengendalikan konveyor dan lengan robot pabrik.",
        skills: ["PLC Omron & Siemens S7-1200", "Pemrograman Ladder Diagram & FBD", "Wiring Panel Kontrol Industri", "SCADA & HMI Display Interfacing"]
      },
      {
        title: "Perancangan Sirkuit Elektronika & PCB Design",
        description: "Menggambar skematik dan layout jalur PCB lapis ganda (double layer) menggunakan Altium/EasyEDA hingga proses etching dan soldering presisi.",
        skills: ["Skematik & PCB Routing (EasyEDA/KiCad)", "Teknik Soldering Komponen SMD & THT", "Pengujian dengan Oscilloscope & Multitester", "Troubleshooting Rangkaian Daya"]
      },
      {
        title: "Internet of Things (IoT) & Embedded Systems",
        description: "Menghubungkan mikrokontroler dengan sensor lingkungan dan mengunggah data telemetri ke cloud server melalui protokol MQTT dan HTTP.",
        skills: ["ESP32 / Arduino C++ Programming", "Sensor Interfacing (Suhu, Tekanan, Gas, Jarak)", "Protokol MQTT & REST IoT", "Pembuatan Dashboard IoT (Blynk / Node-RED)"]
      },
      {
        title: "Sistem Elektro-Pneumatik & Robotika Dasar",
        description: "Pengendalian silinder aktuator pneumatik dengan katup solenoid listrik untuk mekanika pemilah barang otomatis di jalur perakitan.",
        skills: ["Kompresor & Katup Pneumatik", "Logika Elektro-Pneumatik", "Pengendalian Motor Stepper & Servo", "Line Follower & Mobile Robot"]
      }
    ],
    labsAndFacilities: [
      {
        name: "Laboratorium Otomasi Industri & PLC Trainer",
        description: "Fasilitas simulasi pabrik otomatis lengkap dengan modul PLC Siemens dan Omron, panel kabel modular, dan modul pneumatik Festo.",
        equipment: ["12x PLC Trainer Kit Omron CP1E & Siemens S7-1200", "6x Festo Electro-Pneumatic Modular Kit", "Panel Kontrol Motor Induksi 3 Fasa", "Inverter Variable Speed Drive (VSD)"]
      },
      {
        name: "Workshop Elektronika Digital & Perakitan IoT",
        description: "Ruang perakitan perangkat cerdas, mesin cetak PCB CNC mini, 3D printer untuk casing perangkat, dan osiloskop digital.",
        equipment: ["36x Stasiun Solder Suhu Terkontrol Hakko", "12x Digital Storage Oscilloscope (DSO) 100MHz", "3x 3D Printer Creality Ender Series", "Mesin CNC Router Mini untuk Prototipe PCB"]
      }
    ],
    softwareAndTools: [
      "CX-Programmer (Omron)", "TIA Portal (Siemens)", "KiCad / EasyEDA", "Arduino IDE", "FluidSIM Pneumatics", "Node-RED", "AutoCAD Electrical"
    ],
    careerPaths: [
      {
        role: "Industrial Automation Technician (Teknisi PLC)",
        description: "Memasang, memprogram, dan memperbaiki sistem kontrol otomatis pada mesin lini produksi pabrik.",
        industrySector: "Pabrik Manufaktur Otomotif, Makanan & Minuman (FMCG), Semen"
      },
      {
        role: "IoT Hardware Developer & Field Engineer",
        description: "Merancang dan memasang perangkat pemantau nirkabel untuk smart agriculture, pabrik pintar, dan smart city.",
        industrySector: "Perusahaan Solusi IoT, Startup Agritech, Sektor Energi"
      },
      {
        role: "Teknisi Maintenance Elektronika & Instrumen",
        description: "Merawat peralatan elektronik medis rumah sakit, pemancar telekomunikasi, atau laboratorium riset.",
        industrySector: "Rumah Sakit, Perusahaan Telekomunikasi, Lembaga Kalibrasi"
      },
      {
        role: "Teknisi Pembangkit Energi Terbarukan (Solar Panel)",
        description: "Instalasi dan pemeliharaan inverter dan panel surya pembangkit listrik tenaga surya (PLTS).",
        industrySector: "Perusahaan EPC Energi Hijau, Kontraktor Listrik"
      }
    ],
    industryPartners: [
      { name: "PT Omron Electronics Indonesia", partnershipType: "Kurikulum Otomasi Industri & Hibah Perangkat PLC" },
      { name: "PT Schneider Electric Manufacturing Batam", partnershipType: "Program Magang Industri & Perekrutan Kerja" },
      { name: "PT Telkom Akses Regional Jateng-DIY", partnershipType: "Pemeliharaan Perangkat Elektronika Catu Daya" }
    ],
    featuredProjects: [
      {
        title: "Smart Greenhouse IoT: Otomasi Penyiraman & Pemupukan Pertanian Hortikultura",
        studentName: "Aditia Kurniawan & Tim Elektronika",
        year: "2024",
        description: "Sistem pemantau kelembaban tanah dan suhu udara di perkebunan stroberi berbasis ESP32 dan panel surya mandiri energi.",
        result: "Diadopsi oleh kelompok tani binaan di Batur Banjarnegara."
      }
    ],
    achievements: [
      { title: "Juara 1 LKS Tingkat Provinsi Jawa Tengah - Industrial Automation", level: "Provinsi", year: "2024" },
      { title: "Medali Emas LKS Tingkat Nasional - Electronics", level: "Nasional", year: "2023" }
    ],
    faqs: [
      {
        question: "Apa bedanya Teknik Elektronika dengan Teknik Listrik instalasi rumah?",
        answer: "Teknik Elektronika berfokus pada arus lemah: sirkuit kontrol pintar, chip mikrokontroler, pemrograman PLC mesin pabrik, sensor IoT, dan otomasi robotika. Bukan sekadar memasang sakelar atau kabel listrik rumah tangga biasa."
      }
    ]
  }
];
