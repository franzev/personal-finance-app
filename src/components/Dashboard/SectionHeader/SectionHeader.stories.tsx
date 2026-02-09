import type { Story } from '@ladle/react';
import { SectionHeader } from './SectionHeader';

export const Default: Story = () => <SectionHeader title="Pots" />;

export const WithLink: Story = () => <SectionHeader title="Pots" href="/pots" />;

export const WithCustomLinkText: Story = () => (
  <SectionHeader title="Budgets" href="/budgets" linkText="View All" />
);
