import api from './api';
import type { ApiResponse, ConversationSummary, Message, PagedResult } from '../types';

export const messageService = {
  getConversations: async (): Promise<ConversationSummary[]> => {
    const { data } = await api.get<ApiResponse<ConversationSummary[]>>('/api/messages/conversations');
    return data.data ?? [];
  },

  getConversation: async (
    conversationId: number,
    page = 1,
    pageSize = 20,
  ): Promise<PagedResult<Message>> => {
    const { data } = await api.get<ApiResponse<PagedResult<Message>>>(`/api/messages/${conversationId}`, {
      params: { page, pageSize },
    });
    return data.data!;
  },

  sendMessage: async (recipientId: number, content: string): Promise<Message> => {
    const { data } = await api.post<ApiResponse<Message>>('/api/messages', { recipientId, content });
    return data.data!;
  },
};
