import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

/**
 * portalAliasPlugin
 *
 * Each portal was originally a standalone app where `@/` pointed to its own
 * `client/` directory. In the shell, `@/` points to the shell's `client/`.
 *
 * This plugin intercepts `@/` imports from within a portal directory and
 * resolves them to that portal's local folder first. If the file doesn't exist
 * there, it falls back to the shell's `client/` (the default `@/` alias), so
 * shared bridges like `@/hooks/useDemoState` still resolve correctly.
 */
function portalAliasPlugin(): Plugin {
  const portals = ["crm", "patient", "analytics", "field", "provider"];
  const extensions = ["", ".ts", ".tsx", "/index.ts", "/index.tsx"];

  return {
    name: "portal-alias",
    resolveId(source, importer) {
      if (!source.startsWith("@/") || !importer) return null;

      for (const portal of portals) {
        const portalRoot = path.resolve(
          __dirname,
          `./client/portals/${portal}`
        );

        if (!importer.startsWith(portalRoot)) continue;

        // Resolve relative to the portal's own root
        const localBase = path.resolve(portalRoot, source.slice(2));

        for (const ext of extensions) {
          const candidate = localBase + ext;
          if (fs.existsSync(candidate)) {
            return candidate;
          }
        }

        // File not found in portal — fall through to the default @/ → client/ alias
        return null;
      }

      return null;
    },
  };
}

export default defineConfig({
  plugins: [portalAliasPlugin(), react()],
  resolve: {
    alias: {
      // Shell-level alias — shared hooks, store, shell components
      "@": path.resolve(__dirname, "./client"),
      // Per-portal aliases (used when portal files explicitly import @crm/…)
      "@crm": path.resolve(__dirname, "./client/portals/crm"),
      "@patient": path.resolve(__dirname, "./client/portals/patient"),
      "@analytics": path.resolve(__dirname, "./client/portals/analytics"),
      "@field": path.resolve(__dirname, "./client/portals/field"),
      "@provider": path.resolve(__dirname, "./client/portals/provider"),
    },
  },
  server: {
    port: 8080,
    host: true,
  },
});
