---
title: Simplify a polyline
description: Simplify a polyline which, depending on the set tolerance, reduces the amount of coordinates needed to create the polyline.
thumbnail: thumbnailSimplifyLine
topic: Getting started
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoSimplifyPolyline from '../../../video/example-simplify-polyline-javaservice.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/SimplifyPolylineActivity.js'"
contentType: example
---

{{
  <VideoWithDeviceFrame
    videoFile={videoSimplifyPolyline}
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
