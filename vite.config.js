import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  clearScreen: false,

  server: {
    port: 1420,
    strictPort: true,
    host: host || false,

    proxy: {
      "/openclaw": {
        target: "http://127.0.0.1:18789",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/openclaw/, ""),
      },
    },

    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,

    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
}));