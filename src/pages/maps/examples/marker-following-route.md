---
title: Marker following route
description: Using a map matched GeoJSON route, the marker travels along the route at consistent speed.
thumbnail: http://i.imgur.com/spsZu9X.png
topic: Dynamic styling
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoMarkerFollowingRouteActivity from '../../../video/example-marker-following-route-activity.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/MarkerFollowingRouteActivity.js'"
contentType: example
language:
- Java
---

{{
  <VideoWithDeviceFrame
    videoFile={videoMarkerFollowingRouteActivity}
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
