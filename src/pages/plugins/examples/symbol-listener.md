---
title: 
description: 
thumbnail: 
topic: Getting started
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoSymbolListenerActivity from '../../../video/example-symbol-listener-activity.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/SymbolListenerActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoSymbolListenerActivity}
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