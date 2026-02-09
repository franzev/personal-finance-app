'use client';

import React from 'react';
import { AuthHeader, MarketingPanel } from '@/components';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <AuthHeader />

      <div className="flex flex-1">
        <MarketingPanel />

        <div className="flex flex-1 items-center justify-center bg-[#f8f4f0] p-4 lg:w-3/5">
          <div className="w-full max-w-xl">
            <div className="rounded-lg bg-white p-5 shadow-sm sm:p-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
