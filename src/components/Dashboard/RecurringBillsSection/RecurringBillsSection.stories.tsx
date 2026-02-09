import type { Story } from '@ladle/react';
import { RecurringBillsSection } from './RecurringBillsSection';
import type { Transaction } from '@/lib/types';

const sampleBills: Transaction[] = [
  {
    name: 'Spark Electric',
    category: 'Bills',
    date: '2024-08-02T09:00:00Z',
    amount: -100,
    avatar: '/assets/images/avatars/spark-electric-solutions.jpg',
    recurring: true,
  },
  {
    name: 'Aqua Flow',
    category: 'Bills',
    date: '2024-08-07T09:00:00Z',
    amount: -50,
    avatar: '/assets/images/avatars/aqua-flow-utilities.jpg',
    recurring: true,
  },
  {
    name: 'Netflix',
    category: 'Bills',
    date: '2024-08-15T09:00:00Z',
    amount: -15.99,
    avatar: '/assets/images/avatars/james-thompson.jpg',
    recurring: true,
  },
  {
    name: 'Spotify',
    category: 'Bills',
    date: '2024-08-22T09:00:00Z',
    amount: -9.99,
    avatar: '/assets/images/avatars/daniel-carter.jpg',
    recurring: true,
  },
  {
    name: 'Internet',
    category: 'Bills',
    date: '2024-08-28T09:00:00Z',
    amount: -59.98,
    avatar: '/assets/images/avatars/digital-services-hub.jpg',
    recurring: true,
  },
];

export const Default: Story = () => (
  <div className="max-w-md">
    <RecurringBillsSection recurringBills={sampleBills} isLoading={false} />
  </div>
);

export const Loading: Story = () => (
  <div className="max-w-md">
    <RecurringBillsSection recurringBills={[]} isLoading={true} />
  </div>
);
