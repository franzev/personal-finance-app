import type { Story } from '@ladle/react';
import { SpendingSummary } from './SpendingSummary';
import type { Budget, Transaction } from '@/lib/types';

const sampleBudgets: Array<{
  budget: Budget;
  spent: number;
  transactions: Transaction[];
}> = [
  {
    budget: {
      id: '1',
      category: 'Entertainment',
      maximum: 50,
      theme: '#277C78',
    },
    spent: 25,
    transactions: [],
  },
  {
    budget: { id: '2', category: 'Bills', maximum: 750, theme: '#82C9D7' },
    spent: 750,
    transactions: [],
  },
  {
    budget: { id: '3', category: 'Dining Out', maximum: 75, theme: '#F2CDAC' },
    spent: 67.5,
    transactions: [],
  },
  {
    budget: {
      id: '4',
      category: 'Personal Care',
      maximum: 100,
      theme: '#626070',
    },
    spent: 32,
    transactions: [],
  },
];

export const Default: Story = () => (
  <div className="w-96">
    <SpendingSummary budgetsWithSpending={sampleBudgets} />
  </div>
);

export const SingleBudget: Story = () => (
  <div className="w-96">
    <SpendingSummary budgetsWithSpending={[sampleBudgets[0]]} />
  </div>
);
