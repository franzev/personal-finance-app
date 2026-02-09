import type { Story } from '@ladle/react';
import { BudgetItem } from './BudgetItem';

export const Default: Story = () => (
  <BudgetItem category="Entertainment" amount={50.0} color="#277C78" />
);

export const LongCategory: Story = () => (
  <div className="w-48">
    <BudgetItem category="Personal Care & Wellness" amount={125.5} color="#826CB0" />
  </div>
);

export const Multiple: Story = () => (
  <div className="flex w-64 flex-col gap-3">
    <BudgetItem category="Entertainment" amount={50.0} color="#277C78" />
    <BudgetItem category="Bills" amount={750.0} color="#F2CDAC" />
    <BudgetItem category="Dining Out" amount={67.5} color="#82C9D7" />
    <BudgetItem category="Personal Care" amount={32.0} color="#626070" />
  </div>
);
