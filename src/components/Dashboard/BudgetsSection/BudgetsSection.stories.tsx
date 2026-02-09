import type { Story } from '@ladle/react';
import { BudgetsSection } from './BudgetsSection';
import type { Budget, Transaction } from '@/lib/types';

const sampleBudgets: Budget[] = [
  { id: '1', category: 'Entertainment', maximum: 50, theme: '#277C78' },
  { id: '2', category: 'Bills', maximum: 750, theme: '#82C9D7' },
  { id: '3', category: 'Dining Out', maximum: 75, theme: '#F2CDAC' },
  { id: '4', category: 'Personal Care', maximum: 100, theme: '#626070' },
];

const sampleTransactions: Transaction[] = [
  {
    name: 'Netflix',
    category: 'Entertainment',
    date: '2024-08-15T10:00:00Z',
    amount: -15.99,
    avatar: '/assets/images/avatars/james-thompson.jpg',
    recurring: true,
  },
  {
    name: 'Spotify',
    category: 'Entertainment',
    date: '2024-08-12T10:00:00Z',
    amount: -9.99,
    avatar: '/assets/images/avatars/daniel-carter.jpg',
    recurring: true,
  },
  {
    name: 'Electric Bill',
    category: 'Bills',
    date: '2024-08-01T10:00:00Z',
    amount: -120,
    avatar: '/assets/images/avatars/spark-electric-solutions.jpg',
    recurring: true,
  },
  {
    name: 'Water Bill',
    category: 'Bills',
    date: '2024-08-05T10:00:00Z',
    amount: -45,
    avatar: '/assets/images/avatars/aqua-flow-utilities.jpg',
    recurring: true,
  },
  {
    name: 'Restaurant',
    category: 'Dining Out',
    date: '2024-08-10T10:00:00Z',
    amount: -35.5,
    avatar: '/assets/images/avatars/savory-bites-bistro.jpg',
    recurring: false,
  },
];

export const Default: Story = () => (
  <div className="max-w-lg">
    <BudgetsSection budgets={sampleBudgets} transactions={sampleTransactions} isLoading={false} />
  </div>
);

export const Loading: Story = () => (
  <div className="max-w-lg">
    <BudgetsSection budgets={[]} transactions={[]} isLoading={true} />
  </div>
);
