---
title: "Authentication"
slug: "authentication"
excerpt: ""
hidden: true
createdAt: "Tue Aug 29 2023 12:50:39 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jun 30 2025 14:26:14 GMT+0000 (Coordinated Universal Time)"
---
> 🚧 Before you begin
> 
> - The React Demo Application uses our Backend Server Demo application. Please review [this guide](https://ncw-developers.fireblocks.com/docs/setup-1) before you proceeed.
> - We provide you with our Firebase project credentials for your convenience, but you can override them if necessary. Simply update the `/src/auth/FirebaseAppProvider.tsx` file with your configuration values.

# Overview

The initial stage of engaging with our React Demo Application involves user authentication and the creation of a user within the system. You accomplish this using Firebase Authentication.

# Setting Environment Variables

Create a `.env` file with the following variables:

```
VITE_AUTOMATE_INITIALIZATION=true

VITE_BACKEND_BASE_URL=<backend_server_base_url>
VITE_NCW_SDK_ENV=sandbox
```
