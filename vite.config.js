import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig(() => ({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      stream: fileURLToPath(new URL('./src/shims/empty.js', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          'animations': ['gsap', 'motion', '@motionone/utils'],
          'router': ['react-router-dom']
        }
      }
    }
  },
  server: {
    host: true,
    port: 5168,
    hmr: {
      overlay: false
    }
  }
}))
