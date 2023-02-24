import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, '/src'),
  //   },
  // },
  // server: {
  //   port: 7777
  // },
  server: {
    port: 7777,
    open: false,
    proxy: {
      '/api': {
        target: 'http://localhost:7778/.netlify/functions',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
