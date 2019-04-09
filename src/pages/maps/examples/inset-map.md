---
title: Inset map
description: Show a smaller inset map fragment and link it to a larger map for two map interaction. Ideal for gaming.
thumbnail: thumbnailInsetMap
topic: User interaction
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoInsetMap from '../../../video/example-inset-map.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/InsetMapActivity.js'"
contentType: example
---

{{
  <VideoWithDeviceFrame
    videoFile={videoInsetMap}
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
