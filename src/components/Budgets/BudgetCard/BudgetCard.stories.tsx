import type { Story } from '@ladle/react';
import { BudgetCard } from './BudgetCard';
import type { Budget, Transaction } from '@/lib/types';

const sampleBudget: Budget = {
  id: '1',
  category: 'Entertainment',
  maximum: 50.0,
  theme: '#277C78',
};

const sampleTransactions: Transaction[] = [
  {
    id: '1',
    name: 'Netflix',
    category: 'Entertainment',
    date: '2024-08-15T10:00:00Z',
    amount: -15.99,
    avatar: '/assets/images/avatars/james-thompson.jpg',
    recurring: true,
  },
  {
    id: '2',
    name: 'Spotify',
    category: 'Entertainment',
    date: '2024-08-12T10:00:00Z',
    amount: -9.99,
    avatar: '/assets/images/avatars/daniel-carter.jpg',
    recurring: true,
  },
  {
    id: '3',
    name: 'Movie Tickets',
    category: 'Entertainment',
    date: '2024-08-10T10:00:00Z',
    amount: -24.0,
    avatar: '/assets/images/avatars/emma-richardson.jpg',
    recurring: false,
  },
];

export const Default: Story = () => (
  <div className="w-full max-w-lg">
    <BudgetCard
      budget={sampleBudget}
      spent={25.98}
      transactions={sampleTransactions}
      onEdit={() => console.log('edit')}
      onDelete={() => console.log('delete')}
    />
  </div>
);

export const OverBudget: Story = () => (
  <div className="w-full max-w-lg">
    <BudgetCard
      budget={sampleBudget}
      spent={62.5}
      transactions={sampleTransactions}
      onEdit={() => console.log('edit')}
      onDelete={() => console.log('delete')}
    />
  </div>
);

export const NoTransactions: Story = () => (
  <div className="w-full max-w-lg">
    <BudgetCard
      budget={{
        id: '2',
        category: 'Personal Care',
        maximum: 100.0,
        theme: '#626070',
      }}
      spent={0}
      transactions={[]}
      onEdit={() => console.log('edit')}
      onDelete={() => console.log('delete')}
    />
  </div>
);
