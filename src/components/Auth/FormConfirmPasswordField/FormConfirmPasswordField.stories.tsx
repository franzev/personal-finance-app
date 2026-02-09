import type { Story } from '@ladle/react';
import { useState } from 'react';
import { FormConfirmPasswordField } from './FormConfirmPasswordField';

const mockRegister = {
  name: 'confirmPassword' as const,
  onChange: async () => {},
  onBlur: async () => {},
  ref: () => {},
};

export const Default: Story = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="w-80">
      <FormConfirmPasswordField
        label="Confirm Password"
        placeholder="Re-enter your password"
        register={mockRegister}
        show={show}
        onToggleVisibility={() => setShow(!show)}
      />
    </div>
  );
};

export const WithError: Story = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="w-80">
      <FormConfirmPasswordField
        label="Confirm Password"
        placeholder="Re-enter your password"
        register={mockRegister}
        show={show}
        onToggleVisibility={() => setShow(!show)}
        error="Passwords do not match"
      />
    </div>
  );
};
