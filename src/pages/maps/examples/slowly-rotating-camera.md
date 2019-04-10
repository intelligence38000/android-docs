---
title: Rotating camera
description: Slowly have the camera circle around a single point.
thumbnail: https://i.imgur.com/uuiOK5D.png
topic: Camera
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoSlowlyRotatingCameraActivity from '../../../video/example-slowly-rotating-camera-activity.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/SlowlyRotatingCameraActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoSlowlyRotatingCameraActivity}
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