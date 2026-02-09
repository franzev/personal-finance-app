import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefix?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, prefix, type, ...props }, ref) => {
    const inputId = props.id || props.name || `input-${React.useId()}`;
    const errorId = `${inputId}-error`;
    const labelId = `${inputId}-label`;

    return (
      <div className="w-full space-y-1">
        {label && (
          <label
            id={labelId}
            htmlFor={inputId}
            className="text-muted-foreground block text-xs font-bold"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {prefix && (
            <span
              className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm"
              aria-hidden="true"
            >
              {prefix}
            </span>
          )}
          <input
            {...props}
            id={inputId}
            type={type}
            className={cn(
              'border-border bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-lg border px-5 py-3 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              prefix && 'pl-8',
              error && 'border-destructive focus-visible:ring-destructive',
              className,
            )}
            ref={ref}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? errorId : undefined}
            aria-labelledby={label ? labelId : undefined}
          />
        </div>
        {error && (
          <p
            id={errorId}
            className="text-destructive text-xs font-medium"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
