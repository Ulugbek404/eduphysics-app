import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor libraries - React ecosystem
          'react-vendor': ['react', 'react-dom'],

          // Firebase - Large library
          'firebase': [
            'firebase/app',
            'firebase/auth',
            'firebase/firestore'
          ],

          // UI Libraries
          'ui-vendor': ['lucide-react'],

          // AI Module - Large
          'ai-module': ['@google/generative-ai'],
        }
      }
    },
    chunkSizeWarningLimit: 1000, // 1MB warning limit
    sourcemap: false, // Disable sourcemaps in production
  },
  server: {
    port: 5173,
    open: false,
  }
})
