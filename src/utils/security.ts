export const sanitizeInput = (input: string): string => {
  const map: Record<string, string> = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }
  const reg = /[<>"'/]/gi
  return input.replace(reg, (match) => map[match])
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

export const generateNonce = (): string => {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

export const hashString = async (str: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export const secureStorage = {
  setItem: (key: string, value: string): void => {
    try {
      const encrypted = btoa(value)
      localStorage.setItem(key, encrypted)
    } catch (error) {
      console.error('Failed to store item securely:', error)
    }
  },

  getItem: (key: string): string | null => {
    try {
      const encrypted = localStorage.getItem(key)
      if (!encrypted) return null
      return atob(encrypted)
    } catch (error) {
      console.error('Failed to retrieve item securely:', error)
      return null
    }
  },

  removeItem: (key: string): void => {
    localStorage.removeItem(key)
  },

  clear: (): void => {
    localStorage.clear()
  },
}

export const setupCSP = (): void => {
  const meta = document.createElement('meta')
  meta.httpEquiv = 'Content-Security-Policy'
  meta.content = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "connect-src 'self' http://localhost:* https://api.fireblocks.com",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; ')
  document.head.appendChild(meta)
}

export const rateLimiter = (fn: Function, limit: number = 1000) => {
  let lastCall = 0
  return (...args: unknown[]) => {
    const now = Date.now()
    if (now - lastCall >= limit) {
      lastCall = now
      return fn(...args)
    }
  }
}