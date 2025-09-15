---
title: "SDK Initialization"
slug: "sdk-initialization"
excerpt: ""
hidden: true
createdAt: "Tue Aug 29 2023 12:50:59 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jun 30 2025 14:26:15 GMT+0000 (Coordinated Universal Time)"
---
# Overview

You should only initialize the Fireblocks Non-Custodial Wallet (NCW) SDK after you create a Device ID value and assign it to a user.

# Generate a Device ID

The Device ID is a logical identifier representing an entity that stores a user key share and can participate in MPC operations for a given wallet. It is a unique identifier per SDK instance.

> 📘 Note
> 
> NCW SDK exposes a static method to generate a random `deviceId` - `fireblocksNCW.generateDeviceId()`
> 
> The code below will be changed to use this method in the near future.

```javascript deviceId.ts
const DEVICE_ID_KEY = "DEMO_APP:deviceId";

export const generateDeviceId = () => crypto.randomUUID();

export const getDeviceId = () => {
  return localStorage.getItem(DEVICE_ID_KEY);
};

export const getOrCreateDeviceId = () => {
  const deviceId = getDeviceId();
  if (deviceId) {
    return deviceId;
  }

  const uuid = generateDeviceId();
  setDeviceId(uuid);
  return uuid;
};

export const setDeviceId = (deviceId: string) => {
  localStorage.setItem(DEVICE_ID_KEY, deviceId);
};

```

# SDK Initialization

When you initialize the SDK, you must pass the deviceId, storage provider, message handler, and (optionally) the event handler.

Below we cover how we implemented each in our React Demo Application. You can also find the code in the `/src/AppStore.ts` directory.

## Outgoing Message Handler

MessageHandler is the implementation of the outgoing message handling object for the asynchronous MPC messaging flow.

```javascript AppStore.ts
...

const messagesHandler: IMessagesHandler = {
  handleOutgoingMessage: (message: string) => {
    if (!apiService) {
      throw new Error("apiService is not initialized");
    }
    return apiService.sendMessage(deviceId, message);
  },
};

...
```

For more information, refer to the [Outgoing Message Handling](https://ncw-developers.fireblocks.com/docs/outgoingincoming-message-handling) guide.

## Storage Provider

The NCW SDK calls the storage provider to access the MPC keys stored on the end user's device.

In the React Demo Application, we implemented password-protected storage that extends the built-in `BrowserLocalStorageProvider` and encrypts the key share stored in the browser's local storage:

```javascript PasswordEncryptedLocalStorage.ts
import { md } from "node-forge";
import {
  ISecureStorageProvider,
  BrowserLocalStorageProvider,
  decryptAesGCM,
  encryptAesGCM,
} from "@fireblocks/ncw-js-sdk";

export type GetUserPasswordFunc = () => Promise<string>;

/// This secure storage implementations creates an encryption key on-demand based on a user password

export class PasswordEncryptedLocalStorage extends BrowserLocalStorageProvider implements ISecureStorageProvider {
  private encKey: string | null = null;
  constructor(
    private deviceId: string,
    private getPassword: GetUserPasswordFunc,
  ) {
    super(`secure-${deviceId}`);
  }

  public async unlock(): Promise<void> {
    this.encKey = await this._generateEncryptionKey();
  }

  public async lock(): Promise<void> {
    this.encKey = null;
  }

  public async get(key: string): Promise<string | null> {
    if (!this.encKey) {
      throw new Error("Storage locked");
    }

    const encryptedData = await super.get(key);
    if (!encryptedData) {
      return null;
    }

    return decryptAesGCM(encryptedData, this.encKey, this.deviceId);
  }

  public async set(key: string, data: string): Promise<void> {
    if (!this.encKey) {
      throw new Error("Storage locked");
    }

    const encryptedData = await encryptAesGCM(data, this.encKey, this.deviceId);
    await super.set(key, encryptedData);
  }

  private async _generateEncryptionKey(): Promise<string> {
    let key = await this.getPassword();
    const md5 = md.md5.create();

    for (let i = 0; i < 1000; ++i) {
      md5.update(key);
      key = md5.digest().toHex();
    }

    return key;
  }
}

```

This secure storage provider is passed to the NCW SDK initialization call:

```javascript AppStore.ts
...

const secureStorageProvider = new PasswordEncryptedLocalStorage(deviceId, () => {
  const password = prompt("Enter password", "");
  return Promise.resolve(password || "");
});

...
```

## Event Handler

The event handler is optional. We implemented it in our React Demo Application to get the MPC Key generation status and present it to the end user:

```javascript AppStore.ts
...

const eventsHandler: IEventsHandler = {
  handleEvent: (event: TEvent) => {
    switch (event.type) {
      case "key_descriptor_changed":
        const keysStatus: Record<TMPCAlgorithm, IKeyDescriptor> =
          get().keysStatus ?? ({} as Record<TMPCAlgorithm, IKeyDescriptor>);
        keysStatus[event.keyDescriptor.algorithm] = event.keyDescriptor;
        set((state) => ({ ...state, keysStatus }));
        break;
    }
  },
};

...
```

## Initialize SDK

Finally, let's initialize the Fireblocks NCW SDK instance with all the required values:

```javascript
...

const fireblocksNCW = await FireblocksNCWFactory({
  env: ENV_CONFIG.NCW_SDK_ENV,
  logLevel: "INFO",
  deviceId,
  messagesHandler,
  eventsHandler,
  secureStorageProvider,
  logger,
  logLevel
});

...
```

Note that here we pass a few additional values:

- **`env`:** (Optional) The Fireblocks environment we are working on. The default value is `sandbox`.
- **`logger`:** (Optional) Your logging mechanism implementation.
- **`logLevel`:** (Optional) Your logging mechanism implementation. The default value is `info`
