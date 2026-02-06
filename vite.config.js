import { defineConfig } from 'vite';

export default defineConfig({
  // Ruta base correcta para tu repositorio
  base: '/urdimbre-ehe/', 

  server: {
    port: 3000,
  },
  
  publicDir: 'estaticos',

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  }
});