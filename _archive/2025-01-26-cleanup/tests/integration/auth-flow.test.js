import { describe, it, expect, beforeEach, vi } from 'vitest'
import { fireEvent, waitFor } from '@testing-library/dom'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  mockAuth 
} from '../mocks/firebase.js'

describe('Authentication Flow', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = `
      <div id="authContainer" style="display: flex;">
        <form id="authForm">
          <input id="authEmail" type="email" />
          <input id="authPassword" type="password" />
          <input id="authUsername" type="text" style="display: none;" />
          <button id="authSubmitBtn" type="submit">Login</button>
          <div id="authError"></div>
          <div id="authLoading" class=""></div>
        </form>
      </div>
      <div id="userProfile" style="display: none;"></div>
      <div class="container" style="display: none;"></div>
    `
    
    vi.clearAllMocks()
  })

  describe('Login', () => {
    it('should handle successful login', async () => {
      // Mock successful login
      signInWithEmailAndPassword.mockResolvedValue({
        user: { uid: 'test123', email: 'test@example.com' }
      })
      
      // Fill form
      const emailInput = document.getElementById('authEmail')
      const passwordInput = document.getElementById('authPassword')
      const form = document.getElementById('authForm')
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      
      // Submit form
      fireEvent.submit(form)
      
      // Wait for async operations
      await waitFor(() => {
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
          expect.any(Object),
          'test@example.com',
          'password123'
        )
      })
    })

    it('should show error on failed login', async () => {
      // Mock failed login
      signInWithEmailAndPassword.mockRejectedValue(
        new Error('Invalid credentials')
      )
      
      const form = document.getElementById('authForm')
      fireEvent.submit(form)
      
      await waitFor(() => {
        const errorDiv = document.getElementById('authError')
        expect(errorDiv.textContent).toContain('Invalid')
      })
    })

    it('should show loading state during login', async () => {
      signInWithEmailAndPassword.mockImplementation(() => 
        new Promise(resolve => setTimeout(resolve, 100))
      )
      
      const form = document.getElementById('authForm')
      const loadingDiv = document.getElementById('authLoading')
      const submitBtn = document.getElementById('authSubmitBtn')
      
      fireEvent.submit(form)
      
      // Should show loading
      expect(loadingDiv.classList.contains('show')).toBe(true)
      expect(submitBtn.disabled).toBe(true)
    })
  })

  describe('Signup', () => {
    beforeEach(() => {
      // Switch to signup mode
      document.getElementById('authUsername').style.display = 'block'
    })

    it('should validate username during signup', async () => {
      const form = document.getElementById('authForm')
      const usernameInput = document.getElementById('authUsername')
      
      // Empty username
      fireEvent.change(usernameInput, { target: { value: '' } })
      fireEvent.submit(form)
      
      await waitFor(() => {
        const errorDiv = document.getElementById('authError')
        expect(errorDiv.textContent).toContain('Username')
      })
    })

    it('should create account with valid data', async () => {
      createUserWithEmailAndPassword.mockResolvedValue({
        user: { uid: 'newuser123', email: 'new@example.com' }
      })
      
      const emailInput = document.getElementById('authEmail')
      const passwordInput = document.getElementById('authPassword')
      const usernameInput = document.getElementById('authUsername')
      const form = document.getElementById('authForm')
      
      fireEvent.change(emailInput, { target: { value: 'new@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'newpass123' } })
      fireEvent.change(usernameInput, { target: { value: 'newuser' } })
      
      fireEvent.submit(form)
      
      await waitFor(() => {
        expect(createUserWithEmailAndPassword).toHaveBeenCalled()
      })
    })
  })
})