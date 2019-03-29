---
title: SymbolLayer image clustering
description: Use GeoJSON and SymbolLayer icons to view clustered images.
thumbnail: thumbnailSymbolLayerClustering
topic: Data visualization
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoSymbolLayerClustering from '../../../video/example-symbol-layer-clustering.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/ImageClusteringActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoSymbolLayerClustering}
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
