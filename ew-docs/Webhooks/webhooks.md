---
title: "Webhooks"
slug: "webhooks"
excerpt: ""
hidden: false
createdAt: "Tue Aug 29 2023 12:35:34 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Feb 25 2025 10:51:38 GMT+0000 (Coordinated Universal Time)"
---
## Transaction Created

A notification is sent when any new transaction is identified in the workspace.

| Parameter | Type                                                                                                      | Description                          |
| :-------- | :-------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| type      | string                                                                                                    | TRANSACTION_CREATED                  |
| tenantId  | string                                                                                                    | The Fireblocks workspace's unique ID |
| timestamp | number                                                                                                    | Timestamp in milliseconds            |
| data      | [TransactionDetails](https://developers.fireblocks.com/reference/transaction-webhooks#transactiondetails) | All the transaction information      |

***

## Transaction Status Updated

A notification is sent when there is any change in a transaction's status or when the number of confirmations is updated.

| Parameter | Type                                                                                                      | Description                          |
| :-------- | :-------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| type      | string                                                                                                    | TRANSACTION_STATUS_UPDATED           |
| tenantId  | string                                                                                                    | The Fireblocks workspace's unique ID |
| timestamp | number                                                                                                    | Timestamp in milliseconds            |
| data      | [TransactionDetails](https://developers.fireblocks.com/reference/transaction-webhooks#transactiondetails) | All the transaction informati        |

***

## NCW Transaction Status Updated (Immediate)

> 🚧 In Early Access
> 
> This webhook is currently part of an early access program. If you're interested in participating in the program, please [contact your Customer Success Manager](https://support.fireblocks.io/hc/en-us/requests/new?ticket_form_id=6947882197532) (requires a Help Center login).

In addition to the transaction status updates which are being sent in a chronological order (and not immediately), NCW transaction status updates are being sent right away. This is mainly to allow your backend to receive a notification that a transaction is pending signature as fast as possible.

**Note**: It will only be sent for outgoing transactions (withdrawals) with the following statuses:  
`PENDING_SIGNATURE`, `COMPLETED`, `CANCELLED`, `FAILED`, `BLOCKED`, `REJECTED`

| Parameter | Type                                                                                                      | Description                          |
| :-------- | :-------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| type      | string                                                                                                    | NCW_TRANSACTION_STATUS_UPDATED       |
| tenantId  | string                                                                                                    | The Fireblocks workspace's unique ID |
| timestamp | number                                                                                                    | Timestamp in milliseconds            |
| data      | [TransactionDetails](https://developers.fireblocks.com/reference/transaction-webhooks#transactiondetails) | All the transaction information      |

***

## Multi-Device Request ID

| Parameter      | type   | Description                                                               |
| :------------- | :----- | :------------------------------------------------------------------------ |
| type           | string | NCW_ADD_DEVICE_SETUP_REQUESTED                                            |
| tenantId       | string | The Fireblocks workspace's unique ID                                      |
| timestamp      | number | Timestamp in milliseconds                                                 |
| data.walletId  | string | The wallet's unique ID                                                    |
| data.deviceId  | string | The device's unique ID                                                    |
| data.requestId | string | The join wallet request's unique ID; is delegated to the approving device |

> 📘 Note
> 
> The structure of `data.fieldName` comes to describe a payload with values under a key data.

***

## Non-Custodial Wallet Created

| Parameter     | type    | Description                             |
| :------------ | :------ | :-------------------------------------- |
| type          | string  | NCW_CREATED                             |
| tenantId      | string  | The Fireblocks workspace's unique ID    |
| timestamp     | number  | Timestamp in milliseconds               |
| data.walletId | string  | The wallet's unique ID                  |
| data.enabled  | boolean | Indicates whether the wallet is enabled |

***

## Non-Custodial Wallet Account Created

| Parameter      | type   | Description                              |
| :------------- | :----- | :--------------------------------------- |
| type           | string | NCW_ACCOUNT_CREATED                      |
| tenantId       | string | The Fireblocks workspace's unique ID     |
| timestamp      | number | Timestamp in milliseconds                |
| data.walletId  | string | The wallet's unique ID                   |
| data.accountId | string | The account's ID in the specified wallet |

***

## Non-Custodial Wallet Asset Created

| Parameter      | type   | Description                                              |
| :------------- | :----- | :------------------------------------------------------- |
| type           | string | NCW_ASSET_CREATED                                        |
| tenantId       | string | The Fireblocks workspace's unique ID                     |
| timestamp      | number | Timestamp in milliseconds                                |
| data.walletId  | string | The wallet's unique ID                                   |
| data.accountId | string | The account's ID in the specified wallet                 |
| data.asset     | string | The asset's ID as defined in Fireblocks (BTC, ETH, etc.) |

***

## Non-Custodial Wallet Asset balance changed

> 🚧 In Early Access
> 
> This webhook is currently part of an early access program. If you're interested in participating in the program, please [contact your Customer Success Manager](https://support.fireblocks.io/hc/en-us/requests/new?ticket_form_id=6947882197532) (requires a Help Center login).

Notification is sent when an asset's balance changes.

| Parameter     | type                                                                                                   | Description                          |
| :------------ | :----------------------------------------------------------------------------------------------------- | :----------------------------------- |
| type          | string                                                                                                 | END_USER_WALLET_BALANCE_UPDATE       |
| tenantId      | string                                                                                                 | The Fireblocks workspace's unique ID |
| timestamp     | number                                                                                                 | Timestamp in milliseconds            |
| data.walletId | string                                                                                                 | The wallet's unique ID               |
| data          | [NcwAssetBalanceUpdate](https://ncw-developers.fireblocks.com/docs/data-objects#ncwassetbalanceupdate) | NCW asset details                    |
