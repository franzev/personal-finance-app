'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';

interface BaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function BaseModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  maxWidth = 'sm:max-w-[560px]',
}: BaseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${maxWidth} p-5 sm:p-8`}>
        <DialogHeader>
          <DialogTitle className="text-foreground text-xl font-bold sm:text-[32px]">
            {title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
