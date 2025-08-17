import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {quasar} from '@quasar/vite-plugin'
import {VitePWA} from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
    server: {
        proxy: {
            '/file': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/file/, 'api/v1/file'),
            },
            '/api/v1/users': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
            },
        },
    },
    plugins: [
        vue(),
        quasar(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                id: 'TPSS',
                name: 'Tracker for Production, Sale and Support',
                short_name: 'T.P.S.S.',
                description: 'High customizing issues/tasks tracker for production, sale and support with ERP/CRM features.',
                icons: [
                    {
                        src: '/tpss32.png',
                        sizes: '32x32',
                        type: 'image/png',
                    },
                    {
                        src: '/tpss144.png',
                        sizes: '144x144',
                        type: 'image/png',
                    },
                ],
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
            },
            devOptions: {
                enabled: true,
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
})
