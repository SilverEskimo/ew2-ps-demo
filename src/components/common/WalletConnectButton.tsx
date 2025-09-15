import React from 'react'
import { observer } from 'mobx-react-lite'
import { useWalletStore } from '@/app/providers/StoreProvider'

export const WalletConnectButton: React.FC = observer(() => {
  const walletStore = useWalletStore()

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (walletStore.isConnecting) {
    return (
      <button className="btn-primary" disabled>
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        Connecting...
      </button>
    )
  }

  if (walletStore.isConnected && walletStore.activeWallet) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {formatAddress(walletStore.activeWallet.address)}
        </span>
        <button
          onClick={() => walletStore.disconnectWallet()}
          className="btn-outline text-sm"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => walletStore.connectWallet()}
      className="btn-primary"
    >
      Connect Wallet
    </button>
  )
})