'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Alert, AlertDescription, AuthLayout, Button, FormField, FormPasswordField } from '@/components';
import { AUTH_VALIDATION } from '@/lib/validations/authValidation';
import { login } from '@/services/auth.service';
import { usePasswordToggle } from '@/hooks/usePasswordToggle';
import { AUTH_BUTTON_CLASS, AUTH_LINK_CLASS } from '@/lib/constants/auth.constants';

interface LoginFormData {
  email: string;
  password: string;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { show: showPassword, toggle: togglePasswordVisibility } = usePasswordToggle();
  const [error, setError] = useState<string | null>(null);

  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    try {
      await login(data);
      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed. Please try again.';
      setError(message);
    }
  };

  return (
    <AuthLayout>
      <h2 className="mb-8 text-2xl font-bold text-[#201f24]">Login</h2>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          register={register('email', AUTH_VALIDATION.email)}
        />

        <FormPasswordField
          label="Password"
          placeholder="Enter your password"
          show={showPassword}
          onToggleVisibility={togglePasswordVisibility}
          error={errors.password?.message}
          register={register('password', AUTH_VALIDATION.password)}
        />

        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm text-gray-600 underline hover:text-[#201f24]"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" disabled={isSubmitting} className={AUTH_BUTTON_CLASS}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Need to create an account?{' '}
          <Link href="/signup" className={AUTH_LINK_CLASS}>
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <AuthLayout>
          <h2 className="mb-8 text-2xl font-bold text-[#201f24]">Login</h2>
          <div className="animate-pulse space-y-4">
            <div className="h-12 rounded bg-gray-200" />
            <div className="h-12 rounded bg-gray-200" />
            <div className="h-10 rounded bg-gray-200" />
          </div>
        </AuthLayout>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
