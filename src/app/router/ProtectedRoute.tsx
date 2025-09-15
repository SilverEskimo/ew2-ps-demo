import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useAuthStore } from '@/app/providers/StoreProvider'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = observer(({ 
  children, 
  redirectTo = '/login' 
}) => {
  const authStore = useAuthStore()
  const location = useLocation()

  console.log('🛡️ ProtectedRoute check:', { 
    isLoggedIn: authStore.isLoggedIn, 
    isAuthenticated: authStore.isAuthenticated,
    hasUser: !!authStore.user,
    currentPath: location.pathname 
  })

  if (!authStore.isLoggedIn) {
    console.log('🔒 ProtectedRoute: Not authenticated, redirecting to', redirectTo)
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  console.log('✅ ProtectedRoute: Authenticated, allowing access')
  return <>{children}</>
})