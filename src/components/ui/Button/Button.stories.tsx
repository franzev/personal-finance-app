import type { Story } from '@ladle/react';
import { Button } from './Button';

export const Default: Story = () => <Button>Button</Button>;

export const Destructive: Story = () => <Button variant="destructive">Delete</Button>;

export const Outline: Story = () => <Button variant="outline">Outline</Button>;

export const Secondary: Story = () => <Button variant="secondary">Secondary</Button>;

export const Ghost: Story = () => <Button variant="ghost">Ghost</Button>;

export const Link: Story = () => <Button variant="link">Link</Button>;

export const Sizes: Story = () => (
  <div className="flex items-center gap-4">
    <Button size="sm">Small</Button>
    <Button size="default">Default</Button>
    <Button size="lg">Large</Button>
  </div>
);

export const Disabled: Story = () => <Button disabled>Disabled</Button>;

export const AllVariants: Story = () => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-2">
      <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  </div>
);
