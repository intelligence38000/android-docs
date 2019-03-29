---
title: Click to add photo
description: Select a photo on the device and add it on the map tap location.
thumbnail: https://i.imgur.com/uPIH5Ck.png
topic: Dynamic styling
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoClickToAddImageActivity from '../../../video/example-click-to-add-image-activity.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/ClickToAddImageActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoClickToAddImageActivity}
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