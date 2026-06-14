import api from './api';
import type { ApiResponse, AgencyDetail, AgencySummary, PagedResult } from '../types';

export const agencyService = {
  getAll: async (): Promise<AgencySummary[]> => {
    const { data } = await api.get<ApiResponse<PagedResult<AgencySummary>>>('/api/agencies', {
      params: { pageSize: 100 },
    });
    return data.data?.items ?? [];
  },

  getById: async (id: number): Promise<AgencyDetail> => {
    const { data } = await api.get<ApiResponse<AgencyDetail>>(`/api/agencies/${id}`);
    return data.data!;
  },
};
