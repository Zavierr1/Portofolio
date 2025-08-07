import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    // Optimize for older devices
    target: 'es2015',
    minify: 'esbuild',
    // Code splitting for better loading
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
        },
      },
    },
    // Reduce chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
  // Optimize assets
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],
})
