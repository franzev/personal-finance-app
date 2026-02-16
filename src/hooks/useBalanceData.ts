import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { Balance } from '@/lib/types';
import localData from '@/data/data.json';
import { isSupabaseConfigured } from '@/lib/env';
import { logger } from '@/lib/logger';
import { queryKeys } from './queryKeys';
import { getUser } from './supabaseQuery';

export function useBalance() {
  return useQuery({
    queryKey: queryKeys.balance,
    queryFn: async (): Promise<Balance> => {
      if (!isSupabaseConfigured()) {
        return localData.balance as Balance;
      }

      const supabase = createClient();

      const [{ data: { user } }, { data, error }] = await Promise.all([
        getUser(supabase),
        supabase.from('balance').select('current, income, expenses').maybeSingle(),
      ]);

      if (!user) {
        return localData.balance as Balance;
      }

      if (error) {
        logger.error('Balance fetch error:', error.message);
        return { current: 0, income: 0, expenses: 0 };
      }

      return data as Balance;
    },
  });
}

export function useUpdateBalance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (balance: Partial<Balance>) => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('balance')
        .update(balance)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.balance });
    },
  });
}
