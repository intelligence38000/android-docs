---
title: Pulsing layer opacity
description: Use the style API to adjust layers' opacity to highlight data. Los Angeles' parks, hotels, and attractions are displayed in this example.
thumbnail: thumbnailPulsingOpacity
topic: Dynamic styling
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoPulsingOpacity from '../../../video/example-pulsing-opacity.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/PulsingLayerOpacityColorActivity.js'"
contentType: example
language:
- Java
---

{{
  <VideoWithDeviceFrame
    videoFile={videoPulsingOpacity}
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
