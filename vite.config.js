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
          if (typeof globalThis.refreshPublicParties === 'function') {
            window.refreshPublicParties = globalThis.refreshPublicParties;
          }
          if (typeof globalThis.sendPartyChat === 'function') {
            window.sendPartyChat = globalThis.sendPartyChat;
          }
          // Additional party-related functions
          if (typeof globalThis.updatePartyDisplay === 'function') {
            window.updatePartyDisplay = globalThis.updatePartyDisplay;
          }
          if (typeof globalThis.updatePartyChat === 'function') {
            window.updatePartyChat = globalThis.updatePartyChat;
          }
          if (typeof globalThis.joinPublicParty === 'function') {
            window.joinPublicParty = globalThis.joinPublicParty;
          }
          if (typeof globalThis.updatePartyLeaderboard === 'function') {
            window.updatePartyLeaderboard = globalThis.updatePartyLeaderboard;
          }
          if (typeof globalThis.handlePartyRequest === 'function') {
            window.handlePartyRequest = globalThis.handlePartyRequest;
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