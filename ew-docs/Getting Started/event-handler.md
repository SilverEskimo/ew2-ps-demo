---
title: "Events Handler"
slug: "event-handler"
excerpt: ""
hidden: false
createdAt: "Tue Aug 29 2023 15:57:53 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jul 25 2024 15:08:32 GMT+0000 (Coordinated Universal Time)"
---
You can choose whether to provide an events handler during the mobile and web Software Development Kits (SDKs) setup for the Fireblocks Embedded Wallet (EW). The events handler activates during different operations within the SDK and keeps you in the loop about significant occurrences, such as key generation, backup and recovery, and transaction signing.

The events handler can be tailored to match your application's needs. It can be designed to execute various actions, such as refreshing the user interface, recording events, dispatching notifications, or initiating other behaviors specific to your application's functionality.

The events handler object should be provided when initializing the EW SDK. It must implement the following method (following a defined interface):

`handleEvent(event: Event): void`: The method invoked whenever there's a new event.

```javascript Web
export interface IEventsHandler {  
  handleEvent(event: TEvent): void;  
}
```
```Text Android
interface FireblocksEventHandler {

    /**
     * Listens to various Fireblocks events see [Event]. Each event has relevant information.
     * In addition, in case of an error we will add the [FireblocksError] with the relevant error code
     */
    fun onEvent(event: Event)
}

```
```swift iOS
public protocol EventHandlerDelegate: AnyObject {
    /// Listens to various Fireblocks events [FireblocksEvent]. Each event has relevant information.
    /// In addition, in case of an error we will add the FireblocksError with the relevant error code
    /// - Parameter event: FireblocksEvent
     func onEvent(event: FireblocksEvent)
}

```
