---
title: "Data Model"
slug: "data-model"
excerpt: ""
hidden: false
createdAt: "Tue Aug 29 2023 12:42:37 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Jul 30 2024 06:41:05 GMT+0000 (Coordinated Universal Time)"
---
# Overview

Fireblocks end user wallets (EUWs) are hierarchical deterministic (HD) wallets. With our REST API, customers can easily create new wallets for their end users and add multiple accounts under them. Each account can contain different assets, and all transactions are signed using the end-user key generated for a specific wallet.

# Data Model

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/a6ef7c0-Data_Model.png",
        "",
        ""
      ],
      "align": "center",
      "sizing": "600px"
    }
  ]
}
[/block]


- **User:** Represents the end user of your application. Kindly note that this entity is external to Fireblocks and is reflected only on the customer's side.
- **Device:** A logical identifier representing an entity that stores an end-user key share and can participate in MPC operations for a given wallet.
- **Wallet:** Represents an end user wallet created via the Fireblocks API.
- **Transaction:** Represents the transactions created in Fireblocks.
- **Account:** Represents the different accounts under a single end user wallet.
- **Asset:** Represents the different assets under a single account.

# Relationships

- User > Device: **One to Many** relation
- Wallet > Device: **One to Many** relation
- Wallet > Account: **One to Many** relation
- Wallet > Transaction: **Many to Many** relation
- Device > Message: **One to Many** relation
- Account > Asset: **One to Many** relation

> 📘 Device ID and wallet correlation
> 
> Each user can have multiple `deviceId` values, each correlating to a different end user wallet in Fireblocks. Each `deviceId` represents an entity that stores an end-user key share.
