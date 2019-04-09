---
title: Add an image source with time lapse
description: Use an image source and a runnable to show data changes over time.
thumbnail: thumbnailAddAnImageSourceWithTimeLapse
topic: Dynamic styling
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoAddAnImageSourceWithTimeLapse from '../../../video/example-showtimelapse.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/ImageSourceTimeLapseActivity.js'"
contentType: example
---

{{
  <VideoWithDeviceFrame
    videoFile={videoAddAnImageSourceWithTimeLapse}
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
