---
title: Create a simple map view
description: Learn how to quickly display a Mapbox Street map in your app.
topic: Getting started
thumbnail: thumbnailCreateASimpleMapView
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoSimpleMapViewVideo from '../../../video/example-simple-mapview.mp4'"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode, rawKotlinCode } from '../../../example-code/SimpleMapViewActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoSimpleMapViewVideo}
    rotation="horizontal"
    device="pixel-2"
  />
}}

<!-- Any notes about this example would go here.  -->

{{
  <CodeLanguageToggle id="simple-map-view-example" />
  <ToggleableCodeBlock 
    java={rawJavaCode}
    kotlin={rawKotlinCode}
  />
}}
