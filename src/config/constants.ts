export const APP_CONFIG = {
  name: 'Fireblocks EW Demo',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  environment: import.meta.env.VITE_APP_ENV || 'development',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),
  headers: {
    'Content-Type': 'application/json',
  },
} as const

export const FIREBLOCKS_CONFIG = {
  apiUrl: import.meta.env.VITE_FIREBLOCKS_API_URL || '',
  clientId: import.meta.env.VITE_FIREBLOCKS_CLIENT_ID || '',
  workspaceId: import.meta.env.VITE_FIREBLOCKS_WORKSPACE_ID || '',
} as const

export const AUTH_CONFIG = {
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  googleRedirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/callback',
  tokenKey: 'accessToken',
  refreshTokenKey: 'refreshToken',
  userKey: 'user',
} as const

export const SECURITY_CONFIG = {
  enableCSP: import.meta.env.VITE_ENABLE_CSP === 'true',
  enableHTTPS: import.meta.env.VITE_ENABLE_HTTPS === 'true',
  csPolicy: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', 'https:'],
    'connect-src': ["'self'", API_CONFIG.baseUrl],
  },
} as const

export const FEATURE_FLAGS = {
  enableDemoMode: import.meta.env.VITE_ENABLE_DEMO_MODE === 'true',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
} as const

export const ROUTES = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
  wallet: '/wallet',
  profile: '/profile',
  notFound: '/404',
} as const

export const LOCAL_STORAGE_KEYS = {
  theme: 'theme',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  user: 'user',
  activeWallet: 'activeWallet',
} as const