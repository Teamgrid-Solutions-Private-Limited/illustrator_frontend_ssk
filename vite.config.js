import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Set the base URL for production builds
  base: '/illustrata/embedsolution/',

  server: {
    host: 'localhost', // Change to '0.0.0.0' for external access
    port: 3001,
    fs: {
      allow: ['..'] // Allows serving files from outside the project root
    }
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Shortcut for imports from src
    },
  },
})