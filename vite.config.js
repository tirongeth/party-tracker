import { defineConfig, loadEnv } from 'vite'
import { copyFileSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
  // Base path for deployment
  base: './',    // Use relative paths for deployment
  
  // Development server configuration
  server: {
    port: 8000,           // Same port as your Python server
    open: true,           // Automatically open browser
    host: true,           // Allow access from other devices on network
  },
  
  // Build configuration
  build: {
    outDir: 'dist',       // Output directory for production build
    assetsDir: 'assets',  // Directory for static assets
    sourcemap: true,      // Generate source maps for debugging
    rollupOptions: {
      output: {
        // Ensure global functions are preserved
        footer: `
          // Ensure party functions are available globally
          if (typeof globalThis.createNewParty === 'function') {
            window.createNewParty = globalThis.createNewParty;
          }
          if (typeof globalThis.joinPartyByCode === 'function') {
            window.joinPartyByCode = globalThis.joinPartyByCode;
          }
          if (typeof globalThis.leaveCurrentParty === 'function') {
            window.leaveCurrentParty = globalThis.leaveCurrentParty;
          }
        `
      }
    }
  },
  
  // Environment variables configuration
  envPrefix: 'VITE_',     // Only expose env vars starting with VITE_
  
  // Handle static assets
  publicDir: 'public',    // Directory for static files
  
  
  // Plugins
  plugins: []
  }
})