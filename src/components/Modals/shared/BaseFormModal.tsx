'use client';

import * as React from 'react';
import { BaseModal, Button, FormErrorAlert } from '@/components';

interface BaseFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  buttonLabel: string;
  submitError: string | null;
  formClassName?: string;
}

export function BaseFormModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSubmit,
  isSubmitting,
  buttonLabel,
  submitError,
  formClassName = 'space-y-4',
}: BaseFormModalProps) {
  return (
    <BaseModal open={open} onOpenChange={onOpenChange} title={title} description={description}>
      <form onSubmit={onSubmit} className={formClassName}>
        {children}

        <FormErrorAlert error={submitError} />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 h-[53px] w-full cursor-pointer text-sm font-bold"
        >
          {buttonLabel}
        </Button>
      </form>
    </BaseModal>
  );
}
