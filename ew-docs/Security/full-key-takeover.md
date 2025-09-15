---
title: "Full Key Takeover (Export private key)"
slug: "full-key-takeover"
excerpt: ""
hidden: false
createdAt: "Tue Aug 29 2023 12:44:07 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Apr 12 2024 14:25:22 GMT+0000 (Coordinated Universal Time)"
---
> 🚧 Takeover security considerations
> 
> While the Full Key Takeover feature provides end users with complete control over their funds, it also introduces some potential security risks. Once the private key is exported, Fireblocks no longer has control over the security of the key material. This means that the end user must take full responsibility for securing the private key and ensuring it is not lost or stolen.

# Overview

The Fireblocks Embedded Wallet solution provides a unique Full Key Takeover feature, which enables end users to export the entire private key. This optional feature makes the solution censorship-resistant since end users always have control over their private key. This is especially useful if Fireblocks or the customer goes out of business or discontinues the service. In this scenario, the end user can still access their funds and transact on the blockchain network.

The Full Key Takeover feature is optional, and not all businesses may want to implement it. For those who do, it is crucial to take all necessary precautions to ensure the security of the private key.

# What happens after the takeover?

Following the takeover, the app developer can decide how the app reacts to the new situation. For example, the app can function as usual afterward, or this action can change the overall end-user experience.

The complete private key that has been exported can be brought into any third-party wallet application that supports private key imports, such as MetaMask for Ethereum and Electrum Wallet for Bitcoin.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ea3ebcb-image_10.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


# Importing the Exported Keys

The SDKs expose a takeover function. This function returns the keys facilitated by the wallet, which can be ECDSA, EdDSA, or both. The result of the takeover includes extended public and private keys.

## ECDSA Extended Keys

The public and private ECDSA keys can be derived for each asset in the wallet. Our GitHub demos demonstrate how to derive the keys. After you derive them:

- You can import EVM keys to Metamask.
- You can import Bitcoin keys to [Electrum](https://electrum.org/) using the WIF format.

Note there is a slight difference in the exported formats between EVM and Bitcoin. Our demos show how to export the keys into the appropriate formats for Metamask and Electrum.

## EdDSA Extended Keys

There isn't a direct method to derive keys for EdDSA. To use the extended EdDSA keys, you must derive them for each asset and execute blockchain actions through your application.

We have an [Open Source guide](https://github.com/fireblocks/ncw-eddsa-signing) that shows how to use EdDSA keys with each of the assets currently supported by Fireblocks.
