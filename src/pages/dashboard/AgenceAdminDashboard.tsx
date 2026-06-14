import { useEffect, useMemo, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useAuthStore } from '../../stores/authStore';
import { useAgencies, useAgencyDashboard, useAgencyDetail } from '../../hooks/useDashboard';
import { visitService } from '../../services/visitService';
import { KpiCard } from '../../components/dashboard/KpiCard';
import { RevenueLineChart, type RevenuePoint } from '../../components/dashboard/RevenueLineChart';
import { WeeklyVisitCalendar } from '../../components/dashboard/WeeklyVisitCalendar';
import { ExportButtons } from '../../components/dashboard/ExportButtons';
import type { VisitItem } from '../../types';

const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'percent',
  maximumFractionDigits: 1,
});

const integerFormatter = new Intl.NumberFormat('fr-FR');

export function AgenceAdminDashboard() {
  const { user } = useAuthStore();
  const { data: agencies } = useAgencies();
  const [agencyId, setAgencyId] = useState<number | undefined>(user?.agencyId ?? undefined);

  useEffect(() => {
    if (agencyId === undefined && agencies && agencies.length > 0) {
      setAgencyId(agencies[0].id);
    }
  }, [agencies, agencyId]);

  const { data, isLoading, isError } = useAgencyDashboard(agencyId);
  const { data: agencyDetail } = useAgencyDetail(agencyId);

  const monthlyRevenue = useMemo<RevenuePoint[]>(
    () => (data?.monthlyRevenue ?? []).map((entry) => ({ month: entry.month, revenue: entry.revenue })),
    [data],
  );

  const agentIds = useMemo(() => agencyDetail?.agents.map((a) => a.id) ?? [], [agencyDetail]);

  const calendarQueries = useQueries({
    queries: agentIds.map((agentId) => ({
      queryKey: ['visits', 'agent', agentId, 'all'],
      queryFn: () => visitService.getAgentCalendar(agentId),
    })),
  });

  const weeklyVisits = useMemo<VisitItem[]>(
    () => calendarQueries.flatMap((q) => q.data ?? []),
    [calendarQueries],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-navy-900">Tableau de bord agence</h1>
          <p className="text-sm text-navy-400">KPIs et calendrier des visites filtrés par agence.</p>
        </div>

        <label className="flex items-center gap-2 text-sm text-navy-600">
          Agence
          <select
            value={agencyId ?? ''}
            onChange={(e) => setAgencyId(Number(e.target.value))}
            className="rounded border border-navy-200 px-2 py-1.5 text-sm"
          >
            {(agencies ?? []).map((agency) => (
              <option key={agency.id} value={agency.id}>
                {agency.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {isLoading ? (
        <p className="text-sm text-navy-400">Chargement du tableau de bord...</p>
      ) : isError || !data ? (
        <p className="text-sm text-red-600">Impossible de charger le tableau de bord de cette agence.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard label="Chiffre d'affaires" value={currencyFormatter.format(data.totalRevenue)} />
            <KpiCard label="Ventes" value={integerFormatter.format(data.salesCount)} />
            <KpiCard label="Biens" value={integerFormatter.format(data.propertiesCount)} />
            <KpiCard label="Agents" value={integerFormatter.format(data.agentsCount)} hint={percentFormatter.format(data.conversionRate) + ' de conversion'} />
          </div>

          <section className="rounded-lg border border-navy-100 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-semibold text-navy-900">Chiffre d'affaires sur 12 mois</h2>
              <ExportButtons params={{ agenceId: agencyId }} />
            </div>
            <RevenueLineChart data={monthlyRevenue} />
          </section>

          <section className="rounded-lg border border-navy-100 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-base font-semibold text-navy-900">Calendrier des visites de la semaine</h2>
            <WeeklyVisitCalendar visits={weeklyVisits} />
          </section>
        </>
      )}
    </div>
  );
}
