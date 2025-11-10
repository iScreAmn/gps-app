import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => ({
  base: '/test/',
  plugins: [react()],
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
