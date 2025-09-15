---
title: "Handling Returning End Users"
slug: "handling-returning-end-users"
excerpt: ""
hidden: false
createdAt: "Tue Feb 06 2024 17:30:50 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jul 25 2024 15:12:11 GMT+0000 (Coordinated Universal Time)"
---
# Overview

Let's say that your end user opens your web or mobile app, and you recognize after they log in that they have completed your onboarding (which included MPC key generation) and that their `walletId` is **walletId1**  and their `deviceId` is **deviceId1**. What's next?

- Did they previously complete the MPC key generation process with this device?
- Does this device need to run the recovery process now?
- Does this device need to ask to join an existing wallet?

# How to find the status of a user's keys

After you initialize the EW SDK, you can call the `getKeysStatus` function. This function returns a `keyDescriptor`object that contains the status of every ECDSA and EdDSA key associated with that user.

- The **READY** status indicates that the user completed their onboarding and generated their MPC key shares, and their device is ready to perform all MPC-related actions.
- Any other status (e.g., **INITIATED**, **REQUESTED_SETUP**, **SETUP**, **SETUP_COMPLETE**) indicates that the user never completed MPC key share generation and that the `generateMPCKeys` function should be called again.

If the `keyDescriptor` object returns as empty, this means the user's mobile device doesn't have a key share and was never in the process of creating a key share for the specified `deviceId`. This indicates that the current device may need to go into recovery mode or join an existing wallet.
