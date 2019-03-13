---
title: Use multiple text formats
description: Use an expression to style map labels with multiple formats.
thumbnail: thumbnailMultipleTextFormats
topic: Dynamic styling
prependJs:
  - "import AppropriateImage from '../../../components/appropriate-image'"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block'"
  - "import { rawJavaCode } from '../../../example-code/MultipleTextFormats.js'"
---

{{
  <AppropriateImage
    imageId="exampleMultipleTextFormats"
  />
}}

<!-- Any notes about this example would go here.  -->
Leverage the "[format](https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-types-format)" style expression to create a country label layer that includes multiple text sizes and fonts.


{{
  <ToggleableCodeBlock
    java={rawJavaCode}
  />
}}
