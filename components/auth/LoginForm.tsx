'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Link from 'next/link'
import Image from 'next/image'

interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

const validationSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  rememberMe: yup.boolean()
})

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      // TODO: Integrate with Supabase auth logic
      console.log('Login data:', data)
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-[1236px] bg-white rounded-[10px] shadow-[5px_4px_14px_0px_rgba(0,0,0,0.04),20px_16px_26px_0px_rgba(0,0,0,0.03),45px_36px_34px_0px_rgba(0,0,0,0.02),80px_64px_41px_0px_rgba(0,0,0,0.01),124px_100px_45px_0px_rgba(0,0,0,0)] p-[50px] flex items-center justify-between">
        
        {/* Left Side - Login Form */}
        <div className="w-[559px]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Sign In Heading */}
            <h1 className="font-montserrat font-bold text-[36px] leading-[44px] text-[#212427] mb-[69px]">
              Sign In
            </h1>

            {/* Username/Email Field */}
            <div className="relative">
              <div className="relative">
                <div className="absolute left-[18px] top-[15px] w-[30px] h-[30px] flex items-center justify-center">
                  <Image
                    src="/icons/user.svg"
                    alt="User icon"
                    width={20}
                    height={20}
                    className="text-[#212427]"
                  />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Enter Username"
                  className="w-full h-[60px] pl-[70px] pr-4 border border-[#565454] rounded-[8px] font-montserrat font-medium text-[16px] placeholder-[#999999] focus:outline-none focus:border-[#FF9090] transition-colors"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="relative">
                <div className="absolute left-[18px] top-[15px] w-[30px] h-[30px] flex items-center justify-center">
                  <Image
                    src="/icons/password.svg"
                    alt="Password icon"
                    width={20}
                    height={26.25}
                    className="text-[#212427]"
                  />
                </div>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  className="w-full h-[60px] pl-[70px] pr-[50px] border border-[#565454] rounded-[8px] font-montserrat font-medium text-[16px] placeholder-[#999999] focus:outline-none focus:border-[#FF9090] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[18px] top-[15px] w-[30px] h-[30px] flex items-center justify-center"
                >
                  <Image
                    src="/icons/eye.svg"
                    alt="Toggle password visibility"
                    width={20}
                    height={20}
                    className="text-[#212427]"
                  />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center space-x-[26px]">
              <div className="relative">
                <input
                  {...register('rememberMe')}
                  type="checkbox"
                  id="rememberMe"
                  className="w-[18px] h-[18px] border border-[#565454] rounded-sm appearance-none checked:bg-[#FF9090] checked:border-[#FF9090] focus:outline-none"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg
                    className="w-3 h-3 text-white opacity-0 checked:opacity-100"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <label htmlFor="rememberMe" className="font-montserrat font-medium text-[16px] text-[#212427] cursor-pointer">
                Remember Me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-[129px] h-[60px] bg-[#FF9090] rounded-[5px] font-montserrat font-medium text-[16px] text-[#F8F9FB] hover:bg-[#ff7a7a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>

            {/* Social Login */}
            <div className="flex items-center space-x-4 mt-[67px]">
              <span className="font-montserrat font-medium text-[16px] text-[#212427]">
                Or, Login with
              </span>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="w-[27.74px] h-[27.74px] flex items-center justify-center"
                >
                  <Image
                    src="/icons/google.svg"
                    alt="Login with Google"
                    width={27.74}
                    height={27.74}
                  />
                </button>
                <button
                  type="button"
                  className="w-[25px] h-[25px] flex items-center justify-center"
                >
                  <Image
                    src="/icons/facebook.svg"
                    alt="Login with Facebook"
                    width={25}
                    height={25}
                  />
                </button>
              </div>
            </div>

            {/* Registration Link */}
            <div className="mt-[23px]">
              <Link
                href="/register"
                className="font-montserrat font-medium text-[16px] text-[#212427] hover:text-[#FF9090] transition-colors"
              >
                Don't have an account? Create One
              </Link>
            </div>
          </form>
        </div>

        {/* Right Side - Decorative Image */}
        <div className="w-[613px] h-[613px] flex-shrink-0">
          <Image
            src="/images/login-background.png"
            alt="Login illustration"
            width={613}
            height={613}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}