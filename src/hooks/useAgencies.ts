import { useQuery } from '@tanstack/react-query';
import { agencyService } from '../services/agencyService';

export function useAgencies() {
  return useQuery({
    queryKey: ['agencies'],
    queryFn: () => agencyService.getAll(),
  });
}

export function useAgency(id: number | undefined) {
  return useQuery({
    queryKey: ['agencies', id],
    queryFn: () => agencyService.getById(id!),
    enabled: id !== undefined,
  });
}
