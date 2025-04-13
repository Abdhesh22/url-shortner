import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    allowedHosts: [
      "url-shortner.local", // Allow this specific host
      "localhost", // Allow localhost as well (optional)
      "0.0.0.0", // Allow all network interfaces (optional)
    ],
  },
});