import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Search, 
  Plus, 
  ExternalLink, 
  LogOut, 
  Bot, 
  BarChart3, 
  FileText, 
  Eye, 
  Settings
} from 'lucide-react';
import { AdminUser, SPMBApplicant, ApplicantStatus } from '../../types/adminTypes';
import { 
  INITIAL_APPLICANTS, 
  INITIAL_AUDIT_LOGS, 
  POPULAR_AI_QUERIES, 
  MAJOR_QUOTA_STATS 
} from '../../data/mockAdminData';
import { NEWS_ITEMS } from '../../data/newsAndAchievementsData';
import { NewsItem } from '../../types';

interface AdminDashboardPageProps {
  user: AdminUser;
  onLogout: () => void;
  onNavigatePublic: (path: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  user,
  onLogout,
  onNavigatePublic
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'spmb' | 'news' | 'ai_logs' | 'settings'>('overview');
  
  // SPMB State
  const [applicants, setApplicants] = useState<SPMBApplicant[]>(() => {
    const saved = localStorage.getItem('skansa_admin_applicants');
    return saved ? JSON.parse(saved) : INITIAL_APPLICANTS;
  });
  const [spmbSearch, setSpmbSearch] = useState('');
  const [majorFilter, setMajorFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedApplicant, setSelectedApplicant] = useState<SPMBApplicant | null>(null);

  // News State
  const [newsList, setNewsList] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('skansa_admin_news');
    return saved ? JSON.parse(saved) : NEWS_ITEMS;
  });
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsCategory, setNewNewsCategory] = useState<'Pengumuman' | 'Berita Resmi' | 'Prestasi'>('Pengumuman');
  const [newNewsCircular, setNewNewsCircular] = useState('421.5 / 319 / 2026');
  const [newNewsExcerpt, setNewNewsExcerpt] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');

  // Settings State
  const [isSpmbOpen, setIsSpmbOpen] = useState(true);
  const [hotlinePhone, setHotlinePhone] = useState('(0286) 591407');
  const [hotlineWA, setHotlineWA] = useState('+62 812-2859-1407');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Save applicants to localStorage on modification
  useEffect(() => {
    localStorage.setItem('skansa_admin_applicants', JSON.stringify(applicants));
  }, [applicants]);

  // Save news to localStorage
  useEffect(() => {
    localStorage.setItem('skansa_admin_news', JSON.stringify(newsList));
  }, [newsList]);

  // Applicant Status Updater
  const updateApplicantStatus = (id: string, newStatus: ApplicantStatus, notes?: string) => {
    setApplicants(prev => prev.map(app => {
      if (app.id === id) {
        return {
          ...app,
          status: newStatus,
          verifierNotes: notes || app.verifierNotes
        };
      }
      return app;
    }));
    if (selectedApplicant && selectedApplicant.id === id) {
      setSelectedApplicant(prev => prev ? { ...prev, status: newStatus, verifierNotes: notes || prev.verifierNotes } : null);
    }
  };

  // Add News Handler
  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsTitle.trim() || !newNewsExcerpt.trim()) return;

    const newItem: NewsItem = {
      id: `warta-${Date.now()}`,
      title: newNewsTitle,
      slug: newNewsTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: newNewsExcerpt,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      author: user.name,
      category: newNewsCategory,
      circularNumber: newNewsCircular || undefined,
      isAnnouncement: newNewsCategory === 'Pengumuman',
      readTime: '3 menit baca',
      tags: ['Admin SKANSA', newNewsCategory, 'Resmi'],
      content: [newNewsContent || newNewsExcerpt]
    };

    setNewsList([newItem, ...newsList]);
    setIsAddingNews(false);
    setNewNewsTitle('');
    setNewNewsExcerpt('');
    setNewNewsContent('');
  };

  // Filtered Applicants
  const filteredApplicants = applicants.filter(app => {
    const matchSearch = spmbSearch === '' || 
      app.fullName.toLowerCase().includes(spmbSearch.toLowerCase()) ||
      app.nisn.includes(spmbSearch) ||
      app.registrationNumber.toLowerCase().includes(spmbSearch.toLowerCase()) ||
      app.originSchool.toLowerCase().includes(spmbSearch.toLowerCase());
    
    const matchMajor = majorFilter === 'ALL' || app.firstChoiceMajor === majorFilter;
    const matchStatus = statusFilter === 'ALL' || app.status === statusFilter;

    return matchSearch && matchMajor && matchStatus;
  });

  // Calculation Stats
  const totalVerified = applicants.filter(a => a.status === 'verified').length;
  const totalPending = applicants.filter(a => a.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      
      {/* Top Management Bar */}
      <header className="bg-institution-950 border-b border-institution-900 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-3 shadow-sm text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* School Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1.5 shadow-sm border border-white/20 flex items-center justify-center shrink-0">
              <img 
                src="/logo-smk.png" 
                alt="Logo SMK Negeri 1 Bawang" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-white text-base tracking-tight">
                  SIM SKANSA
                </span>
                <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded">
                  Panel Pengelola
                </span>
              </div>
              <span className="text-xs text-slate-300 hidden sm:block">
                SMK Negeri 1 Bawang Banjarnegara
              </span>
            </div>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-bold text-white block">
                {user.name}
              </span>
              <span className="text-[11px] text-institution-200 font-medium">
                {user.role} : {user.department}
              </span>
            </div>

            <button
              onClick={() => onNavigatePublic('#/')}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-institution-100 hover:text-white bg-institution-900 hover:bg-institution-850 px-3.5 py-2 rounded-xl border border-institution-700/80 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
              title="Buka Website Publik"
            >
              <ExternalLink className="w-3.5 h-3.5 text-institution-300" />
              <span className="hidden md:inline">Website Utama</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-rose-200 hover:text-white bg-rose-950/70 hover:bg-rose-900 border border-rose-800 px-3.5 py-2 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none"
              title="Keluar dari sesi"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden md:inline">Keluar</span>
            </button>
          </div>

        </div>
      </header>

      {/* Navigation Sub-bar (Tabs) */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 shadow-xs sticky top-[57px] z-20">
        <div className="max-w-7xl mx-auto flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2.5">
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
              activeTab === 'overview'
                ? 'bg-institution-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-institution-400" />
            <span>Ringkasan Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('spmb')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
              activeTab === 'spmb'
                ? 'bg-institution-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold'
            }`}
          >
            <FileCheck className="w-4 h-4 text-institution-400" />
            <span>Verifikasi SPMB</span>
            {totalPending > 0 && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                activeTab === 'spmb' ? 'bg-amber-400 text-institution-950' : 'bg-amber-100 text-amber-900'
              }`}>
                {totalPending} Baru
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
              activeTab === 'news'
                ? 'bg-institution-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold'
            }`}
          >
            <FileText className="w-4 h-4 text-institution-400" />
            <span>Kelola Warta ({newsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ai_logs')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
              activeTab === 'ai_logs'
                ? 'bg-institution-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold'
            }`}
          >
            <Bot className="w-4 h-4 text-institution-400" />
            <span>Log Asisten AI</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none ${
              activeTab === 'settings'
                ? 'bg-institution-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold'
            }`}
          >
            <Settings className="w-4 h-4 text-institution-400" />
            <span>Pengaturan SPMB</span>
          </button>

        </div>
      </div>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Total Pendaftar SPMB
                  </span>
                  <div className="bg-institution-50 text-institution-600 p-2 rounded-xl">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-institution-950">
                  842
                </div>
                <span className="text-xs text-slate-500 block">
                  Dari kuota resmi 720 siswa (8 Jurusan)
                </span>
              </div>

              <div className="bg-white border border-amber-200/80 rounded-2xl p-5 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    Menunggu Verifikasi
                  </span>
                  <div className="bg-amber-50 text-amber-600 p-2 rounded-xl">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-amber-600">
                  {totalPending}
                </div>
                <span className="text-xs text-slate-500 block">
                  Berkas perlu dicek oleh tim verifikator
                </span>
              </div>

              <div className="bg-white border border-emerald-200/80 rounded-2xl p-5 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    Berkas Lolos Valid
                  </span>
                  <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-emerald-700">
                  {totalVerified}
                </div>
                <span className="text-xs text-slate-500 block">
                  Dokumen sah dan memenuhi persyaratan
                </span>
              </div>

              <div className="bg-white border border-purple-200/80 rounded-2xl p-5 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                    Asisten AI Gemini
                  </span>
                  <div className="bg-purple-50 text-purple-600 p-2 rounded-xl">
                    <Bot className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-institution-950">
                  1.420
                </div>
                <span className="text-xs text-emerald-700 font-semibold block">
                  Endpoint Gemini 3.6 Flash Normal
                </span>
              </div>

            </div>

            {/* Middle Section: 8 Major Quota Fill Rates */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-bold text-institution-950">
                    Status Daya Tampung & Keterisian 8 Program Keahlian
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Monitoring persebaran peminat dan berkas terverifikasi per jurusan tahun ajaran 2026/2027
                  </p>
                </div>
                <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full w-fit">
                  Pagu Keseluruhan: 720 Siswa
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {MAJOR_QUOTA_STATS.map((m) => {
                  const percent = Math.min(100, Math.round((m.verified / m.quota) * 100));
                  return (
                    <div key={m.code} className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">
                          {m.name}
                        </span>
                        <span className="text-xs font-mono font-bold text-institution-700">
                          {m.verified} / {m.quota} ({percent}%)
                        </span>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            percent >= 90 ? 'bg-amber-500' : 'bg-institution-600'
                          }`}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Pendaftar Menunggu: {m.pending}</span>
                        <span>Sisa Kuota: {Math.max(0, m.quota - m.verified)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Audit Logs */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-institution-950 uppercase tracking-wider">
                Catatan Aktivitas Petugas Terkini
              </h3>
              <div className="divide-y divide-slate-100">
                {INITIAL_AUDIT_LOGS.map((log) => (
                  <div key={log.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${
                        log.badgeType === 'success' ? 'bg-emerald-500' :
                        log.badgeType === 'warning' ? 'bg-amber-500' : 'bg-institution-600'
                      }`}></span>
                      <div>
                        <span className="font-semibold text-slate-900">{log.adminName}</span>
                        <span className="text-slate-600">: {log.action} </span>
                        <strong className="text-institution-700 font-mono font-semibold">{log.target}</strong>
                      </div>
                    </div>
                    <span className="text-slate-400 text-[11px] shrink-0 font-mono">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: VERIFIKASI SPMB */}
        {activeTab === 'spmb' && (
          <div className="space-y-6">
            
            {/* Header & Filter Controls */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-institution-950">
                    Verifikasi Dokumen Pendaftar SPMB 2026/2027
                  </h2>
                  <p className="text-xs text-slate-500">
                    Pemeriksaan keabsahan nilai rapor, surat bebas buta warna, fakta integritas, dan dokumen jalur seleksi.
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-lg font-semibold">
                    Lolos: {totalVerified}
                  </span>
                  <span className="bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-lg font-semibold">
                    Menunggu: {totalPending}
                  </span>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={spmbSearch}
                    onChange={(e) => setSpmbSearch(e.target.value)}
                    placeholder="Cari nama, NISN, atau SMP asal..."
                    className="w-full bg-slate-50 focus:bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-institution-600 focus:ring-1 focus:ring-institution-600"
                  />
                </div>

                <select
                  value={majorFilter}
                  onChange={(e) => setMajorFilter(e.target.value)}
                  className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-institution-600 focus:ring-1 focus:ring-institution-600"
                >
                  <option value="ALL">Semua Jurusan Pilihan 1</option>
                  <option value="PPLG">PPLG (Software & Gim)</option>
                  <option value="TJKT">TJKT (Jaringan Komputer)</option>
                  <option value="AKL">AKL (Akuntansi)</option>
                  <option value="MPLB">MPLB (Manajemen Perkantoran)</option>
                  <option value="PM">PM (Pemasaran Digital)</option>
                  <option value="BUSANA">Desain Busana</option>
                  <option value="AP">Perikanan (Air Tawar)</option>
                  <option value="TE">Teknik Elektronika</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-institution-600 focus:ring-1 focus:ring-institution-600"
                >
                  <option value="ALL">Semua Status Berkas</option>
                  <option value="pending">Menunggu Verifikasi</option>
                  <option value="verified">Terverifikasi (Lolos)</option>
                  <option value="revision_needed">Perlu Revisi Dokumen</option>
                  <option value="rejected">Ditolak</option>
                </select>
              </div>
            </div>

            {/* Applicants Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">No. Pendaftaran & NISN</th>
                      <th className="py-3.5 px-4">Nama Peserta Didik</th>
                      <th className="py-3.5 px-4">Pilihan Jurusan</th>
                      <th className="py-3.5 px-4">Jalur & Rata-rata</th>
                      <th className="py-3.5 px-4">Buta Warna</th>
                      <th className="py-3.5 px-4">Status Berkas</th>
                      <th className="py-3.5 px-4 text-right">Aksi Verifikasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {filteredApplicants.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-500">
                          Tidak ditemukan data pendaftar yang sesuai kriteria pencarian.
                        </td>
                      </tr>
                    ) : (
                      filteredApplicants.map((app) => (
                        <tr key={app.id} className="hover:bg-institution-25/80 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-mono font-bold text-institution-700 block">
                              {app.registrationNumber}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono">
                              NISN: {app.nisn}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-900 block">
                              {app.fullName}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {app.originSchool}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-800">
                              1: {app.firstChoiceMajor}
                            </span>
                            <span className="text-[11px] text-slate-500 block">
                              2: {app.secondChoiceMajor}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-slate-900">
                              {app.pathway}
                            </span>
                            <span className="text-[11px] text-institution-700 block font-mono">
                              Nilai: {app.averageScore.toFixed(2)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              app.colorBlindStatus === 'Normal'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : 'bg-rose-50 text-rose-800 border border-rose-200'
                            }`}>
                              {app.colorBlindStatus}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              app.status === 'verified'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : app.status === 'pending'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : app.status === 'revision_needed'
                                ? 'bg-orange-50 text-orange-800 border border-orange-200'
                                : 'bg-rose-50 text-rose-800 border border-rose-200'
                            }`}>
                              {app.status === 'verified' && <CheckCircle2 className="w-3 h-3" />}
                              {app.status === 'pending' && <Clock className="w-3 h-3" />}
                              {app.status === 'revision_needed' && <AlertTriangle className="w-3 h-3" />}
                              {app.status === 'rejected' && <XCircle className="w-3 h-3" />}
                              <span>
                                {app.status === 'verified' ? 'Terverifikasi' :
                                 app.status === 'pending' ? 'Menunggu' :
                                 app.status === 'revision_needed' ? 'Perlu Revisi' : 'Ditolak'}
                              </span>
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end space-x-1.5">
                              <button
                                onClick={() => setSelectedApplicant(app)}
                                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-semibold transition-colors flex items-center space-x-1"
                                title="Lihat detail dokumen"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Periksa</span>
                              </button>
                              {app.status !== 'verified' && (
                                <button
                                  onClick={() => updateApplicantStatus(app.id, 'verified', 'Dokumen diverifikasi dan disetujui panitia.')}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors shadow-xs"
                                  title="Langsung setujui berkas"
                                >
                                  Setujui
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Detail & Verifikasi Berkas */}
            {selectedApplicant && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-institution-950/60 backdrop-blur-xs">
                <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-institutional text-slate-900">
                  
                  <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-institution-700">
                        {selectedApplicant.registrationNumber}
                      </span>
                      <h3 className="text-xl font-bold text-institution-950 mt-0.5">
                        {selectedApplicant.fullName}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Asal Sekolah: {selectedApplicant.originSchool} • NISN: {selectedApplicant.nisn}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedApplicant(null)}
                      className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Applicant Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div>
                      <span className="text-slate-500 block">Pilihan 1</span>
                      <strong className="text-slate-900 font-bold">{selectedApplicant.firstChoiceMajor}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Pilihan 2</span>
                      <strong className="text-slate-900 font-bold">{selectedApplicant.secondChoiceMajor}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Jalur</span>
                      <strong className="text-slate-900 font-bold">{selectedApplicant.pathway}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Rerata Rapor</span>
                      <strong className="text-institution-700 font-mono font-bold">{selectedApplicant.averageScore.toFixed(2)}</strong>
                    </div>
                  </div>

                  {/* Document Checklist Preview */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Status Kelengkapan Dokumen yang Diunggah
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                        {selectedApplicant.documents.rapor ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-500" />}
                        <span>Buku Rapor Semester 1-5</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                        {selectedApplicant.documents.skRapor ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-500" />}
                        <span>Surat Keterangan Nilai Rapor Asli</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                        {selectedApplicant.documents.kk ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-500" />}
                        <span>Kartu Keluarga (KK) Sah</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                        {selectedApplicant.documents.suratBebasButaWarna ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-500" />}
                        <span>Surat Dokter Bebas Buta Warna</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                        {selectedApplicant.documents.faktaIntegritas ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-500" />}
                        <span>Fakta Integritas Bermeterai</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-medium">
                        {selectedApplicant.documents.piagamKejuaraan ? <CheckCircle2 className="w-4 h-4 text-amber-600" /> : <span className="w-4 h-4 text-slate-400 block text-center font-bold">-</span>}
                        <span>Piagam Kejuaraan (Opsional Prestasi)</span>
                      </div>
                    </div>
                  </div>

                  {/* Verifier Notes */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700">
                      Catatan Verifikator untuk Pendaftar
                    </label>
                    <textarea
                      defaultValue={selectedApplicant.verifierNotes || ''}
                      id="verifier-notes-input"
                      rows={3}
                      placeholder="Tuliskan catatan atau alasan jika dokumen perlu revisi..."
                      className="w-full bg-slate-50 focus:bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-institution-600 focus:ring-1 focus:ring-institution-600"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-slate-200">
                    <button
                      onClick={() => {
                        const notes = (document.getElementById('verifier-notes-input') as HTMLTextAreaElement)?.value;
                        updateApplicantStatus(selectedApplicant.id, 'revision_needed', notes);
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors"
                    >
                      Minta Revisi Dokumen
                    </button>
                    <button
                      onClick={() => {
                        const notes = (document.getElementById('verifier-notes-input') as HTMLTextAreaElement)?.value;
                        updateApplicantStatus(selectedApplicant.id, 'rejected', notes || 'Berkas tidak memenuhi kriteria persyaratan jurusan.');
                      }}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
                    >
                      Tolak Berkas
                    </button>
                    <button
                      onClick={() => {
                        const notes = (document.getElementById('verifier-notes-input') as HTMLTextAreaElement)?.value;
                        updateApplicantStatus(selectedApplicant.id, 'verified', notes || 'Dokumen diverifikasi lengkap dan sah.');
                      }}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm"
                    >
                      Setujui & Terbitkan Bukti
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 3: KELOLA WARTA */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-institution-950">
                  Pengelolaan Warta & Pengumuman Resmi
                </h2>
                <p className="text-xs text-slate-500">
                  Publikasikan warta kegiatan, surat edaran kepala sekolah, dan maklumat resmi yang tampil di halaman Informasi publik.
                </p>
              </div>

              <button
                onClick={() => setIsAddingNews(true)}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-institution-900 hover:bg-institution-800 text-white text-xs font-bold transition-colors shrink-0 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Terbitkan Warta Baru</span>
              </button>
            </div>

            {/* Create News Modal */}
            {isAddingNews && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-institution-950/60 backdrop-blur-xs">
                <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-institutional text-slate-900">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h3 className="text-base font-bold text-institution-950">
                      Formulir Publikasi Warta / Pengumuman Baru
                    </h3>
                    <button onClick={() => setIsAddingNews(false)} className="text-slate-400 hover:text-slate-700 p-1">✕</button>
                  </div>

                  <form onSubmit={handleCreateNews} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Judul Pengumuman / Berita</label>
                      <input
                        type="text"
                        value={newNewsTitle}
                        onChange={(e) => setNewNewsTitle(e.target.value)}
                        placeholder="Contoh: Pengumuman Hasil Verifikasi SPMB Gelombang 1..."
                        required
                        className="w-full bg-slate-50 focus:bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-institution-600 focus:ring-1 focus:ring-institution-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Kategori</label>
                        <select
                          value={newNewsCategory}
                          onChange={(e: any) => setNewNewsCategory(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-institution-600 focus:ring-1 focus:ring-institution-600"
                        >
                          <option value="Pengumuman">Pengumuman Resmi</option>
                          <option value="Berita Resmi">Berita Sekolah</option>
                          <option value="Prestasi">Prestasi Siswa</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Nomor Surat Edaran (Opsional)</label>
                        <input
                          type="text"
                          value={newNewsCircular}
                          onChange={(e) => setNewNewsCircular(e.target.value)}
                          placeholder="421.5 / ... / 2026"
                          className="w-full bg-slate-50 focus:bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-institution-600 focus:ring-1 focus:ring-institution-600 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Ringkasan Singkat (Excerpt)</label>
                      <textarea
                        value={newNewsExcerpt}
                        onChange={(e) => setNewNewsExcerpt(e.target.value)}
                        rows={2}
                        placeholder="Ringkasan 1-2 kalimat yang tampil di kartu pengumuman..."
                        required
                        className="w-full bg-slate-50 focus:bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-institution-600 focus:ring-1 focus:ring-institution-600"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Isi Lengkap Pengumuman</label>
                      <textarea
                        value={newNewsContent}
                        onChange={(e) => setNewNewsContent(e.target.value)}
                        rows={4}
                        placeholder="Tuliskan isi edaran secara lengkap..."
                        required
                        className="w-full bg-slate-50 focus:bg-white border border-slate-300 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-institution-600 focus:ring-1 focus:ring-institution-600"
                      />
                    </div>

                    <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setIsAddingNews(false)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-institution-900 hover:bg-institution-800 text-white font-bold shadow-sm transition-colors"
                      >
                        Publikasikan Sekarang
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* News List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {newsList.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 flex flex-col justify-between shadow-sm hover:border-institution-300 transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-institution-700 bg-institution-50 border border-institution-200 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <span className="text-slate-400">{item.date}</span>
                    </div>
                    {item.circularNumber && (
                      <span className="text-[11px] font-mono text-amber-700 block font-semibold">
                        No. Edaran: {item.circularNumber}
                      </span>
                    )}
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Penulis: {item.author}</span>
                    <button
                      onClick={() => setNewsList(prev => prev.filter(n => n.id !== item.id))}
                      className="text-rose-600 hover:text-rose-700 font-semibold"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 4: LOG ASISTEN AI */}
        {activeTab === 'ai_logs' && (
          <div className="space-y-6">
            
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-institution-950">
                    Log & Analitik Pertanyaan Asisten AI SKANSA
                  </h2>
                  <p className="text-xs text-slate-500">
                    Memantau informasi yang paling banyak dicari oleh calon siswa, orang tua, dan masyarakat melalui integrasi Gemini 3.6 Flash.
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-lg font-semibold">
                    Gemini 3.6 Flash: Aktif
                  </span>
                  <span className="bg-purple-50 text-purple-800 border border-purple-200 px-3 py-1 rounded-lg font-semibold">
                    Grounding: 100%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 bg-slate-50/70">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Daftar Interaksi Asisten Terkini
                </h3>
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {POPULAR_AI_QUERIES.map((q) => (
                  <div key={q.id} className="p-4 space-y-1.5 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-institution-700 bg-institution-50 px-2 py-0.5 rounded border border-institution-200 text-[10px]">
                        {q.matchedCategory}
                      </span>
                      <span className="text-slate-400 text-[11px] font-mono">{q.timestamp}</span>
                    </div>
                    <p className="font-semibold text-slate-900 text-sm">
                      "{q.userQuery}"
                    </p>
                    <div className="flex items-center space-x-3 text-[11px] text-slate-500 pt-1">
                      <span>Model: <strong className="text-slate-700">{q.resolvedBy}</strong></span>
                      <span>•</span>
                      <span className="text-emerald-700 font-semibold flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                        Terjawab Sesuai Fakta Resmi
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: PENGATURAN SPMB */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-6">
            
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-institution-950">
                  Pengaturan Kebijakan & Posko SPMB
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Konfigurasi status pembukaan pendaftaran daring dan saluran bantuan calon siswa.
                </p>
              </div>

              {saveSuccessMsg && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              <div className="space-y-4 text-xs">
                
                {/* Status Pendaftaran Toggle */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">Status Pendaftaran SPMB Online</span>
                    <span className="text-slate-500 text-xs">Mengatur penerimaan berkas baru dari calon peserta didik</span>
                  </div>
                  <button
                    onClick={() => setIsSpmbOpen(!isSpmbOpen)}
                    className={`px-4 py-2 rounded-xl font-bold transition-colors shadow-xs ${
                      isSpmbOpen 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                        : 'bg-rose-600 hover:bg-rose-700 text-white'
                    }`}
                  >
                    {isSpmbOpen ? 'Pendaftaran Dibuka' : 'Pendaftaran Ditutup'}
                  </button>
                </div>

                {/* Hotline Phone */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Nomor Telepon Posko SPMB
                  </label>
                  <input
                    type="text"
                    value={hotlinePhone}
                    onChange={(e) => setHotlinePhone(e.target.value)}
                    className="w-full bg-slate-50 focus:bg-white border border-slate-300 rounded-xl p-3 text-slate-900 text-xs focus:outline-none focus:border-institution-600 focus:ring-1 focus:ring-institution-600"
                  />
                </div>

                {/* Hotline WhatsApp */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Nomor WhatsApp Helpdesk SPMB
                  </label>
                  <input
                    type="text"
                    value={hotlineWA}
                    onChange={(e) => setHotlineWA(e.target.value)}
                    className="w-full bg-slate-50 focus:bg-white border border-slate-300 rounded-xl p-3 text-slate-900 text-xs focus:outline-none focus:border-institution-600 focus:ring-1 focus:ring-institution-600"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSaveSuccessMsg('Pengaturan kebijakan dan kontak SPMB berhasil disimpan ke sistem.');
                      setTimeout(() => setSaveSuccessMsg(''), 3000);
                    }}
                    className="w-full py-3 rounded-xl bg-institution-900 hover:bg-institution-800 text-white font-bold text-xs shadow-sm transition-colors"
                  >
                    Simpan Perubahan Pengaturan
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}

      </main>

      {/* Footer Status Bar */}
      <footer className="bg-white border-t border-slate-200 py-4 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>SIM SKANSA v3.2 • Sistem Informasi Manajemen SMK Negeri 1 Bawang</span>
          <span>Hak Akses Petugas Terdaftar • Terkoneksi Aman</span>
        </div>
      </footer>

    </div>
  );
};
