import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useAuthStore, useUIStore, useSDKConsoleStore } from '@/app/providers/StoreProvider'

const GoogleLoginPage: React.FC = observer(() => {
  const authStore = useAuthStore()
  const uiStore = useUIStore()
  const sdkConsoleStore = useSDKConsoleStore()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/wallet-summary'

  useEffect(() => {
    // Set up authentication flow logging
    sdkConsoleStore.setCurrentImplementation('authentication')
    sdkConsoleStore.addLog('authentication', 'info', '🔐 Authentication page loaded')
    sdkConsoleStore.addLog('authentication', 'info', '📋 Available login methods: Google OAuth, Demo mode')
    sdkConsoleStore.addLog('authentication', 'info', '⚙️ Google OAuth client configured')
  }, [sdkConsoleStore])

  const handleGoogleLogin = async () => {
    try {
      // Log the start of real Google OAuth flow
      sdkConsoleStore.addLog('authentication', 'info', '🚀 Initiating real Google OAuth flow')
      sdkConsoleStore.addLog('authentication', 'info', '🔧 Loading Google Identity Services script...')
      
      // Call the real Google OAuth login from AuthStore
      await authStore.loginWithGoogle()
      
      console.log('🎉 GoogleLoginPage: OAuth completed successfully')
      console.log('🔍 AuthStore state:', { 
        isAuthenticated: authStore.isAuthenticated, 
        user: authStore.user 
      })
      
      sdkConsoleStore.addLog('authentication', 'success', '✅ Google OAuth authentication successful!')
      sdkConsoleStore.addLog('authentication', 'info', '🎫 Received real Google ID token')
      sdkConsoleStore.addLog('authentication', 'info', '💾 User session established with real credentials')
      
      uiStore.addNotification({
        type: 'success',
        title: 'Google login successful',
        message: 'Welcome to Fireblocks EW!',
      })
      
      console.log('🧭 GoogleLoginPage: Navigating to:', from)
      navigate(from, { replace: true })
      console.log('✅ GoogleLoginPage: Navigation called')
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      sdkConsoleStore.addLog('authentication', 'error', '❌ Google OAuth failed: ' + errorMessage)
      
      uiStore.addNotification({
        type: 'error',
        title: 'Google login failed',
        message: errorMessage.includes('credentials') 
          ? 'Please update your Google Console redirect URI to: http://localhost:5173/auth/callback'
          : 'Please try again',
      })
    }
  }

  const handleDemoLogin = () => {
    authStore.setUser({
      id: 'demo-user',
      email: 'demo@fireblocks.com',
      name: 'Demo User',
      createdAt: new Date(),
    })
    uiStore.addNotification({
      type: 'success',
      title: 'Demo login successful',
      message: 'Welcome to the Fireblocks EW Demo!',
    })
    navigate(from, { replace: true })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <i className="fa-solid fa-shield-halved text-6xl text-blue-600 mb-6"></i>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Fireblocks
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Embedded Wallet Demo
          </p>
          <p className="text-sm text-gray-500">
            Experience enterprise-grade cryptocurrency wallet integration
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-lg rounded-lg space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-4">
              Sign in to continue
            </h3>
            
            <button
              onClick={handleGoogleLogin}
              disabled={authStore.isLoading}
              className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {authStore.isLoading ? 'Signing in...' : 'Continue with Google'}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <div>
            <button
              onClick={handleDemoLogin}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <i className="fa-solid fa-play mr-2"></i>
              Try Demo (No Login Required)
            </button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to Fireblocks'
              <br />
              <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a> and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
})

export default GoogleLoginPage