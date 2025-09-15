---
title: "Quickstart"
slug: "setup-1"
excerpt: ""
hidden: true
createdAt: "Sat Sep 02 2023 09:39:46 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed May 28 2025 10:36:09 GMT+0000 (Coordinated Universal Time)"
---
The open-source backend demo application, which encompasses all the necessary backend operations for the Fireblocks Non-Custodial Wallet (NCW), can be accessed on [our official GitHub account](https://github.com/fireblocks/ncw-backend-demo).

This application provides all the essential endpoints for interaction with the client application and a webhook endpoint designed for Fireblocks to transmit the necessary messages required for asynchronous communication related to MPC operations.

# Data Base setup

The backend server requires a MySQL database to be set for its operation. The database models are defined in the `ncw-backend-demo/src/model` directory and has the following structure:

1. Device
2. Transaction
3. Message
4. User
5. Wallet
6. Wallets Transactions

The following ER diagram is generated automatically by `yarn db:diagram` script:

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/396b641-backend-nodel.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


Please install MySQL on the machine that you intend to run the backend on, or alternatively, you can use any DB as a service provider.

- Docker for MySQL
- Windows - <https://dev.mysql.com/doc/refman/8.0/en/windows-installation.html>
- MacOS - <https://dev.mysql.com/doc/refman/8.0/en/macos-installation.html>
- Ubuntu - <https://dev.mysql.com/doc/refman/8.0/en/linux-installation.html>

# Environment Variables

In this demo, we assume that the client application uses Firebase Authentication. We provide you with our own Firebase project credentials for your convenience, but these can be easily overridden if necessary.

First, create a `.env` file:

```shell
touch .env	
```

Next, edit the `.env` file with the following values:

```shell
NODE_ENV=production
PORT=<the_port_for_the_backend_server>
CMC_PRO_API_KEY=<cmc_api_key_for_getting_asset_rates>


# Auth (Firebase demo example)
JWKS_URI=https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com
ISSUER=https://securetoken.google.com/fireblocks-sdk-demo
AUDIENCE=fireblocks-sdk-demo

FIREBLOCKS_API_SECRET=<your_fireblocks_api_secret_key_value>
FIREBLOCKS_API_KEY_NCW_SIGNER=<ncw_signer_api_key>
FIREBLOCKS_API_KEY_NCW_ADMIN=<ncw_admin_api_key>
FIREBLOCKS_WEBHOOK_PUBLIC_KEY=<webhook_public_key>
FIREBLOCKS_API_BASE_URL=<fireblocks_api_base_url>
  
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=<db_user>
DB_PASSWORD=<db_password>
DB_NAME=ncw_demo
```

## Example

```shell
NODE_ENV=production

PORT=3000
CMC_PRO_API_KEY=""

# Auth (Firebase demo example)
JWKS_URI=https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com
ISSUER=https://securetoken.google.com/fireblocks-sdk-demo
AUDIENCE=fireblocks-sdk-demo

# Fireblocks API 
FIREBLOCKS_API_SECRET=-----BEGIN PRIVATE KEY-----\nMIIJQgIBADANBgkqhkiG9w0BAQEFAASCCSwwggkoAgEAAoICAQDJG3MoSmJQoJPp\...nFc85NAVkuSI4AjGMAR4vOl+stL54Ig==\n-----END PRIVATE KEY-----
FIREBLOCKS_API_KEY_NCW_SIGNER=ad792f24-ab33-1314-ad35-1ee8cfd6654a
FIREBLOCKS_API_KEY_NCW_ADMIN=d2aa3fd9-ee01-4cee-b963-613b22313bed4
FIREBLOCKS_WEBHOOK_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw+fZuC+0vDYTf8fYnCN6\n71iHg98lPHBmafmqZqb+TUexn9sH6qNIBZ5SgYFxFK6dYXIuJ5uoORzihREvZVZP\n8DphdeKOMUrMr6b+Cchb2qS8qz8WS7xtyLU9GnBn6M5mWfjkjQr1jbilH15Zvcpz\nECC8aPUAy2EbHpnr10if2IHkIAWLYD+0khpCjpWtsfuX+LxqzlqQVW9xc6z7tshK\neCSEa6Oh8+ia7Zlu0b+2xmy2Arb6xGl+s+Rnof4lsq9tZS6f03huc+XVTmd6H2We\nWxFMfGyDCX2akEg2aAvx7231/6S0vBFGiX0C+3GbXlieHDplLGoODHUt5hxbPJnK\nIwIDAQAB\n-----END PUBLIC KEY-----"
FIREBLOCKS_API_BASE_URL=https://sandbox-api.fireblocks.io

# Database
DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=fireblocks
DB_PASSWORD=password_example
DB_NAME=ncw_demo

```

# Running the backend

The first step of running the backend is to build the application using yarn:

```shell
yarn build
```

Now we can run the server, including the DB migrations, using yarn:

```shell
yarn start
```

The server should be up and running, and you should see the following output in the terminal:

`Server is running at http://localhost:3000`
