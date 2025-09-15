---
title: "Asynchronous Model"
slug: "asynchronous-model"
excerpt: ""
hidden: true
createdAt: "Tue Aug 29 2023 12:43:09 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jul 25 2024 14:08:35 GMT+0000 (Coordinated Universal Time)"
---
# Overview

Multi-party computation (MPC) operations, such as new key generation or transaction signing, demand a unique approach. These operations are inherently asynchronous, requiring multiple rounds of communication among various signing participants. This guide aims to explain the nature of MPC's asynchronous model and provide insights into efficiently managing it using webhooks.

# Understanding the Asynchronous Nature of MPC Operations

MPC operations require coordination among multiple parties. This collaborative process involves several rounds of communication, contributing to the asynchronous nature of the operations.

## Addressing Asynchrony through Fireblocks Webhooks

The Fireblocks EW solution requires you to set up an endpoint on your backend server. This creates a designated location where the Fireblocks platform can push webhook notifications.

## Messages Handling Strategy

> 🚧 Important
> 
> The decision regarding the strategy for handling messages lies with the client. Fireblocks does not impose any specific method.

Once you've established the webhook endpoint, you can determine how to manage the incoming messages on your client side. Consider the following options:

- **Long Polling:** In this approach, your client application periodically queries your backend to check if any new messages have arrived.
- **Websockets:** Websockets provide a real-time communication channel between your client application and your backend. This approach offers instant updates as messages arrive, making it ideal for scenarios that require rapid responses.
- **Message Queues:** Implementing a message queue system, such as RabbitMQ or Apache Kafka, can help manage and distribute incoming webhook messages efficiently. Your client application can subscribe to the queue and receive messages as they are published.
- **Server-Sent Events (SSE):** SSE is a technology that allows the server to push real-time updates to the client over a single HTTP connection. This is especially useful when you want to receive updates as they occur without the overhead of managing multiple connections like in WebSockets.
- **Firebase Cloud Messaging (FCM):** FCM offers real-time mobile and web communication. Through the Firebase Admin SDK, your backend triggers notifications sent to the FCM server. FCM handles delivery to registered clients via unique tokens. The Firebase SDK on the client side manages message reception, delivery, and offline support.

# Implementation Steps

1. **Expose a Webhook Endpoint:** Set up a route on your backend server where our system can send webhook messages related to ongoing MPC operations.
2. **Fireblocks configuration:** Configure the webhook URL in your Fireblocks workspace by following this [guide](https://developers.fireblocks.com/docs/webhooks-notifications).
3. **Handle Incoming Webhooks:** Implement logic on your backend to receive, validate, and process incoming webhook messages. These messages contain crucial information about the progress of MPC operations.
4. **Client Application Integration:** Depending on your chosen strategy, integrate the necessary code into your client application to listen for updates from your backend.

# High-level diagram of outgoing and incoming messages

![](https://files.readme.io/3d935bf-image.png)

In the diagram above, the following actions take place:

- The client application invokes the EW SDK MPC **handleOutgoingMessage** method.
- The EW SDK generates the required payload, and the application sends it to the customer's backend.
- The backend server invokes the RPC endpoint in the Fireblocks API.
- The EW SDK waits for an appropriate response from Fireblocks.
- The SDK generates a corresponding message, and the same flow continues until the entire operation is done.
