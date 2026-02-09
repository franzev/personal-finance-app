'use client';

import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar/Sidebar';

const AUTH_ROUTES = ['/login', '/signup', '/forgot-password', '/reset-password'];

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = AUTH_ROUTES.includes(pathname);

  if (isAuthPage) {
    return <div className="min-h-screen bg-(--primary-light)">{children}</div>;
  }

  return (
    <div className="flex h-screen bg-(--primary-light)">
      <Suspense
        fallback={
          <aside
            className="hidden w-[88px] rounded-r-2xl bg-[#201F24] md:block"
            aria-label="Loading navigation"
          >
            <div className="animate-pulse p-4">
              <div className="mb-6 h-8 rounded bg-gray-700/50" />
              <div className="space-y-2">
                <div className="h-12 rounded bg-gray-700/50" />
                <div className="h-12 rounded bg-gray-700/50" />
                <div className="h-12 rounded bg-gray-700/50" />
                <div className="h-12 rounded bg-gray-700/50" />
              </div>
            </div>
          </aside>
        }
      >
        <Sidebar />
      </Suspense>
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
        <div className="mx-auto max-w-[1600px]">{children}</div>
      </main>
    </div>
  );
}
