---
title: "Implementation Steps"
slug: "implementation-steps"
excerpt: ""
hidden: false
createdAt: "Tue Aug 29 2023 12:46:23 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Jul 02 2025 14:27:53 GMT+0000 (Coordinated Universal Time)"
---
# Step-by-step process

The process of implementing the Fireblocks Embedded Wallet (EW) involves the following step-by-step sequence:

1. Complete the onboarding process to establish and configure your workspace.
2. Ensure comprehensive disaster readiness by completing the setup process for the disaster recovery kit.
3. Create the EW Signer and EW Admin API users.
4. Configure the webhook URL to enable communication between your application and Fireblocks.
5. Verify that you have at least one Transaction Authorization Policy (TAP) rule to govern your EW transactions (relevant to the production environment and not sandbox).
6. Set up your OAuth (SSO) configuration using your chosen Identity Provider (IDP), which will be used to authenticate end users.
7. (Optional) Implement a webhook listener (e.g., for transaction updates) and notify end-user devices using push notifications or other relevant channels.
8. Construct your mobile or web application and integrate the EW Software Development Kit (SDK).
9. Enroll your users into the application.
10. Generate MPC keys for each user with an EW.
11. Execute a key share backup procedure for each user to guarantee access in case of contingencies.
12. If allowed, provide the option to initiate a full key takeover and enhance control over their assets.

## EW TAP rules for Production workspaces

If you're a [Fireblocks Sandbox](https://developers.fireblocks.com/docs/sandbox-quickstart) user, your sandbox workspace's TAP automatically has a rule that allows any end-user wallet to transfer any amount to any destination.

However, if you're a new or existing Fireblocks customer using a production workspace, you must [create a TAP rule](https://support.fireblocks.io/hc/en-us/articles/10394124789020-Create-a-TAP-rule) that governs end-user wallet transactions. Use the Fireblocks Console's TAP Editor to edit this rule or create additional rules as necessary.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/25d2b67-ncw-enduserwallet-tap-rule.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


# Flow chart

The following flow chart shows the successful work flow of a non-custodial embedded wallet system.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c4ad34ef8776f04c16449fe1e1b7ae4f75f20881881dedfca8a35a111697038a-Screenshot_2025-06-29_at_16.39.39.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/67cbc0000aa93fc3a3898d339dd9294346338c1ef1f085aa52848ae0b13c18fd-Screenshot_2025-06-29_at_16.40.34.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/8efed7f83a8de677a139aa3ad5484036210bbffe30ade9976b919274d76cb708-Screenshot_2025-06-29_at_16.40.55.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]
