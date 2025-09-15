import React, { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { rootStore } from '@stores/index'
import type { TRootStore } from '@stores/index'

const StoreContext = createContext<TRootStore | undefined>(undefined)

interface StoreProviderProps {
  children: ReactNode
  store?: TRootStore
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ 
  children, 
  store = rootStore 
}) => {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = (): TRootStore => {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error('useStore must be used within StoreProvider')
  }
  return store
}

export const useAuthStore = () => useStore().authStore
export const useWalletStore = () => useStore().walletStore
export const useUIStore = () => useStore().uiStore
export const useSDKConsoleStore = () => useStore().sdkConsoleStore
export const useFireblocksStore = () => useStore().fireblocksStore