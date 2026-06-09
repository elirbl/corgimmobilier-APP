import axios from 'axios'
import type { Property, Agency, PropertyFilters } from '../types'

const http = axios.create({ baseURL: '/api' })

export const propertiesApi = {
  getAll: (filters: PropertyFilters = {}) =>
    http.get<Property[]>('/properties', { params: filters }).then(r => r.data),

  getById: (id: number) =>
    http.get<Property>(`/properties/${id}`).then(r => r.data),

  getCities: () =>
    http.get<string[]>('/properties/cities').then(r => r.data),
}

export const agenciesApi = {
  getAll: () => http.get<Agency[]>('/agencies').then(r => r.data),
}
