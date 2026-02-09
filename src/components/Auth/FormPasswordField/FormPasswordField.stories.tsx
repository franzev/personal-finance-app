import type { Story } from '@ladle/react';
import { useState } from 'react';
import { FormPasswordField } from './FormPasswordField';

const mockRegister = {
  name: 'password' as const,
  onChange: async () => {},
  onBlur: async () => {},
  ref: () => {},
};

export const Default: Story = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="w-80">
      <FormPasswordField
        label="Password"
        placeholder="Enter your password"
        register={mockRegister}
        show={show}
        onToggleVisibility={() => setShow(!show)}
      />
    </div>
  );
};

export const WithHelperText: Story = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="w-80">
      <FormPasswordField
        label="Create Password"
        placeholder="Enter your password"
        register={mockRegister}
        show={show}
        onToggleVisibility={() => setShow(!show)}
        helperText="Passwords must be at least 8 characters"
      />
    </div>
  );
};

export const WithError: Story = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="w-80">
      <FormPasswordField
        label="Password"
        placeholder="Enter your password"
        register={mockRegister}
        show={show}
        onToggleVisibility={() => setShow(!show)}
        error="Password must be at least 8 characters"
      />
    </div>
  );
};
