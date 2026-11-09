import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com', //нужно написать наш домен
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    css: {
      devSourcemap: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
});
