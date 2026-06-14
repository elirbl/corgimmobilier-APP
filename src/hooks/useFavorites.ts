import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { favoritesService } from '../services/favoritesService';

export function useFavorites() {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => favoritesService.getAll(),
  });
}

export function useAddFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (propertyId: number) => favoritesService.add(propertyId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (propertyId: number) => favoritesService.remove(propertyId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  });
}
