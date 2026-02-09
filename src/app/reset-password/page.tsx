'use client';

import { Alert, AlertDescription, AuthLayout, Button, FormConfirmPasswordField, FormPasswordField } from '@/components';
import { usePasswordToggle } from '@/hooks/usePasswordToggle';
import { AUTH_BUTTON_CLASS, AUTH_LINK_CLASS } from '@/lib/constants/auth.constants';
import { createClient } from '@/lib/supabase/client';
import { AUTH_VALIDATION, validatePasswordConfirmation } from '@/lib/validations/authValidation';
import { updatePassword } from '@/services/auth.service';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null);
  const router = useRouter();

  const { show: showPassword, toggle: togglePassword } = usePasswordToggle();
  const { show: showConfirmPassword, toggle: toggleConfirmPassword } = usePasswordToggle();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    mode: 'onBlur',
  });

  const password = watch('password');

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setIsValidSession(true);
      } else {
        setIsValidSession(false);
        setError('Invalid or expired reset link. Please request a new one.');
      }
    };

    checkSession();
  }, []);

  const onSubmit = async (data: ResetPasswordFormData) => {
    setError(null);
    try {
      await updatePassword(data.password);
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to reset password.';
      setError(message);
    }
  };

  if (isValidSession === null) {
    return (
      <AuthLayout>
        <div className="py-8 text-center">
          <p className="text-gray-600">Verifying reset link...</p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <h2 className="mb-4 text-2xl font-bold text-[#201f24]">Reset Password</h2>
      <p className="mb-8 text-sm text-gray-600">Enter your new password below.</p>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert variant="success" className="mb-4">
          <AlertDescription>Password reset successful! Redirecting to login...</AlertDescription>
        </Alert>
      )}

      {isValidSession && !success && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormPasswordField
            label="New Password"
            placeholder="Enter new password"
            error={errors.password?.message}
            register={register('password', AUTH_VALIDATION.password)}
            show={showPassword}
            onToggleVisibility={togglePassword}
            helperText="Password must be at least 8 characters"
          />

          <FormConfirmPasswordField
            label="Confirm Password"
            placeholder="Confirm new password"
            error={errors.confirmPassword?.message}
            register={register('confirmPassword', {
              required: 'Please confirm your password',
              validate: validatePasswordConfirmation(password),
            })}
            show={showConfirmPassword}
            onToggleVisibility={toggleConfirmPassword}
          />

          <Button type="submit" disabled={isSubmitting} className={AUTH_BUTTON_CLASS}>
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      )}

      {!isValidSession && (
        <div className="mt-4">
          <Link href="/forgot-password">
            <Button className={AUTH_BUTTON_CLASS}>Request New Reset Link</Button>
          </Link>
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Remember your password?{' '}
          <Link href="/login" className={AUTH_LINK_CLASS}>
            Back to Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
