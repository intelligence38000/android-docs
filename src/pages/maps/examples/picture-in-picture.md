---
title: Picture-in-picture
description: Use the Android system's picture-in-picture functionality to maintain a map in a separate window (requires Android O and above).
thumbnail: thumbnailPictureInPicture
topic: Dynamic styling
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoPictureInPicture from '../../../video/example-picture-in-picture.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/PictureInPictureActivity.js'"
contentType: example
---

{{
  <VideoWithDeviceFrame
    videoFile={videoPictureInPicture}
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
