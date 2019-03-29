---
title: Icon update based on API response
description: Update a SymbolLayer icon based on an API call and response.
thumbnail: http://i.imgur.com/PxuB1T8.png
topic: Dynamic styling
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoApiResponseIconUpdateActivity from '../../../video/example-api-response-icon-update.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/SpaceStationLocationActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoApiResponseIconUpdateActivity}
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