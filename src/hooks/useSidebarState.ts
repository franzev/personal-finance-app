'use client';

import { useState, useTransition } from 'react';
import { logger } from '@/lib/logger';

const STORAGE_KEY = 'sidebar-collapsed:v1';

export function useSidebarState(initialCollapsed: boolean = true) {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const [isPending, startTransition] = useTransition();

  const toggle = () => {
    startTransition(() => {
      const next = !collapsed;
      setCollapsed(next);

      try {
        window.localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
      } catch (error) {
        logger.error('Failed to save sidebar state', error);
      }
    });
  };

  return { collapsed, isPending, toggle };
}
