import { useMutation, useQuery } from '@tanstack/react-query';
import { propertyService } from '../services/propertyService';
import { visitService, type VisitCreatePayload } from '../services/visitService';
import { transactionService, type TransactionCreatePayload } from '../services/transactionService';
import type { PropertyFilters } from '../types';

export function useProperties(filters: PropertyFilters) {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: () => propertyService.getAll(filters),
    placeholderData: (previous) => previous,
  });
}

export function useProperty(id: number | undefined) {
  return useQuery({
    queryKey: ['properties', id],
    queryFn: () => propertyService.getById(id!),
    enabled: id !== undefined,
  });
}

export function usePropertyCities() {
  return useQuery({
    queryKey: ['properties', 'cities'],
    queryFn: () => propertyService.getCities(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useRequestVisit() {
  return useMutation({
    mutationFn: (payload: VisitCreatePayload) => visitService.create(payload),
  });
}

export function useMakeOffer() {
  return useMutation({
    mutationFn: (payload: TransactionCreatePayload) => transactionService.create(payload),
  });
}
