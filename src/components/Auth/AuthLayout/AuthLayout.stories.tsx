import type { Story } from '@ladle/react';
import { AuthLayout } from './AuthLayout';

export const Default: Story = () => (
  <AuthLayout>
    <h2 className="mb-2 text-2xl font-bold text-[#201F24]">Login</h2>
    <p className="mb-6 text-sm text-[#696868]">Enter your credentials to access your account.</p>
    <div className="space-y-4">
      <input className="w-full rounded-md border p-3 text-sm" placeholder="Email" />
      <input
        className="w-full rounded-md border p-3 text-sm"
        type="password"
        placeholder="Password"
      />
      <button className="w-full rounded-md bg-[#201F24] p-3 text-sm font-bold text-white">
        Login
      </button>
    </div>
  </AuthLayout>
);

export const SignUp: Story = () => (
  <AuthLayout>
    <h2 className="mb-2 text-2xl font-bold text-[#201F24]">Sign Up</h2>
    <p className="mb-6 text-sm text-[#696868]">
      Create an account to get started with finance tracking.
    </p>
    <div className="space-y-4">
      <input className="w-full rounded-md border p-3 text-sm" placeholder="Name" />
      <input className="w-full rounded-md border p-3 text-sm" placeholder="Email" />
      <input
        className="w-full rounded-md border p-3 text-sm"
        type="password"
        placeholder="Create Password"
      />
      <button className="w-full rounded-md bg-[#201F24] p-3 text-sm font-bold text-white">
        Create Account
      </button>
    </div>
  </AuthLayout>
);
