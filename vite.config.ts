import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import usePluginImport from 'vite-plugin-importer';
import {resolve} from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),
        usePluginImport({
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
        })],
    resolve: {
        // 路径别名
        extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.sass', '.scss'], // 忽略输入的扩展名
        alias: [
            {find: /^~/, replacement: ''},
            {find: '@', replacement: resolve(__dirname, 'src')},
        ],
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    server: {
        open: true,
        port: 3000,
    }
});


