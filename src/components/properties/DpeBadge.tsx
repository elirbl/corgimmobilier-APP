import type { PropertyDpe } from '../../types';

const DPE_STYLES: Record<PropertyDpe, string> = {
  A: 'bg-emerald-500 text-white',
  B: 'bg-green-500 text-white',
  C: 'bg-lime-500 text-white',
  D: 'bg-yellow-400 text-navy-900',
  E: 'bg-orange-400 text-white',
  F: 'bg-orange-600 text-white',
  G: 'bg-red-600 text-white',
};

interface DpeBadgeProps {
  rating: PropertyDpe | null;
  className?: string;
}

export function DpeBadge({ rating, className = '' }: DpeBadgeProps) {
  if (!rating) return null;

  return (
    <span
      title={`Diagnostic de Performance Énergétique : ${rating}`}
      aria-label={`DPE ${rating}`}
      className={`inline-flex h-6 w-6 items-center justify-center rounded text-xs font-bold ${DPE_STYLES[rating]} ${className}`}
    >
      {rating}
    </span>
  );
}
