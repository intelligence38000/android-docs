---
title: Customized location icon
description: Use location component options to customize the user location information.
thumbnail: https://i.imgur.com/4HiEJC1.png
topic: Device location
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoLocationComponentOptionsActivity from '../../../video/example-location-component-options-activity.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/LocationComponentOptionsActivity.js'"
contentType: example
language:
- Java
---

{{
  <VideoWithDeviceFrame
    videoFile={videoLocationComponentOptionsActivity}
    rotation="horizontal"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <ToggleableCodeBlock
    java={rawJavaCode}
  />
}}
