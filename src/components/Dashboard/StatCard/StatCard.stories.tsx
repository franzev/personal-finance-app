import type { Story } from '@ladle/react';
import { StatCard } from './StatCard';

export const Default: Story = () => (
  <div className="w-72">
    <StatCard label="Income" amount={3814.25} />
  </div>
);

export const DarkVariant: Story = () => (
  <div className="w-72">
    <StatCard label="Current Balance" amount={4836.0} variant="dark" />
  </div>
);

export const AllCards: Story = () => (
  <div className="flex w-72 flex-col gap-4">
    <StatCard label="Current Balance" amount={4836.0} variant="dark" />
    <StatCard label="Income" amount={3814.25} />
    <StatCard label="Expenses" amount={1700.5} />
  </div>
);
