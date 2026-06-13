import { useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Modal } from '../components/Modal';
import { BienGallery } from '../components/properties/BienGallery';
import { BienMap } from '../components/properties/BienMap';
import { DpeBadge } from '../components/properties/DpeBadge';
import { StatusBadge } from '../components/properties/StatusBadge';
import { useMakeOffer, useProperty, useRequestVisit } from '../hooks/useProperties';
import { useAuthStore } from '../stores/authStore';
import { PROPERTY_TYPE_LABELS } from '../types';

const priceFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export default function BienDetailPage() {
  const { id } = useParams<{ id: string }>();
  const propertyId = Number(id);
  const { data: property, isLoading, isError } = useProperty(propertyId);
  const { isAuthenticated, user } = useAuthStore();

  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [offerModalOpen, setOfferModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-80 w-full rounded-lg bg-navy-100" />
        <div className="h-6 w-1/2 rounded bg-navy-100" />
        <div className="h-4 w-1/3 rounded bg-navy-100" />
      </div>
    );
  }

  if (isError || !property) {
    return (
      <p role="alert" className="rounded-md bg-red-50 p-4 text-sm text-red-700">
        Ce bien est introuvable ou a été retiré du catalogue.
      </p>
    );
  }

  const isClient = isAuthenticated && user?.role === 'Client';
  const mapItem = {
    id: property.id,
    title: property.title,
    type: property.type,
    status: property.status,
    price: property.price,
    city: property.city,
    bedrooms: property.bedrooms,
    area: property.area,
    dpeRating: property.dpeRating,
    imageUrl: property.imageUrl,
    listedDate: property.listedDate,
    agencyId: property.agencyId,
    agencyName: property.agencyName,
  };

  return (
    <div>
      <Link to="/properties" className="mb-4 inline-block text-sm font-medium text-brand-600 hover:text-brand-700">
        ← Retour au catalogue
      </Link>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BienGallery photos={property.photos} title={property.title} fallbackImageUrl={property.imageUrl} />

          <div className="mt-6">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h1 className="text-2xl font-semibold text-navy-900">{property.title}</h1>
                <p className="mt-1 text-navy-400">
                  {PROPERTY_TYPE_LABELS[property.type]} · {property.city}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={property.status} />
                <DpeBadge rating={property.dpeRating} />
              </div>
            </div>

            <p className="mt-4 text-2xl font-bold text-navy-900">{priceFormatter.format(property.price)}</p>

            <dl className="mt-4 grid grid-cols-2 gap-4 rounded-lg border border-navy-100 bg-white p-4 sm:grid-cols-3">
              <div>
                <dt className="text-xs text-navy-400">Surface</dt>
                <dd className="text-sm font-semibold text-navy-900">{property.area} m²</dd>
              </div>
              <div>
                <dt className="text-xs text-navy-400">Pièces</dt>
                <dd className="text-sm font-semibold text-navy-900">{property.bedrooms}</dd>
              </div>
              <div>
                <dt className="text-xs text-navy-400">Mis en ligne le</dt>
                <dd className="text-sm font-semibold text-navy-900">
                  {new Date(property.listedDate).toLocaleDateString('fr-FR')}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-navy-900">Description</h2>
              <p className="mt-2 whitespace-pre-line text-sm text-navy-600">{property.description}</p>
            </div>

            <div className="mt-6">
              <h2 className="mb-2 text-lg font-semibold text-navy-900">Localisation</h2>
              <BienMap properties={[mapItem]} height="320px" zoom={12} />
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-lg border border-navy-100 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-navy-900">Agence</h2>
            <p className="mt-1 text-sm text-navy-600">{property.agencyName}</p>

            {property.agent && (
              <div className="mt-4 border-t border-navy-100 pt-4">
                <h3 className="text-sm font-semibold text-navy-900">Votre agent</h3>
                <p className="mt-1 text-sm text-navy-600">
                  {property.agent.firstName} {property.agent.lastName}
                </p>
                <p className="text-sm text-navy-400">
                  <a href={`mailto:${property.agent.email}`} className="hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">
                    {property.agent.email}
                  </a>
                </p>
                <p className="text-sm text-navy-400">
                  <a href={`tel:${property.agent.phone}`} className="hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">
                    {property.agent.phone}
                  </a>
                </p>
              </div>
            )}
          </div>

          <div className="rounded-lg border border-navy-100 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-navy-900">Intéressé par ce bien ?</h2>

            {!isAuthenticated && (
              <p className="mt-2 text-sm text-navy-400">
                <Link to="/login" className="font-medium text-brand-600 hover:text-brand-700">
                  Connectez-vous
                </Link>{' '}
                pour demander une visite ou faire une offre.
              </p>
            )}

            {isAuthenticated && !isClient && (
              <p className="mt-2 text-sm text-navy-400">
                Cette action est réservée aux comptes clients.
              </p>
            )}

            {isClient && (
              <div className="mt-3 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setVisitModalOpen(true)}
                  className="w-full rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                >
                  Demander une visite
                </button>
                <button
                  type="button"
                  onClick={() => setOfferModalOpen(true)}
                  className="w-full rounded-md border border-brand-600 px-4 py-2 text-sm font-semibold text-brand-600 shadow-sm transition-colors hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                >
                  Faire une offre
                </button>
              </div>
            )}
          </div>
        </aside>
      </div>

      {visitModalOpen && (
        <RequestVisitModal propertyId={property.id} onClose={() => setVisitModalOpen(false)} />
      )}

      {offerModalOpen && (
        <MakeOfferModal propertyId={property.id} onClose={() => setOfferModalOpen(false)} />
      )}
    </div>
  );
}

