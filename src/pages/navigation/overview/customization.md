---
title: "Customization options"
description: Some description
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

## Navigation UI

## Navigation core

<!-- ## Customize route requests



## Customize the navigation experience

### Change default behaviors

You will find most of the navigation APIs inside the `MapboxNavigation` class such as starting and ending the navigation session or attaching listeners. Assign and initialize a new instance of `MapboxNavigation` inside your navigation activity. When initializing, you'll need to pass in a `Context` and your Mapbox access token. Read the access token section in this getting started document to learn how to get a free access token.

{{
<CodeLanguageToggle id="nav-object" />
<ToggleableCodeBlock

java={`
MapboxNavigation navigation = new MapboxNavigation(context, MAPBOX_ACCESS_TOKEN);
`}

kotlin={`
val navigation = MapboxNavigation(context, MAPBOX_ACCESS_TOKEN)
`}

/>
}}

You can also optionally pass in a `MapboxNavigationOptions` object if you’d like to change the default behavior of the navigation SDK. Note that many of the options offered must be set before the `MapboxNavigation` object is initialized.

 -->