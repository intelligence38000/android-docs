---
title: Marker symbol layer
description: Display markers on the map by adding a SymbolLayer. Query the map and animate the icon size if the symbol is clicked on.
thumbnail: thumbnailMarkerSymbolLayer
topic: Querying the map
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoSymbolLayerMarkerIcon from '../../../video/example-marker-symbol-layer.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/BasicSymbolLayerActivity.js'"
contentType: example
---

{{
  <VideoWithDeviceFrame
    videoFile={videoSymbolLayerMarkerIcon}
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
