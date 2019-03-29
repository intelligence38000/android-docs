---
title: Show a user's location
description: Use the LocationComponent to show the user's current location on the map.
thumbnail: thumbnailLocationComponent
topic: Device location
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoShowAUsersLocation from '../../../video/example-showauserslocation.mp4'"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode, rawKotlinCode } from '../../../example-code/LocationComponentActivity.js'"
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
  <CodeLanguageToggle id="location-component-example" />
  <ToggleableCodeBlock
    java={rawJavaCode}
    kotlin={rawKotlinCode}
  />
}}
