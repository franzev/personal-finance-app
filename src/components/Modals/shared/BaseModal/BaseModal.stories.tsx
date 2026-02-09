import type { Story } from '@ladle/react';
import { useState } from 'react';
import { BaseModal } from './BaseModal';
import { Button } from '@/components';

export const Default: Story = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <BaseModal
        open={open}
        onOpenChange={setOpen}
        title="Modal Title"
        description="This is a description of the modal content."
      >
        <p className="text-sm text-gray-600">Modal body content goes here.</p>
      </BaseModal>
    </>
  );
};

export const WithForm: Story = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <BaseModal
        open={open}
        onOpenChange={setOpen}
        title="Add New Budget"
        description="Choose a category to set a budget for."
      >
        <div className="space-y-4">
          <input className="w-full rounded-md border p-2 text-sm" placeholder="Budget name" />
          <Button className="w-full">Confirm</Button>
        </div>
      </BaseModal>
    </>
  );
};
