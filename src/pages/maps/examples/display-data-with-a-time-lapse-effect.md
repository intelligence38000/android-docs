---
title: Display data with a time lapse effect
description: Use data-driven styling to visualize point data with a time lapse effect; rainfall in China in this example.
thumbnail: thumbnailDisplayDataWithATimeLapseEffect
topic: Data visualization
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoDisplayDataWithATimeLapseEffect from '../../../video/example-datatimelapse.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/AddRainFallStyleActivity.js'"
contentType: example
language:
- Java
---

{{
  <VideoWithDeviceFrame
    videoFile={videoDisplayDataWithATimeLapseEffect}
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
