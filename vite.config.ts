import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: 'source',
  base: '',
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