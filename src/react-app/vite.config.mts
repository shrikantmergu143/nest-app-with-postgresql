import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, '../../public/react-app'),
    rollupOptions: {
      input: path.resolve(__dirname, 'client.tsx'),
      output: {
        entryFileNames: 'client.js',
      },
    },
  },
});
