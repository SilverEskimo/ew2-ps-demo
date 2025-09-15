---
title: "Setting Up OAuth Configuration (SSO)"
slug: "setting-up-oauth-sso"
excerpt: ""
hidden: false
createdAt: "Thu May 29 2025 08:48:19 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sun Jun 29 2025 13:45:08 GMT+0000 (Coordinated Universal Time)"
---
# Overview

To enable user authentication in Embedded Wallet (EW), configure your Identity Provider (IDP) using the OAuth setup in the Fireblocks Console.

Once configured, Fireblocks will generate an **OAuth Client ID**. This ID is used to initialize the EW SDK on the client side.

> ⚠️ Note
> 
> The EW SDK does not validate the IDP tokens itself. Instead, this setup enables Fireblocks to verify the tokens attached to end-user requests, ensuring secure authentication for all subsequent operations.

# Prerequisites

- Access to your OAuth-compatible IDP.
- The **EW Signer** API user created in your Fireblocks workspace. For more details, see [API Roles](https://ncw-developers.fireblocks.com/docs/api-communication#api-roles).

# Supported Identity Providers (IDPs)

The following OAuth-compatible IDPs are supported for use with Fireblocks Embedded Wallets. Use the provided JWKS URI when configuring your OAuth setup. 

| Identity Provider      | JWKS URI                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| **Google**             | `https://www.googleapis.com/oauth2/v3/certs`                                                |
| **Firebase**           | `https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com` |
| **Microsoft Azure AD** | `https://login.microsoftonline.com/common/discovery/v2.0/keys`                              |
| **AWS Cognito**        | `https://cognito-idp.{REGION}.amazonaws.com/{USER_POOL_ID}/.well-known/jwks.json`           |
| **Salesforce**         | `https://login.salesforce.com/id/keys`                                                      |

# Required Configuration Fields

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/8413ef6cd7295fb85e1cf0b028d972395fa138bfd0a86938b995f876b620f706-image.png",
        null,
        ""
      ],
      "align": "center",
      "sizing": "500px",
      "border": true
    }
  ]
}
[/block]


When setting up OAuth in the Console, you'll need to provide:

- **API User** – Select an API user with the "**EW Signer**" role.
- **JWKS URI** – The JWKS (JSON Web Key Set) endpoint from which Fireblocks retrieves your IDP’s public keys for token validation. see [Supported Identity Providers (IDPs)](https://ncw-developers.fireblocks.com/docs/setting-up-oauth-sso#supported-identity-providers-idps)
- **Issuer** – The expected `iss` claim in the token (must match your IDP’s value).
- **Audience** – The expected `aud` claim in the token (typically your OAuth client ID).
- **Custom wallet ID field name** _(optional)_ – Specify the name of a custom claim in your IDP token (e.g., a Firebase [custom claim](https://firebase.google.com/docs/auth/admin/custom-claims)) that contains the wallet ID for the user. Then if presented in the token, Fireblocks will use this claim to override the default, deterministic wallet ID calculation for this user.

> 📘 Usage in the SDK
> 
> Once a configuration is added, the **OAuth Client ID** will appear in the Console.
> 
> Use this ID when initializing the SDK.

## User token generation in clients

For token generation and login UI, you are free to use your IDP's standard login flows and SDKs.
