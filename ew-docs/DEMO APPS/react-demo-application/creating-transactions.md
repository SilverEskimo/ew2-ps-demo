---
title: "Creating Transactions"
slug: "creating-transactions"
excerpt: ""
hidden: true
createdAt: "Sat Sep 02 2023 09:38:45 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jun 30 2025 14:26:14 GMT+0000 (Coordinated Universal Time)"
---
In the React Demo Application, we perform [typed message signing](https://developers.fireblocks.com/docs/typed-message-signing) for Goerli ETH. The transaction values are hard-coded in the Backend Server Demo application, so you can customize these values by updating the transaction controller in the backend server.

The front-end application calls the relevant endpoint to initiate the transaction process.

```javascript AppStore.ts
...

createTransaction: async () => {
  if (!apiService) {
    throw new Error("apiService is not initialized");
  }
  const { deviceId } = get();
  const newTxData = await apiService.createTransaction(deviceId);
  const txs = updateOrAddTx(get().txs, newTxData);
  set((state) => ({ ...state, txs }));
}

...
```

```javascript ApiService.ts
...

public async createTransaction(deviceId: string): Promise<ITransactionData> {
  const createTxResponse = await this._postCall(`api/devices/${deviceId}/transactions`);
  return createTxResponse;
}

...
```
