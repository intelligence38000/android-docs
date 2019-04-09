---
title: Indoor mapping floor plan
description: Display an indoor map of a building with toggles to switch between floor levels.
thumbnail: thumbnailIndoorFloorPlan
topic: Dynamic styling
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoIndoorFloorPlan from '../../../video/example-indoor-floor-plan.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/IndoorMapActivity.js'"
contentType: example
---

{{
  <VideoWithDeviceFrame
    videoFile={videoIndoorFloorPlan}
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
