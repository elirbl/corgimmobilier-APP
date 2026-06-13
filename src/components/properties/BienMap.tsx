import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { getCityCoordinates } from '../../lib/cityCoordinates';
import { PROPERTY_TYPE_LABELS, type PropertyListItem } from '../../types';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const priceFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

const FRANCE_CENTER: [number, number] = [46.6034, 1.8883];

interface BienMapProps {
  properties: PropertyListItem[];
  height?: string;
  zoom?: number;
}

export function BienMap({ properties, height = '500px', zoom = 6 }: BienMapProps) {
  const first = properties[0];
  const center: [number, number] = first
    ? (() => {
        const { lat, lng } = getCityCoordinates(first.city, first.id);
        return [lat, lng];
      })()
    : FRANCE_CENTER;

  return (
    <div style={{ height }} className="overflow-hidden rounded-lg border border-navy-100">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((property) => {
          const { lat, lng } = getCityCoordinates(property.city, property.id);
          return (
            <Marker key={property.id} position={[lat, lng]}>
              <Popup>
                <div className="min-w-[160px]">
                  <p className="font-semibold text-navy-900">{property.title}</p>
                  <p className="text-xs text-navy-400">
                    {PROPERTY_TYPE_LABELS[property.type]} · {property.city}
                  </p>
                  <p className="mt-1 font-bold text-navy-900">{priceFormatter.format(property.price)}</p>
                  <Link to={`/properties/${property.id}`} className="mt-1 inline-block text-sm font-medium text-brand-600 hover:text-brand-700">
                    Voir le bien
                  </Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
