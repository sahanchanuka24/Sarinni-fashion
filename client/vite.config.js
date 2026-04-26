import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2'

export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: 'gzip', exclude: [/\.(png|jpg|jpeg|gif|webp|svg|ico)$/] }),
  ],
  build: {
    chunkSizeWarningLimit: 400,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('react-router-dom') || id.includes('react-dom') || id.includes('/react/')) return 'vendor-react';
            if (id.includes('axios')) return 'vendor-http';
          }
        },
      },
    },
  },
})

