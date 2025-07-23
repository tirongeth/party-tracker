import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'

export default defineConfig({
  test: {
    // Use jsdom for DOM testing
    environment: 'jsdom',
    
    // Setup files to run before tests
    setupFiles: ['./tests/setup.js'],
    
    // Global test APIs (like Jest)
    globals: true,
    
    // Coverage configuration
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        ...configDefaults.exclude,
        'tests/**',
        '**/*.config.js',
        '**/mockData.js'
      ]
    },
    
    // Test file patterns
    include: ['tests/**/*.test.js', 'src/**/*.test.js']
  },
  resolve: {
    alias: {
      // Mock Firebase for testing
      'firebase/app': '/tests/mocks/firebase.js',
      'firebase/auth': '/tests/mocks/firebase.js',
      'firebase/database': '/tests/mocks/firebase.js'
    }
  }
})