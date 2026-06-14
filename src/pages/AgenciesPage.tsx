import { Link } from 'react-router-dom';
import { useAgencies } from '../hooks/useAgencies';

export default function AgenciesPage() {
  const { data: agencies = [], isLoading, isError } = useAgencies();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold text-navy-900">Agences</h1>

      {isError && (
        <p role="alert" className="rounded-md bg-red-50 p-4 text-sm text-red-700">
          Une erreur est survenue lors du chargement des agences.
        </p>
      )}

      {!isError && isLoading && <p className="text-sm text-navy-400">Chargement...</p>}

      {!isError && !isLoading && agencies.length === 0 && (
        <p className="rounded-md border border-navy-100 bg-white p-6 text-center text-sm text-navy-400">
          Aucune agence enregistrée.
        </p>
      )}

      {!isError && !isLoading && agencies.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {agencies.map((agency) => (
            <Link
              key={agency.id}
              to={`/agencies/${agency.id}`}
              className="rounded-lg border border-navy-100 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-navy-900">{agency.name}</h2>
              <p className="mt-1 text-sm text-navy-400">{agency.city}</p>
              <p className="mt-2 text-sm text-navy-600">{agency.address}</p>
              <div className="mt-3 flex flex-col gap-1 text-sm text-navy-600">
                <span>{agency.phone}</span>
                <span>{agency.email}</span>
              </div>
              <p className="mt-3 text-sm font-medium text-brand-600">
                {agency.propertiesCount} bien{agency.propertiesCount === 1 ? '' : 's'}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
