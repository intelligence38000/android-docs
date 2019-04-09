---
title: Animate the map camera
description: Animate the map's camera position, tilt, bearing, and zoom.
thumbnail: thumbnailAnimateTheMapCamera
topic: Camera
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoAnimateTheMapCamera from '../../../video/example-animatethemapcamera.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/AnimateMapCameraActivity.js'"
contentType: example
language:
- Java
---

{{
  <VideoWithDeviceFrame
    videoFile={videoAnimateTheMapCamera}
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
