import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/postcss';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'next/image': path.resolve(__dirname, 'next-image-mock.tsx'),
      'next/link': path.resolve(__dirname, 'next-link-mock.tsx'),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
