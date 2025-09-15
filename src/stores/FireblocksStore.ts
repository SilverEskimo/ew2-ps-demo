import { makeAutoObservable, runInAction } from 'mobx'
import { FireblocksService, getFireblocksService } from '@/services/FireblocksService'
import type { WalletInfo, KeyGenerationResult } from '@/types/fireblocks'
import type { TMPCAlgorithm } from '@fireblocks/ncw-js-sdk'

export interface SDKInitializationState {
  isInitializing: boolean
  isInitialized: boolean
  currentStep: string
  error: string | null
  progress: number
}

export class FireblocksStore {
  // SDK State
  sdkInitialization: SDKInitializationState = {
    isInitializing: false,
    isInitialized: false,
    currentStep: '',
    error: null,
    progress: 0
  }

  // Wallet State
  walletInfo: WalletInfo | null = null
  hasGeneratedKeys = false
  hasBackedUpKeys = false

  // Service instance
  private fireblocksService: FireblocksService | null = null
  private initializationInProgress = false

  constructor() {
    makeAutoObservable(this)
  }

  // Initialize the Fireblocks SDK
  async initializeSDK(authTokenRetriever: () => Promise<string>, sdkConsoleStore?: any) {
    // Prevent double initialization
    if (this.initializationInProgress || this.sdkInitialization.isInitialized) {
      return
    }

    this.initializationInProgress = true
    
    runInAction(() => {
      this.sdkInitialization.isInitializing = true
      this.sdkInitialization.error = null
      this.sdkInitialization.progress = 0
    })

    try {
      // Initialize service if not already done
      if (!this.fireblocksService) {
        // Let getFireblocksService determine the environment based on VITE_APP_ENV
        this.fireblocksService = getFireblocksService()
        
        if (sdkConsoleStore) {
          const environment = import.meta.env.VITE_APP_ENV === 'production' ? 'production' : 'sandbox'
          const clientId = import.meta.env.VITE_FIREBLOCKS_CLIENT_ID || import.meta.env.VITE_GOOGLE_CLIENT_ID
          sdkConsoleStore.updateStepDetails('walletSummary', 1, 
            `Initialized with clientId: ${clientId?.substring(0, 8)}..., environment: ${environment}`)
        }
      }

      // Step 1: Generate Device ID
      runInAction(() => {
        this.sdkInitialization.currentStep = 'Generating device ID'
        this.sdkInitialization.progress = 20
      })

      const deviceId = this.fireblocksService.generateDeviceId()
      
      if (sdkConsoleStore) {
        sdkConsoleStore.updateStepDetails('walletSummary', 2, 
          `Generated device ID: ${deviceId.substring(0, 12)}...`)
      }

      await this.delay(800) // Simulate async operation

      // Step 2: Initialize EW SDK
      runInAction(() => {
        this.sdkInitialization.currentStep = 'Initializing EW SDK'
        this.sdkInitialization.progress = 40
      })

      await this.fireblocksService.initializeEWSDK(authTokenRetriever)
      
      if (sdkConsoleStore) {
        const token = await authTokenRetriever()
        sdkConsoleStore.updateStepDetails('walletSummary', 3, 
          `Authenticated with token: ${token.substring(0, 20)}...`)
      }
      
      await this.delay(800)

      // Step 3: Assign Wallet (EW SDK handles direct communication)
      runInAction(() => {
        this.sdkInitialization.currentStep = 'Assigning wallet'
        this.sdkInitialization.progress = 70
      })

      const wallet = await this.fireblocksService.assignWallet()
      
      if (sdkConsoleStore) {
        sdkConsoleStore.updateStepDetails('walletSummary', 4, 
          `Assigned wallet ID: ${wallet.walletId}`)
      }
      
      await this.delay(800)

      // Step 4: Setup complete (Core SDK initialization will be done when needed for MPC operations)
      runInAction(() => {
        this.sdkInitialization.currentStep = 'Setup complete'
        this.sdkInitialization.progress = 90
      })

      if (sdkConsoleStore) {
        sdkConsoleStore.updateStepDetails('walletSummary', 5, 
          `EW SDK ready for wallet operations`)
      }

      // Complete initialization with real wallet info
      runInAction(() => {
        this.walletInfo = {
          walletId: wallet.walletId,
          accountId: wallet.accountId || 'account-001',
          deviceId: deviceId,
          status: 'ready'
        }
        this.fireblocksService?.setWalletInfo(this.walletInfo)
        
        this.sdkInitialization.isInitialized = true
        this.sdkInitialization.isInitializing = false
        this.sdkInitialization.currentStep = 'Initialization complete'
        this.sdkInitialization.progress = 100
      })

    } catch (error) {
      runInAction(() => {
        this.sdkInitialization.error = error instanceof Error ? error.message : 'Unknown error'
        this.sdkInitialization.isInitializing = false
        this.sdkInitialization.currentStep = 'Initialization failed'
      })
      throw error
    } finally {
      this.initializationInProgress = false
    }
  }

  // Generate MPC Keys
  async generateMPCKeys(algorithms: string[] = ['MPC_CMP_ECDSA_SECP256K1']): Promise<KeyGenerationResult> {
    if (!this.fireblocksService) {
      throw new Error('Fireblocks service not initialized')
    }

    const result = await this.fireblocksService.generateMPCKeys(algorithms as TMPCAlgorithm[])
    
    runInAction(() => {
      this.hasGeneratedKeys = true
    })

    return result
  }

  // Backup Keys
  async backupKeys(passphrase: string): Promise<any> {
    if (!this.fireblocksService) {
      throw new Error('Fireblocks service not initialized')
    }

    const result = await this.fireblocksService.backupKeys(passphrase)
    
    runInAction(() => {
      this.hasBackedUpKeys = true
    })

    return result
  }

  // Create Transaction
  async createTransaction(request: { assetId: string; amount: string; destination: string }): Promise<string> {
    if (!this.fireblocksService) {
      throw new Error('Fireblocks service not initialized')
    }

    return await this.fireblocksService.createTransaction(request)
  }

  // Sign Transaction
  async signTransaction(txId: string): Promise<any> {
    if (!this.fireblocksService) {
      throw new Error('Fireblocks service not initialized')
    }

    return await this.fireblocksService.signTransaction(txId)
  }

  // Reset state (for logout)
  reset() {
    runInAction(() => {
      this.sdkInitialization = {
        isInitializing: false,
        isInitialized: false,
        currentStep: '',
        error: null,
        progress: 0
      }
      this.walletInfo = null
      this.hasGeneratedKeys = false
      this.hasBackedUpKeys = false
      this.fireblocksService = null
      this.initializationInProgress = false
    })
  }

  // Utility method for delays
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Getters
  get isSDKReady(): boolean {
    return this.sdkInitialization.isInitialized && this.walletInfo?.status === 'ready'
  }

  get initializationProgress(): number {
    return this.sdkInitialization.progress
  }

  get currentInitializationStep(): string {
    return this.sdkInitialization.currentStep
  }

  get isInitializing(): boolean {
    return this.sdkInitialization.isInitializing
  }
}