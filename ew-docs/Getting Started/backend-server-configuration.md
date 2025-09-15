---
title: "Backend Server Configuration"
slug: "backend-server-configuration"
excerpt: ""
hidden: true
createdAt: "Tue Aug 29 2023 12:47:01 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue May 27 2025 14:02:14 GMT+0000 (Coordinated Universal Time)"
---
# Overview

The mobile and web SDKs send and receive data related to multi-party computation (MPC) key generation and signing through a proxy owned by the customer’s backend. This provides an additional layer of security and allows you to customize the solution to fit the needs of your business.

The Fireblocks NCW REST API lets you interact programmatically with the Fireblocks platform for a variety of use cases:

- Creating new Non-Custodial Wallets (NCWs)
- Creating accounts within NCWs
- Creating assets within the accounts
- Disabling and enabling NCWs
- Creating transactions from NCWs
- Invoking the Fireblocks RPC for MPC-related operations

# Prerequisites

- [Create API users in your workspace](https://ncw-developers.fireblocks.com/docs/api-communication). NCW requires two dedicated API Users: NCW Admin and NCW Signer.
- [Configure a webhook endpoint](https://ncw-developers.fireblocks.com/docs/webhook-configuration).
- Instantiate an API client that communicates with the Fireblocks API. You can do this by creating a client or using one of the API Software Development Kits (SDKs) provided by Fireblocks.

## RPC Endpoint body request size

During the [MPC key generation](https://ncw-developers.fireblocks.com/docs/mpc-key-generation) and [transaction signing](https://ncw-developers.fireblocks.com/docs/create-transaction) processes, requests are sent to an endpoint on your backend (BE). Your BE then delegates these requests to Fireblocks using the API users you created in the previous section. The request body sent to this endpoint may vary, so we recommend increasing your backend's maximum request body size to at least 2 MB.

In the open-source backend that we provide, you can find the following snippet: `app.use(bodyParser.json({ limit: "50mb" }));`

# Using Fireblocks API SDKs

## JavaScript

### Install Node v6.3.1 or later

The Fireblocks JavaScript SDK requires Node v6.3.1 or later. You can check which version you have installed by running the following command:

`node -v`

[Learn how to install or update Node to a newer version](https://nodejs.org/en/download/).

### Install fireblocks-sdk

The Fireblocks JavaScript SDK is open-source and hosted on both GitHub and NPM, the official package repository.

- **Source code:** <https://github.com/fireblocks/fireblocks-sdk-js>
- **JavaScript Package:** <https://www.npmjs.com/package/fireblocks-sdk>

Installing the latest SDK is easy with `npm`:

`npm install fireblocks-sdk`

## Python

### Install Python 3.6 or later

The Fireblocks Python SDK requires Python 3.6 or later. You can check which version you have installed with the following command:

`python --version` or `python3 --version`

[Learn how to install or update Python to a newer version](https://docs.python-guide.org/starting/installation/).

### Install fireblocks-sdk

The Fireblocks Python SDK is open-source and hosted on both GitHub and PIP, the official package repository.

- **Source code:** <https://github.com/fireblocks/fireblocks-sdk-py>
- **Python Package:** <https://pypi.org/project/fireblocks-sdk/>

Installing the latest SDK is easy with `pip`:

`pip3 install fireblocks-sdk`

## Directly using the API

You can still interact with the Fireblocks platform using the REST API if your backend is not written in JavaScript or Python. When working directly with the Fireblocks API, refer to the [NCW API reference documentation](https://developers.fireblocks.com/reference/create-1) and the [Fireblocks API reference documentation](https://developers.fireblocks.com/reference/get_vault-accounts) for additional information.

The Fireblocks REST API is designed to be simple and easy to adopt. However, specific authentication methods are required to ensure the security of your workspace. We recommend reviewing the [authentication guidelines](https://developers.fireblocks.com/reference/signing-a-request-jwt-structure), which include coding examples in various languages.

# Creating your first API call

Depending on the script, make sure you use the correct value for _api_base_url_ or _base_url_ for your environment:

- **Sandbox workspaces:** <https://sandbox-api.fireblocks.io>
- **Mainnet or Testnet workspaces:** <https://api.fireblocks.io>

[Learn more about workspace differences](https://developers.fireblocks.com/docs/workspace-environments).

```javascript
const fs = require('fs');
const path = require('path');
const { FireblocksSDK } = require('fireblocks-sdk');
const { exit } = require('process');
const { inspect } = require('util');

const apiSecret = fs.readFileSync(path.resolve("</path/to/fireblocks_secret.key>"), "utf8");

// Your NCW Admin API key
const apiKey = "<your-api-key-here>"
// Choose the right api url for your workspace type 
const baseUrl = "https://sandbox-api.fireblocks.io";
const fireblocks = new FireblocksSDK(apiSecret, apiKey, baseUrl);

(async () => {

   //Create a new Non Custodial Wallet
   const walletId = await fireblocks.NCW.createWallet();
	 console.log(inspect(walletId, false, null, true));
  
})().catch((e)=>{
    console.error(`Failed: ${e}`);
    exit(-1);
})
```
