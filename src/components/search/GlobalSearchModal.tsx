import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  CornerDownLeft, 
  FileText, 
  BookOpen, 
  Award, 
  Layers, 
  HelpCircle,
  Briefcase,
  Building2,
  TrendingUp,
  Clock
} from 'lucide-react';
import { performGlobalSearch } from '../../services/searchService';
import { SearchResult } from '../../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 60);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const rawResults = performGlobalSearch(query);
  const filteredResults = activeCategory === 'Semua' 
    ? rawResults 
    : rawResults.filter(r => {
        if (activeCategory === '8 Jurusan') return r.category === 'Jurusan';
        if (activeCategory === 'Mitra Industri') return r.category === 'Mitra Industri';
        if (activeCategory === 'Profil') return r.category === 'Profil';
        if (activeCategory === 'SPMB') return r.category === 'SPMB';
        if (activeCategory === 'Layanan Digital') return r.category === 'Layanan';
        if (activeCategory === 'Berita') return r.category === 'Berita' || r.category === 'Pengumuman';
        if (activeCategory === 'Prestasi') return r.category === 'Prestasi';
        return r.category === activeCategory;
      });

  // Handle keyboard navigation inside search results
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < filteredResults.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          handleSelectResult(filteredResults[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex]);

  const handleSelectResult = (result: SearchResult) => {
    onClose();
    onNavigate(result.url);
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Mitra Industri':
        return <span className="text-[10px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">Mitra DUDIKA</span>;
      case 'Profil':
        return <span className="text-[10px] font-bold text-indigo-800 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">Profil SKANSA</span>;
      case 'Jurusan':
        return <span className="text-[10px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">Jurusan</span>;
      case 'SPMB':
        return <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">SPMB 2026</span>;
      case 'Layanan':
        return <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">Layanan Digital</span>;
      case 'Berita':
      case 'Pengumuman':
        return <span className="text-[10px] font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md">Warta Resmi</span>;
      case 'Prestasi':
        return <span className="text-[10px] font-bold text-orange-800 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-md">Prestasi LKS</span>;
      default:
        return <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">{category}</span>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mitra Industri': return <Briefcase className="w-4 h-4 text-blue-700" />;
      case 'Profil': return <Building2 className="w-4 h-4 text-indigo-700" />;
      case 'Jurusan': return <Layers className="w-4 h-4 text-blue-700" />;
      case 'SPMB': return <HelpCircle className="w-4 h-4 text-amber-600" />;
      case 'Layanan': return <BookOpen className="w-4 h-4 text-emerald-600" />;
      case 'Berita':
      case 'Pengumuman': return <FileText className="w-4 h-4 text-purple-600" />;
      case 'Prestasi': return <Award className="w-4 h-4 text-orange-600" />;
      default: return <FileText className="w-4 h-4 text-slate-500" />;
    }
  };

  const POPULAR_SEARCHES = [
    { label: "Syarat Berkas SPMB 2026", q: "spmb" },
    { label: "Jaminan Bebas SPP (Rp 0)", q: "bebas spp" },
    { label: "PPLG (Software & Web)", q: "pplg" },
    { label: "TJKT (Jaringan & Fiber)", q: "tjkt" },
    { label: "Busana & Fashion Studio", q: "busana" },
    { label: "LMS Pembelajaran Siswa", q: "lms" },
    { label: "Bursa Kerja Khusus (BKK)", q: "bkk" },
    { label: "Cek Kelulusan (SKL)", q: "skl" }
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      
      {/* Command Palette Container */}
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl border-2 border-slate-300 overflow-hidden flex flex-col max-h-[82vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Large Elegant Search Input Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center space-x-3.5 bg-white">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-800 shrink-0">
            <Search className="w-5 h-5" />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Ketik kata kunci (misal: PPLG, syarat SPMB, bebas SPP, LMS, alamat...)"
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-950 placeholder:text-slate-400 focus:outline-hidden"
          />

          {query && (
            <button 
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              title="Hapus pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button 
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-mono font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200/80 transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Category Pills Strip */}
        <div className="px-4 py-2.5 border-b border-slate-100 flex items-center space-x-1.5 overflow-x-auto bg-slate-50/70 text-xs no-scrollbar">
          {['Semua', 'Mitra Industri', 'Profil', '8 Jurusan', 'SPMB', 'Layanan Digital', 'Berita', 'Prestasi'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto space-y-1.5 flex-1 divide-y-0">
          {filteredResults.length > 0 ? (
            filteredResults.map((res, index) => (
              <div
                key={res.id}
                onClick={() => handleSelectResult(res)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`p-3.5 rounded-2xl cursor-pointer transition-colors flex items-start space-x-3.5 ${
                  selectedIndex === index
                    ? 'bg-blue-50/80 border border-blue-200'
                    : 'hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div className="mt-0.5 p-2 rounded-xl bg-white border border-slate-200 shrink-0">
                  {getCategoryIcon(res.category)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-950 truncate">
                      {res.title}
                    </h4>
                    <div className="shrink-0">
                      {getCategoryBadge(res.category)}
                    </div>
                  </div>

                  <p className="text-xs text-blue-800 font-semibold mt-0.5">
                    {res.subtitle}
                  </p>

                  <p className="text-xs text-slate-500 line-clamp-1 mt-1 leading-relaxed">
                    {res.snippet}
                  </p>
                </div>

                {selectedIndex === index && (
                  <div className="hidden sm:flex items-center text-blue-700 shrink-0 self-center">
                    <CornerDownLeft className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))
          ) : query.trim() ? (
            <div className="py-14 text-center text-slate-500 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-800">Tidak ditemukan hasil untuk "{query}"</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Silakan coba istilah umum seperti <em>SPMB, PPLG, TJKT, Busana, Beasiswa, atau Kontak TU</em>.
              </p>
            </div>
          ) : (
            <div className="py-6 px-3 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                <span>Pencarian Cepat & Populer:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {POPULAR_SEARCHES.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setQuery(item.q);
                      inputRef.current?.focus();
                    }}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-300 text-left transition-colors flex items-center justify-between group"
                  >
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-900">
                      {item.label}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-700 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Key Hints */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono mr-1">↑↓</kbd>
              Navigasi
            </span>
            <span className="flex items-center">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono mr-1">↵</kbd>
              Buka
            </span>
            <span className="flex items-center">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono mr-1">ESC</kbd>
              Tutup
            </span>
          </div>

          <span className="text-blue-800 font-bold hidden sm:inline">
            Command Palette SMKN 1 Bawang
          </span>
        </div>

      </div>
    </div>
  );
};
