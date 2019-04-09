---
title: "Building"
description: "Read official documentation on the Mapbox Android Building Plugin and how its several lines of code can help you add 3D buildings to your Android app's map."
prependJs:
  - "import constants from '../../../constants';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
contentType: guide
language:
- Java
- Kotlin
---

Support for extrusions was added with `5.1.0` of the Map SDK, unlocking the possibility to display **3D buildings** on your favorite map style. The building plugin extends this functionality and makes it even easier to add buildings to a map style.

## Install the Building Plugin
To start developing an application using the Building Plugin, you'll need to add the appropriate dependencies inside your `build.gradle` file. This dependency includes the Maps SDK for Android. You can find all dependencies given below on MavenCentral.

If your application is close or exceeds the 65k method count limit, you can mitigate this problem by enabling ProGuard inside your application. ProGuard directives are included in the Android dependencies to preserve the required classes.

### Add the dependency
Support for extrusions was added with `5.1.0` of the Maps SDK, unlocking the possibility to display 3D buildings on your favorite map style. The building plugin extends this functionality and makes it even easier to add buildings to a map style. To install, head over to the [Mapbox Plugin Overview](/android/plugins/overview/) page which will walk you through adding the dependency.

1. Start Android Studio.
2. Open up your application's `build.gradle` file.
3. Make sure that your project's `minSdkVersion` is API 14 or higher.
4. Under dependencies, add a new build rule for the latest `mapbox-android-plugin-building`.

```groovy
repositories {
  mavenCentral()
}

dependencies {
  implementation 'com.mapbox.mapboxsdk:mapbox-android-plugin-building-v7:{{constants.BUILDING_PLUGIN_VERSION }}'
}
```
5. Click the Sync Project with Gradle Files near the toolbar in Studio.

## Add the Building Plugin
The Building Plugin requires no additional permissions and initialized by passing in both the map view and `mapboxMap` objects that you'd like the building layer to show on. Besides the required parameters, you also have the option to provide a layer ID which you'd like the buildings to appear below. Once initialized, setting `setVisibility()` to true will result in the building layer getting added on top of your map style.

{{
<CodeLanguageToggle id="building-plugin" />
<ToggleableCodeBlock

java={`
BuildingPlugin buildingPlugin = new BuildingPlugin(mapView, mapboxMap);
buildingPlugin.setVisibility(true);
`}

kotlin={`
val buildingPlugin = BuildingPlugin(mapView!!, mapboxMap)
buildingPlugin.setVisibility(true)
`}

/>
}}

## Customization
While the building plugin provides default values which look good for most use cases, you might find yourself wanting to customize the look of the buildings to match a map style. Several APIs are available for changing building color, opacity, what zoom level buildings should start appearing, etc. The table below provides information on the current APIs useful for customization.

| API | Description |
| --- | --- |
| `setMinZoomLevel` | This is the minimum zoom level where buildings will start to show. useful to limit showing buildings at higher zoom levels. |
| `setColor` | Change the building color to any Android color int value. |
| `setOpacity` | Float value between 0.0 and 1.0 representing the opacity of the buildings. 1.0 being solid and 0.0 being invisible. |

<!-- #### Light -->
