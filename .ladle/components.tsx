import type { GlobalProvider } from '@ladle/react';
import '../src/app/globals.css';

export const Provider: GlobalProvider = ({ children }) => {
  return children;
};
