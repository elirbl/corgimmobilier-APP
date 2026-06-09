import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { propertiesApi } from '../services/api'
import type { Property } from '../types'

const TYPE_LABELS: Record<string, string> = {
  Residential: 'Résidentiel',
  Commercial: 'Commercial',
  Land: 'Terrain',
  MixedUse: 'Mixte',
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  Available: { label: 'Disponible', className: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  UnderOffer: { label: 'Sous offre', className: 'bg-amber-100 text-amber-800 border-amber-200' },
  Sold: { label: 'Vendu', className: 'bg-red-100 text-red-800 border-red-200' },
}

const TYPE_GRADIENT: Record<string, string> = {
  Residential: 'from-blue-400 to-indigo-600',
  Commercial: 'from-slate-500 to-slate-700',
  Land: 'from-emerald-400 to-teal-600',
  MixedUse: 'from-violet-400 to-purple-600',
}

const TYPE_ICON: Record<string, string> = {
  Residential: '🏠',
  Commercial: '🏢',
  Land: '🌿',
  MixedUse: '🏙️',
}

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return
    propertiesApi.getById(+id)
      .then(setProperty)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse">
        <div className="h-72 bg-slate-200 rounded-2xl mb-8" />
        <div className="space-y-3">
          <div className="h-8 bg-slate-200 rounded w-2/3" />
          <div className="h-4 bg-slate-100 rounded w-1/3" />
        </div>
      </div>
    )
  }

  if (notFound || !property) {
    return (
      <div className="text-center py-24">
        <span className="text-6xl block mb-4">🔍</span>
        <p className="text-slate-500 text-xl mb-6">Ce bien est introuvable.</p>
        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
          ← Retour aux annonces
        </Link>
      </div>
    )
  }

  const status = STATUS_CONFIG[property.status]
  const gradient = TYPE_GRADIENT[property.type]
  const icon = TYPE_ICON[property.type]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium mb-6 group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Retour aux annonces
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <div className={`relative h-64 sm:h-80 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
            <span className="text-8xl opacity-70">{icon}</span>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className="bg-white/90 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                {TYPE_LABELS[property.type]}
              </span>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${status.className}`}>
                {status.label}
              </span>
            </div>
          </div>

          {/* Title + price */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug mb-2">
              {property.title}
            </h1>
            <p className="flex items-center gap-1.5 text-slate-500 text-sm mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {property.city}
            </p>
            <p className="text-3xl font-bold text-blue-700">
              {property.price.toLocaleString('fr-FR')} €
            </p>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-4">
            {property.bedrooms > 0 && (
              <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                <p className="text-2xl font-bold text-slate-900">{property.bedrooms}</p>
                <p className="text-xs text-slate-500 mt-1">Chambre{property.bedrooms > 1 ? 's' : ''}</p>
              </div>
            )}
            <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
              <p className="text-2xl font-bold text-slate-900">{property.area}</p>
              <p className="text-xs text-slate-500 mt-1">m²</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
              <p className="text-lg font-bold text-slate-900">
                {new Date(property.listedDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
              </p>
              <p className="text-xs text-slate-500 mt-1">Mis en ligne</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-3">Description</h2>
            <p className="text-slate-600 leading-relaxed">{property.description}</p>
          </div>
        </div>

        {/* Right column — Agency card */}
        <div>
          {property.agency && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-20">
              <h2 className="font-semibold text-slate-900 mb-4">Agence</h2>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm">
                  {property.agency.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{property.agency.name}</p>
                  <p className="text-slate-400 text-xs">{property.agency.city}</p>
                </div>
              </div>

              <div className="space-y-2.5 text-sm text-slate-600 mb-6">
                <p className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {property.agency.address}
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {property.agency.phone}
                </p>
              </div>

              <a
                href={`mailto:${property.agency.email}`}
                className="block w-full bg-blue-700 hover:bg-blue-800 text-white text-center text-sm font-semibold py-3 rounded-xl transition-colors"
              >
                Contacter l'agence
              </a>

              <a
                href={`tel:${property.agency.phone}`}
                className="block w-full mt-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-center text-sm font-semibold py-3 rounded-xl transition-colors"
              >
                Appeler
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
