import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useSDKConsoleStore } from '@/app/providers/StoreProvider'

const AddAssetsPage: React.FC = observer(() => {
  const sdkConsoleStore = useSDKConsoleStore()
  const [selectedAsset, setSelectedAsset] = useState('')
  const [amount, setAmount] = useState('')
  const [depositMethod, setDepositMethod] = useState('external')

  useEffect(() => {
    // Set current implementation for console
    sdkConsoleStore.setCurrentImplementation('addAssets')
    
    // Simulate SDK calls
    sdkConsoleStore.addLog('addAssets', 'info', 'Initializing asset management...')
    setTimeout(() => {
      sdkConsoleStore.addLog('addAssets', 'success', 'Available assets loaded')
      sdkConsoleStore.addLog('addAssets', 'info', 'Generating deposit addresses...')
    }, 600)
    setTimeout(() => {
      sdkConsoleStore.addLog('addAssets', 'success', 'Deposit addresses generated for 12 assets')
    }, 1200)
  }, [sdkConsoleStore])

  const availableAssets = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: 'fa-brands fa-bitcoin',
      network: 'Bitcoin',
      minDeposit: '0.0001 BTC'
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      icon: 'fa-brands fa-ethereum', 
      network: 'Ethereum',
      minDeposit: '0.001 ETH'
    },
    {
      name: 'USD Coin',
      symbol: 'USDC',
      icon: 'fa-solid fa-dollar-sign',
      network: 'Ethereum',
      minDeposit: '1 USDC'
    },
    {
      name: 'Tether',
      symbol: 'USDT',
      icon: 'fa-solid fa-dollar-sign',
      network: 'Ethereum',
      minDeposit: '1 USDT'
    },
    {
      name: 'Chainlink',
      symbol: 'LINK',
      icon: 'fa-solid fa-link',
      network: 'Ethereum',
      minDeposit: '0.1 LINK'
    },
    {
      name: 'Polygon',
      symbol: 'MATIC',
      icon: 'fa-solid fa-shapes',
      network: 'Polygon',
      minDeposit: '1 MATIC'
    }
  ]

  const handleGenerateAddress = () => {
    if (!selectedAsset) return
    
    const asset = availableAssets.find(a => a.symbol === selectedAsset)
    
    // Real-time logging for SDK calls
    sdkConsoleStore.addLog('addAssets', 'info', `🔧 fireblocks.generateDepositAddress() called`)
    sdkConsoleStore.addLog('addAssets', 'info', `📋 Parameters: { vaultAccountId: "0", assetId: "${asset?.symbol}" }`)
    sdkConsoleStore.addLog('addAssets', 'info', `⏳ Generating ${asset?.symbol} deposit address...`)
    
    setTimeout(() => {
      const mockAddress = asset?.symbol === 'BTC' ? 
        'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' : 
        '0x742d35Cc6635C0532925a3b8D42a68bD38c0b8a2'
      
      sdkConsoleStore.addLog('addAssets', 'success', `✅ Address generated successfully`)
      sdkConsoleStore.addLog('addAssets', 'success', `📍 ${asset?.symbol} Address: ${mockAddress}`)
      sdkConsoleStore.addLog('addAssets', 'info', `💡 Address is now ready for deposits`)
    }, 800)
  }

  const handleBuyAsset = () => {
    if (!selectedAsset || !amount) return
    
    const asset = availableAssets.find(a => a.symbol === selectedAsset)
    const estimatedCost = parseFloat(amount) * 35000 * 1.025
    
    // Real-time logging for purchase flow
    sdkConsoleStore.addLog('addAssets', 'info', `🛒 fireblocks.initiatePurchase() called`)
    sdkConsoleStore.addLog('addAssets', 'info', `📋 Purchase Parameters:`)
    sdkConsoleStore.addLog('addAssets', 'info', `  • Asset: ${asset?.symbol}`)
    sdkConsoleStore.addLog('addAssets', 'info', `  • Amount: ${amount}`)
    sdkConsoleStore.addLog('addAssets', 'info', `  • Payment Method: CARD`)
    sdkConsoleStore.addLog('addAssets', 'info', `  • Estimated Cost: $${estimatedCost.toLocaleString()}`)
    
    setTimeout(() => {
      const orderId = 'order_' + Math.random().toString(36).substr(2, 9)
      sdkConsoleStore.addLog('addAssets', 'success', `✅ Purchase order created`)
      sdkConsoleStore.addLog('addAssets', 'success', `🆔 Order ID: ${orderId}`)
      sdkConsoleStore.addLog('addAssets', 'info', `🔄 Redirecting to payment provider...`)
      sdkConsoleStore.addLog('addAssets', 'info', `💳 Payment processing initiated`)
    }, 1000)
    
    setTimeout(() => {
      sdkConsoleStore.addLog('addAssets', 'success', `💰 Payment completed successfully`)
      sdkConsoleStore.addLog('addAssets', 'info', `⏳ Asset delivery in progress...`)
    }, 3000)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl text-gray-900 mb-2">Add Assets</h1>
        <p className="text-gray-600">Add cryptocurrency assets to your wallet</p>
      </div>

      {/* Asset Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Available Assets */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg text-gray-900">Available Assets</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {availableAssets.map((asset) => (
                <div
                  key={asset.symbol}
                  onClick={() => {
                    setSelectedAsset(asset.symbol)
                    sdkConsoleStore.addLog('addAssets', 'info', `🎯 Asset selected: ${asset.symbol} (${asset.name})`)
                    sdkConsoleStore.addLog('addAssets', 'info', `📊 Min deposit: ${asset.minDeposit}`)
                    sdkConsoleStore.addLog('addAssets', 'info', `🌐 Network: ${asset.network}`)
                  }}
                  className={`asset-card ${
                    selectedAsset === asset.symbol ? 'asset-card-selected' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <i className={`${asset.icon} text-gray-600`}></i>
                      </div>
                      <div>
                        <div className="text-gray-900 font-medium">{asset.name}</div>
                        <div className="text-sm text-gray-600">{asset.symbol} • {asset.network}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Min deposit</div>
                      <div className="text-sm text-gray-900">{asset.minDeposit}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Asset Methods */}
        <div className="space-y-6">
          {/* Deposit Method Selection */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg text-gray-900 mb-4">How would you like to add assets?</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="depositMethod"
                  value="external"
                  checked={depositMethod === 'external'}
                  onChange={(e) => {
                    setDepositMethod(e.target.value)
                    sdkConsoleStore.addLog('addAssets', 'info', `🔄 Deposit method changed to: External Transfer`)
                    sdkConsoleStore.addLog('addAssets', 'info', `💡 Will generate deposit address for external wallet transfers`)
                  }}
                  className="mr-3"
                />
                <div>
                  <div className="text-gray-900">External Transfer</div>
                  <div className="text-sm text-gray-600">Transfer from another wallet or exchange</div>
                </div>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="depositMethod"
                  value="buy"
                  checked={depositMethod === 'buy'}
                  onChange={(e) => {
                    setDepositMethod(e.target.value)
                    sdkConsoleStore.addLog('addAssets', 'info', `🔄 Deposit method changed to: Buy with Card/Bank`)
                    sdkConsoleStore.addLog('addAssets', 'info', `💡 Will initiate fiat-to-crypto purchase flow`)
                  }}
                  className="mr-3"
                />
                <div>
                  <div className="text-gray-900">Buy with Card/Bank</div>
                  <div className="text-sm text-gray-600">Purchase directly with fiat currency</div>
                </div>
              </label>
            </div>
          </div>

          {/* External Transfer */}
          {depositMethod === 'external' && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg text-gray-900 mb-4">Generate Deposit Address</h3>
              {selectedAsset ? (
                <div>
                  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <i className="fa-solid fa-info-circle text-blue-600"></i>
                      <span className="text-blue-900 font-medium">Selected Asset: {selectedAsset}</span>
                    </div>
                    <p className="text-sm text-blue-800">
                      Generate a secure deposit address for {selectedAsset} transfers
                    </p>
                  </div>
                  <button
                    onClick={handleGenerateAddress}
                    className="btn-primary w-full"
                  >
                    <i className="fa-solid fa-plus mr-2"></i>
                    Generate {selectedAsset} Deposit Address
                  </button>
                </div>
              ) : (
                <p className="text-gray-600">Please select an asset to generate a deposit address</p>
              )}
            </div>
          )}

          {/* Buy with Fiat */}
          {depositMethod === 'buy' && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg text-gray-900 mb-4">Buy Cryptocurrency</h3>
              {selectedAsset ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount to Purchase
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="input pr-16"
                        step="0.0001"
                        min="0"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500 text-sm">{selectedAsset}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Payment method</span>
                      <span className="text-gray-900">Credit/Debit Card</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Processing fee</span>
                      <span className="text-gray-900">2.5%</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium pt-2 border-t border-gray-300">
                      <span className="text-gray-900">Total cost</span>
                      <span className="text-gray-900">
                        {amount ? `$${(parseFloat(amount) * 35000 * 1.025).toLocaleString()}` : '$0.00'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleBuyAsset}
                    disabled={!amount}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="fa-solid fa-credit-card mr-2"></i>
                    Buy {selectedAsset}
                  </button>
                </div>
              ) : (
                <p className="text-gray-600">Please select an asset to purchase</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg text-gray-900">Recent Asset Additions</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-arrow-down text-green-600 text-xs"></i>
                </div>
                <div>
                  <div className="text-gray-900">Received BTC</div>
                  <div className="text-sm text-gray-600">Jan 15, 2025 14:32</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-600">+0.0234 BTC</div>
                <div className="text-sm text-gray-600">$847.32</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-credit-card text-blue-600 text-xs"></i>
                </div>
                <div>
                  <div className="text-gray-900">Purchased ETH</div>
                  <div className="text-sm text-gray-600">Jan 14, 2025 11:20</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-600">+1.2500 ETH</div>
                <div className="text-sm text-gray-600">$2,847.50</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-arrow-down text-green-600 text-xs"></i>
                </div>
                <div>
                  <div className="text-gray-900">Received USDC</div>
                  <div className="text-sm text-gray-600">Jan 13, 2025 16:45</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-600">+500 USDC</div>
                <div className="text-sm text-gray-600">$500.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default AddAssetsPage