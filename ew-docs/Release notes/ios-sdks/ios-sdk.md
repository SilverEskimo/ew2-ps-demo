---
title: "Core SDK"
slug: "ios-sdk"
excerpt: ""
hidden: false
createdAt: "Thu Jan 25 2024 16:51:34 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Aug 05 2025 12:25:29 GMT+0000 (Coordinated Universal Time)"
---
# What's new in 2.9.14

- Improved error handling and logging with console output control.

# What's new in 2.9.8

- Improve logging capabilities by writing logs to the same file without additional folders.

<br />

# What's new in 2.9.2

- Added validations to the RPC messages received

***

# What's new in 2.9.1

- Introduced additional logging

***

# What's new in 2.9.0

Major Enhancements:

- **Join Device Flow Stability**: Fixed a rare crash that could occur when stopping the Join Device Flow, improving overall reliability.
- **SDK Logging**: Enhanced SDK logging to provide more detailed and structured logs, making it easier to debug and track issues.
- **Error Handling**: Standardized error handling across all platforms, ensuring consistent behavior and improved error reporting. Also added  `FireblocksError`  `MaxDevicesPerWalletReached` (111) when the maximum number of devices in a wallet is reached while trying to add a new device. This ensures users are informed about the limit and can take appropriate actions.

***

# What's new in 2.8.2

- Enhanced the MPC ceremony process to improve overall robustness and reliability.

***

# What's new in 2.8.1

- Introduced additional logging to provide better insights and troubleshooting.

***

# What's new in 2.8.0

Major Enhancements:

- Enhanced Performance Optimization:
  - Improved execution speed and reduced latency for high-demand operations.
  - Refined memory management for better stability and efficiency.
- Advanced Data Processing:
  - Optimized algorithms for reduced computational overhead.

New Features:

- Improved Error Handling:
  - More detailed error messages and diagnostics to facilitate quicker debugging.
  - Added support for custom error handlers and logging mechanisms.

Bug Fixes:

- Addressed stability issues reported in previous versions.

***

# What's new in 2.7.1

- Resolved an issue when trying to sign transactions in the main thread.

***

# What's new in 2.7.0

In version 2.7.0, we've introduced a few enhancements:

- Improved log collection.
- Resolved an issue when trying to sign a transaction that has failed or will fail before it can even be signed.
- Improved error visibility: wrong passphrase in the recovery process is now explicitly mentioned in the returned error as `WRONG_RECOVERY_PASSPHRASE` (603)

***

# What's new in 2.6.0

In version 2.6.0, we've introduced a few major enhancements.

