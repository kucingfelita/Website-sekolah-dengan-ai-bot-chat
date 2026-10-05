import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'card' | 'badge';
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rect',
  style,
}) => {
  const baseClasses = "animate-shimmer border border-slate-200/60 relative overflow-hidden";
  
  const variantClasses = {
    rect: "rounded-xl",
    circle: "rounded-full",
    card: "rounded-2xl bg-slate-50/70 p-5",
    badge: "rounded-md h-5 w-20 inline-block",
  }[variant];

  return (
    <div
      className={`${baseClasses} ${variantClasses} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

export const SkeletonText: React.FC<{
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}> = ({ lines = 3, className = '', lastLineWidth = '65%' }) => {
  return (
    <div className={`space-y-2.5 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => {
        const isLast = i === lines - 1;
        const width = isLast ? lastLineWidth : (i % 2 === 0 ? '100%' : '90%');
        return (
          <div
            key={i}
            className="h-3.5 rounded bg-slate-200/70 animate-shimmer border border-slate-200/40"
            style={{ width }}
          />
        );
      })}
    </div>
  );
};

export const SkeletonBadge: React.FC<{ className?: string; width?: string }> = ({
  className = '',
  width = '5rem',
}) => {
  return (
    <div
      className={`h-5 rounded-md bg-slate-200/70 animate-shimmer border border-slate-200/50 inline-block ${className}`}
      style={{ width }}
      aria-hidden="true"
    />
  );
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 space-y-4 flex flex-col justify-between ${className}`}
      aria-hidden="true"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <SkeletonBadge width="6rem" />
          <Skeleton variant="rect" className="w-16 h-4 rounded" />
        </div>
        <Skeleton variant="rect" className="w-4/5 h-6 rounded-md" />
        <SkeletonText lines={2} lastLineWidth="75%" />
      </div>
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <Skeleton variant="rect" className="w-24 h-4 rounded" />
        <Skeleton variant="rect" className="w-16 h-4 rounded" />
      </div>
    </div>
  );
};

export const SkeletonMap: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`relative w-full h-full min-h-[380px] lg:min-h-[500px] bg-slate-100 border border-slate-200/80 overflow-hidden flex items-center justify-center select-none ${className}`}
      aria-hidden="true"
    >
      {/* Precision Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e125_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e125_1px,transparent_1px)] bg-[size:2rem_2rem]" />

      {/* Shimmer Sweep Overlay */}
      <div className="absolute inset-0 animate-shimmer opacity-40 pointer-events-none" />

      {/* Center Radar / Pin Pulse Wireframe */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 space-y-3">
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-blue-600/10 animate-ping absolute" />
          <div className="w-8 h-8 rounded-full bg-blue-700/20 border border-blue-600/40 flex items-center justify-center relative">
            <div className="w-3 h-3 rounded-full bg-blue-700" />
          </div>
        </div>

        <div className="space-y-1">
          <span className="font-mono text-[11px] font-bold text-slate-700 tracking-wider uppercase block">
            [GEO-SPATIAL SYNC: SMKN 1 BAWANG]
          </span>
          <span className="font-mono text-[10px] text-slate-400 block">
            Koordinat: -7.3986° S, 109.6531° E • Menghubungkan Google Maps...
          </span>
        </div>

        {/* Hairline status pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-slate-200 text-slate-600 text-[11px] font-medium shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          <span>Memuat Citra Peta Interaktif...</span>
        </div>
      </div>

      {/* Corner Technical Crosshairs */}
      <span className="absolute top-3 left-3 font-mono text-[10px] text-slate-400">+</span>
      <span className="absolute top-3 right-3 font-mono text-[10px] text-slate-400">+</span>
      <span className="absolute bottom-3 left-3 font-mono text-[10px] text-slate-400">+</span>
      <span className="absolute bottom-3 right-3 font-mono text-[10px] text-slate-400">+</span>
    </div>
  );
};
