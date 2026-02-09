import type { Story } from '@ladle/react';
import { BillRow } from './BillRow';
import type { RecurringBill } from '@/lib/types';

const paidBill: RecurringBill = {
  name: 'Spark Electric Solutions',
  category: 'Bills',
  date: '2024-08-02T09:25:11Z',
  amount: -100.0,
  avatar: '/assets/images/avatars/spark-electric-solutions.jpg',
  recurring: true,
  dayOfMonth: 2,
  isPaid: true,
  isDueSoon: false,
};

const upcomingBill: RecurringBill = {
  name: 'Aqua Flow Utilities',
  category: 'Bills',
  date: '2024-08-15T09:25:11Z',
  amount: -100.0,
  avatar: '/assets/images/avatars/aqua-flow-utilities.jpg',
  recurring: true,
  dayOfMonth: 15,
  isPaid: false,
  isDueSoon: false,
};

const dueSoonBill: RecurringBill = {
  name: 'Digital Services Hub',
  category: 'Bills',
  date: '2024-08-28T09:25:11Z',
  amount: -49.99,
  avatar: '/assets/images/avatars/digital-services-hub.jpg',
  recurring: true,
  dayOfMonth: 28,
  isPaid: false,
  isDueSoon: true,
};

export const Paid: Story = () => (
  <div className="w-full max-w-2xl">
    <BillRow bill={paidBill} />
  </div>
);

export const Upcoming: Story = () => (
  <div className="w-full max-w-2xl">
    <BillRow bill={upcomingBill} />
  </div>
);

export const DueSoon: Story = () => (
  <div className="w-full max-w-2xl">
    <BillRow bill={dueSoonBill} />
  </div>
);

export const Multiple: Story = () => (
  <div className="w-full max-w-2xl">
    <BillRow bill={paidBill} />
    <BillRow bill={upcomingBill} />
    <BillRow bill={dueSoonBill} />
  </div>
);
