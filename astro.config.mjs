import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
import path from 'path';

import vue from '@astrojs/vue';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  //нужно написать наш домен
  site: 'https://example.com',

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

  integrations: [vue()],
});