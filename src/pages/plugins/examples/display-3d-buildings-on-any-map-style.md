---
title: Display 3D buildings on any map style
description: Toggle building layer on and off and can be used with any style.
thumbnail: thumbnailBuilding
topic: Getting started
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoBuildingPlugin from '../../../video/example-building-plugin.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/BuildingPluginActivity.js'"

contentType: example
---

{{
  <VideoWithDeviceFrame
    videoFile={videoBuildingPlugin}
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
