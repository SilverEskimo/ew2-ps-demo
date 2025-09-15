---
title: "Data Objects"
slug: "data-objects"
excerpt: ""
hidden: false
createdAt: "Wed Sep 11 2024 08:17:17 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Sep 17 2024 21:39:03 GMT+0000 (Coordinated Universal Time)"
---
## NcwAssetBalanceUpdate

| Parameter    | Type   | Description                                                      |
| :----------- | :----- | :--------------------------------------------------------------- |
| walletId     | string | The wallet's unique ID                                           |
| accountId    | number | The ID of the account                                            |
| assetId      | string | The ID of the asset                                              |
| total        | string | Total balance of the asset                                       |
| pending      | string | The cumulative balance of all pending transactions to be cleared |
| staked       | string | Staked funds; returned only for DOT                              |
| frozen       | string | Frozen by your workspace's AML policies                          |
| lockedAmount | string | Funds in outgoing transactions not yet published to the network  |
| blockHeight  | string | The height (number) of the block of the balance                  |
| blockHash    | string | The hash of the block of the balance                             |
