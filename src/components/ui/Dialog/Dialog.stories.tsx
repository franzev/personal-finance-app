import type { Story } from '@ladle/react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './Dialog';
import { Button } from '@/components';

export const Default: Story = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Open Dialog</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>
          This is a dialog description. It provides context about the dialog.
        </DialogDescription>
      </DialogHeader>
      <p>Dialog body content goes here.</p>
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export const WithoutCloseButton: Story = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Open Dialog</Button>
    </DialogTrigger>
    <DialogContent showCloseButton={false}>
      <DialogHeader>
        <DialogTitle>No Close Button</DialogTitle>
        <DialogDescription>This dialog has no close button in the corner.</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button>OK</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
