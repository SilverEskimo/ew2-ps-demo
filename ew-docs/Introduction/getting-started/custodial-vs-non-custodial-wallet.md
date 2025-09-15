---
title: "Embedded Wallet Keys Explained"
slug: "custodial-vs-non-custodial-wallet"
excerpt: ""
hidden: false
metadata: 
  title: "Embedded Wallet Keys Explained"
  image: []
  robots: "index"
createdAt: "Tue Aug 29 2023 12:38:04 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Jul 30 2024 07:24:36 GMT+0000 (Coordinated Universal Time)"
---
# Overview

Embedded wallets reside in a Fireblocks workspace that includes custodial Vault Accounts assigned to the customer.

Each embedded wallet has its separate keys. Also, the workspace includes one master key to serve the customer's vault accounts (not connected to the end user wallets).

Fireblocks embedded wallets use a 2-of-2 MPC signature scheme. One key share resides in an Intel SGX-enabled server managed by Fireblocks, and the other resides on the end user's device. 

# Structure

The Fireblocks workspace can include an unlimited number of embedded wallets and an unlimited number of wallet accounts inside each embedded wallet. Each wallet account can hold as many asset wallets as you need. However, you can only have one type of wallet asset per wallet account.

![](https://files.readme.io/b2821b8-image.png)

You can also use our non-custodial embedded wallets in parallel with self-custodial wallets. One workspace can support both structures.

# Secret key management and wallet derivation

![](https://files.readme.io/807a7fc-image.png)

The derivation for non-custodial embedded wallets is almost the same as for self-custodial wallets. Each asset in an embedded wallet is derived according to the following structure:

**`m/purpose/coinType/account/change/index`**, where:

- **m** is the master private key
- **purpose** is the derivation standard (BIP-44 in our example)
- **coinType** is the unique identifier of an asset (0 for BTC, 60 for ETH, etc.)
- **account** is the vault account ID
- **change** is always 0
- **index** is the address index (always 0 except for UTXO-based assets)

> 📘 Note
> 
> In Non-Custodial Wallets, Bitcoin wallets can only have one deposit address per account, unlike self-custodial wallets that can have more that one deposit address within the same account.
> 
> This means that for any account, the derivation path for the BTC asset in it will always be `m/44/0/accountId/0/0`.

# Unsure about which custody model is best for you?

Read our [Guide to Digital Asset Wallets and Service Providers](https://www.fireblocks.com/a-guide-to-digital-asset-wallets-and-service-providers) for insights into evaluating digital asset wallets and service providers for your business.
