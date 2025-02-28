import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      entities: fileURLToPath(new URL('./src/entities', import.meta.url)),
      features: fileURLToPath(new URL('./src/features', import.meta.url)),
      shared: fileURLToPath(new URL('./src/shared', import.meta.url)),
      widgets: fileURLToPath(new URL('./src/widgets', import.meta.url)),
      pages: fileURLToPath(new URL('./src/pages', import.meta.url)),
    },
  },
});
