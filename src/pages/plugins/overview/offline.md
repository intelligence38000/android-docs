---
title: "Offline"
description: "Mapbox Android Offline Plugin."
prependJs:
  - "import constants from '../../../constants';"
  - "import CodeLanguageToggle from '../../../components/code-language-toggle';"
  - "import ToggleableCodeBlock from '../../../components/toggleable-code-block';"
---

A user's device won't always have a strong enough internet connection to download and view map tiles. You might want to build an offline mode into your Android project to account for this situation. The Mapbox Offline Plugin for Android is a convenient way to send information to [the Maps SDK's `OfflineManager` class](https://github.com/mapbox/mapbox-gl-native/blob/master/platform/android/MapboxGLAndroidSDK/src/main/java/com/mapbox/mapboxsdk/offline/OfflineManager.java) and use the manager in a background service to download map tiles for offline use. Once the offline download region is defined and initialized, the plugin handles everything else for you. Because the plugin uses a service, the downloading continues even if your application is running in the background.

View [our offline documentation for more information about how the Mapbox Maps SDK for Android handles offline mapping](https://docs.mapbox.com/android/maps/overview/offline/).


## Install the Offline Plugin

To start developing an application using the Offline Plugin, you'll need to add the appropriate dependencies inside of your `build.gradle` file. This dependency includes the Maps SDK for Android. All dependencies given below can be found on MavenCentral.

If your application is close or exceeds the 65k method count limit, you can mitigate this problem by enabling ProGuard inside of your application. ProGuard directives are included in the Android dependencies to preserve the required classes.

### Add the dependency
To install the offline plugin, head over to the [Mapbox Plugin Overview](/android/plugins/overview/) page which will walk you through adding the dependency.

1. Start Android Studio.
2. Open up your application's `build.gradle` file.
3. Make sure that your project's `minSdkVersion` is API 14 or higher.
4. Under dependencies, add a new build rule for the latest `mapbox-android-plugin-offline`.

```groovy
repositories {
  mavenCentral()
}

dependencies {
  implementation 'com.mapbox.mapboxsdk:mapbox-android-plugin-offline-v7:{{constants.OFFLINE_PLUGIN_VERSION }}'
}
```
5. Click the Sync Project with Gradle Files near the toolbar in Studio.

## Add the Offline Plugin
The Offline Plugin requires no permissions and is initialized by eventually passing in a _built_ ` OfflineDownloadOptions` object. But before you do that, you'll want to define the map region that you want to download.

{{
<CodeLanguageToggle id="add-offline-plugin" />
<ToggleableCodeBlock

java={`
// Define region of map tiles
OfflineTilePyramidRegionDefinition definition = new OfflineTilePyramidRegionDefinition(
  styleUrl,
  new LatLngBounds.Builder()
    .include(new LatLng(latitudeNorth, longitudeEast))
    .include(new LatLng(latitudeSouth, longitudeWest))
    .build(),
  minZoom,
  maxZoom,
  getResources().getDisplayMetrics().density
);
`}

kotlin={`
 // Define region of map tiles
val definition = OfflineTilePyramidRegionDefinition(
	styleUrl, LatLngBounds.Builder()
	    .include(LatLng(latitudeNorth, longitudeEast))
	    .include(LatLng(latitudeSouth, longitudeWest))
	    .build(),
	minZoom,
	maxZoom,
	resources.displayMetrics.density
)
`}

/>
}}
Build a `NotificationOptions` object if you want to show some sort of notification at the top of the device's screen during the download.

{{
<CodeLanguageToggle id="notifications-options" />
<ToggleableCodeBlock

java={`
// Customize the download notification's appearance
NotificationOptions notificationOptions = NotificationOptions.builder(this)
  .smallIconRes(R.drawable.mapbox_logo_icon)
  .returnActivity(MainActivity.class.getName())
  .build();
`}

kotlin={`
// Customize the download notification's appearance
val notificationOptions = NotificationOptions.builder(this)
	.smallIconRes(R.drawable.mapbox_logo_icon)
	.returnActivity(MainActivity::class.java!!.getName())
	.build()
`}
/>
}}

Finally, start the actual download of the map tiles. The `NotificationsOptions` object _is_ required to start the download.

{{
<CodeLanguageToggle id="start-download" />
<ToggleableCodeBlock

java={`
// Start downloading the map tiles for offline use
OfflinePlugin.getInstance(this).startDownload(
	OfflineDownloadOptions.builder()
	.definition(definition)
	.metadata(OfflineUtils.convertRegionName(regionName))
	.notificationOptions(notificationOptions)
	.build()
);
`}

kotlin={`
// Start downloading the map tiles for offline use
OfflinePlugin.getInstance(this).startDownload(
	OfflineDownloadOptions.builder()
		.definition(definition)
		.metadata(OfflineUtils.convertRegionName(regionName))
		.notificationOptions(notificationOptions)
		.build()
)
`}
/>
}}

## Offline tile estimator

An app can download multiple regions for offline use, but the total offline download is capped at a maximum tile count “ceiling” across all downloaded regions. The tile ceiling is set to 6,000 tiles by default but can be raised [for paid plans](https://www.mapbox.com/pricing/). Use our [Tile Count Estimator](https://www.mapbox.com/labs/offline-estimator/) to calculate the number of tiles required for your offline use case. Six thousand tiles cover a region roughly the size of Greater London within the M25 at zoom levels 0–15 or the contiguous United States at zoom levels 0–9. The size of these tiles on disk will vary according to the selected style.
