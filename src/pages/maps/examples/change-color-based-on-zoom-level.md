---
title: Change color based on zoom level
description: Make a property depend on the map zoom level, in this case, the water layers fill color.
thumbnail: thumbnailChangeColorBasedOnZoomLevel
topic: Dynamic styling
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoColorDependentOnZoomLevel from '../../../video/example-colordependentonzoomlevel.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/ZoomDependentFillColorActivity.js'"
contentType: example
language:
- Java
---

{{
  <VideoWithDeviceFrame
    videoFile={videoColorDependentOnZoomLevel}
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
