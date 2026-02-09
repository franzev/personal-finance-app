import type { Story } from '@ladle/react';
import { Input } from './Input';

export const Default: Story = () => <Input placeholder="Enter text..." />;

export const WithLabel: Story = () => <Input label="Email" placeholder="you@example.com" />;

export const WithPrefix: Story = () => <Input label="Amount" prefix="$" placeholder="0.00" />;

export const WithError: Story = () => (
  <Input label="Username" placeholder="Enter username" error="Username is required" />
);

export const Disabled: Story = () => (
  <Input label="Disabled" placeholder="Can't type here" disabled />
);

export const AllStates: Story = () => (
  <div className="flex max-w-sm flex-col gap-4">
    <Input placeholder="Default" />
    <Input label="With Label" placeholder="Labeled input" />
    <Input label="With Prefix" prefix="$" placeholder="0.00" />
    <Input label="With Error" error="This field is required" placeholder="Error state" />
    <Input label="Disabled" placeholder="Disabled" disabled />
  </div>
);
