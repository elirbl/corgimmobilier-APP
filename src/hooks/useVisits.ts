import { useQuery } from '@tanstack/react-query';
import { visitService } from '../services/visitService';

export function useAgentCalendar(agentId: number | undefined, date?: string) {
  return useQuery({
    queryKey: ['visits', 'agent', agentId, date],
    queryFn: () => visitService.getAgentCalendar(agentId!, date),
    enabled: agentId !== undefined,
  });
}
