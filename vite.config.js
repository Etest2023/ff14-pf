import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@areas': fileURLToPath(new URL('./src/assets/areas', import.meta.url)),
      '@icons': fileURLToPath(new URL('./src/assets/icons', import.meta.url)),
      '@tasks': fileURLToPath(new URL('./src/assets/tasks', import.meta.url)),
      '@jobs': fileURLToPath(new URL('./src/assets/jobs', import.meta.url)),
    },
  },
  build: {
    assetsInlineLimit: 10240, // 10KB 以下的资源内联为 base64
  },
})
