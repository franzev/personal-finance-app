import type { Story } from '@ladle/react';
import { TransactionRow } from './TransactionRow';
import type { Transaction } from '@/lib/types';

const expense: Transaction = {
  name: 'Savory Bites Bistro',
  category: 'Dining Out',
  date: '2024-08-19T14:23:11Z',
  amount: -55.5,
  avatar: '/assets/images/avatars/savory-bites-bistro.jpg',
  recurring: false,
};

const income: Transaction = {
  name: 'Emma Richardson',
  category: 'General',
  date: '2024-08-19T14:23:11Z',
  amount: 75.5,
  avatar: '/assets/images/avatars/emma-richardson.jpg',
  recurring: false,
};

export const Default: Story = () => (
  <div className="w-full max-w-2xl">
    <TransactionRow transaction={expense} />
  </div>
);

export const PositiveAmount: Story = () => (
  <div className="w-full max-w-2xl">
    <TransactionRow transaction={income} />
  </div>
);

export const Multiple: Story = () => (
  <div className="w-full max-w-2xl">
    <TransactionRow transaction={income} />
    <TransactionRow transaction={expense} />
    <TransactionRow
      transaction={{
        ...expense,
        name: 'Daniel Carter',
        amount: -42.3,
        avatar: '/assets/images/avatars/daniel-carter.jpg',
      }}
    />
  </div>
);
