'use client';

import { Controller, Control, FieldErrors } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Label } from '@/components';
import { ReactNode } from 'react';

interface SelectOption {
  value: string;
  label: string;
  renderContent?: () => ReactNode;
  disabled?: boolean;
}

interface FormSelectProps {
  control: Control<any>;
  errors: FieldErrors;
  name: string;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  required?: boolean;
  requiredMessage?: string;
  className?: string;
}

export default function FormSelect({
  control,
  errors,
  name,
  label,
  placeholder = 'Select an option',
  options,
  required = true,
  requiredMessage,
  className = 'space-y-1',
}: FormSelectProps) {
  const errorMessage = requiredMessage || `${label} is required`;

  return (
    <div className={className}>
      <Label className="text-muted-foreground text-xs font-bold">{label}</Label>
      <Controller
        name={name}
        control={control}
        rules={required ? { required: errorMessage } : undefined}
        render={({ field }) => (
          <>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="h-[45px] w-full text-sm">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                    {option.renderContent ? option.renderContent() : option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors[name] && (
              <p role="alert" className="text-destructive text-xs font-medium">
                {errors[name]?.message as string}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}
