---
title: Place Picker
description: Use the place picker function of the Places Plugin to choose a specific location in the world.
thumbnail: thumbnailPlacePicker
topic: Getting started
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoPlacePicker from '../../../video/example-place-picker.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/PlaceSelectionPluginActivity.js'"
contentType: guide
language:
- Java
---

{{
  <VideoWithDeviceFrame
    videoFile={videoPlacePicker}
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
