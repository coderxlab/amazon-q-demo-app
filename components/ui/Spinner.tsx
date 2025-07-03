import React from 'react'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  color = 'border-[#FF9090]' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className={`${sizeClasses[size]} border-2 ${color} border-t-transparent rounded-full animate-spin`} />
  )
}

export default Spinner