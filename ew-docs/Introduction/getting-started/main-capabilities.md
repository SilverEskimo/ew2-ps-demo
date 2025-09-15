---
title: "Main Capabilities"
slug: "main-capabilities"
excerpt: ""
hidden: false
metadata: 
  image: []
  keywords: "embedded wallet,fireblocks, non-custodial wallet, ncw"
  robots: "index"
createdAt: "Tue Aug 29 2023 12:37:48 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jul 25 2024 11:18:31 GMT+0000 (Coordinated Universal Time)"
---
## 2-of-2 MPC signature scheme

The Fireblocks Embedded Wallet (EW) feature uses a 2-of-2 multi-party computation (MPC) signature scheme to enhance the security of digital signatures. This cryptographic technique involves two parties collaborating to generate a signature. This reduces the risk of single-party compromise and enhances the overall integrity of transactions.

One key share resides on the end-user's device (mobile or web), and the second key share is securely maintained within an Intel SGX-enabled server managed by Fireblocks.

Intel SGX technology ensures that the key material stored in the SGX enclave is isolated, protected, and resistant to unauthorized access.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ab3e9e8-image_11.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


> 📘 End-user key share management
> 
> Fireblocks provides web and mobile SDKs to customize how you configure your key loading and key saving process. This enables you to implement security measures, such as mobile enclave, biometric authentication, two-factor authentication (2FA), and more.
> 
> The SDK itself is agnostic to the specific implementation of key storage, which is passed to it upon initialization.

## Web and mobile integrations

Fireblocks provides comprehensive software development kits (SDKs) for iOS, Android, and web platforms. These SDKs allow developers to seamlessly integrate Fireblocks cryptographic and security functions into their applications.

## Multi-device support

The Fireblocks Embedded Wallet (EW) solution allows multiple devices to perform actions using the same wallet, such as signing transactions and running takeovers. This lets you support a multi-device, multi-platform seamless digital experience and enables an end user to use their account on any of their devices.

## Backup and recovery

We also offer a variety of options for securely backing up and recovering cryptographic assets. Users can choose to store backups in the cloud, employ social logins for recovery purposes, or opt to download backups locally.

## User Takeover Ability (Export Private Key)

Our User Takeover Ability enables users to export their full cryptographic keys, providing them with the autonomy to move their assets to different wallets or services. This feature emphasizes user control while requiring careful consideration of potential security implications.

## Transaction Authorization Policy

With our [Transaction Authorization Policy (TAP)](https://support.fireblocks.io/hc/en-us/articles/7354983580316), users can define and enforce specific transaction approval rules. These rules can include requirements for predetermined approval workflows, transaction limits, and more. This feature empowers users to customize transaction security based on their unique preferences and risk tolerance.

## Web3 Wallet Link

Our Web3 Wallet Link feature facilitates interaction between decentralized applications (dApps) and various wallets using the WalletConnect v2 protocol. This allows users to securely access and manage their cryptocurrency assets across different platforms and services.

## Supported Networks

### Bitcoin, EVM-based networks, Cosmos, and TRON (private and public)

The Fireblocks EW solution supports many blockchain networks, such as the Bitcoin blockchain and various networks based on the Ethereum Virtual Machine (EVM), Cosmos, and TRON. Users can securely interact with and manage their Bitcoin and EVM-based assets using our platform.

Currently, Fireblocks provides support for more than 30 EVM-based public blockchains, including several well-known ones such as Polygon, Base, BNB Smart Chain, Evmos, Moonriver, Optimism, Arbitrum One, Moonbeam, and many more. Additionally, the Fireblocks EW provides instant support for any EVM-based blockchain that becomes integrated with the Fireblocks platform. This includes private and public networks that are within our supported ecosystem.

### ERC-20, ERC-1155, and ERC-721 Tokens

The Fireblocks EW extends its support to Ethereum's token standards, namely ERC-20, ERC-1155, and ERC-721. This allows users to manage a wide array of digital assets, including fungible tokens (ERC-20), semi-fungible tokens (ERC-1155), and non-fungible tokens (ERC-721) through our platform.

Whether you're dealing with Bitcoin or participating in various EVM-based ecosystems, the Fireblocks EW allows you to seamlessly integrate and securely manage assets. Additionally, our support for Ethereum's token standards allows you to handle a wide range of tokens.
