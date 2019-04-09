---
title: Global location search
description: Add geocoding search functionality and UI for finding any region, country, place, or address in the world.
thumbnail: thumbnailPlaces
topic: Getting started
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoGlobalLocationSearch from '../../../video/example-locationsearch.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/PlacesPluginActivity.js'"
contentType: guide
language:
- Java
---

{{
  <VideoWithDeviceFrame
    videoFile={videoGlobalLocationSearch}
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
