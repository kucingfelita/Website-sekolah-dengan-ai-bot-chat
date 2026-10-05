import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  HelpCircle, 
  Briefcase, 
  CheckCircle, 
  FileCheck, 
  Users, 
  ExternalLink,
  ShieldCheck,
  Key,
  Info
} from 'lucide-react';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { DIGITAL_SERVICES } from '../data/servicesData';
import { DigitalService } from '../types';

interface DigitalServicesPageProps {
  onNavigate: (path: string) => void;
}

export const DigitalServicesPage: React.FC<DigitalServicesPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = [
    'Semua',
    'Akademik & Pembelajaran',
    'Administrasi & Data',
    'Layanan Publik & Bantuan',
    'Karir & Alumni'
  ];

  const filteredServices = selectedCategory === 'Semua'
    ? DIGITAL_SERVICES
    : DIGITAL_SERVICES.filter(s => s.category === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-institution-600" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-institution-600" />;
      case 'Award': return <Award className="w-6 h-6 text-institution-600" />;
      case 'HelpCircle': return <HelpCircle className="w-6 h-6 text-institution-600" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-institution-600" />;
      case 'CheckCircle': return <CheckCircle className="w-6 h-6 text-institution-600" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6 text-institution-600" />;
      case 'Users': return <Users className="w-6 h-6 text-institution-600" />;
      default: return <GraduationCap className="w-6 h-6 text-institution-600" />;
    }
  };

  return (
    <div className="bg-white">
      <Breadcrumb 
        items={[{ label: "Layanan Digital Terpadu" }]} 
        onNavigate={onNavigate} 
      />

      {/* Hero Banner */}
      <section className="bg-institution-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-institution-900">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-institution-300 bg-institution-900 px-3 py-1 rounded-full border border-institution-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Single Portal Ekosistem Vokasi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Pusat Layanan Digital Terpadu
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Satu pintu akses menuju seluruh sistem pembelajaran, perpustakaan digital, administrasi data siswa, pusat karir bursa kerja, dan helpdesk resmi SMK Negeri 1 Bawang.
          </p>
        </div>
      </section>

      {/* Single Sign-On Info Box */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-institution-50 border border-institution-200 rounded-2xl p-4 sm:p-5 flex items-start space-x-3.5">
          <Key className="w-5 h-5 text-institution-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-xs sm:text-sm text-institution-950">
            <strong className="font-bold block">
              Akun Pembelajaran Resmi (@smkn1bawang.sch.id):
            </strong>
            <p className="text-slate-600 leading-relaxed">
              Siswa dan guru dapat masuk ke sistem LMS, E-Library, dan Presensi menggunakan akun Google Workspace for Education yang dibagikan oleh staf IT sekolah pada awal semester.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pb-4 border-b border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-institution-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-600 hover:bg-slate-50/40 p-6 transition-colors duration-150 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-institution-50 border border-institution-100">
                    {getIcon(svc.iconName)}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {svc.statusText}
                  </span>
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-institution-600">
                      {svc.code}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-institution-950 mt-0.5">
                    {svc.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-institution-700 block mt-0.5">
                    {svc.category}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {svc.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {svc.targetUsers.map((u, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">
                      {u}
                    </span>
                  ))}
                </div>

                {svc.url.startsWith('#/') ? (
                  <button
                    onClick={() => onNavigate(svc.url)}
                    className="px-3 py-1.5 rounded-lg bg-institution-900 hover:bg-institution-800 text-white text-xs font-bold transition-colors inline-flex items-center"
                  >
                    <span>Buka Layanan</span>
                  </button>
                ) : (
                  <a
                    href={svc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-institution-900 hover:bg-institution-800 text-white text-xs font-bold transition-colors inline-flex items-center"
                  >
                    <span>Buka Sistem</span>
                    <ExternalLink className="w-3 h-3 ml-1.5 text-slate-300" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
