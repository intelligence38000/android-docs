---
title: Generate an optimized route
description: Use the Optimization API to retrieve the fastest route between 2 to 12 locations.
thumbnail: thumbnailOptimization
topic: Getting started
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoGenerateAnOptimizedRoute from '../../../video/example-showoptimizeddirectoinsonmap.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/OptimizationActivity.js'"
contentType: example
language:
- Java
---

{{
  <VideoWithDeviceFrame
    videoFile={videoGenerateAnOptimizedRoute}
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
