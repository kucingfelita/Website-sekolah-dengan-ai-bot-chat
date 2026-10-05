import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  ShieldCheck, 
  Building2, 
  ArrowUpRight,
  Clock,
  Instagram,
  Youtube,
  Facebook,
  Lock
} from 'lucide-react';
import { SCHOOL_INFO } from '../../data/schoolData';
import { PROGRAMS } from '../../data/programsData';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E293B] text-slate-200 border-t border-slate-700 mt-auto select-none">
      
      {/* 1. Official Institutional Verification Ribbon - Medium Royal Blue */}
      <div className="border-b border-blue-900 bg-[#1E3A8A] py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          <div className="flex items-center space-x-4">
            <div className="w-13 h-13 rounded-2xl bg-blue-800/80 border border-blue-600/50 flex items-center justify-center text-amber-300 shrink-0 p-3">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white tracking-wide uppercase font-sans">
                Akreditasi A (Unggul)
              </h4>
              <p className="text-xs sm:text-sm text-blue-100/90 mt-1">
                Sertifikasi Badan Akreditasi Nasional (BAN-SM)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-13 h-13 rounded-2xl bg-blue-800/80 border border-blue-600/50 flex items-center justify-center text-amber-300 shrink-0 p-3">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white tracking-wide uppercase font-sans">
                SMK Pusat Keunggulan
              </h4>
              <p className="text-xs sm:text-sm text-blue-100/90 mt-1">
                Penguatan Ekosistem Teaching Factory Kemendikbudristek
              </p>
            </div>
          </div>

          <div className="bg-blue-950/70 p-5 rounded-2xl border border-blue-800/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider block">
                NPSN Resmi
              </span>
              <span className="text-base sm:text-lg font-bold text-white font-mono">
                {SCHOOL_INFO.npsn}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider block">
                Didirikan Sejak
              </span>
              <span className="text-base sm:text-lg font-bold text-amber-300 font-mono">
                1964 (60+ Tahun)
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Institutional Content Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Col 1 (4 cols): School Identity & Official Contact */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3.5">
              <img 
                src="/logo-smk.png" 
                alt="Logo Resmi SMK Negeri 1 Bawang Banjarnegara" 
                className="w-12 h-12 object-contain shrink-0 bg-white p-1 rounded-xl" 
              />
              <div>
                <span className="font-extrabold text-white text-base tracking-tight block">
                  SMK NEGERI 1 BAWANG
                </span>
                <span className="text-xs text-slate-400 block">
                  Kabupaten Banjarnegara, Jawa Tengah
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Lembaga pendidikan kejuruan negeri vokasi unggulan di bawah naungan Dinas Pendidikan dan Kebudayaan Provinsi Jawa Tengah. Berkomitmen melahirkan lulusan berkarakter, berkompeten, dan siap kerja.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {SCHOOL_INFO.address.street}, Pucang, Bawang, Banjarnegara 53471 (Sebelah SMAN 1 Bawang)
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:0286591407" className="hover:text-white transition-colors font-mono">
                  (0286) 591407
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${SCHOOL_INFO.contact.email}`} className="hover:text-white transition-colors">
                  {SCHOOL_INFO.contact.email}
                </a>
              </div>
              <div className="flex items-center space-x-2.5 text-slate-400">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Senin - Jumat: 07.00 - 15.30 WIB</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2 flex items-center space-x-3 text-slate-400">
              <a 
                href={SCHOOL_INFO.socialMedia.instagram} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-blue-900 hover:text-white transition-colors"
                title="Instagram Resmi SKANSA"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={SCHOOL_INFO.socialMedia.youtube} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-red-900 hover:text-white transition-colors"
                title="YouTube Resmi SKANSA"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href={SCHOOL_INFO.socialMedia.facebook} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-blue-900 hover:text-white transition-colors"
                title="Facebook Resmi SKANSA"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2 (3 cols): 8 Program Keahlian */}
          <div className="lg:col-span-3">
            <h5 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-5 pb-2.5 border-b border-slate-800">
              8 Program Keahlian (Akreditasi A)
            </h5>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
              {PROGRAMS.map((prog) => (
                <li key={prog.id}>
                  <button
                    onClick={() => onNavigate(`#/program-keahlian/${prog.slug}`)}
                    className="hover:text-white transition-colors text-left flex items-center group w-full"
                  >
                    <span className="text-blue-400 font-bold mr-2 group-hover:text-blue-300 font-mono shrink-0">
                      {prog.code}
                    </span>
                    <span className="truncate group-hover:underline">
                      {prog.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 (2.5 cols): Layanan Publik Siswa */}
          <div className="lg:col-span-2">
            <h5 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-5 pb-2.5 border-b border-slate-800">
              Layanan Siswa & SPMB
            </h5>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => onNavigate('#/spmb')}
                  className="hover:text-white transition-colors flex items-center text-amber-300 font-semibold"
                >
                  <span>SPMB 2026 (Gratis SPP)</span>
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </button>
              </li>
              <li>
                <a 
                  href="https://elskanza.smkn1bawang.sch.id/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <span>Elskanza (E-Learning)</span>
                  <ExternalLink className="w-3 h-3 ml-1 text-slate-600" />
                </a>
              </li>
              <li>
                <a 
                  href="https://libskanza.smkn1bawang.sch.id/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <span>Graha Pustaka (Perpus)</span>
                  <ExternalLink className="w-3 h-3 ml-1 text-slate-600" />
                </a>
              </li>
              <li>
                <a 
                  href="https://lsp.smkn1bawang.sch.id/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <span>LSP P1 Skansa</span>
                  <ExternalLink className="w-3 h-3 ml-1 text-slate-600" />
                </a>
              </li>
              <li>
                <a 
                  href="https://karya.smkn1bawang.sch.id/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <span>Portal Karya Siswa</span>
                  <ExternalLink className="w-3 h-3 ml-1 text-slate-600" />
                </a>
              </li>
              <li>
                <a 
                  href="https://skl.smkn1bawang.sch.id" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <span>Cek SKL Online</span>
                  <ExternalLink className="w-3 h-3 ml-1 text-slate-600" />
                </a>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('#/pengaduan')} 
                  className="hover:text-white transition-colors flex items-center text-amber-300 font-semibold"
                >
                  <span>Layanan Pengaduan (WBS)</span>
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('#/unduhan')} 
                  className="hover:text-white transition-colors flex items-center text-slate-300"
                >
                  <span>Unduhan & Agenda Resmi</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('#/mitra-industri')} 
                  className="hover:text-white transition-colors flex items-center text-slate-400"
                >
                  <span>Bursa Kerja Khusus (BKK)</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#/prestasi')} className="hover:text-white transition-colors">
                  Daftar Prestasi Siswa
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 (2.5 cols): Tautan Kedinasan Terkait */}
          <div className="lg:col-span-3">
            <h5 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-5 pb-2.5 border-b border-slate-800">
              Tautan Kedinasan & Mitra
            </h5>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => onNavigate('#/mitra-industri')}
                  className="hover:text-white transition-colors flex items-center text-amber-300 font-semibold cursor-pointer"
                >
                  <span>160+ Mitra Industri & DUDIKA</span>
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </button>
              </li>
              <li>
                <a 
                  href="https://www.kemdikbud.go.id" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <span>Kemendikdasmen RI</span>
                  <ExternalLink className="w-3 h-3 ml-1 text-slate-600" />
                </a>
              </li>
              <li>
                <a 
                  href="https://pdk.jatengprov.go.id" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <span>Disdikbud Jawa Tengah</span>
                  <ExternalLink className="w-3 h-3 ml-1 text-slate-600" />
                </a>
              </li>
              <li>
                <a 
                  href="https://cabdin9.pdkjateng.go.id" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <span>Cabang Dinas Wilayah IX</span>
                  <ExternalLink className="w-3 h-3 ml-1 text-slate-600" />
                </a>
              </li>
              <li>
                <a 
                  href="https://ban-sm.kemdikbud.go.id" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <span>BAN-SM Akreditasi Sekolah</span>
                  <ExternalLink className="w-3 h-3 ml-1 text-slate-600" />
                </a>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('#/layanan-digital')}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors mt-2 inline-flex items-center space-x-1 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none rounded"
                >
                  <span>Buka Semua Layanan Digital Terpadu</span>
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* 3. Bottom Legal & Official Regional Compliance Bar */}
      <div className="bg-[#0F172A] border-t border-slate-800 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-center sm:text-left text-slate-400">
            © {currentYear} SMK Negeri 1 Bawang Banjarnegara. Seluruh Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1 text-[11px] text-slate-300">
            <span>Pemerintah Provinsi Jawa Tengah</span>
            <span className="text-slate-600">•</span>
            <span>Cabang Dinas Pendidikan Wilayah IX</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-medium">Bebas Pungli & SPP Bulanan Rp 0</span>
            <span className="text-slate-600">•</span>
            <button
              onClick={() => onNavigate('#/mods')}
              className="text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center space-x-1 cursor-pointer"
              title="Akses Portal Administrator / Moderasi (Mods)"
            >
              <Lock className="w-3 h-3 text-slate-500" />
              <span>Kelola Portal (Mods)</span>
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};
