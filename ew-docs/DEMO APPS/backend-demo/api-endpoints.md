---
title: "API Endpoints"
slug: "api-endpoints"
excerpt: ""
hidden: true
createdAt: "Sat Sep 02 2023 09:41:16 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed May 28 2025 10:36:09 GMT+0000 (Coordinated Universal Time)"
---
The backend server makes available the necessary endpoints for communication with any client application. Additionally, it exposes a webhook endpoint where Fireblocks can send asynchronous operation messages.

# Authentication

## Routes

`POST /api/login`: Exposed for users' login.

## Controller

The user controller is defined in the `/src/controllers/user.controller.ts/UserController` directory.

# Device

## Routes

- `GET /api/devices`: Returns all the devices registered in the database.
- `POST /api/devices/:deviceId/assign`: Assigns a newly generated deviceId to a `walletId` and `userId`.
- `GET /api/devices/:deviceId`: Retrieve the specified `deviceId` information.

The following endpoint is used for sending NCW SDK-generated messages to the backend that will forward these to the Fireblocks API.

- `GET /api/devices/:deviceId/rpc`

## Controller

The device controller is defined in the `/src/controllers/device.controller.ts/DeviceController` directory.

# Accounts

## Routes

- `GET /api/devices/:deviceId/accounts`: Retrieve all the accounts for the specified `deviceId`.

## Controller

Account controller is defined in the `/src/controllers/account.controller.ts/AccountController` directory.

# Assets

## Routes

- `GET /api/devices/:deviceId/accounts/:accountId/assets`: Retrieve all the existing assets for the specified account.
- `GET /api/devices/:deviceId/accounts/:accountId/assets/:assetId`: Retrieve the specified asset from the specified account.
- `GET /api/devices/:deviceId/accounts/:accountId/assets/:assetId/balance`: Retrieve the specified asset's balance from the specified account.
- `GET /api/devices/:deviceId/accounts/:accountId/assets/:assetId/address`: Retrieve the address of the specified asset from the specified account.
- `POST /api/devices/:deviceId/accounts/:accountId/assets/:assetId`: Create an asset in the specified account.

## Controller

The asset controller is defined in the `/src/controllers/asset.controller.ts/AssetController` directory.

# Transactions

## Routes

- `GET /api/devices/:deviceId/transactions`: Retrieve all transactions for the specified `deviceId`.
- `POST /api/devices/:deviceId/transactions`: Create a transaction. Currently, the transaction data is hard-coded in the transaction controller, but it can be easily modified according to your needs.
- `GET /api/devices/:deviceId/transactions/:transactionId`: Retrieve a transaction by its unique ID.
- `POST /api/devices/:deviceId/transactions/:txId/cancel`: Cancel a transaction by its unique ID.

## Controller

The transaction controller is defined in the `/src/controllers/transaction.controller.ts/TransactionController` directory.
