import { VISIT_STATUS_LABELS, type VisitItem } from '../../types';

const dayFormatter = new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
const timeFormatter = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' });

const STATUS_STYLES: Record<VisitItem['status'], string> = {
  Scheduled: 'bg-brand-100 text-brand-800',
  Completed: 'bg-navy-100 text-navy-600',
  Cancelled: 'bg-red-100 text-red-700',
};

function startOfWeek(date: Date): Date {
  const result = new Date(date);
  const day = result.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

interface WeeklyVisitCalendarProps {
  visits: VisitItem[];
  referenceDate?: Date;
}

export function WeeklyVisitCalendar({ visits, referenceDate = new Date() }: WeeklyVisitCalendarProps) {
  const weekStart = startOfWeek(referenceDate);
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    return date;
  });

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-7">
      {days.map((day) => {
        const dayVisits = visits.filter((v) => {
          const visitDate = new Date(v.scheduledAt);
          return visitDate.toDateString() === day.toDateString();
        });

        return (
          <div key={day.toISOString()} className="rounded-lg border border-navy-100 bg-white p-3">
            <p className="mb-2 text-xs font-semibold uppercase text-navy-400">{dayFormatter.format(day)}</p>
            {dayVisits.length === 0 ? (
              <p className="text-xs text-navy-300">Aucune visite</p>
            ) : (
              <ul className="space-y-2">
                {dayVisits.map((visit) => (
                  <li key={visit.id} className="rounded border border-navy-50 bg-navy-50/50 p-2">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-semibold text-navy-900">{timeFormatter.format(new Date(visit.scheduledAt))}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[visit.status]}`}>
                        {VISIT_STATUS_LABELS[visit.status]}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-navy-600">{visit.propertyTitle}</p>
                    <p className="truncate text-[11px] text-navy-400">{visit.clientName}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
