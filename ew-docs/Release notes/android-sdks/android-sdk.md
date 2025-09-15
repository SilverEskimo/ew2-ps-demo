---
title: "Core SDK"
slug: "android-sdk"
excerpt: ""
hidden: false
createdAt: "Sun Dec 03 2023 11:49:28 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Aug 05 2025 12:22:04 GMT+0000 (Coordinated Universal Time)"
---
# What's new in 2.9.14

- Added ability to control console logging when needed, particularly for network call logging. This provides better flexibility for debugging while maintaining production performance.
- Enhanced data masking with new patterns for encryptedKey and iv fields in MaskSensitiveData functionality, providing better protection of sensitive cryptographic information.
- Enhanced error handling in WalletRepo registration process, providing more reliable wallet initialization and better error reporting.

# What's new in 2.9.9

- Android 15+ Page Size Support: Native libraries now support Android's 16 KB page sizes, fulfilling a requirement for new apps and updates targeting Android 15 and above. (Refer to the [Android Developers documentation](https://developer.android.com/guide/practices/page-sizes) for more details.)

# What's new in 2.9.8

- Improved request join wallet flow for multiple algorithms.

# What's new in 2.9.7

- Fixed an issue that prevented key generation on Android devices with non-English locales.

# What's new in 2.9.6

- Improved transaction's signature timeouts handling on wallets with multiple devices.

# What's new in 2.9.5

- We now have more accurate error events for scenarios where functionality fails due to incomplete device setup or involving invalid physical device IDs.

# What's new in 2.9.4

- We've improved how we handle failed requests by adding a short delay, ensuring faster issue resolution and reducing unnecessary retries.

# What's new in 2.9.3

- In cases where a signature verification error is detected, the system will now proactively check the integrity and status of its downloaded certificates. If these certificates are found to be outdated or invalid, they will be refreshed to ensure that signature verification can proceed correctly.

# What's new in 2.9.2

- Added  `FireblocksError`  `MaxDevicesPerWalletReached` (111) when the maximum number of devices in a wallet is reached while trying to add a new device. This ensures users are informed about the limit and can take appropriate actions.
- Enhanced the stability of the native code involved in Multi-Party Computation (MPC) flows. This update aims to provide a more reliable and robust experience during MPC operations.

# What's new in 2.9.1

- Added a new `internalErrorCode` field in the `FireblocksError` class to provide additional information on specific errors.

***

# What's new in 2.9.0

- Resolved an issue that occurred during key generation when a device setup was incomplete.
- Resolved a concurrency issue that arose when attempting to join a wallet containing multiple keys.
- Implemented a restriction to prevent the usage of internal classes, enhancing security and code integrity.

***

# What's new in 2.8.2

- Fixed an issue where key generation could fail if initiated immediately after SDK initialization.

***

# What's new in 2.8.1

- Resolved an issue when verifying certificates concurrently.

***

# What's new in 2.8.0

- Resolved a minor issue in the MPC code.

***

# What's new in 2.7.0

In version 2.7.0, we've introduced a few enhancements:

