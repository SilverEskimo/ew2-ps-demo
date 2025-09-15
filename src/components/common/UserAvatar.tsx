import React from 'react'

interface UserAvatarProps {
  name?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name = 'User',
  size = 'md',
  className = ''
}) => {
  // Get initials from name
  const getInitials = (fullName: string): string => {
    const names = fullName.trim().split(' ')
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase()
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
  }

  // Size classes
  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-12 w-12 text-lg'
  }

  const initials = getInitials(name)

  return (
    <div
      className={`
        ${sizeClasses[size]}
        rounded-full
        bg-blue-600
        text-white
        flex
        items-center
        justify-center
        font-medium
        select-none
        ${className}
      `}
      title={name}
    >
      {initials}
    </div>
  )
}