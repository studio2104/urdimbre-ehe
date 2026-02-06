import { defineConfig } from 'vite';
import sitemap from 'vite-plugin-sitemap';

/**
 * CONFIGURACIÓN DE VITE
 *
 * Para GitHub Pages, cambia 'base' según dónde publiques:
 * - Si es un sitio personal (usuario.github.io): base: '/'
 * - Si es en un repositorio: base: '/nombre-repositorio/'
 */

// ⭐ URL DEL SITIO - CAMBIAR AQUÍ
const urlSitio = "https://studio2104.github.io/urdimbre-ehe/"

export default defineConfig({
  // IMPORTANTE: Descomenta y ajusta según donde publiques en GitHub Pages
  base: '/urdimbre-ehe/', // Para proyecto en repositorio

  define: {
    __URL_SITIO__: JSON.stringify(urlSitio),
  },

  server: {
    port: 3000,
  },
  publicDir: 'estaticos',
  build: {
    outDir: 'dist', // GitHub Pages busca aquí por defecto
    assetsDir: 'assets',
    sourcemap: false,
    // Optimizaciones para producción
    minify: 'terser',
    cssCodeSplit: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  plugins: [
    sitemap({
      hostname: urlSitio,
      outDir: 'dist',
      robots: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
      dynamicRoutes: ['/'],
    }),
  ],
});
