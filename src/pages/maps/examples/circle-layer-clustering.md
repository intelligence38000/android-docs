---
title: CircleLayer clusters
description: Use GeoJSON and circle layers to visualize point data in clusters.
thumbnail: http://i.imgur.com/fGeZhcD.png
topic: Data visualization
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoCircleLayerClusteringActivity from '../../../video/example-createandstyleclusters.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/CircleLayerClusteringActivity.js'"
contentType: example
language:
- Java
---

{{
  <VideoWithDeviceFrame
    videoFile={videoCircleLayerClusteringActivity}
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
