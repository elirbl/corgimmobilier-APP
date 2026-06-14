import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboardService';
import { agencyService } from '../services/agencyService';

export function useGlobalDashboard() {
  return useQuery({
    queryKey: ['dashboard', 'global'],
    queryFn: () => dashboardService.getGlobal(),
  });
}

export function useAgencyDashboard(agencyId: number | undefined) {
  return useQuery({
    queryKey: ['dashboard', 'agency', agencyId],
    queryFn: () => dashboardService.getAgency(agencyId!),
    enabled: agencyId !== undefined,
  });
}

export function useAgencies() {
  return useQuery({
    queryKey: ['agencies'],
    queryFn: () => agencyService.getAll(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useAgencyDetail(agencyId: number | undefined) {
  return useQuery({
    queryKey: ['agencies', agencyId],
    queryFn: () => agencyService.getById(agencyId!),
    enabled: agencyId !== undefined,
  });
}
