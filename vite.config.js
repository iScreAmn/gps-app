import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/gps-app/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    host: true,
    port: 5173,
    hmr: {
      overlay: false
    }
  }
})
