import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://172.31.250.60:9090',
        changeOrigin: true,
      },
    },
  },
});
