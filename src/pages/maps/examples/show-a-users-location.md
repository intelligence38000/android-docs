---
title: Show a user's location
description: Use the LocationComponent to indicate the user's current location on the map.
thumbnail: thumbnailLocationComponent
topic: Getting started
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoShowAUsersLocation from '../../../video/example-showauserslocation.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/LocationComponentActivity.js'"
---

{{
  <VideoWithDeviceFrame
    videoFile={videoShowAUsersLocation}
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
