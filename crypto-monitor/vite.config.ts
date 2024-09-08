import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      VITE_UPSTASH_REDIS_REST_URL: process.env.VITE_UPSTASH_REDIS_REST_URL,
      VITE_UPSTASH_REDIS_REST_TOKEN: process.env.VITE_UPSTASH_REDIS_REST_TOKEN,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
