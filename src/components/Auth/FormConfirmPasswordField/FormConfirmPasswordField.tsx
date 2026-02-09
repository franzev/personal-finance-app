import { Label, PasswordInput } from '@/components';
import type { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormConfirmPasswordFieldProps {
  label: string;
  placeholder: string;
  error?: string;
  register: UseFormRegisterReturn;
  show: boolean;
  onToggleVisibility: () => void;
}

export const FormConfirmPasswordField: FC<FormConfirmPasswordFieldProps> = ({
  label,
  placeholder,
  error,
  register,
  show,
  onToggleVisibility,
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
    </div>
  );
};
