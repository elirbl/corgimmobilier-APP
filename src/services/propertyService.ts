import api from './api';
import type { ApiResponse, PagedResult, PropertyDetail, PropertyFilters, PropertyListItem } from '../types';

export const propertyService = {
  getAll: async (filters: PropertyFilters): Promise<PagedResult<PropertyListItem>> => {
    const { data } = await api.get<ApiResponse<PagedResult<PropertyListItem>>>('/api/properties', {
      params: filters,
    });
    return data.data!;
  },

  getById: async (id: number): Promise<PropertyDetail> => {
    const { data } = await api.get<ApiResponse<PropertyDetail>>(`/api/properties/${id}`);
    return data.data!;
  },

  getCities: async (): Promise<string[]> => {
    const { data } = await api.get<ApiResponse<string[]>>('/api/properties/cities');
    return data.data ?? [];
  },
};
