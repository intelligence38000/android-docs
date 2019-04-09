---
title: Highlight selected line
description: Tap on a line and add a highlight effect behind it.
thumbnail: thumbnailHighlightedLine
topic: User interaction
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoHighlightedLine from '../../../video/example-highlighted-line.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/HighlightedLineActivity.js'"
contentType: example
---

{{
  <VideoWithDeviceFrame
    videoFile={videoHighlightedLine}
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
