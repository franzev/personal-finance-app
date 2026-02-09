import { Skeleton, StatCard } from '@/components';

interface SummaryCardsProps {
  current: number;
  income: number;
  expenses: number;
  isLoading: boolean;
}

export function SummaryCards({ current, income, expenses, isLoading }: SummaryCardsProps) {
  if (isLoading) {
    return (
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mb-8 md:gap-6 lg:grid-cols-3">
        <Skeleton className="h-[120px]" />
        <Skeleton className="h-[120px]" />
        <Skeleton className="h-[120px]" />
      </div>
    );
  }

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mb-8 md:gap-6 lg:grid-cols-3">
      <StatCard label="Current Balance" amount={current} variant="dark" />
      <StatCard label="Income" amount={income} variant="light" />
      <StatCard label="Expenses" amount={expenses} variant="light" />
    </div>
  );
}
