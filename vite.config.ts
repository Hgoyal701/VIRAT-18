import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    open: false
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: true
  },
  build: {
    sourcemap: true,
    target: 'es2020'
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
