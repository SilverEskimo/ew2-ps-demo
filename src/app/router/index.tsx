import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from '@components/layout/RootLayout'
import { ProtectedRoute } from './ProtectedRoute'
import { LoadingSpinner } from '@components/common/LoadingSpinner'

const GoogleLoginPage = lazy(() => import('@features/auth/pages/GoogleLoginPage'))
const WalletSummaryPage = lazy(() => import('@features/wallet/pages/WalletSummaryPage'))
const TransactionHistoryPage = lazy(() => import('@features/wallet/pages/TransactionHistoryPage'))
const AddAssetsPage = lazy(() => import('@features/wallet/pages/AddAssetsPage'))
const SendTransactionPage = lazy(() => import('@features/wallet/pages/SendTransactionPage'))
const NotFoundPage = lazy(() => import('@features/demo/pages/NotFoundPage'))

const LazyLoad: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<LoadingSpinner />}>
    {children}
  </Suspense>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: 'login',
        element: <LazyLoad><GoogleLoginPage /></LazyLoad>,
      },
      {
        path: 'wallet-summary',
        element: (
          <ProtectedRoute>
            <LazyLoad><WalletSummaryPage /></LazyLoad>
          </ProtectedRoute>
        ),
      },
      {
        path: 'transaction-history',
        element: (
          <ProtectedRoute>
            <LazyLoad><TransactionHistoryPage /></LazyLoad>
          </ProtectedRoute>
        ),
      },
      {
        path: 'add-assets',
        element: (
          <ProtectedRoute>
            <LazyLoad><AddAssetsPage /></LazyLoad>
          </ProtectedRoute>
        ),
      },
      {
        path: 'send-transaction',
        element: (
          <ProtectedRoute>
            <LazyLoad><SendTransactionPage /></LazyLoad>
          </ProtectedRoute>
        ),
      },
      {
        path: '404',
        element: <LazyLoad><NotFoundPage /></LazyLoad>,
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      },
    ],
  },
])