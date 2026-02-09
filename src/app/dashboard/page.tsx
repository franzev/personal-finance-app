'use client';

import { useFinanceData, useRecurringBills } from '@/hooks/useFinanceData';
import { BudgetsSection, PotsSection, RecurringBillsSection, SummaryCards, TransactionsSection } from '@/components';

export default function DashboardPage() {
  const { balance, transactions, budgets, pots, isLoading } = useFinanceData();
  const { data: recurringBills, isLoading: isLoadingBills } = useRecurringBills();

  return (
    <div className="bg-[#F8F4F0] p-4 pb-[68px] sm:pb-[90px] md:p-8 md:pb-8">
      <div className="mx-auto max-w-[1440px]">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 md:mb-8 md:text-3xl">Overview</h1>

        <SummaryCards
          current={balance.data?.current ?? 0}
          income={balance.data?.income ?? 0}
          expenses={balance.data?.expenses ?? 0}
          isLoading={balance.isLoading}
        />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 2xl:grid-cols-[minmax(500px,1fr)_minmax(400px,600px)]">
          <div className="flex flex-col gap-4 md:gap-6">
            <PotsSection pots={pots.data ?? []} isLoading={pots.isLoading} />
            <TransactionsSection
              transactions={transactions.data ?? []}
              isLoading={transactions.isLoading}
            />
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            <BudgetsSection
              budgets={budgets.data ?? []}
              transactions={transactions.data ?? []}
              isLoading={isLoading}
            />
            <RecurringBillsSection
              recurringBills={recurringBills ?? []}
              isLoading={isLoadingBills}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
