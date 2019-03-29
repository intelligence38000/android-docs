---
title: Show building outline
description: Query the building layer and show a building's outline.
thumbnail: thumbnailBuildingOutline
topic: Querying the map
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoBuildingOutline from '../../../video/example-building-outline.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/BuildingOutlineActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoBuildingOutline}
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
