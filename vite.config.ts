import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: "/Portofolio/",
  build: {
    chunkSizeWarningLimit: 1000, // Increase the limit to 1000 kB
  },
})
