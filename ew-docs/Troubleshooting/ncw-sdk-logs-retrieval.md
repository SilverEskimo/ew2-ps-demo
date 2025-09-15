---
title: "EW SDK Manual Log Retrieval"
slug: "ncw-sdk-logs-retrieval"
excerpt: ""
hidden: false
createdAt: "Tue Feb 06 2024 15:35:53 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Aug 01 2024 13:33:55 GMT+0000 (Coordinated Universal Time)"
---
# Overview

If you experience issues during your application's development phase or with end users, you may need to retrieve EW SDK logs to troubleshoot those issues. To facilitate this, the EW SDK exposes methods that enable you to fetch logs. You can then send the collected logs to your designated servers.

- For our mobile SDKs, a designated interface guides you to a zipped file that you can retrieve from your end-user clients and then upload to your servers.
- The web SDK offers an interface that lets you write and fetch logs. Refer to the web demo for an example of writing logs to your browser's indexed database.

# Example

```javascript Web
// First you need to initialize the NCW SDK with an implementation of the looger 
const logger: IndexedDBLogger = await IndexedDBLoggerFactory({ deviceId, logger: ConsoleLoggerFactory() });

const fireblocksNCW = await FireblocksNCWFactory({
          env: ENV_CONFIG.NCW_SDK_ENV,
          logLevel: "INFO",
          deviceId,
          messagesHandler,
          eventsHandler,
          secureStorageProvider,
          logger,
        });


// Number of logs collected
const numberOfLogs = await logger.count();


// Collect 10 logs 
const logs = await logger.collect(10);

// Clears the oldest 10 logs
await logger.clear(10);

```
```javascript iOS
guard let url = FireblocksManager.shared.getSdkInstance()?.getURLForLogFiles() else {
            print("Can't get file log url")
            return
}
```
```javascript Android

val sdkUri = Fireblocks.getUriForLogFiles(context)
```

# Need help?

Contact Fireblocks Support and include your logs as an attachment.
