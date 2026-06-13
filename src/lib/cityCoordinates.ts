export interface LatLng {
  lat: number;
  lng: number;
}

const CITY_COORDINATES: Record<string, LatLng> = {
  paris: { lat: 48.8566, lng: 2.3522 },
  marseille: { lat: 43.2965, lng: 5.3698 },
  lyon: { lat: 45.764, lng: 4.8357 },
  toulouse: { lat: 43.6047, lng: 1.4442 },
  nice: { lat: 43.7102, lng: 7.262 },
  nantes: { lat: 47.2184, lng: -1.5536 },
  strasbourg: { lat: 48.5734, lng: 7.7521 },
  montpellier: { lat: 43.6108, lng: 3.8767 },
  bordeaux: { lat: 44.8378, lng: -0.5792 },
  lille: { lat: 50.6292, lng: 3.0573 },
  rennes: { lat: 48.1173, lng: -1.6778 },
  reims: { lat: 49.2583, lng: 4.0317 },
  toulon: { lat: 43.1242, lng: 5.928 },
  grenoble: { lat: 45.1885, lng: 5.7245 },
  dijon: { lat: 47.322, lng: 5.0415 },
  angers: { lat: 47.4784, lng: -0.5632 },
  nimes: { lat: 43.8367, lng: 4.3601 },
  'saint-etienne': { lat: 45.4397, lng: 4.3872 },
  'le havre': { lat: 49.4944, lng: 0.1079 },
  tours: { lat: 47.3941, lng: 0.6848 },
};

const FRANCE_CENTER: LatLng = { lat: 46.6034, lng: 1.8883 };

/**
 * Frontend-only approximation: backend Property has no latitude/longitude,
 * so markers are placed using a static city -> coordinates table with a
 * small deterministic jitter to avoid stacking pins from the same city.
 */
export function getCityCoordinates(city: string, seed = 0): LatLng {
  const key = city.trim().toLowerCase();
  const base = CITY_COORDINATES[key] ?? FRANCE_CENTER;

  const jitter = ((seed % 7) - 3) * 0.01;
  return { lat: base.lat + jitter, lng: base.lng + jitter * 1.3 };
}
