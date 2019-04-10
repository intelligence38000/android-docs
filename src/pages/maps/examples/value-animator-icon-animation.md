---
title: Animated icon movement
description: Use Android system interpolators to animate SymbolLayer icons movement.
thumbnail: https://i.imgur.com/JfLf69C.png
topic: Dynamic styling
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoValueAnimatorIconAnimationActivity from '../../../video/example-value-animator-icon-animation-activity.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/ValueAnimatorIconAnimationActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoValueAnimatorIconAnimationActivity}
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