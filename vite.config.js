import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/illustrata/embedsolution/',

  server: {
    host: 'localhost', 
    port: 3001,
    fs: {
      allow: ['..']
    }
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})