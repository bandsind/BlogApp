import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "src") }
    ]
  },

  server: {
    proxy: {
      '/server': 'http://localhost:8800'
    }
  }
});
