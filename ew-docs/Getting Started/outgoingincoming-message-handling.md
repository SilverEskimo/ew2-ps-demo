---
title: "Outgoing Message Handling"
slug: "outgoingincoming-message-handling"
excerpt: ""
hidden: true
createdAt: "Tue Aug 29 2023 12:48:11 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue May 27 2025 14:57:30 GMT+0000 (Coordinated Universal Time)"
---
# Overview

![](https://files.readme.io/9a6c97b-image.png)

# Outgoing messages

Our Software Development Kit (SDK) communicates with the Fireblocks REST API through a customizable callback function set during the SDK initialization. The callback handles outgoing requests, such as MPC messages related to key share generation, transaction signing, or backup and recovery operations.

A simple callback implementation would be to proxy all requests to the customer's backend, which forwards them to the Fireblocks API RPC endpoint using the appropriate API user.

The outgoing message handler should implement the `handleOutgoingMessage(payload: string)` method (according to the defined interface), which the Fireblocks Embedded Wallet (EW) SDK calls with the message to be sent to the backend and then to the Fireblocks RPC.

## Examples

```javascript Web
const messagesHandler: IMessagesHandler = {
          handleOutgoingMessage: (message: string) => {
            if (!apiService) {
              throw new Error("apiService is not initialized");
            }
            // Send the message to the backend server
            return apiService.sendMessage(deviceId, message);
          },
        };
```
```java Android
// create your own implementation of the FireblocksMessageHandler and pass it in the Fireblocks.initialize method
val fireblocksMessageHandler = FireblocksMessageHandlerImpl()

// An implementation example for the FireblocksMessageHandler. 
// Override the handleOutgoingMessage method and call pass the payload to Fireblocks BE using your BE implementation. 
// Make sure you to invoke the responseCallback with the response body or the errorCallback in case of an error
class FireblocksMessageHandlerImpl(
private val context: Context, 
private val deviceId: String) 
: FireblocksMessageHandler, CoroutineScope {
    private val job = Job()
    override val coroutineContext: CoroutineContext
        get() = Dispatchers.IO + job

    override fun handleOutgoingMessage(
payload:String,
responseCallback: (responseBody: String?) -> Unit,
      errorCallback: (errorMessage: String?) -> Unit) {
        runBlocking {
            withContext(Dispatchers.IO) {
                // do rest API call
                Timber.i("calling invoke rest API")
                runCatching {
                    val response = Api.with(StorageManager.get(context, deviceId)).invoke(deviceId, MessageBody(payload)).execute()
                    Timber.i("got response from invoke rest API, code:${response.code()}, isSuccessful:${response.isSuccessful}")
                    responseCallback(response.body())
                }.onFailure {
                    Timber.e(it, "Failed to call invoke Api")
                    errorCallback("Failed to call invoke Api")
                }
            }
        }
    }
}

```
```swift iOS
extension DeviceInstance: MessageHandlerDelegate {
    func handleOutgoingMessage(payload: String, response: @escaping (String?) -> (), error: @escaping (String?) -> ()) {
        sessionManager.rpc(deviceId: deviceId, message: payload) { response in
            //handle response
        } error: { error in
            //handle error
        }
    }
}
```

# Incoming messages

> 🚧 Prerequisites
> 
> Make sure you have completed the [Webhook Configuration guide](https://ncw-developers.fireblocks.com/docs/webhook-configuration) before continuing.

After setting up your webhook, you will receive push notifications of various message types, including transaction status updates and multiple device webhook notifications.
