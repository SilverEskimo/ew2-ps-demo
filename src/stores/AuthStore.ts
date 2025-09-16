import { makeAutoObservable, runInAction } from 'mobx'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  accessToken: string | null
  refreshToken: string | null
}

export class AuthStore {
  isAuthenticated = false
  user: User | null = null
  accessToken: string | null = null
  refreshToken: string | null = null
  isLoading = false
  error: string | null = null

  constructor() {
    makeAutoObservable(this)
    this.loadAuthState()
  }

  private loadAuthState() {
    const savedToken = localStorage.getItem('accessToken')
    const savedUser = localStorage.getItem('user')
    
    if (savedToken && savedUser) {
      try {
        this.accessToken = savedToken
        this.user = JSON.parse(savedUser)
        this.isAuthenticated = true
      } catch (error) {
        this.clearAuth()
      }
    }
  }

  async login(email: string, password: string) {
    this.isLoading = true
    this.error = null

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      
      runInAction(() => {
        this.user = data.user
        this.accessToken = data.accessToken
        this.refreshToken = data.refreshToken
        this.isAuthenticated = true
        this.isLoading = false
        
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        localStorage.setItem('user', JSON.stringify(data.user))
      })
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Login failed'
        this.isLoading = false
      })
      throw error
    }
  }

  async loginWithGoogle(containerId?: string) {
    this.isLoading = true
    this.error = null

    try {
      // Real Google OAuth implementation
      const { getGoogleAuthService } = await import('../services/GoogleAuthService')
      
      const googleAuth = getGoogleAuthService()
      const { user, tokens } = await googleAuth.authenticateUser(containerId)
      
      runInAction(() => {
        this.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.picture,
          createdAt: new Date(),
        }
        this.accessToken = tokens.id_token // Use ID token for Fireblocks EW SDK
        this.isAuthenticated = true
        this.isLoading = false
        
        localStorage.setItem('accessToken', tokens.id_token)
        localStorage.setItem('user', JSON.stringify(this.user))
        
        console.log('✅ AuthStore: User authenticated successfully:', this.user)
        console.log('✅ AuthStore: isAuthenticated =', this.isAuthenticated)
      })
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Google login failed'
        this.isLoading = false
      })
      throw error
    }
  }

  async logout() {
    try {
      // For Google OAuth, we only need to clear client-side state
      // No backend API call needed since this is a frontend-only app
      console.log('🔓 Logging out user')
      
      // Optional: Revoke Google access token if using real Google OAuth
      if (this.accessToken && this.user?.id !== 'demo-user') {
        // You could revoke the token with Google here if needed:
        // await fetch(`https://oauth2.googleapis.com/revoke?token=${this.accessToken}`, { method: 'POST' })
        console.log('🔑 Access token cleared')
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      this.clearAuth()
    }
  }

  clearAuth() {
    this.user = null
    this.accessToken = null
    this.refreshToken = null
    this.isAuthenticated = false
    this.error = null
    
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  }

  async refreshAccessToken() {
    if (!this.refreshToken) {
      this.clearAuth()
      throw new Error('No refresh token available')
    }

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      })

      if (!response.ok) {
        throw new Error('Token refresh failed')
      }

      const data = await response.json()
      
      runInAction(() => {
        this.accessToken = data.accessToken
        localStorage.setItem('accessToken', data.accessToken)
      })

      return data.accessToken
    } catch (error) {
      this.clearAuth()
      throw error
    }
  }

  setUser(user: User) {
    this.user = user
    this.isAuthenticated = true
    localStorage.setItem('user', JSON.stringify(user))
  }

  get isLoggedIn() {
    return this.isAuthenticated && !!this.user
  }
}