'use client';

import React from 'react';
import Image from 'next/image';
import { Button, Input } from '@/components';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  show?: boolean;
  onToggleVisibility?: () => void;
  error?: string;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ show, onToggleVisibility, className, error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <Input
          type={show ? 'text' : 'password'}
          ref={ref}
          className={`pr-12 ${className || ''}`}
          error={error}
          {...props}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onToggleVisibility}
          aria-label={show ? 'Hide password' : 'Show password'}
          aria-pressed={show}
          className="absolute top-[5px] right-2 h-10 w-10 hover:bg-transparent"
        >
          <Image
            src={
              show
                ? '/assets/images/icon-hide-password.svg'
                : '/assets/images/icon-show-password.svg'
            }
            alt=""
            width={16}
            height={show ? 12 : 10}
            className="opacity-70 transition-opacity hover:opacity-100"
          />
        </Button>
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
