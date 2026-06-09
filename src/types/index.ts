export type PropertyStatus = 'Available' | 'UnderOffer' | 'Sold'
export type PropertyType = 'Residential' | 'Commercial' | 'Land' | 'MixedUse'

export interface Agency {
  id: number
  name: string
  city: string
  address: string
  phone: string
  email: string
}

export interface Property {
  id: number
  title: string
  description: string
  price: number
  type: PropertyType
  status: PropertyStatus
  agencyId: number
  agency?: Agency
  city: string
  bedrooms: number
  area: number
  imageUrl?: string
  listedDate: string
}

export interface PropertyFilters {
  city?: string
  type?: PropertyType
  status?: PropertyStatus
  minPrice?: number
  maxPrice?: number
  minBedrooms?: number
}
