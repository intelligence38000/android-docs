---
title: Snaking directions
description: Rather than showing the directions route all at once, have it "snake" from the origin to destination.
thumbnail: https://i.imgur.com/6jWEFJi.png
topic: User interaction
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoSnakingDirectionsRouteActivity from '../../../video/example-snaking-directions-line.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/SnakingDirectionsRouteActivity.js'"
contentType: example
language:
- Java
---

{{
  <VideoWithDeviceFrame
    videoFile={videoSnakingDirectionsRouteActivity}
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
