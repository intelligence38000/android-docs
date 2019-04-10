---
title: Zoom-based icon switch
description: Change SymbolLayer icons based on the camera\'s zoom level.
thumbnail: https://i.imgur.com/sbWU4Ui.png
topic: Dynamic styling
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoSymbolSwitchOnZoomActivity from '../../../video/example-symbol-switch-on-zoom-activity.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/SymbolSwitchOnZoomActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoSymbolSwitchOnZoomActivity}
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