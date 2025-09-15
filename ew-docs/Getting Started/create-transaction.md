---
title: "Create Transaction"
slug: "create-transaction"
excerpt: ""
hidden: false
createdAt: "Tue Aug 29 2023 12:49:13 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jun 23 2025 12:50:15 GMT+0000 (Coordinated Universal Time)"
---
# Overview

The transaction process is initiated with the Customer Application, where the end-user initiates the transaction via their user interface. Subsequently, the application must trigger a call to the customer backend, which invokes the Fireblocks API with all the necessary parameters to generate a new transaction. [Learn how to initiate the create transaction API call to Fireblocks](https://developers.fireblocks.com/docs/creating-a-transaction).

Following this, the Fireblocks API will provide a unique transaction ID for the newly established transaction. As the transaction is submitted, its lifecycle begins, and its status updates based on its phase within the system. Fireblocks will dispatch a webhook notification for each transaction status update.

The most important status for this step is the **Pending Signature** status, which signifies that the transaction requires the end-user's signature. The client application needs to be notified for any transaction in the **Pending Signature** status. The most efficient way to achieve this is sending push notification to the client.

Once the application receives a transaction that requires signing, along with the transaction details, including the transaction identifier (**txId**), it should invoke the `signTransaction(txId)` method provided by the EW SDK to initiate the signing process.

It's important to note that the MPC signing process is asynchronous and involves multiple rounds of communication between Fireblocks and the end user. Therefore, the same protocol for managing outgoing and incoming messages should also be applied in this context.

# Example

```javascript Web
const txArgs: TransactionArguments = {
  source: {
    type: PeerType.END_USER_WALLET,
    walletId: '<my_user_wallet_id>,
    id: '0',
  },
  destination: {
    PeerType.ONE_TIME_ADDRESS,
    oneTimeAddress: {
      address: '<some_ETH_address>'
    }
  },
  assetId: 'ETH',
  amount: '<amount>',
  note: "My First EW Transaction"
};

const txId = await ew.createTransaction(txArgs);
```
```kotlin Android
// createOneTimeAddressTransaction
suspend fun createOneTimeAddressTransaction(assetId: String, destAddress: String, amount: String, feeLevel: FeeLevel): Result<CreateTransactionResponse> {
  val transactionRequest = TransactionRequest(
    assetId = assetId,
    source = SourceTransferPeerPath(id = accountId.toString()),
    destination = DestinationTransferPeerPath(type = TransferPeerPathType.ONE_TIME_ADDRESS, oneTimeAddress = OneTimeAddress(address = destAddress)),
    amount = amount,
    feeLevel = feeLevel)
  return embeddedWallet.createTransaction(transactionRequest)
}
```
```swift iOS
//createOneTimeAddressTransaction

//initialize EmbeddedWallet instance
let instance = try initialize()
let request = TransactionRequest(
  assetId: assetId,
  source: SourceTransferPeerPath(id: String(accountId)),
  destination: DestinationTransferPeerPath(type: .oneTimeAddress, oneTimeAddress: OneTimeAddress(address: destAddress)),
    amount: amount,
      feeLevel: feeLevel
      )
return try await instance.createTransaction(transactionRequest: request)

```

The transaction signing itself is done by calling `signTransaction(txId)` EW Core SDK method:

```javascript Web
// Transaction is in PENDING_SIGNATURE status, can be signed now:
await ewCore.signTransaction(txId);
```
```javascript Android
Fireblocks.getInstance(deviceId).signTransaction(txId)
```
```javascript iOS
//Initialize and create the Core SDK instance
let instance = try getCore()
let result = try await instance.signTransaction(txId: transactionId)

```
