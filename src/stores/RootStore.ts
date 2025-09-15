import { AuthStore } from './AuthStore'
import { WalletStore } from './WalletStore'
import { UIStore } from './UIStore'
import { SDKConsoleStore } from './SDKConsoleStore'
import { FireblocksStore } from './FireblocksStore'

export class RootStore {
  authStore: AuthStore
  walletStore: WalletStore
  uiStore: UIStore
  sdkConsoleStore: SDKConsoleStore
  fireblocksStore: FireblocksStore

  constructor() {
    this.authStore = new AuthStore()
    this.walletStore = new WalletStore()
    this.uiStore = new UIStore()
    this.sdkConsoleStore = new SDKConsoleStore()
    this.fireblocksStore = new FireblocksStore()
  }

  reset() {
    this.authStore.clearAuth()
    this.walletStore.disconnectWallet()
    this.uiStore.closeAllModals()
    this.fireblocksStore.reset()
  }
}

export const rootStore = new RootStore()

export type TRootStore = typeof rootStore