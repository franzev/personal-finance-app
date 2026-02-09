import type { Story } from '@ladle/react';
import { PotCard } from './PotCard';
import type { Pot } from '@/lib/types';

const samplePot: Pot = {
  id: '1',
  name: 'Savings',
  target: 2000.0,
  total: 159.0,
  theme: '#277C78',
};

export const Default: Story = () => (
  <div className="w-full max-w-sm">
    <PotCard
      pot={samplePot}
      onEdit={() => console.log('edit')}
      onDelete={() => console.log('delete')}
      onAddMoney={() => console.log('add money')}
      onWithdraw={() => console.log('withdraw')}
    />
  </div>
);

export const NearTarget: Story = () => (
  <div className="w-full max-w-sm">
    <PotCard
      pot={{ ...samplePot, total: 1850.0 }}
      onEdit={() => console.log('edit')}
      onDelete={() => console.log('delete')}
      onAddMoney={() => console.log('add money')}
      onWithdraw={() => console.log('withdraw')}
    />
  </div>
);

export const FullyFunded: Story = () => (
  <div className="w-full max-w-sm">
    <PotCard
      pot={{ ...samplePot, total: 2000.0 }}
      onEdit={() => console.log('edit')}
      onDelete={() => console.log('delete')}
      onAddMoney={() => console.log('add money')}
      onWithdraw={() => console.log('withdraw')}
    />
  </div>
);

export const Empty: Story = () => (
  <div className="w-full max-w-sm">
    <PotCard
      pot={{
        id: '2',
        name: 'Concert Ticket',
        target: 150.0,
        total: 0,
        theme: '#626070',
      }}
      onEdit={() => console.log('edit')}
      onDelete={() => console.log('delete')}
      onAddMoney={() => console.log('add money')}
      onWithdraw={() => console.log('withdraw')}
    />
  </div>
);