- Improved log collection.
- Resolved an issue when trying to sign a transaction that has failed or will fail before it can even be signed.
- Improved error visibility: wrong passphrase in the recovery process is now explicitly mentioned in the returned error as `WRONG_RECOVERY_PASSPHRASE` (603)
- The SDK is now being built with Android 14 (API Level 34). For more information please see [here](https://developer.android.com/google/play/requirements/target-sdk).

***

# What's new in 2.6.0

In version 2.6.0, we've introduced a few major enhancements.

1. Direct reporting of errors to Fireblocks. This will ease the process of supporting and debugging issues in the future. More information can be found [here](https://ncw-developers.fireblocks.com/docs/ncw-sdk-telemetry-collection).
2. Our MPC ceremony processes have been enhanced for greater robustness. MPC messages will now undergo multiple retry attempts before failing.
3. Unexpected device errors, as seen in [Common Errors](doc:common-errors) will now result in the expected messaging, and not in a timeout.
4. You can now dynamically extend wallets! Expand the range of algorithms available in a wallet by adding, for instance, EdDSA alongside ECDSA. Learn more [here](https://ncw-developers.fireblocks.com/docs/multiple-algorithms).

***

# What's new in 2.5.0

In version 2.5.0, we've introduced several enhancements and additions to the SDK functionality:

1. New Functionality: We've added a new function called `stopSignTransaction` to the SDK interfaces. This function enables users to stop and cancel transactions that were initiated for signing by the SDK.
2. Enhanced error handling for quick transaction signing failures caused by invalid messages from the backend, such as schema changes in the message response from the backend.
3. We've addressed a few edge cases in the mpcKeyGeneration process that could potentially result in key generation failures. These improvements enhance the overall stability and reliability of the SDK.

## Upgrade guidelines

1. In case of an exception, GenerateMPCKeys is no longer returning an empty Set, but a Set with keys and their appropriate statuses. You will need to validate that the keys are all in status Ready in order to verify that the setup is complete. Please See the following example for [clarifications.](https://github.com/fireblocks/ncw-ios-demo/commit/5a1f3318974a28aee7cd9cbf92406cf31f2ebb0a#diff-3ae2d84b992c8e9c9fd4f787b4c0fa44c9e601083e7d1ee0892acd8fb913ef14L90)
2. All `KeyRecovery` properties are now optional. This may come into effect in a similar code to this [one](https://github.com/fireblocks/ncw-ios-demo/commit/5a1f3318974a28aee7cd9cbf92406cf31f2ebb0a#diff-3ae2d84b992c8e9c9fd4f787b4c0fa44c9e601083e7d1ee0892acd8fb913ef14L162).
3. All `KeyDescriptor` properties are now optional. This may come into effect in a similar code to this [one](https://github.com/fireblocks/ncw-ios-demo/commit/5a1f3318974a28aee7cd9cbf92406cf31f2ebb0a#diff-3ae2d84b992c8e9c9fd4f787b4c0fa44c9e601083e7d1ee0892acd8fb913ef14L162).

***

# What's new in 2.4.0

In version 2.4.0, we've expanded the capabilities of the NCW SDK to support Solana and Algorand, now including the EdDSA algorithm alongside our existing ECDSA support. This enhancement enables a single wallet to seamlessly interact with Bitcoin, various EVMs, and Solana.

More information about the supported NCW networks may be found [here](https://ncw-developers.fireblocks.com/docs/supported-networks) .

Additionally, we're excited to announce that support for more blockchains, including Stellar, is on the horizon. Stay tuned for further updates!

## Upgrade guidelines

To successfully utilize the generateMPCKeys function with MPC_EDDSA_ED25519, it's essential that your workspace supports EdDSA. Learn more about supporting multiple algorithms within a single wallet [here](https://ncw-developers.fireblocks.com/docs/multiple-algorithms).

***

# What's new in 2.3.0

In version 2.3.0, we made significant performance improvements in transaction signing.

For additional tips on enhancing overall performance, refer to our documentation [here](https://ncw-developers.fireblocks.com/docs/boosting-ncw-client-performance).

***

# What's new in 2.2.8

In version 2.2.8, we made significant performance improvements in key generation and transactions.

For additional tips on enhancing overall performance, refer to our documentation [here](https://ncw-developers.fireblocks.com/docs/boosting-ncw-client-performance).

***

# What's new in 2.2.5

In version 2.2.5, we have added the ability to work with multiple devices in a single wallet.

For more information about multiple devices, refer to our documentation [here](https://ncw-developers.fireblocks.com/docs/multiple-devices).

***

# What's new in 2.1

In version 2.1, we added a safer backup and recovery mechanism.

## Breaking change

Version 2.1 introduces a breaking change since the following two functions in the interface will receive different parameters:

- `backupKeys`
- `recoverKeys`

You can find details about the implementation in our [android-ncw-demo repo](https://github.com/fireblocks/android-ncw-demo/) and more information about the backup procedure [here](https://ncw-developers.fireblocks.com/v4.0/docs/backup-recovery).

## Upgrade guidelines

When upgrading to version 2.1 and later, you should require the user to run another backup procedure so that the new encrypted backup share on the Fireblocks servers will be associated with a `passphraseId`.
