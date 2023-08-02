import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@client", replacement: "/src/client" },
      { find: "@server", replacement: "/src/server" },
      { find: "@shared", replacement: "/src/shared" }
    ]
  }
});
