import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        host: true
    },
    // Mengecualikan folder vendor dari scanning untuk menghindari error
    optimizeDeps: {
        exclude: ['vendor']
    },
    // Konfigurasi build untuk mengabaikan file vendor
    build: {
        rollupOptions: {
            external: ['vendor/**']
        }
    }
})