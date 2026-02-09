import type { Story } from '@ladle/react';
import { TransactionItem } from './TransactionItem';

export const Default: Story = () => (
  <div className="w-96">
    <TransactionItem
      name="Emma Richardson"
      amount={75.5}
      date="19 Aug 2024"
      avatar="/assets/images/avatars/emma-richardson.jpg"
    />
  </div>
);

export const Positive: Story = () => (
  <div className="w-96">
    <TransactionItem
      name="Savory Bites Bistro"
      amount={55.5}
      date="19 Aug 2024"
      avatar="/assets/images/avatars/savory-bites-bistro.jpg"
      isPositive
    />
  </div>
);

export const Multiple: Story = () => (
  <div className="w-96 divide-y divide-gray-100">
    <TransactionItem
      name="Emma Richardson"
      amount={75.5}
      date="19 Aug 2024"
      avatar="/assets/images/avatars/emma-richardson.jpg"
      isPositive
    />
    <TransactionItem
      name="Savory Bites Bistro"
      amount={55.5}
      date="20 Aug 2024"
      avatar="/assets/images/avatars/savory-bites-bistro.jpg"
    />
    <TransactionItem
      name="Daniel Carter"
      amount={42.3}
      date="21 Aug 2024"
      avatar="/assets/images/avatars/daniel-carter.jpg"
    />
  </div>
);
