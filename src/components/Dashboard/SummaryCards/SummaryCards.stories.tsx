import type { Story } from '@ladle/react';
import { SummaryCards } from './SummaryCards';

export const Default: Story = () => (
  <SummaryCards current={4836.0} income={3814.25} expenses={1700.5} isLoading={false} />
);

export const Loading: Story = () => (
  <SummaryCards current={0} income={0} expenses={0} isLoading={true} />
);
