import { makeAutoObservable } from 'mobx'

export interface SDKFunction {
  name: string
  description: string
  params?: Record<string, unknown>
}

export interface ImplementationStep {
  step: number
  description: string
  completed: boolean
  details?: string
}

export interface APIEndpoint {
  method: string
  endpoint: string
  description: string
}

export interface ConsoleLog {
  timestamp: Date
  level: 'info' | 'success' | 'error' | 'warning'
  message: string
  data?: unknown
}

export interface SDKImplementation {
  id: string
  title: string
  description: string
  sdkFunctions: SDKFunction[]
  implementationSteps: ImplementationStep[]
  apiEndpoints: APIEndpoint[]
  codeExample: string
  dataRetrieved: string[]
  logs: ConsoleLog[]
}

export class SDKConsoleStore {
  isConsoleOpen = true // Default to open for better UX
  currentImplementation: SDKImplementation | null = null
  implementations: Record<string, SDKImplementation> = {}

  constructor() {
    makeAutoObservable(this)
    this.initializeImplementations()
  }

  toggleConsole() {
    this.isConsoleOpen = !this.isConsoleOpen
  }

  setCurrentImplementation(implementationId: string) {
    this.currentImplementation = this.implementations[implementationId] || null
    this.isConsoleOpen = true
  }

  addLog(implementationId: string, level: ConsoleLog['level'], message: string, data?: unknown) {
    const implementation = this.implementations[implementationId]
    if (implementation) {
      implementation.logs.push({
        timestamp: new Date(),
        level,
        message,
        data,
      })
    }
  }

  clearLogs(implementationId: string) {
    const implementation = this.implementations[implementationId]
    if (implementation) {
      implementation.logs = []
    }
  }

  updateStepDetails(implementationId: string, stepNumber: number, details: string) {
    const implementation = this.implementations[implementationId]
    if (implementation) {
      const step = implementation.implementationSteps.find(s => s.step === stepNumber)
      if (step) {
        step.details = details
        step.completed = true
      }
    }
  }

  updateCodeExample(implementationId: string, code: string) {
    const implementation = this.implementations[implementationId]
    if (implementation) {
      implementation.codeExample = code
    }
  }

