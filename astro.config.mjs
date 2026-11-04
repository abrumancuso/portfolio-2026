import { defineConfig } from 'astro/config';

/**
 * Configuración de AstroJS.
 * El portfolio es estático: no necesita servidor ni variables privadas.
 * `output: 'static'` genera HTML, CSS y JS listos para deploy en GitHub Pages,
 * Vercel, Netlify o cualquier hosting de archivos.
 */
export default defineConfig({
  output: 'static',
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },
});
