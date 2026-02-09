import { Card, Skeleton } from '@/components';
import { SectionHeader } from '../SectionHeader';
import { BudgetItem } from '../BudgetItem';
import { BudgetDonutChart } from '@/components';
import type { Budget, Transaction } from '@/lib/types';

interface BudgetsSectionProps {
  budgets: Budget[];
  transactions: Transaction[];
  isLoading: boolean;
}

export function BudgetsSection({ budgets, transactions, isLoading }: BudgetsSectionProps) {
  if (isLoading) {
    return (
      <Card className="p-8">
        <SectionHeader title="Budgets" href="/budgets" linkText="See Details" />
        <div className="flex flex-col items-center gap-4 lg:flex-row">
          <Skeleton className="h-[240px] w-[240px] rounded-full" />
          <div className="w-full flex-1 space-y-4">
            <Skeleton className="h-[40px]" />
            <Skeleton className="h-[40px]" />
            <Skeleton className="h-[40px]" />
            <Skeleton className="h-[40px]" />
          </div>
        </div>
      </Card>
    );
  }

  const budgetCategories = budgets.map((budget) => {
    const spent = transactions
      .filter((t) => t.category === budget.category && t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return {
      name: budget.category,
      spent: Math.min(spent, budget.maximum),
      limit: budget.maximum,
      color: budget.theme,
    };
  });

  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalLimit = budgetCategories.reduce((sum, cat) => sum + cat.limit, 0);

  return (
    <Card className="p-8">
      <SectionHeader title="Budgets" href="/budgets" linkText="See Details" />

      <div className="flex flex-col items-center gap-4 lg:flex-row">
        <div className="w-full shrink-0 sm:w-[240px] lg:w-[200px] xl:w-[240px]">
          <BudgetDonutChart
            categories={budgetCategories}
            totalSpent={totalSpent}
            totalLimit={totalLimit}
          />
        </div>

        <div className="grid h-full w-full min-w-0 flex-1 grid-cols-1 gap-4 py-2 sm:grid-cols-2 lg:grid-cols-1">
          {budgetCategories.map((category, index) => (
            <BudgetItem
              key={index}
              category={category.name}
              amount={category.limit}
              color={category.color}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
