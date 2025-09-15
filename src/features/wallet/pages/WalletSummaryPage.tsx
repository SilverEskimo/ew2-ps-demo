import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useSDKConsoleStore, useFireblocksStore, useAuthStore } from '@/app/providers/StoreProvider'

const WalletSummaryPage: React.FC = observer(() => {
  const sdkConsoleStore = useSDKConsoleStore()
  const fireblocksStore = useFireblocksStore()
  const authStore = useAuthStore()

  useEffect(() => {
    // Set current implementation for console
    sdkConsoleStore.setCurrentImplementation('walletSummary')
    
    // Initialize Fireblocks SDK if not already initialized
    const initializeFireblocksSDK = async () => {
      if (!fireblocksStore.isSDKReady && !fireblocksStore.isInitializing) {
        try {
          sdkConsoleStore.addLog('walletSummary', 'info', '🚀 Starting Fireblocks SDK initialization...')
          
          // Auth token retriever for Fireblocks
          const authTokenRetriever = async () => {
            return authStore.accessToken || 'mock-google-id-token'
          }
          
          // Update the code example with actual code being executed
          sdkConsoleStore.updateCodeExample('walletSummary', `// Fireblocks Embedded Wallet - Direct Mode (No Backend Required)
import { EmbeddedWallet } from '@fireblocks/embedded-wallet-sdk'
import { getFireblocksService } from '@/services/FireblocksService'

// Configuration
const config = {
  authClientId: '${(import.meta.env.VITE_FIREBLOCKS_CLIENT_ID || 'client-id').substring(0, 20)}...',
  environment: '${import.meta.env.VITE_APP_ENV === 'production' ? 'production' : 'sandbox'}'
}

// Auth token retriever
const authTokenRetriever = async () => {
  return authStore.accessToken || 'google-id-token'
}

// Initialize Fireblocks service (direct communication with Fireblocks APIs)
const fireblocksService = getFireblocksService()

// Step 1: Generate Device ID
const deviceId = fireblocksService.generateDeviceId()

// Step 2: Initialize EW SDK (communicates directly with Fireblocks)
await fireblocksService.initializeEWSDK(authTokenRetriever)

// Step 3: Initialize EW Core SDK (direct mode)
await fireblocksService.initializeEWCore(deviceId)

// Step 4: Assign Wallet (creates wallet if doesn't exist)
const wallet = await fireblocksService.assignWallet()

// Result - Real wallet from Fireblocks
const walletInfo = {
  walletId: wallet.walletId,
  accountId: wallet.accountId,
  deviceId: deviceId,
  status: 'ready'
}`)
          
          await fireblocksStore.initializeSDK(authTokenRetriever, sdkConsoleStore)
          
          sdkConsoleStore.addLog('walletSummary', 'success', '✅ Fireblocks SDK initialized successfully')
          sdkConsoleStore.addLog('walletSummary', 'info', `📱 Device ID: ${fireblocksStore.walletInfo?.deviceId}`)
          sdkConsoleStore.addLog('walletSummary', 'info', `💼 Wallet ID: ${fireblocksStore.walletInfo?.walletId}`)
          sdkConsoleStore.addLog('walletSummary', 'info', '📊 Fetching wallet balance...')
          
          // Simulate wallet data loading
          setTimeout(() => {
            sdkConsoleStore.addLog('walletSummary', 'success', '💰 Wallet balance retrieved: $24,847.32')
            sdkConsoleStore.addLog('walletSummary', 'info', '📈 Loading asset holdings...')
          }, 1000)
          
          setTimeout(() => {
            sdkConsoleStore.addLog('walletSummary', 'success', '🎯 Asset data loaded: 7 different cryptocurrencies')
            sdkConsoleStore.addLog('walletSummary', 'info', '🔐 Wallet ready for operations')
          }, 1500)
          
        } catch (error) {
          sdkConsoleStore.addLog('walletSummary', 'error', `❌ SDK initialization failed: ${error}`)
        }
      } else if (fireblocksStore.isSDKReady) {
        // SDK already initialized, just show wallet info
        sdkConsoleStore.addLog('walletSummary', 'info', '✅ Fireblocks SDK already initialized')
        sdkConsoleStore.addLog('walletSummary', 'info', `📱 Device ID: ${fireblocksStore.walletInfo?.deviceId}`)
        sdkConsoleStore.addLog('walletSummary', 'info', `💼 Wallet ID: ${fireblocksStore.walletInfo?.walletId}`)
        sdkConsoleStore.addLog('walletSummary', 'success', '🔐 Wallet ready for operations')
      }
    }
    
    initializeFireblocksSDK()
  }, [sdkConsoleStore, fireblocksStore, authStore])

  // Check if this is a demo user vs real Google user
  const isDemoUser = authStore.user?.id === 'demo-user'
  
  // Demo data for demo users only
  const demoAssets = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      amount: '0.5432',
      value: '$18,247.32',
      icon: 'fa-brands fa-bitcoin'
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      amount: '2.1847',
      value: '$4,247.89',
      icon: 'fa-brands fa-ethereum'
    },
    {
      name: 'USD Coin',
      symbol: 'USDC',
      amount: '1,247.50',
      value: '$1,247.50',
      icon: 'fa-solid fa-dollar-sign'
    },
  ]

  const demoTransactions = [
    {
      type: 'received',
      asset: 'BTC',
      amount: '+0.0234',
      value: '$847.32',
      date: 'Jan 15, 2025',
      icon: 'fa-solid fa-arrow-down'
    },
    {
      type: 'sent',
      asset: 'ETH', 
      amount: '-0.5000',
      value: '$1,247.89',
      date: 'Jan 14, 2025',
      icon: 'fa-solid fa-arrow-up'
    },
    {
      type: 'swap',
      asset: 'USDC',
      amount: '500',
      value: '$500.00',
      date: 'Jan 13, 2025',
      icon: 'fa-solid fa-exchange-alt'
    },
  ]

  // Real user data - empty until we implement real wallet connection
  const realAssets: any[] = []
  const realTransactions: any[] = []

  // Use appropriate data based on user type
  const assets = isDemoUser ? demoAssets : realAssets
  const transactions = isDemoUser ? demoTransactions : realTransactions

  // Show initialization loading state
  if (fireblocksStore.isInitializing) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl text-gray-900 mb-2">Wallet Summary</h1>
          <p className="text-gray-600">Initializing Fireblocks SDK...</p>
        </div>
        
        <div className="card p-8 text-center">
          <div className="mb-4">
            <i className="fa-solid fa-spinner fa-spin text-4xl text-blue-600"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Setting up your wallet</h3>
          <p className="text-gray-600 mb-4">{fireblocksStore.currentInitializationStep}</p>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${fireblocksStore.initializationProgress}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-500">
            This may take a few moments as we initialize your secure wallet infrastructure
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl text-gray-900 mb-2">Wallet Summary</h1>
        <p className="text-gray-600">Overview of your crypto assets and portfolio performance</p>
        {fireblocksStore.isSDKReady && (
          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <i className="fa-solid fa-check-circle text-green-500 mr-1"></i>
              SDK Ready
            </span>
            <span>Wallet: {fireblocksStore.walletInfo?.walletId?.slice(0, 8)}...</span>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-gray-900">Total Balance</h3>
            <i className="fa-solid fa-wallet text-gray-600"></i>
          </div>
          <div className="text-3xl text-gray-900 mb-2">
            {isDemoUser ? '$24,847.32' : '$0.00'}
          </div>
          <div className="text-sm text-gray-600">
            {isDemoUser ? '+5.2% (24h)' : 'No balance yet'}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-gray-900">Assets</h3>
            <i className="fa-solid fa-coins text-gray-600"></i>
          </div>
          <div className="text-3xl text-gray-900 mb-2">
            {isDemoUser ? '7' : '0'}
          </div>
          <div className="text-sm text-gray-600">
            {isDemoUser ? 'Different cryptocurrencies' : 'No assets added'}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-gray-900">24h Change</h3>
            <i className="fa-solid fa-chart-line text-gray-600"></i>
          </div>
          <div className={`text-3xl mb-2 ${isDemoUser ? 'text-green-600' : 'text-gray-900'}`}>
            {isDemoUser ? '+$1,247' : '$0.00'}
          </div>
          <div className="text-sm text-gray-600">
            {isDemoUser ? 'Portfolio gain' : 'No changes yet'}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Asset Holdings */}
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg text-gray-900">Asset Holdings</h3>
          </div>
          <div className="p-6">
            {assets.length > 0 ? (
              <div className="space-y-4">
                {assets.map((asset, index) => (
                  <div key={index} className="asset-card">
                    <div className="flex items-center space-x-3">
                      <div className="icon-container-primary">
                        <i className={`${asset.icon}`}></i>
                      </div>
                      <div>
                        <div className="text-gray-900">{asset.name}</div>
                        <div className="text-sm text-gray-600">{asset.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-900">{asset.amount} {asset.symbol}</div>
                      <div className="text-sm text-gray-600">{asset.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <i className="fa-solid fa-wallet text-4xl text-gray-300 mb-4"></i>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Assets Yet</h3>
                <p className="text-gray-600 mb-4">Your wallet is ready! Add some assets to get started.</p>
                <button className="btn-primary">
                  <i className="fa-solid fa-plus mr-2"></i>
                  Add Assets
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg text-gray-900">Recent Transactions</h3>
          </div>
          <div className="p-6">
            {transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((tx, index) => (
                  <div key={index} className="transaction-card">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        tx.type === 'received' ? 'icon-container-success' : 'icon-container-primary'
                      }`}>
                        <i className={`${tx.icon} text-xs`}></i>
                      </div>
                      <div>
                        <div className="text-gray-900">
                          {tx.type === 'received' ? 'Received' : tx.type === 'sent' ? 'Sent' : 'Swapped'} {tx.asset}
                        </div>
                        <div className="text-sm text-gray-600">{tx.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`${tx.type === 'received' ? 'text-green-600' : 'text-gray-600'}`}>
                        {tx.amount} {tx.asset}
                      </div>
                      <div className="text-sm text-gray-600">{tx.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <i className="fa-solid fa-clock-rotate-left text-4xl text-gray-300 mb-4"></i>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Transactions Yet</h3>
                <p className="text-gray-600 mb-4">Your transaction history will appear here once you start using your wallet.</p>
                <button className="btn-primary">
                  <i className="fa-solid fa-paper-plane mr-2"></i>
                  Send Transaction
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

export default WalletSummaryPage