function RequestVisitModal({ propertyId, onClose }: { propertyId: number; onClose: () => void }) {
  const [scheduledAt, setScheduledAt] = useState('');
  const [notes, setNotes] = useState('');
  const requestVisit = useRequestVisit();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    requestVisit.mutate(
      { propertyId, scheduledAt: new Date(scheduledAt).toISOString(), notes: notes || undefined },
      { onSuccess: onClose },
    );
  }

  return (
    <Modal title="Demander une visite" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="visit-date" className="mb-1 block text-sm font-medium text-navy-800">
            Date et heure souhaitées
            <span aria-hidden="true" className="text-brand-600"> *</span>
          </label>
          <input
            id="visit-date"
            type="datetime-local"
            required
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            className="w-full rounded-md border border-navy-200 px-3 py-2 text-sm text-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          />
        </div>

        <div>
          <label htmlFor="visit-notes" className="mb-1 block text-sm font-medium text-navy-800">
            Message (optionnel)
          </label>
          <textarea
            id="visit-notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-md border border-navy-200 px-3 py-2 text-sm text-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          />
        </div>

        {requestVisit.isError && (
          <p role="alert" className="text-sm text-red-600">
            Impossible d'envoyer la demande. Veuillez réessayer.
          </p>
        )}

        <button
          type="submit"
          disabled={requestVisit.isPending}
          className="w-full rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-60"
        >
          {requestVisit.isPending ? 'Envoi...' : 'Confirmer la demande'}
        </button>
      </form>
    </Modal>
  );
}

function MakeOfferModal({ propertyId, onClose }: { propertyId: number; onClose: () => void }) {
  const [notes, setNotes] = useState('');
  const makeOffer = useMakeOffer();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    makeOffer.mutate({ propertyId, notes: notes || undefined });
  }

  if (makeOffer.isSuccess) {
    return (
      <Modal title="Offre envoyée" onClose={onClose}>
        <p role="status" className="text-sm text-navy-600">
          Votre offre a été transmise à l'agence. Un agent vous contactera prochainement pour la suite du
          processus.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          Fermer
        </button>
      </Modal>
    );
  }

  return (
    <Modal title="Faire une offre" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-sm text-navy-600">
          Votre demande sera transmise à l'agence. Un agent vous contactera pour finaliser votre offre.
        </p>

        <div>
          <label htmlFor="offer-notes" className="mb-1 block text-sm font-medium text-navy-800">
            Message (optionnel)
          </label>
          <textarea
            id="offer-notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-md border border-navy-200 px-3 py-2 text-sm text-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          />
        </div>

        {makeOffer.isError && (
          <p role="alert" className="text-sm text-red-600">
            Impossible d'envoyer votre offre. Veuillez réessayer.
          </p>
        )}

        <button
          type="submit"
          disabled={makeOffer.isPending}
          className="w-full rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-60"
        >
          {makeOffer.isPending ? 'Envoi...' : "Envoyer l'offre"}
        </button>
      </form>
    </Modal>
  );
}
