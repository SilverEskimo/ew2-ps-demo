---
title: "Wallet"
slug: "create-a-wallet"
excerpt: ""
hidden: false
createdAt: "Tue Feb 06 2024 17:06:19 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue May 27 2025 14:57:20 GMT+0000 (Coordinated Universal Time)"
---
# Overview

A wallet is an object you manage on Fireblocks' servers for your end-users. Wallets can have multiple keys (ECDSA and [EdDSA](https://ncw-developers.fireblocks.com/docs/multiple-algorithms)) and an unlimited number of wallet accounts. Each wallet account has a single asset type under it. For instance:

- `walletId-1`
  - `walletAccount-1`
    - `BTC`
    - `ETH`
  - `walletAccount-2`
    - `FTM`
    - `TRON`

In the new architecture wallet creation is done automatically (if needed) as part of the `assignWallet()` EW SDK method.

## Multiple wallets and wallet accounts

Theoretically, your end-user can have multiple wallets, but that does not matter in the Fireblocks view since Fireblocks does not hold any personally identifiable information (PII) about your end-users. However, for simplicity in our demos, we assume a one-to-one relationship between an end-user and a wallet.
