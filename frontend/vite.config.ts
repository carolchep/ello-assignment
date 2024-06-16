import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    eslint({
      cache: false,
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.jsx'],
      exclude: ['node_modules', 'dist']
    })
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './setup.js', 
  },
  build: {
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
