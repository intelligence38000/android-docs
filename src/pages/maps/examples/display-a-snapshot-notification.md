---
title: Display a snapshot notification
description: Show a snapshotted map image in a notification.
thumbnail: thumbnailDisplayASnapshotNotification
topic: Image generation
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoDisplayASnapshotNotification from '../../../video/example-snapshotnotification.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/SnapshotNotificationActivity.js'"
contentType: example
---

{{
  <VideoWithDeviceFrame
    videoFile={videoDisplayASnapshotNotification}
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
