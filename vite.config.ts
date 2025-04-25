import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
