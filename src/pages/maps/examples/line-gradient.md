---
title: Line gradient
description: Style a line with colored gradient.
thumbnail: https://i.imgur.com/cXthmpV.png
topic: Data visualization
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoLineGradientActivity from '../../../video/example-line-gradient-activity.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/LineGradientActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoLineGradientActivity}
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