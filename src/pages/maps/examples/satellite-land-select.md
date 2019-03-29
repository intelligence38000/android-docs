---
title: Satellite land select
description: View satellite photos and click to outline an area of land.
thumbnail: https://i.imgur.com/tfbO1m4.png
topic: Data visualization
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoSatelliteLandSelectActivity from '../../../video/example-satellite-land-select-activity.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/SatelliteLandSelectActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoSatelliteLandSelectActivity}
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