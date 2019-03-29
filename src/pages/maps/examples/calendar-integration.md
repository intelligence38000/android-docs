---
title: Calendar integration
description: Show calendar event locations on the map.
thumbnail: https://i.imgur.com/M8TU7nH.png
topic: Add features to a map
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoCalendarIntegrationActivity from '../../../video/example-calendar-integration-activity.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/CalendarIntegrationActivity.js'"
---

{{
  <VideoWithDeviceFrame 
    videoFile={videoCalendarIntegrationActivity}
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