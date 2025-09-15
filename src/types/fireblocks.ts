// Fireblocks EW SDK Type Definitions

export interface FireblocksConfig {
  authClientId: string
  environment: 'sandbox' | 'production'
}

export interface WalletInfo {
  walletId: string
  deviceId: string
  status: 'initializing' | 'ready' | 'error' | 'demo'
  accountId?: string
}

export interface KeyGenerationResult {
  keyDescriptors: any[]  // Changed from string[] to any[] to handle IKeyDescriptor
  algorithms: string[]
  deviceId: string
}

export interface TransactionRequest {
  assetId: string
  amount: string
  destination: string
}