import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { SuperAdminDashboard } from './dashboard/SuperAdminDashboard';
import { AgenceAdminDashboard } from './dashboard/AgenceAdminDashboard';
import { AgentDashboard } from './dashboard/AgentDashboard';
import { ClientDashboard } from './dashboard/ClientDashboard';

type AdminView = 'global' | 'agence';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [adminView, setAdminView] = useState<AdminView>('global');

  if (user?.role === 'Admin') {
    return (
      <div className="space-y-6">
        <div className="flex gap-2 border-b border-navy-100">
          <button
            type="button"
            onClick={() => setAdminView('global')}
            className={`px-4 py-2 text-sm font-medium ${
              adminView === 'global'
                ? 'border-b-2 border-brand-500 text-brand-700'
                : 'text-navy-400 hover:text-navy-600'
            }`}
          >
            Vue globale
          </button>
          <button
            type="button"
            onClick={() => setAdminView('agence')}
            className={`px-4 py-2 text-sm font-medium ${
              adminView === 'agence'
                ? 'border-b-2 border-brand-500 text-brand-700'
                : 'text-navy-400 hover:text-navy-600'
            }`}
          >
            Vue par agence
          </button>
        </div>

        {adminView === 'global' ? <SuperAdminDashboard /> : <AgenceAdminDashboard />}
      </div>
    );
  }

  if (user?.role === 'Agent') {
    return <AgentDashboard />;
  }

  if (user?.role === 'Client') {
    return <ClientDashboard />;
  }

  return null;
}
