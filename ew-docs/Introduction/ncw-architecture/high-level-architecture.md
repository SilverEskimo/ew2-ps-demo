---
title: "High-Level Architecture"
slug: "high-level-architecture"
excerpt: ""
hidden: false
createdAt: "Tue Aug 29 2023 12:42:22 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sun Jun 29 2025 13:19:20 GMT+0000 (Coordinated Universal Time)"
---
# Overview

The Fireblocks Embedded Wallet (EW), formerly Non-Custodial Wallet (NCW), architecture is designed with a minimalistic approach to provide maximum flexibility and ease of use.

Fireblocks provides Android, iOS, and Web SDKs for easily integrating EW functionality into your mobile and web applications. The mobile and web SDKs focus solely on MPC key provisioning, signing, and backup/recovery.

# Integration Components

There are two main components required for integrating the Fireblocks EW feature:

1. **Client-side application:** A mobile or web app with the EW SDK implemented.
2. **Fireblocks:** An EW-enabled workspace.

The current architecture uses a client-only approach, where the SDK communicates directly with Fireblocks APIs — no backend server is required.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2c0f2a8dea4351b645be22ce6141418f658118a4d97ce9e08aedca0c7d07618c-ew_saas_architecture.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


# Optional: Backend Proxy Server

In the current architecture, a backend server is not required. However, some customers may choose to implement a backend proxy server for advanced use cases like request validation, rate limiting, or additional business logic.  
[Learn more about backend proxy integration](https://ncw-developers.fireblocks.com/v5.0/docs/high-level-architecture)

## Example of EW creation

1. create a wallet (assign) -> `ew.assignWallet()`

- The client SDK calls the `assignWallet()` method, which communicates directly with Fireblocks to create the wallet if it doesn't exist yet.
- The client application can store the wallet ID and continue with other wallet operations.
