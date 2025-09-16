// Google OAuth Service using Google Identity Services
// This service handles real Google OAuth authentication

export interface GoogleUser {
  id: string
  email: string
  name: string
  picture: string
  given_name: string
  family_name: string
}

export interface GoogleTokenResponse {
  access_token: string
  id_token: string
  expires_in: number
  scope: string
  token_type: string
}

export class GoogleAuthService {
  private isScriptLoaded = false

  constructor(private clientId: string) {}

  // Load Google Identity Services script
  async loadGoogleScript(): Promise<void> {
    if (this.isScriptLoaded) return

    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      
      script.onload = () => {
        this.isScriptLoaded = true
        resolve()
      }
      
      script.onerror = () => {
        reject(new Error('Failed to load Google Identity Services script'))
      }
      
      document.head.appendChild(script)
    })
  }

  // Initialize Google OAuth client with ID token support
  async initializeClient(): Promise<void> {
    await this.loadGoogleScript()

    if (!window.google?.accounts?.id) {
      throw new Error('Google Identity Services not available')
    }

    // Initialize Google Sign-In to get real ID tokens
    window.google.accounts.id.initialize({
      client_id: this.clientId,
      callback: (response: any) => {
        // This will be handled by the promise in authenticateUser
        console.log('📋 Received credential response:', response.credential ? 'ID token received' : 'No credential')
      },
      auto_select: false,
      cancel_on_tap_outside: false,
      use_fedcm_for_prompt: false // Disable FedCM to avoid CORS issues
    })
  }

  // Get real ID token from Google using One Tap
  async getIdToken(): Promise<string> {
    await this.initializeClient()

    return new Promise((resolve, reject) => {
      let resolved = false

      if (!window.google?.accounts?.id) {
        reject(new Error('Google Identity Services not available'))
        return
      }

      // Set up the callback to capture the ID token
      window.google.accounts.id.initialize({
        client_id: this.clientId,
        callback: (response: any) => {
          if (!resolved && response.credential) {
            resolved = true
            console.log('✅ Real ID token received from Google One Tap')
            resolve(response.credential)
          }
        },
        auto_select: false,
        cancel_on_tap_outside: false
      })

      // Use the prompt method directly
      window.google.accounts.id.prompt((notification: any) => {
        console.log('🔔 Google One Tap notification:', notification.getMomentType())

        if (!resolved) {
          if (notification.isNotDisplayed()) {
            resolved = true
            reject(new Error('Google One Tap was not displayed - user may need to enable third-party cookies'))
          } else if (notification.isSkippedMoment()) {
            resolved = true
            reject(new Error('Google One Tap was skipped by user'))
          } else if (notification.isDismissedMoment()) {
            resolved = true
            reject(new Error('Google One Tap was dismissed by user'))
          }
        }
      })

      // Timeout after 10 seconds
      setTimeout(() => {
        if (!resolved) {
          resolved = true
          reject(new Error('Google One Tap timeout'))
        }
      }, 10000)
    })
  }

  // Get user info from Google API
  async getUserInfo(accessToken: string): Promise<GoogleUser> {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.statusText}`)
    }

    return await response.json()
  }

  // Decode ID token to get user info (client-side)
  decodeIdToken(idToken: string): GoogleUser {
    try {
      const payload = JSON.parse(atob(idToken.split('.')[1]))
      return {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        given_name: payload.given_name,
        family_name: payload.family_name,
      }
    } catch (error) {
      throw new Error('Invalid ID token')
    }
  }

  // Sign out user
  async signOut(): Promise<void> {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect()
    }
  }

  // Render Google Sign-In button in existing element
  async renderGoogleButton(containerId: string): Promise<string> {
    await this.initializeClient()

    return new Promise((resolve, reject) => {
      const container = document.getElementById(containerId)
      if (!container) {
        reject(new Error(`Container element with id '${containerId}' not found`))
        return
      }

      if (!window.google?.accounts?.id) {
        reject(new Error('Google Identity Services not available'))
        return
      }

      // Set up the callback
      window.google.accounts.id.initialize({
        client_id: this.clientId,
        callback: (response: any) => {
          if (response.credential) {
            console.log('✅ Real ID token received from Google button')
            resolve(response.credential)
          } else {
            reject(new Error('No credential received'))
          }
        }
      })

      // Clear container and render the button
      container.innerHTML = ''
      window.google.accounts.id.renderButton(container, {
        theme: 'filled_blue',
        size: 'large',
        type: 'standard',
        text: 'signin_with',
        width: container.offsetWidth || 300
      })
    })
  }

  // Complete authentication flow with real Google ID token
  async authenticateUser(containerId?: string): Promise<{
    user: GoogleUser
    tokens: GoogleTokenResponse
  }> {
    try {
      console.log('🔐 Getting real ID token from Google Sign-In...')

      // Use Google button in specified container (no modal fallback)
      const idToken = await this.renderGoogleButton(containerId || 'google-signin-container')

      console.log('🎫 Real ID token received:', idToken.substring(0, 50) + '...')

      // Verify this is a real JWT
      if (!idToken.startsWith('eyJ')) {
        throw new Error('Invalid ID token format - not a JWT')
      }

      // Decode the real ID token
      const user = this.decodeIdToken(idToken)

      // Debug: Log the ID token claims
      const payload = JSON.parse(atob(idToken.split('.')[1]))
      console.log('🔍 Real ID Token Claims:', {
        iss: payload.iss,
        aud: payload.aud,
        sub: payload.sub,
        email: payload.email,
        exp: new Date(payload.exp * 1000).toISOString(),
        iat: new Date(payload.iat * 1000).toISOString(),
      })

      const tokens: GoogleTokenResponse = {
        access_token: idToken, // Use ID token for Fireblocks
        id_token: idToken,
        expires_in: payload.exp - payload.iat,
        scope: 'openid email profile',
        token_type: 'Bearer'
      }

      return { user, tokens }
    } catch (error) {
      console.error('❌ Google Sign-In completely failed:', error)
      throw new Error(`Google authentication failed: ${error}`)
    }
  }
}

// Singleton instance
let googleAuthService: GoogleAuthService | null = null

export const getGoogleAuthService = (): GoogleAuthService => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  if (!clientId) {
    throw new Error('Google Client ID not configured. Please set VITE_GOOGLE_CLIENT_ID environment variable.')
  }

  if (!googleAuthService) {
    googleAuthService = new GoogleAuthService(clientId)
  }

  return googleAuthService
}

// Type declarations for Google Identity Services
declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: any) => google.accounts.oauth2.TokenClient
        }
        id: {
          initialize: (config: any) => void
          renderButton: (element: HTMLElement, config: any) => void
          prompt: (callback?: (notification: any) => void) => void
          disableAutoSelect: () => void
        }
      }
    }
  }
}

declare namespace google.accounts.oauth2 {
  interface TokenClient {
    callback: (response: any) => void
    requestAccessToken: (config?: any) => void
  }
}