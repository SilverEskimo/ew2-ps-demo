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
  private tokenClient: google.accounts.oauth2.TokenClient | null = null
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

  // Initialize Google OAuth client
  async initializeClient(): Promise<void> {
    await this.loadGoogleScript()
    
    if (!window.google?.accounts?.oauth2) {
      throw new Error('Google Identity Services not available')
    }

    this.tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: this.clientId,
      scope: 'openid email profile',
      callback: '', // Will be set when requesting token
      // No redirect_uri needed for popup flow
      include_granted_scopes: true,
    })
  }

  // Request access token with popup
  async requestAccessToken(): Promise<GoogleTokenResponse> {
    if (!this.tokenClient) {
      await this.initializeClient()
    }

    return new Promise((resolve, reject) => {
      if (!this.tokenClient) {
        reject(new Error('Token client not initialized'))
        return
      }

      console.log('🔵 GoogleAuthService: Setting up token callback...')

      this.tokenClient.callback = (response: any) => {
        console.log('🔵 GoogleAuthService: Received OAuth response:', response)
        
        if (response.error) {
          console.error('❌ GoogleAuthService: OAuth error:', response.error)
          reject(new Error(`Google OAuth error: ${response.error}`))
          return
        }
        
        console.log('✅ GoogleAuthService: OAuth successful, got tokens')
        resolve(response)
      }

      console.log('🔵 GoogleAuthService: Requesting access token...')
      try {
        this.tokenClient.requestAccessToken({
          prompt: 'consent',
        })
        console.log('🔵 GoogleAuthService: requestAccessToken called')
      } catch (error) {
        console.error('❌ GoogleAuthService: Failed to request access token:', error)
        reject(error)
      }
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

  // Complete OAuth flow - returns user info and tokens
  async authenticateUser(): Promise<{
    user: GoogleUser
    tokens: GoogleTokenResponse
  }> {
    // Initialize client if not already done
    if (!this.tokenClient) {
      await this.initializeClient()
    }

    // Request tokens
    const tokens = await this.requestAccessToken()
    console.log('🔍 OAuth tokens received:', tokens)

    // Check if we have id_token, if not get user info from API
    let user: GoogleUser
    if (tokens.id_token) {
      console.log('✅ Using ID token to get user info')
      user = this.decodeIdToken(tokens.id_token)
    } else {
      console.log('⚠️ No ID token, fetching user info from API')
      user = await this.getUserInfo(tokens.access_token)
    }

    console.log('👤 User info:', user)
    
    // For Fireblocks EW SDK, we can use access_token if no id_token
    const finalTokens = {
      ...tokens,
      id_token: tokens.id_token || tokens.access_token // Fallback to access_token
    }

    return { user, tokens: finalTokens }
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