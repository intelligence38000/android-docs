---
title: "Introduction"
description: "Overview of Mapbox Android plugins"
prependJs:
  - "import OverviewHeader from '@mapbox/dr-ui/overview-header';"
  - "import AppropriateImage from '../../../components/appropriate-image';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';" 
  - |
    import {
      ANNOTATION_PLUGIN_VERSION,
      TRAFFIC_PLUGIN_VERSION,
      LOCATION_LAYER_PLUGIN_VERSION,
      BUILDING_PLUGIN_VERSION,
      PLACES_PLUGIN_VERSION,
      LOCALIZATION_PLUGIN_VERSION,
      OFFLINE_PLUGIN_VERSION
    } from '../../../constants';
---

{{
  <div className="mb24">
    <OverviewHeader 
      features={[
        "Show annotations on the map",
        "Add in-app place searching",
        "Load GeoJSON files onto the map",
        "Show user location",
        "Display traffic and 3D buildings",
        "Change the map's language",
        "Offline mapping",
        "Support Chinese users"
      ]}
      title="Android Plugins"
      ghLink="https://github.com/mapbox/mapbox-plugins-android"
      image={<AppropriateImage imageId="overviewPlugins" alt="Mobile devices displaying applications using the Mapbox Java SDK for Android." />}
    />
  </div>
}}

Mapbox Plugins build on top of the [Maps SDK](/android-docs/map-sdk/overview/getting-started/) providing extra features in lightweight dependencies. Whether you're looking to include traffic on top of your map or show the user location as a layer, plugins offer customizable APIs with a few lines of code to get started. Separating features into different plugins also allows for a more aggressive updating timeline.

## What are Mapbox Plugins?

Mapbox Plugins for Android are a collection of libraries that extend our Maps, Navigation, and Java SDKs for Android to help you integrate powerful mapping features into your applications. Use plugins to show a user's location, display traffic or building overlays, or search for places. With these plugins, you can pick the features that your app needs without losing the ability to customize; all bundled into lightweight dependencies.

By using a plugin, you also include the Maps SDK for Android which means that you'll need to setup your project to use the Maps SDK if you haven't already. Head over to the [Maps SDK Getting Started](/android-docs/map-sdk/overview) documentation to learn more. The example below shows how to install the Traffic Plugin, but the process is identical for other plugins.

### How plugins work

The plugins we offer are extensive and cover many of our SDKs for Android. They can be used together or separately depending on your needs. A brief summary of each plugin and its purpose is provided below:

- **Building**: Add 3D buildings to your map style with as few as two lines of code. Take this further by allowing users to toggle the layer visibility.
- **Location Layer**: A popular, often critical feature is showing the user's current location as an annotation to give a reference point on the map.
- **Traffic**: Place realtime traffic data within your map style as a layer.
- **Places**: Add UI components such as a Place Picker or Autocomplete search built on top of the [Mapbox Geocoding API](https://www.mapbox.com/api-documentation/#geocoding). Each component includes an intentBuilder which starts an activity for results and returns a Carmen Feature.
- **Offline**: Download map tiles and easily view already-downloaded regions for offline mapping.
- **Marker cluster**: Add map marker clusters to show large sets of data with a clean UI experience.
- **Localization**: Change the map's language based on the device's default language settings or other runtime variables.
- **China**: Provide accurate map tiles and data for Chinese users.


## Prerequisites

Before using any of the Mapbox Plugins for Android, you will need:

- The latest version of [Android Studio](https://developer.android.com/studio/index.html).
- JDK version 7.0 or higher.
- A recent version of the Android SDK.
- Android API Level 15 or higher (Android 4.0.3 and above).
- A Mapbox [access token](https://www.mapbox.com/help/how-access-tokens-work/).

## Available documentation

- **Guides**. Each plugin has an associated guide which contains both technical descriptions about the plugin and its features, as well as, conceptual explanations of the different components and how they work together.
- [**Examples**]({{prefixUrl('plugins/examples')}}) See the code in action inside of [our demo app](https://play.google.com/store/apps/details?id=com.mapbox.mapboxandroiddemo) and use the source code as a good starting point for your project.

<!-- - Tutorials — The tutorials section contains several step-by-step guides for creating apps using Mapbox SDKs for Android alongside plugins. -->

## Support and contributions
- If you are looking for support using this SDK, either reach out through [Stack Overflow](https://stackoverflow.com/questions/tagged/mapbox+android) or through our [contact page](https://www.mapbox.com/contact/).
- If you find a bug and can provide steps to reliably reproduce it, open an issue in the [/mapbox-plugins-android repository](https://github.com/mapbox/mapbox-plugins-android) on GitHub and apply the bug label.
- If you have a feature request, open an issue in the [/mapbox-plugins-android repository](https://github.com/mapbox/mapbox-plugins-android) on GitHub, and apply the enhancement label.
- If you want to contribute, look over [our contribution guidelines](https://github.com/mapbox/mapbox-plugins-android/blob/master/CONTRIBUTING.md) and open a pull request with your changes.
