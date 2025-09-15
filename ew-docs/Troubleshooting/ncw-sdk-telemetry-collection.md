---
title: "EW SDK Event Collection"
slug: "ncw-sdk-telemetry-collection"
excerpt: ""
hidden: false
createdAt: "Wed Jun 19 2024 12:27:36 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Aug 01 2024 13:35:26 GMT+0000 (Coordinated Universal Time)"
---
# Overview

During day-to-day operations, end users are triggering countless actions within your application. 

As part of your provided user experience, end users will generate keys, sign transactions and perform additional actions such as connecting their wallet to a dApp or export their private key material.  
Due to the complexity and variety of actions an end user may perform, different issues or errors may arise.

In order to proactively monitor and treat such problems that may appear, the EW SDK lets you toggle whether events and logs will be automatically sent to Fireblocks, through your backend.

Thus, Fireblocks may be able to proactively suggest and point onto issues or problems that your user base is facing, providing you with the ability to resolve it before any major impact. 

It's important to note Fireblocks does not retrieve any PII regarding the end user. Please review the Shared Data section to validate the data that is shared with Fireblocks.

# Configuration

As part of the `FireblocksOptions` object, you will now have a new flag, `reporting`.

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
		      reporting = { enabled: true },
        });


// Number of logs collected
const numberOfLogs = await logger.count();


// Collect 10 logs 
const logs = await logger.collect(10);

// Clears the oldest 10 logs
await logger.clear(10);

```
```javascript iOS
var fireblocksOptions = FireblocksOptions(
  env: EnvironmentConstants.env,
  eventHandlerDelegate: self,
  logLevel: .info,
  logToConsole: true,
  reporting: ReportingOptions(enabled: true)
)
```
```javascript Android
val fireblocksOptions = FireblocksOptions.Builder()
  .setLogLevel(getNCWLogLevel())
  .setLogToConsole(true)
  .setReportingOptions(ReportingOptions(enabled = false))
  .setEventHandler(object : FireblocksEventHandler {
                   override fun onEvent(event: Event) {
  // handle events
}
})
  .setEnv(environment)
    .build()
```

**By default, `reporting` is enabled**. If you do not want to share telemetry logs with Fireblocks, just set `reporting` to false.

# Shared Data

When reporting on errors, the SDK will collect a few fields:

- type
- message
- code
- level
- method
- logs

All of these are fields that are related to the EW SDK itself, and **do not expose** any personal identifiable information (**PII**) regarding the end user.

In addition, the below items are the only metadata fields regarding the device that are transferred to Fireblocks:

- navigator_appCodeName (e.g. Mozilla)
- navigator_appName
- navigator_language
- navigator_platform
- navigator_product
- navigator_userAgent
- navigator_vendor
- timezoneOffset

You may find an example payload here:

```javascript Web

```
```javascript iOS
completedMPC:true
device:iPhone14,3
deviceId:b0550946-3d70-4e6b-949d-247549bd775f
environment:dev9
hasCMPKey:true
iosVersion:16.4
onboardedRecovery:false
timezone:GMT+3
uptime:timeval(tv_sec: 1716876653, tv_usec: 488161)
```
```javascript Android
VersionIncremental=S.17acc52_1-1, 
completedMPC=false, 
Uptime= 18h29m3.942s, 
keyStatus=ERROR, 
Device=OnePlus/OP516FL1/NE2213/NE2213, 
SdkVersion=2.5.0_1, 
keyId=0743117c-f737-4f38-b5bc-2c5a0cb17209, 
AndroidVersion=34, 
deviceId=3ac62b9b-5bb6-4756-96ef-85015ee5f345, 
hasCMPKey=Yes, 
environment=dev9, 
TimeZone=GMT+03:00, 
onboardedRecovery=null, 
OSVersion=5.10.198-android12-9-o-g4b6fa3fb4a9f, 
VersionRelease=14, 
algorithm=MPC_EDDSA_ED25519
```
