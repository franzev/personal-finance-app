const STORAGE_KEY = 'sidebar-collapsed';

export function getInitialSidebarState(): boolean {
  if (typeof window === 'undefined') {
    return true;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === null ? true : stored === '1';
  } catch (error) {
    console.error('Failed to read sidebar state:', error);
    return true;
  }
}

export function saveSidebarState(collapsed: boolean): void {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0');
  } catch (error) {
    console.error('Failed to save sidebar state:', error);
  }
}
