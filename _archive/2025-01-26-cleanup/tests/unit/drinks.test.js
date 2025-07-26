import { describe, it, expect, beforeEach, vi } from 'vitest'
import { calculateBAC, saveDrinkHistory, loadDrinkHistory } from '../../src/js/features/drinks.js'
import { setStateValue } from '../../src/js/config/app-state.js'

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn()
}
global.localStorage = mockLocalStorage

describe('Drinks Module', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setStateValue('drinkHistory', [])
  })

  describe('calculateBAC', () => {
    it('should calculate BAC correctly for a standard beer', () => {
      const drinkHistory = [{
        time: new Date(),
        amount: 330,
        alcohol: 5
      }]
      
      // For a 70kg male
      const bac = calculateBAC(drinkHistory, 70, 'male')
      
      // Should be positive but reasonable
      expect(bac).toBeGreaterThan(0)
      expect(bac).toBeLessThan(0.1)
    })

    it('should return 0 for empty drink history', () => {
      const bac = calculateBAC([], 70, 'male')
      expect(bac).toBe(0)
    })

    it('should account for gender differences', () => {
      const drinkHistory = [{
        time: new Date(),
        amount: 330,
        alcohol: 5
      }]
      
      const bacMale = calculateBAC(drinkHistory, 70, 'male')
      const bacFemale = calculateBAC(drinkHistory, 70, 'female')
      
      // Females typically have higher BAC for same amount
      expect(bacFemale).toBeGreaterThan(bacMale)
    })

    it('should decrease BAC over time', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000)
      const drinkHistory = [{
        time: twoHoursAgo,
        amount: 330,
        alcohol: 5
      }]
      
      const bac = calculateBAC(drinkHistory, 70, 'male')
      
      // Should be lower due to metabolism
      expect(bac).toBeGreaterThan(0)
      expect(bac).toBeLessThan(0.05)
    })
  })

  describe('localStorage operations', () => {
    it('should save drink history to localStorage', () => {
      const testHistory = [
        { id: '1', type: 'beer', amount: 330 },
        { id: '2', type: 'wine', amount: 150 }
      ]
      
      setStateValue('drinkHistory', testHistory)
      saveDrinkHistory()
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'drinkHistory',
        JSON.stringify(testHistory)
      )
    })

    it('should load drink history from localStorage', () => {
      const testHistory = [
        { id: '1', type: 'beer', amount: 330 }
      ]
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(testHistory))
      
      loadDrinkHistory()
      
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('drinkHistory')
    })

    it('should handle missing localStorage data', () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      
      // Should not throw
      expect(() => loadDrinkHistory()).not.toThrow()
    })
  })
})