1. Direct reporting of errors to Fireblocks. This will ease the process of supporting and debugging issues in the future. More information can be found [here](https://ncw-developers.fireblocks.com/docs/ncw-sdk-telemetry-collection).
2. Our MPC ceremony processes have been enhanced for greater robustness. MPC messages will now undergo multiple retry attempts before failing.
3. Unexpected device errors, as seen in [Common Errors](doc:common-errors) will now result in the expected messaging, and not in a timeout.
4. You can now dynamically extend wallets! Expand the range of algorithms available in a wallet by adding, for instance, EdDSA alongside ECDSA. Learn more [here](https://ncw-developers.fireblocks.com/docs/multiple-algorithms).

***

# What's new in v2.5.1

We introduced several enhancements and additions to the SDK functionality:

1. **Canceling Transactions**: Added a new function called `stopSignTransaction` to the SDK interfaces. This function enables your app to cancel transactions the end-user initiated for signing.
2. **Improved Error Handling**: Enhanced error handling for quick transaction signing failures caused by invalid messages from the backend, such as schema changes in the response. This improvement helps identify and resolve issues faster.
3. **MPC Key Generation**: Addressed a few edge cases in the MPC Key Generation process that could potentially result in key generation failures.
4. **EdDSA Signing Performance**: Drastically improved EdDSA Blockchains _signing_ speed.
5. **Logging**: Added a new parameter, logToConsole, to FireblocksOptions. This parameter allows you to push logs to the Xcode console when running the host app, which can be helpful for debugging purposes.
6. **Minor Interface Changes**: There were some small changes to the SDK interface. Please read the guidelines in the following section for more details.

## Upgrade guidelines

1. `GenerateMPCKeys` Behavior Change: In case of an exception, GenerateMPCKeys now returns a Set containing keys and their corresponding statuses, instead of an empty Set. You will need to check that all keys have a "Ready" status to ensure successful setup. Please see the following example for [clarification](https://github.com/fireblocks/ncw-ios-demo/commit/5a1f3318974a28aee7cd9cbf92406cf31f2ebb0a#diff-3ae2d84b992c8e9c9fd4f787b4c0fa44c9e601083e7d1ee0892acd8fb913ef14L90).
2. Optional `KeyRecovery` Properties: All KeyRecovery properties are now optional. This may affect your code if you were previously relying on default values. See the following example for a similar [code change](https://github.com/fireblocks/ncw-ios-demo/commit/5a1f3318974a28aee7cd9cbf92406cf31f2ebb0a#diff-3ae2d84b992c8e9c9fd4f787b4c0fa44c9e601083e7d1ee0892acd8fb913ef14L162).
3. Optional `KeyDescriptor` Properties: All KeyDescriptor properties are now optional. This may affect your code if you were previously relying on default values. See the following example for a similar [code change](https://github.com/fireblocks/ncw-ios-demo/commit/5a1f3318974a28aee7cd9cbf92406cf31f2ebb0a#diff-3ae2d84b992c8e9c9fd4f787b4c0fa44c9e601083e7d1ee0892acd8fb913ef14L162).

***

# What's new in v2.4.0

We expanded the capabilities of the NCW SDK to support Solana and Algorand, now including the EdDSA algorithm alongside our existing ECDSA support. This enhancement enables a single wallet to seamlessly interact with Bitcoin, various EVMs, and Solana.

More information about the supported NCW networks may be found [here](https://ncw-developers.fireblocks.com/docs/supported-networks) .

Additionally, we're excited to announce that support for more blockchains, including Stellar, is on the horizon. Stay tuned for further updates!

## Upgrade guidelines

To successfully utilize the generateMPCKeys function with MPC_EDDSA_ED25519, your workspace must support EdDSA. Learn more about supporting multiple algorithms within a single wallet [here](https://ncw-developers.fireblocks.com/docs/multiple-algorithms).

***

# What's new in v2.3.2

We resolved a bug that occurred during transaction signing, leading to intermittent failures after a few transactions. The root cause was identified within the MPC process, where the SDK did not handle a specific use case that emerged during performance improvement efforts.

It's important to note that although a transaction may have failed initially, it was possible to retry the transaction signing with success on subsequent attempts.

***

# What's new in v2.3.1

We addressed and resolved a potential race condition that could occur during the `generateMPCKeys` process. This fix ensures that the operation no longer fails due to the identified race condition.

***

# What's new in v2.3.0

We made significant performance improvements in key generation and transactions signing.

For additional tips on enhancing overall performance, refer to our documentation [here](https://ncw-developers.fireblocks.com/docs/boosting-ncw-client-performance).

***

# What's new in v2.2.0

We added the ability to work with multiple devices in a single wallet.

For more information about multiple devices, refer to our documentation [here](https://ncw-developers.fireblocks.com/docs/multiple-devices).

***

# What's new in v2.1

We added a safer backup and recovery mechanism.

## Breaking change

We made a significant breakthrough since the following two functions in the interface will receive different parameters:

- `backupKeys`
- `recoverKeys`

You can find details about the implementation in our [ios-ncw-demo repo](https://github.com/fireblocks/ncw-ios-demo) and more information about the backup procedure [here](https://ncw-developers.fireblocks.com/v4.0/docs/backup-recovery).

## Upgrade guidelines

When upgrading to version 2.1 and later, you should require the user to run another backup procedure so that the new encrypted backup share on the Fireblocks servers will be associated with a `passphraseId`.
