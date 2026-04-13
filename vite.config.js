import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/portfolia/',
  server: {
    open: true, // automatically opens browser
  },
  build: {
    outDir: 'dist', // output folder
  },
});
