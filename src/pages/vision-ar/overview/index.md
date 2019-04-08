---
title: "Introduction"
description: "The official overview documentation for Mapbox Vision AR for Android."
prependJs:
  - "import OverviewHeader from '@mapbox/dr-ui/overview-header';"
  - "import AppropriateImage from '../../../components/appropriate-image';"
  - "import { WarningNote } from '../../../components/warning-note';"
  - "import ChevronousText from '@mapbox/mr-ui/chevronous-text';"
  - "import constants from '../../../constants';"
---

{{
    <OverviewHeader
      features={[
        "Renders an augmented reality, turn-by-turn navigation route",
        "Works with the device’s built-in camera"
      ]}
      title="Vision AR for Android"
      version={constants.VISION_AR_VERSION}
      image={<AppropriateImage imageId="overviewVisionAr" alt="Mobile devices displaying applications using the Mapbox Vision AR for Android." />}
    />
}}

{{
<WarningNote title="Mapbox Vision AR for Android is in limited public beta">
    <p><a href="https://www.mapbox.com/vision/"><ChevronousText text="Request access" /></a></p>
</WarningNote>
}}

Mapbox Vision AR for Android is a high-level framework that sits on top of the [Mapbox Vision SDK for Android](/android/vision/overview/). Vision AR manages the navigation route, translates it to the core library, and renders an AR navigation route on top of the live video stream from the device’s built-in camera.

<!-- ## Uses -->

## Integration with other tools

Vision AR is intended to be used with the Mapbox Navigation SDK. Vision AR sits on top of the [Vision SDK for Android](/android/vision/overview/) and next to the [Mapbox Directions API](https://www.mapbox.com/api-documentation/navigation/#directions) and [Mapbox Core Navigation](/android/navigation/overview/).

### Components of the Vision SDK

There are three components to the Vision SDK: VisionCore, VisionSDK, and VisionAR.

**VisionCore** is the core logic of the system, including all machine learning models; it exists as compiled library for each platform with a user-facing API.

[**VisionSDK**](/android/vision-ar/overview/) is a framework written in native language (Kotlin for Android, Swift for iOS) that encapsulates core utilization and platform-dependent tasks. It calls VisionCore.

**VisionAR** is a native framework with dependency on the Mapbox Navigation SDK. It takes information from the specified navigation route, transfers it to VisionCore via VisionSDK, receives instructions on displaying the route, and then finally renders it on top of camera frame using native instruments.

## Requirements

Vision AR requires Android 6 (API 23) and higher, with QC Snapdragon 650 // 710 // 8xx with Open CL support

Some of devices that will work with VisionSDK:
- Samsung Galaxy S8, S8+ // S9, S9+ // Note 8
- Xiaomi Mi 6 // 8
- HTC U11, U11+ // U12, U12+
- OnePlus 5 // 6

You can also check more details at [Vision SDK FAQ](https://vision.mapbox.com/#faq).

Besides software and hardware requirements, use of Vision AR requires that the device is pointed with a view of the road. Use a dashboard or windshield mount to keep your phone oriented correctly while you drive, such as [Car Phone Mount Windshield](https://www.amazon.com/gp/product/B06ZZWYQF7/) and [Car Mount Holder](https://www.amazon.com/Getron-Windshield-Dashboard-Universal-Smartphones/dp/B00XJE2YHQ/).

## Installation and setup

### SDK installation

**The Vision AR is in limited public beta. Contact our team to [request access](https://www.mapbox.com/vision) and receive installation instructions.**

### Device setup

Besides installing the framework, you will need to set up the device in the vehicle. Some things to consider when choosing and setting up a mount:

- Generally, shorter length mounts will vibrate less. Mounting to your windshield or to the dashboard itself are both options.
- Place the phone near or behind your rearview mirror. Note that your local jurisdiction may have limits on where mounts may be placed.
- Make sure the phone’s camera view is unobstructed (you will be able to tell with any of the video screens open).

## Conditions

### Attribution

While Vision AR is using the camera you must display the Mapbox watermark on screen. Read more about attribution requirements in our [terms of service](https://www.mapbox.com/tos/).

## Available resources

Learn more about the capabilities of Vision AR in the [API reference](/android/api/vision-ar/{{constants.VISION_AR_VERSION}}/index.html) and data types reference. Contact our team to [request access](https://www.mapbox.com/vision/).
