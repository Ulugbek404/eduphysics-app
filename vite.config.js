import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
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
    host: true, // Expose to local network (useful for Docker/WSL2)
    hmr: {
      host: 'localhost',
      protocol: 'ws',
      port: 5173,
    },
    watch: {
      usePolling: true, // Use polling instead of WebSocket (for firewall issues)
      interval: 1000, // Check for changes every 1 second
    },
  }
})
