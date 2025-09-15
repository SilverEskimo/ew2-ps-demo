---
title: "Setup"
slug: "setup-4"
excerpt: ""
hidden: false
createdAt: "Tue Sep 05 2023 05:29:11 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Jul 16 2025 08:14:29 GMT+0000 (Coordinated Universal Time)"
---
# Web SDK Installation

Install the Fireblocks "EW SDK" and "EW Core SDK" using `npm`:

```Text shell
npm i @fireblocks/ncw-js-sdk
npm i @fireblocks/embedded-wallet-sdk
```

Or `yarn`:

```Text shell
yarn add @fireblocks/ncw-js-sdk
yarn add @fireblocks/embedded-wallet-sdk
```

You can find the web demo code [here](https://github.com/fireblocks/ncw-web-demo-v2).

# Android SDK Installation

First, add our maven repository configuration to your `settings.gradle` file:

```java Android
repositories {
       maven {
            url "https://maven.fireblocks.io/android-sdk/maven"
            name = "android-sdk"
            credentials(HttpHeaderCredentials) {
                name = "Deploy-Token"
                value = "-fU8ijmuPohHaqDBgpaT"
            }
            authentication {
                header(HttpHeaderAuthentication)
            }
        }
    }
```

Then, add the Fireblocks SDKs dependency to your application's `build.gradle` file using the most updated bom version:

```java Android
implementation "com.fireblocks.sdk:bom:1.0.2"
implementation "com.fireblocks.sdk:ew"  
implementation "com.fireblocks.sdk:ncw"
```

- You can find the Android Demo code [here](https://github.com/fireblocks/android-ncw-demo).
- You can find the Android SDKs documentation [here](https://fireblocks.github.io/ncw-docs/android/).

# iOS SDK Installation

First, in your iOS Project, add the [Fireblocks Embedded Wallet SDK](https://github.com/fireblocks/ew-ios-sdk) package:

![](https://files.readme.io/347279f6728fb0f8a3c21669a7301c702edacd48275bd8beae9f1833b92e3cfe-image.png)

Now add the the [Fireblocks NCW iOS SDK](https://github.com/fireblocks/ncw-ios-sdk) package:

Then, after the SDK packages are added to the project, you should see them under the **Package Dependencies** section in the Project Navigator:

![](https://files.readme.io/371fe0dd42616d1fddd970bff386cd1bacbc444b5304736cd349e7d4aac36083-image.png)

<br />

Lastly, import the SDK libraries:

```swift iOS
import EmbeddedWalletSDK 
import FireblocksSDK
```

- You can find the iOS demo code [here](https://github.com/fireblocks/ncw-ios-demo).
- You can find the iOS SDKs Docs [here](https://fireblocks.github.io/ncw-docs/ios/).
