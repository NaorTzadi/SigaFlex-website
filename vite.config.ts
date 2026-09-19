import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  /* strictPort: the server pins CORS to this exact origin, so a dev server that
     quietly moved to 5174 would fail every request for a reason that looks nothing
     like the cause. Better to refuse to start. */
  server: { port: 5173, strictPort: true, open: true }
});
