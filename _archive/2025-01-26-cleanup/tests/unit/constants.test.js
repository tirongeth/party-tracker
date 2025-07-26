import { describe, it, expect } from 'vitest'
import { DRINK_PRESETS, getBACStatus } from '../../src/js/config/constants.js'

describe('Constants Module', () => {
  describe('DRINK_PRESETS', () => {
    it('should have correct beer preset', () => {
      expect(DRINK_PRESETS.beer).toEqual({
        amount: 330,
        alcohol: 5
      })
    })

    it('should have correct wine preset', () => {
      expect(DRINK_PRESETS.wine).toEqual({
        amount: 150,
        alcohol: 12
      })
    })

    it('should have correct shot preset', () => {
      expect(DRINK_PRESETS.shot).toEqual({
        amount: 40,
        alcohol: 40
      })
    })

    it('should have water preset with 0% alcohol', () => {
      expect(DRINK_PRESETS.water.alcohol).toBe(0)
    })
  })

  describe('getBACStatus', () => {
    it('should return sober status for BAC < 0.02', () => {
      const status = getBACStatus(0.01)
      expect(status.label).toBe('Sober')
      expect(status.color).toBe('#00ff88')
      expect(status.emoji).toBe('😊')
    })

    it('should return tipsy status for BAC 0.02-0.05', () => {
      const status = getBACStatus(0.03)
      expect(status.label).toBe('Tipsy')
      expect(status.color).toBe('#ffcc00')
      expect(status.emoji).toBe('😄')
    })

    it('should return drunk status for BAC 0.05-0.08', () => {
      const status = getBACStatus(0.06)
      expect(status.label).toBe('Drunk')
      expect(status.color).toBe('#ff9900')
      expect(status.emoji).toBe('🥴')
    })

    it('should return very drunk status for BAC 0.08-0.15', () => {
      const status = getBACStatus(0.10)
      expect(status.label).toBe('Very Drunk')
      expect(status.color).toBe('#ff6600')
      expect(status.emoji).toBe('🤢')
    })

    it('should return wasted status for BAC >= 0.15', () => {
      const status = getBACStatus(0.20)
      expect(status.label).toBe('Wasted')
      expect(status.color).toBe('#ff0000')
      expect(status.emoji).toBe('🚑')
    })

    it('should handle edge cases correctly', () => {
      expect(getBACStatus(0.02).label).toBe('Tipsy')
      expect(getBACStatus(0.05).label).toBe('Drunk')
      expect(getBACStatus(0.08).label).toBe('Very Drunk')
      expect(getBACStatus(0.15).label).toBe('Wasted')
    })
  })
})