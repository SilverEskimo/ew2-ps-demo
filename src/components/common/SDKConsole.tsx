import React from 'react'
import { observer } from 'mobx-react-lite'
import { useSDKConsoleStore } from '@/app/providers/StoreProvider'

// Simple syntax highlighter for JavaScript/TypeScript code - disabled for now to prevent issues
const highlightCode = (code: string): string => {
  // Return code as-is without highlighting to avoid breaking the display
  return code
}

export const SDKConsole: React.FC = observer(() => {
  const sdkConsoleStore = useSDKConsoleStore()
  const { currentImplementation, isConsoleOpen } = sdkConsoleStore

  if (!currentImplementation) return null

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Console Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex items-center space-x-3">
          <i className="fa-solid fa-terminal"></i>
          <h2 className="text-lg font-semibold">SDK Console</h2>
        </div>
        <button
          onClick={() => sdkConsoleStore.toggleConsole()}
          className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      {/* Current Flow Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <h3 className="text-lg font-semibold text-gray-900">{currentImplementation.title}</h3>
        <p className="text-sm text-gray-600">{currentImplementation.description}</p>
      </div>

      {/* Console Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Real-time Logs */}
        <div className="card p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <i className="fa-solid fa-stream text-blue-600 mr-2"></i>
            Real-time Activity
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {currentImplementation.logs.length > 0 ? (
              currentImplementation.logs.slice(-10).map((log, index) => (
                <div key={index} className="flex items-start space-x-2 text-xs">
                  <div className="flex-shrink-0 mt-0.5">
                    <i className={`fa-solid ${
                      log.level === 'success' ? 'fa-check-circle text-green-600' :
                      log.level === 'error' ? 'fa-times-circle text-red-600' :
                      log.level === 'warning' ? 'fa-exclamation-triangle text-yellow-600' :
                      'fa-info-circle text-blue-600'
                    }`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-900">{log.message}</div>
                    <div className="text-gray-500">{log.timestamp.toLocaleTimeString()}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center py-4">
                <i className="fa-solid fa-clock mb-2 block"></i>
                Waiting for activity...
              </div>
            )}
          </div>
        </div>

        {/* SDK Functions */}
        <div className="card p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <i className="fa-solid fa-code text-blue-600 mr-2"></i>
            SDK Functions
          </h4>
          <div className="space-y-1">
            {currentImplementation.sdkFunctions.map((func, index) => (
              <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                {func.name}
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Steps */}
        <div className="card p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <i className="fa-solid fa-list-check text-blue-600 mr-2"></i>
            Steps
          </h4>
          <div className="space-y-2">
            {currentImplementation.implementationSteps.map((step, index) => (
              <div key={index} className="text-xs">
                <div className="flex items-center space-x-2">
                  <i className={`fa-solid ${
                    step.completed ? 'fa-check text-green-600' : 'fa-circle text-gray-400'
                  }`}></i>
                  <span className={step.completed ? 'text-green-700' : 'text-gray-700'}>
                    {step.description}
                  </span>
                </div>
                {step.details && (
                  <div className="ml-6 mt-1 text-gray-600 bg-gray-50 px-2 py-1 rounded">
                    <i className="fa-solid fa-info-circle text-blue-500 mr-1"></i>
                    {step.details}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Code Implementation */}
        <div className="card p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <i className="fa-solid fa-terminal text-blue-600 mr-2"></i>
            JavaScript Code
          </h4>
          <div className="bg-gray-900 text-gray-300 p-3 rounded-lg overflow-x-auto">
            <pre className="text-xs font-mono whitespace-pre-wrap">
              <code>{currentImplementation.codeExample}</code>
            </pre>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="card p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <i className="fa-solid fa-plug text-blue-600 mr-2"></i>
            API Endpoints
          </h4>
          <div className="space-y-2">
            {currentImplementation.apiEndpoints.map((endpoint, index) => (
              <div key={index} className="text-xs">
                <div className="font-mono bg-gray-900 text-green-400 px-2 py-1 rounded">
                  <span className="text-blue-400">{endpoint.method}</span> {endpoint.endpoint}
                </div>
                <div className="text-gray-600 mt-1 px-2">{endpoint.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Retrieved */}
        <div className="card p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <i className="fa-solid fa-database text-blue-600 mr-2"></i>
            Data Retrieved
          </h4>
          <div className="space-y-1">
            {currentImplementation.dataRetrieved.map((data, index) => (
              <div key={index} className="text-xs text-gray-700">• {data}</div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <i className="fa-solid fa-rocket text-blue-600 mr-2"></i>
            Quick Actions
          </h4>
          <div className="space-y-2">
            <button 
              onClick={() => sdkConsoleStore.clearLogs(currentImplementation.id)}
              className="btn-outline text-xs py-1 px-3 w-full"
            >
              <i className="fa-solid fa-trash mr-1"></i>
              Clear Logs
            </button>
            {sdkConsoleStore.nextImplementations.map((impl) => (
              <button
                key={impl.id}
                onClick={() => sdkConsoleStore.setCurrentImplementation(impl.id)}
                className="btn-outline text-xs py-1 px-3 w-full text-left"
              >
                <i className={`fa-solid ${
                  impl.id === 'addAssets' ? 'fa-plus-circle' :
                  impl.id === 'sendTransaction' ? 'fa-exchange-alt' : 'fa-history'
                } mr-1`}></i>
                Try {impl.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})