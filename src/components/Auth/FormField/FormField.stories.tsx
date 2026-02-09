import type { Story } from '@ladle/react';
import { FormField } from './FormField';

const mockRegister = {
  name: 'email' as const,
  onChange: async () => {},
  onBlur: async () => {},
  ref: () => {},
};

export const Default: Story = () => (
  <div className="w-80">
    <FormField label="Email" type="email" placeholder="Enter your email" register={mockRegister} />
  </div>
);

export const WithError: Story = () => (
  <div className="w-80">
    <FormField
      label="Email"
      type="email"
      placeholder="Enter your email"
      register={mockRegister}
      error="Please enter a valid email address"
    />
  </div>
);

export const TextInput: Story = () => (
  <div className="w-80">
    <FormField
      label="Full Name"
      placeholder="Enter your name"
      register={{ ...mockRegister, name: 'name' as const }}
    />
  </div>
);
