import { PROPERTY_STATUS_LABELS, type PropertyStatus } from '../../types';

const STATUS_STYLES: Record<PropertyStatus, string> = {
  Available: 'bg-brand-100 text-brand-800',
  UnderOffer: 'bg-amber-100 text-amber-800',
  Sold: 'bg-navy-100 text-navy-600',
};

interface StatusBadgeProps {
  status: PropertyStatus | null;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (!status) return null;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}
    >
      {PROPERTY_STATUS_LABELS[status]}
    </span>
  );
}
