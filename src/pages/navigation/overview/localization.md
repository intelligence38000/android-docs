---
title: Localization and internationalization
description: Learn how the Mapbox Navigation SDK determines which language and units of measurement to use for voice and text instructions. Use the default method or customize it for your application.
products:
  - Navigation SDK
prependJs:
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
  - "import Note from '@mapbox/dr-ui/note';"
  - "import BookImage from '@mapbox/dr-ui/book-image';"
contentType: guide
language:
- Java
- Kotlin
---

The Navigation SDK allows you to customize the language for both text and voice instructions. Instructions are announced in the user interface language when turn instructions are available in that language. If instructions are not available in the user interface language, they are announced in English.

By default, the SDK gives distances in the predominant measurement system of the system region, which may not necessarily be the same region in which the user is traveling.

The upcoming road or ramp destination is named according to the local or national language. In some regions, the SDK may give the name multiple languages.

{{<Note title="Localization and the Navigation UI SDK" imageComponent={<BookImage size="60" />}>}}
Because language and units of measurement are specified when the route is generated, this guide does not describe any specific options in the Navigation UI SDK. **The Navigation UI SDK will receive the defaults described above if no language is specified.** If you would like to customize the language or units of measurement used in text and voice instructions, you must use the `NavigationRoute.Builder` class.
{{</Note>}}

## Supported languages

The table below lists the languages that are supported for user interface elements and for spoken instructions.

| Language   | User interface | Spoken instructions | Remarks
|------------|--------------|-----------------------------|--------
| Arabic     | —              | ✅ | Depends on the device; may require third-party text-to-speech
| Bengali    | ✅             | —
| Burmese    | ✅             | ✅ | Depends on the device; may require third-party text-to-speech
| Chinese    | -              | ✅ <br/>Mandarin | Depends on the device; may require third-party text-to-speech
| Czech      | ✅             | -
| Danish     | ✅             | ✅
| English    | ✅             | ✅
| Esperanto  | —              | ✅ | Depends on the device; may require third-party text-to-speech
| Finnish    | —              | ✅ | Depends on the device; may require third-party text-to-speech
| French     | ✅             | ✅
| German     | ✅             | ✅
| Hebrew     | ✅             | ✅ | Depends on the device; may require third-party text-to-speech
| Hungarian  | —              | ✅ | Depends on the device; may require third-party text-to-speech
| Indonesian | —              | ✅ | Depends on the device; may require third-party text-to-speech
| Italian    | ✅             | ✅
| Japanese   | —              | ✅
| Korean     | ✅             | ✅
| Norwegian  | —              | ✅
| Polish     | —              | ✅
| Portuguese | ✅             | ✅
| Romanian   | —              | ✅
| Russian    | ✅             | ✅
| Slovenian  | —              | ✅ | Depends on the device; may require third-party text-to-speech
| Spanish    | ✅             | ✅
| Swedish    | ✅             | ✅
| Turkish    | —              | ✅
| Ukrainian  | ✅              | ✅ | Depends on the device; may require third-party text-to-speech
| Vietnamese | ✅              | ✅ | Depends on the device; may require third-party text-to-speech

{{<Note imageComponent={<BookImage size="60" />}>}}
For languages marked with `Depends on the device; may require third-party text-to-speech`, instructions are provided by the SDK, but it is not guaranteed that the given device will have the appropriate `TextToSpeech` speech engine installed to pronounce these instructions correctly.
{{</Note>}}

### Contributing to localization

To add a new localization or improve an existing localization see the [contributing guide](https://github.com/mapbox/mapbox-navigation-android/blob/master/CONTRIBUTING.md#adding-or-updating-a-localization) for detailed instructions.

## Voice instruction sources

Turn instructions are primarily designed to be announced by either the Mapbox Voice API (powered by [Amazon Polly](https://docs.aws.amazon.com/polly/latest/dg/SupportedLanguage.html)) or [TextToSpeech](https://developer.android.com/reference/android/speech/tts/TextToSpeech). By default, the Navigation SDK uses the Mapbox Voice API, which requires an Internet connection at various points along the route. If the Voice API lacks support for the turn instruction language or there is no Internet connection, TextToSpeech announces the instructions instead.

## Further customization

You can override the default language or units of measurement used in instructions when building your route request.

### Custom language

To have instructions announced in a language other than the user interface language, set the `NavigationRoute.Builder#language` property when calculating the route with which to start navigation.

{{
<CodeLanguageToggle id="override-language" />
<ToggleableCodeBlock

java={`
// Override measurement system in spoken instructions
NavigationRoute.builder(context)
    .accessToken(MAPBOX_ACCESS_TOKEN)
    .origin(origin, bearing, tolerance)
    .destination(destination)
    .language('German')
    .build();
`}

kotlin={`
// Override measurement system in spoken instructions
NavigationRoute.builder(context)
    .accessToken(MAPBOX_ACCESS_TOKEN)
    .origin(origin, bearing, tolerance)
    .destination(destination)
    .language('German')
    .build()
`}

/>
}}

### Custom units of measurement

To override the measurement system used in spoken instructions, set the `MapboxNavigationOptions.Builder#voiceUnits` property when calculating the route with which to start navigation.

{{
<CodeLanguageToggle id="override-measurements" />
<ToggleableCodeBlock

java={`
// Override measurement system in spoken instructions
NavigationRoute.builder(context)
    .accessToken(MAPBOX_ACCESS_TOKEN)
    .origin(origin, bearing, tolerance)
    .destination(destination)
    .voiceUnits(DirectionsCriteria.IMPERIAL)
    .build();
`}

kotlin={`
// Override measurement system in spoken instructions
NavigationRoute.builder(context)
    .accessToken(MAPBOX_ACCESS_TOKEN)
    .origin(origin, bearing, tolerance)
    .destination(destination)
    .voiceUnits(DirectionsCriteria.IMPERIAL)
    .build()
`}

/>
}}
