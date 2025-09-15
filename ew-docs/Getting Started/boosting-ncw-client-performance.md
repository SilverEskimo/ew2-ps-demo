---
title: "Boosting Embedded Wallet Performance"
slug: "boosting-ncw-client-performance"
excerpt: ""
hidden: false
createdAt: "Tue Feb 06 2024 16:56:09 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed May 28 2025 10:28:54 GMT+0000 (Coordinated Universal Time)"
---
# Overview

At the heart of Fireblocks' security lies the MPC protocol, providing robust security while heavily relying on the network due to multiple rounds between your end-user client and Fireblocks. This implies that every enhancement between the end-user and Fireblocks is then multiplied by the number of rounds (when optimizing steps that are called during the MPC process). You can find more information about the MPC protocol here:

- [What is MPC?](https://www.fireblocks.com/what-is-mpc/)
- [Key generation explained](https://ncw-developers.fireblocks.com/docs/mpc-key-generation)

# Boosting Client Performance

During SDK initialization, the client will fetch a few certificates required to make calls to Fireblocks endpoints if it was not previously called. This process may take a few moments; therefore, it is highly suggested to initialize the SDK as early as possible. The initializations don't have to be adjacent to the call to `generateMPCKeys`.

On mobile, it is recommended to use a connection pool and maintain some connections. You can view an example of a connection pool in our [Android demo](https://github.com/fireblocks/android-ncw-demo/blob/6fdf025c7cc42c92bc36be5a97a3bf0b167cea26/app/src/main/java/com/fireblocks/sdkdemo/bl/core/server/Api.kt#L26).
