import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { webUpdateNotice } from '@plugin-web-update-notification/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    webUpdateNotice({
    logVersion: true,
  }),],
  resolve: {
    // 路径别名
    extensions: [
      ".mjs",
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".json",
      ".sass",
      ".scss",
    ], // 忽略输入的扩展名
    alias: [
      { find: /^~/, replacement: "" },
      { find: "@", replacement: resolve(__dirname, "src") },
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
  },
  // build: {
  //   rollupOptions: {
  //     external: ["rc-util/es/hooks/useEvent"],
  //   },
  // },
});
