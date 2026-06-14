import { useQuery } from '@tanstack/react-query';
import { messageService } from '../services/messageService';

export function useConversations() {
  return useQuery({
    queryKey: ['messages', 'conversations'],
    queryFn: () => messageService.getConversations(),
  });
}
