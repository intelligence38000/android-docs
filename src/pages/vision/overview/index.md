---
title: "Introduction"
description: "The official overview documentation for the Mapbox Vision SDK for Android."
prependJs:
  - "import OverviewHeader from '@mapbox/dr-ui/overview-header';"
  - "import AppropriateImage from '../../../components/appropriate-image';"
  - "import { WarningNote } from '../../../components/warning-note';"
  - "import ChevronousText from '@mapbox/mr-ui/chevronous-text';"
  - "import { VISION_VERSION } from '../../../constants';"
---

{{
    <OverviewHeader
      features={[
        "Real-time classification of road signs",
        "Semantic segmentation of the roadway",
        "Object detection",
        "Following distance detection"
      ]}
      title="Vision SDK for Android"
      version={VISION_VERSION}
      image={<AppropriateImage imageId="overviewVisionSdk" alt="Mobile devices displaying applications using the Mapbox Vision SDK for Android." />}
    />
}}

{{
<WarningNote title="The Mapbox Vision SDK for Android is currently in limited public beta">
    <p><a href="https://www.mapbox.com/vision/"><ChevronousText text="Request access" /></a></p>
</WarningNote>
}}

The Vision SDK uses highly efficient neural networks to process imagery directly on user’s mobile or embedded devices, turning any connected camera into a second set of eyes for your car. In doing so, the Vision SDK enables the following user-facing features:

- Augmented reality navigation with turn-by-turn directions
- Classification and display of regulatory and warning signs
- Object detection for vehicles, pedestrians, road signs, and traffic lights
- Semantic segmentation of the roadway into 14 different classes (other, road, road_markup, flat_non_road, sky, building, car, cycle, person, road_markings_other, curb, double_yellow, traffic_sign, traffic_light)
- Distance detection that indicates spacing to lead vehicle


## Uses

Developers of native navigation applications can integrate the Vision SDK into their applications to enhance navigation experiences in real time and collect data that will improve the map data made available by Mapbox.

The Vision SDK, unlike similar products, provides functionality, safety alerts, or a heads-up display on customer’s existing devices without requiring video uploads or storage on device. Most importantly, the functionality of the Vision SDK is tied into the rest of Mapbox’s ecosystem: maps, navigation, customizable data layers, and more.

## Integration with other tools

The Vision SDK for Android is a framework written in Java that allows developers to interact with Mapbox Vision Core using a convenient user-facing API that handles platform-dependent tasks. The Vision SDK for Android can be used independently or with Vision AR for Android to create AR navigation experiences.

### Components of the Vision SDK

There are three components to the Vision SDK: VisionCore, VisionSDK, and VisionAR.

**VisionCore** is the core logic of the system, including all machine learning models; it exists as compiled library for each platform with a user-facing API.

**VisionSDK** is a framework written in native language (Kotlin for Android, Swift for iOS) that encapsulates core utilization and platform-dependent tasks. It calls VisionCore.

[**VisionAR**](/android/vision-ar/overview/) is a native framework with dependency on the Mapbox Navigation SDK. It takes information from the specified navigation route, transfers it to VisionCore via VisionSDK, receives instructions on displaying the route, and then finally renders it on top of camera frame using native instruments.

## Requirements

VisionSDK requires Android 6 (API 23) and higher, with QC Snapdragon 650 // 710 // 8xx with Open CL support

Some of devices that will work with VisionSDK:
- Samsung Galaxy S8, S8+ // S9, S9+ // Note 8
- Xiaomi Mi 6 // 8
- HTC U11, U11+ // U12, U12+
- OnePlus 5 // 6

You can also check more details at [Vison SDK FAQ](https://vision.mapbox.com/faq).

In addition to software and hardware requirements, use of the Vision SDK requires that the device is pointed with a view of the road. We strongly recommend using a dashboard or windshield mount to keep your phone oriented correctly while you drive. We have tested a few options and have seen positive results with two mounts ([option 1](https://www.amazon.com/gp/product/B06ZZWYQF7/) and [option 2](https://www.amazon.com/Getron-Windshield-Dashboard-Universal-Smartphones/dp/B00XJE2YHQ/)).

## Installation and setup

### SDK installation

**The Vision SDK is currently in limited public beta. Contact our team to [request access](https://www.mapbox.com/vision) and receive installation instructions.**

### Device setup

In addition to installing the framework, you will need to set up the device in the vehicle. Some things to consider when choosing and setting up a mount:

- Generally, shorter length mounts will vibrate less. Mounting to your windshield or to the dashboard itself are both options.
- The Vision SDK will do best with detections when the phone is near or behind where your rearview mirror is. However, note that your local jurisdiction may have limits on where mounts may be placed.
- Make sure the phone’s camera view is unobstructed (you will be able to tell with any of the video screens open).

## Conditions

### Attribution

While the Vision SDK is using the camera you must display the Mapbox watermark on screen. Read more about attribution requirements in our [terms of service](https://www.mapbox.com/tos/).

## Available resources

Learn more about the capabilities of the Vision SDK in the [API reference](/android/api/vision/{{VISION_VERSION}}/index.html) and data types reference. Contact our team to [request access to the SDK](https://www.mapbox.com/vision/).
