---
title: Select a building
description: Use the query feature to select a building, get its geometry and draw a polygon highlighting it.
thumbnail: thumbnailSelectABuilding
topic: Querying the map
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoSelectABuilding from '../../../video/example-selectabuilding.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/SelectBuildingActivity.js'"
contentType: example
---

{{
  <VideoWithDeviceFrame
    videoFile={videoSelectABuilding}
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
