import { useMemo } from 'react';
import { useFavorites } from '../../hooks/useFavorites';
import { useMyTransactions } from '../../hooks/useTransactions';
import { useConversations } from '../../hooks/useMessages';
import { KpiCard } from '../../components/dashboard/KpiCard';
import { BienCard } from '../../components/properties/BienCard';
import { TRANSACTION_STAGE_LABELS } from '../../types';

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

export function ClientDashboard() {
  const favoritesQuery = useFavorites();
  const transactionsQuery = useMyTransactions();
  const conversationsQuery = useConversations();

  const unreadCount = useMemo(
    () => (conversationsQuery.data ?? []).reduce((sum, conv) => sum + conv.unreadCount, 0),
    [conversationsQuery.data],
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-navy-900">Mon tableau de bord</h1>
        <p className="text-sm text-navy-400">Vos favoris, vos démarches en cours et vos messages.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard label="Favoris" value={String(favoritesQuery.data?.length ?? 0)} />
        <KpiCard label="Demandes en cours" value={String(transactionsQuery.data?.length ?? 0)} />
        <KpiCard label="Messages non lus" value={String(unreadCount)} />
      </div>

      <section>
        <h2 className="mb-3 text-base font-semibold text-navy-900">Mes favoris</h2>
        {favoritesQuery.isLoading ? (
          <p className="text-sm text-navy-400">Chargement...</p>
        ) : !favoritesQuery.data || favoritesQuery.data.length === 0 ? (
          <p className="text-sm text-navy-400">Vous n'avez aucun bien en favoris.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favoritesQuery.data.map((favorite) => (
              <BienCard key={favorite.id} property={favorite.property} />
            ))}
          </div>
        )}
      </section>

      <section className="rounded-lg border border-navy-100 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-navy-900">Mes demandes en cours</h2>
        {transactionsQuery.isLoading ? (
          <p className="text-sm text-navy-400">Chargement...</p>
        ) : !transactionsQuery.data || transactionsQuery.data.length === 0 ? (
          <p className="text-sm text-navy-400">Vous n'avez aucune démarche en cours.</p>
        ) : (
          <ul className="space-y-2">
            {transactionsQuery.data.map((transaction) => (
              <li key={transaction.id} className="flex items-center justify-between rounded border border-navy-50 bg-navy-50/50 p-3">
                <div>
                  <p className="text-sm font-semibold text-navy-900">{transaction.propertyTitle}</p>
                  <p className="text-xs text-navy-400">
                    {transaction.agentName ? `Agent : ${transaction.agentName} · ` : ''}
                    Mis à jour le {dateFormatter.format(new Date(transaction.updatedAt ?? transaction.createdAt))}
                  </p>
                </div>
                <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-800">
                  {TRANSACTION_STAGE_LABELS[transaction.currentStage]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-lg border border-navy-100 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-navy-900">Mes messages</h2>
        {conversationsQuery.isLoading ? (
          <p className="text-sm text-navy-400">Chargement...</p>
        ) : !conversationsQuery.data || conversationsQuery.data.length === 0 ? (
          <p className="text-sm text-navy-400">Vous n'avez aucun message.</p>
        ) : (
          <ul className="space-y-2">
            {conversationsQuery.data.map((conversation) => (
              <li
                key={conversation.userId}
                className="flex items-center justify-between rounded border border-navy-50 bg-navy-50/50 p-3"
              >
                <div>
                  <p className="text-sm font-semibold text-navy-900">{conversation.userName}</p>
                  <p className="truncate text-xs text-navy-400">{conversation.lastMessage}</p>
                </div>
                {conversation.unreadCount > 0 && (
                  <span className="rounded-full bg-brand-500 px-2 py-0.5 text-xs font-semibold text-white">
                    {conversation.unreadCount}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
