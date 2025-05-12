import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      // ビルド後にグラフを自動で開く
      open: true,
    }),
  ],
  server: {
    proxy: {
      "/api": {
        // Node.js のサーバーにリクエストを中継
        target: "http://localhost:3000",
        // CORS（オリジン違い）を避けるためにオリジンを変更
        changeOrigin: true,
      },
    },
  },
});
