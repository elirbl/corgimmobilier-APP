import api from './api';
import type { ApiResponse, ConversationSummary } from '../types';

export const messageService = {
  getConversations: async (): Promise<ConversationSummary[]> => {
    const { data } = await api.get<ApiResponse<ConversationSummary[]>>('/api/messages/conversations');
    return data.data ?? [];
  },
};
