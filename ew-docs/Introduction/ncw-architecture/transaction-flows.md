---
title: "Transaction Flows"
slug: "transaction-flows"
excerpt: ""
hidden: false
createdAt: "Tue Aug 29 2023 12:38:32 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Jul 30 2024 07:41:22 GMT+0000 (Coordinated Universal Time)"
---
## Deposits

- External -> Fireblocks Embedded Wallet (EW)
- External -> Self-Custodial (vault account)

## Withdrawals

- EW -> One-Time Address
- EW -> Whitelisted Address
- Self-Custodial (vault account) -> One-Time Address
- Self-Custodial (vault account) -> Whitelisted Address

Learn more about [one-time addresses](https://support.fireblocks.io/hc/en-us/articles/4409104568338-One-Time-Address-feature) and [whitelisted addresses](https://support.fireblocks.io/hc/en-us/articles/360017819439-Whitelisting-new-addresses).

## Transfers between peers

- EW -> Self-Custodial (vault account)
- Self-Custodial (vault account) -> EW
- Self-Custodial (vault account) -> Exchange account
- Self-Custodial (vault account) -> Fiat account
- Self-Custodial (vault account) -> Fireblocks Network

Learn more about [exchange accounts](https://support.fireblocks.io/hc/en-us/articles/360017435399-Fireblocks-exchange-connectivity), [fiat accounts](https://support.fireblocks.io/hc/en-us/articles/360018286760-Fiat-accounts), and the [Fireblocks Network](https://support.fireblocks.io/hc/en-us/articles/6107038882460-Overview-of-the-Fireblocks-Network).

![](https://files.readme.io/6892036-image.png)

## Transfers between Embedded Wallets

The Fireblocks EW feature allows you to transfer funds between your embedded wallets (including self-transfers) forming your exclusive "Fireblocks Network." There's no need to handle destination addresses. You can use wallet IDs for simplified and secure internal transactions.
