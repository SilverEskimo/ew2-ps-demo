---
title: "Initializing the SDKs"
slug: "initializing-the-sdk"
excerpt: ""
hidden: false
createdAt: "Tue Aug 29 2023 12:47:52 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jun 23 2025 12:37:17 GMT+0000 (Coordinated Universal Time)"
---
# Initialize the EW SDK

1. Initialize a new `EmbeddedWallet` SDK instance
2. Call `ew.assignWallet()` - the wallet is created if doesn't exist yet.

When creating a new instance, provide the following parameters:

- **`authClientId`:** Your OAuth client ID configured in the Fireblocks Console
- **`authTokenRetriever`:** Provides a method to fetch the end user’s IDP token (via `getAuthToken()`).
- **`reporting` (optional):** When enabled, the SDK sends error reports to Fireblocks to help diagnose failures.

```javascript Web
const ew = new EmbeddedWallet({
  env: ENV_CONFIG.NCW_SDK_ENV,
  logLevel: 'INFO',
  logger,
  authClientId: ENV_CONFIG.AUTH_CLIENT_ID,
  authTokenRetriever: {
    getAuthToken: () => this._rootStore.userStore.getAccessToken(),
  },
  reporting: {
    enabled: true,
  },
});

const wallet = await ew.assignWallet();
```
```java Android
val embeddedWallet = EmbeddedWallet(
                context,
                authClientId = authClientId,
                authTokenRetriever = object : AuthTokenRetriever {
                    override suspend fun getAuthToken(): Result<String> {
                        val idToken = runBlocking {
                            SignInUtil.getInstance().getIdTokenBlocking(context)
                        }
                        return idToken?.let {
                            Result.success(it)
                        } ?: Result.failure(Exception("Failed to get auth token"))
                    }
                },
                options = EmbeddedWalletOptions.Builder().build()
)
  
```
```swift iOS
//EnvironmentConstants.ewEnv - default environment is .production
let options = EmbeddedWalletOptions(env: EnvironmentConstants.ewEnv, logLevel: .info, logToConsole: true, logNetwork: true, eventHandlerDelegate: nil, reporting: .init(enabled: true))

func initialize() throws -> EmbeddedWallet {
  guard instance == nil else {
    return instance!
  }

  return try EmbeddedWallet(authClientId: authClientId, authTokenRetriever: self, options: options)
}

```

# Initialize the EW Core SDK

Generate a `deviceId`. This value is unique per SDK instance.

Each embedded wallet (EW) `walletId` correlates to one or more `deviceId`:

```javascript Web
// generate a device Id, do it only once per SDK instance

const deviceId = FireblocksNCW.generateDeviceId()
```
```java Android
// generate a device ID, do it only once per SDK instance
val deviceId = Fireblocks.generateDeviceId()
```
```swift iOS
// generate a device Id, do it only once per SDK instance

let deviceId = Fireblocks.generateDeviceId()
```

When creating a new SDK instance, provide the following parameters:

- **`deviceId`:** The device ID associated with the end user and the Embedded Wallet.
- **`messagesHandler`:** The [outgoing message handler](https://ncw-developers.fireblocks.com/docs/outgoingincoming-message-handling).
- **`keyStorage`:** The [key storage handler](https://ncw-developers.fireblocks.com/docs/key-handler).
- **`eventsHandler` (optional):** The [events handler](https://ncw-developers.fireblocks.com/docs/event-handler).

## Example

```javascript Web
const coreOptions: ICoreOptions = {
  deviceId,
  eventsHandler,
  secureStorageProvider,
  storageProvider,
};

const ewCore =
      getFireblocksNCWInstance(coreOptions.deviceId) ?? (await ew.initializeCore(coreOptions));

```
```java Android
val coreOptions = CoreOptions.Builder()
  .setEventHandler(object : FireblocksEventHandler {
    override fun onEvent(event: Event) {
				//handle events or just log them if needed
      }
  }).build()
embeddedWallet.initializeCore(deviceId, keyStorage, coreOptions)
```
```swift iOS
func initializeCore() throws -> Fireblocks {
  guard !deviceId.isEmpty else {
    throw CustomError.deviceId
  }

  //Initialize the EW SDK 
  let ewInstance = try getInstance()

  do {
    return try Fireblocks.getInstance(deviceId: deviceId)
  } catch {
    //keyStorageDelegate is a host app implementation
    self.keyStorageDelegate = KeyStorageProvider(deviceId: deviceId)
    return try ewInstance.initializeCore(deviceId: deviceId, keyStorage: keyStorageDelegate!)
  }
}

```

> 📘 Note
> 
> All SDKs (JS, Android, iOS) can be initialized with one of the following environments:  
> sandbox, production.
> 
> The environment initialization value will affect the selection of the correct root certificate in the SDK. If your tenant resides in the production environment (whether it be testnet or mainnet), then choose production. If you are exploring NCW using the sandbox, then simply choose sandbox.

# Device ID

A `deviceId` is a UUID you generate to uniquely identify a client device. It must be provided when initializing the EW Core SDK. Store the `deviceId` locally and reuse it on every SDK initialization for that device.

When to generate a new `deviceId`:

- New wallet on a new device.
- Adding a new device to an existing wallet.

When to reuse an existing `deviceId`:

- Same device and wallet — retrieve from local storage.
- Recovering a lost device using the last backup.

To recover keys from a lost device, initialize the SDK with the same `deviceId` used during the last backup. You can retrieve this info via `ew.getLatestBackup()`.

> 📘 Note
> 
> If a wallet is fully initialized with a given `deviceId`, its key share can only be transferred to a new device via the [recovery procedure](https://ncw-developers.fireblocks.com/v5.0/docs/backup-recovery-1#recovery-procedure). After recovery, the original device will no longer be able to participate in MPC operations.
