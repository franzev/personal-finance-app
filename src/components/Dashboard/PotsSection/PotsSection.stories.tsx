import type { Story } from '@ladle/react';
import { PotsSection } from './PotsSection';
import type { Pot } from '@/lib/types';

const samplePots: Pot[] = [
  { id: '1', name: 'Savings', target: 2000, total: 159, theme: '#277C78' },
  {
    id: '2',
    name: 'Concert Ticket',
    target: 150,
    total: 110,
    theme: '#626070',
  },
  { id: '3', name: 'Gift', target: 60, total: 40, theme: '#82C9D7' },
  { id: '4', name: 'New Laptop', target: 1000, total: 10, theme: '#F2CDAC' },
];

export const Default: Story = () => (
  <div className="max-w-lg">
    <PotsSection pots={samplePots} isLoading={false} />
  </div>
);

export const Loading: Story = () => (
  <div className="max-w-lg">
    <PotsSection pots={[]} isLoading={true} />
  </div>
);
