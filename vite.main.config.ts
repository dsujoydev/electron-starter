import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  build: {
    // Configure for native modules like better-sqlite3
    rollupOptions: {
      external: [
        // Tell Vite that better-sqlite3 is external and should not be bundled
        'better-sqlite3'
      ]
    }
  },
  optimizeDeps: {
    // Exclude better-sqlite3 from dependency pre-bundling
    exclude: ['better-sqlite3']
  }
});
