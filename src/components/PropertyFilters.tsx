import type { PropertyFilters } from '../types'

interface Props {
  filters: PropertyFilters
  cities: string[]
  onChange: (f: PropertyFilters) => void
  onReset: () => void
  total: number
}

export default function PropertyFilters({ filters, cities, onChange, onReset, total }: Props) {
  const set = (key: keyof PropertyFilters, value: string) => {
    onChange({ ...filters, [key]: value || undefined })
  }

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:sticky lg:top-20">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-slate-900">Filtres</h2>
          <button
            onClick={onReset}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Réinitialiser
          </button>
        </div>

        <div className="space-y-4">
          {/* City */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Ville
            </label>
            <select
              value={filters.city ?? ''}
              onChange={e => set('city', e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Toutes les villes</option>
              {cities.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Type de bien
            </label>
            <select
              value={filters.type ?? ''}
              onChange={e => set('type', e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tous les types</option>
              <option value="Residential">Résidentiel</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Terrain</option>
              <option value="MixedUse">Mixte</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Statut
            </label>
            <div className="flex gap-2 flex-wrap">
              {[
                { val: '', label: 'Tous' },
                { val: 'Available', label: 'Disponible' },
                { val: 'UnderOffer', label: 'Sous offre' },
                { val: 'Sold', label: 'Vendu' },
              ].map(({ val, label }) => (
                <button
                  key={val}
                  onClick={() => set('status', val)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    (filters.status ?? '') === val
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Budget (€)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice ?? ''}
                onChange={e => onChange({ ...filters, minPrice: e.target.value ? +e.target.value : undefined })}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice ?? ''}
                onChange={e => onChange({ ...filters, maxPrice: e.target.value ? +e.target.value : undefined })}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Chambres min.
            </label>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map(n => (
                <button
                  key={n}
                  onClick={() => onChange({ ...filters, minBedrooms: n === 0 ? undefined : n })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    (filters.minBedrooms ?? 0) === n
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
                  }`}
                >
                  {n === 0 ? 'Tous' : `${n}+`}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 text-center">
          <span className="text-sm text-slate-500">
            <span className="font-semibold text-slate-900">{total}</span> bien{total > 1 ? 's' : ''} trouvé{total > 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </aside>
  )
}
