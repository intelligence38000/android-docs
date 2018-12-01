---
title: SymbolLayer info window
description: Use SymbolLayer and icons to show data in a BubbleLayout "info window".
thumbnail: thumbnailSymbolLayerInfoWindow
topic: Add markers and infoWindows to the map
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoSymbolLayerInfoWindow from '../../../video/example-symbol-layer-info-window.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/InfoWindowSymbolLayerActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoSymbolLayerInfoWindow}
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