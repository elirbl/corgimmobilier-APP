import api from './api';
import type { ApiResponse, AgencyDashboard, GlobalDashboard } from '../types';

export const dashboardService = {
  getGlobal: async (): Promise<GlobalDashboard> => {
    const { data } = await api.get<ApiResponse<GlobalDashboard>>('/api/dashboard/global');
    return data.data!;
  },

  getAgency: async (agencyId: number): Promise<AgencyDashboard> => {
    const { data } = await api.get<ApiResponse<AgencyDashboard>>(`/api/dashboard/agence/${agencyId}`);
    return data.data!;
  },
};
