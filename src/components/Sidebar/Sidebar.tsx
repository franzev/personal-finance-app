'use client';

import { usePathname } from 'next/navigation';
import { useSidebarState } from '@/hooks/useSidebarState';
import { SidebarDesktop, SidebarMobile } from '@/components';
import type { NavItem } from '@/components/Sidebar/types';
import { useCallback, useEffect, useState } from 'react';
import { getInitialSidebarState } from '@/lib/sidebarState';

export default function Sidebar() {
  const pathname = usePathname();

  const [initialCollapsed, setInitialCollapsed] = useState(true);

  useEffect(() => {
    setInitialCollapsed(getInitialSidebarState());
  }, []);

  const { collapsed, toggle } = useSidebarState(initialCollapsed);

  const isActive = useCallback(
    (item: NavItem): boolean => {
      return pathname === item.href;
    },
    [pathname],
  );

  return (
    <>
      <SidebarDesktop collapsed={collapsed} toggle={toggle} isActive={isActive} />
      <SidebarMobile isActive={isActive} />
    </>
  );
}
