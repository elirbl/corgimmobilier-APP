import { useEffect, useState, useCallback } from 'react'
import PropertyCard from '../components/PropertyCard'
import PropertyFilters from '../components/PropertyFilters'
import { propertiesApi } from '../services/api'
import type { Property, PropertyFilters as Filters } from '../types'

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [filters, setFilters] = useState<Filters>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')

  const load = useCallback(async (f: Filters) => {
    setLoading(true)
    setError(false)
    try {
      const data = await propertiesApi.getAll(f)
      setProperties(data)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load({})
    propertiesApi.getCities().then(setCities).catch(() => {})
  }, [load])

  const handleFilters = (f: Filters) => {
    setFilters(f)
    load(f)
  }

  const handleReset = () => {
    setFilters({})
    setSearch('')
    load({})
  }

  const displayed = search.trim()
    ? properties.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.city.toLowerCase().includes(search.toLowerCase())
      )
    : properties

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Trouvez votre prochain bien
          </h1>
          <p className="text-blue-200 mb-8 text-lg">
            {properties.length > 0
              ? `${properties.length} biens disponibles dans toute la France`
              : 'Biens immobiliers résidentiels et professionnels'}
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher un titre, une ville…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-slate-800 placeholder-slate-400 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <PropertyFilters
            filters={filters}
            cities={cities}
            onChange={handleFilters}
            onReset={handleReset}
            total={displayed.length}
          />

          {/* Grid */}
          <div className="flex-1">
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
                    <div className="h-48 bg-slate-200" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-slate-200 rounded w-3/4" />
                      <div className="h-3 bg-slate-100 rounded w-1/2" />
                      <div className="h-6 bg-slate-200 rounded w-1/3 mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="text-center py-20">
                <p className="text-slate-400 text-lg mb-2">Impossible de charger les biens.</p>
                <p className="text-slate-300 text-sm">Vérifiez que l'API est démarrée sur le port 5000.</p>
              </div>
            )}

            {!loading && !error && displayed.length === 0 && (
              <div className="text-center py-20">
                <span className="text-5xl block mb-4">🏚️</span>
                <p className="text-slate-500 text-lg">Aucun bien ne correspond à ces critères.</p>
                <button
                  onClick={handleReset}
                  className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}

            {!loading && !error && displayed.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {displayed.map(p => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
