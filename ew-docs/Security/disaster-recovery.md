---
title: "Disaster Recovery"
slug: "disaster-recovery"
excerpt: ""
hidden: false
createdAt: "Tue Aug 29 2023 12:44:38 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sun Jun 30 2024 11:10:07 GMT+0000 (Coordinated Universal Time)"
---
> 📘 Note about the DR kit
> 
> The Disaster Recovery kit is designed specifically for the key share located exclusively on Fireblocks servers (Key Share #1).
> 
> In the event that Fireblocks ceases to exist and the customer wishes to empower the end-user to perform a full key takeover, the customer must establish an endpoint on their own system.
> 
> This endpoint will provide Key Share #1 (generated from the Disaster Recovery kit) to the SDK, enabling the reconstruction of the complete private key.

# Overview

The Fireblocks Non-Custodial Wallet (NCW) solution provides a disaster recovery feature to help businesses ensure continuity and minimize disruption to their operations. This feature allows businesses to regenerate the shares that Fireblocks manages, ensuring their operations continue uninterrupted.

The disaster recovery feature includes a toolkit that lets you provide your end users with access to their funds, even if something happens to the original shares.

# Initial Key Generation

Fireblocks NCW employs a 2-of-2 MPC signature scheme. The user's device generates one key share (Key Share #2 in the diagram below), and Fireblocks generates the other (Key Share #1).

Every Fireblocks workspace has a randomly generated master key that functions as a seed. When a new NCW is created, Fireblocks utilizes the master key alongside the freshly generated wallet identifier to calculate the corresponding key share for that specific wallet.

Key Share #1 and Key Share #2 combine to form the fundamental master key for the given NCW.

> 📘 Key Reconstruction
> 
> MPC technology relies on the absence of a single point in time when the complete master key of the NCW exists in its entirety. The only situation when the entire master key of a NCW consolidates into a complete key is when the end user chooses to initiate the Full Key Takeover process.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/96bdc70-image_8.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


# Disaster Recovery Kit Generation

After the customer onboarding process with Fireblocks is complete, Fireblocks generates a recovery kit. This kit comprises the master key of the workspace (seed) and is subsequently transmitted to the customer.

The initiation of this procedure involves the customer generating an RSA4096 private and public key pair. The public component of this pair is shared with Fireblocks. Fireblocks then assembles a kit containing the master key for each workspace (seed).

Then, this kit is encrypted using the provided public key and dispatched to the customer. Fireblocks recommends securely storing this encrypted kit independently from the corresponding RSA private key, preferably on an offline, air-gapped machine.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/158d503-dr_kit_gen.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


# Disaster Recovery Process

The customer must set up the [Fireblocks Recovery Tool](https://github.com/fireblocks/fireblocks-key-recovery-tool) on an isolated offline machine. Once the tool is installed and a real-world situation demands its use, the customer must furnish the Fireblocks Recovery Tool with the recovery kit, the associated RSA private key, and the targeted wallet identifiers for recovery.

The Fireblocks Recovery Tool will decrypt the kit, leverage the specified wallet identifier, and generate the corresponding Key Share #1 as the output.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/706b236-image_7.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]
