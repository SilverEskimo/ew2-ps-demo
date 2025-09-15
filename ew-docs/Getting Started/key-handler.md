---
title: "Key Storage"
slug: "key-handler"
excerpt: ""
hidden: false
createdAt: "Tue Aug 29 2023 15:59:33 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jul 25 2024 15:16:18 GMT+0000 (Coordinated Universal Time)"
---
# Overview

The Fireblocks Embedded Wallet (EW) feature offers a flexible key storage mechanism that allows you to customize the implementation of key loading and saving processes outside the mobile Software Development Kit (SDK) itself. 

This approach allows you to incorporate various security measures, such as mobile enclaves, biometric authentication, and two-factor authentication (2FA). The EW SDK is agnostic to the precise methodology employed for key storage, with the implementation being supplied to the SDK during the initialization process.

# Web vs. Mobile

When integrating with the EW Web SDK, the key storage approach differs from that of Android and iOS. Unlike these platforms, where storage mechanisms are provided, JavaScript applications can run in various environments such as web browsers, Node.js, or Electron. This variability means you can't rely on platform-specific storage capabilities. Instead, customers using our EW Web SDK are tasked with supplying a suitable storage solution.

Our SDK incorporates a secure storage feature involving a process of _locking_ and _unlocking_. Before any data retrieval or storage operation, the SDK triggers the _unlock_ function, and just before finalizing the operation, it invokes the _lock_ function.

Distinct from Android and iOS paradigms involving data removal or targeted checks, the web-based approach revolves around managing data stored and loaded with each SDK usage.

One option for key storage involves encrypting the secret key material with a password and storing it in the local browser storage.  However, this implies that users switching to a different machine would lose access to this data. Alternatively, storing the encrypted data on the server allocates each user a secure section on the server, accessible post-login.

The key storage provider has to be provided upon SDK initialization and must implement the following interface:

```javascript Web
export interface IStorageProvider {
  get(key: string): Promise<string | null>;
  set(key: string, data: string): Promise<void>;
}

export interface ISecureStorageProvider extends IStorageProvider {
  getAccess(): Promise<void>;
}
```
```java Android
interface FireblocksKeyStorage {

    /**
     * Store raw keys data
     * @param keys map of keyId and raw [ByteArray] of data.
     * @param callback result is a map of store keys operation result
     */
    fun store(keys: Map<String, ByteArray>, callback: (result: Map<String, Boolean>) -> Unit)

    /**
     * Load raw keys data
     * @param keyIds a set of key ids to load
     * @param callback result is a map of key id and raw key data as [ByteArray]
     */
    fun load(keyIds: Set<String>, callback: (result: Map<String, ByteArray>) -> Unit)

    fun remove(keyIds: Set<String>, callback: (result: Map<String, Boolean>) -> Unit)

    fun contains(keyIds: Set<String>, callback: (result: Map<String, Boolean>) -> Unit)
}
```
```swift iOS
public protocol KeyStorageDelegate: AnyObject {
     
     /// Store raw keys data
     /// - Parameters:
     ///   - keys: map of keyId and Data
     ///   - callback: result is a map of store keys and operation result
    func store(keys: [String: Data], callback: @escaping ([String: Bool]) -> ())
     
     
     /// Load raw keys data
     /// - Parameters:
     ///   - keyIds: a set of key ids to load
     ///   - callback: result is a map of key id and raw key data as Data
    func load(keyIds: Set<String>, callback: @escaping ([String: Data]) -> ())
     
     /// Remove raw data from your storage
     /// - Parameter keyId: key id to remove
    func remove(keyId: String)
     
     /// Check if Set of key ids is stored on your storage
     /// - Parameters:
     ///   - keyIds: a set of key ids to verify
     ///   - callback: result is a map of keys and operation result
    func contains(keyIds: Set<String>, callback: @escaping ([String : Bool]) -> ())
```

- `store`/`set`: Called to store the MPC key share on the end-user device
- `load`/`get`: Called to get the MPC key share from the end-user device
- `remove` (**Android and iOS only**): Called to remove the MPC key share from the user device
- `contains` (**Android and iOS only**): Called to check if the set of MPC key shares is stored on the device
- `getAccess` (**Web only**): Called to lock or unlock the secure key storage upon every NCW SDK execution
