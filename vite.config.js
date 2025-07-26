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
    name: 'copy-logo-assets',
    writeBundle() {
      // Copy logo and PWA icons to dist during build
      const logoDir = resolve(__dirname, 'logo');
      const pwaIconsDir = resolve(__dirname, 'logo/pwa-icons');
      const distLogoDir = resolve(__dirname, 'dist/logo');
      const distPwaIconsDir = resolve(__dirname, 'dist/logo/pwa-icons');
      
      // Create directories
      if (!existsSync(distLogoDir)){
        mkdirSync(distLogoDir, { recursive: true });
      }
      if (!existsSync(distPwaIconsDir)){
        mkdirSync(distPwaIconsDir, { recursive: true });
      }
      
      // Copy logo files
      readdirSync(logoDir).forEach(file => {
        if (file.endsWith('.png') || file.endsWith('.svg')) {
          copyFileSync(join(logoDir, file), join(distLogoDir, file));
        }
      });
      
      // Copy PWA icons
      if (existsSync(pwaIconsDir)) {
        readdirSync(pwaIconsDir).forEach(file => {
          if (file.endsWith('.png')) {
            copyFileSync(join(pwaIconsDir, file), join(distPwaIconsDir, file));
          }
        });
      }
    }
  }]
  }
})