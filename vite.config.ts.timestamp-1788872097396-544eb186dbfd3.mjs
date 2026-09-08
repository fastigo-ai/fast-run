// vite.config.ts
import { defineConfig } from "file:///A:/python%20vs%20code/MAIN%20ZIP/fast-run-main/node_modules/vite/dist/node/index.js";
import react from "file:///A:/python%20vs%20code/MAIN%20ZIP/fast-run-main/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///A:/python%20vs%20code/MAIN%20ZIP/fast-run-main/node_modules/lovable-tagger/dist/index.js";
import viteCompression from "file:///A:/python%20vs%20code/MAIN%20ZIP/fast-run-main/node_modules/vite-plugin-compression/dist/index.mjs";
import { visualizer } from "file:///A:/python%20vs%20code/MAIN%20ZIP/fast-run-main/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var __vite_injected_original_dirname = "A:\\python vs code\\MAIN ZIP\\fast-run-main";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false
    }
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    viteCompression({ algorithm: "brotliCompress" }),
    visualizer({ open: false, gzipSize: true, brotliSize: true })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) {
              return "framer-motion";
            }
            if (id.includes("lucide-react")) {
              return "lucide-react";
            }
            if (id.includes("@radix-ui")) {
              return "radix-ui";
            }
          }
        }
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJBOlxcXFxweXRob24gdnMgY29kZVxcXFxNQUlOIFpJUFxcXFxmYXN0LXJ1bi1tYWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJBOlxcXFxweXRob24gdnMgY29kZVxcXFxNQUlOIFpJUFxcXFxmYXN0LXJ1bi1tYWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9BOi9weXRob24lMjB2cyUyMGNvZGUvTUFJTiUyMFpJUC9mYXN0LXJ1bi1tYWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiO1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiOjpcIixcbiAgICBwb3J0OiA4MDgwLFxuICAgIGhtcjoge1xuICAgICAgb3ZlcmxheTogZmFsc2UsXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksIFxuICAgIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIiAmJiBjb21wb25lbnRUYWdnZXIoKSxcbiAgICB2aXRlQ29tcHJlc3Npb24oeyBhbGdvcml0aG06IFwiYnJvdGxpQ29tcHJlc3NcIiB9KSxcbiAgICB2aXN1YWxpemVyKHsgb3BlbjogZmFsc2UsIGd6aXBTaXplOiB0cnVlLCBicm90bGlTaXplOiB0cnVlIH0pXG4gIF0uZmlsdGVyKEJvb2xlYW4pLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIm5vZGVfbW9kdWxlc1wiKSkge1xuICAgICAgICAgICAgLy8gT25seSBjaHVuayBsYXJnZSBVSSBsaWJyYXJpZXMgZXhwbGljaXRseS5cbiAgICAgICAgICAgIC8vIExlYXZlIFJlYWN0IGFuZCBjb3JlIGxpYnJhcmllcyB0byBWaXRlJ3MgZGVmYXVsdCBjaHVua2luZyB0byBwcmV2ZW50IGV4ZWN1dGlvbiBvcmRlciBlcnJvcnMuXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJmcmFtZXItbW90aW9uXCIpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBcImZyYW1lci1tb3Rpb25cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcImx1Y2lkZS1yZWFjdFwiKSkge1xuICAgICAgICAgICAgICByZXR1cm4gXCJsdWNpZGUtcmVhY3RcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIkByYWRpeC11aVwiKSkge1xuICAgICAgICAgICAgICByZXR1cm4gXCJyYWRpeC11aVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1QsU0FBUyxvQkFBb0I7QUFDclYsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLHVCQUF1QjtBQUNoQyxPQUFPLHFCQUFxQjtBQUM1QixTQUFTLGtCQUFrQjtBQUwzQixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQSxJQUNYO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sU0FBUyxpQkFBaUIsZ0JBQWdCO0FBQUEsSUFDMUMsZ0JBQWdCLEVBQUUsV0FBVyxpQkFBaUIsQ0FBQztBQUFBLElBQy9DLFdBQVcsRUFBRSxNQUFNLE9BQU8sVUFBVSxNQUFNLFlBQVksS0FBSyxDQUFDO0FBQUEsRUFDOUQsRUFBRSxPQUFPLE9BQU87QUFBQSxFQUNoQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixhQUFhLElBQUk7QUFDZixjQUFJLEdBQUcsU0FBUyxjQUFjLEdBQUc7QUFHL0IsZ0JBQUksR0FBRyxTQUFTLGVBQWUsR0FBRztBQUNoQyxxQkFBTztBQUFBLFlBQ1Q7QUFDQSxnQkFBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQy9CLHFCQUFPO0FBQUEsWUFDVDtBQUNBLGdCQUFJLEdBQUcsU0FBUyxXQUFXLEdBQUc7QUFDNUIscUJBQU87QUFBQSxZQUNUO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
