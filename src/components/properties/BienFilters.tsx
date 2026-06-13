import {
  PROPERTY_DPE_VALUES,
  PROPERTY_STATUS_LABELS,
  PROPERTY_TYPE_LABELS,
  type PropertyDpe,
  type PropertyFilters,
  type PropertyStatus,
  type PropertyType,
} from '../../types';

const PROPERTY_TYPES: PropertyType[] = ['Residential', 'Commercial', 'Land', 'MixedUse'];
const PROPERTY_STATUSES: PropertyStatus[] = ['Available', 'UnderOffer', 'Sold'];

export const PRICE_MIN = 0;
export const PRICE_MAX = 2_000_000;
export const SURFACE_MAX = 500;

const priceFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

interface BienFiltersProps {
  filters: PropertyFilters;
  cities: string[];
  onChange: (filters: PropertyFilters) => void;
  onReset: () => void;
}

export function BienFilters({ filters, cities, onChange, onReset }: BienFiltersProps) {
  const priceMin = filters.prixMin ?? PRICE_MIN;
  const priceMax = filters.prixMax ?? PRICE_MAX;

  function update(partial: Partial<PropertyFilters>) {
    onChange({ ...filters, ...partial, page: 1 });
  }

  function handlePriceMin(value: number) {
    update({ prixMin: Math.min(value, priceMax) || undefined });
  }

  function handlePriceMax(value: number) {
    update({ prixMax: Math.max(value, priceMin) });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-navy-900">Filtres</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-brand-600 hover:text-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
        >
          Réinitialiser
        </button>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-navy-800">Type de bien</legend>
        <div className="space-y-1">
          <label className="flex items-center gap-2 text-sm text-navy-600">
            <input
              type="radio"
              name="property-type"
              checked={!filters.type}
              onChange={() => update({ type: undefined })}
              className="h-4 w-4 text-brand-600 focus-visible:ring-2 focus-visible:ring-brand-500"
            />
            Tous
          </label>
          {PROPERTY_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-2 text-sm text-navy-600">
              <input
                type="radio"
                name="property-type"
                checked={filters.type === type}
                onChange={() => update({ type })}
                className="h-4 w-4 text-brand-600 focus-visible:ring-2 focus-visible:ring-brand-500"
              />
              {PROPERTY_TYPE_LABELS[type]}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className="mb-2 block text-sm font-medium text-navy-800">
          Prix : {priceFormatter.format(priceMin)} – {priceFormatter.format(priceMax)}
        </label>
        <div className="space-y-2">
          <input
            type="range"
            aria-label="Prix minimum"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={10000}
            value={priceMin}
            onChange={(e) => handlePriceMin(Number(e.target.value))}
            className="w-full accent-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          />
          <input
            type="range"
            aria-label="Prix maximum"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={10000}
            value={priceMax}
            onChange={(e) => handlePriceMax(Number(e.target.value))}
            className="w-full accent-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="surface-filter" className="mb-2 block text-sm font-medium text-navy-800">
          Surface minimum : {filters.surface ?? 0} m²
        </label>
        <input
          id="surface-filter"
          type="range"
          min={0}
          max={SURFACE_MAX}
          step={5}
          value={filters.surface ?? 0}
          onChange={(e) => update({ surface: Number(e.target.value) || undefined })}
          className="w-full accent-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        />
      </div>

      <div>
        <label htmlFor="city-filter" className="mb-2 block text-sm font-medium text-navy-800">
          Ville
        </label>
        <select
          id="city-filter"
          value={filters.ville ?? ''}
          onChange={(e) => update({ ville: e.target.value || undefined })}
          className="w-full rounded-md border border-navy-200 px-3 py-2 text-sm text-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <option value="">Toutes les villes</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-navy-800">DPE</legend>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrer par classe DPE">
          <button
            type="button"
            aria-pressed={!filters.dpe}
            onClick={() => update({ dpe: undefined })}
            className={`rounded px-2.5 py-1 text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
              !filters.dpe ? 'bg-brand-600 text-white' : 'bg-navy-100 text-navy-600'
            }`}
          >
            Tous
          </button>
          {PROPERTY_DPE_VALUES.map((dpe) => (
            <button
              key={dpe}
              type="button"
              aria-pressed={filters.dpe === dpe}
              onClick={() => update({ dpe: filters.dpe === dpe ? undefined : (dpe as PropertyDpe) })}
              className={`h-7 w-7 rounded text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                filters.dpe === dpe ? 'bg-brand-600 text-white' : 'bg-navy-100 text-navy-600'
              }`}
            >
              {dpe}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-navy-800">Statut</legend>
        <div className="space-y-1">
          <label className="flex items-center gap-2 text-sm text-navy-600">
            <input
              type="radio"
              name="property-status"
              checked={!filters.status}
              onChange={() => update({ status: undefined })}
              className="h-4 w-4 text-brand-600 focus-visible:ring-2 focus-visible:ring-brand-500"
            />
            Tous
          </label>
          {PROPERTY_STATUSES.map((status) => (
            <label key={status} className="flex items-center gap-2 text-sm text-navy-600">
              <input
                type="radio"
                name="property-status"
                checked={filters.status === status}
                onChange={() => update({ status })}
                className="h-4 w-4 text-brand-600 focus-visible:ring-2 focus-visible:ring-brand-500"
              />
              {PROPERTY_STATUS_LABELS[status]}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
