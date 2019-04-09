---
title: SymbolLayer icons and Mapillary integration
description: Add markers via SymbolLayer and manipulate the data in real time. A Mapillary integration is also showcased in this example.
thumbnail: thumbnailMapillary
topic: Dynamic styling
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoMapillary from '../../../video/example-mapillary.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/SymbolLayerMapillaryActivity.js'"
contentType: example
---

{{
  <VideoWithDeviceFrame
    videoFile={videoMapillary}
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
