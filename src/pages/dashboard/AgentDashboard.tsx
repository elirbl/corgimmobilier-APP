import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/authStore';
import { propertyService } from '../../services/propertyService';
import { useAgentCalendar } from '../../hooks/useVisits';
import { BienCard } from '../../components/properties/BienCard';
import { BienCardSkeleton } from '../../components/properties/BienCardSkeleton';
import { VISIT_STATUS_LABELS } from '../../types';

const timeFormatter = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' });

const STATUS_STYLES: Record<string, string> = {
  Scheduled: 'bg-brand-100 text-brand-800',
  Completed: 'bg-navy-100 text-navy-600',
  Cancelled: 'bg-red-100 text-red-700',
};

function todayDateOnly(): string {
  return new Date().toISOString().slice(0, 10);
}

export function AgentDashboard() {
  const { user } = useAuthStore();

  const propertiesQuery = useQuery({
    queryKey: ['properties', 'agent', user?.id],
    queryFn: () => propertyService.getAll({ agentId: user!.id, pageSize: 50 }),
    enabled: user !== null,
  });

  const visitsToday = useAgentCalendar(user?.id, todayDateOnly());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-navy-900">Mon tableau de bord</h1>
        <p className="text-sm text-navy-400">Vos biens en charge et vos visites du jour.</p>
      </div>

      <section>
        <h2 className="mb-3 text-base font-semibold text-navy-900">Mes biens en charge</h2>
        {propertiesQuery.isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <BienCardSkeleton key={i} />
            ))}
          </div>
        ) : !propertiesQuery.data || propertiesQuery.data.items.length === 0 ? (
          <p className="text-sm text-navy-400">Aucun bien ne vous est actuellement assigné.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {propertiesQuery.data.items.map((property) => (
              <BienCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>

      <section className="rounded-lg border border-navy-100 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-navy-900">Mes visites du jour</h2>
        {visitsToday.isLoading ? (
          <p className="text-sm text-navy-400">Chargement...</p>
        ) : !visitsToday.data || visitsToday.data.length === 0 ? (
          <p className="text-sm text-navy-400">Aucune visite prévue aujourd'hui.</p>
        ) : (
          <ul className="space-y-2">
            {visitsToday.data.map((visit) => (
              <li key={visit.id} className="flex items-center justify-between rounded border border-navy-50 bg-navy-50/50 p-3">
                <div>
                  <p className="text-sm font-semibold text-navy-900">{timeFormatter.format(new Date(visit.scheduledAt))} · {visit.propertyTitle}</p>
                  <p className="text-xs text-navy-400">{visit.clientName}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_STYLES[visit.status]}`}>
                  {VISIT_STATUS_LABELS[visit.status]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
