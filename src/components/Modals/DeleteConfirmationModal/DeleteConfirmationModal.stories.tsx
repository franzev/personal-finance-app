import type { Story } from '@ladle/react';
import { useState } from 'react';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { Button } from '@/components';

export const Default: Story = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete Budget
      </Button>
      <DeleteConfirmationModal
        open={open}
        onOpenChange={setOpen}
        title="budget"
        itemName="Entertainment"
        onConfirm={() => console.log('confirmed')}
      />
    </>
  );
};

export const PotDeletion: Story = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete Pot
      </Button>
      <DeleteConfirmationModal
        open={open}
        onOpenChange={setOpen}
        title="pot"
        itemName="Savings"
        onConfirm={() => console.log('confirmed')}
      />
    </>
  );
};
