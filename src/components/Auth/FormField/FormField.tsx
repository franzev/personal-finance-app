import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Input, Label } from '@/components';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'email' | 'number';
  placeholder: string;
  error?: string;
  register: UseFormRegisterReturn;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type = 'text',
  placeholder,
  error,
  register,
}) => {
  return (
    <div className="space-y-1">
      <Label className="block text-sm font-medium text-gray-700">{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        error={error}
        aria-invalid={error ? 'true' : 'false'}
        {...register}
      />
    </div>
  );
};
