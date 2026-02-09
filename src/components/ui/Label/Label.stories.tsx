import type { Story } from '@ladle/react';
import { Label } from './Label';

export const Default: Story = () => <Label>Label text</Label>;

export const WithInput: Story = () => (
  <div className="flex flex-col gap-2">
    <Label htmlFor="email">Email address</Label>
    <input
      id="email"
      type="email"
      placeholder="you@example.com"
      className="rounded border px-3 py-2 text-sm"
    />
  </div>
);
