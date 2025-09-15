import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useSDKConsoleStore, useAuthStore } from '@/app/providers/StoreProvider'

const TransactionHistoryPage: React.FC = observer(() => {
  const sdkConsoleStore = useSDKConsoleStore()
  const authStore = useAuthStore()

  useEffect(() => {
    // Set current implementation for console
    sdkConsoleStore.setCurrentImplementation('transactionHistory')
    
    // Simulate SDK calls
    sdkConsoleStore.addLog('transactionHistory', 'info', 'Loading transaction history...')
    setTimeout(() => {
      sdkConsoleStore.addLog('transactionHistory', 'success', 'Loaded 25 transactions')
    }, 800)
  }, [sdkConsoleStore])

  // Check if this is a demo user vs real Google user
  const isDemoUser = authStore.user?.id === 'demo-user'
  
  const demoTransactions = [
    {
      id: 'tx_1',
      type: 'received',
      asset: 'BTC',
      amount: '+0.0234',
      value: '$847.32',
      date: 'Jan 15, 2025 14:32',
      status: 'confirmed',
      from: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      txHash: '0x4f5b2c8d9a7e3f1b8c6d4e2a9b5c7f8e3a1d6b9c4f7e2a8d5b3c6f9e1a4d7b',
      icon: 'fa-solid fa-arrow-down',
      color: 'text-green-600'
    },
    {
      id: 'tx_2',
      type: 'sent',
      asset: 'ETH',
      amount: '-0.5000',
      value: '$1,247.89',
      date: 'Jan 14, 2025 09:15',
      status: 'confirmed',
      to: '0x742d35Cc6635C0532925a3b8D42a68bD38c0b8a2',
      txHash: '0xa7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8',
      icon: 'fa-solid fa-arrow-up',
      color: 'text-red-600'
    },
    {
      id: 'tx_3',
      type: 'swap',
      asset: 'USDC',
      amount: '500',
      value: '$500.00',
      date: 'Jan 13, 2025 16:45',
      status: 'confirmed',
      details: 'ETH → USDC',
      txHash: '0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
      icon: 'fa-solid fa-exchange-alt',
      color: 'text-blue-600'
    },
    {
      id: 'tx_4',
      type: 'received',
      asset: 'BTC',
      amount: '+0.1234',
      value: '$4,567.89',
      date: 'Jan 12, 2025 11:20',
      status: 'pending',
      from: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
      txHash: '0x9c8b7a6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
      icon: 'fa-solid fa-arrow-down',
      color: 'text-green-600'
    },
    {
      id: 'tx_5',
      type: 'sent',
      asset: 'USDC',
      amount: '-100.00',
      value: '$100.00',
      date: 'Jan 11, 2025 08:30',
      status: 'failed',
      to: '0x8ba1f109551bD432803012645Hac136c69a5d4d',
      txHash: '0xf1e2d3c4b5a6f7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4f5e6d7c8b9a0f1e2',
      icon: 'fa-solid fa-arrow-up',
      color: 'text-red-600'
    },
  ]

  // Real user data - empty until we implement real wallet connection
  const realTransactions: any[] = []

  // Use appropriate data based on user type
  const transactions = isDemoUser ? demoTransactions : realTransactions

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl text-gray-900 mb-2">Transaction History</h1>
        <p className="text-gray-600">Complete record of all wallet transactions</p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Asset</label>
            <select className="input w-32">
              <option value="">All Assets</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="USDC">USDC</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select className="input w-32">
              <option value="">All Types</option>
              <option value="sent">Sent</option>
              <option value="received">Received</option>
              <option value="swap">Swap</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="input w-32">
              <option value="">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <input type="date" className="input w-36" />
          </div>
          <div className="flex-1"></div>
          <button className="btn-primary">
            <i className="fa-solid fa-filter mr-2"></i>
            Apply Filters
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-gray-900">All Transactions</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Showing 5 of 25 transactions</span>
              <button className="btn-outline text-xs">
                <i className="fa-solid fa-download mr-1"></i>
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {transactions.length > 0 ? transactions.map((tx) => (
            <div key={tx.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <i className={`${tx.icon} ${tx.color} text-sm`}></i>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        {tx.type === 'received' ? 'Received' : tx.type === 'sent' ? 'Sent' : 'Swapped'} {tx.asset}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(tx.status)}`}>
                        {tx.status}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600 mt-1">
                      {tx.date}
                    </div>
                    
                    {tx.from && (
                      <div className="text-xs text-gray-500 mt-1">
                        From: {truncateAddress(tx.from)}
                      </div>
                    )}
                    
                    {tx.to && (
                      <div className="text-xs text-gray-500 mt-1">
                        To: {truncateAddress(tx.to)}
                      </div>
                    )}
                    
                    {tx.details && (
                      <div className="text-xs text-gray-500 mt-1">
                        {tx.details}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`font-medium ${tx.color}`}>
                    {tx.amount} {tx.asset}
                  </div>
                  <div className="text-sm text-gray-600">{tx.value}</div>
                  
                  <button className="text-xs text-blue-600 hover:text-blue-700 mt-2">
                    <i className="fa-solid fa-external-link-alt mr-1"></i>
                    View Details
                  </button>
                </div>
              </div>
              
              {tx.txHash && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Transaction Hash:</span>
                    <code className="text-xs text-gray-700 font-mono">{truncateAddress(tx.txHash)}</code>
                  </div>
                </div>
              )}
            </div>
          )) : (
            <div className="text-center py-16">
              <i className="fa-solid fa-clock-rotate-left text-5xl text-gray-300 mb-6"></i>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Transactions Yet</h3>
              <p className="text-gray-600 mb-6">Your transaction history will appear here once you start using your wallet.</p>
              <button className="btn-primary">
                <i className="fa-solid fa-paper-plane mr-2"></i>
                Send Your First Transaction
              </button>
            </div>
          )}
        </div>
        
        {transactions.length > 0 && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Page 1 of {Math.ceil(transactions.length / 10)}</span>
              <div className="flex space-x-2">
                <button className="btn-outline text-sm" disabled>
                  <i className="fa-solid fa-chevron-left mr-1"></i>
                  Previous
                </button>
                <button className="btn-outline text-sm">
                  Next
                  <i className="fa-solid fa-chevron-right ml-1"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

export default TransactionHistoryPage