---
title: "Core SDK"
slug: "javascript-sdk"
excerpt: "https://www.npmjs.com/package/@fireblocks/ncw-js-sdk"
hidden: false
createdAt: "Sun Dec 03 2023 10:51:39 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu May 29 2025 14:50:21 GMT+0000 (Coordinated Universal Time)"
---
# What's new in 12.5.6

- Added new validation to `IMessagesHandler` responses to prevent crashes from non-conforming or malformed data.

***

# What's new in 12.5.5

- Fixed an issue where `STARTED` event was fired twice in the case of multiple devices for the given wallet.
- Fixed an issue where reporting of errors with empty strings was missing.
- Added a new error code, `INCOMPLETE_BACKUP` (706) when trying to backup keys, while one or more of the required algorithms is missing for backup.

***

# What's new in 12.5.3

- Fixed an issue where timeout was not properly stopping internal polling processes, ensuring more reliable performance.
- Added a new error code, `FireblocksError`  `MaxDevicesPerWalletReached` (111) when the maximum number of devices in a wallet is reached while trying to add a new device. This ensures users are informed about the limit and can take appropriate actions.

***

# What's new in 12.5.2

Enhanced the robustness of event dispatching to handle cases where client callbacks throw exceptions

***

# What's new in 12.5.1

Resolved an issue when trying to re-use an instance after calling `dispose`

***

# What's new in 12.5.0

- Resolved a minor issue in the MPC code.

## Breaking change

Version 12.5.0 introduces a small breaking change:

- It is not possible anymore to create **multiple instances** of the SDK **for the same device id**.
- If trying to do it, a `FireblocksError` exception will be thrown with error code  `INSTANCE_ALREADY_INITIALIZED (109)`
- Instead, you must re-use the instance you already created. 
- This is done by calling `getFireblocksNCWInstance(deviceId)` before creating an instance with `FireblocksNCWFactory(options)`.

We recommend visiting our [ncw-web-demo repo](https://github.com/fireblocks/ncw-web-demo) to understand how to adapt your app to the SDK changes. Specifically, you can always jump to this [commit](https://github.com/fireblocks/ncw-web-demo/pull/35/files) and see the changes we added to the web demo.

***

# What's new in 12.4.1

- Resolved an issue when dealing with multiple concurrent calls to `generateMPCKeys`
- Improved error visibility: wrong passphrase in the recovery process is now explicitly mentioned in the returned error as `WRONG_RECOVERY_PASSPHRASE (603)`

***

# What's new in 12.3.1

- Resolved an issue when trying to sign a transaction that has failed or will fail before it can even be signed. 

***

# What's new in 12.2.1

- Resolved an issue in the MPC ceremony process that previously caused exceptions in cases of poor connectivity.
- Enhanced the robustness of the MPC ceremony process by extending the retry mechanism.

***

# What's new in 12.2.0

In version 12.2.0, we've introduced a few major enhancements.

- Direct reporting of errors to Fireblocks. This will ease the process of supporting and debugging issues in the future. More information can be found [here](https://ncw-developers.fireblocks.com/docs/ncw-sdk-telemetry-collection).
- Our MPC ceremony processes have been enhanced for greater robustness. MPC messages will now undergo multiple retry attempts before failing.
- You can now dynamically extend wallets! Expand the range of algorithms available in a wallet by adding, for instance, EdDSA alongside ECDSA. Learn more [here](https://ncw-developers.fireblocks.com/docs/multiple-algorithms).

***

# What's new in 12.1.0

In version 12.1.0, we've expanded the capabilities of the NCW SDK to support Solana and Algorand, now including the EdDSA algorithm alongside our existing ECDSA support. This enhancement enables a single wallet to seamlessly interact with Bitcoin, various EVMs, and Solana.

More information about the supported NCW networks may be found [here](https://ncw-developers.fireblocks.com/docs/supported-networks) .

Additionally, we're excited to announce that support for more blockchains, including Stellar, is on the horizon. Stay tuned for further updates!

## Upgrade guidelines

To successfully utilize the generateMPCKeys function with MPC_EDDSA_ED25519, it's essential that your workspace supports EdDSA. Learn more about supporting multiple algorithms within a single wallet [here](https://ncw-developers.fireblocks.com/docs/multiple-algorithms).

***

# What's new in 12.0.0

In version 12.0.0, we introduced a more structured approach to error handling in our JavaScript SDK. With the inclusion of an exported `FireblocksError` class, developers can now access detailed error information using the new **FireblocksError.message** and **FireblocksError.key** properties.

If issues arise during SDK activities, these structured error responses aim to provide you with better insights, enabling efficient debugging or informed inquiries to our support team.

## Upgrade guidelines

If your previous code relied on specific error responses from the NCW SDK, incorporating these new error codes may improve the accuracy of your try/catch flows. Refer to this [PR](https://github.com/fireblocks/ncw-web-demo/pull/26/files) to see how we handled the SDK upgrade in our web demo.

***

# What's new in 11.0.2

In version 11.0.2, fixed a bug that may occur during a call to `generateMPCKeys`. 

***

# What's new in 11.0.1

In version 11.0.1, we have implemented significant performance improvements in key generation and transactions. For additional tips on enhancing overall performance, refer to our documentation [here](https://ncw-developers.fireblocks.com/docs/boosting-ncw-client-performance).

***

# What's new in 11.0.0

In version 11.0.0, we upgraded some of our JavaScript SDK infrastructure in preparation for upcoming versions, which include performance improvements in MPC key creation and transactions.

We also added these features and made these changes:

- The SDK logger utility lets you choose to keep historical data of all NCW SDK activity.
- The fetch log utility can now fetch SDK logs from your app.
- Reduced package size for faster loading times.

## Breaking change

Version 11.0.0 introduces a breaking change since we renamed the following interfaces:

- Instead of initializing via the `FireblocksNCW.initialize(options)` class function, call `FireblocksNCWFactory(options)`.
- Do not declare variables with type `FireblocksNCW` but refer to it via the `IFireblocksNCW` interface.
- Instead of initializing the logger via the `new ConsoleLogger()` function, call `ConsoleLoggerFactory()`.
- Instead of calling the `FireblocksNCW.version` function, call `version` directly.
- Instead of calling the `FireblocksNCW.generateDeviceId()` function, call `generateDeviceId()` directly.

We recommend visiting our [ncw-web-demo repo](https://github.com/fireblocks/ncw-web-demo) to understand how to adapt your app to the SDK changes. Specifically, you can always jump to this [commit](https://github.com/fireblocks/ncw-web-demo/pull/22/files#diff-bf5c0e301a4690ed37b7b89cd8479ddfd3660cb4e567b446cb12b7852c3f8f27R27) and see the changes we added to the web demo. 

***

# What's new in 10.0.7

In version 10.0.7, we added the ability to work with multiple devices in a single wallet. You can find more information about implementing multiple devices [here](https://ncw-developers.fireblocks.com/docs/multiple-devices).

***

# What's new in 10.0

In version 10.0, we added a safer backup and recovery mechanism.

## Breaking change

Version 10.0 introduces a breaking change since the following two functions in the interface will receive different parameters:

- `backupKeys`
- `recoverKeys`

You can find more details about the implementation in our [ncw-web-demo repo](https://github.com/fireblocks/ncw-web-demo) and the backup procedure [here](https://ncw-developers.fireblocks.com/v4.0/docs/backup-recovery).

## Upgrade guidelines

When upgrading to version 10.0 and later, you should require the user to run another backup procedure so that the new encrypted backup share on the Fireblocks servers will be associated with a `passphraseId`.
