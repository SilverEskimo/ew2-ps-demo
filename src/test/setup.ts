import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(() => null),
    setItem: vi.fn(() => null),
    removeItem: vi.fn(() => null),
    clear: vi.fn(() => null),
  },
  writable: true,
})

// Mock crypto for security utils
Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: vi.fn((arr) => arr.map(() => Math.floor(Math.random() * 256))),
    subtle: {
      digest: vi.fn(() => Promise.resolve(new ArrayBuffer(32))),
    },
  },
})

// Mock btoa/atob for secure storage
global.btoa = vi.fn((str) => Buffer.from(str, 'binary').toString('base64'))
global.atob = vi.fn((str) => Buffer.from(str, 'base64').toString('binary'))