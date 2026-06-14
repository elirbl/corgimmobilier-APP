import { Link, useParams } from 'react-router-dom';
import { useAgency } from '../hooks/useAgencies';

export default function AgencyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const agencyId = id ? Number(id) : undefined;
  const { data: agency, isLoading, isError } = useAgency(agencyId);

  return (
    <div>
      <Link to="/agencies" className="mb-4 inline-block text-sm text-brand-600 hover:underline">
        ← Retour aux agences
      </Link>

      {isError && (
        <p role="alert" className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          Une erreur est survenue lors du chargement de l'agence.
        </p>
      )}

      {!isError && isLoading && <p className="text-sm text-navy-400">Chargement...</p>}

      {!isError && !isLoading && agency && (
        <div className="flex flex-col gap-6">
          <div className="rounded-lg border border-navy-100 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-semibold text-navy-900">{agency.name}</h1>
            <p className="mt-1 text-sm text-navy-400">{agency.city}</p>

            <dl className="mt-4 grid grid-cols-1 gap-2 text-sm text-navy-600 sm:grid-cols-2">
              <div>
                <dt className="font-medium text-navy-900">Adresse</dt>
                <dd>{agency.address}</dd>
              </div>
              <div>
                <dt className="font-medium text-navy-900">Téléphone</dt>
                <dd>{agency.phone}</dd>
              </div>
              <div>
                <dt className="font-medium text-navy-900">Email</dt>
                <dd>{agency.email}</dd>
              </div>
              <div>
                <dt className="font-medium text-navy-900">Biens</dt>
                <dd>{agency.propertiesCount}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-lg border border-navy-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-navy-900">Agents</h2>

            {agency.agents.length === 0 ? (
              <p className="mt-2 text-sm text-navy-400">Aucun agent rattaché à cette agence.</p>
            ) : (
              <ul className="mt-3 flex flex-col gap-2">
                {agency.agents.map((agent) => (
                  <li
                    key={agent.id}
                    className="flex flex-col gap-1 rounded-md border border-navy-100 p-3 text-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="font-medium text-navy-900">
                      {agent.firstName} {agent.lastName}
                    </span>
                    <div className="flex flex-col gap-1 text-navy-600 sm:flex-row sm:gap-4">
                      <span>{agent.email}</span>
                      <span>{agent.phone}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
