import { useState } from 'react';
import { BienCard } from '../components/properties/BienCard';
import { BienCardSkeleton } from '../components/properties/BienCardSkeleton';
import { BienFilters } from '../components/properties/BienFilters';
import { BienMap } from '../components/properties/BienMap';
import { Pagination } from '../components/properties/Pagination';
import { ViewToggle, type ViewMode } from '../components/properties/ViewToggle';
import { useProperties, usePropertyCities } from '../hooks/useProperties';
import type { PropertyFilters } from '../types';

const PAGE_SIZE = 12;

export default function BienListPage() {
  const [filters, setFilters] = useState<PropertyFilters>({ page: 1, pageSize: PAGE_SIZE });
  const [view, setView] = useState<ViewMode>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { data, isLoading, isError } = useProperties(filters);
  const { data: cities = [] } = usePropertyCities();

  const properties = data?.items ?? [];
  const totalPages = data?.totalPages ?? 0;
  const page = filters.page ?? 1;

  function handleResetFilters() {
    setFilters({ page: 1, pageSize: PAGE_SIZE });
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-navy-900">Catalogue des biens</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            className="rounded-md border border-navy-200 px-3 py-1.5 text-sm font-medium text-navy-600 hover:bg-navy-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 lg:hidden"
            aria-expanded={filtersOpen}
            aria-controls="bien-filters-panel"
          >
            Filtres
          </button>
          <ViewToggle value={view} onChange={setView} />
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <aside
          id="bien-filters-panel"
          className={`${filtersOpen ? 'block' : 'hidden'} w-full flex-shrink-0 rounded-lg border border-navy-100 bg-white p-4 shadow-sm lg:block lg:w-64`}
        >
          <BienFilters filters={filters} cities={cities} onChange={setFilters} onReset={handleResetFilters} />
        </aside>

        <div className="flex-1">
          {isError && (
            <p role="alert" className="rounded-md bg-red-50 p-4 text-sm text-red-700">
              Une erreur est survenue lors du chargement des biens.
            </p>
          )}

          {!isError && isLoading && (
            <div
              className={
                view === 'list'
                  ? 'flex flex-col gap-4'
                  : 'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'
              }
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <BienCardSkeleton key={i} variant={view === 'list' ? 'list' : 'grid'} />
              ))}
            </div>
          )}

          {!isError && !isLoading && properties.length === 0 && (
            <p className="rounded-md border border-navy-100 bg-white p-6 text-center text-sm text-navy-400">
              Aucun bien ne correspond à votre recherche.
            </p>
          )}

          {!isError && !isLoading && properties.length > 0 && view === 'map' && (
            <BienMap properties={properties} />
          )}

          {!isError && !isLoading && properties.length > 0 && view === 'grid' && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {properties.map((property) => (
                <BienCard key={property.id} property={property} variant="grid" />
              ))}
            </div>
          )}

          {!isError && !isLoading && properties.length > 0 && view === 'list' && (
            <div className="flex flex-col gap-4">
              {properties.map((property) => (
                <BienCard key={property.id} property={property} variant="list" />
              ))}
            </div>
          )}

          {!isError && view !== 'map' && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setFilters((prev) => ({ ...prev, page: newPage }))}
            />
          )}
        </div>
      </div>
    </div>
  );
}
