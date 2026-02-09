import type { Story } from '@ladle/react';
import { useState } from 'react';
import { PasswordInput } from './PasswordInput';

export const Default: Story = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="w-80">
      <PasswordInput
        placeholder="Enter password"
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
      <PasswordInput
        placeholder="Enter password"
        show={show}
        onToggleVisibility={() => setShow(!show)}
        error="Password must be at least 8 characters"
      />
    </div>
  );
};

export const Visible: Story = () => (
  <div className="w-80">
    <PasswordInput
      placeholder="Enter password"
      defaultValue="mypassword123"
      show={true}
      onToggleVisibility={() => console.log('toggle')}
    />
  </div>
);
