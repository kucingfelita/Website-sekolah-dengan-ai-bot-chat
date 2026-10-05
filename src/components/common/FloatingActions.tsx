import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageSquareText, ArrowRight } from 'lucide-react';
import { scrollToTop } from '../../utils/smoothScroll';

interface FloatingActionsProps {
  onOpenAI: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenAI }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    scrollToTop();
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3 pointer-events-none select-none">
      
      {/* Scroll to Top Button */}
      <button
        onClick={handleScrollToTop}
        aria-label="Kembali ke atas halaman"
        className={`pointer-events-auto w-11 h-11 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-full flex items-center justify-center transition-all duration-200 ${
          showScrollTop
            ? 'opacity-100 translate-y-0 scale-100 shadow-md'
            : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
        } active:scale-95 group cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none`}
        title="Kembali ke atas"
      >
        <ArrowUp className="w-5 h-5 text-slate-700 group-hover:text-institution-900 transition-colors" />
      </button>

      {/* Modern Compact Floating "Tanya SKANSA" Button */}
      <button
        onClick={onOpenAI}
        aria-label="Buka Tanya Skansa : Pusat Informasi Resmi Sekolah"
        className="pointer-events-auto group relative flex items-center space-x-3 px-4 py-2.5 bg-institution-900 hover:bg-institution-800 text-white border-2 border-amber-400 hover:border-amber-300 rounded-full transition-all duration-150 active:scale-95 shadow-institutional overflow-hidden cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
      >
        {/* Dynamic Avatar / Icon Badge with Live Status Indicator */}
        <div className="relative w-9 h-9 rounded-full bg-white text-institution-900 flex items-center justify-center font-bold text-sm shrink-0 border border-blue-200 shadow-xs">
          <MessageSquareText className="w-4 h-4 text-institution-900 group-hover:scale-110 transition-transform" />
          
          {/* Live pulsing online indicator dot */}
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border-2 border-white"></span>
          </span>
        </div>

        {/* Clear, Engaging Typography */}
        <div className="text-left font-sans pr-1">
          <div className="flex items-center space-x-1.5">
            <span className="text-sm font-extrabold tracking-tight text-white group-hover:text-amber-200 transition-colors">
              Tanya SKANSA
            </span>
            <span className="text-[9px] font-bold bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full">
              Resmi
            </span>
          </div>
          <span className="text-[11px] text-blue-200 font-medium block leading-none mt-0.5">
            Pusat Informasi & SPMB
          </span>
        </div>

        {/* Right Arrow Interactive Icon */}
        <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors shrink-0">
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>

      </button>

    </div>
  );
};
