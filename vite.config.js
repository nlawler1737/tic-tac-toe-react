import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: "../tic-tac-toe-online-server/dist"
    },
    plugins: [react()],
})
