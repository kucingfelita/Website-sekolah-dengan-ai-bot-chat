import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  AlertCircle, 
  KeyRound
} from 'lucide-react';
import { AdminUser } from '../../types/adminTypes';

interface AdminLoginPageProps {
  onLoginSuccess: (user: AdminUser) => void;
  onNavigateBack: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onNavigateBack
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Username dan kata sandi wajib diisi.');
      return;
    }

    setIsLoading(true);

    // Simulate authenticating against credentials
    setTimeout(() => {
      if (
        (username.toLowerCase() === 'admin' && password === 'skansa2026') ||
        (username.toLowerCase() === 'admin@smkn1bawang.sch.id' && password === 'skansa2026') ||
        username.toLowerCase() === 'demo'
      ) {
        const user: AdminUser = {
          id: 'adm-01',
          username: 'admin',
          name: 'Drs. H. Mulyono, M.Pd',
          nip: '19700415 199603 1 004',
          role: 'Super Admin',
          department: 'Bidang Kesiswaan & IT Administrasi',
          lastLogin: new Date().toLocaleString('id-ID')
        };
        onLoginSuccess(user);
      } else {
        setErrorMsg('Kredensial tidak valid. Silakan periksa kembali username dan password.');
        setIsLoading(false);
      }
    }, 400);
  };

  const handleQuickDemoLogin = () => {
    setUsername('admin');
    setPassword('skansa2026');
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      const user: AdminUser = {
        id: 'adm-01',
        username: 'admin',
        name: 'Drs. H. Mulyono, M.Pd',
        nip: '19700415 199603 1 004',
        role: 'Super Admin',
        department: 'Bidang Kesiswaan & IT Administrasi',
        lastLogin: new Date().toLocaleString('id-ID')
      };
      onLoginSuccess(user);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col justify-center items-center px-4 sm:px-6 py-12 relative overflow-hidden font-sans">
      
      {/* Subtle Architectural Dot Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-70 pointer-events-none"></div>
      
      {/* Top Back to Website Action */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={onNavigateBack}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-700 hover:text-institution-900 bg-white hover:bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
        >
          <ArrowLeft className="w-4 h-4 text-institution-600" />
          <span>Kembali ke Website Utama</span>
        </button>
      </div>

      {/* Main Institutional Login Card */}
      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-institutional relative z-10 space-y-6">
        
        {/* Top Tri-Color Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-institution-900 via-institution-600 to-amber-500 rounded-t-3xl"></div>

        {/* Institutional Branding */}
        <div className="text-center space-y-3 pt-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-institution-50 border border-institution-100 p-2 shadow-sm">
            <img 
              src="/logo-smk.png" 
              alt="Logo SMK Negeri 1 Bawang" 
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-institution-700 bg-institution-50 border border-institution-200 px-2.5 py-0.5 rounded-md mb-1.5">
              SIM SKANSA : Panel Pengelola
            </span>
            <h1 className="text-2xl font-black tracking-tight text-institution-950">
              SMK Negeri 1 Bawang
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Sistem Informasi Manajemen, Verifikasi SPMB dan Pengelolaan Warta
            </p>
          </div>
        </div>

        {/* Security Banner */}
        <div className="bg-institution-50 border border-institution-200 rounded-xl p-3 flex items-start space-x-2.5 text-xs text-institution-900">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            Akses portal ini dibatasi khusus bagi panitia SPMB, dewan guru, dan administrator berwenang.
          </span>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl p-3 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Username atau NIP
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username atau NIP..."
                className="w-full bg-slate-50 focus:bg-white border border-slate-300 focus:border-institution-600 focus:ring-1 focus:ring-institution-600 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Kata Sandi
              </label>
              <span className="text-[11px] text-slate-500 font-mono">Default: skansa2026</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className="w-full bg-slate-50 focus:bg-white border border-slate-300 focus:border-institution-600 focus:ring-1 focus:ring-institution-600 rounded-xl pl-10 pr-11 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-institution-900 hover:bg-institution-800 disabled:bg-institution-700 text-white text-sm font-bold shadow-subtle hover:shadow transition-all duration-200 flex items-center justify-center space-x-2 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span>Masuk ke Panel Pengelola</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Access Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-slate-500">atau akses instan</span>
          </div>
        </div>

        {/* One-Click Demo Button */}
        <button
          onClick={handleQuickDemoLogin}
          type="button"
          disabled={isLoading}
          className="w-full py-2.5 px-4 rounded-xl bg-institution-50 hover:bg-institution-100 text-institution-900 border border-institution-200 text-xs font-semibold transition-colors flex items-center justify-center space-x-2 group focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
        >
          <KeyRound className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-12 transition-transform" />
          <span>Masuk Cepat dengan Akun Demo (Verifikator)</span>
        </button>

        {/* Bottom Governance Stamp */}
        <div className="pt-2 text-center text-[11px] text-slate-500 leading-relaxed border-t border-slate-100">
          Pemerintah Provinsi Jawa Tengah • Dinas Pendidikan dan Kebudayaan • NPSN 20303942
        </div>

      </div>
    </div>
  );
};
