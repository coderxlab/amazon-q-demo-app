'use client'

import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import type { RegistrationFormData, RegistrationApiRequest } from '@/types/auth'
import { getErrorMessage, getErrorType } from '@/lib/error-utils'

export default function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const router = useRouter()
  const firstErrorRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setFocus,
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  })

  // Focus first field with validation error
  useEffect(() => {
    const firstErrorField = Object.keys(errors)[0] as keyof RegistrationFormData
    if (firstErrorField) {
      setFocus(firstErrorField)
    }
  }, [errors, setFocus])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      e.preventDefault()
      const form = e.target.form
      if (form) {
        const inputs = Array.from(form.querySelectorAll('input, button'))
        const currentIndex = inputs.indexOf(e.target)
        const nextInput = inputs[currentIndex + 1] as HTMLElement
        if (nextInput && nextInput.type !== 'submit') {
          nextInput.focus()
        } else if (nextInput && nextInput.type === 'submit') {
          handleSubmit(onSubmit)()
        }
      }
    }
  }

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true)
    setApiError(null)
    
    try {
      const payload: RegistrationApiRequest = {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
      }

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        router.push('/login?message=Registration successful! Please sign in.')
      } else {
        const error = await response.json()
        const errorMessage = error.error || error.message || 'Registration failed. Please try again.'
        const friendlyMessage = getErrorMessage(errorMessage)
        const errorType = getErrorType(errorMessage)
        
        if (errorType === 'username' || errorType === 'email') {
          setFieldErrors({ [errorType]: friendlyMessage })
          setApiError(null)
          // Focus the field with error
          setTimeout(() => {
            const errorField = document.querySelector(`input[name="${errorType}"]`) as HTMLInputElement
            errorField?.focus()
          }, 100)
        } else {
          setApiError(friendlyMessage)
          setFieldErrors({})
        }
      }
    } catch (error) {
      setApiError('Network error. Please check your connection and try again.')
      setFieldErrors({})
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-[36px] font-[700] leading-[44px] font-montserrat text-[#212427]">
          Sign Up
        </h1>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} action="" method="post" className="space-y-[22px]">
        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4 animate-in slide-in-from-top-2 duration-300">
            {apiError}
          </div>
        )}
        
        {/* First Name */}
        <div className="relative">
          <div className="relative">
            <div className="absolute left-[18px] top-[16px] w-[28px] h-[28px] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="#000000"/>
                <path d="M10 12.5C4.47715 12.5 0 16.9772 0 22.5H20C20 16.9772 15.5228 12.5 10 12.5Z" fill="#000000"/>
              </svg>
            </div>
            <input
              {...register('firstName')}
              type="text"
              placeholder="Enter First Name"
              onKeyDown={handleKeyDown}
              className="w-full h-[60px] pl-[70px] pr-4 border border-[#565454] rounded-[8px] text-[16px] font-[500] font-montserrat placeholder:text-[#999999] text-[#212427] focus:outline-none focus:ring-2 focus:ring-[#FF9090] focus:border-[#FF9090] hover:border-[#FF9090]/50 transition-all duration-200 ease-in-out"
            />
          </div>
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1 animate-in slide-in-from-left-1 duration-200">{errors.firstName.message}</p>
          )}
        </div>
        
        {/* Last Name */}
        <div className="relative">
          <div className="relative">
            <div className="absolute left-[18px] top-[16px] w-[28px] h-[28px] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="#000000"/>
                <path d="M10 12.5C4.47715 12.5 0 16.9772 0 22.5H20C20 16.9772 15.5228 12.5 10 12.5Z" fill="#000000"/>
              </svg>
            </div>
            <input
              {...register('lastName')}
              type="text"
              placeholder="Enter Last Name"
              onKeyDown={handleKeyDown}
              className="w-full h-[60px] pl-[70px] pr-4 border border-[#565454] rounded-[8px] text-[16px] font-[500] font-montserrat placeholder:text-[#999999] text-[#212427] focus:outline-none focus:ring-2 focus:ring-[#FF9090] focus:border-[#FF9090] transition-all duration-200"
            />
          </div>
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
          )}
        </div>
        
        {/* Username */}
        <div className="relative">
          <div className="relative">
            <div className="absolute left-[18px] top-[15px] w-[30px] h-[30px] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="#212427"/>
                <path d="M10 12.5C4.47715 12.5 0 16.9772 0 22.5H20C20 16.9772 15.5228 12.5 10 12.5Z" fill="#212427"/>
              </svg>
            </div>
            <input
              {...register('username')}
              type="text"
              placeholder="Enter Username"
              onKeyDown={handleKeyDown}
              className="w-full h-[60px] pl-[70px] pr-4 border border-[#565454] rounded-[8px] text-[16px] font-[500] font-montserrat placeholder:text-[#999999] text-[#212427] focus:outline-none focus:ring-2 focus:ring-[#FF9090] focus:border-[#FF9090] transition-all duration-200"
            />
          </div>
          {(errors.username || fieldErrors.username) && (
            <p className="text-red-500 text-sm mt-1">
              {fieldErrors.username || errors.username?.message}
            </p>
          )}
        </div>
        
        {/* Email */}
        <div className="relative">
          <div className="relative">
            <div className="absolute left-[18px] top-[15px] w-[30px] h-[30px] flex items-center justify-center">
              <svg width="25" height="20" viewBox="0 0 25 20" fill="none">
                <path d="M22.5 0H2.5C1.125 0 0.0125 1.125 0.0125 2.5L0 17.5C0 18.875 1.125 20 2.5 20H22.5C23.875 20 25 18.875 25 17.5V2.5C25 1.125 23.875 0 22.5 0ZM22.5 5L12.5 11.25L2.5 5V2.5L12.5 8.75L22.5 2.5V5Z" fill="#000000"/>
              </svg>
            </div>
            <input
              {...register('email')}
              type="email"
              placeholder="Enter Email"
              onKeyDown={handleKeyDown}
              className="w-full h-[60px] pl-[70px] pr-4 border border-[#565454] rounded-[8px] text-[16px] font-[500] font-montserrat placeholder:text-[#999999] text-[#212427] focus:outline-none focus:ring-2 focus:ring-[#FF9090] focus:border-[#FF9090] transition-all duration-200"
            />
          </div>
          {(errors.email || fieldErrors.email) && (
            <p className="text-red-500 text-sm mt-1">
              {fieldErrors.email || errors.email?.message}
            </p>
          )}
        </div>
        
        {/* Password */}
        <div className="relative">
          <div className="relative">
            <div className="absolute left-[18px] top-[15px] w-[30px] h-[30px] flex items-center justify-center">
              <svg width="20" height="26" viewBox="0 0 20 26" fill="none">
                <path d="M16 8V6C16 2.69 13.31 0 10 0C6.69 0 4 2.69 4 6V8C2.9 8 2 8.9 2 10V22C2 23.1 2.9 24 4 24H16C17.1 24 18 23.1 18 22V10C18 8.9 17.1 8 16 8ZM10 18C8.9 18 8 17.1 8 16C8 14.9 8.9 14 10 14C11.1 14 12 14.9 12 16C12 17.1 11.1 18 10 18ZM14 8H6V6C6 3.79 7.79 2 10 2C12.21 2 14 3.79 14 6V8Z" fill="#212427"/>
              </svg>
            </div>
            <input
              {...register('password')}
              type="password"
              placeholder="Enter Password"
              onKeyDown={handleKeyDown}
              className="w-full h-[60px] pl-[70px] pr-4 border border-[#565454] rounded-[8px] text-[16px] font-[500] font-montserrat placeholder:text-[#999999] text-[#212427] focus:outline-none focus:ring-2 focus:ring-[#FF9090] focus:border-[#FF9090] transition-all duration-200"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        
        {/* Confirm Password */}
        <div className="relative">
          <div className="relative">
            <div className="absolute left-[18px] top-[15px] w-[30px] h-[30px] flex items-center justify-center">
              <svg width="20" height="26" viewBox="0 0 20 26" fill="none">
                <path d="M16 8V6C16 2.69 13.31 0 10 0C6.69 0 4 2.69 4 6V8C2.9 8 2 8.9 2 10V22C2 23.1 2.9 24 4 24H16C17.1 24 18 23.1 18 22V10C18 8.9 17.1 8 16 8ZM10 18C8.9 18 8 17.1 8 16C8 14.9 8.9 14 10 14C11.1 14 12 14.9 12 16C12 17.1 11.1 18 10 18ZM14 8H6V6C6 3.79 7.79 2 10 2C12.21 2 14 3.79 14 6V8Z" fill="#000000"/>
              </svg>
            </div>
            <input
              {...register('confirmPassword')}
              type="password"
              placeholder="Confirm Password"
              onKeyDown={handleKeyDown}
              className="w-full h-[60px] pl-[70px] pr-4 border border-[#565454] rounded-[8px] text-[16px] font-[500] font-montserrat placeholder:text-[#999999] text-[#212427] focus:outline-none focus:ring-2 focus:ring-[#FF9090] focus:border-[#FF9090] transition-all duration-200"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>
        
        {/* Terms Checkbox */}
        <div className="flex items-start gap-[12px] mt-[31px]">
          <input
            {...register('acceptTerms')}
            type="checkbox"
            id="acceptTerms"
            onKeyDown={handleKeyDown}
            className="mt-[1px] w-[18px] h-[18px] border border-[#565454] rounded-sm focus:ring-2 focus:ring-[#FF9090] accent-[#FF9090]"
          />
          <label htmlFor="acceptTerms" className="text-[16px] font-[500] font-montserrat text-[#212427] leading-[20px]">
            I agree to all terms
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-red-500 text-sm mt-1">{errors.acceptTerms.message}</p>
        )}
        
        {/* Register Button */}
        <div className="mt-[18px]">
          <button
            type="submit"
            disabled={isLoading}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(onSubmit)()}
            className="w-[129px] h-[60px] bg-[#FF9090] text-[#F8F9FB] rounded-[5px] text-[16px] font-[500] font-montserrat disabled:opacity-50 hover:bg-[#FF9090]/90 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF9090] focus:ring-offset-2"
          >
            <span className={`transition-opacity duration-200 ${isLoading ? 'opacity-70' : 'opacity-100'}`}>
              {isLoading ? 'Creating...' : 'Register'}
            </span>
          </button>
        </div>
        
        {/* Sign In Link */}
        <div className="mt-8">
          <p className="text-[16px] font-[500] font-montserrat text-[#212427] leading-[20px]">
            Already have an account?{' '}
            <a href="/login" className="text-[#212427] hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
  
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'You must agree to the terms and conditions'),
})