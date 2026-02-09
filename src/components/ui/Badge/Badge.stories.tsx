import type { Story } from '@ladle/react';
import { Badge } from './Badge';

export const Default: Story = () => <Badge>Badge</Badge>;

export const Secondary: Story = () => <Badge variant="secondary">Secondary</Badge>;

export const Destructive: Story = () => <Badge variant="destructive">Destructive</Badge>;

export const Outline: Story = () => <Badge variant="outline">Outline</Badge>;

export const AllVariants: Story = () => (
  <div className="flex gap-2">
    <Badge>Default</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="destructive">Destructive</Badge>
    <Badge variant="outline">Outline</Badge>
  </div>
);
