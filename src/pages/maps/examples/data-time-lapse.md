---
title: Data time lapse
description: Use data-driven styling to visualize point data with a time lapse effect; rainfall in China in this example.
thumbnail: thumbnailDataTimeLapse
topic: Data visualization
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoDataTimeLapse from '../../../video/example-data-time-lapse.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/AddRainFallStyleActivity.js'"
contentType: example
language:
- Java
---

{{
  <VideoWithDeviceFrame
    videoFile={videoDataTimeLapse}
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
