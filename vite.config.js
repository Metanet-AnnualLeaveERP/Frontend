import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    server: {
        open: true,
    },
    // Bryntum 캘린더 설정
    optimizeDeps: {
        // Bryntum components need to resolve either the CommonJS or UMD module types; will throw an error
        // without this
        include: ['@bryntum/calendar-vue-3', '@bryntum/calendar'],
    },
})
