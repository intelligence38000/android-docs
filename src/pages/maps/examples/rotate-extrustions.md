---
title: Rotate extrusions
description: Rotate a map with 3D buildings.
thumbnail: thumbnailRotateExtrusions
topic: Extrusions
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoRotateAndTilt3DBuildings from '../../../video/example-rotateandtilt3dbuildings.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/RotationExtrusionActivity.js'"
contentType: example
language:
- Java
---

{{
  <VideoWithDeviceFrame
    videoFile={videoRotateAndTilt3DBuildings}
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
