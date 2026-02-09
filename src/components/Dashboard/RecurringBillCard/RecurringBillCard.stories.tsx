import type { Story } from '@ladle/react';
import { RecurringBillCard } from './RecurringBillCard';

export const Default: Story = () => (
  <RecurringBillCard label="Paid Bills" amount={190.0} borderColor="#277C78" />
);

export const Multiple: Story = () => (
  <div className="flex w-80 flex-col gap-3">
    <RecurringBillCard label="Paid Bills" amount={190.0} borderColor="#277C78" />
    <RecurringBillCard label="Total Upcoming" amount={194.98} borderColor="#F2CDAC" />
    <RecurringBillCard label="Due Soon" amount={59.98} borderColor="#82C9D7" />
  </div>
);
