import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { Balance, Transaction, Budget, Pot } from '@/lib/types';
import localData from '@/data/data.json';

export type TransactionInput = Omit<Transaction, 'id'>;
export type BudgetInput = Omit<Budget, 'id'>;
export type PotInput = Omit<Pot, 'id'>;

function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  );
}

export function useBalance() {
  return useQuery({
    queryKey: ['balance'],
    queryFn: async (): Promise<Balance> => {
      if (!isSupabaseConfigured()) {
        return localData.balance as Balance;
      }

      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return localData.balance as Balance;
      }

      const { data, error } = await supabase
        .from('balance')
        .select('current, income, expenses')
        .maybeSingle();

      if (error) {
        console.error('Balance fetch error:', error.message);
        return { current: 0, income: 0, expenses: 0 };
      }

      return data as Balance;
    },
  });
}

export function useTransactions() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async (): Promise<Transaction[]> => {
      if (!isSupabaseConfigured()) {
        return localData.transactions as Transaction[];
      }

      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return localData.transactions as Transaction[];
      }

      const { data, error } = await supabase
        .from('transactions')
        .select('id, avatar, name, category, date, amount, recurring')
        .order('date', { ascending: false });

      if (error) {
        console.error('Transactions fetch error:', error.message);
        return [];
      }

      return (data as Transaction[]) || [];
    },
  });
}

export function useBudgets() {
  return useQuery({
    queryKey: ['budgets'],
    queryFn: async (): Promise<Budget[]> => {
      if (!isSupabaseConfigured()) {
        return localData.budgets as Budget[];
      }

      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return localData.budgets as Budget[];
      }

      const { data, error } = await supabase.from('budgets').select('id, category, maximum, theme');

      if (error) {
        console.error('Budgets fetch error:', error.message);
        return [];
      }

      return (data as Budget[]) || [];
    },
  });
}

export function usePots() {
  return useQuery({
    queryKey: ['pots'],
    queryFn: async (): Promise<Pot[]> => {
      if (!isSupabaseConfigured()) {
        return localData.pots as Pot[];
      }

      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return localData.pots as Pot[];
      }

      const { data, error } = await supabase.from('pots').select('id, name, target, total, theme');

      if (error) {
        console.error('Pots fetch error:', error.message);
        return [];
      }

      return (data as Pot[]) || [];
    },
  });
}

export function useRecurringBills() {
  return useQuery({
    queryKey: ['recurring-bills'],
    queryFn: async (): Promise<Transaction[]> => {
      if (!isSupabaseConfigured()) {
        return (localData.transactions as Transaction[]).filter((t) => t.recurring);
      }

      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return (localData.transactions as Transaction[]).filter((t) => t.recurring);
      }

      const { data, error } = await supabase
        .from('transactions')
        .select('id, avatar, name, category, date, amount, recurring')
        .eq('recurring', true)
        .order('date', { ascending: false });

      if (error) {
        console.error('Recurring bills fetch error:', error.message);
        return [];
      }

      return (data as Transaction[]) || [];
    },
  });
}

export function useFinanceData() {
  const balance = useBalance();
  const transactions = useTransactions();
  const budgets = useBudgets();
  const pots = usePots();

  return {
    balance,
    transactions,
    budgets,
    pots,
    isLoading: balance.isLoading || transactions.isLoading || budgets.isLoading || pots.isLoading,
    isError: balance.isError || transactions.isError || budgets.isError || pots.isError,
  };
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async (transaction: TransactionInput) => {
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
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['recurring-bills'] });
    },
  });
}

export function useUpdateTransaction() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async ({ id, ...transaction }: Partial<Transaction> & { id: string }) => {
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
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['recurring-bills'] });
    },
  });
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('transactions').delete().eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['recurring-bills'] });
    },
  });
}

export function useCreateBudget() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async (budget: BudgetInput) => {
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
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
}

export function useUpdateBudget() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async ({ id, ...budget }: Partial<Budget> & { id: string }) => {
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
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
}

export function useDeleteBudget() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('budgets').delete().eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
    },
  });
}

export function useCreatePot() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async (pot: PotInput) => {
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
      queryClient.invalidateQueries({ queryKey: ['pots'] });
    },
  });
}

export function useUpdatePot() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async ({ id, ...pot }: Partial<Pot> & { id: string }) => {
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
      queryClient.invalidateQueries({ queryKey: ['pots'] });
    },
  });
}

export function useDeletePot() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('pots').delete().eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pots'] });
    },
  });
}

export function useAddMoneyToPot() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async ({ id, amount }: { id: string; amount: number }) => {
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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pots'] });
      queryClient.invalidateQueries({ queryKey: ['balance'] });
    },
  });
}

export function useWithdrawFromPot() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async ({ id, amount }: { id: string; amount: number }) => {
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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pots'] });
      queryClient.invalidateQueries({ queryKey: ['balance'] });
    },
  });
}

export function useUpdateBalance() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async (balance: Partial<Balance>) => {
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
      queryClient.invalidateQueries({ queryKey: ['balance'] });
    },
  });
}
