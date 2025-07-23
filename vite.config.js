import { defineConfig } from 'vite'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

export default defineConfig({
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
  },
  
  // Environment variables configuration
  envPrefix: 'VITE_',     // Only expose env vars starting with VITE_
  
  // Handle static assets
  publicDir: 'public',    // Directory for static files
  
  // Plugin to copy CNAME file
  plugins: [
    {
      name: 'copy-cname',
      closeBundle() {
        try {
          copyFileSync(
            resolve(__dirname, 'CNAME'),
            resolve(__dirname, 'dist/CNAME')
          );
          console.log('CNAME file copied to dist');
        } catch (err) {
          console.error('Failed to copy CNAME:', err);
        }
      }
    }
  ]
})