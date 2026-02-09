import { Budget, Transaction } from '@/lib/types';
import { BudgetChartWithLegend, Card } from '@/components';

interface SpendingSummaryProps {
  budgetsWithSpending: Array<{
    budget: Budget;
    spent: number;
    transactions: Transaction[];
  }>;
}

export const SpendingSummary = ({ budgetsWithSpending }: SpendingSummaryProps) => {
  const totalBudget = budgetsWithSpending.reduce((sum, { budget }) => sum + budget.maximum, 0);
  const totalSpent = budgetsWithSpending.reduce((sum, { spent }) => sum + spent, 0);

  const categories = budgetsWithSpending.map(({ budget, spent }) => ({
    name: budget.category,
    spent: spent,
    limit: budget.maximum,
    color: budget.theme,
  }));

  return (
    <Card className="border-b border-gray-200 bg-white p-6 xl:sticky xl:top-8">
      <h2 className="mb-6 text-xl font-bold text-gray-900">Spending Summary</h2>
      <BudgetChartWithLegend
        categories={categories}
        totalSpent={totalSpent}
        totalLimit={totalBudget}
      />
    </Card>
  );
};
