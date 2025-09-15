---
title: "MPC Keys Generation"
slug: "mpc-key-generation-1"
excerpt: ""
hidden: true
createdAt: "Tue Aug 29 2023 12:51:14 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jun 30 2025 14:26:14 GMT+0000 (Coordinated Universal Time)"
---
# Overview

Once the user is logged in, we can initiate the MPC key share generation process. The currently supported algorithm is `MPC_CMP_ECDSA_SECP256K1`, which is the MPC-CMP version of the `secp256k1` curve with the `ECDSA` algorithm supported by Bitcoin and EVM-based blockchains.

Fireblocks NCW SDK exposes the `generateMPCKeys` method for the MPC key generation process. The process is asynchronous and should be handled as described on the [Asynchronous Model](https://ncw-developers.fireblocks.com/docs/asynchronous-model) page.

# Generating MPC Keys

First, you must specify the algorithm for the generated key:

```javascript GenerateMPCKeys.tsx
...

// Get the MPC Key algorithm
const getDefaultAlgorithems = (): Set<TMPCAlgorithm> => {
  const algorithms = new Set<TMPCAlgorithm>();
  algorithms.add("MPC_CMP_ECDSA_SECP256K1");
  return algorithms;
};

...
```

Then, call the `generateMPCKeys` method:

```javascript ApiService.ts
...

await fireblocksNCW.generateMPCKeys(algorithms);

...
```
