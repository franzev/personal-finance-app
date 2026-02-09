import type { Story } from '@ladle/react';
import { PotItem } from './PotItem';

export const Default: Story = () => <PotItem label="Savings" amount={159} color="#277C78" />;

export const Multiple: Story = () => (
  <div className="grid w-96 grid-cols-2 gap-4">
    <PotItem label="Savings" amount={159} color="#277C78" />
    <PotItem label="Concert Ticket" amount={110} color="#626070" />
    <PotItem label="Gift" amount={40} color="#82C9D7" />
    <PotItem label="New Laptop" amount={10} color="#F2CDAC" />
  </div>
);
