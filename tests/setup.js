// Test setup file - runs before all tests
import { beforeEach, afterEach, vi } from 'vitest'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn()
}
global.localStorage = localStorageMock

// Mock sessionStorage
global.sessionStorage = localStorageMock

// Reset mocks between tests
beforeEach(() => {
  vi.clearAllMocks()
  localStorage.clear()
})

// Clean up after tests
afterEach(() => {
  document.body.innerHTML = ''
})

// Mock window.location
delete window.location
window.location = { 
  reload: vi.fn(),
  href: '',
  pathname: '/'
}

// Mock notifications
global.showNotification = vi.fn()

// Mock console methods to reduce test noise
global.console = {
  ...console,
  log: vi.fn(),
  error: vi.fn(),
  warn: vi.fn()
}