  private initializeImplementations() {
    this.implementations = {
      walletSummary: {
        id: 'walletSummary',
        title: 'Wallet Summary Dashboard',
        description: 'Overview of crypto assets and portfolio performance',
        sdkFunctions: [
          { name: 'fireblocks.initialize()', description: 'Initialize the Fireblocks SDK' },
          { name: 'fireblocks.getWalletBalance()', description: 'Get total wallet balance' },
          { name: 'fireblocks.getAssetsList()', description: 'Retrieve list of assets' },
          { name: 'fireblocks.getTransactionHistory()', description: 'Fetch recent transactions' },
          { name: 'fireblocks.getPortfolioMetrics()', description: 'Get portfolio performance data' },
          { name: 'fireblocks.subscribeToUpdates()', description: 'Setup real-time updates' },
        ],
        implementationSteps: [
          { step: 1, description: 'Initialize Fireblocks SDK', completed: true },
          { step: 2, description: 'Authenticate user session', completed: true },
          { step: 3, description: 'Fetch wallet balance data', completed: true },
          { step: 4, description: 'Retrieve asset holdings', completed: true },
          { step: 5, description: 'Get transaction history', completed: true },
          { step: 6, description: 'Calculate portfolio metrics', completed: true },
          { step: 7, description: 'Setup real-time updates', completed: false },
          { step: 8, description: 'Render dashboard UI', completed: true },
        ],
        apiEndpoints: [
          { method: 'GET', endpoint: '/v1/wallets', description: 'Retrieve wallet information' },
          { method: 'GET', endpoint: '/v1/wallets/balance', description: 'Get total portfolio balance' },
          { method: 'GET', endpoint: '/v1/supported_assets', description: 'List supported cryptocurrencies' },
          { method: 'GET', endpoint: '/v1/transactions', description: 'Fetch transaction history' },
        ],
        codeExample: `// Initialize Fireblocks Embedded Wallet SDK
import { FireblocksSDK } from '@fireblocks/sdk';

const fireblocks = new FireblocksSDK({
  apiKey: import.meta.env.VITE_FIREBLOCKS_API_KEY,
  privateKey: import.meta.env.VITE_FIREBLOCKS_PRIVATE_KEY,
  baseUrl: 'https://api.fireblocks.io'
});

// Get wallet summary data
const walletData = await fireblocks.getWallets();
const balance = await fireblocks.getWalletBalance();
const assets = await fireblocks.getAssetsList();`,
        dataRetrieved: [
          'Total portfolio balance',
          'Individual asset amounts',
          '24h price changes',
          'Recent transactions',
          'Asset metadata',
          'Portfolio performance',
        ],
        logs: [],
      },
      transactionHistory: {
        id: 'transactionHistory',
        title: 'Transaction History',
        description: 'Detailed view of all wallet transactions',
        sdkFunctions: [
          { name: 'fireblocks.getTransactions()', description: 'Get paginated transaction list' },
          { name: 'fireblocks.getTransactionDetails()', description: 'Get detailed transaction info' },
          { name: 'fireblocks.filterTransactions()', description: 'Filter by date, type, asset' },
        ],
        implementationSteps: [
          { step: 1, description: 'Setup pagination parameters', completed: true },
          { step: 2, description: 'Fetch transaction data', completed: true },
          { step: 3, description: 'Apply filters and sorting', completed: true },
          { step: 4, description: 'Format transaction details', completed: true },
          { step: 5, description: 'Render transaction list', completed: true },
        ],
        apiEndpoints: [
          { method: 'GET', endpoint: '/v1/transactions', description: 'Get transactions with pagination' },
          { method: 'GET', endpoint: '/v1/transactions/:id', description: 'Get specific transaction details' },
        ],
        codeExample: `// Fetch transaction history with pagination
const transactions = await fireblocks.getTransactions({
  limit: 50,
  offset: 0,
  orderBy: 'createdAt',
  sort: 'DESC'
});

// Get detailed transaction information
const transactionDetails = await fireblocks.getTransactionDetails(transactionId);`,
        dataRetrieved: [
          'Transaction amounts',
          'Asset types',
          'Transaction status',
          'Timestamps',
          'Transaction fees',
          'Counterparty information',
        ],
        logs: [],
      },
      sendTransaction: {
        id: 'sendTransaction',
        title: 'Send Transaction',
        description: 'Send cryptocurrency to another wallet',
        sdkFunctions: [
          { name: 'fireblocks.validateAddress()', description: 'Validate recipient address' },
          { name: 'fireblocks.estimateFee()', description: 'Calculate transaction fees' },
          { name: 'fireblocks.createTransaction()', description: 'Create and sign transaction' },
          { name: 'fireblocks.broadcastTransaction()', description: 'Broadcast to network' },
        ],
        implementationSteps: [
          { step: 1, description: 'Validate recipient address', completed: false },
          { step: 2, description: 'Check wallet balance', completed: false },
          { step: 3, description: 'Estimate transaction fees', completed: false },
          { step: 4, description: 'Create transaction', completed: false },
          { step: 5, description: 'Sign transaction', completed: false },
          { step: 6, description: 'Broadcast transaction', completed: false },
          { step: 7, description: 'Monitor transaction status', completed: false },
        ],
        apiEndpoints: [
          { method: 'POST', endpoint: '/v1/transactions', description: 'Create new transaction' },
          { method: 'GET', endpoint: '/v1/estimate_fee', description: 'Estimate transaction fees' },
          { method: 'POST', endpoint: '/v1/validate_address', description: 'Validate wallet address' },
        ],
        codeExample: `// Send cryptocurrency transaction
const transaction = await fireblocks.createTransaction({
  assetId: 'BTC',
  amount: '0.001',
  source: { type: 'VAULT_ACCOUNT', id: '0' },
  destination: { 
    type: 'ONE_TIME_ADDRESS', 
    oneTimeAddress: { address: recipientAddress } 
  }
});

const result = await fireblocks.submitTransaction(transaction.id);`,
        dataRetrieved: [
          'Transaction ID',
          'Estimated fees',
          'Network confirmations',
          'Transaction status',
          'Block hash',
          'Gas used',
        ],
        logs: [],
      },
      addAssets: {
        id: 'addAssets',
        title: 'Add Assets to Wallet',
        description: 'Add cryptocurrency assets through deposits or purchases',
        sdkFunctions: [
          { name: 'fireblocks.getSupportedAssets()', description: 'Get list of supported cryptocurrencies' },
          { name: 'fireblocks.generateDepositAddress()', description: 'Generate deposit address for external transfers' },
          { name: 'fireblocks.initiatePurchase()', description: 'Start fiat-to-crypto purchase flow' },
          { name: 'fireblocks.getDepositHistory()', description: 'Retrieve deposit transaction history' },
          { name: 'fireblocks.validateDeposit()', description: 'Validate incoming deposit transaction' },
        ],
        implementationSteps: [
          { step: 1, description: 'Load supported assets', completed: true },
          { step: 2, description: 'Generate secure deposit addresses', completed: true },
          { step: 3, description: 'Setup deposit monitoring', completed: true },
          { step: 4, description: 'Integrate fiat purchase provider', completed: false },
          { step: 5, description: 'Handle deposit confirmations', completed: false },
          { step: 6, description: 'Update wallet balances', completed: false },
        ],
        apiEndpoints: [
          { method: 'GET', endpoint: '/v1/supported_assets', description: 'Get supported cryptocurrencies' },
          { method: 'POST', endpoint: '/v1/vault/accounts/:id/addresses', description: 'Generate deposit address' },
          { method: 'GET', endpoint: '/v1/vault/accounts/:id/addresses', description: 'List existing addresses' },
          { method: 'POST', endpoint: '/v1/payments/fiat/purchase', description: 'Initiate fiat purchase' },
        ],
        codeExample: `// Generate deposit address for asset
const depositAddress = await fireblocks.generateDepositAddress({
  vaultAccountId: '0',
  assetId: 'BTC'
});

// Initiate fiat purchase
const purchaseOrder = await fireblocks.initiatePurchase({
  assetId: 'BTC',
  amount: '0.001',
  currency: 'USD',
  paymentMethod: 'CARD'
});

// Monitor deposits
fireblocks.subscribeToDeposits((deposit) => {
  console.log('New deposit:', deposit);
});`,
        dataRetrieved: [
          'Supported asset list',
          'Generated deposit addresses',
          'Network information',
          'Minimum deposit amounts',
          'Purchase quotes',
          'Payment provider details',
        ],
        logs: [],
      },
      authentication: {
        id: 'authentication',
        title: 'User Authentication',
        description: 'OAuth-based user authentication with Google',
        sdkFunctions: [
          { name: 'google.accounts.oauth2.initTokenClient()', description: 'Initialize Google OAuth client' },
          { name: 'tokenClient.requestAccessToken()', description: 'Request access token from Google' },
          { name: 'fireblocks.validateAuthToken()', description: 'Validate token with Fireblocks' },
          { name: 'authTokenRetriever.getAuthToken()', description: 'Retrieve authenticated user token' },
        ],
        implementationSteps: [
          { step: 1, description: 'Configure Google OAuth client ID', completed: true },
          { step: 2, description: 'Initialize Google OAuth flow', completed: false },
          { step: 3, description: 'Request user consent', completed: false },
          { step: 4, description: 'Exchange authorization code for tokens', completed: false },
          { step: 5, description: 'Validate token with Fireblocks', completed: false },
          { step: 6, description: 'Store authentication state', completed: false },
        ],
        apiEndpoints: [
          { method: 'GET', endpoint: 'https://accounts.google.com/o/oauth2/auth', description: 'Google OAuth authorization endpoint' },
          { method: 'POST', endpoint: 'https://oauth2.googleapis.com/token', description: 'Google token exchange endpoint' },
          { method: 'POST', endpoint: '/v1/ncw/auth/validate', description: 'Fireblocks token validation' },
        ],
        codeExample: `// Initialize Google OAuth for Fireblocks EW
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Initialize token client
const tokenClient = google.accounts.oauth2.initTokenClient({
  client_id: googleClientId,
  scope: 'openid email profile',
  callback: (response) => {
    // Handle OAuth response
    handleGoogleAuth(response);
  }
});

// Request access token
const handleGoogleLogin = async () => {
  tokenClient.requestAccessToken();
};

// Auth token retriever for Fireblocks EW
const authTokenRetriever = {
  getAuthToken: async () => {
    return localStorage.getItem('google_id_token');
  }
};`,
        dataRetrieved: [
          'User profile information',
          'Google ID token',
          'Access token',
          'User email and name',
          'Authentication timestamp',
          'Token expiration',
        ],
        logs: [],
      },
    }
  }

  get nextImplementations() {
    const implementations = [
      { id: 'addAssets', title: 'Add Assets', description: 'Learn how to add new cryptocurrencies to wallet' },
      { id: 'sendTransaction', title: 'Send Transaction', description: 'Implement crypto sending functionality' },
      { id: 'transactionHistory', title: 'Transaction History', description: 'Build detailed transaction tracking' },
    ]
    return implementations
  }
}