import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeImagePath(path: string): string {
  if (path.startsWith('./')) {
    return path.replace('./', '/');
  }
  return path;
}
