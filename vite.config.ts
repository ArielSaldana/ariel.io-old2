import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import markdown from '@jackfranklin/rollup-plugin-markdown'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            external: ["jss-plugin-globalThis"],
        },
    },
    define: {
        global: 'window',
    },
    plugins: [react(), markdown()],
})