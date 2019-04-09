---
title: MarkerView
description: Create a marker with an Android-system View.
thumbnail: https://i.imgur.com/DyDVUJr.png
topic: Getting started
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoMarkerViewPluginActivity from '../../../video/example-marker-view-plugin-activity.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/MarkerViewPluginActivity.js'"
contentType: example
---

{{
  <VideoWithDeviceFrame
    videoFile={videoMarkerViewPluginActivity}
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
