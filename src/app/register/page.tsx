import type { Metadata } from 'next'
import Image from 'next/image'
import RegistrationForm from '@/components/auth/RegistrationForm'

export const metadata: Metadata = {
  title: 'Register - Supabase Auth App',
  description: 'Create your account',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left side - Image */}
      <div className="flex-1 relative flex flex-col justify-end">
        <Image
          src="/images/background-pattern.png"
          alt="Background pattern"
          width={433}
          height={652}
          className="object-cover"
          priority
        />
      </div>
      
      {/* Right side - Form container */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-[450px] bg-white rounded-[10px] px-8 py-[38px]">
          <RegistrationForm />
        </div>
      </div>
    </div>
  )
}