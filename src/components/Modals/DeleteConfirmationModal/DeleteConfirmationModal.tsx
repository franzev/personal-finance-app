'use client';

import * as React from 'react';
import { BaseModal, Button } from '@/components';

interface DeleteConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  itemName: string;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function DeleteConfirmationModal({
  open,
  onOpenChange,
  title,
  description,
  itemName,
  onConfirm,
  isLoading = false,
}: DeleteConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const defaultDescription = `Are you sure you want to delete this ${title.toLowerCase()}? This action cannot be reversed, and all the data inside it will be removed forever.`;

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={`Delete '${itemName}'?`}
      description={description || defaultDescription}
    >
      <div>
        <Button
          variant="destructive"
          onClick={handleConfirm}
          className="h-[53px] w-full text-sm font-bold"
          disabled={isLoading}
        >
          {isLoading ? 'Deleting...' : 'Yes, Confirm Deletion'}
        </Button>
        <Button
          variant="ghost"
          onClick={() => onOpenChange(false)}
          className="h-[53px] w-full text-sm font-medium"
          disabled={isLoading}
        >
          No,I want to go back
        </Button>
      </div>
    </BaseModal>
  );
}
