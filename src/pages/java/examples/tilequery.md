---
title: Make a tilequery request
description: Use the Tilequery API to search for features in a tileset. This example queries for up to 10 buildings which are within 50 meters of the single map click location.
thumbnail: http://i.imgur.com/VkOCYwq.jpg
topic: Getting started
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoTilequeryActivity from '../../../video/example-tilequery-activity.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/TilequeryActivity.js'"
contentType: example
language:
- Java
---

{{
  <VideoWithDeviceFrame
    videoFile={videoTilequeryActivity}
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
