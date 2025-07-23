import { vi } from 'vitest'

// Mock Firebase Auth
export const mockAuth = {
  currentUser: null,
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn()
}

export const getAuth = vi.fn(() => mockAuth)
export const signInWithEmailAndPassword = vi.fn()
export const createUserWithEmailAndPassword = vi.fn()
export const onAuthStateChanged = vi.fn()
export const signOut = vi.fn()

// Mock Firebase Database
export const mockDatabase = {
  ref: vi.fn(() => ({
    on: vi.fn(),
    once: vi.fn(),
    set: vi.fn(),
    push: vi.fn(),
    remove: vi.fn(),
    off: vi.fn()
  }))
}

export const getDatabase = vi.fn(() => mockDatabase)
export const ref = vi.fn()
export const set = vi.fn()
export const get = vi.fn()
export const push = vi.fn()
export const remove = vi.fn()
export const onValue = vi.fn()
export const off = vi.fn()
export const serverTimestamp = vi.fn(() => new Date().toISOString())

// Mock Firebase App
export const initializeApp = vi.fn()
export const getApp = vi.fn()