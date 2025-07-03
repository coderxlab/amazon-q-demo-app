import React, { forwardRef } from 'react'
import Image from 'next/image'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, error, className = '', ...props }, ref) => {
    return (
      <div className="relative w-full">
        <div className="relative">
          <input
            ref={ref}
            className={`w-full h-[60px] pl-[70px] pr-4 border border-[#565454] rounded-lg bg-white text-[#212427] placeholder-[#999999] font-montserrat font-medium text-base focus:outline-none focus:border-[#FF9090] ${className}`}
            {...props}
          />
          {icon && (
            <div className="absolute left-[18px] top-[15px] w-[30px] h-[30px] flex items-center justify-center">
              <Image
                src={`/icons/${icon}.svg`}
                alt=""
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500 font-montserrat font-medium">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input