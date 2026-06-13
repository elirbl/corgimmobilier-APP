import { useState } from 'react';

interface LazyImageProps {
  src: string | null;
  alt: string;
  className?: string;
}

export function LazyImage({ src, alt, className = '' }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  if (!src) {
    return (
      <div className={`flex items-center justify-center bg-navy-100 text-navy-300 ${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-10 w-10" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75 8.69 9.31a2.25 2.25 0 0 1 3.182 0l5.658 5.658M11.25 11.25l1.69-1.69a2.25 2.25 0 0 1 3.182 0L21.75 15M3 3h18v18H3V3Z" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-navy-100" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
