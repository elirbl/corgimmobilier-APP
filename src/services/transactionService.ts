import api from './api';
import type { ApiResponse, AgentSummary } from '../types';

export interface TransactionCreatePayload {
  propertyId: number;
  notes?: string;
}

export interface TransactionDetail {
  id: number;
  propertyId: number;
  propertyTitle: string;
  client: AgentSummary;
  agent: AgentSummary | null;
  currentStage: string;
  createdAt: string;
  updatedAt: string | null;
}

export const transactionService = {
  create: async (payload: TransactionCreatePayload): Promise<TransactionDetail> => {
    const { data } = await api.post<ApiResponse<TransactionDetail>>('/api/transactions', payload);
    return data.data!;
  },
};
