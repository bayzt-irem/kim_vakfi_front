import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "import.meta.env.API_ADDRESS": JSON.stringify(process.env.API_ADDRESS),
  },
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "http:localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
});
