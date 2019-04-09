---
title: Support map fragment
description: Include a map fragment within your app using Android support library.
thumbnail: thumbnailSupportMapFragment
topic: Getting started
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoSupportMapFragment from '../../../video/example-support-map-fragment.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/SupportMapFragmentActivity.js'"
contentType: example
---

{{
  <VideoWithDeviceFrame
    videoFile={videoSupportMapFragment}
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
