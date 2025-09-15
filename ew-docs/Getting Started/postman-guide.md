---
title: "Postman Guide"
slug: "postman-guide"
excerpt: ""
hidden: true
createdAt: "Fri May 10 2024 10:49:30 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jul 14 2025 12:12:35 GMT+0000 (Coordinated Universal Time)"
---
@TODO: 1. the collection is not updated 2. maybe better to focus only on the admin APIs

# Video Guide

[block:embed]
{
  "html": "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FBLgpCGmncNY%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DBLgpCGmncNY&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FBLgpCGmncNY%2Fhqdefault.jpg&key=02466f963b9b4bb8845a05b53d3235d7&type=text%2Fhtml&schema=youtube\" width=\"854\" height=\"480\" scrolling=\"no\" title=\"YouTube embed\" frameborder=\"0\" allow=\"autoplay; fullscreen; encrypted-media; picture-in-picture;\" allowfullscreen=\"true\"></iframe>",
  "url": "https://www.youtube.com/watch?v=BLgpCGmncNY",
  "title": "Fireblocks Postman Demo",
  "favicon": "https://www.google.com/favicon.ico",
  "image": "https://i.ytimg.com/vi/BLgpCGmncNY/hqdefault.jpg",
  "provider": "youtube.com",
  "href": "https://www.youtube.com/watch?v=BLgpCGmncNY",
  "typeOfEmbed": "youtube"
}
[/block]


<br />

# Overview

Postman is an application designed to help with API integration and exploration. Intuitive for different tech skill levels, Postman is the tool of choice both for experienced developers and no-code enthusiasts to become familiar with our available endpoints, requests, and responses.

Using our Postman Collection, you can start testing our API before writing a single line of code.

# Prerequisites

Create an API user with our [Quickstart Guide](https://developers.fireblocks.com/docs/quickstart) or [Sandbox Quickstart Guide](https://developers.fireblocks.com/docs/sandbox-quickstart), or watch the video above to see how to create an API user on a Sandbox environment.

# Installation

1. Install [Postman](https://www.postman.com/downloads/)or use [Postman offline](https://identity.getpostman.com/login?continue=https%3A%2F%2Fweb.postman.co%2Fhome).
2. Download the [NCW Collection & Boilerplate](https://github.com/fireblocks/ncw-docs/tree/main/postman) from the official Fireblocks Github ncw-docs repo.
3. Go to **Collections**, and then press **Import** and select the downloaded `ncw-postman-collection.json` file.
4. Go to **Environments**, and then press **Import** and select the downloaded `Boilerplate Fireblocks Environment.postman_environment.json` file.

# Configuration

1. In the top-right corner, select **No Environment** > **Boilerplate Fireblocks Environment**.
2. Select the **Environments** tab and then configure the following parameters:
   1. **fireblocksApiKey:** This parameter is the API key you can copy from the Fireblocks Console after creating an API user.
   2. **fireblocksSecretKey:** This is the `fireblocks_secret.key` file you created in the Quickstart Guide or downloaded in the Sandbox Quickstart Guide.
   3. **baseUrl:** For production workspaces, use `https://api.fireblocks.io/v1`. For sandbox workspaces, use `https://sandbox-api.fireblocks.io`.

Your result should be similar to the following:

![](https://files.readme.io/199625a-image.png)

# Understanding Our REST APIs

> 🚧 Important
> 
> The API keys are intended solely for use by authorized administrators within your organization who manage the integration and hold the corresponding private keys.

Our Embedded Wallet (EW) solution offers two distinct types of REST API endpoints, each designed for specific roles and purposes as defined in our [API Roles](https://ncw-developers.fireblocks.com/docs/api-communication#role-permissions) documentation.

1. **EW Signer Endpoints:**
   - **Primary Usage:** These endpoints are typically invoked from your customer application via the EW SDK. This integration empowers your end-users to securely access and manage their own wallets.
   - **Alternative Usage (EW Signer User API):** For testing, administrative, or other specific needs, these Signer endpoints can also be called directly using the **EW Signer User API**. This method allows a designated administrator within your organization, who possesses the necessary private keys for the **EW Signer**, to interact with any wallet in the workspace.

2. **EW Admin Endpoints:**
   - **Purpose:** These endpoints are dedicated to administrative operations that manage your workspace and overall configuration.
   - **Access:** Access to **EW Admin** endpoints is restricted and requires the **EW Admin User API**. These calls can only be made directly by an authorized administrator within your organization who holds the private keys for **EW Admin** functionalities.

> 🚧 Important
> 
> These administrator-level API keys should **never** be embedded in client-side code or directly within your end-user application. End-users interact with their wallets via the EW SDK, which handles authentication via the configured Oauth setup.

# Making your first request

## Create a Wallet

> 📘 Note
> 
> While end-users will have wallets created for them seamlessly via the EW SDK integrated into your application, administrators also have the capability to create wallets directly.
> 
> We'll demonstrate this direct administrative method for testing purposes.

1. First, call the [Create a new wallet](https://developers.fireblocks.com/reference/create-1) endpoint.

   ![](https://files.readme.io/37bb545-image.png)
2. Select **Send** and then wait for the response. You should receive the following `201 Created` response:

   ![](https://files.readme.io/32851d3-image.png)

Good job! You have created your first non-custodial wallet with Fireblocks!
