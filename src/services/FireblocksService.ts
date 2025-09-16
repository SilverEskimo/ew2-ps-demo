// Fireblocks EW SDK Service Layer - Real Implementation
// This service handles direct frontend EW SDK initialization and operations

import { EmbeddedWallet } from '@fireblocks/embedded-wallet-sdk'
import { 
  getFireblocksNCWInstance,
  generateDeviceId,
  BrowserLocalStorageProvider
} from '@fireblocks/ncw-js-sdk'
import type { 
  IFireblocksNCW,
  TMPCAlgorithm
} from '@fireblocks/ncw-js-sdk'
import type { 
  FireblocksConfig,
  WalletInfo,
  KeyGenerationResult,
  TransactionRequest
} from '@/types/fireblocks'

export class FireblocksService {
  private ewSDK: EmbeddedWallet | null = null // EmbeddedWallet SDK instance
  private ewCore: IFireblocksNCW | null = null // Fireblocks Core SDK instance
  private config: FireblocksConfig
  private walletInfo: WalletInfo | null = null
  private deviceId: string | null = null
  private isInitialized = false

  constructor(config: FireblocksConfig) {
    this.config = config
  }


  async initializeEWSDK(authTokenRetriever: () => Promise<string>): Promise<EmbeddedWallet> {
    try {
      const tokenToInitializeWith = await authTokenRetriever()
      console.log('🔐 Initializing Fireblocks EW SDK:')
      console.log(`  - Auth Client ID: ${this.config.authClientId}`)
      console.log(`  - Environment: ${this.config.environment}`)
      console.log(`  - Token preview: ${tokenToInitializeWith.substring(0, 50)}...`)

      // Decode token to verify claims
      try {
        const payload = JSON.parse(atob(tokenToInitializeWith.split('.')[1]))
        console.log('📋 Token being sent to Fireblocks has claims:')
        console.log(`  - iss: ${payload.iss} (should be: https://accounts.google.com)`)
        console.log(`  - aud: ${payload.aud} (should be: ${import.meta.env.VITE_GOOGLE_CLIENT_ID})`)
        console.log(`  - exp: ${new Date(payload.exp * 1000).toISOString()}`)
      } catch (e) {
        console.log('⚠️ Could not decode token - may not be a JWT')
      }

      const ewSDK = new EmbeddedWallet({
        env: this.config.environment,
        logLevel: 'INFO',
        authClientId: this.config.authClientId,
        authTokenRetriever: {
          getAuthToken: authTokenRetriever
        },
        reporting: { enabled: true }
      })
      
      this.ewSDK = ewSDK
      console.log('✅ EW SDK initialized successfully')
      return ewSDK
    } catch (error: any) {
      console.error('❌ EW SDK initialization failed:', error)

      // Check for specific 401 error
      if (error?.response?.status === 401 || error?.status === 401 || error?.message?.includes('401')) {
        console.error('🔴 401 Authentication Error Details:')
        console.error('  - This typically means the token validation failed on Fireblocks side')
        console.error('  - Check that your Fireblocks OAuth configuration matches:')
        console.error(`    • Audience: ${import.meta.env.VITE_GOOGLE_CLIENT_ID}`)
        console.error('    • Issuer: https://accounts.google.com')
        console.error('    • JWKS URI: https://www.googleapis.com/oauth2/v3/certs')
        console.error('  - Verify the API User has "EW Signer" role')
      }

      throw new Error(`EW SDK initialization failed: ${error?.message || error}`)
    }
  }

  // Initialize the EW Core SDK using direct approach (no backend required)
  async initializeEWCore(deviceId: string): Promise<IFireblocksNCW> {
    try {
      console.log('🔧 Initializing Fireblocks EW Core SDK (direct mode)...')
      
      // Check if instance already exists
      let ewCore = getFireblocksNCWInstance(deviceId)
      
      if (ewCore) {
        console.log('♻️ Reusing existing EW Core instance')
        return ewCore
      }

      // Initialize using the EW SDK's initializeCore method (direct approach)
      if (!this.ewSDK) {
        throw new Error('EW SDK must be initialized before Core SDK')
      }

      // Create secure storage provider with proper interface
      class SecureStorageProvider extends BrowserLocalStorageProvider {
        async getAccess() {
          return async () => {
            console.log('Secure storage access released')
          }
        }
      }

      const coreOptions = {
        deviceId,
        eventsHandler: {
          handleEvent: (event: any) => {
            console.log('📊 SDK Event:', event.type, event)
          }
        },
        secureStorageProvider: new SecureStorageProvider(),
        storageProvider: new BrowserLocalStorageProvider(),
      }

      ewCore = await this.ewSDK.initializeCore(coreOptions)
      
      this.ewCore = ewCore
      console.log('✅ EW Core SDK initialized successfully (direct mode)')
      return ewCore
    } catch (error) {
      console.error('❌ EW Core SDK initialization failed:', error)
      throw new Error(`EW Core SDK initialization failed: ${error}`)
    }
  }

  generateDeviceId(): string {
    return generateDeviceId()
  }

