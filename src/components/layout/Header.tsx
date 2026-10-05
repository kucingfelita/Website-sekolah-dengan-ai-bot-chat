import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  GraduationCap, 
  BookOpen, 
  HelpCircle, 
  ArrowRight,
  Palette,
  Briefcase,
  ShieldAlert,
  FileDown
} from 'lucide-react';
import { PROGRAMS } from '../../data/programsData';
import { scrollToElement } from '../../utils/smoothScroll';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const programsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const profileTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleProgramsMouseEnter = () => {
    if (programsTimeoutRef.current) clearTimeout(programsTimeoutRef.current);
    if (profileTimeoutRef.current) clearTimeout(profileTimeoutRef.current);
    setProfileDropdownOpen(false);
    setProgramsDropdownOpen(true);
  };

  const handleProgramsMouseLeave = () => {
    programsTimeoutRef.current = setTimeout(() => {
      setProgramsDropdownOpen(false);
    }, 180);
  };

  const handleProfileMouseEnter = () => {
    if (profileTimeoutRef.current) clearTimeout(profileTimeoutRef.current);
    if (programsTimeoutRef.current) clearTimeout(programsTimeoutRef.current);
    setProgramsDropdownOpen(false);
    setProfileDropdownOpen(true);
  };

  const handleProfileMouseLeave = () => {
    profileTimeoutRef.current = setTimeout(() => {
      setProfileDropdownOpen(false);
    }, 180);
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (programsTimeoutRef.current) clearTimeout(programsTimeoutRef.current);
      if (profileTimeoutRef.current) clearTimeout(profileTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  interface NavItem {
    label: string;
    path: string;
    hasDropdown?: boolean;
    dropdownType?: string;
    highlight?: boolean;
  }

  const navItems: NavItem[] = [
    { label: "Beranda", path: "#/" },
    { 
      label: "Profil", 
      path: "#/profil",
      hasDropdown: true,
      dropdownType: "profile"
    },
    { 
      label: "Jurusan", 
      path: "#/program-keahlian",
      hasDropdown: true,
      dropdownType: "programs"
    },
    { label: "Layanan", path: "#/layanan-digital" },
    { label: "Informasi", path: "#/informasi" }
  ];

  const handleLinkClick = (path: string) => {
    if (programsTimeoutRef.current) clearTimeout(programsTimeoutRef.current);
    if (profileTimeoutRef.current) clearTimeout(profileTimeoutRef.current);
    setProgramsDropdownOpen(false);
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);

    if (path.includes('#/profil#') && currentPath.startsWith('#/profil')) {
      const subHash = path.split('#')[2];
      if (subHash) {
        scrollToElement(`#${subHash}`, { offset: -90 });
      }
    }

    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-30 w-full select-none border-b border-slate-200">
      
      {/* 1. Dignified Institutional Top Bar - Deep Royal Navy with Gold Border */}
      <div className="bg-[#0B1E36] text-slate-100 text-xs py-2 px-4 hidden md:block border-b-2 border-amber-400/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs font-medium">
            <span>Jl. Raya Pucang No. 132, Bawang, Banjarnegara</span>
            <span className="text-amber-400">•</span>
            <a href="tel:0286591407" className="text-slate-200 hover:text-white transition-colors flex items-center">
              <Phone className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
              (0286) 591407
            </a>
            <span className="text-amber-400">•</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-700 text-white font-bold text-[11px] border border-emerald-500">
              Bebas Biaya SPP Bulanan (Pemprov Jateng)
            </span>
          </div>

          <div className="flex items-center space-x-3.5 text-xs">
            <a href="https://elskanza.smkn1bawang.sch.id" target="_blank" rel="noreferrer" className="text-blue-100 hover:text-white transition-colors flex items-center">
              <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
              Elskanza LMS
            </a>
            <span className="text-blue-400">|</span>
            <a href="https://libskanza.smkn1bawang.sch.id" target="_blank" rel="noreferrer" className="text-blue-100 hover:text-white transition-colors flex items-center">
              <BookOpen className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
              Perpustakaan
            </a>
            <span className="text-blue-400">|</span>
            <button onClick={() => handleLinkClick('#/pengaduan')} className="text-blue-100 hover:text-white transition-colors flex items-center cursor-pointer">
              <ShieldAlert className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
              Pengaduan WBS
            </button>
            <span className="text-blue-400">|</span>
            <button onClick={() => handleLinkClick('#/unduhan')} className="text-blue-100 hover:text-white transition-colors flex items-center cursor-pointer">
              <FileDown className="w-3.5 h-3.5 mr-1.5 text-amber-300" />
              Unduhan & Agenda
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (100% Solid Opaque - Zero Transparency or Blur) */}
      <div className={`w-full bg-white transition-[padding] duration-200 ${
        isScrolled ? 'py-3 shadow-xs' : 'py-4 sm:py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* School Brand Identity */}
          <div 
            onClick={() => handleLinkClick('#/')}
            className="flex items-center space-x-3.5 cursor-pointer group shrink-0"
          >
            <img 
              id="navbar-skansa-logo"
              src="/logo-smk.png" 
              alt="Logo Resmi SMK Negeri 1 Bawang Banjarnegara" 
              className="w-11 h-11 object-contain transition-transform group-hover:scale-105"
            />
            
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight leading-tight group-hover:text-blue-900 transition-colors font-sans">
                  SMK NEGERI 1 BAWANG
                </span>
                <span className="hidden sm:inline-block bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded border border-amber-300 shadow-2xs">
                  SMK-PK
                </span>
              </div>
              <span className="text-xs text-slate-500 font-semibold font-sans">
                Banjarnegara, Jateng • Terakreditasi A
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links - Clean, Simple 4 Menus */}
          <nav className="hidden lg:flex items-center space-x-2 font-sans">
            {navItems.map((item) => {
              const isActive = currentPath === item.path || 
                (item.path !== '#/' && currentPath.startsWith(item.path));

              if (item.hasDropdown && item.dropdownType === 'programs') {
                return (
                  <div 
                    key={item.label}
                    className="relative"
                    onMouseEnter={handleProgramsMouseEnter}
                    onMouseLeave={handleProgramsMouseLeave}
                  >
                    <button
                      onClick={() => {
                        if (programsDropdownOpen) {
                          setProgramsDropdownOpen(false);
                        } else {
                          handleProgramsMouseEnter();
                        }
                      }}
                      className={`px-3.5 py-2 rounded-lg text-sm font-semibold inline-flex items-center transition-colors cursor-pointer ${
                        isActive
                          ? 'text-blue-900 bg-blue-50/80 font-bold'
                          : 'text-slate-700 hover:text-blue-900 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform ${programsDropdownOpen ? 'rotate-180 text-blue-900' : 'text-slate-400'}`} />
                    </button>

                    {/* Mega Menu Dropdown with Hover Bridge (pt-2) */}
                    {programsDropdownOpen && (
                      <div 
                        onMouseEnter={handleProgramsMouseEnter}
                        onMouseLeave={handleProgramsMouseLeave}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[600px] z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                      >
                        <div className="bg-white rounded-2xl border-2 border-slate-300 p-4 grid grid-cols-2 gap-2 shadow-2xl">
                          <div className="col-span-2 pb-2 border-b border-slate-100 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 font-sans">
                              8 Program Keahlian Terakreditasi A
                            </span>
                            <button
                              onClick={() => handleLinkClick('#/program-keahlian')}
                              className="text-xs font-bold text-blue-900 hover:text-blue-950 flex items-center cursor-pointer font-sans"
                            >
                              Bandingkan Semua
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </button>
                          </div>

                          {PROGRAMS.map((prog) => (
                            <div
                              key={prog.id}
                              onClick={() => handleLinkClick(`#/program-keahlian/${prog.slug}`)}
                              className="p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors cursor-pointer group flex items-start space-x-2.5 border border-transparent hover:border-blue-200"
                            >
                              <div>
                                <div className="flex items-center space-x-1.5">
                                  <span className="text-xs font-black text-blue-900 group-hover:text-blue-950 font-sans">
                                    {prog.code}
                                  </span>
                                  <span className="text-[11px] text-slate-500 font-sans">
                                    • {prog.quotaPerYear} Siswa
                                  </span>
                                </div>
                                <p className="text-xs text-slate-600 truncate max-w-[210px] font-sans">
                                  {prog.name}
                                </p>
                              </div>
                            </div>
                          ))}

                          {/* Integrated Sub-pages: Karya Siswa & Mitra Industri */}
                          <div className="col-span-2 pt-2.5 mt-1 border-t border-slate-100 grid grid-cols-2 gap-2">
                            <div
                              onClick={() => handleLinkClick('#/karya-siswa')}
                              className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/80 transition-colors cursor-pointer group flex items-center space-x-2.5 border border-slate-200 hover:border-blue-300"
                            >
                              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-900 shrink-0">
                                <Palette className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-950 font-sans block">
                                  Karya Siswa & TeFa
                                </span>
                                <span className="text-[10px] text-slate-500 font-sans block">
                                  Inovasi & Produk Kejuruan
                                </span>
                              </div>
                            </div>

                            <div
                              onClick={() => handleLinkClick('#/mitra-industri')}
                              className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/80 transition-colors cursor-pointer group flex items-center space-x-2.5 border border-slate-200 hover:border-blue-300"
                            >
                              <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-900 shrink-0">
                                <Briefcase className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-950 font-sans block">
                                  160+ Mitra Industri
                                </span>
                                <span className="text-[10px] text-slate-500 font-sans block">
                                  DUDIKA & Penyaluran Kerja
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              if (item.hasDropdown && item.dropdownType === 'profile') {
                return (
                  <div 
                    key={item.label}
                    className="relative"
                    onMouseEnter={handleProfileMouseEnter}
                    onMouseLeave={handleProfileMouseLeave}
                  >
                    <button
                      onClick={() => {
                        if (profileDropdownOpen) {
                          setProfileDropdownOpen(false);
                        } else {
                          handleProfileMouseEnter();
                        }
                      }}
                      className={`px-3.5 py-2 rounded-lg text-sm font-semibold inline-flex items-center transition-colors cursor-pointer ${
                        isActive
                          ? 'text-blue-900 bg-blue-50/80 font-bold'
                          : 'text-slate-700 hover:text-blue-900 hover:bg-slate-50'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform ${profileDropdownOpen ? 'rotate-180 text-blue-900' : 'text-slate-400'}`} />
                    </button>

                    {/* Profile Dropdown Menu with Hover Bridge (pt-2) */}
                    {profileDropdownOpen && (
                      <div 
                        onMouseEnter={handleProfileMouseEnter}
                        onMouseLeave={handleProfileMouseLeave}
                        className="absolute top-full left-0 pt-2 w-64 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                      >
                        <div className="bg-white rounded-2xl border-2 border-slate-300 p-2 space-y-1 shadow-2xl">
                          <button
                            onClick={() => handleLinkClick('#/profil#sejarah')}
                            className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-900 transition-colors cursor-pointer flex items-center justify-between group font-sans"
                          >
                            <span>1. Sejarah & Transformasi</span>
                            <span className="text-[10px] text-slate-400 group-hover:text-blue-700 font-mono">1964</span>
                          </button>
                          <button
                            onClick={() => handleLinkClick('#/profil#visi-misi')}
                            className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-900 transition-colors cursor-pointer font-sans"
                          >
                            2. Visi Misi dan Tujuan
                          </button>
                          <button
                            onClick={() => handleLinkClick('#/profil#fasilitas')}
                            className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-900 transition-colors cursor-pointer font-sans"
                          >
                            3. Fasilitas & Bengkel Praktik
                          </button>
                          <button
                            onClick={() => handleLinkClick('#/profil#ekstrakurikuler')}
                            className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-900 transition-colors cursor-pointer font-sans"
                          >
                            4. Ekstrakurikuler Siswa
                          </button>
                          <button
                            onClick={() => handleLinkClick('#/profil#prestasi')}
                            className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-900 transition-colors cursor-pointer font-sans"
                          >
                            5. Prestasi & Kejuaraan
                          </button>
                          <button
                            onClick={() => handleLinkClick('#/profil#guru')}
                            className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-900 transition-colors cursor-pointer font-sans"
                          >
                            6. Guru & Tenaga Pendidik
                          </button>
                          <button
                            onClick={() => handleLinkClick('#/profil#struktur-organisasi')}
                            className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-900 transition-colors cursor-pointer font-sans"
                          >
                            7. Struktur Organisasi
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.label}
                  onClick={() => handleLinkClick(item.path)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-blue-800 bg-blue-50/80 font-bold'
                      : 'text-slate-700 hover:text-blue-800 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Search + Prominent SPMB 2026 CTA Button */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-2.5 px-3.5 py-2 text-xs text-slate-500 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 hover:border-slate-300 transition-colors group cursor-pointer"
              title="Cari info jurusan, SPMB, berita... (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-blue-700 group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline font-medium text-slate-600">Cari informasi...</span>
              <span className="md:hidden font-medium text-slate-600">Cari</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-500 bg-white rounded-md border border-slate-200">
                ⌘K
              </kbd>
            </button>

            {/* Prominent SPMB 2026 Button */}
            <button
              onClick={() => handleLinkClick('#/spmb')}
              className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors active:scale-95 border border-amber-400 cursor-pointer"
            >
              <span>SPMB 2026</span>
              <span className="bg-slate-950 text-amber-300 text-[10px] font-bold px-1.5 py-0.2 rounded">
                Gratis SPP
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b-2 border-slate-300 px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.label} className="space-y-1">
              <button
                onClick={() => handleLinkClick(item.path)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                  currentPath === item.path
                    ? 'bg-blue-50 text-blue-900 font-bold'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {item.highlight && (
                  <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                    Bebas SPP
                  </span>
                )}
              </button>
              {item.path === '#/program-keahlian' && (
                <div className="pl-4 pr-1 py-1 space-y-1 bg-slate-50/80 rounded-lg">
                  <button
                    onClick={() => handleLinkClick('#/karya-siswa')}
                    className="w-full text-left px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-blue-900 flex items-center space-x-2 cursor-pointer"
                  >
                    <Palette className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span>Karya Siswa & TeFa</span>
                  </button>
                  <button
                    onClick={() => handleLinkClick('#/mitra-industri')}
                    className="w-full text-left px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-blue-900 flex items-center space-x-2 cursor-pointer"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                    <span>160+ Mitra Industri</span>
                  </button>
                </div>
              )}
            </div>
          ))}

          <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleLinkClick('#/pengaduan')}
              className="p-2.5 rounded-xl bg-institution-50 text-institution-900 font-semibold flex items-center space-x-2"
            >
              <ShieldAlert className="w-4 h-4 text-institution-700 shrink-0" />
              <span>Pengaduan WBS</span>
            </button>
            <button
              onClick={() => handleLinkClick('#/unduhan')}
              className="p-2.5 rounded-xl bg-institution-50 text-institution-900 font-semibold flex items-center space-x-2"
            >
              <FileDown className="w-4 h-4 text-institution-700 shrink-0" />
              <span>Unduhan & Agenda</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
