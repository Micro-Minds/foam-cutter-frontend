import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 🔁 Ensures correct relative paths in Firebase Hosting
  build: {
    outDir: 'dist', // 🔁 This must match the "public" field in firebase.json
  },
})