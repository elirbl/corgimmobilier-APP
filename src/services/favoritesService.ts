import api from './api';
import type { ApiResponse, Favorite } from '../types';

export const favoritesService = {
  getAll: async (): Promise<Favorite[]> => {
    const { data } = await api.get<ApiResponse<Favorite[]>>('/api/favorites');
    return data.data ?? [];
  },

  add: async (propertyId: number): Promise<Favorite> => {
    const { data } = await api.post<ApiResponse<Favorite>>(`/api/favorites/${propertyId}`);
    return data.data!;
  },

  remove: async (propertyId: number): Promise<void> => {
    await api.delete(`/api/favorites/${propertyId}`);
  },
};
