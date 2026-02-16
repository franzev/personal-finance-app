import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { Pot } from '@/lib/types';
import localData from '@/data/data.json';
import { isSupabaseConfigured } from '@/lib/env';
import { logger } from '@/lib/logger';
import { queryKeys } from './queryKeys';
import { getUser } from './supabaseQuery';

export type PotInput = Omit<Pot, 'id'>;

export function usePots() {
  return useQuery({
    queryKey: queryKeys.pots,
    queryFn: async (): Promise<Pot[]> => {
      if (!isSupabaseConfigured()) {
        return localData.pots as Pot[];
      }

      const supabase = createClient();

      const [{ data: { user } }, { data, error }] = await Promise.all([
        getUser(supabase),
        supabase.from('pots').select('id, name, target, total, theme'),
      ]);

      if (!user) {
        return localData.pots as Pot[];
      }

      if (error) {
        logger.error('Pots fetch error:', error.message);
        return [];
      }

      return (data as Pot[]) || [];
    },
  });
}

export function useCreatePot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (pot: PotInput) => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('pots')
        .insert({
          user_id: user.id,
          ...pot,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pots });
    },
  });
}

export function useUpdatePot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...pot }: Partial<Pot> & { id: string }) => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('pots')
        .update(pot)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pots });
    },
  });
}

export function useDeletePot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const supabase = createClient();
      const { error } = await supabase.from('pots').delete().eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pots });
    },
  });
}

export function useAddMoneyToPot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, amount }: { id: string; amount: number }) => {
      const supabase = createClient();

      // Atomic increment via Postgres RPC to avoid read-then-update race condition.
      // Falls back to client-side update if the RPC doesn't exist.
      try {
        const { data, error } = await supabase.rpc('increment_pot_total', {
          pot_id: id,
          amount,
        });
        if (error) throw error;
        return data;
      } catch {
        // Fallback: client-side read-then-update (non-atomic)
        const { data: pot, error: fetchError } = await supabase
          .from('pots')
          .select('total')
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;

        const newTotal = (pot?.total || 0) + amount;

        const { data, error } = await supabase
          .from('pots')
          .update({ total: newTotal })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pots });
      queryClient.invalidateQueries({ queryKey: queryKeys.balance });
    },
  });
}

export function useWithdrawFromPot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, amount }: { id: string; amount: number }) => {
      const supabase = createClient();

      // Atomic decrement via Postgres RPC to avoid read-then-update race condition.
      // Falls back to client-side update if the RPC doesn't exist.
      try {
        const { data, error } = await supabase.rpc('decrement_pot_total', {
          pot_id: id,
          amount,
        });
        if (error) throw error;
        return data;
      } catch {
        // Fallback: client-side read-then-update (non-atomic)
        const { data: pot, error: fetchError } = await supabase
          .from('pots')
          .select('total')
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;

        const newTotal = Math.max(0, (pot?.total || 0) - amount);

        const { data, error } = await supabase
          .from('pots')
          .update({ total: newTotal })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pots });
      queryClient.invalidateQueries({ queryKey: queryKeys.balance });
    },
  });
}
