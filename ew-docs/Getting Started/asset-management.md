---
title: "Asset Management"
slug: "asset-management"
excerpt: ""
hidden: false
createdAt: "Tue Feb 06 2024 17:49:06 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jun 30 2025 11:56:54 GMT+0000 (Coordinated Universal Time)"
---
# Getting the asset list

Call the [Retreive supported assets endpoint](https://developers.fireblocks.com/reference/getsupportedassets) to view the list of assets available to your workspace. The response includes the Fireblocks assetId which is used when you add assets.

If you're looking into quickly viewing the supported asset list, you can view the [Supported Networks](doc:supported-networks) page.

# Adding assets

You add assets via the Fireblocks SDK. Unless your Fireblocks Customer Success Manager and Fireblocks Support allow an exception, Fireblocks requires you to complete the backup procedure for each wallet before you can add any assets.

### A note on Backup Enforcement

If your workspace is already running in a Production environment, key backup enforcement is enabled by default. However, it is not enabled by default in Sandbox environments to allow for an easier integration process.

Due to the above, when you attempt to call the [Active a wallet in a vault account endpoint](https://developers.fireblocks.com/reference/post_vault-accounts-vaultaccountid-assetid-activate), you must first go through [this backup flow](https://ncw-developers.fireblocks.com/docs/backup-recovery-1#backup-procedure). 

# Example

```javascript JavaScript
const address = await ew.addAsset(accountId, assetId);
```
```curl Curl
curl --request POST \
     --url https://sandbox-api.fireblocks.io/v1/ncw/wallets/walletId/accounts/accountId/assets/assetId \
     --header 'accept: application/json'
```

Note in the code example above that the `accountId` parameter runs an index created by the `await ew.createAccount()` function. In our demo, we always use **accountId 0** for simplicity.

## Adding Solana Tokens

On the Solana blockchain, receiving tokens requires creating a dedicated token account derived from your main account. This is usually handled automatically when someone sends you tokens, but your customer can pre-create the account if needed. 

In order to create the dedicated token account, you can still invoke the [add asset](https://developers.fireblocks.com/reference/addasset) endpoint which in turn will create a transaction on behalf of the customer, for signing. 

Within the response of the request, or later on, using the [retrieve asset](https://developers.fireblocks.com/reference/getasset) endpoint you can query for the `state` of the asset.

- `PENDING_ACTIVATION`
- `ACTIVATION_FAILED`
- `READY`

In case the asset is under `PENDING_ACTIVATION`, a pending transaction still awaits the end user for signing. Once he signs the transaction, the asset status should now appear as `READY`.

In case the end user failed to sign the transaction, the status will appear as `ACTIVATION_FAILED` and the asset will require adding it again.
