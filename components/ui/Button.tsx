import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ 
  loading = false, 
  children, 
  className = '', 
  disabled,
  ...props 
}) => {
  return (
    <button
      className={`w-[129px] h-[60px] bg-[#FF9090] text-[#F8F9FB] font-montserrat font-medium text-base rounded-[5px] hover:bg-[#FF7070] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export default Button