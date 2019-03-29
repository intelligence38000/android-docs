---
title: Dashed directions route line
description: Retrieve and show a dashed directions route line based on map movement.
thumbnail: thumbnailDashedDrivingRoute
topic: Getting started
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoDashedDirectionsLine from '../../../video/example-dashed-directions-line.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/DashedDirectionsLineActivity'"
---

{{
  <VideoWithDeviceFrame
    videoFile={videoDashedDirectionsLine}
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