---
title: "Minimum Requirements"
slug: "minimum-requirements"
excerpt: ""
hidden: false
createdAt: "Tue Aug 29 2023 12:46:00 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed May 15 2024 13:32:14 GMT+0000 (Coordinated Universal Time)"
---
# Android

- 64-bit mobile device (usually devices with at least 6GB of RAM)
- Android API version 27 (Android 8.0.1)

## Distribution ABI filters

> 🚧 Pay attention
> 
> The SDK ABI Filter does not limit your app distribution to 64-bit. You must ensure that your app's `build.grade` file imposes this limitation. For additional information, refer to the [Android official guidelines](https://developer.android.com/ndk/guides/abis).

The SDK requires a minimum of 64-bit devices. The `build.grade` file includes the following ABI Filters:

```
ndk {
  abiFilters 'arm64-v8a', 'x86_64'
}
```

# iOS

- iOS 14 or later

# Web

Fireblocks recommends using the latest versions of the following web browsers:

- Google Chrome (Web, iOS, Android)
- Safari
- Microsoft Edge
- Firefox (Web, Android)
- Opera
- Android Browser
- Opera Mobile
- Samsung Internet
