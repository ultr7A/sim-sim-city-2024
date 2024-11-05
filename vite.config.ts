import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: 'source',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './source')
    }
  }
})