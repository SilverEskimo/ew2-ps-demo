---
title: "Before You Begin"
slug: "before-you-begin"
excerpt: ""
hidden: false
createdAt: "Thu Feb 08 2024 13:49:51 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jun 23 2025 12:25:09 GMT+0000 (Coordinated Universal Time)"
---
Before starting your Fireblocks EW implementation, it’s important to distinguish between the SDKs involved:

- The **Fireblocks EW client SDKs** (also referred to as the **EW SDK** and the **EW Core SDK**).
- The **Fireblocks SDK**.

Each serves a different purpose:

- The **EW SDKs** consists of platform-specific SDKs used in your _client app implementation_
- The **Fireblocks SDK** can be used for administrative EW operations and is initialized with an API user's private key. It can be used with one of two roles: [EW Admin and EW Signer](https://ncw-developers.fireblocks.com/v5.0/docs/api-communication#api-roles).
