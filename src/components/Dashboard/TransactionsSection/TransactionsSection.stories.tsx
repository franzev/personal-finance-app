import type { Story } from '@ladle/react';
import { TransactionsSection } from './TransactionsSection';
import type { Transaction } from '@/lib/types';

const sampleTransactions: Transaction[] = [
  {
    name: 'Emma Richardson',
    category: 'General',
    date: '2024-08-19T14:23:11Z',
    amount: 75.5,
    avatar: '/assets/images/avatars/emma-richardson.jpg',
    recurring: false,
  },
  {
    name: 'Savory Bites Bistro',
    category: 'Dining Out',
    date: '2024-08-19T10:15:00Z',
    amount: -55.5,
    avatar: '/assets/images/avatars/savory-bites-bistro.jpg',
    recurring: false,
  },
  {
    name: 'Daniel Carter',
    category: 'General',
    date: '2024-08-18T16:42:00Z',
    amount: -42.3,
    avatar: '/assets/images/avatars/daniel-carter.jpg',
    recurring: false,
  },
  {
    name: 'James Thompson',
    category: 'Entertainment',
    date: '2024-08-17T09:30:00Z',
    amount: -5.0,
    avatar: '/assets/images/avatars/james-thompson.jpg',
    recurring: false,
  },
  {
    name: 'Spark Electric',
    category: 'Bills',
    date: '2024-08-16T08:00:00Z',
    amount: -100,
    avatar: '/assets/images/avatars/spark-electric-solutions.jpg',
    recurring: true,
  },
];

export const Default: Story = () => (
  <div className="max-w-lg">
    <TransactionsSection transactions={sampleTransactions} isLoading={false} />
  </div>
);

export const Loading: Story = () => (
  <div className="max-w-lg">
    <TransactionsSection transactions={[]} isLoading={true} />
  </div>
);
