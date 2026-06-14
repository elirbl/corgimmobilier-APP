import { useQuery, useQueryClient } from '@tanstack/react-query';
import { messageService } from '../services/messageService';

export function useConversations() {
  return useQuery({
    queryKey: ['messages', 'conversations'],
    queryFn: () => messageService.getConversations(),
  });
}

export function useConversation(conversationId: number | undefined, page = 1, pageSize = 20) {
  return useQuery({
    queryKey: ['messages', 'conversation', conversationId, page, pageSize],
    queryFn: () => messageService.getConversation(conversationId!, page, pageSize),
    enabled: conversationId !== undefined,
  });
}

export function useInvalidateConversations() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ['messages', 'conversations'] });
}
