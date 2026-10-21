import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    root: '.',
    base: '/',
    publicDir: 'public',
    cacheDir: '.vite',

    envPrefix: 'VITE_',

    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_PORT || 5173),
      strictPort: true,
      open: false,
      cors: true,
      hmr: {
        host: 'localhost',
        port: Number(env.VITE_PORT || 5173)
      },
      watch: {
        usePolling: false
      }
    },

    preview: {
      host: '0.0.0.0',
      port: Number(env.VITE_PREVIEW_PORT || 4173),
      strictPort: true,
      open: false
    },

    optimizeDeps: {
      include: ['vite/client']
    },

    build: {
      target: 'es2020',
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: true,
      cssCodeSplit: true,
      modulePreload: {
        polyfill: false
      },
      rollupOptions: {
        output: {
          manualChunks: undefined,
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js'
        }
      }
    },

    resolve: {
      alias: {
        '@': '/src'
      }
    },

    css: {
      devSourcemap: true,
      modules: {
        generateScopedName: '[local]__[hash:base64:5]'
      }
    },

    define: {
      __APP_TITLE__: JSON.stringify(env.VITE_APP_TITLE || 'Virat Kohli Fan Site')
    }
  }
})
