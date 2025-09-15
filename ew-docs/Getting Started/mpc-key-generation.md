---
title: "MPC Key Generation"
slug: "mpc-key-generation"
excerpt: ""
hidden: false
createdAt: "Tue Aug 29 2023 12:48:36 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jun 23 2025 12:38:57 GMT+0000 (Coordinated Universal Time)"
---
# Overview

The creation of multi-party computation (MPC) keys involves a dynamic, step-by-step procedure that involves several rounds of communication between the end user's device and Fireblocks. This process operates asynchronously, meaning that it takes place over multiple interactions rather than a single continuous operation.

# Key Generation

Let's break down the process for better clarity:

1. Your application calls the `generateMPCKeys` method in our SDK to initiate the generation of MPC keys. This step triggers the process and sets everything in motion. 
2. `generateMPCKeys` can be called with the algorithms you wish to create under the wallet. Currently, it is `MPC_EDDSA_ED25519` or `MPC_ECDSA_SECP256K1`. More information about it can be found [here](https://ncw-developers.fireblocks.com/docs/multiple-algorithms) 
3. The crucial part of the whole process lies in the communication rounds between the end user's device and Fireblocks. These rounds are essential for securely creating the keys.
4. The process unfolds repeatedly, with each round building upon the previous one. Your application exchange messages, refining the communication until the process is complete.
5. After successfully generating MPC keys, the final step involves securely storing these keys to ensure protection for your end users. You can tailor this process to your preferences through various options, such as mobile enclaves, biometric authentication, two-factor authentication (2FA), and more. You retain total control over the implementation that best suits your security needs.

# Key Generation

First, create a new EW using the EW SDK:

```javascript Web
// Assign (or create) the EW wallet
const wallet = await ew.assignWallet();
```
```kotlin Android
embeddedWallet.assignWallet()
```
```swift iOS
embeddedWallet.assignWallet()
```

Next, create a new account in the newly created EW (needed once)

```javascript Web
// Create account under wallet
const newAccount = await ew.createAccount();
```
```kotlin Android
embeddedWallet.createAccount()
```
```swift iOS
embeddedWallet.createAccount()
```

Lastly, start the MPC key generation from your application. You can add the below to your customer application.

```javascript Web
import { IKeyDescriptor } from "@fireblocks/ncw-js-sdk";

// Generate MPC Keys
const algorithms = new Set(["MPC_CMP_ECDSA_SECP256K1"]);
const keyDescriptor: Set<IKeyDescriptor> = await ewCore.generateMPCKeys(algorithms);
```
```java Android
val algorithms = setOf(Algorithm.MPC_ECDSA_SECP256K1)
fireblocksSdk.generateMPCKeys(algorithms = algorithms){ result ->
    Timber.i("generateMPCKeys result: $result")
}
```
```swift iOS
func generateKeys(algorithms: Set<Algorithm>) async throws -> Set<KeyDescriptor> {
  //Initialize and create the Core SDK instance
  let instance = try getCore()
  return try await instance.generateMPCKeys(algorithms: algorithms)
}

```

If the device storage has generated keys once (e.g., the EW Core SDK already initialized with a specific `deviceId` that was called successfully with the `generateMPCKeys` function), you do not need to call this function. This scenario relates to a situation in which an end-user is logging in to an already set-up device.

> 📘 Note
> 
> If you use a `deviceId` or `walletId` that previously had keys generated—but those keys are no longer present on the current device (e.g., after an app reinstall or using a new browser)—calling `generateMPCKeys` will fail. Fireblocks only allows key generation once per walletId–deviceId pair. In this case, you must recover the key share using the `recoverKeys` method.
