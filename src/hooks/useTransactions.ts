import { useQuery } from '@tanstack/react-query';
import { transactionService } from '../services/transactionService';

export function useMyTransactions() {
  return useQuery({
    queryKey: ['transactions', 'mine'],
    queryFn: () => transactionService.getMine(),
  });
}
