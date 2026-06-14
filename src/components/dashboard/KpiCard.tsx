import type { ReactNode } from 'react';

interface KpiCardProps {
  label: string;
  value: string;
  icon?: ReactNode;
  hint?: string;
}

export function KpiCard({ label, value, icon, hint }: KpiCardProps) {
  return (
    <div className="rounded-lg border border-navy-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-navy-400">{label}</p>
        {icon ? <span className="text-brand-500">{icon}</span> : null}
      </div>
      <p className="mt-2 text-2xl font-semibold text-navy-900">{value}</p>
      {hint ? <p className="mt-1 text-xs text-navy-400">{hint}</p> : null}
    </div>
  );
}
