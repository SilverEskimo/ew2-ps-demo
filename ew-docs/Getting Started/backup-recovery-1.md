---
title: "Backup and Recovery"
slug: "backup-recovery-1"
excerpt: ""
hidden: false
createdAt: "Tue Aug 29 2023 12:48:55 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Jun 03 2025 09:15:52 GMT+0000 (Coordinated Universal Time)"
---
# Overview

As outlined in the [Backup and Recovery Overview](https://ncw-developers.fireblocks.com/docs/backup-recovery), the backup and recovery features enable the creation of an encrypted copy of the end-user key share, which is then sent to Fireblocks for safekeeping. This process becomes essential when a user may lose access to their device or need to transition to a new one.

The application or the user must generate the recovery passphrase for AES encryption of the end-user key share. The end user _must_ securely preserve this passphrase. This precaution ensures that the private key share can be decrypted in a recovery situation, granting the user access to their key and enabling them to operate as usual.

Backing up the passphrase can be accomplished through various methods, and Fireblocks does not mandate any specific approach. For example, the end user can store the recovery passphrase in their iCloud account or Google Drive, or they may download and keep it locally on their device.

## Terms to know

- **`passphrase`:** The chosen passphrase for the backup. MPC key share #2 is encrypted using this passphrase and saved/encrypted along with the `passphraseId` from the Fireblocks cloud servers.
- **`passphraseId`:** The UUID created by the application.
- **`passphraseResolver`:** A callback that knows how to fetch the passphrase from its saved location when given a `passphraseId` value. For example, if you saved the passphrase on the end user's iCloud account, then when given the `passphraseId` value, the `passphraseResolver` callback fetches the passphrase from the iCloud account so that the `recoverKeys` function can decrypt the MPC key share.

# Backup procedure

> 🚧 Prerequisites
> 
> Before running a backup procedure, you will need to have an MPC key share on the device.
> 
> This can be obtained by either:
> 
> - Generating an MPC key share (new wallet scenarios) as shown [here](https://ncw-developers.fireblocks.com/docs/mpc-key-generation).
> - Running a recovery flow, as later described in this article.

```javascript Web
await ewCore.backupKeys(passphrase, passphraseId);
```
```java Android
// create a symmetric key for the encryption of the backup
var backupEncryptionKey = fireblocksSdk.generateRandomPassPhrase();

// store the backupEncryptionKey somewhere (user’s iCloud/Google, d/l, convert to seed phrase or other)

// backup the keys (including encryption)
fireblocks.backupKeys(passphrase, passphraseId) {
  Timber.d("Backup keys result: $it")
  callback.invoke(it)
}


```
```swift iOS
func backupKeys() async throws -> Set<KeyBackup> {
    //Initialize and create the Core SDK instance
  let instance = try getCore()
  return try await instance.backupKeys(passphrase: <passphrase>, passphraseId: <passphraseId>)
}

```

Please note that steps 1 and 2 are under your implementation, while step 3 calls the Fireblocks SDK backup.

1. Store the `passphrase` and `passphraseId` in your preferred user cloud (e.g., iCloud, Google Drive). The `passphraseId` must be a UUID, as required by Fireblocks.
2. Ensure the app can retrieve the `passphrase` during recovery on a different device. This is done via the `passphraseResolver` callback (supplied when calling `recoverKeys`): the SDK provides the `passphraseId`, and your implementation must return the corresponding `passphrase`.
   - One approach is to deterministically calculate the path to the stored passphrase in the user's cloud.
   - Alternatively, you can store and retrieve this data from another location of your choice.
3. Call the Fireblocks implementation for backup together with the `passphrase` and the `passphraseId`.

> 🚧 Backing up your keys post extension
> 
> In case you have extended your key set, as elaborated [here](https://ncw-developers.fireblocks.com/docs/multiple-algorithms#extending-your-key-set), you must repeat the above steps again, in order to back up your new, extended key set, as well.

# Recovery procedure

```javascript Web
await ewCore.recoverKeys(passphraseResolver);
```
```kotlin Android
// recover the backed up keys. We will use the given backupEncryptionKey to decrypt the keys
Fireblocks.getInstance(deviceId).recoverKeys(passphraseResolver = passphraseResolver) {
	Timber.d("Recover keys result: $it")
  callback.invoke(it)
}
```
```swift iOS
//Initialize and create the Core SDK instance
let instance = try getCore()
let keySet = try await instance.recoverKeys(passphraseResolver: passphraseResolver)


```

1. Call the Fireblocks SDK's `recoverKeys` function with a callback that implements a function that, when given a `passphraseId`, will fetch the associated `passphrase` for the user.
2. The Fireblocks SDK fetches the last encrypted key share with the associated `passphraseId` and then uses your callback to decrypt the private key share locally.

## Get the Device ID

The encrypted backup is associated with the end user's `deviceId`. Therefore, to recover and decrypt the key share saved on the Fireblocks cloud servers, the NCW SDK must be initialized with the same `deviceId` that created the backup. The NCW SDK cannot recover a key share of a different `deviceId`.

```javascript Web
await ew.getLatestBackup();
```
```curl Curl
curl --request GET \
     --url https://sandbox-api.fireblocks.io/v1/ncw/wallets/walletId/backup/latest \
     --header 'accept: application/json'
```

If you want to let your end users go into recovery mode, you need to determine the `deviceId` that will run the recovery procedure. To support this, Fireblocks has provided a function within the Fireblocks SDK that fetches the latest details about the backup of the specified `walletId`.

Note: If no backup is found for the specified wallet, a 404 status will be returned.

# Post-Recovery Behavior

Following recovery, the previously associated device is invalidated and loses the ability to perform MPC-related operations such as signing transactions, creating backups, adding devices, or takeovers. **The new device that successfully performed the recovery becomes the active device**.

> 🚧 Special Case: Same Device Recovery
> 
> Recovery may be performed on the same physical device that is still active and holds the key share.  
> While this is technically redundant, it is supported. In this case, the device performing the recovery will remain active.
