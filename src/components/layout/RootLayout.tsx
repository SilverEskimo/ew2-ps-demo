import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useAuthStore, useSDKConsoleStore } from '@/app/providers/StoreProvider'
import { SDKConsole } from '@components/common/SDKConsole'
import { UserAvatar } from '@components/common/UserAvatar'

export const RootLayout: React.FC = observer(() => {
  const authStore = useAuthStore()
  const sdkConsoleStore = useSDKConsoleStore()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="h-full text-gray-900">
      {/* Header */}
      <header className="header-gradient px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            
            {authStore.isLoggedIn && (
              <>
              <div className="text-xl text-gray-900">Fireblocks EW Demo</div>
              <nav className="hidden md:flex space-x-6">
                <Link
                  to="/wallet-summary"
                  className={isActive('/wallet-summary') ? 'nav-active' : 'nav-inactive'}
                >
                  Wallet Summary
                </Link>
                <Link
                  to="/transaction-history"
                  className={isActive('/transaction-history') ? 'nav-active' : 'nav-inactive'}
                >
                  Transaction History
                </Link>
                <Link
                  to="/add-assets"
                  className={isActive('/add-assets') ? 'nav-active' : 'nav-inactive'}
                >
                  Add Assets
                </Link>
                <Link
                  to="/send-transaction"
                  className={isActive('/send-transaction') ? 'nav-active' : 'nav-inactive'}
                >
                  Perform Transactions
                </Link>
                <button
                  onClick={() => sdkConsoleStore.toggleConsole()}
                  className={`nav-inactive ${sdkConsoleStore.isConsoleOpen ? 'text-blue-600' : ''}`}
                >
                  <i className="fa-solid fa-terminal mr-2"></i>
                  Console {sdkConsoleStore.isConsoleOpen ? 'On' : 'Off'}
                </button>
              </nav>
              </>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {authStore.isLoggedIn && (
              <>
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <i className="fa-regular fa-bell"></i>
                </button>
                <UserAvatar 
                  name={authStore.user?.name || 'User'}
                  size="md"
                />
                <button
                  onClick={() => authStore.logout()}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Layout - Side by Side */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Content */}
        <main className={`transition-all duration-300 ${
          authStore.isLoggedIn && sdkConsoleStore.isConsoleOpen 
            ? 'w-1/2 lg:w-3/5' 
            : 'w-full'
        } overflow-y-auto`}>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>

        {/* SDK Console Sidebar */}
        {authStore.isLoggedIn && (
          <aside className={`transition-all duration-300 bg-white border-l-2 border-gray-200 ${
            sdkConsoleStore.isConsoleOpen 
              ? 'w-1/2 lg:w-2/5' 
              : 'w-0'
          } overflow-hidden`}>
            <SDKConsole />
          </aside>
        )}
      </div>
    </div>
  )
})