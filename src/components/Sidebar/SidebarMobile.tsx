'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { NAV_ITEMS } from './nav-items';
import { SidebarNavItem } from './SidebarNavItem';
import type { SidebarMobileProps } from './types';
import { Button } from '@/components';
import { logout } from '@/services/auth.service';
import { cn } from '@/lib/utils';

export function SidebarMobile({ isActive }: SidebarMobileProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <nav
      className="fixed right-0 bottom-0 left-0 z-50 h-[52px] border-t border-zinc-800 bg-[#201F24] sm:h-[74px] md:hidden"
      aria-label="Mobile navigation"
    >
      <ul className="flex h-full items-center justify-around px-2">
        {NAV_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.href}
            item={item}
            active={isActive(item)}
            collapsed={false}
            isMobile={true}
          />
        ))}

        <li className="flex items-center">
          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            variant="ghost"
            className={cn(
              'group flex-col gap-1 rounded-t-lg px-3 py-2 transition-colors hover:bg-transparent',
              'text-[#B3B3B3] hover:text-[#F2F2F2]',
            )}
            aria-label="Logout"
          >
            <LogOut
              className="h-5 w-5 shrink-0 opacity-80 transition-all group-hover:opacity-100 group-hover:brightness-[2.5]"
              strokeWidth={2.5}
              aria-hidden="true"
            />

            <span className="hidden text-[10px] font-bold sm:block">
              {isLoggingOut ? '...' : 'Logout'}
            </span>
          </Button>
        </li>
      </ul>
    </nav>
  );
}
