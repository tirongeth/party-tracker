import { exec } from 'child_process';
import { promisify } from 'util';
import { config } from 'dotenv';
import { existsSync } from 'fs';

const execAsync = promisify(exec);

// Load environment variables from .env file
if (existsSync('.env')) {
  config();
  console.log('✅ Loaded environment variables from .env file');
} else {
  console.error('❌ No .env file found! Please create one with your Firebase configuration.');
  process.exit(1);
}

// Verify that all required environment variables are set
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_DATABASE_URL',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_FIREBASE_MEASUREMENT_ID'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars);
  process.exit(1);
}

console.log('🚀 Starting deployment process...');

async function deploy() {
  try {
    // Build the project with environment variables
    console.log('📦 Building project with Vite...');
    await execAsync('npm run build', {
      env: { ...process.env },
      stdio: 'inherit'
    });
    console.log('✅ Build completed successfully');
    
    // Deploy to GitHub Pages
    console.log('🌐 Deploying to GitHub Pages...');
    await execAsync('npx gh-pages -d dist', {
      stdio: 'inherit'
    });
    console.log('✅ Deployment completed successfully!');
    console.log('🎉 Your app should be live at: https://tirongeth.github.io/boozelens/');
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

deploy();