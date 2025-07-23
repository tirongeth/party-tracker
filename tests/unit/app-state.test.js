import { describe, it, expect, beforeEach } from 'vitest'
import { 
  getAppState, 
  setStateValue, 
  getCurrentUser, 
  setCurrentUser,
  clearAppState 
} from '../../src/js/config/app-state.js'

describe('App State Module', () => {
  beforeEach(() => {
    // Clear state before each test
    clearAppState()
  })

  describe('getAppState', () => {
    it('should return initial state structure', () => {
      const state = getAppState()
      
      expect(state).toHaveProperty('currentUser')
      expect(state).toHaveProperty('userData')
      expect(state).toHaveProperty('deviceData')
      expect(state).toHaveProperty('friendsData')
      expect(state).toHaveProperty('partyData')
      expect(state).toHaveProperty('drinkHistory')
      expect(state).toHaveProperty('achievements')
    })

    it('should have correct initial values', () => {
      const state = getAppState()
      
      expect(state.currentUser).toBeNull()
      expect(state.userData).toEqual({})
      expect(state.deviceData).toEqual({})
      expect(state.friendsData).toEqual({})
      expect(state.partyData).toEqual({})
      expect(state.drinkHistory).toEqual([])
    })
  })

  describe('setStateValue', () => {
    it('should update state values', () => {
      const testData = { name: 'Test User' }
      setStateValue('userData', testData)
      
      const state = getAppState()
      expect(state.userData).toEqual(testData)
    })

    it('should not affect other state properties', () => {
      const initialState = { ...getAppState() }
      
      setStateValue('userData', { name: 'Test' })
      
      const newState = getAppState()
      expect(newState.deviceData).toEqual(initialState.deviceData)
      expect(newState.friendsData).toEqual(initialState.friendsData)
    })
  })

  describe('User Management', () => {
    it('should set and get current user', () => {
      const mockUser = { 
        uid: 'test123', 
        email: 'test@example.com' 
      }
      
      setCurrentUser(mockUser)
      expect(getCurrentUser()).toEqual(mockUser)
    })

    it('should handle null user', () => {
      setCurrentUser(null)
      expect(getCurrentUser()).toBeNull()
    })
  })

  describe('clearAppState', () => {
    it('should reset all state to initial values', () => {
      // Set some state
      setStateValue('userData', { name: 'Test' })
      setStateValue('drinkHistory', [{ id: 1 }])
      setCurrentUser({ uid: 'test' })
      
      // Clear state
      clearAppState()
      
      // Verify reset
      const state = getAppState()
      expect(state.currentUser).toBeNull()
      expect(state.userData).toEqual({})
      expect(state.drinkHistory).toEqual([])
    })
  })
})