import { useMemo } from 'react';
import { useGlobalDashboard } from '../../hooks/useDashboard';
import { KpiCard } from '../../components/dashboard/KpiCard';
import { RevenueLineChart, type RevenuePoint } from '../../components/dashboard/RevenueLineChart';
import { AgencySalesBarChart, type AgencySalesPoint } from '../../components/dashboard/AgencySalesBarChart';
import { ExportButtons } from '../../components/dashboard/ExportButtons';

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

export function SuperAdminDashboard() {
  const { data, isLoading, isError } = useGlobalDashboard();

  const monthlyRevenue = useMemo<RevenuePoint[]>(() => {
    if (!data) return [];

    const totalsByMonth = new Map<string, number>();
    for (const entry of data.revenueByAgency) {
      const key = entry.month;
      totalsByMonth.set(key, (totalsByMonth.get(key) ?? 0) + entry.revenue);
    }

    return Array.from(totalsByMonth.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-12)
      .map(([month, revenue]) => ({ month, revenue }));
  }, [data]);

  const revenueByAgency = useMemo<AgencySalesPoint[]>(() => {
    if (!data) return [];

    const totalsByAgency = new Map<string, number>();
    for (const entry of data.revenueByAgency) {
      totalsByAgency.set(entry.agencyName, (totalsByAgency.get(entry.agencyName) ?? 0) + entry.revenue);
    }

    return Array.from(totalsByAgency.entries()).map(([agencyName, revenue]) => ({ agencyName, revenue }));
  }, [data]);

  if (isLoading) {
    return <p className="text-sm text-navy-400">Chargement du tableau de bord...</p>;
  }

  if (isError || !data) {
    return <p className="text-sm text-red-600">Impossible de charger le tableau de bord.</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-navy-900">Tableau de bord global</h1>
        <p className="text-sm text-navy-400">Vue d'ensemble de l'activité de toutes les agences.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Chiffre d'affaires total" value={currencyFormatter.format(data.totalRevenue)} />
        <KpiCard label="Ventes" value={integerFormatter.format(data.salesCount)} />
        <KpiCard label="Biens en portefeuille" value={integerFormatter.format(data.propertiesCount)} />
        <KpiCard label="Taux de conversion" value={percentFormatter.format(data.conversionRate)} />
      </div>

      <section className="rounded-lg border border-navy-100 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-navy-900">Chiffre d'affaires sur 12 mois</h2>
          <ExportButtons />
        </div>
        <RevenueLineChart data={monthlyRevenue} />
      </section>

      <section className="rounded-lg border border-navy-100 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-navy-900">Ventes par agence</h2>
          <ExportButtons />
        </div>
        <AgencySalesBarChart data={revenueByAgency} />
      </section>
    </div>
  );
}
