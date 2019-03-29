---
title: Directions to selected location
description: Show a dotted directions route to a location that\'s based on map movement.
thumbnail: https://i.imgur.com/0dpCI14.png
topic: User interaction
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoDashedLineDirectionsPickerActivity from '../../../video/example-dashed-line-directions-picker-activity.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/DashedLineDirectionsPickerActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoDashedLineDirectionsPickerActivity}
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