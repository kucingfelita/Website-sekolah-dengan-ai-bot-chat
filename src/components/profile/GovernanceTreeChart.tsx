import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  FileText, 
  Layers, 
  Award, 
  GraduationCap, 
  ShieldCheck, 
  Briefcase, 
  Search,
  LayoutGrid,
  ListFilter,
  CheckCircle2,
  Users
} from 'lucide-react';
import { 
  GovernanceNode, 
  GOVERNANCE_NODES, 
  CATEGORY_STYLES, 
  DISDIKBUD_REGULATION_INFO,
  VOCATIONAL_CLUSTERS
} from '../../data/governanceData';
import { NodeDetailModal } from './NodeDetailModal';

type ViewMode = 'sotk' | 'register';
type FilterCategory = 'all' | 'pimpinan' | 'manajemen' | 'kejuruan' | 'unit_khusus';

export const GovernanceTreeChart: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<GovernanceNode | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('sotk');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCluster, setSelectedCluster] = useState<'all' | 'rekayasa_teknologi' | 'bisnis_kreatif' | 'agribisnis'>('all');

  // Node Lookups
  const nodesMap = useMemo(() => {
    const map = new Map<string, GovernanceNode>();
    GOVERNANCE_NODES.forEach(n => map.set(n.id, n));
    return map;
  }, []);

  const disdikbudNode = nodesMap.get('disdikbud')!;
  const kepsekNode = nodesMap.get('kepsek')!;
  const komiteNode = nodesMap.get('komite')!;
  const spmiNode = nodesMap.get('spmi')!;
  const tuNode = nodesMap.get('tu')!;
  
  const wakaKurikulumNode = nodesMap.get('waka-kurikulum')!;
  const wakaKesiswaanNode = nodesMap.get('waka-kesiswaan')!;
  const wakaHubinNode = nodesMap.get('waka-hubin')!;
  const wakaSarprasNode = nodesMap.get('waka-sarpras')!;

  const vocationalNodes = useMemo(() => {
    return GOVERNANCE_NODES.filter(n => n.category === 'vocational');
  }, []);

  const specialUnitNodes = useMemo(() => {
    return GOVERNANCE_NODES.filter(n => n.category === 'special_unit');
  }, []);

  // Filtered nodes for the Register Matrix view
  const filteredRegisterNodes = useMemo(() => {
    return GOVERNANCE_NODES.filter(node => {
      // Category filter
      if (activeFilter === 'pimpinan' && !['regulator', 'leadership', 'advisory'].includes(node.category)) {
        return false;
      }
      if (activeFilter === 'manajemen' && !['administration', 'management'].includes(node.category)) {
        return false;
      }
      if (activeFilter === 'kejuruan' && node.category !== 'vocational') {
        return false;
      }
      if (activeFilter === 'unit_khusus' && node.category !== 'special_unit') {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = node.title.toLowerCase().includes(query);
        const matchesPerson = node.person.toLowerCase().includes(query);
        const matchesRole = node.role.toLowerCase().includes(query);
        const matchesNip = node.nip ? node.nip.toLowerCase().includes(query) : false;
        const matchesDepartment = node.department ? node.department.toLowerCase().includes(query) : false;
        const matchesTupoksi = node.tupoksi.some(t => t.toLowerCase().includes(query));
        return matchesTitle || matchesPerson || matchesRole || matchesNip || matchesDepartment || matchesTupoksi;
      }

      return true;
    });
  }, [activeFilter, searchQuery]);

  const handleNodeClick = (node: GovernanceNode) => {
    setSelectedNode(node);
  };

  // Reusable card renderer
  const renderCard = (node: GovernanceNode, options?: { isCompact?: boolean; subtitle?: string }) => {
    const isLeadership = node.category === 'leadership' || node.category === 'regulator';
    const isAdvisory = node.category === 'advisory';
    const isCompact = options?.isCompact ?? false;

    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => handleNodeClick(node)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleNodeClick(node);
          }
        }}
        className={`
          group relative transition-all duration-200 cursor-pointer select-none text-left rounded-xl p-4
          focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none
          ${isCompact ? 'w-full max-w-[280px]' : 'w-full max-w-[340px]'}
          ${isLeadership 
            ? 'bg-institution-950 text-white border border-institution-800 hover:border-amber-400 shadow-md' 
            : isAdvisory
              ? 'bg-white text-slate-900 border-2 border-dashed border-amber-400 hover:border-amber-500 hover:bg-amber-50/30 shadow-subtle'
              : 'bg-white text-slate-900 border border-slate-300 hover:border-blue-600 hover:shadow-md shadow-subtle'
          }
        `}
      >
        {/* Top Designation Bar */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
            isLeadership 
              ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40' 
              : isAdvisory
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-slate-100 text-slate-800 border border-slate-200'
          }`}>
            {node.badge || node.role}
          </span>
          <span className={`text-[11px] font-medium ${
            node.lineType === 'dashed' ? 'text-amber-700' : 'text-blue-700'
          }`}>
            {node.lineType === 'dashed' ? 'Koordinasi' : 'Komando'}
          </span>
        </div>

        {/* Position Title */}
        <h4 className={`text-sm font-bold leading-snug line-clamp-2 font-sans ${
          isLeadership ? 'text-white' : 'text-slate-950'
        }`}>
          {node.title}
        </h4>

        {/* Person Name */}
        <p className={`text-xs font-semibold mt-1.5 truncate ${
          isLeadership ? 'text-amber-300' : 'text-slate-700'
        }`}>
          {node.person}
        </p>

        {/* NIP or Unit */}
        {node.nip ? (
          <p className={`text-[10px] font-mono mt-0.5 truncate ${
            isLeadership ? 'text-slate-400' : 'text-slate-500'
          }`}>
            NIP. {node.nip}
          </p>
        ) : options?.subtitle ? (
          <p className="text-[10px] text-slate-500 mt-0.5 truncate">
            {options.subtitle}
          </p>
        ) : null}

        {/* Bottom Action Footer */}
        <div className={`mt-3 pt-2.5 flex items-center justify-between text-[11px] border-t ${
          isLeadership ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-600'
        }`}>
          <span className="font-medium text-[10px] uppercase tracking-wide">
            {node.tupoksi.length} Butir Tugas
          </span>
          <span className={`font-semibold group-hover:underline ${
            isLeadership ? 'text-amber-300' : 'text-blue-700'
          }`}>
            Buka Rincian
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header & Legal Framework Bar */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/90 shadow-subtle space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
              <span>SOTK Resmi Dinas P & K Provinsi Jawa Tengah</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-950 font-sans tracking-tight">
              Bagan Struktur Organisasi & Tata Kerja (SOTK) SKANSA
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              Disusun berdasarkan Peraturan Gubernur Jawa Tengah Nomor 27 Tahun 2018 tentang Organisasi dan Tata Kerja Satuan Pendidikan SMK Negeri serta Panduan Implementasi SMK Pusat Keunggulan.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold shrink-0 self-start lg:self-center">
            <button
              onClick={() => setViewMode('sotk')}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
                viewMode === 'sotk' 
                  ? 'bg-white text-slate-950 shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4 text-institution-900" />
              <span>Bagan Struktur SOTK</span>
            </button>
            <button
              onClick={() => setViewMode('register')}
              className={`px-3.5 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-2 ${
                viewMode === 'register' 
                  ? 'bg-white text-slate-950 shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListFilter className="w-4 h-4 text-institution-900" />
              <span>Register Matriks Tupoksi</span>
            </button>
          </div>
        </div>

        {/* Visual Line Legend */}
        <div className="pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-700">
          <div className="flex flex-wrap items-center gap-5">
            <span className="font-bold text-slate-900">Pedoman Hubungan Kelembagaan:</span>
            
            {/* Garis Komando */}
            <div className="flex items-center gap-2">
              <span className="w-6 h-0.5 bg-blue-700 inline-block"></span>
              <span className="font-medium text-slate-800">
                Garis Komando (Struktural Langsung)
              </span>
            </div>

            {/* Garis Koordinasi */}
            <div className="flex items-center gap-2">
              <span className="w-6 h-0 border-t-2 border-dashed border-amber-500 inline-block"></span>
              <span className="font-medium text-slate-800">
                Garis Koordinasi (Konsultatif / Mitra Pertimbangan)
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            Cabang Dinas Pendidikan Wilayah X
          </div>
        </div>
      </div>

      {/* 2. Main Content View Area */}
      {viewMode === 'sotk' ? (
        /* MODE 1: BAGAN STRUKTUR SOTK ARSITEKTURAL */
        <div className="space-y-10">
          
          {/* TIER I & II: PEMBINA, KEPALA SEKOLAH, DAN MITRA PERTIMBANGAN */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-8 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 border border-blue-200 px-3 py-0.5 rounded-md inline-block">
                Tingkat I & II: Pembina Teknis Provinsi & Kepemimpinan Lembaga
              </span>
            </div>

            {/* Level 1: Instansi Pembina (Disdikbud) */}
            <div className="flex flex-col items-center">
              {renderCard(disdikbudNode)}
              
              {/* Connector from Disdikbud to Kepsek */}
              <div className="w-0.5 h-8 bg-blue-700 my-1"></div>
            </div>

            {/* Level 2: Kepsek in center, flanked by Komite and TPMPS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Wing: Komite Sekolah (Garis Koordinasi Putus-Putus) */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-end">
                <div className="w-full max-w-[320px] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-amber-800 font-bold justify-start lg:justify-end">
                    <span className="w-3 h-0 border-t-2 border-dashed border-amber-500 inline-block"></span>
                    <span>Badan Pertimbangan & Kemitraan</span>
                  </div>
                  {renderCard(komiteNode)}
                </div>
              </div>

              {/* Center Pillar: Plt. Kepala Sekolah (Pimpinan Satuan Pendidikan) */}
              <div className="lg:col-span-4 flex flex-col items-center">
                <div className="w-full max-w-[340px] space-y-2">
                  <div className="text-center text-xs text-slate-800 font-bold">
                    Pimpinan Satuan Pendidikan
                  </div>
                  {renderCard(kepsekNode)}
                </div>
              </div>

              {/* Right Wing: TPMPS / SPMI (Garis Koordinasi Penjaminan Mutu) */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
                <div className="w-full max-w-[320px] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-amber-800 font-bold justify-start">
                    <span>Penjaminan Mutu Internal</span>
                    <span className="w-3 h-0 border-t-2 border-dashed border-amber-500 inline-block"></span>
                  </div>
                  {renderCard(spmiNode)}
                </div>
              </div>

            </div>

            {/* Central Connector Line down from Leadership to Operational Management */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-8 bg-blue-700"></div>
              <span className="text-[11px] font-mono text-slate-600 bg-white px-3 py-1 rounded-md border border-slate-200">
                Garis Komando Struktural ke Unsur Pelaksana
              </span>
            </div>
          </div>

          {/* TIER III: TATA USAHA & 4 WAKIL KEPALA SEKOLAH */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 space-y-6 shadow-subtle">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 border border-blue-200 px-3 py-0.5 rounded-md inline-block">
                Tingkat III: Unsur Tata Usaha & 4 Bidang Wakil Kepala Sekolah
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-950 font-sans">
                Pelaksana Administrasi & Manajemen Operasional Satuan Pendidikan
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Membawahi urusan kepegawaian, keuangan, kurikulum, kesiswaan, kemitraan DUDIKA, dan sarana prasarana.
              </p>
            </div>

            {/* Responsive Grid for 5 Management Heads */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              
              {/* Kasubbag TU */}
              <div className="flex flex-col">
                <div className="text-[11px] font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                  <span>Administrasi & SPJ</span>
                </div>
                {renderCard(tuNode, { subtitle: 'Kepegawaian 142 Guru & BOS/BOP' })}
              </div>

              {/* Waka Kurikulum */}
              <div className="flex flex-col">
                <div className="text-[11px] font-bold text-blue-900 mb-1.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>Akademik & 8 Jurusan</span>
                </div>
                {renderCard(wakaKurikulumNode, { subtitle: 'Kurikulum Merdeka & ANBK' })}
              </div>

              {/* Waka Kesiswaan */}
              <div className="flex flex-col">
                <div className="text-[11px] font-bold text-blue-900 mb-1.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>Karakter & Siswa</span>
                </div>
                {renderCard(wakaKesiswaanNode, { subtitle: '10 Ekstrakurikuler & BK' })}
              </div>

              {/* Waka Hubin & Humas */}
              <div className="flex flex-col">
                <div className="text-[11px] font-bold text-blue-900 mb-1.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>Industri & Kemitraan</span>
                </div>
                {renderCard(wakaHubinNode, { subtitle: '160+ DUDIKA, LSP-P1 & BKK' })}
              </div>

              {/* Waka Sarpras */}
              <div className="flex flex-col">
                <div className="text-[11px] font-bold text-blue-900 mb-1.5 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>Sarana & Prasarana</span>
                </div>
                {renderCard(wakaSarprasNode, { subtitle: 'Kampus 3+ Ha & 8 Lab' })}
              </div>

            </div>
          </div>

          {/* TIER IV: 8 PROGRAM KEAHLIAN (KAPROG) BERDASARKAN 3 RUMPUN KEJURUAN */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold">
                  <GraduationCap className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Tingkat IV: Cabang 8 Program Keahlian Vokasi</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-950 font-sans">
                  Kepala Program Keahlian (Kaprog) Menurut 3 Rumpun Kejuruan
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Melaksanakan pembelajaran praktik industri, pengelolaan laboratorium/bengkel, dan sertifikasi kejuruan.
                </p>
              </div>

              {/* Cluster Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <button
                  onClick={() => setSelectedCluster('all')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    selectedCluster === 'all'
                      ? 'bg-institution-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  Semua Rumpun
                </button>
                <button
                  onClick={() => setSelectedCluster('rekayasa_teknologi')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    selectedCluster === 'rekayasa_teknologi'
                      ? 'bg-institution-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  Teknologi (3)
                </button>
                <button
                  onClick={() => setSelectedCluster('bisnis_kreatif')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    selectedCluster === 'bisnis_kreatif'
                      ? 'bg-institution-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  Bisnis & Busana (4)
                </button>
                <button
                  onClick={() => setSelectedCluster('agribisnis')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                    selectedCluster === 'agribisnis'
                      ? 'bg-institution-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  Agribisnis (1)
                </button>
              </div>
            </div>

            {/* 3 Clusters Presentation */}
            <div className="space-y-6">
              
              {/* Cluster 1: Rekayasa & Komputasi */}
              {(selectedCluster === 'all' || selectedCluster === 'rekayasa_teknologi') && (
                <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-4 shadow-subtle">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 block font-sans">
                      {VOCATIONAL_CLUSTERS.rekayasa_teknologi.title}
                    </span>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {VOCATIONAL_CLUSTERS.rekayasa_teknologi.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {vocationalNodes.filter(n => n.cluster === 'rekayasa_teknologi').map(node => (
                      <div key={node.id} className="flex justify-center">
                        {renderCard(node, { subtitle: node.department })}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cluster 2: Bisnis, Manajemen & Busana */}
              {(selectedCluster === 'all' || selectedCluster === 'bisnis_kreatif') && (
                <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-4 shadow-subtle">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 block font-sans">
                      {VOCATIONAL_CLUSTERS.bisnis_kreatif.title}
                    </span>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {VOCATIONAL_CLUSTERS.bisnis_kreatif.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {vocationalNodes.filter(n => n.cluster === 'bisnis_kreatif').map(node => (
                      <div key={node.id} className="flex justify-center">
                        {renderCard(node, { subtitle: node.department })}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cluster 3: Agribisnis Perikanan */}
              {(selectedCluster === 'all' || selectedCluster === 'agribisnis') && (
                <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-4 shadow-subtle">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 block font-sans">
                      {VOCATIONAL_CLUSTERS.agribisnis.title}
                    </span>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {VOCATIONAL_CLUSTERS.agribisnis.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {vocationalNodes.filter(n => n.cluster === 'agribisnis').map(node => (
                      <div key={node.id} className="flex justify-center md:col-start-2">
                        {renderCard(node, { subtitle: node.department })}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* TIER V: SENTRA LAYANAN KHUSUS & KEMITRAAN VOKASI */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 space-y-6 shadow-subtle">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold">
                <Award className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Tingkat V: Sentra Layanan Khusus, Sertifikasi & Kemitraan Vokasi</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-slate-950 font-sans">
                Unit Pelaksana Teknis Pendukung & Kemitraan Strategis
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Penyelenggara uji sertifikasi berlisensi BNSP, bursa kerja khusus, pabrik pembelajaran Teaching Factory, perpustakaan, dan konseling karir.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {specialUnitNodes.map(node => (
                <div key={node.id} className="flex justify-center">
                  {renderCard(node, { subtitle: node.department })}
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* MODE 2: REGISTER MATRIKS TATA KELOLA & TUPOKSI RESMI */
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 space-y-6 shadow-subtle">
          
          {/* Search & Category Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama pejabat, NIP, jabatan, atau kata kunci tugas..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-institution-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Semua ({GOVERNANCE_NODES.length})
              </button>
              <button
                onClick={() => setActiveFilter('pimpinan')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  activeFilter === 'pimpinan'
                    ? 'bg-institution-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Pimpinan & Mitra
              </button>
              <button
                onClick={() => setActiveFilter('manajemen')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  activeFilter === 'manajemen'
                    ? 'bg-institution-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                TU & 4 Waka
              </button>
              <button
                onClick={() => setActiveFilter('kejuruan')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  activeFilter === 'kejuruan'
                    ? 'bg-institution-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                8 Jurusan
              </button>
              <button
                onClick={() => setActiveFilter('unit_khusus')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  activeFilter === 'unit_khusus'
                    ? 'bg-institution-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Unit Khusus
              </button>
            </div>
          </div>

          {/* Register Results List / Table */}
          {filteredRegisterNodes.length > 0 ? (
            <div className="space-y-3">
              <div className="text-xs text-slate-500 font-mono flex items-center justify-between pb-1">
                <span>Menampilkan {filteredRegisterNodes.length} simpul jabatan terdaftar</span>
                <span>Klik kartu untuk lembar Tupoksi lengkap</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredRegisterNodes.map(node => {
                  const isLeadership = node.category === 'leadership' || node.category === 'regulator';
                  const isAdvisory = node.category === 'advisory';

                  return (
                    <div
                      key={node.id}
                      onClick={() => handleNodeClick(node)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleNodeClick(node);
                        }
                      }}
                      className="p-4 rounded-xl border border-slate-200 hover:border-blue-600 bg-white hover:bg-slate-50/60 transition-all cursor-pointer shadow-subtle flex flex-col justify-between gap-3 text-left focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            isLeadership 
                              ? 'bg-institution-900 text-white' 
                              : isAdvisory
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-slate-100 text-slate-800'
                          }`}>
                            {node.badge || node.role}
                          </span>
                          <span className="text-[11px] font-medium text-slate-500 font-mono">
                            {node.lineType === 'dashed' ? 'Koordinasi' : 'Komando'}
                          </span>
                        </div>

                        <h5 className="text-sm font-bold text-slate-950 font-sans leading-snug">
                          {node.title}
                        </h5>

                        <p className="text-xs font-semibold text-blue-900">
                          {node.person}
                          {node.nip && (
                            <span className="font-mono text-slate-500 font-normal ml-1.5">
                              (NIP. {node.nip})
                            </span>
                          )}
                        </p>

                        <p className="text-xs text-slate-600 line-clamp-2 pt-1 border-t border-slate-100">
                          {node.tupoksi[0]}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-slate-500">
                          {node.reportsToText ? `Laporan: ${node.reportsToText}` : 'Jalur Dinas Provinsi'}
                        </span>
                        <span className="font-bold text-blue-800 hover:underline">
                          Lihat Tupoksi Lengkap
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center space-y-2">
              <p className="text-sm font-bold text-slate-800">
                Tidak ada jabatan yang sesuai dengan kriteria pencarian
              </p>
              <p className="text-xs text-slate-500">
                Silakan ubah kata kunci pencarian atau pilih tab filter lain.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="mt-2 px-4 py-2 bg-institution-900 text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-institution-800"
              >
                Tampilkan Semua Simpul
              </button>
            </div>
          )}

        </div>
      )}

      {/* 3. Node Detail Official Tupoksi Modal */}
      <NodeDetailModal
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        onSelectNode={(nodeId) => {
          const target = nodesMap.get(nodeId);
          if (target) setSelectedNode(target);
        }}
        allNodes={GOVERNANCE_NODES}
      />

    </div>
  );
};

export default GovernanceTreeChart;
