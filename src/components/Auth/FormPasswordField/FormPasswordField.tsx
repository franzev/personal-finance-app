import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Label, PasswordInput } from '@/components';

interface FormPasswordFieldProps {
  label: string;
  placeholder: string;
  error?: string;
  register: UseFormRegisterReturn;
  show: boolean;
  onToggleVisibility: () => void;
  helperText?: string;
}

export const FormPasswordField: React.FC<FormPasswordFieldProps> = ({
  label,
  placeholder,
  error,
  register,
  show,
  onToggleVisibility,
  helperText,
}) => {
  return (
    <div className="space-y-1">
      <Label className="block text-sm font-medium text-gray-700">{label}</Label>
      <PasswordInput
        placeholder={placeholder}
        show={show}
        onToggleVisibility={onToggleVisibility}
        error={error}
        aria-invalid={error ? 'true' : 'false'}
        {...register}
      />
      {helperText && <p className="text-right text-sm text-gray-500">{helperText}</p>}
    </div>
  );
};
