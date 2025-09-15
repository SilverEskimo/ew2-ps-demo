---
title: "Quickstart"
slug: "setup-5"
excerpt: ""
hidden: true
createdAt: "Wed Sep 06 2023 05:14:50 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed May 28 2025 10:36:45 GMT+0000 (Coordinated Universal Time)"
---
# Overview

Fireblocks has developed a Dockerized version that can run the [React Demo Application](https://ncw-developers.fireblocks.com/docs/setup) and the [Backend Server Demo Application](https://ncw-developers.fireblocks.com/docs/setup-1) together. You can access the GitHub repository [here](https://github.com/fireblocks/ncw-demo-dockerized).

# App Components

The application has the following components:

- [Fireblocks React NCW Demo application](https://ncw-developers.fireblocks.com/docs/setup): React demo application that uses the Fireblocks NCW Web SDK.
- [Fireblocks Backend Demo application](https://ncw-developers.fireblocks.com/docs/setup-1): A Node.js (Express) backend server used by the front end for proxying the communication to the Fireblocks API.
- [Localtunnel](https://theboroer.github.io/localtunnel-www/): Exposing your local development environment to the Fireblocks Webhook service (and the world).
- MySQL Database

> 📘 Note
> 
> We employed Localtunnel in this context to make your local development environment accessible to external parties, but primarily for configuring the necessary webhook setup that enables Fireblocks to transmit the essential webhook messages to your backend system.

# Setup

First, clone the repo to your machine using `git clone https://github.com/fireblocks/ncw-demo-dockerized.git`.

Then, move `cd ncw-demo-dockerized` into the cloned directory.

# Configuration

> 🚧 Before you begin
> 
> Fireblocks assumes that the client application uses Firebase Authentication. We provide you with our Firebase project credentials for your convenience, but you can override these if necessary.

You must configure a few configuration files before running the application. Below are examples of each.

## Backend Demo App

The `/config/ncw_backend_demo/env.txt` file is the configuration file for the backend application.

### Example

```javascript env
NODE_ENV=production

PORT=3000
CMC_PRO_API_KEY=""

# Auth (Firebase demo example)
JWKS_URI=https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com
ISSUER=https://securetoken.google.com/fireblocks-sdk-demo
AUDIENCE=fireblocks-sdk-demo

# Fireblocks API 
FIREBLOCKS_API_SECRET="-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAA\...\nqt1ADkJPmFybZIhEY+ubRIOf5w==\n-----END PRIVATE KEY-----"
FIREBLOCKS_API_KEY_NCW_SIGNER="5f5d261f-973c-4f18-bc3e-b9b35dd214d6"
FIREBLOCKS_API_KEY_NCW_ADMIN="e1607032-ad47-46b1-b358-69ab1785e738"
FIREBLOCKS_API_BASE_URL="https://sandbox-api.fireblocks.io/"

# Fireblocks sandbox webhook public key
FIREBLOCKS_WEBHOOK_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw+fZuC+0vDYTf8fYnCN6\n71iHg98lPHBmafmqZqb+TUexn9sH6qNIBZ5SgYFxFK6dYXIuJ5uoORzihREvZVZP\n8DphdeKOMUrMr6b+Cchb2qS8qz8WS7xtyLU9GnBn6M5mWfjkjQr1jbilH15Zvcpz\nECC8aPUAy2EbHpnr10if2IHkIAWLYD+0khpCjpWtsfuX+LxqzlqQVW9xc6z7tshK\neCSEa6Oh8+ia7Zlu0b+2xmy2Arb6xGl+s+Rnof4lsq9tZS6f03huc+XVTmd6H2We\nWxFMfGyDCX2akEg2aAvx7231/6S0vBFGiX0C+3GbXlieHDplLGoODHUt5hxbPJnK\nIwIDAQAB\n-----END PUBLIC KEY-----"

# Database
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=ncw_user
DB_PASSWORD=ncw_user_password
DB_NAME=ncw_demo
```

## Frontend App

The `/config/ncw_web_demo/env.txt` file is the configuration file for the Frontend application.

### Example

```javascript env

VITE_AUTOMATE_INITIALIZATION=true

VITE_BACKEND_BASE_URL=http://localhost:3000
VITE_NCW_SDK_ENV=sandbox
```

## Localtunnel App

The `/config/tunnel/env.txt` file is the configuration file for the Localtunnel application.

### Example

```javascript env
TUNNEL_SUBDOMAIN=my_ncw_subdomain
TARGET_PORT=3000
TARGET_HOST=ncw_backend_demo
```

## MySQL App

The `/config/mysql/env.txt` file is the configuration file for the MySQL application.

### Example

```javascript .env
MYSQL_ROOT_PASSWORD=test
```

# Running the application

Run the following command: `docker-compose up --build`

The application should then start the build process and output the webhook URL that must be configured in your Fireblocks Console. The webhook endpoint is exposed in the following route: <https://your_sub_domain.local.lt/api/webhook>

![](https://files.readme.io/13db172-image.png)

- The Frontend application runs on `http://localhost:5173` by default.
- The Backend application runs on `http://localhost:3000` by default.

# Usage

For usage information, refer to our demo app guides:

- [Backend Demo App](https://ncw-developers.fireblocks.com/v5.0/docs/setup-1)
- [React Demo App](https://ncw-developers.fireblocks.com/v5.0/docs/setup)
