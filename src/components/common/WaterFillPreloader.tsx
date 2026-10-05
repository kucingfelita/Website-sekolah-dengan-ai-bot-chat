import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VOCATIONAL_PHOTOS } from '../../data/imagery';
import { RotateCcw } from 'lucide-react';
import { usePreload } from '../../context/PreloadContext';

interface WaterFillPreloaderProps {
  onLoaded?: () => void;
  minDurationMs?: number; // Default 4000ms for testing & appreciation
}

interface AssetToLoad {
  id: string;
  name: string;
  url?: string;
}

export const WaterFillPreloader: React.FC<WaterFillPreloaderProps> = ({
  onLoaded,
  minDurationMs = 4000,
}) => {
  const { completePreload, replayPreload, shouldReplay, acknowledgeReplay } = usePreload();
  const [displayProgress, setDisplayProgress] = useState<number>(0);
  const [currentStatus, setCurrentStatus] = useState<string>('Menginisialisasi sistem web SKANSA...');
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(true);
  const [isFlying, setIsFlying] = useState<boolean>(false);
  const [flyStyle, setFlyStyle] = useState<React.CSSProperties | null>(null);

  const startTimeRef = useRef<number>(Date.now());
  const animFrameRef = useRef<number | null>(null);
  const centerLogoRef = useRef<HTMLDivElement>(null);
  const realAssetsLoadedRef = useRef<boolean>(false);

  // Preload critical assets in background
  useEffect(() => {
    const assets: AssetToLoad[] = [
      { id: 'logo', name: 'Logo Crest', url: '/logo-smk.png' },
      { id: 'hero', name: 'Campus Hero', url: VOCATIONAL_PHOTOS.campus.hero },
      { id: 'pplg', name: 'Major PPLG', url: VOCATIONAL_PHOTOS.majors.pplg },
      { id: 'tjkt', name: 'Major TJKT', url: VOCATIONAL_PHOTOS.majors.tjkt },
      { id: 'tefa', name: 'Facility TeFa', url: VOCATIONAL_PHOTOS.facilities.tefa },
    ];

    let loadedCount = 0;
    const total = assets.length;

    const checkComplete = () => {
      loadedCount++;
      if (loadedCount >= total) {
        realAssetsLoadedRef.current = true;
      }
    };

    assets.forEach((asset) => {
      const img = new Image();
      img.onload = checkComplete;
      img.onerror = checkComplete;
      if (asset.url) img.src = asset.url;
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.catch(() => {});
    }
  }, []);

  // Morphing Flying Dock Transition to Navbar Logo
  const startFlightToNavbar = useCallback(() => {
    const targetEl = document.getElementById('navbar-skansa-logo');
    const centerEl = centerLogoRef.current;

    if (targetEl && centerEl) {
      const targetRect = targetEl.getBoundingClientRect();
      const centerRect = centerEl.getBoundingClientRect();

      // Calculate exact center-to-center delta translation
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;
      const centerCenterX = centerRect.left + centerRect.width / 2;
      const centerCenterY = centerRect.top + centerRect.height / 2;

      const deltaX = targetCenterX - centerCenterX;
      const deltaY = targetCenterY - centerCenterY;
      const scale = targetRect.width / centerRect.width;

      setIsFlying(true);
      setFlyStyle({
        transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scale})`,
        transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 10000,
      });
      setIsExiting(true);

      // Complete docking and seamlessly handover to the navbar logo
      setTimeout(() => {
        setIsMounted(false);
        completePreload();
        if (onLoaded) onLoaded();
      }, 850);
    } else {
      // Fallback if target element not found
      setIsExiting(true);
      setTimeout(() => {
        setIsMounted(false);
        completePreload();
        if (onLoaded) onLoaded();
      }, 700);
    }
  }, [completePreload, onLoaded]);

  // Deliberate fluid progress animation
  const runAnimation = useCallback(() => {
    startTimeRef.current = Date.now();
    setIsExiting(false);
    setIsFlying(false);
    setFlyStyle(null);

    const step = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const t = Math.min(1, elapsed / minDurationMs);
      
      // Smooth cubic ease-out progression
      const easedT = t < 0.5 
        ? 2 * t * t 
        : 1 - Math.pow(-2 * t + 2, 2) / 2;

      const currentVal = Math.min(100, Math.round(easedT * 100));
      setDisplayProgress(currentVal);

      // Educational status feedback
      if (currentVal < 25) {
        setCurrentStatus('Mengalirkan data dasar & identitas SKANSA...');
      } else if (currentVal < 55) {
        setCurrentStatus('Mengisi kurikulum & 8 program keahlian vokasi...');
      } else if (currentVal < 85) {
        setCurrentStatus('Sinkronisasi fasilitas teaching factory & kampus...');
      } else if (currentVal < 100) {
        setCurrentStatus('Menyempurnakan tata letak presisi institusional...');
      } else {
        setCurrentStatus('100% Siap: Menuju Halaman Utama...');
      }

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        // Animation reached 100%
        // Brief pause (300ms) to register full crest, then launch smooth flight to navbar
        setTimeout(() => {
          startFlightToNavbar();
        }, 300);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, [minDurationMs, startFlightToNavbar]);

  useEffect(() => {
    runAnimation();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [runAnimation]);

  useEffect(() => {
    if (shouldReplay) {
      acknowledgeReplay();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      setIsMounted(true);
      runAnimation();
    }
  }, [shouldReplay, acknowledgeReplay, runAnimation]);

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    replayPreload();
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsMounted(true);
    runAnimation();
  };

  if (!isMounted) return null;

  const roundedPercent = Math.min(100, displayProgress);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none transition-opacity duration-800 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ 
        backgroundColor: '#FFFFFF',
      }}
      aria-label="Pemuatan Website SMK Negeri 1 Bawang"
      role="status"
    >
      <style>{`
        /* Pure natural sinusoidal wave motion */
        @keyframes waterSine1 {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes waterSine2 {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes microBubble {
          0% {
            transform: translateY(100%) scale(0.6);
            opacity: 0;
          }
          30% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-40px) scale(1.1);
            opacity: 0;
          }
        }

        .animate-water-sine-1 {
          animation: waterSine1 2.6s linear infinite;
        }

        .animate-water-sine-2 {
          animation: waterSine2 3.8s linear infinite;
        }

        .bubble-1 {
          animation: microBubble 2s ease-in infinite;
          left: 28%;
        }
        .bubble-2 {
          animation: microBubble 1.6s ease-in infinite 0.5s;
          left: 50%;
        }
        .bubble-3 {
          animation: microBubble 2.4s ease-in infinite 1s;
          left: 72%;
        }
      `}</style>

      {/* Main Center Container */}
      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        
        {/* SKANSA Crest Container (True Liquid Alpha Masking & Flying Dock Target) */}
        <div 
          ref={centerLogoRef}
          style={flyStyle || undefined}
          className="relative w-48 h-48 sm:w-52 sm:h-52 mb-6 flex items-center justify-center will-change-transform"
        >
          
          {/* Layer 1: Base Ghost Layer (Faint Contour of the Crest Silhouette) */}
          <div className={`absolute inset-0 flex items-center justify-center p-2 transition-opacity duration-300 ${
            isFlying ? 'opacity-0' : 'opacity-100'
          }`}>
            <img
              src="/logo-smk.png"
              alt="SKANSA Logo Ghost"
              className="w-full h-full object-contain opacity-15 filter grayscale"
              draggable={false}
            />
          </div>

          {/* Layer 2: True Liquid Alpha Mask
              Using CSS mask-image so EVERY wave, bubble, and color is strictly locked 
              inside the non-transparent contour of the SKANSA crest logo!
              Zero square cutoff, zero spillover, zero scan lines! */}
          <div
            className="absolute inset-0 p-2 pointer-events-none"
            style={{
              maskImage: `url('/logo-smk.png')`,
              WebkitMaskImage: `url('/logo-smk.png')`,
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
            }}
          >
            {/* The Full Vibrant Color Logo (revealed smoothly from bottom to top) */}
            <img
              src="/logo-smk.png"
              alt="SKANSA Logo Color"
              className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(30,58,138,0.3)] transition-all duration-75"
              style={{
                clipPath: isFlying ? 'none' : `inset(${100 - displayProgress}% 0 0 0)`,
              }}
              draggable={false}
            />

            {/* Rising Sapphire-Cyan Liquid Sheen Overlay (only active while filling) */}
            {!isFlying && (
              <div
                className="absolute inset-x-0 bottom-0 transition-all duration-75 ease-out overflow-hidden"
                style={{
                  height: `${displayProgress}%`,
                }}
              >
                {/* Semi-transparent liquid tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-700/35 via-blue-500/20 to-cyan-400/25 mix-blend-color-dodge" />

                {/* Rising Air Micro-Bubbles (contained inside the crest mask) */}
                {displayProgress > 8 && displayProgress < 98 && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <span className="bubble-1 absolute bottom-0 w-2.5 h-2.5 rounded-full bg-cyan-200/70 blur-[0.5px]" />
                    <span className="bubble-2 absolute bottom-0 w-3 h-3 rounded-full bg-blue-200/80 blur-[0.5px]" />
                    <span className="bubble-3 absolute bottom-0 w-2 h-2 rounded-full bg-sky-100/75 blur-[0.5px]" />
                  </div>
                )}

                {/* Meniscus Ripple Wave Surface (strictly inside crest) */}
                {displayProgress > 2 && displayProgress < 98 && (
                  <div
                    className="absolute left-0 right-0 pointer-events-none z-10"
                    style={{
                      top: '-8px',
                      height: '16px',
                    }}
                  >
                    {/* Secondary Wave Layer */}
                    <svg
                      className="absolute top-0 left-0 w-[200%] h-full animate-water-sine-2 opacity-50 text-cyan-400"
                      viewBox="0 0 720 20"
                      preserveAspectRatio="none"
                      fill="currentColor"
                    >
                      <path d="M 0,10 C 60,3 120,17 180,10 C 240,3 300,17 360,10 C 420,3 480,17 540,10 C 600,3 660,17 720,10 L 720,20 L 0,20 Z" />
                    </svg>

                    {/* Primary Wave Layer */}
                    <svg
                      className="absolute top-0 left-0 w-[200%] h-full animate-water-sine-1 opacity-80 text-blue-600"
                      viewBox="0 0 720 20"
                      preserveAspectRatio="none"
                      fill="currentColor"
                    >
                      <path d="M 0,10 C 60,17 120,3 180,10 C 240,17 300,3 360,10 C 420,17 480,3 540,10 C 600,17 660,3 720,10 L 720,20 L 0,20 Z" />
                    </svg>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Surrounding Texts & Indicators (smoothly fade out when flight begins) */}
        <div className={`transition-opacity duration-300 ${isFlying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {/* Institutional Typography & Brand Header */}
          <div className="space-y-1 mb-5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-institution-50 border border-institution-100 text-[11px] font-semibold text-institution-700 tracking-wider uppercase">
              SMK Pusat Keunggulan
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 font-sans">
              SMK NEGERI 1 BAWANG
            </h1>
            <p className="text-xs text-slate-500 font-medium max-w-xs">
              Kabupaten Banjarnegara • Vokasi Berdaya Saing Global
            </p>
          </div>

          {/* Real Loading Progress & Bar */}
          <div className="w-full max-w-xs space-y-2">
            {/* Percentage & Status Label */}
            <div className="flex items-baseline justify-between px-1">
              <span className="text-xs font-semibold text-slate-500 tracking-tight">
                Kesiapan Sistem
              </span>
              <span className="font-mono text-base font-bold text-institution-700 tabular-nums">
                {roundedPercent}%
              </span>
            </div>

            {/* Minimal Solid Progress Rail */}
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden p-0 relative shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-institution-700 via-institution-600 to-blue-500 rounded-full transition-[width] duration-100 ease-out"
                style={{ width: `${displayProgress}%` }}
              />
            </div>

            {/* Dynamic Educational Status */}
            <p className="text-[11px] text-slate-500 font-mono tracking-tight h-5 flex items-center justify-center truncate px-2">
              {currentStatus}
            </p>
          </div>

          {/* Discreet Testing Replay Button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleReplay}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-institution-50 hover:text-institution-700 text-slate-600 text-[11px] font-semibold transition-colors border border-slate-200 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Ulangi Animasi Air (Testing Mode)</span>
            </button>
          </div>
        </div>

      </div>

      {/* Discreet Copyright & Accreditation Footnote */}
      <div className={`absolute bottom-4 text-center text-[11px] text-slate-400 font-medium transition-opacity duration-300 ${
        isFlying ? 'opacity-0' : 'opacity-100'
      }`}>
        Terakreditasi A (Unggul) • NPSN 20303942
      </div>
    </div>
  );
};
