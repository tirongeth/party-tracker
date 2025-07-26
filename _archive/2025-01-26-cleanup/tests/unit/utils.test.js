import { describe, it, expect } from 'vitest'

// Simple utility functions to test without Firebase dependencies
export function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function formatBAC(bac) {
  return bac.toFixed(3) + '‰';
}

describe('Utility Functions', () => {
  describe('escapeHtml', () => {
    it('should escape HTML characters', () => {
      expect(escapeHtml('<script>alert("XSS")</script>'))
        .toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;');
    });

    it('should handle empty strings', () => {
      expect(escapeHtml('')).toBe('');
    });

    it('should escape single quotes', () => {
      expect(escapeHtml("it's")).toBe('it&#039;s');
    });
  });

  describe('formatTime', () => {
    it('should format seconds to mm:ss', () => {
      expect(formatTime(65)).toBe('1:05');
      expect(formatTime(120)).toBe('2:00');
      expect(formatTime(5)).toBe('0:05');
    });

    it('should pad seconds with zero', () => {
      expect(formatTime(61)).toBe('1:01');
      expect(formatTime(9)).toBe('0:09');
    });
  });

  describe('formatBAC', () => {
    it('should format BAC with 3 decimal places', () => {
      expect(formatBAC(0.08)).toBe('0.080‰');
      expect(formatBAC(0.123456)).toBe('0.123‰');
    });

    it('should handle zero BAC', () => {
      expect(formatBAC(0)).toBe('0.000‰');
    });
  });
})