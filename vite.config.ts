import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import markdown from '@jackfranklin/rollup-plugin-markdown'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), markdown()],
})