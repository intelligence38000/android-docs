---
title: Background fog
description: Add a gradient on top of a MapView to show a background fog effect.
thumbnail: https://i.imgur.com/NcSGgD8.png
topic: User interaction
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoMapFogBackgroundActivity from '../../../video/example-map-fog-background-activity.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/MapFogBackgroundActivity.js'"
contentType: example
language:
- Java
---

{{
  <VideoWithDeviceFrame
    videoFile={videoMapFogBackgroundActivity}
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
