---
title: Show directions on a map
description: Request directions between two points.
thumbnail: thumbnailDirections
topic: Getting started
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoShowDirectionsOnAMap from '../../../video/example-showdirectionsonamap.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/DirectionsActivity.js'"
contentType: example
language:
- Java
---

{{
  <VideoWithDeviceFrame
    videoFile={videoShowDirectionsOnAMap}
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
