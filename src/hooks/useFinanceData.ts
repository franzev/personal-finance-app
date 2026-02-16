/**
 * Re-exports all finance data hooks for backward compatibility.
 * Prefer importing directly from the per-entity files for new code.
 */
export { useBalance, useUpdateBalance } from './useBalanceData';
export {
  useTransactions,
  useRecurringBills,
  useCreateTransaction,
  useUpdateTransaction,
  useDeleteTransaction,
} from './useTransactionData';
export type { TransactionInput } from './useTransactionData';
export { useBudgets, useCreateBudget, useUpdateBudget, useDeleteBudget } from './useBudgetData';
export type { BudgetInput } from './useBudgetData';
export {
  usePots,
  useCreatePot,
  useUpdatePot,
  useDeletePot,
  useAddMoneyToPot,
  useWithdrawFromPot,
} from './usePotData';
export type { PotInput } from './usePotData';

// Composite hook for dashboard
import { useBalance } from './useBalanceData';
import { useTransactions } from './useTransactionData';
import { useBudgets } from './useBudgetData';
import { usePots } from './usePotData';

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
