import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { Budget } from '@/lib/types';
import localData from '@/data/data.json';
import { isSupabaseConfigured } from '@/lib/env';
import { logger } from '@/lib/logger';
import { queryKeys } from './queryKeys';
import { getUser } from './supabaseQuery';

export type BudgetInput = Omit<Budget, 'id'>;

export function useBudgets() {
  return useQuery({
    queryKey: queryKeys.budgets,
    queryFn: async (): Promise<Budget[]> => {
      if (!isSupabaseConfigured()) {
        return localData.budgets as Budget[];
      }

      const supabase = createClient();

      const [{ data: { user } }, { data, error }] = await Promise.all([
        getUser(supabase),
        supabase.from('budgets').select('id, category, maximum, theme'),
      ]);

      if (!user) {
        return localData.budgets as Budget[];
      }

      if (error) {
        logger.error('Budgets fetch error:', error.message);
        return [];
      }

      return (data as Budget[]) || [];
    },
  });
}

export function useCreateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (budget: BudgetInput) => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('budgets')
        .insert({
          user_id: user.id,
          ...budget,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.budgets });
    },
  });
}

export function useUpdateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...budget }: Partial<Budget> & { id: string }) => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('budgets')
        .update(budget)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.budgets });
    },
  });
}

export function useDeleteBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const supabase = createClient();
      const { error } = await supabase.from('budgets').delete().eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.budgets });
    },
  });
}
