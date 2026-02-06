import { defineConfig } from 'vite';

const urlSitio = "https://studio2104.github.io/urdimbre-ehe/";

export default defineConfig({
  // Ruta base para GitHub Pages
  base: '/urdimbre-ehe/', 

  define: {
    __URL_SITIO__: JSON.stringify(urlSitio),
  },

  server: {
    port: 3000,
  },
  
  publicDir: 'estaticos',

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    cssCodeSplit: true,
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  }
});