---
title: "API Communication"
slug: "api-communication"
excerpt: ""
hidden: false
createdAt: "Tue Aug 29 2023 12:42:54 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jun 23 2025 12:23:26 GMT+0000 (Coordinated Universal Time)"
---
> 🚧 Not familiar with the API user creation and authentication?
> 
> Visit the links below to understand how each process works:
> 
> - [API user creation](https://developers.fireblocks.com/docs/quickstart#api-user-creation)
> - [API user authentication](https://developers.fireblocks.com/reference/signing-a-request-jwt-structure)

# Overview

API communication between the customer backend and the Fireblocks platform occurs over HTTP (REST). Authentication uses API users and JSON Web Tokens (JWTs) signed for each request.

**Note**: For end users accessing via the app with the Embedded Wallet SDK, authentication uses IDP tokens and pre-configured SSO OAuth, where the NCW Signer API user is configured.

# API roles

The Fireblocks EW feature requires two API roles: **EW Admin** and **EW Signer**.

## EW Admin

This role is used for administrative workspace operations, such as disable/enable a wallet.

## EW Signer

This role is used for specific wallet operations, such as creating a transaction from a specific end user wallet.

There are two ways in which this API user is used:

- Implicitly, as part of the EW SDK using the OAuth pre-configured configuration.
- Explicitly, similar to the NCW Admin API user (using signed JWT)

# Role permissions

The table below lists the different operations that can be executed by the EW Admin & EW Signer API users.

| API User Role/ Operation                          | EW Admin | EW Signer |
| ------------------------------------------------- | -------- | --------- |
| Create new EW Everywhere                          | ✅        | ❌         |
| Create new account under a specific EW Everywhere | ✅        | ✅         |
| Enable/Disable EW Everywhere                      | ✅        | ❌         |
| Get deposit address information                   | ✅        | ✅         |
| Create transaction from EW Everywhere             | ❌        | ✅         |
| Get transaction fee information                   | ✅        | ✅         |
| Cancel transaction                                | ❌        | ✅         |
| Decline transfer                                  | ❌        | ✅         |
| Enable/disable a signing device                   | ❌        | ✅         |
| Invoke RPC (relayed from the EW Everywhere SDK)   | ❌        | ✅         |
| Add asset to an account under an EW Everywhere    | ❌        | ✅         |
| Get public key                                    | ✅        | ❌         |
| Delete algorithm                                  | ✅        | ❌         |
