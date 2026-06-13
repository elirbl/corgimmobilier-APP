import { Link } from 'react-router-dom';
import { resolveAssetUrl } from '../../lib/assetUrl';
import { PROPERTY_TYPE_LABELS, type PropertyListItem } from '../../types';
import { DpeBadge } from './DpeBadge';
import { LazyImage } from './LazyImage';
import { StatusBadge } from './StatusBadge';

const priceFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

interface BienCardProps {
  property: PropertyListItem;
  variant?: 'grid' | 'list';
}

export function BienCard({ property, variant = 'grid' }: BienCardProps) {
  const imageUrl = resolveAssetUrl(property.imageUrl);

  if (variant === 'list') {
    return (
      <Link
        to={`/properties/${property.id}`}
        className="flex gap-4 rounded-lg border border-navy-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1"
      >
        <LazyImage
          src={imageUrl}
          alt={property.title}
          className="h-28 w-40 flex-shrink-0 rounded-md"
        />

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-navy-900 sm:text-base">{property.title}</h3>
              <DpeBadge rating={property.dpeRating} />
            </div>
            <p className="mt-1 text-sm text-navy-400">
              {PROPERTY_TYPE_LABELS[property.type]} · {property.city}
            </p>
            <p className="mt-1 text-sm text-navy-400">
              {property.area} m² · {property.bedrooms} pièce{property.bedrooms > 1 ? 's' : ''}
            </p>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-base font-bold text-navy-900 sm:text-lg">
              {priceFormatter.format(property.price)}
            </span>
            <StatusBadge status={property.status} />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/properties/${property.id}`}
      className="flex flex-col overflow-hidden rounded-lg border border-navy-100 bg-white shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1"
    >
      <div className="relative">
        <LazyImage src={imageUrl} alt={property.title} className="h-44 w-full" />
        <div className="absolute left-2 top-2">
          <StatusBadge status={property.status} />
        </div>
        {property.dpeRating && (
          <div className="absolute right-2 top-2">
            <DpeBadge rating={property.dpeRating} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-semibold text-navy-900 sm:text-base">{property.title}</h3>
        <p className="mt-1 text-sm text-navy-400">
          {PROPERTY_TYPE_LABELS[property.type]} · {property.city}
        </p>
        <p className="mt-1 text-sm text-navy-400">
          {property.area} m² · {property.bedrooms} pièce{property.bedrooms > 1 ? 's' : ''}
        </p>
        <span className="mt-3 text-base font-bold text-navy-900 sm:text-lg">
          {priceFormatter.format(property.price)}
        </span>
      </div>
    </Link>
  );
}
