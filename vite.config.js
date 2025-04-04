import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    proxy: {
      "/remove_background": ["http://127.0.0.1:5000", "https://nf-image.onrender.com"],
    },
    host: "0.0.0.0"
  },
})