'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { LogOut } from 'lucide-react';

import type { SidebarDesktopProps } from './types';
import { Button, NAV_ITEMS, SidebarNavItem } from '@/components';
import { logout } from '@/services/auth.service';
import { cn } from '@/lib/utils';
import { logger } from '@/lib/logger';

export function SidebarDesktop({ collapsed, toggle, isActive }: SidebarDesktopProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      logger.error('Logout failed', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <aside
      className={`hidden flex-col justify-between rounded-r-2xl bg-[#201F24] text-zinc-300 transition-all duration-300 md:flex ${
        collapsed ? 'w-[88px]' : 'w-[300px]'
      }`}
      aria-label="Main navigation"
    >
      <div className={`pt-10 pb-8 ${collapsed ? 'flex justify-center' : 'px-8'}`}>
        <div className={`flex items-center ${collapsed ? '' : 'h-6'}`}>
          {collapsed ? (
            <Image
              src="/assets/images/logo-small.svg"
              alt="Finance"
              width={14}
              height={22}
              priority
            />
          ) : (
            <Image
              src="/assets/images/logo-large.svg"
              alt="Finance"
              width={122}
              height={22}
              priority
            />
          )}
        </div>
      </div>

      <nav
        className={collapsed ? 'flex flex-1 flex-col px-4' : 'flex-1 pr-6'}
        aria-label="Dashboard navigation"
      >
        <ul className={collapsed ? 'flex flex-col gap-4' : 'flex flex-col gap-1'}>
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem
              key={item.href}
              item={item}
              active={isActive(item)}
              collapsed={collapsed}
            />
          ))}
        </ul>
      </nav>

      <div className={cn('border-t border-zinc-700 pb-6', collapsed ? 'px-4 pt-4' : 'px-8 py-4')}>
        <Button
          onClick={handleLogout}
          disabled={isLoggingOut}
          variant="ghost"
          className={cn(
            'group flex cursor-pointer items-center transition-colors hover:bg-transparent',
            collapsed
              ? 'w-full justify-center rounded-r-lg'
              : 'w-full justify-start gap-4 rounded-r-lg',
            'text-[#B3B3B3] hover:text-[#F2F2F2]',
          )}
          aria-label="Logout"
        >
          <LogOut
            className="h-6 w-6 shrink-0 opacity-80 transition-all group-hover:opacity-100 group-hover:brightness-[2.5]"
            strokeWidth={2.5}
            aria-hidden="true"
          />
          {!collapsed && (
            <span className="text-base font-bold whitespace-nowrap">
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </span>
          )}
        </Button>
      </div>

      <div className={cn('pb-10', collapsed ? 'px-4' : 'px-8')}>
        <Button
          onClick={toggle}
          variant="ghost"
          className={cn(
            'group flex cursor-pointer items-center transition-colors hover:bg-transparent',
            collapsed
              ? 'w-full justify-center rounded-r-lg'
              : 'w-full justify-start gap-4 rounded-r-lg pl-0',
            'text-[#B3B3B3] hover:text-[#F2F2F2]',
          )}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
        >
          <Image
            src="/assets/images/icon-minimize-menu.svg"
            alt=""
            width={24}
            height={24}
            className={cn(
              'shrink-0 opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:brightness-[2.5]',
              collapsed && 'rotate-180',
            )}
          />
          {!collapsed && (
            <span className="text-base font-bold whitespace-nowrap">Minimize Menu</span>
          )}
        </Button>
      </div>
    </aside>
  );
}
