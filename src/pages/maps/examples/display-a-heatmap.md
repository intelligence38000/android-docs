---
title: Display a heatmap
description: Add and customize a heatmap to visualize data.
thumbnail: thumbnailDisplayAHeatmap
topic: Data visualization
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoDisplayAHeatmap from '../../../video/example-showheatmapdata.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/HeatmapActivity.js'"
contentType: example
---

{{
  <VideoWithDeviceFrame
    videoFile={videoDisplayAHeatmap}
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
