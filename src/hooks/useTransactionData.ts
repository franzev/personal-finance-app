import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { Transaction } from '@/lib/types';
import localData from '@/data/data.json';
import { isSupabaseConfigured } from '@/lib/env';
import { logger } from '@/lib/logger';
import { queryKeys } from './queryKeys';
import { getUser } from './supabaseQuery';

export type TransactionInput = Omit<Transaction, 'id'>;

export function useTransactions() {
  return useQuery({
    queryKey: queryKeys.transactions,
    queryFn: async (): Promise<Transaction[]> => {
      if (!isSupabaseConfigured()) {
        return localData.transactions as Transaction[];
      }

      const supabase = createClient();

      const [{ data: { user } }, { data, error }] = await Promise.all([
        getUser(supabase),
        supabase
          .from('transactions')
          .select('id, avatar, name, category, date, amount, recurring')
          .order('date', { ascending: false }),
      ]);

      if (!user) {
        return localData.transactions as Transaction[];
      }

      if (error) {
        logger.error('Transactions fetch error:', error.message);
        return [];
      }

      return (data as Transaction[]) || [];
    },
  });
}

export function useRecurringBills() {
  return useQuery({
    queryKey: queryKeys.recurringBills,
    queryFn: async (): Promise<Transaction[]> => {
      if (!isSupabaseConfigured()) {
        return (localData.transactions as Transaction[]).filter((t) => t.recurring);
      }

      const supabase = createClient();

      const [{ data: { user } }, { data, error }] = await Promise.all([
        getUser(supabase),
        supabase
          .from('transactions')
          .select('id, avatar, name, category, date, amount, recurring')
          .eq('recurring', true)
          .order('date', { ascending: false }),
      ]);

      if (!user) {
        return (localData.transactions as Transaction[]).filter((t) => t.recurring);
      }

      if (error) {
        logger.error('Recurring bills fetch error:', error.message);
        return [];
      }

      return (data as Transaction[]) || [];
    },
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transaction: TransactionInput) => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          ...transaction,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions });
      queryClient.invalidateQueries({ queryKey: queryKeys.recurringBills });
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...transaction }: Partial<Transaction> & { id: string }) => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('transactions')
        .update(transaction)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions });
      queryClient.invalidateQueries({ queryKey: queryKeys.recurringBills });
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const supabase = createClient();
      const { error } = await supabase.from('transactions').delete().eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transactions });
      queryClient.invalidateQueries({ queryKey: queryKeys.recurringBills });
    },
  });
}
