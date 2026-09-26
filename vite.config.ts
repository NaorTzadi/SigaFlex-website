import { defineConfig, searchForWorkspaceRoot } from "vite";
import react from "@vitejs/plugin-react";
import { ASSETS, FONT_PATHS } from "./src/core/Constants";

function assetPath(path: string): string {
  if (/^[A-Za-z]:\//.test(path)) return path;
  return decodeURIComponent(new URL(path, import.meta.url).pathname).replace(/^\/([A-Za-z]:\/)/, "$1");
}

export default defineConfig({
  plugins: [react()],
  // Temporary local font trial; keep the source in Downloads until selected.
  resolve: {
    alias: Object.fromEntries(Object.entries(FONT_PATHS).map(([name, path]) => [name, assetPath(path)]))
  },
  /* strictPort: the server pins CORS to this exact origin, so a dev server that
     quietly moved to 5174 would fail every request for a reason that looks nothing
     like the cause. Better to refuse to start. */
  server: {
    port: 5173,
    strictPort: true,
    open: true,
    fs: {
      // The header uses the original icon shared with the desktop application.
      allow: [
        searchForWorkspaceRoot("."),
        ...Object.values(FONT_PATHS).map(assetPath),
        ...Object.values(ASSETS).map((url) => decodeURIComponent(new URL(url).pathname).replace(/^\/([A-Za-z]:\/)/, "$1"))
      ]
    }
  }
});
