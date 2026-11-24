import { fileURLToPath } from "node:url";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Static build for GitHub Pages. The game is entirely client-side (saves live in
// localStorage), so it is shipped as a single-page app instead of the Worker.
// Assets are served from https://onkarhere.github.io/C-QUEST-V1/, hence `base`.
export default defineConfig({
  base: "/C-QUEST-V1/",
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  plugins: [
    tanstackStart({
      srcDirectory: "src",
      spa: {
        enabled: true,
        prerender: { outputPath: "/index.html" },
      },
    }),
    react(),
  ],
});
