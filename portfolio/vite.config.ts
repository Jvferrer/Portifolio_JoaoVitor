import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  build: {
    target: "es2022",
  },
  preview: {
    host: true,
    allowedHosts: true,
  },
});
