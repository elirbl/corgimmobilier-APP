import api from './api';
import type { ApiResponse, VisitItem } from '../types';

export interface VisitCreatePayload {
  propertyId: number;
  agentId?: number;
  scheduledAt: string;
  notes?: string;
}

export interface VisitResponse {
  id: number;
  propertyId: number;
  clientId: number;
  agentId: number | null;
  scheduledAt: string;
  status: string;
  notes: string | null;
}

export const visitService = {
  create: async (payload: VisitCreatePayload): Promise<VisitResponse> => {
    const { data } = await api.post<ApiResponse<VisitResponse>>('/api/visits', payload);
    return data.data!;
  },

  getAgentCalendar: async (agentId: number, date?: string): Promise<VisitItem[]> => {
    const { data } = await api.get<ApiResponse<VisitItem[]>>(`/api/visits/agent/${agentId}`, {
      params: date ? { date } : undefined,
    });
    return data.data ?? [];
  },
};
