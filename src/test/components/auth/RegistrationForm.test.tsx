import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import RegistrationForm from '@/components/auth/RegistrationForm'

// Mock fetch globally
global.fetch = vi.fn()

// Mock router
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('RegistrationForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(global.fetch as any).mockClear()
  })

  describe('Form Validation Tests', () => {
    describe('Email validation', () => {
      it('should show error for invalid email format', async () => {
        render(<RegistrationForm />)
        const emailInput = screen.getByPlaceholderText('Enter Email')
        
        await userEvent.type(emailInput, 'invalid-email')
        await userEvent.tab()
        
        await waitFor(() => {
          expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
        })
      })

      it('should show error for empty email field', async () => {
        render(<RegistrationForm />)
        const emailInput = screen.getByPlaceholderText('Enter Email')
        
        await userEvent.click(emailInput)
        await userEvent.tab()
        
        await waitFor(() => {
          expect(screen.getByText('Email is required')).toBeInTheDocument()
        })
      })

      it('should accept valid email format', async () => {
        render(<RegistrationForm />)
        const emailInput = screen.getByPlaceholderText('Enter Email')
        
        await userEvent.type(emailInput, 'test@example.com')
        await userEvent.tab()
        
        await waitFor(() => {
          expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument()
        })
      })
    })

    describe('Password strength validation', () => {
      it('should show error for password less than 8 characters', async () => {
        render(<RegistrationForm />)
        const passwordInput = screen.getByPlaceholderText('Enter Password')
        
        await userEvent.type(passwordInput, 'short')
        await userEvent.tab()
        
        await waitFor(() => {
          expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument()
        })
      })

      it('should show error for password without lowercase letter', async () => {
        render(<RegistrationForm />)
        const passwordInput = screen.getByPlaceholderText('Enter Password')
        
        await userEvent.type(passwordInput, 'PASSWORD123!')
        await userEvent.tab()
        
        await waitFor(() => {
          expect(screen.getByText('Password must contain at least one lowercase letter')).toBeInTheDocument()
        })
      })

      it('should show error for password without uppercase letter', async () => {
        render(<RegistrationForm />)
        const passwordInput = screen.getByPlaceholderText('Enter Password')
        
        await userEvent.type(passwordInput, 'password123!')
        await userEvent.tab()
        
        await waitFor(() => {
          expect(screen.getByText('Password must contain at least one uppercase letter')).toBeInTheDocument()
        })
      })

      it('should show error for password without number', async () => {
        render(<RegistrationForm />)
        const passwordInput = screen.getByPlaceholderText('Enter Password')
        
        await userEvent.type(passwordInput, 'Password!')
        await userEvent.tab()
        
        await waitFor(() => {
          expect(screen.getByText('Password must contain at least one number')).toBeInTheDocument()
        })
      })

      it('should show error for password without special character', async () => {
        render(<RegistrationForm />)
        const passwordInput = screen.getByPlaceholderText('Enter Password')
        
        await userEvent.type(passwordInput, 'Password123')
        await userEvent.tab()
        
        await waitFor(() => {
          expect(screen.getByText('Password must contain at least one special character')).toBeInTheDocument()
        })
      })

      it('should accept strong password', async () => {
        render(<RegistrationForm />)
        const passwordInput = screen.getByPlaceholderText('Enter Password')
        
        await userEvent.type(passwordInput, 'Password123!')
        await userEvent.tab()
        
        await waitFor(() => {
          expect(screen.queryByText(/Password must/)).not.toBeInTheDocument()
        })
      })
    })

    describe('Password confirmation matching', () => {
      it('should show error when passwords do not match', async () => {
        render(<RegistrationForm />)
        const passwordInput = screen.getByPlaceholderText('Enter Password')
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password')
        
        await userEvent.type(passwordInput, 'Password123!')
        await userEvent.type(confirmPasswordInput, 'DifferentPassword123!')
        await userEvent.tab()
        
        await waitFor(() => {
          expect(screen.getByText('Passwords must match')).toBeInTheDocument()
        })
      })

      it('should not show error when passwords match', async () => {
        render(<RegistrationForm />)
        const passwordInput = screen.getByPlaceholderText('Enter Password')
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password')
        
        await userEvent.type(passwordInput, 'Password123!')
        await userEvent.type(confirmPasswordInput, 'Password123!')
        await userEvent.tab()
        
        await waitFor(() => {
          expect(screen.queryByText('Passwords must match')).not.toBeInTheDocument()
        })
      })
    })

    describe('Username validation', () => {
      it('should show error for username less than 3 characters', async () => {
        render(<RegistrationForm />)
        const usernameInput = screen.getByPlaceholderText('Enter Username')
        
        await userEvent.type(usernameInput, 'ab')
        await userEvent.tab()
        
        await waitFor(() => {
          expect(screen.getByText('Username must be at least 3 characters')).toBeInTheDocument()
        })
      })

      it('should show error for username with special characters', async () => {
        render(<RegistrationForm />)
        const usernameInput = screen.getByPlaceholderText('Enter Username')
        
        await userEvent.type(usernameInput, 'user@name')
        await userEvent.tab()
        
        await waitFor(() => {
          expect(screen.getByText('Username can only contain letters, numbers, and underscores')).toBeInTheDocument()
        })
      })

      it('should show error for empty username', async () => {
        render(<RegistrationForm />)
        const usernameInput = screen.getByPlaceholderText('Enter Username')
        
        await userEvent.click(usernameInput)
        await userEvent.tab()
        
        await waitFor(() => {
          expect(screen.getByText('Username is required')).toBeInTheDocument()
        })
      })

      it('should accept valid username', async () => {
        render(<RegistrationForm />)
        const usernameInput = screen.getByPlaceholderText('Enter Username')
        
        await userEvent.type(usernameInput, 'valid_username123')
        await userEvent.tab()
        
        await waitFor(() => {
          expect(screen.queryByText(/Username/)).not.toBeInTheDocument()
        })
      })
    })

    describe('Required field validation', () => {
      it('should show error for empty first name', async () => {
        render(<RegistrationForm />)
        const firstNameInput = screen.getByPlaceholderText('Enter First Name')
        
        await userEvent.click(firstNameInput)
        await userEvent.tab()
        
        await waitFor(() => {
          expect(screen.getByText('First name is required')).toBeInTheDocument()
        })
      })

      it('should show error for empty last name', async () => {
        render(<RegistrationForm />)
        const lastNameInput = screen.getByPlaceholderText('Enter Last Name')
        
        await userEvent.click(lastNameInput)
        await userEvent.tab()
        
        await waitFor(() => {
          expect(screen.getByText('Last name is required')).toBeInTheDocument()
        })
      })
    })

    describe('Terms checkbox validation', () => {
      it('should show error when terms checkbox is not checked', async () => {
        render(<RegistrationForm />)
        const checkbox = screen.getByRole('checkbox', { name: /I agree to all terms/i })
        
        await userEvent.click(checkbox)
        await userEvent.click(checkbox) // Uncheck
        await userEvent.tab()
        
        await waitFor(() => {
          expect(screen.getByText('You must agree to the terms and conditions')).toBeInTheDocument()
        })
      })

      it('should not show error when terms checkbox is checked', async () => {
        render(<RegistrationForm />)
        const checkbox = screen.getByRole('checkbox', { name: /I agree to all terms/i })
        
        await userEvent.click(checkbox)
        await userEvent.tab()
        
        await waitFor(() => {
          expect(screen.queryByText('You must agree to the terms and conditions')).not.toBeInTheDocument()
        })
      })
    })
  })

  describe('Component Behavior Tests', () => {
    const validFormData = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe123',
      email: 'john@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
    }

    const fillValidForm = async () => {
      await userEvent.type(screen.getByPlaceholderText('Enter First Name'), validFormData.firstName)
      await userEvent.type(screen.getByPlaceholderText('Enter Last Name'), validFormData.lastName)
      await userEvent.type(screen.getByPlaceholderText('Enter Username'), validFormData.username)
      await userEvent.type(screen.getByPlaceholderText('Enter Email'), validFormData.email)
      await userEvent.type(screen.getByPlaceholderText('Enter Password'), validFormData.password)
      await userEvent.type(screen.getByPlaceholderText('Confirm Password'), validFormData.confirmPassword)
      await userEvent.click(screen.getByRole('checkbox', { name: /I agree to all terms/i }))
    }

    it('should submit form with valid data', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      })

      render(<RegistrationForm />)
      await fillValidForm()
      
      const submitButton = screen.getByRole('button', { name: /Register/i })
      await userEvent.click(submitButton)
      
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: validFormData.email,
            password: validFormData.password,
            firstName: validFormData.firstName,
            lastName: validFormData.lastName,
            username: validFormData.username,
          }),
        })
      })
    })

    it('should not submit form with invalid data', async () => {
      render(<RegistrationForm />)
      
      // Fill only some fields
      await userEvent.type(screen.getByPlaceholderText('Enter First Name'), 'John')
      await userEvent.type(screen.getByPlaceholderText('Enter Email'), 'invalid-email')
      
      const submitButton = screen.getByRole('button', { name: /Register/i })
      await userEvent.click(submitButton)
      
      expect(global.fetch).not.toHaveBeenCalled()
    })

    it('should show loading state during submission', async () => {
      ;(global.fetch as any).mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))

      render(<RegistrationForm />)
      await fillValidForm()
      
      const submitButton = screen.getByRole('button', { name: /Register/i })
      await userEvent.click(submitButton)
      
      expect(screen.getByText('Creating...')).toBeInTheDocument()
      expect(submitButton).toBeDisabled()
    })

    it('should display API error messages', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Email already exists' }),
      })

      render(<RegistrationForm />)
      await fillValidForm()
      
      const submitButton = screen.getByRole('button', { name: /Register/i })
      await userEvent.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/Email already exists/i)).toBeInTheDocument()
      })
    })
    
    it('should focus first field with validation error', async () => {
      render(<RegistrationForm />)
      
      // Try to submit empty form
      const submitButton = screen.getByRole('button', { name: /Register/i })
      await userEvent.click(submitButton)
      
      await waitFor(() => {
        const firstNameInput = screen.getByPlaceholderText('Enter First Name')
        expect(firstNameInput).toHaveFocus()
      })
    })
  })

  describe('Input Focus and Blur Behaviors', () => {
    it('should apply focus styles when input is focused', async () => {
      render(<RegistrationForm />)
      const emailInput = screen.getByPlaceholderText('Enter Email')
      
      await userEvent.click(emailInput)
      
      expect(emailInput).toHaveFocus()
      expect(emailInput).toHaveClass('focus:ring-2', 'focus:ring-[#FF9090]')
    })

    it('should validate on blur', async () => {
      render(<RegistrationForm />)
      const emailInput = screen.getByPlaceholderText('Enter Email')
      
      await userEvent.type(emailInput, 'invalid-email')
      await userEvent.tab()
      
      await waitFor(() => {
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
      })
    })
  })
})