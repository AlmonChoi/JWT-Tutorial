import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:1111',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/auth/, ''),
      },
      '/secure': {
        target: 'http://localhost:1111',
        changeOrigin: false,
      },
    },
  },
})
