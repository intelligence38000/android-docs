---
title: Count features in a selected area
description: Get the feature count inside a bounding box and highlight all the  buidings.
thumbnail: thumbnailCountFeaturesInASelectedArea
topic: User interaction
prependJs:
  - "import { VideoWithDeviceFrame } from '../../../components/video-with-device-frame'"
  - "import videoCountFeaturesInASelectedArea from '../../../video/example-featurecount.mp4'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/FeatureCountActivity.js'"
contentType: example
language:
- Java
---

{{
  <VideoWithDeviceFrame
    videoFile={videoCountFeaturesInASelectedArea}
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
