export type PropertyType = 'Residential' | 'Commercial' | 'Land' | 'MixedUse';

export type PropertyStatus = 'Available' | 'UnderOffer' | 'Sold';

export type PropertyDpe = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export interface PhotoDto {
  id: number;
  url: string;
  isMain: boolean;
}

export interface AgentSummary {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface PropertyListItem {
  id: number;
  title: string;
  type: PropertyType;
  status: PropertyStatus | null;
  price: number;
  city: string;
  bedrooms: number;
  area: number;
  dpeRating: PropertyDpe | null;
  imageUrl: string | null;
  listedDate: string;
  agencyId: number;
  agencyName: string;
  agentId?: number | null;
}

export interface Favorite {
  id: number;
  createdAt: string;
  property: PropertyListItem;
}

export interface PropertyDetail {
  id: number;
  title: string;
  description: string;
  price: number;
  type: PropertyType;
  status: PropertyStatus;
  city: string;
  bedrooms: number;
  area: number;
  imageUrl: string | null;
  dpeRating: PropertyDpe | null;
  listedDate: string;
  createdAt: string;
  updatedAt: string | null;
  agencyId: number;
  agencyName: string;
  agent: AgentSummary | null;
  photos: PhotoDto[];
}

export interface PropertyFilters {
  type?: PropertyType;
  status?: PropertyStatus;
  prixMin?: number;
  prixMax?: number;
  surface?: number;
  ville?: string;
  dpe?: PropertyDpe;
  agentId?: number;
  page?: number;
  pageSize?: number;
  sort?: string;
}

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  Residential: 'Résidentiel',
  Commercial: 'Commercial',
  Land: 'Terrain',
  MixedUse: 'Mixte',
};

export const PROPERTY_STATUS_LABELS: Record<PropertyStatus, string> = {
  Available: 'Disponible',
  UnderOffer: 'Sous offre',
  Sold: 'Vendu',
};

export const PROPERTY_DPE_VALUES: PropertyDpe[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
