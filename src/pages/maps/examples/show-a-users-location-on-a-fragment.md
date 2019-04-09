---
title: Add user's location to a map fragment
description: Use the LocationComponent to show a user's location in a map fragment.
thumbnail: thumbnailLocationComponentFragment
topic: Device location
prependJs:
 - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
 - "import videoShowAUsersLocationInFragment from '../../../video/show-user-location-in-fragment.mp4'"
 - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
 - "import { rawJavaCode } from '../../../example-code/LocationComponentFragmentActivity.js'"
contentType: example
---

{{
  <VideoWithDeviceFrame
    videoFile={videoShowAUsersLocationInFragment}
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
