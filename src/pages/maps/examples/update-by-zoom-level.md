---
title: Update by zoom level
description: Display state or county population depending on zoom level.
thumbnail: thumbnailUpdateByZoomLevel
topic: Data visualization
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoUpdateByZoomLevel from '../../../video/example-updatechoroplethlayerbyzoom.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/ChoroplethZoomChangeActivity.js'"
contentType: example
---

{{
  <VideoWithDeviceFrame
    videoFile={videoUpdateByZoomLevel}
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
