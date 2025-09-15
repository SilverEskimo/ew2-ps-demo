import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useSDKConsoleStore } from '@/app/providers/StoreProvider'

const SendTransactionPage: React.FC = observer(() => {
  const sdkConsoleStore = useSDKConsoleStore()
  const [selectedAsset, setSelectedAsset] = useState('')
  const [recipientAddress, setRecipientAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [memo, setMemo] = useState('')
  const [feeType, setFeeType] = useState('medium')

  useEffect(() => {
    // Set current implementation for console
    sdkConsoleStore.setCurrentImplementation('sendTransaction')
    
    // Simulate SDK calls
    sdkConsoleStore.addLog('sendTransaction', 'info', 'Initializing transaction builder...')
    setTimeout(() => {
      sdkConsoleStore.addLog('sendTransaction', 'success', 'Transaction builder ready')
      sdkConsoleStore.addLog('sendTransaction', 'info', 'Loading available assets and balances...')
    }, 500)
    setTimeout(() => {
      sdkConsoleStore.addLog('sendTransaction', 'success', 'Assets loaded: 7 cryptocurrencies available')
    }, 1000)
  }, [sdkConsoleStore])

  const availableAssets = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      balance: '0.5432',
      usdValue: '$18,247.32',
      icon: 'fa-brands fa-bitcoin'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: '2.1847',
      usdValue: '$4,247.89',
      icon: 'fa-brands fa-ethereum'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: '1,247.50',
      usdValue: '$1,247.50',
      icon: 'fa-solid fa-dollar-sign'
    },
  ]

  const feeOptions = [
    { type: 'low', label: 'Low', time: '~30 min', fee: '0.0001 BTC (~$3.50)', recommended: false },
    { type: 'medium', label: 'Medium', time: '~10 min', fee: '0.0003 BTC (~$10.50)', recommended: true },
    { type: 'high', label: 'High', time: '~2 min', fee: '0.0008 BTC (~$28.00)', recommended: false },
  ]

  const handleValidateAddress = () => {
    if (!recipientAddress) return
    
    sdkConsoleStore.addLog('sendTransaction', 'info', `Validating address: ${recipientAddress.slice(0, 10)}...`)
    
    setTimeout(() => {
      const isValid = recipientAddress.length > 25 // Simple validation simulation
      if (isValid) {
        sdkConsoleStore.addLog('sendTransaction', 'success', 'Address validation successful')
      } else {
        sdkConsoleStore.addLog('sendTransaction', 'error', 'Invalid address format')
      }
    }, 800)
  }

  const handleEstimateFee = () => {
    if (!selectedAsset || !amount) return
    
    sdkConsoleStore.addLog('sendTransaction', 'info', `Estimating fees for ${amount} ${selectedAsset}...`)
    
    setTimeout(() => {
      sdkConsoleStore.addLog('sendTransaction', 'success', `Fee estimation complete: ${feeOptions.find(f => f.type === feeType)?.fee}`)
    }, 600)
  }

  const handleSendTransaction = () => {
    if (!selectedAsset || !recipientAddress || !amount) return

    sdkConsoleStore.addLog('sendTransaction', 'info', `Creating transaction for ${amount} ${selectedAsset}...`)
    
    setTimeout(() => {
      sdkConsoleStore.addLog('sendTransaction', 'success', 'Transaction created and signed')
      sdkConsoleStore.addLog('sendTransaction', 'info', 'Broadcasting to network...')
    }, 1000)
    
    setTimeout(() => {
      const mockTxId = 'tx_' + Math.random().toString(36).substr(2, 9)
      sdkConsoleStore.addLog('sendTransaction', 'success', `Transaction broadcast successful: ${mockTxId}`)
      sdkConsoleStore.addLog('sendTransaction', 'info', 'Transaction pending confirmation...')
    }, 2000)
  }

  const selectedAssetData = availableAssets.find(a => a.symbol === selectedAsset)
  const estimatedUsdValue = selectedAssetData && amount ? 
    (parseFloat(amount) * (parseFloat(selectedAssetData.usdValue.replace(/[$,]/g, '')) / parseFloat(selectedAssetData.balance.replace(',', '')))).toLocaleString() : 
    '0'

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl text-gray-900 mb-2">Send Transaction</h1>
        <p className="text-gray-600">Send cryptocurrency to another wallet address</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Transaction Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Asset Selection */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg text-gray-900 mb-4">Select Asset</h3>
            <div className="space-y-3">
              {availableAssets.map((asset) => (
                <div
                  key={asset.symbol}
                  onClick={() => setSelectedAsset(asset.symbol)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedAsset === asset.symbol
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <i className={`${asset.icon} text-gray-600`}></i>
                      </div>
                      <div>
                        <div className="text-gray-900 font-medium">{asset.name}</div>
                        <div className="text-sm text-gray-600">{asset.symbol}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-900">{asset.balance} {asset.symbol}</div>
                      <div className="text-sm text-gray-600">{asset.usdValue}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction Details */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg text-gray-900 mb-4">Transaction Details</h3>
            <div className="space-y-4">
              {/* Recipient Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient Address
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    placeholder="Enter wallet address..."
                    className="input flex-1"
                  />
                  <button
                    onClick={handleValidateAddress}
                    disabled={!recipientAddress}
                    className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Validate
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Double-check the address. Transactions cannot be reversed.
                </p>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="input pr-20"
                    step="0.0001"
                    min="0"
                    max={selectedAssetData?.balance.replace(',', '')}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 text-sm">
                      {selectedAsset || 'Select asset'}
                    </span>
                  </div>
                </div>
                {selectedAssetData && (
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Available: {selectedAssetData.balance} {selectedAsset}</span>
                    <span>≈ ${estimatedUsdValue}</span>
                  </div>
                )}
              </div>

              {/* Memo (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Memo (Optional)
                </label>
                <input
                  type="text"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="Add a note..."
                  className="input"
                  maxLength={100}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Some exchanges require a memo for deposits
                </p>
              </div>
            </div>
          </div>

          {/* Network Fee */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg text-gray-900">Network Fee</h3>
              <button
                onClick={handleEstimateFee}
                disabled={!selectedAsset || !amount}
                className="text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Estimate
              </button>
            </div>
            <div className="space-y-3">
              {feeOptions.map((option) => (
                <div
                  key={option.type}
                  onClick={() => setFeeType(option.type)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    feeType === option.type
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-900 font-medium">{option.label}</span>
                          {option.recommended && (
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                              Recommended
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">{option.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-900 text-sm">{option.fee}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg text-gray-900 mb-4">Transaction Summary</h3>
            
            {selectedAsset && recipientAddress && amount ? (
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sending</span>
                  <span className="text-gray-900">{amount} {selectedAsset}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">USD Value</span>
                  <span className="text-gray-900">${estimatedUsdValue}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Network Fee</span>
                  <span className="text-gray-900">{feeOptions.find(f => f.type === feeType)?.fee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">To Address</span>
                  <span className="text-gray-900 font-mono text-xs">
                    {recipientAddress.slice(0, 6)}...{recipientAddress.slice(-4)}
                  </span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between font-medium">
                  <span className="text-gray-900">Total Cost</span>
                  <span className="text-gray-900">{amount} {selectedAsset}</span>
                </div>
                
                <button
                  onClick={handleSendTransaction}
                  className="btn-primary w-full mt-4"
                >
                  <i className="fa-solid fa-paper-plane mr-2"></i>
                  Send Transaction
                </button>
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">
                Complete the form to see transaction summary
              </p>
            )}
          </div>

          {/* Security Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <i className="fa-solid fa-shield-alt text-yellow-600"></i>
              <h4 className="text-yellow-900 font-medium">Security Notice</h4>
            </div>
            <p className="text-sm text-yellow-800">
              Always double-check the recipient address. Cryptocurrency transactions are irreversible.
            </p>
          </div>

          {/* Recent Recipients */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg text-gray-900 mb-4">Recent Recipients</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <div className="text-sm text-gray-900">Exchange Deposit</div>
                  <div className="text-xs text-gray-500 font-mono">1A1zP1...DivfNa</div>
                </div>
                <button className="text-xs text-blue-600 hover:text-blue-700">
                  Use
                </button>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div>
                  <div className="text-sm text-gray-900">Personal Wallet</div>
                  <div className="text-xs text-gray-500 font-mono">0x742d...0b8a2</div>
                </div>
                <button className="text-xs text-blue-600 hover:text-blue-700">
                  Use
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default SendTransactionPage