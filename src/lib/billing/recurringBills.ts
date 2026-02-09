import { Transaction, RecurringBill } from '@/lib/types';
import { getDayOfMonth } from '@/lib/formatters';

export const processRecurringBills = (transactions: Transaction[]): RecurringBill[] => {
  const recurringTransactions = transactions
    .filter((t) => t.recurring)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const uniqueByName = Array.from(
    recurringTransactions
      .reduce((map, transaction) => {
        if (!map.has(transaction.name)) {
          map.set(transaction.name, transaction);
        }
        return map;
      }, new Map<string, Transaction>())
      .values(),
  );

  const currentDay = new Date().getDate();

  return uniqueByName.map((transaction) => {
    const dayOfMonth = getDayOfMonth(transaction.date);
    const isPaid = dayOfMonth < currentDay;
    const daysUntilDue = dayOfMonth - currentDay;
    const isDueSoon = daysUntilDue > 0 && daysUntilDue <= 5;

    return {
      ...transaction,
      dayOfMonth,
      isPaid,
      isDueSoon,
    };
  });
};
