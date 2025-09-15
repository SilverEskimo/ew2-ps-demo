---
title: "Backup and Recovery Overview"
slug: "backup-recovery"
excerpt: ""
hidden: false
createdAt: "Tue Aug 29 2023 12:43:32 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jul 25 2024 14:22:01 GMT+0000 (Coordinated Universal Time)"
---
# Overview

The Fireblocks Embedded Wallet (EW) provides a backup and recovery mechanism to ensure that users can recover their keys even if their EW device is lost or damaged.

The Fireblocks EW feature allows you to create a backup of the end-user key share on the device. When initiating the backup, the customer application will generate an encryption key. The key share is then encrypted using this key and stored on Fireblocks servers. The encryption key can then be backed up in various ways, such as placing it on the user's iCloud or Google Drive using end-user authentication or simply downloading it to a file.

Upon recovery, the encrypted key share is fetched from Fireblocks' servers, and if the end-user provides the correct encryption key, the recovery will be successful. 

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/6902850-image_12.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


# Key Backup Configuration

Key backups are required by default in Fireblocks workspaces. If you want to make them optional, submit a request to Fireblocks Support (requires a Fireblocks Help Center login).

Please note that when key backups are not required, end users can start using their wallets without a backup (but can create one later). Fireblocks highly recommends users create backups since it helps ensure they can access their funds.
