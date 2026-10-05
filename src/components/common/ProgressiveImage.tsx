import React, { useState, useEffect } from 'react';
import { Skeleton } from './Skeleton';
import { ImageOff } from 'lucide-react';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  aspectRatio?: string;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  onLoadComplete?: () => void;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  aspectRatio = '',
  fallbackSrc = '/logo-smk.png',
  loading = 'lazy',
  onLoadComplete,
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    // Reset state if src changes
    setIsLoaded(false);
    setHasError(false);

    if (!src) {
      setHasError(true);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
      if (onLoadComplete) onLoadComplete();
    };
    img.onerror = () => {
      setHasError(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoadComplete]);

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      {/* Skeleton Shimmer Placeholder (visible until image loads or if error) */}
      {!isLoaded && !hasError && (
        <Skeleton 
          className="absolute inset-0 w-full h-full rounded-none" 
          variant="rect" 
        />
      )}

      {/* Error Fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center p-4 text-center border border-slate-200 text-slate-400 select-none">
          <ImageOff className="w-8 h-8 mb-2 text-slate-300" />
          <span className="text-[11px] font-mono font-medium">Gambar Tidak Tersedia</span>
        </div>
      )}

      {/* Real Image with smooth cubic opacity reveal */}
      {!hasError && (
        <img
          src={src || fallbackSrc}
          alt={alt}
          loading={loading}
          className={`w-full h-full object-cover transition-opacity duration-400 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } ${imgClassName}`}
        />
      )}
    </div>
  );
};
