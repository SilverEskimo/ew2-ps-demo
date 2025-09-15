---
title: "Using ECDSA and EdDSA"
slug: "multiple-algorithms"
excerpt: ""
hidden: false
createdAt: "Thu Apr 11 2024 09:26:44 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu May 29 2025 08:35:22 GMT+0000 (Coordinated Universal Time)"
---
# Overview

Fireblocks workspaces support non-custodial wallets with two algorithms: `MPC_ECDSA_SECP256K1` (ECDSA) and `MPC_EDDSA_ED25519` (EdDSA). 

Each algorithm allows the addition of different assets. For example, generating an ECDSA key set will let you add asset such as Bitcoin, or Ethereum, while generating an EdDSA key set will let you add Solana, or Algorand, for example.

A wallet can meet one of the following states:

- Generate ECDSA keys only.
- Generate EdDSA keys only.
- Generate ECDSA & EdDSA keys.
- Add EdDSA keys to an already existing ECDSA key set.
- Add ECDSA keys to an already existing EdDSA key set.

> 🚧 Version Compatibility
> 
> To fully utilize an expandable wallet with your preferred algorithms, ensure that you are using Web SDK version >=12.2.0 and Mobile SDK version >=2.6.0.

# Extending Your Key Set

> 🚧 Post Extension Backup
> 
> It is **crucial** to perform **another** backup after you have extended your key set. Please refer to the first point below, and make sure you follow the instructions there.

Should you face a situation where you already have an existing key set, you can generate another key set for the different algorithm, as shown in [MPC Key Generation](doc:mpc-key-generation). 

Assuming you have generated an ECDSA key set, you should now trigger the key generation function with the EdDSA algorithm (`MPC_EDDSA_ED25519`) only.

In cases of extending your key set, you are required to make sure you have performed the same flows you have implemented for your already existing key set, that is:

1. Backup and Recovery, as seen [here](https://ncw-developers.fireblocks.com/docs/backup-recovery-1). Make sure you back up the new key set after generating the keys. By default, backup enforcement is enabled and you won't be able to add assets to your newly extended key set (e.g. Solana for EdDSA) until you have backed up your key set.
2. Multiple Devices, as seen [here](https://ncw-developers.fireblocks.com/docs/multiple-devices). In case there are multiple devices for the same wallet, and one of them has extended its key set, you are required to run the join wallet operation again, for your newly extended key set.

# Retrieving the Device Keys Status

The [MPC Keys Generation ](https://ncw-developers.fireblocks.com/docs/mpc-key-generation#key-generation) process is a multi-step operation that can fail or stop in the middle for various reasons, such as a network error or the end user leaving the application midway through the process. If a failure or stoppage occurs, you end up with a device and a `deviceId` that cannot be used until you complete the MPC key generation process.

To check the current key status for a device, there are two methods you can use:

1. Call the `getKeysStatus` function on the web SDK or mobile SDK. When `keyStatus` returns **READY**, the MPC key generation process has been completed. Note that **READY** is the only valid final status for the key.
2. Call the [Get device key setup state endpoint](https://developers.fireblocks.com/reference/getdevicesetupstate). This endpoint returns the device's current status and includes some additional response parameters:
   1. **SetupStatus:** Returns as **COMPLETE** or **INCOMPLETE** per key that started creation on the device.
   2. **Algorithm name:** Returns as `MPC_ECDSA_SECP256K1` or `MPC_EDDSA_ED25519`.
   3. **backedUp:** This boolean flag indicates whether the keys were [backed up ](https://ncw-developers.fireblocks.com/docs/backup-recovery-1) by any of the wallet's devices. Remember, a wallet can have [multiple devices](https://ncw-developers.fireblocks.com/docs/multiple-devices) associated with it.

Note that a device's status will only return as **COMPLETE** when all the keys declared in its workspace have reached the **COMPLETE** status and the device's backup flag is set to **true**.

# Retrieving the Wallet Key Status

You can also query a wallet's status by calling the [Get wallet key setup state endpoint](https://developers.fireblocks.com/reference/getwalletsetupstate). The response includes the current status of all devices associated with the wallet. Note that a wallet is considered **COMPLETE** as long as at least one of its devices also has the **COMPLETE** status.

If you send a request to an incomplete wallet or device, your request will fail and Fireblocks may return [error codes ](https://ncw-developers.fireblocks.com/docs/api-errors) to provide context for the request's failure.

# Removing Keys After Irrecoverable Loss

In **rare** cases, a wallet may become unusable if a new key set is added but **not backed up** before the device is lost.  
For example, if a wallet originally had _ECDSA_ keys that were backed up, and _EdDSA_ keys were later added but never backed up, losing the device now will leave the wallet in an incomplete state. This will cause most wallet operations to fail across all devices.

To resolve this and regain control of the backed-up _ECDSA_ keys, you need to perform an administrative operation to explicitly remove the _EdDSA_ algorithm from the wallet’s algorithm set. This is done using the Fireblocks SDK initialized with the EW Admin API user's private key:

```javascript
const response = await fireblocksAdmin.deleteSigningAlgorithm(walletId, [SigningAlgorithm.MPC_EDDSA_ED25519])
```

This will allow the wallet to operate again using the remaining _ECDSA_ key set.

## Re-generating the Key Set

Once the wallet is operational again, you can re-generate a new _EdDSA_ keys set from your client application, as mentioned in [MPC Key Generation](https://ncw-developers.fireblocks.com/docs/mpc-key-generation):

```javascript Web
import { IKeyDescriptor } from "@fireblocks/ncw-js-sdk";

// Generate MPC Keys
const algorithms = new Set(["MPC_CMP_EDDSA_ED25519"]);
const keyDescriptor: Set<IKeyDescriptor> = await ewCore.generateMPCKeys(algorithms);
```
```java Android
val algorithms = setOf(Algorithm.MPC_EDDSA_ED25519)
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

**Note**: This example assumes the _ECDSA_ keys were backed up and the _EdDSA_ keys were lost. The same approach applies to any algorithm type.

> 📘 Important Considerations
> 
> 1. This API only removes a signing algorithm. To add algorithms, see [Extending Your Key Set](doc:multiple-algorithms#extending-your-key-set).
> 2. A signing algorithm cannot be removed if any of the following apply:
>    1. Assets already exist under that algorithm.
>    2. The public key was retrieved using `getPublicKey`.
>    3. A takeover has been performed for the wallet.
