---
title: Switch map styles with a fade
description: Fade map styles in and out based on zoom level.
thumbnail: thumbnailSwitchMapStylesWithAFade
topic: Set a map style
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoSwitchMapStylesWithAFade from '../../../video/example-switchmapstyleswithfade.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/StyleFadeSwitchActivity.js'"
contentType: example
---

{{
  <VideoWithDeviceFrame
    videoFile={videoSwitchMapStylesWithAFade}
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
