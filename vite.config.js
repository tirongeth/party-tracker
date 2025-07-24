import { defineConfig, loadEnv } from 'vite'
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'fs'
import { resolve, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
  // Base path for deployment
  base: './',
  
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
  
  
  // Plugins
  plugins: [{
    name: 'copy-icons',
    writeBundle() {
      // Copy icons to dist during build
      const iconsDir = resolve(__dirname, 'icons');
      const distIconsDir = resolve(__dirname, 'dist/icons');
      
      if (!existsSync(distIconsDir)){
        mkdirSync(distIconsDir, { recursive: true });
      }
      
      readdirSync(iconsDir).forEach(file => {
        if (file.endsWith('.png')) {
          copyFileSync(join(iconsDir, file), join(distIconsDir, file));
        }
      });
    }
  }]
  }
})