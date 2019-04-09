---
title: RecyclerView integration
description: Manipulate the map based on RecyclerView interactions.
thumbnail: thumbnailRecyclerViewInteraction
topic: User interaction
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoRecyclerViewInteraction from '../../../video/example-recyclerview-interaction.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/RecyclerViewOnMapActivity.js'"
contentType: example
language:
- Java
---

{{
  <VideoWithDeviceFrame
    videoFile={videoRecyclerViewInteraction}
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
