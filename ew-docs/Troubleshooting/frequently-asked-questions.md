---
title: "FAQ"
slug: "frequently-asked-questions"
excerpt: ""
hidden: false
createdAt: "Thu Aug 31 2023 13:23:38 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed May 15 2024 13:30:15 GMT+0000 (Coordinated Universal Time)"
---
## How do I know which Asset ID to provide when creating a new asset in a non-custodial wallet?

Any asset supported by Fireblocks has a unique identifier. This identifier is used when creating a new asset in a non-custodial wallet (NCW) or vault account via the Fireblocks API.

The Fireblocks NCW supports Bitcoin and any EVM-based network, including ERC-20, ERC-721, and ERC-1155 tokens. For a list of supported assets in Fireblocks, including their unique identifiers, use the [Get Supported Assets](https://developers.fireblocks.com/reference/get_supported-assets) API endpoint.

## What can and cannot be done with a disabled non-custodial wallet?

A disabled non-custodial wallet (NCW) is available for read-only operations. Once the wallet is disabled [using the API](https://developers.fireblocks.com/reference/enablewallet), none of the following operations are available:

- Signing outgoing transactions
- MPC keys setup
- MPC keys backup
- Full key takeover
- Creating new accounts 
- Creating new assets

The following operations still apply to a disabled wallet:

- Incoming transactions will show up in the Fireblocks Console and Transaction History
- Balance updates 
- Fetching balance via the Fireblocks API
- AML rules

## Can we import full private keys created outside of Fireblocks?

Fireblocks does not support importing private keys generated outside of our platform, and this decision is rooted in security considerations.

The primary reason behind this limitation is that when a private key exists as a complete, standalone entity, it poses a heightened risk of potential compromise.

In contrast, Fireblocks employs Multi-Party Computation (MPC) technology in our wallets. With MPC, your private key is never in its entirety at any given moment. Instead, it is divided into multiple components that are securely distributed across different entities or parties. This design significantly reduces the risk associated with a single point of compromise.
