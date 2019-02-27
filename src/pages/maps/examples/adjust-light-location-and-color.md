---
title: Adjust light location and color
description: Change the location and color of the light that's shined on extrusions.
thumbnail: thumbnailAdjustLightLocationAndColor
topic: Extrusions
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoAdjustLightLocationColor from '../../../video/example-adjustlightlocationcolor.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/AdjustExtrusionLightActivity.js'"
---

{{
  <VideoWithDeviceFrame
    videoFile={videoAdjustLightLocationColor}
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
