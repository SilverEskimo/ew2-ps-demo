import { makeAutoObservable, runInAction } from 'mobx'

export interface Wallet {
  id: string
  address: string
  chainId: number
  balance: string
  isConnected: boolean
  provider?: string
}

export interface Transaction {
  id: string
  hash: string
  from: string
  to: string
  value: string
  status: 'pending' | 'confirmed' | 'failed'
  timestamp: number
  gasUsed?: string
  gasPrice?: string
}

export class WalletStore {
  wallets: Wallet[] = []
  activeWallet: Wallet | null = null
  transactions: Transaction[] = []
  isConnecting = false
  error: string | null = null
  networkStatus: 'online' | 'offline' = 'online'

  constructor() {
    makeAutoObservable(this)
    this.loadWalletState()
  }

  private loadWalletState() {
    const savedWallet = localStorage.getItem('activeWallet')
    if (savedWallet) {
      try {
        this.activeWallet = JSON.parse(savedWallet)
      } catch (error) {
        console.error('Failed to load wallet state:', error)
      }
    }
  }

  async connectWallet(provider: string = 'fireblocks') {
    this.isConnecting = true
    this.error = null

    try {
      const mockWallet: Wallet = {
        id: Math.random().toString(36).substr(2, 9),
        address: '0x' + Math.random().toString(16).substr(2, 40),
        chainId: 1,
        balance: '0',
        isConnected: true,
        provider,
      }

      runInAction(() => {
        this.activeWallet = mockWallet
        this.wallets.push(mockWallet)
        this.isConnecting = false
        localStorage.setItem('activeWallet', JSON.stringify(mockWallet))
      })

      return mockWallet
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Failed to connect wallet'
        this.isConnecting = false
      })
      throw error
    }
  }

  async disconnectWallet() {
    if (!this.activeWallet) return

    try {
      runInAction(() => {
        this.wallets = this.wallets.filter(w => w.id !== this.activeWallet?.id)
        this.activeWallet = null
        localStorage.removeItem('activeWallet')
      })
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'Failed to disconnect wallet'
      })
    }
  }

  async switchWallet(walletId: string) {
    const wallet = this.wallets.find(w => w.id === walletId)
    if (wallet) {
      this.activeWallet = wallet
      localStorage.setItem('activeWallet', JSON.stringify(wallet))
    }
  }

  async fetchBalance(address?: string) {
    const targetAddress = address || this.activeWallet?.address
    if (!targetAddress) return

    try {
      const response = await fetch(`/api/wallet/balance/${targetAddress}`)
      const data = await response.json()
      
      runInAction(() => {
        if (this.activeWallet && this.activeWallet.address === targetAddress) {
          this.activeWallet.balance = data.balance
        }
      })
    } catch (error) {
      console.error('Failed to fetch balance:', error)
    }
  }

  async sendTransaction(to: string, value: string) {
    if (!this.activeWallet) {
      throw new Error('No wallet connected')
    }

    const transaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      hash: '0x' + Math.random().toString(16).substr(2, 64),
      from: this.activeWallet.address,
      to,
      value,
      status: 'pending',
      timestamp: Date.now(),
    }

    this.transactions.unshift(transaction)

    setTimeout(() => {
      runInAction(() => {
        const tx = this.transactions.find(t => t.id === transaction.id)
        if (tx) {
          tx.status = 'confirmed'
        }
      })
    }, 3000)

    return transaction
  }

  async fetchTransactions(address?: string) {
    const targetAddress = address || this.activeWallet?.address
    if (!targetAddress) return

    try {
      const response = await fetch(`/api/wallet/transactions/${targetAddress}`)
      const data = await response.json()
      
      runInAction(() => {
        this.transactions = data.transactions
      })
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
    }
  }

  setNetworkStatus(status: 'online' | 'offline') {
    this.networkStatus = status
  }

  get isConnected() {
    return !!this.activeWallet?.isConnected
  }

  get pendingTransactions() {
    return this.transactions.filter(tx => tx.status === 'pending')
  }

  get confirmedTransactions() {
    return this.transactions.filter(tx => tx.status === 'confirmed')
  }
}