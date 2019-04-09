---
title: Fit camera in bounding box
description: Position the camera so that all the given markers are in view.
thumbnail: thumbnailFitCameraInBoundingBox
topic: Camera
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoFitCameraInBoundingBox from '../../../video/example-fitcamerainboundingbox.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/BoundingBoxCameraActivity.js'"
contentType: example
---

{{
  <VideoWithDeviceFrame
    videoFile={videoFitCameraInBoundingBox}
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