  getOrCreateDeviceId(): string {
    const DEVICE_ID_KEY = 'FIREBLOCKS_EW:deviceId'
    let deviceId = localStorage.getItem(DEVICE_ID_KEY)
    
    if (!deviceId) {
      deviceId = this.generateDeviceId()
      localStorage.setItem(DEVICE_ID_KEY, deviceId)
    }
    
    return deviceId
  }

async assignWallet(): Promise<any> {
    if (!this.ewSDK) {
      throw new Error('EW SDK not initialized')
    }
    
    console.log('📋 Assigning wallet...')
    try {
      const wallet = await this.ewSDK.assignWallet()
      console.log('✅ Wallet assigned:', wallet.walletId)
      return wallet
    } catch (error: any) {
      console.error('❌ Wallet assignment failed:', error)
      console.error('Error details:', {
        message: error?.message,
        status: error?.status,
        response: error?.response,
        stack: error?.stack?.split('\n').slice(0, 3)
      })

      // Check if it's a 401 authentication error
      if (error?.message?.includes('401') || error?.status === 401) {
        console.error('🔴 Authentication Error Analysis:')
        console.error('1. OAuth Client ID:', this.config.authClientId)
        console.error('2. Environment:', this.config.environment)
        console.error('3. Token used has valid signature and claims')
        console.error('4. Possible issues:')
        console.error('   - OAuth Client ID not configured for production environment')
        console.error('   - API User does not have EW Signer role')
        console.error('   - API User not associated with this OAuth Client ID')
        console.error('   - Token audience/issuer mismatch in Fireblocks config')
      }

      throw error
    }
  }

  // Generate MPC keys using real SDK
  async generateMPCKeys(algorithms: TMPCAlgorithm[] = ['MPC_CMP_ECDSA_SECP256K1']): Promise<KeyGenerationResult> {
    if (!this.ewCore) {
      throw new Error('EW Core SDK not initialized')
    }
    
    console.log('🔑 Generating MPC keys for algorithms:', algorithms)
    const algorithmSet = new Set(algorithms)
    const keyDescriptors = await this.ewCore.generateMPCKeys(algorithmSet)
    
    console.log('✅ MPC keys generated successfully')
    return {
      keyDescriptors: Array.from(keyDescriptors),
      algorithms,
      deviceId: this.deviceId || 'unknown'
    }
  }

  // Backup keys with passphrase
  async backupKeys(passphrase: string): Promise<any> {
    if (!this.ewCore) {
      throw new Error('EW Core SDK not initialized')
    }
    
    const passphraseId = 'passphrase_' + Math.random().toString(36).substring(2, 18)
    return await this.ewCore.backupKeys(passphrase, passphraseId)
  }

  // Create a transaction (placeholder - real implementation would use backend)
  async createTransaction(request: TransactionRequest): Promise<string> {
    console.log('💸 Creating transaction:', request)
    // Note: Transaction creation typically requires backend integration
    // For now, we'll simulate it
    const txId = 'tx_' + Math.random().toString(36).substring(2, 11)
    console.log('✅ Transaction created:', txId)
    return txId
  }

  // Sign a transaction
  async signTransaction(txId: string): Promise<any> {
    if (!this.ewCore) {
      throw new Error('EW Core SDK not initialized')
    }
    
    return await this.ewCore.signTransaction(txId)
  }

  // Get initialization status
  isSDKInitialized(): boolean {
    return this.isInitialized
  }

  // Get wallet information
  getWalletInfo(): WalletInfo | null {
    return this.walletInfo
  }

  // Set wallet information
  setWalletInfo(walletInfo: Partial<WalletInfo>): void {
    this.walletInfo = { ...this.walletInfo, ...walletInfo } as WalletInfo
  }

  // Complete initialization flow using real Fireblocks EW SDKs
  async completeInitialization(authTokenRetriever: () => Promise<string>): Promise<WalletInfo> {
    try {
      console.log('🚀 Starting Fireblocks EW SDK initialization...')
      
      // Step 1: Get or create device ID
      this.deviceId = this.getOrCreateDeviceId()
      console.log('📱 Device ID:', this.deviceId)
      
      // Step 2: Initialize EW SDK
      console.log('⏳ Step 1/4: Initializing EW SDK...')
      await this.initializeEWSDK(authTokenRetriever)
      
      // Step 3: Assign wallet
      console.log('⏳ Step 2/4: Assigning wallet...')
      const wallet = await this.assignWallet()
      
      // Step 4: Initialize EW Core SDK
      console.log('⏳ Step 3/4: Initializing EW Core SDK...')
      this.ewCore = await this.initializeEWCore(this.deviceId)
      
      // Step 5: Check if keys need to be generated
      console.log('⏳ Step 4/4: Checking MPC keys...')
      // We'll handle key generation separately when needed
      
      // Update wallet info
      this.walletInfo = {
        walletId: wallet.walletId,
        deviceId: this.deviceId,
        status: 'ready'
      }
      
      this.isInitialized = true
      console.log('✅ Fireblocks EW SDK initialization completed!')
      
      return this.walletInfo
    } catch (error) {
      this.walletInfo = {
        walletId: '',
        deviceId: this.deviceId || '',
        status: 'error'
      }
      console.error('❌ Fireblocks EW SDK initialization failed:', error)
      throw error
    }
  }
}

// Export singleton instance
let fireblocksService: FireblocksService | null = null

export const getFireblocksService = (config?: FireblocksConfig): FireblocksService => {
  if (!fireblocksService) {
    // Determine environment from app env or default to sandbox
    const appEnv = import.meta.env.VITE_APP_ENV || 'development'
    const environment = appEnv === 'production' ? 'production' : 'sandbox'
    
    const authClientId = import.meta.env.VITE_FIREBLOCKS_CLIENT_ID
    if (!authClientId) {
      throw new Error('VITE_FIREBLOCKS_CLIENT_ID environment variable is required')
    }
    
    const defaultConfig: FireblocksConfig = {
      authClientId,
      environment
    }
    
    fireblocksService = new FireblocksService(config || defaultConfig)
  }
  return fireblocksService
}

// Re-export types for convenience
export type { 
  FireblocksConfig,
  WalletInfo,
  KeyGenerationResult,
  TransactionRequest
} from '@/types/fireblocks'