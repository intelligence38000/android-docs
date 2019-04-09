---
title: Show real-time traffic on a map
description: Toggle the Mapbox Traffic plugin to display real-time traffic data on top of your map.
thumbnail: thumbnailTrafficPlugin
topic: Getting started
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoTrafficPlugin from '../../../video/example-traffic-plugin.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/TrafficPluginActivity.js'"
contentType: guide
language:
- Java
---

{{
  <VideoWithDeviceFrame
    videoFile={videoTrafficPlugin}
    rotation="vertical"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock
    java={rawJavaCode}
  />
}}
